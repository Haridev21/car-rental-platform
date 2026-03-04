import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export function LoginModal() {
    const { isLoginModalOpen, closeModals, login, openSignupModal, isLoading, error } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (err) {
            // Error is handled in context
        }
    }

    return (
        <Modal isOpen={isLoginModalOpen} onClose={closeModals} title="Welcome Back" size="sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 text-sm rounded-lg">{error}</div>}
                <Input label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                <Input label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                <Button type="submit" fullWidth loading={isLoading}>Sign In</Button>
                <p className="text-center text-sm text-slate-500">
                    Don&apos;t have an account? <button type="button" onClick={openSignupModal} className="text-primary-600 hover:underline font-medium">Sign up</button>
                </p>
            </form>
        </Modal>
    )
}

export function SignupModal() {
    const { isSignupModalOpen, closeModals, signup, openLoginModal, isLoading, error } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match")
            return
        }
        try {
            await signup(formData)
        } catch (err) {
            // Error handled in context
        }
    }

    return (
        <Modal isOpen={isSignupModalOpen} onClose={closeModals} title="Create Account" size="sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 text-sm rounded-lg">{error}</div>}
                <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Register as:</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} />
                            <span>Customer</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="radio" name="role" value="seller" checked={formData.role === 'seller'} onChange={handleChange} />
                            <span>Seller</span>
                        </label>
                    </div>
                </div>

                <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
                <Button type="submit" fullWidth loading={isLoading}>Create Account</Button>
                <p className="text-center text-sm text-slate-500">
                    Already have an account? <button type="button" onClick={openLoginModal} className="text-primary-600 hover:underline font-medium">Sign in</button>
                </p>
            </form>
        </Modal>
    )
}
