import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { isDarkMode, toggleTheme } = useTheme()
    const { user, isAuthenticated, openLoginModal, logout, isAdmin, isSeller } = useAuth()
    const { favoritesCount } = useFavorites()
    const location = useLocation()

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/cars', label: 'Browse Cars' },
        { to: '/locations', label: 'Locations' },
        { to: '/about', label: 'About' }
    ]

    const isActiveLink = (path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
            <nav className="container-custom" aria-label="Main navigation">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4-4v8m-7 4h14a2 2 0 012 2v0a2 2 0 01-2 2H5a2 2 0 01-2-2v0a2 2 0 012-2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors">
                            Drive<span className="text-primary-600">Ease</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${isActiveLink(link.to)
                                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>

                        <Link
                            to="/favorites"
                            className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            ❤️
                            {favoritesCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/50 text-primary-600 rounded-full flex items-center justify-center font-bold text-xs">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {user?.name}
                                    </span>
                                </button>

                                <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    {isAdmin && (
                                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-primary-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">
                                            💎 Admin Console
                                        </Link>
                                    )}
                                    {isSeller && (
                                        <Link to="/seller/dashboard" className="block px-4 py-2 text-sm text-primary-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">
                                            📊 Seller Dashboard
                                        </Link>
                                    )}
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                                        My Profile
                                    </Link>
                                    <Link to="/bookings" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                                        My Bookings
                                    </Link>
                                    <hr className="my-2 border-slate-200 dark:border-slate-700" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={openLoginModal}
                                className="btn-primary"
                            >
                                Sign In
                            </button>
                        )}

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
