import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import api from '../../utils/api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { useToast } from '../../context/ToastContext'

export default function AddEditCar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { success: showToast } = useToast()
    const isEdit = !!id

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        type: 'SUV',
        price: 50,
        fuel: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        year: 2024,
        image: '',
        available: true,
        features: ''
    })
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(isEdit)

    const menuItems = [
        { to: '/seller/dashboard', label: 'Overview', icon: '📊' },
        { to: '/seller/cars', label: 'My Cars', icon: '🚗' },
        { to: '/seller/bookings', label: 'Bookings', icon: '📅' },
        { to: '/seller/reviews', label: 'Reviews', icon: '⭐' },
        { to: '/seller/stats', label: 'Analytics', icon: '📈' }
    ]

    useEffect(() => {
        if (isEdit) {
            const fetchCar = async () => {
                try {
                    const data = await api.get(`/cars/${id}`)
                    const car = data.car
                    setFormData({
                        ...car,
                        features: car.features?.join(', ') || ''
                    })
                } catch (err) {
                    console.error('Fetch failed:', err)
                } finally {
                    setFetching(false)
                }
            }
            fetchCar()
        }
    }, [id, isEdit])

    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = {
                ...formData,
                features: formData.features.split(',').map(f => f.trim()).filter(f => f)
            }

            if (isEdit) {
                await api.put(`/cars/${id}`, payload)
                showToast('Car Updated', 'Your vehicle listing has been updated.')
            } else {
                await api.post('/cars', payload)
                showToast('Car Added', 'Your new vehicle is now listed for rent!')
            }
            navigate('/seller/cars')
        } catch (err) {
            console.error('Submit failed:', err)
        } finally {
            setLoading(false)
        }
    }

    if (fetching) return <div className="p-20 text-center">Loading car details...</div>

    return (
        <DashboardLayout menuItems={menuItems}>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {isEdit ? `Edit ${formData.name}` : 'Add New Vehicle'}
                </h1>
                <p className="text-slate-500">Provide accurate details to attract more renters.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-card max-w-4xl border border-slate-100 dark:border-slate-700">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Model 3, Camry" required />
                        <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Tesla, Toyota" required />

                        <Select
                            label="Category"
                            name="type"
                            value={formData.type}
                            onChange={(val) => handleSelectChange('type', val)}
                            options={['Economy', 'Compact', 'Midsize', 'SUV', 'Luxury', 'Sports', 'Electric'].map(v => ({ value: v, label: v }))}
                        />

                        <Input label="Price per Day ($)" type="number" name="price" value={formData.price} onChange={handleChange} required />

                        <Select
                            label="Transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={(val) => handleSelectChange('transmission', val)}
                            options={['Automatic', 'Manual'].map(v => ({ value: v, label: v }))}
                        />

                        <Select
                            label="Fuel Type"
                            name="fuel"
                            value={formData.fuel}
                            onChange={(val) => handleSelectChange('fuel', val)}
                            options={['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(v => ({ value: v, label: v }))}
                        />

                        <Input label="Seats" type="number" name="seats" value={formData.seats} onChange={handleChange} required />
                        <Input label="Year" type="number" name="year" value={formData.year} onChange={handleChange} required />
                    </div>

                    <Input label="Image URL" name="image" value={formData.image} onChange={handleChange} placeholder="https://unsplash..." required />

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Features (comma separated)</label>
                        <textarea
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            placeholder="Bluetooth, GPS, Leather Seats, Sunroof"
                            className="w-full bg-slate-50 dark:bg-slate-700/50 border-none rounded-2xl p-4 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 h-32"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <Button type="button" variant="outline" onClick={() => navigate('/seller/cars')}>Cancel</Button>
                        <Button type="submit" loading={loading}>{isEdit ? 'Save Changes' : 'List Car Now'}</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}
