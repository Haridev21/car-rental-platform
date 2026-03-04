import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { StatCard } from '../../components/ui/StatCard'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalCars: 0,
        totalBookings: 0,
        totalUsers: 0,
        totalSellers: 0,
        totalRevenue: 0,
        monthlyRevenue: 0
    })

    const menuItems = [
        { to: '/admin/dashboard', label: 'Overview', icon: '💎' },
        { to: '/admin/users', label: 'User Hub', icon: '👥' },
        { to: '/admin/cars', label: 'Inventory', icon: '🚙' },
        { to: '/admin/bookings', label: 'All Rentals', icon: '💳' },
        { to: '/admin/settings', label: 'System', icon: '⚙️' }
    ]

    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                const data = await api.get('/stats/admin')
                setStats(data.stats)
            } catch (err) {
                console.error('Error fetching admin stats:', err)
            }
        }
        fetchAdminStats()
    }, [])

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Console</h1>
                <p className="text-slate-500">Global overview of DriveEase platform performance and operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Revenue" value={formatPrice(stats.totalRevenue)} icon="💰" trend="+15%" />
                <StatCard title="Active Users" value={stats.totalUsers} icon="👥" trend="+12" />
                <StatCard title="Total Cars" value={stats.totalCars} icon="🚗" trend="+4" />
                <StatCard title="Total Bookings" value={stats.totalBookings} icon="📅" trend="+8" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Platform Growth</h3>
                    <div className="h-80 flex items-end justify-between gap-1">
                        {[20, 35, 25, 45, 60, 55, 70, 65, 80, 75, 90, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary-50 dark:bg-primary-900/20 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-1000"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">User Distribution</h3>
                    <div className="space-y-8">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">Customers</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-blue-600">{stats.totalUsers}</span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                <div style={{ width: "70%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                        </div>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">Sellers</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-purple-600">{stats.totalSellers}</span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                                <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
