import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Button } from '../../components/ui/Button'
import api from '../../utils/api'

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
                const data = await api.get('/users')
                setUsers(data.users)
            } catch (err) {
                console.error('Error fetching users:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/users/${id}`)
                setUsers(users.filter(u => u._id !== id))
            } catch (err) {
                console.error('Delete failed:', err)
                alert(err.response?.data?.message || err.message || 'Failed to delete user')
            }
        }
    }

    const handleRoleChange = async (id, newRole) => {
        try {
            const data = await api.put(`/users/${id}/role`, { role: newRole })
            setUsers(users.map(u => u._id === id ? data.user : u))
        } catch (err) {
            console.error('Role update failed:', err)
            alert(err.response?.data?.message || err.message || 'Failed to update role')
        }
    }

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
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">Loading system users...</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <span className="font-bold text-slate-800 dark:text-white">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase outline-none cursor-pointer ${
                                                    user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                    user.role === 'seller' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                    'bg-slate-100 text-slate-700 border-slate-200'
                                                }`}
                                            >
                                                <option value="user">User</option>
                                                <option value="seller">Seller</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">
                                            {new Date(user.createdAt || user.joined).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDelete(user._id)} className="text-xs font-bold text-red-600 hover:underline">Delete</button>
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
