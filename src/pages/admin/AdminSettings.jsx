import { useState } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

export default function AdminSettings() {
    const { user } = useAuth()
    const [saved, setSaved] = useState(false)

    const menuItems = [
        { to: '/admin/dashboard', label: 'Overview', icon: '💎' },
        { to: '/admin/users', label: 'User Hub', icon: '👥' },
        { to: '/admin/cars', label: 'Inventory', icon: '🚙' },
        { to: '/admin/bookings', label: 'All Rentals', icon: '💳' },
        { to: '/admin/settings', label: 'System', icon: '⚙️' }
    ]

    const handleSave = (e) => {
        e.preventDefault()
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">System Settings</h1>
                <p className="text-slate-500">Manage DriveEase platform configuration and admin profile.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Admin Profile Info */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Admin Profile</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 dark:text-white text-lg">{user?.name}</p>
                            <p className="text-sm text-slate-500">{user?.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase">Administrator</span>
                        </div>
                    </div>
                </div>

                {/* Platform Info */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Platform Info</h3>
                    <div className="space-y-4 text-sm">
                        {[
                            { label: 'Platform', value: 'DriveEase v1.0' },
                            { label: 'Frontend', value: 'React + Vite (Vercel)' },
                            { label: 'Backend', value: 'Node.js + Express (Render)' },
                            { label: 'Database', value: 'MongoDB Atlas' },
                            { label: 'Status', value: '🟢 All Systems Operational' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                                <span className="text-slate-500">{label}</span>
                                <span className="font-semibold dark:text-white">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Links */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-card">
                    <h3 className="text-lg font-bold mb-6 dark:text-white">Quick Admin Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { to: '/admin/users', label: 'Manage Users', icon: '👥', color: 'blue' },
                            { to: '/admin/cars', label: 'Review Inventory', icon: '🚙', color: 'green' },
                            { to: '/admin/bookings', label: 'View Bookings', icon: '💳', color: 'purple' },
                            { to: '/admin/dashboard', label: 'Back to Overview', icon: '💎', color: 'primary' },
                        ].map(item => (
                            <a key={item.to} href={item.to}
                                className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-center">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
