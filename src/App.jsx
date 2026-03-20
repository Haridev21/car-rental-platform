import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ToastContainer } from './components/ui/Toast'
import { LoginModal, SignupModal } from './components/features/AuthModals'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import BrowseCarsPage from './pages/BrowseCarsPage'
import CarDetailsPage from './pages/CarDetailsPage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import LocationsPage from './pages/LocationsPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import FavoritesPage from './pages/FavoritesPage'
import UserBookingsPage from './pages/UserBookingsPage'
import ProfilePage from './pages/ProfilePage'

// Components
import SplashScreen from './components/ui/SplashScreen'
import { useState, useEffect } from 'react'

// Dashboards
import SellerDashboard from './pages/seller/SellerDashboard'
import MyCars from './pages/seller/MyCars'
import AddEditCar from './pages/seller/AddEditCar'
import SellerBookings from './pages/seller/SellerBookings'
import SellerReviews from './pages/seller/SellerReviews'
import SellerStats from './pages/seller/SellerStats'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import ManageUsers from './pages/admin/ManageUsers'
import AllCars from './pages/admin/AllCars'
import SystemBookings from './pages/admin/SystemBookings'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false)
        }, 3200)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {showSplash && <SplashScreen />}
            <Routes>
                {/* Main Site Routes */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/cars" element={<Layout><BrowseCarsPage /></Layout>} />
                <Route path="/cars/:id" element={<Layout><CarDetailsPage /></Layout>} />
                <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
                <Route path="/booking/:carId" element={<Layout><BookingPage /></Layout>} />
                <Route path="/about" element={<Layout><AboutPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
                <Route path="/locations" element={<Layout><LocationsPage /></Layout>} />
                <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
                <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
                <Route path="/favorites" element={<Layout><FavoritesPage /></Layout>} />
                <Route path="/bookings" element={
                    <ProtectedRoute>
                        <Layout>
                            <UserBookingsPage />
                        </Layout>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Layout>
                            <ProfilePage />
                        </Layout>
                    </ProtectedRoute>
                } />

                {/* Protected Seller Routes */}
                <Route
                    path="/seller/*"
                    element={
                        <ProtectedRoute roles={['seller']}>
                            <Routes>
                                <Route path="dashboard" element={<SellerDashboard />} />
                                <Route path="cars" element={<MyCars />} />
                                <Route path="cars/add" element={<AddEditCar />} />
                                <Route path="cars/edit/:id" element={<AddEditCar />} />
                                <Route path="bookings" element={<SellerBookings />} />
                                <Route path="reviews" element={<SellerReviews />} />
                                <Route path="stats" element={<SellerStats />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />

                {/* Public Admin Login Page */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute roles={['admin']}>
                            <Routes>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="users" element={<ManageUsers />} />
                                <Route path="cars" element={<AllCars />} />
                                <Route path="bookings" element={<SystemBookings />} />
                                <Route path="settings" element={<AdminSettings />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <ToastContainer />
            <LoginModal />
            <SignupModal />
        </>
    )
}

export default App
