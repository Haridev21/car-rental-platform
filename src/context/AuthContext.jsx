import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setIsInitialLoading(false)
            return
        }

        try {
            const data = await api.get('/auth/me')
            setUser(data.user)
        } catch (err) {
            localStorage.removeItem('token')
            setUser(null)
        } finally {
            setIsInitialLoading(false)
        }
    }, [])

    useEffect(() => {
        loadUser()
    }, [loadUser])

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await api.post('/auth/signin', { email, password })
            localStorage.setItem('token', data.token)
            setUser(data.user)
            setIsLoginModalOpen(false)
            return data.user
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (userData) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await api.post('/auth/signup', userData)
            localStorage.setItem('token', data.token)
            setUser(data.user)
            setIsSignupModalOpen(false)
            return data.user
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const openLoginModal = () => {
        setIsSignupModalOpen(false)
        setIsLoginModalOpen(true)
        setError(null)
    }

    const openSignupModal = () => {
        setIsLoginModalOpen(false)
        setIsSignupModalOpen(true)
        setError(null)
    }

    const closeModals = () => {
        setIsLoginModalOpen(false)
        setIsSignupModalOpen(false)
        setError(null)
    }

    const value = {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isSeller: user?.role === 'seller',
        isLoading,
        isInitialLoading,
        error,
        isLoginModalOpen,
        isSignupModalOpen,
        login,
        signup,
        logout,
        openLoginModal,
        openSignupModal,
        closeModals
    }

    return (
        <AuthContext.Provider value={value}>
            {!isInitialLoading && children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
