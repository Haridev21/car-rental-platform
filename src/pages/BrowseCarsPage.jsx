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
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-card sticky top-24 border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-slate-800 dark:text-white">Filters</h3>
                                <button
                                    onClick={() => setFilters({ type: [], brand: [], price: [0, 500], transmission: [], fuel: [] })}
                                    className="text-xs text-primary-600 font-bold hover:underline bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg transition-all"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Price Per Day</h4>
                                    <span className="text-sm font-black text-primary-600">${filters.price[1]}</span>
                                </div>
                                <input
                                    type="range" min="0" max="500" value={filters.price[1]}
                                    onChange={(e) => setFilters({ ...filters, price: [filters.price[0], parseInt(e.target.value)] })}
                                    className="w-full accent-primary-600 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                    <span>$0</span>
                                    <span>$500</span>
                                </div>
                            </div>

                            {/* Vehicle Type */}
                            <div className="mb-10">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Vehicle Type</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {['Economy', 'Compact', 'Midsize', 'SUV', 'Luxury', 'Sports', 'Electric'].map(type => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.type.includes(type)}
                                                    onChange={() => handleFilterChange('type', type)}
                                                    className="w-5 h-5 rounded-lg border-slate-200 dark:border-slate-700 text-primary-600 focus:ring-primary-500/20 transition-all cursor-pointer"
                                                />
                                            </div>
                                            <span className={`text-sm font-bold transition-colors ${filters.type.includes(type) ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Transmission */}
                            <div>
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Transmission</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {['Automatic', 'Manual'].map(trans => (
                                        <label key={trans} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={filters.transmission.includes(trans)}
                                                onChange={() => handleFilterChange('transmission', trans)}
                                                className="w-5 h-5 rounded-lg border-slate-200 dark:border-slate-700 text-primary-600 focus:ring-primary-500/20 transition-all cursor-pointer"
                                            />
                                            <span className={`text-sm font-bold transition-colors ${filters.transmission.includes(trans) ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                                                {trans}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Area */}
                    <main className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 bg-white dark:bg-slate-800 p-5 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-700/50">
                            <div className="text-slate-400 text-sm font-bold">
                                Showing <span className="text-slate-800 dark:text-white px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md">{cars.length}</span>
                                <span className="mx-1">of</span>
                                <span className="text-slate-800 dark:text-white px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md">{total}</span>
                                <span className="ml-1 tracking-tight">results</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex bg-slate-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${viewType === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${viewType === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    </button>
                                </div>

                                <div className="relative">
                                    <select
                                        className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black px-6 py-3.5 pr-10 focus:ring-2 focus:ring-primary-500/20 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="newest">Newest First</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Best Rated</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-[16/20] bg-white dark:bg-slate-800 rounded-[32px] animate-pulse border border-slate-100 dark:border-slate-700/50"></div>
                                ))}
                            </div>
                        ) : cars.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-800 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700/50">
                                <div className="text-6xl mb-6">🔍</div>
                                <h3 className="text-XL font-black text-slate-800 dark:text-white mb-2">No Results Found</h3>
                                <p className="text-slate-400 text-sm font-bold mb-8 text-center max-w-xs">We couldn&apos;t find any vehicles matching your current filters.</p>
                                <button
                                    onClick={() => setFilters({ type: [], brand: [], price: [0, 500], transmission: [], fuel: [] })}
                                    className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8' : 'space-y-6 lg:space-y-8'}>
                                    {cars.map(car => (
                                        <CarCard key={car._id} car={car} variant={viewType} />
                                    ))}
                                </div>

                                <div className="mt-16 flex justify-center">
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
