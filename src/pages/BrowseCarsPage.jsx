import { useState, useEffect } from 'react'
import api from '../utils/api'
import { CarCard } from '../components/features/CarCard'
import { Pagination } from '../components/ui/Pagination'

export default function BrowseCarsPage() {
    const [cars, setCars] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [viewType, setViewType] = useState('grid')
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState({
        type: [],
        brand: [],
        price: [0, 500],
        transmission: [],
        fuel: []
    })
    const [sortBy, setSortBy] = useState('popular')

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true)
            try {
                const queryParams = new URLSearchParams({
                    page: currentPage,
                    limit: 12,
                    sort: sortBy,
                    ...(filters.type.length > 0 && { type: filters.type.join(',') }),
                    ...(filters.brand.length > 0 && { brand: filters.brand.join(',') }),
                    ...(filters.transmission.length > 0 && { transmission: filters.transmission.join(',') }),
                    ...(filters.fuel.length > 0 && { fuel: filters.fuel.join(',') }),
                    minPrice: filters.price[0],
                    maxPrice: filters.price[1]
                })

                const data = await api.get(`/cars?${queryParams.toString()}`)
                setCars(data.cars)
                setTotal(data.total)
            } catch (err) {
                console.error('Error fetching cars:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchCars()
    }, [currentPage, sortBy, filters])

    const handleFilterChange = (category, value) => {
        setFilters(prev => {
            const current = prev[category]
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value]
            return { ...prev, [category]: updated }
        })
        setCurrentPage(1)
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
            <div className="container-custom py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-80 space-y-8">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-card">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-800 dark:text-white">Filters</h3>
                                <button
                                    onClick={() => setFilters({ type: [], brand: [], price: [0, 500], transmission: [], fuel: [] })}
                                    className="text-xs text-primary-600 font-bold hover:underline"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Price Per Day</h4>
                                <input
                                    type="range" min="0" max="500" value={filters.price[1]}
                                    onChange={(e) => setFilters({ ...filters, price: [filters.price[0], parseInt(e.target.value)] })}
                                    className="w-full accent-primary-600 mb-2"
                                />
                                <div className="flex justify-between text-sm font-bold dark:text-white">
                                    <span>$0</span>
                                    <span className="text-primary-600">${filters.price[1]}</span>
                                </div>
                            </div>

                            {/* Vehicle Type */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Vehicle Type</h4>
                                <div className="space-y-3">
                                    {['Economy', 'Compact', 'Midsize', 'SUV', 'Luxury', 'Sports', 'Electric'].map(type => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.type.includes(type)}
                                                onChange={() => handleFilterChange('type', type)}
                                                className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-slate-600 dark:text-slate-300 group-hover:text-primary-600 transition-colors">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Transmission */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Transmission</h4>
                                <div className="space-y-3">
                                    {['Automatic', 'Manual'].map(trans => (
                                        <label key={trans} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.transmission.includes(trans)}
                                                onChange={() => handleFilterChange('transmission', trans)}
                                                className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-slate-600 dark:text-slate-300 group-hover:text-primary-600 transition-colors">{trans}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Area */}
                    <main className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
                            <div className="text-slate-500 text-sm">
                                Showing <span className="font-bold text-slate-800 dark:text-white">{cars.length}</span> of <span className="font-bold text-slate-800 dark:text-white">{total}</span> vehicles available
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600' : 'text-slate-400'}`}
                                    >
                                        田
                                    </button>
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600' : 'text-slate-400'}`}
                                    >
                                        ☰
                                    </button>
                                </div>

                                <select
                                    className="bg-slate-50 dark:bg-slate-700 border-none rounded-xl text-sm font-semibold px-4 py-2.5 focus:ring-primary-500 dark:text-white"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Best Rated</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-80 bg-white dark:bg-slate-800 rounded-3xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : cars.length === 0 ? (
                            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm">
                                <p className="text-slate-400 mb-4">No vehicles found matching your criteria.</p>
                                <button
                                    onClick={() => setFilters({ type: [], brand: [], price: [0, 500], transmission: [], fuel: [] })}
                                    className="btn-primary"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                                    {cars.map(car => (
                                        <CarCard key={car._id} car={car} variant={viewType} />
                                    ))}
                                </div>

                                <div className="mt-12 flex justify-center">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(total / 12)}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
