
import { DashboardLayout } from '../../components/layout/DashboardLayout'

export default function SellerReviews() {
    const menuItems = [
        { to: '/seller/dashboard', label: 'Overview', icon: '📊' },
        { to: '/seller/cars', label: 'My Cars', icon: '🚗' },
        { to: '/seller/bookings', label: 'Bookings', icon: '📅' },
        { to: '/seller/reviews', label: 'Reviews', icon: '⭐' },
        { to: '/seller/stats', label: 'Analytics', icon: '📈' }
    ]

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Reviews Coming Soon</h2>
                <p className="text-slate-500">This feature is currently under development.</p>
            </div>
        </DashboardLayout>
    )
}
