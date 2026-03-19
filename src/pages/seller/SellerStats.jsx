import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'

export default function SellerStats() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    const menuItems = [
        { to: '/seller/dashboard', label: 'Overview', icon: '📊' },
        { to: '/seller/cars', label: 'My Cars', icon: '🚗' },
        { to: '/seller/bookings', label: 'Bookings', icon: '📅' },
        { to: '/seller/reviews', label: 'Reviews', icon: '⭐' },
        { to: '/seller/stats', label: 'Analytics', icon: '📈' }
    ]

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.get('/cars/seller-stats')
                setStats(data.stats)
            } catch (err) {
                console.error('Error fetching stats:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <DashboardLayout menuItems={menuItems}>
                <p className="text-center text-slate-500 py-20">Loading analytics...</p>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics</h1>
                <p className="text-slate-500">A breakdown of your rental business performance.</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                    { label: 'Total Revenue', value: formatPrice(stats?.totalEarnings || 0), icon: '💰', desc: 'Across all completed bookings' },
                    { label: 'Total Cars Listed', value: stats?.totalCars || 0, icon: '🚗', desc: 'Vehicles you have listed' },
                    { label: 'Cars Available', value: stats?.availableCars || 0, icon: '✅', desc: 'Currently ready to be rented' },
                    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: '📅', desc: 'All time bookings received' },
                    { label: 'Active Rentals', value: stats?.activeBookings || 0, icon: '⚡', desc: 'Customers currently renting' },
                    { label: 'Occupancy Rate', value: stats?.totalCars > 0 ? `${Math.round(((stats.totalCars - (stats.availableCars || 0)) / stats.totalCars) * 100)}%` : '0%', icon: '📈', desc: 'Fleet utilization rate' },
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{kpi.icon}</span>
                            <p className="text-sm text-slate-500">{kpi.label}</p>
                        </div>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{kpi.value}</p>
                        <p className="text-xs text-slate-400 mt-1">{kpi.desc}</p>
                    </div>
                ))}
            </div>

            {/* Bar chart visualisation */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                <h3 className="text-lg font-bold mb-6 dark:text-white">Fleet Status Overview</h3>
                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-300">Available</span>
                            <span className="font-bold dark:text-white">{stats?.availableCars || 0}</span>
                        </div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-3 bg-green-500 rounded-full transition-all duration-1000"
                                style={{ width: stats?.totalCars > 0 ? `${(stats.availableCars / stats.totalCars) * 100}%` : '0%' }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-300">Rented Out</span>
                            <span className="font-bold dark:text-white">{(stats?.totalCars || 0) - (stats?.availableCars || 0)}</span>
                        </div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-3 bg-primary-500 rounded-full transition-all duration-1000"
                                style={{ width: stats?.totalCars > 0 ? `${((stats.totalCars - stats.availableCars) / stats.totalCars) * 100}%` : '0%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
