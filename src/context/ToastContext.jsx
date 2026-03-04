import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const ToastContext = createContext()

let toastId = 0

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    // Add toast
    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = ++toastId
        const toast = {
            id,
            message,
            type, // success, error, warning, info
            duration
        }

        setToasts(prev => [...prev, toast])

        // Auto remove toast after duration
        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id))
            }, duration)
        }

        return id
    }, [])

    // Remove toast
    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    // Convenience methods
    const success = useCallback((message, duration) => {
        return addToast(message, 'success', duration)
    }, [addToast])

    const error = useCallback((message, duration) => {
        return addToast(message, 'error', duration)
    }, [addToast])

    const warning = useCallback((message, duration) => {
        return addToast(message, 'warning', duration)
    }, [addToast])

    const info = useCallback((message, duration) => {
        return addToast(message, 'info', duration)
    }, [addToast])

    const value = {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    }

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    )
}

ToastProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

export default ToastContext
