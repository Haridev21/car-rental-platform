
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function ProfilePage() {
    const { user, login } = useAuth() // login updates the user state
    const { success, error } = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Simulate API call to update profile
        try {
            // In a real app, you would call api.put('/users/profile', formData)
            // For now, we'll just simulate a successful update
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Update local user state (mock)
            const updatedUser = { ...user, ...formData }
            // Assuming login can be used to update state, otherwise we'd need a specific updateProfile method
            // logic would go here.

            success('Profile Updated', 'Your profile details have been saved successfully.')
            setIsEditing(false)
        } catch (err) {
            error('Update Failed', 'Could not update profile. Please try again.')
        }
    }

    return (
        <div className="container-custom py-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">My Profile</h1>
                <p className="text-slate-500 mb-8">Manage your account information and preferences.</p>

                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-4xl font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{user?.name}</h2>
                            <p className="text-slate-500">{user?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                                {user?.role} Account
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled={true} // Email usually cannot be changed
                                    className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 opacity-60 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="btn-outline px-6"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary px-8"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="btn-primary px-8"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
