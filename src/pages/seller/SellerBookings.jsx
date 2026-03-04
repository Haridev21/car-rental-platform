import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'
import { useToast } from '../../context/ToastContext'

export default function SellerBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const { success: showToast } = useToast()

    const menuItems = [
        { to: '/seller/dashboard', label: 'Overview', icon: '📊' },
        { to: '/seller/cars', label: 'My Cars', icon: '🚗' },
        { to: '/seller/bookings', label: 'Bookings', icon: '📅' },
        { to: '/seller/reviews', label: 'Reviews', icon: '⭐' },
        { to: '/seller/stats', label: 'Analytics', icon: '📈' }
    ]

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await api.get('/bookings?type=sales')
                setBookings(data.bookings || [])
            } catch (err) {
                console.error('Error fetching seller bookings:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}/status`, { status })
            setBookings(bookings.map(b => b._id === id ? { ...b, status } : b))
            showToast('Booking Updated', `Booking status changed to ${status}.`)
        } catch (err) {
            console.error('Update failed:', err)
        }
    }

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Rental Bookings</h1>
                <p className="text-slate-500">Track and manage rental requests for your fleet.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Dates</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">Loading bookings...</td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">No bookings yet.</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-xs">
                                                    {booking.customerInfo?.firstName?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                        {booking.customerInfo?.firstName} {booking.customerInfo?.lastName}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-medium">{booking.customerInfo?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={booking.car?.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                                                <span className="text-sm font-semibold dark:text-white">{booking.car?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-medium dark:text-slate-300">
                                                <p>{new Date(booking.pickupDate).toLocaleDateString()}</p>
                                                <p className="text-slate-400">to {new Date(booking.returnDate).toLocaleDateString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-primary-600">{formatPrice(booking.pricing?.total)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                    booking.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {booking.status === 'pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                                                        className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg hover:bg-primary-700"
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(booking._id, 'active')}
                                                    className="text-[10px] font-bold text-primary-600 hover:underline"
                                                >
                                                    Mark Active
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}
