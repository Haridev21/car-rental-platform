import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'

export default function ManageUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const menuItems = [
        { to: '/admin/dashboard', label: 'Overview', icon: '💎' },
        { to: '/admin/users', label: 'User Hub', icon: '👥' },
        { to: '/admin/cars', label: 'Inventory', icon: '🚙' },
        { to: '/admin/bookings', label: 'All Rentals', icon: '💳' },
        { to: '/admin/settings', label: 'System', icon: '⚙️' }
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Mocking user list for now as we don't have a broad user search yet
                setUsers([
                    { _id: '1', name: 'Admin User', email: 'admin@driveease.com', role: 'admin', joined: '2024-01-01' },
                    { _id: '2', name: 'John Seller', email: 'seller@driveease.com', role: 'seller', joined: '2024-01-05' },
                    { _id: '3', name: 'Test User', email: 'user@driveease.com', role: 'user', joined: '2024-01-10' }
                ])
            } catch (err) {
                console.error('Error fetching users:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">User Management</h1>
                    <p className="text-slate-500">View and manage all registered accounts on the platform.</p>
                </div>
                <Button>+ Add User</Button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-800 dark:text-white">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'seller' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{user.joined}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-bold text-primary-600 hover:underline">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}
