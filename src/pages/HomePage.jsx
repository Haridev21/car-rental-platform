import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { popularDestinations } from '../data/locations'

export default function HomePage() {
    const [featuredCars, setFeaturedCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [searchParams, setSearchParams] = useState({
        pickup: '',
        return: '',
        pickupDate: '',
        returnDate: ''
    })
    const navigate = useNavigate()
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [carsRes, locRes] = await Promise.all([
                    api.get('/cars/featured'),
                    api.get('/locations')
                ])
                setFeaturedCars(carsRes.cars)
                setLocations(locRes.locations)
            } catch (err) {
                console.error('Error fetching homepage data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        const query = new URLSearchParams(searchParams).toString()
        navigate(`/cars?${query}`)
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[600px] lg:h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600"
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                </div>

                <div className="container-custom relative z-10 text-white">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">
                            The Easiest Way to <span className="text-primary-400">Rent a Car</span>
                        </h1>
                        <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-200">
                            DriveEase offers the best selection of premium vehicles with flexible booking and transparent pricing.
                            Start your journey today with just a few clicks.
                        </p>

                        {/* Search Widget */}
                        <div className="bg-white dark:bg-slate-800 p-6 lg:p-8 rounded-3xl shadow-2xl text-slate-800 dark:text-white animate-fade-in-up animation-delay-400">
                            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="lg:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">Pickup Location</label>
                                    <select
                                        className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                                        value={searchParams.pickup}
                                        onChange={(e) => setSearchParams({ ...searchParams, pickup: e.target.value })}
                                    >
                                        <option value="">Select location</option>
                                        {locations.map(loc => (
                                            <option key={loc._id} value={loc._id}>{loc.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">Pickup Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 pr-10 py-3 focus:ring-2 focus:ring-primary-500 min-w-[150px]"
                                        value={searchParams.pickupDate}
                                        min={today}
                                        onChange={(e) => setSearchParams({ ...searchParams, pickupDate: e.target.value, returnDate: '' })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">Return Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500"
                                        value={searchParams.returnDate}
                                        min={searchParams.pickupDate || today}
                                        onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button type="submit" className="btn-primary w-full h-[52px] rounded-xl text-lg font-bold shadow-primary-500/25">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4">Our Featured Selection</h2>
                            <p className="text-slate-500 max-w-xl">
                                Choose from our most popular premium vehicles, meticulously maintained for your comfort and safety.
                            </p>
                        </div>
                        <Link to="/cars" className="btn-outline">View All Vehicles →</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-[400px] bg-white dark:bg-slate-800 rounded-3xl animate-pulse"></div>)
                        ) : (
                            featuredCars.map(car => (
                                <div key={car._id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-card hover:shadow-xl transition-all group">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-600">
                                            {car.type}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{car.name}</h3>
                                                <p className="text-slate-500 text-sm">{car.brand}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-primary-600">${car.price}</p>
                                                <p className="text-xs text-slate-400">/ day</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg justify-center">
                                                <span>👤</span> {car.seats} Seats
                                            </div>
                                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg justify-center">
                                                <span>⚙️</span> {car.transmission}
                                            </div>
                                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg justify-center">
                                                <span>⛽</span> {car.fuel}
                                            </div>
                                        </div>

                                        <Link to={`/cars/${car._id}`} className="block w-full text-center btn-primary py-3 rounded-xl font-bold shadow-none">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="py-24">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Popular Destinations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularDestinations.map(dest => (
                            <div key={dest.id} className="relative group overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer">
                                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h4 className="text-xl font-bold">{dest.name}</h4>
                                    <p className="text-sm text-slate-300">{dest.carsCount} Cars Available</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
