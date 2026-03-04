import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { ImageGallery } from '../components/ui/ImageGallery'
import { Rating } from '../components/ui/Rating'
import { Accordion } from '../components/ui/Accordion'
import { Button } from '../components/ui/Button'
import { formatPrice } from '../utils/pricing'
import { CarCard } from '../components/features/CarCard'

export default function CarDetailsPage() {
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [similarCars, setSimilarCars] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCarDetails = async () => {
            setLoading(true)
            try {
                const [carRes, reviewsRes, similarRes] = await Promise.all([
                    api.get(`/cars/${id}`),
                    api.get(`/reviews/car/${id}`),
                    api.get(`/cars?limit=4&type=${car?.type || 'SUV'}`) // Simplified similar cars for now
                ])
                setCar(carRes.car)
                setReviews(reviewsRes.reviews)
                setSimilarCars(similarRes.cars.filter(c => c._id !== id))
            } catch (err) {
                console.error('Error fetching car details:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchCarDetails()
    }, [id])

    if (loading) return (
        <div className="container-custom py-20 min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    if (!car) return (
        <div className="container-custom py-20 text-center">
            <h2 className="text-2xl font-bold dark:text-white">Car not found</h2>
            <Link to="/cars" className="text-primary-600 mt-4 inline-block font-bold">Back to Browse</Link>
        </div>
    )

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
            <div className="container-custom py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left Column: Media */}
                    <div className="space-y-6">
                        <ImageGallery images={car.images?.length > 0 ? car.images : [car.image]} />

                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Specs</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 uppercase tracking-tighter font-bold">Transmission</span>
                                        <span className="font-bold dark:text-white">{car.transmission}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 uppercase tracking-tighter font-bold">Fuel Type</span>
                                        <span className="font-bold dark:text-white">{car.fuel}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 uppercase tracking-tighter font-bold">Capacity</span>
                                        <span className="font-bold dark:text-white">{car.seats} People</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary-600 p-6 rounded-3xl shadow-lg shadow-primary-500/20 text-white">
                                <h3 className="font-bold mb-4">Features</h3>
                                <div className="flex flex-wrap gap-2">
                                    {car.features?.map(f => (
                                        <span key={f} className="text-[10px] bg-white/20 px-2 py-1 rounded font-bold uppercase tracking-wider">{f}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info & Booking */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-[10px] font-bold rounded uppercase tracking-widest">{car.type}</span>
                                <span className="text-slate-400">•</span>
                                <Rating value={car.rating} size="sm" showValue />
                                <span className="text-slate-400">•</span>
                                <span className="text-xs text-slate-500">({car.reviewCount} Reviews)</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2">{car.name}</h1>
                            <p className="text-lg text-slate-500 font-medium">Experience the excellence of {car.brand} engineering.</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-card border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
                                <div>
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Pricing</p>
                                    <p className="text-4xl font-black text-slate-900 dark:text-white">
                                        {formatPrice(car.price)} <span className="text-sm font-bold text-slate-400">/ DAY</span>
                                    </p>
                                </div>
                                {car.available ? (
                                    <span className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-full text-xs">Available Now</span>
                                ) : (
                                    <span className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-full text-xs">Currently Rented</span>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Button
                                    fullWidth
                                    size="lg"
                                    onClick={() => navigate(`/booking/${car._id}`)}
                                    disabled={!car.available}
                                >
                                    Book This Vehicle
                                </Button>
                                <button className="w-full flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:text-primary-600 transition-colors py-2">
                                    <span>❤️</span> Add to Favorites
                                </button>
                            </div>
                        </div>

                        <Accordion
                            items={[
                                { title: 'Full Specifications', content: 'Detailed technical specs of the vehicle including engine, safety features, and technology.' },
                                { title: 'Insurance & Protection', content: 'Standard insurance includes collision damage waiver and theft protection with a basic deductible.' },
                                { title: 'Rental Terms', content: 'Minimum driver age is 21. Valid driving license and credit card required at pickup.' }
                            ]}
                        />
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold dark:text-white mb-10">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review._id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm flex gap-4">
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex-shrink-0 flex items-center justify-center">
                                    {review.user?.avatar ? <img src={review.user.avatar} className="w-full h-full rounded-full" /> : <span className="font-bold">{review.user?.name?.charAt(0)}</span>}
                                </div>
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold dark:text-white">{review.user?.name}</h4>
                                        <Rating value={review.rating} size="sm" />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            </div>
                        )) : <p className="text-slate-500">No reviews yet for this vehicle.</p>}
                    </div>
                </section>

                {/* Similar Cars */}
                {similarCars.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold dark:text-white mb-10">Similar Vehicles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarCars.map(car => (
                                <CarCard key={car._id} car={car} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
