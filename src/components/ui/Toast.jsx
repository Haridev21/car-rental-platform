import { useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useToast } from '../../context/ToastContext'

// Toast icons
const icons = {
    success: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

// Individual Toast
function ToastItem({ toast, onRemove }) {
    const [isExiting, setIsExiting] = useState(false)

    const handleRemove = () => {
        setIsExiting(true)
        setTimeout(() => onRemove(toast.id), 200)
    }

    const typeClasses = {
        success: 'bg-accent-50 dark:bg-accent-900/30 border-accent-200 dark:border-accent-700 text-accent-800 dark:text-accent-200',
        error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
        warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
        info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200'
    }

    const iconClasses = {
        success: 'text-accent-500',
        error: 'text-red-500',
        warning: 'text-yellow-500',
        info: 'text-blue-500'
    }

    return (
        <div
            className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
        ${typeClasses[toast.type]}
        ${isExiting ? 'animate-slide-down' : 'animate-slide-up'}
      `}
            role="alert"
        >
            <span className={iconClasses[toast.type]}>
                {icons[toast.type]}
            </span>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={handleRemove}
                className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Dismiss"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

ToastItem.propTypes = {
    toast: PropTypes.shape({
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired
    }).isRequired,
    onRemove: PropTypes.func.isRequired
}

/**
 * Toast container component - renders all active toasts
 */
export function ToastContainer() {
    const { toasts, removeToast } = useToast()

    if (toasts.length === 0) return null

    return createPortal(
        <div
            className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full"
            aria-live="polite"
            aria-atomic="true"
        >
            {toasts.map(toast => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={removeToast}
                />
            ))}
        </div>,
        document.body
    )
}

export default ToastContainer
