import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { formatPrice } from '../../utils/pricing'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'

export default function AllCars() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const { success: showToast } = useToast()

    const menuItems = [
        { to: '/admin/dashboard', label: 'Overview', icon: '💎' },
        { to: '/admin/users', label: 'User Hub', icon: '👥' },
        { to: '/admin/cars', label: 'Inventory', icon: '🚙' },
        { to: '/admin/bookings', label: 'All Rentals', icon: '💳' },
        { to: '/admin/settings', label: 'System', icon: '⚙️' }
    ]

    const fetchCars = async () => {
        try {
            const data = await api.get('/cars')
            setCars(data.cars)
        } catch (err) {
            console.error('Error fetching cars:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCars()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car? Admin action is permanent.')) {
            try {
                await api.delete(`/cars/${id}`)
                showToast('Car Deleted', 'Listing has been removed by Admin.')
                setCars(cars.filter(c => c._id !== id))
            } catch (err) {
                console.error('Delete failed:', err)
            }
        }
    }

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Platform Inventory</h1>
                    <p className="text-slate-500">Overview of all vehicle listings across DriveEase.</p>
                </div>
                <div className="flex gap-4">
                    <Link to="/seller/cars/add"><Button variant="outline">Force Add Listing</Button></Link>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Seller</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Pricing</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">Loading system inventory...</td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={car.image} className="w-12 h-12 object-cover rounded-lg" alt="" />
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-white uppercase tracking-tighter">{car.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{car.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold dark:text-slate-300">{car.seller?.name || 'Owner'}</p>
                                            <p className="text-[10px] text-slate-500">{car.seller?.email || 'N/A'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-800 dark:text-white">{formatPrice(car.price)}</span>
                                            <span className="text-[10px] text-slate-400 block tracking-widest uppercase">/ Day</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${car.available ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {car.available ? 'Active' : 'Rented'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/seller/cars/edit/${car._id}`} className="text-xs font-bold text-primary-600 hover:underline">Edit</Link>
                                                <button onClick={() => handleDelete(car._id)} className="text-xs font-bold text-red-600 hover:underline">Revoke</button>
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
