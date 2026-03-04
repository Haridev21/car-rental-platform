import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { Breadcrumb } from '../components/ui/Breadcrumb'

export default function LocationsPage() {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await api.get('/locations')
                setLocations(data.locations)
            } catch (err) {
                console.error('Error fetching locations:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchLocations()
    }, [])

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Locations' }]} className="mb-8" />

                <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4 text-center">Our Locations</h1>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-12">Find a pickup location near you across the world.</p>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white dark:bg-slate-800 rounded-2xl animate-pulse"></div>)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {locations.map(loc => (
                            <div key={loc._id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-card hover:shadow-dashboard transition-all border border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter">{loc.name}</h2>
                                <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">{loc.address}</p>
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <span className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center">🕐</span>
                                        <span className="font-bold">{loc.hours || '8AM - 8PM'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <span className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center">📞</span>
                                        <span className="font-bold">{loc.phone || '(555) 123-4567'}</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Link to="/cars" className="flex-1 text-center btn-primary py-3 rounded-xl text-sm font-bold shadow-none">Browse Cars</Link>
                                    <button className="flex-1 btn-outline py-3 rounded-xl text-sm font-bold">Directions</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
