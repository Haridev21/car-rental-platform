import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'

export default function MyCars() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const { success: showToast } = useToast()

    const menuItems = [
        { to: '/seller/dashboard', label: 'Overview', icon: '📊' },
        { to: '/seller/cars', label: 'My Cars', icon: '🚗' },
        { to: '/seller/bookings', label: 'Bookings', icon: '📅' },
        { to: '/seller/reviews', label: 'Reviews', icon: '⭐' },
        { to: '/seller/stats', label: 'Analytics', icon: '📈' }
    ]

    const fetchMyCars = async () => {
        try {
            const data = await api.get('/cars/my-cars')
            setCars(data.cars || [])
        } catch (err) {
            console.error('Error fetching cars:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyCars()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await api.delete(`/cars/${id}`)
                showToast('Car Deleted', 'Listing has been removed successfully.')
                setCars(cars.filter(c => c._id !== id))
            } catch (err) {
                console.error('Delete failed:', err)
            }
        }
    }

    const toggleAvailability = async (car) => {
        try {
            await api.put(`/cars/${car._id}`, { available: !car.available })
            setCars(cars.map(c => c._id === car._id ? { ...c, available: !c.available } : c))
            showToast('Status Updated', `${car.name} is now ${!car.available ? 'available' : 'unavailable'}.`)
        } catch (err) {
            console.error('Update failed:', err)
        }
    }

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Fleet</h1>
                    <p className="text-slate-500">Manage your vehicle listings and availability.</p>
                </div>
                <Link to="/seller/cars/add">
                    <Button rounded="full">+ Add New Car</Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Price/Day</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">Loading your cars...</td>
                                </tr>
                            ) : cars.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No cars found. Start by adding one!</td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={car.image} className="w-12 h-12 object-cover rounded-lg" alt={car.name} />
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-white uppercase tracking-tighter">{car.name}</p>
                                                    <p className="text-xs text-slate-400">{car.brand} • {car.year || 2024}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-[10px] font-bold rounded uppercase">
                                                {car.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-800 dark:text-white">{formatPrice(car.price)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleAvailability(car)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${car.available
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                                    }`}
                                            >
                                                {car.available ? '● Available' : '○ Booked'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/seller/cars/edit/${car._id}`} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                                    ✏️
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(car._id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}
