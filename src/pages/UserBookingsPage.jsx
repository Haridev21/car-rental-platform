
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { formatPrice } from '../utils/pricing'
import { useToast } from '../context/ToastContext'

export default function UserBookingsPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const { success: showToast, error: showError } = useToast()

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await api.get('/bookings')
                setBookings(data.bookings || [])
            } catch (err) {
                console.error('Error fetching bookings:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])

    const handleCancel = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await api.put(`/bookings/${id}/cancel`)
                setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b))
                showToast('Booking Cancelled', 'Your reservation has been cancelled.')
            } catch (err) {
                showError('Cancellation Failed', err.message)
            }
        }
    }

    return (
        <div className="container-custom py-10">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">My Bookings</h1>
            <p className="text-slate-500 mb-8">Manage your upcoming and past trips.</p>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading your bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                    <div className="text-6xl mb-4">🚗</div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No bookings yet</h2>
                    <p className="text-slate-500 mb-6">You haven&apos;t made any reservations yet.</p>
                    <Link to="/cars" className="btn-primary">Browse Cars</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card flex flex-col md:flex-row gap-6">
                            <img
                                src={booking.car?.image}
                                alt={booking.car?.name}
                                className="w-full md:w-48 h-32 object-cover rounded-2xl"
                            />

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{booking.car?.name}</h3>
                                        <p className="text-slate-500 text-sm">{booking.car?.type} • {booking.car?.brand}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                                            booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase font-bold">Pickup</p>
                                        <p className="font-semibold dark:text-slate-200">{new Date(booking.pickupDate).toLocaleDateString()}</p>
                                        <p className="text-xs text-slate-500">{booking.pickupLocation?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase font-bold">Return</p>
                                        <p className="font-semibold dark:text-slate-200">{new Date(booking.returnDate).toLocaleDateString()}</p>
                                        <p className="text-xs text-slate-500">{booking.returnLocation?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase font-bold">Total Price</p>
                                        <p className="font-black text-primary-600 text-lg">{formatPrice(booking.pricing?.total)}</p>
                                    </div>
                                </div>

                                {booking.status === 'confirmed' || booking.status === 'pending' ? (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="text-red-500 hover:text-red-600 text-sm font-bold px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
