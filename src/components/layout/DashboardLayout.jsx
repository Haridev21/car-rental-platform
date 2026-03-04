import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'

export function DashboardLayout({ children, menuItems = [] }) {
    const { user, logout } = useAuth()
    const location = useLocation()

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4-4v8m-7 4h14a2 2 0 012 2v0a2 2 0 01-2 2H5a2 2 0 01-2-2v0a2 2 0 012-2z" />
                            </svg>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-white">DriveEase</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.to
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-semibold shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 p-3 mb-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 text-primary-600 rounded-full flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                        <span>➔</span>
                        <span className="text-sm font-semibold">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="font-bold text-slate-800 dark:text-white">DriveEase</Link>
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    )
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }))
}

