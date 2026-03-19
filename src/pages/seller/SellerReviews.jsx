import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'

export default function SellerReviews() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const menuItems = [
        { to: '/seller/dashboard', label: 'Overview', icon: '📊' },
        { to: '/seller/cars', label: 'My Cars', icon: '🚗' },
        { to: '/seller/bookings', label: 'Bookings', icon: '📅' },
        { to: '/seller/reviews', label: 'Reviews', icon: '⭐' },
        { to: '/seller/stats', label: 'Analytics', icon: '📈' }
    ]

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Get seller's cars first, then fetch reviews for each
                const carsData = await api.get('/cars/my-cars')
                const cars = carsData.cars || []

                const allReviews = []
                for (const car of cars) {
                    const reviewData = await api.get(`/reviews/car/${car._id}`)
                    if (reviewData.reviews?.length > 0) {
                        reviewData.reviews.forEach(r => allReviews.push({ ...r, carName: car.name }))
                    }
                }

                setReviews(allReviews)
            } catch (err) {
                console.error('Error fetching reviews:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchReviews()
    }, [])

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '—'

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Customer Reviews</h1>
                <p className="text-slate-500">See what customers are saying about your vehicles.</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card text-center">
                    <p className="text-4xl font-extrabold text-yellow-500">{avgRating}</p>
                    <p className="text-sm text-slate-500 mt-1">Average Rating</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card text-center">
                    <p className="text-4xl font-extrabold text-primary-600">{reviews.length}</p>
                    <p className="text-sm text-slate-500 mt-1">Total Reviews</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card text-center">
                    <p className="text-4xl font-extrabold text-green-600">
                        {reviews.filter(r => r.rating >= 4).length}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Positive Reviews</p>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-slate-500 py-12">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-card">
                        <p className="text-4xl mb-4">⭐</p>
                        <h3 className="text-lg font-bold dark:text-white mb-2">No reviews yet</h3>
                        <p className="text-slate-500 text-sm">Reviews from customers will appear here once they start booking your vehicles.</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">
                                        {review.user?.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-white text-sm">{review.user?.name || 'Anonymous'}</p>
                                        <p className="text-xs text-slate-400">{review.carName}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <span key={s} className={`text-sm ${s <= review.rating ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            {review.title && <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">{review.title}</p>}
                            <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
                            <p className="text-[10px] text-slate-400 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </DashboardLayout>
    )
}
