import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
    const { login, logout } = useAuth()
    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        
        try {
            const user = await login(email, password)
            if (user.role !== 'admin') {
                logout() // Kick out if not an admin
                throw new Error('Access Denied: You do not have administrator privileges.')
            }
            navigate('/admin/dashboard')
        } catch (err) {
            setError(err.message || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <span className="text-3xl">💎</span>
                    </div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                    DriveEase Admin
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                    Restricted access. Authorized personnel only.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow-xl shadow-slate-200/50 dark:shadow-none sm:rounded-2xl sm:px-10 border border-slate-100 dark:border-slate-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-r-lg">
                                <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
                            </div>
                        )}

                        <Input 
                            label="Admin Email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="admin@driveease.com" 
                            required 
                        />
                        
                        <Input 
                            label="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            required 
                        />

                        <Button type="submit" fullWidth loading={isLoading} className="bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 py-3">
                            Authenticate
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
