import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { StatCard } from '../../components/ui/StatCard'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'

export default function SellerDashboard() {
    const [stats, setStats] = useState({
        totalCars: 0,
        availableCars: 0,
        totalBookings: 0,
        totalEarnings: 0,
        activeBookings: 0
    })

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
                setStats(data.stats || {
                    totalCars: 0,
                    availableCars: 0,
                    totalBookings: 0,
                    totalEarnings: 0,
                    activeBookings: 0
                })
            } catch (err) {
                console.error('Error fetching seller stats:', err)
            }
        }
        fetchStats()
    }, [])

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Seller Dashboard</h1>
                <p className="text-slate-500">Welcome back! Here&apos;s how your rental business is performing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Vehicles" value={stats.totalCars} icon="🚗" trend="+1" />
                <StatCard title="Active Rentals" value={stats.activeBookings} icon="📅" trend="+0" />
                <StatCard title="Total Earnings" value={formatPrice(stats.totalEarnings)} icon="💰" trend="+12%" />
                <StatCard title="Total Bookings" value={stats.totalBookings} icon="📈" trend="+3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Earnings Overview</h3>
                    <div className="h-64 flex items-end gap-2">
                        {[40, 60, 45, 90, 75, 50, 80].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary-100 dark:bg-primary-900/30 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-1000"
                                    style={{ height: `${h}%` }}
                                ></div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h * 10}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Recent Activity</h3>
                    <div className="space-y-6">
                        {stats.totalBookings === 0 ? (
                            <p className="text-slate-500 text-sm">No recent activity found.</p>
                        ) : (
                            <p className="text-slate-500 text-sm">You have {stats.totalBookings} total bookings across your fleet.</p>
                        )}
                        <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                            <div>
                                <p className="text-sm font-bold dark:text-white">Inventory Sync Complete</p>
                                <p className="text-xs text-slate-500">Your car listings are up to date with the database.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
