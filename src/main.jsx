import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Context providers
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { SearchProvider } from './context/SearchContext'
import { ToastProvider } from './context/ToastContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ThemeProvider>
                <ToastProvider>
                    <AuthProvider>
                        <FavoritesProvider>
                            <SearchProvider>
                                <BookingProvider>
                                    <App />
                                </BookingProvider>
                            </SearchProvider>
                        </FavoritesProvider>
                    </AuthProvider>
                </ToastProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
