import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'

export function ProtectedRoute({ children, roles = [] }) {
    const { user, isAuthenticated, isInitialLoading } = useAuth()
    const location = useLocation()

    if (isInitialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        // Redirect to home and open login modal (handled in App/Navbar)
        return <Navigate to="/" state={{ from: location, openLogin: true }} replace />
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string)
}

export default ProtectedRoute
