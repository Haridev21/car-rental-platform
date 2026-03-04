import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'

export default function SystemBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    const menuItems = [
        { to: '/admin/dashboard', label: 'Overview', icon: '💎' },
        { to: '/admin/users', label: 'User Hub', icon: '👥' },
        { to: '/admin/cars', label: 'Inventory', icon: '🚙' },
        { to: '/admin/bookings', label: 'All Rentals', icon: '💳' },
        { to: '/admin/settings', label: 'System', icon: '⚙️' }
    ]

    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                const data = await api.get('/bookings')
                setBookings(data.bookings)
            } catch (err) {
                console.error('Error fetching system bookings:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchAllBookings()
    }, [])

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Platform Bookings</h1>
                <p className="text-slate-500">Real-time log of all rental activities across DriveEase.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Audit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">Syncing platform transactions...</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">#{booking._id.slice(-6)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold dark:text-white uppercase tracking-tighter">{booking.customerInfo?.firstName} {booking.customerInfo?.lastName}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">{booking.customerInfo?.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold dark:text-slate-200">{booking.car?.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-green-600">{formatPrice(booking.pricing?.total)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-primary-600 hover:underline">View Log</button>
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
