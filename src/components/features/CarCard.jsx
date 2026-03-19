import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import { formatPrice } from '../../utils/pricing'
import Rating from '../ui/Rating'

/**
 * Car card component with grid and list variants
 */
export function CarCard({ car, variant = 'grid' }) {
    const { toggleFavorite, isFavorite } = useFavorites()
    const favorite = isFavorite(car._id)

    const handleFavoriteClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(car)
    }

    if (variant === 'list') {
        return (
            <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-card hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row">
                <div className="relative w-full md:w-72 lg:w-80 aspect-[16/10] md:aspect-auto overflow-hidden">
                    <Link to={`/cars/${car._id}`} className="block w-full h-full">
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </Link>
                    <button
                        onClick={handleFavoriteClick}
                        className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-xl backdrop-blur-md transition-all ${favorite
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                            : 'bg-white/90 text-slate-400 hover:text-red-500'
                            }`}
                    >
                        {favorite ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                            <div>
                                <span className="inline-block bg-primary-50 dark:bg-primary-900/20 text-[10px] font-bold text-primary-600 uppercase tracking-widest px-2.5 py-1 rounded-lg mb-2">
                                    {car.type}
                                </span>
                                <Link to={`/cars/${car._id}`}>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                                        {car.name}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-3 mt-2">
                                    <Rating value={car.rating} size="sm" showValue />
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">• {car.reviewCount} Reviews</span>
                                </div>
                            </div>
                            <div className="sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{formatPrice(car.price)}</span>
                                <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase">Per Day</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mb-8 mt-6">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg bg-slate-100 dark:bg-slate-700 w-8 h-8 flex items-center justify-center rounded-lg">👤</span>
                                <span className="text-xs font-bold uppercase tracking-wider">{car.seats} Seats</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg bg-slate-100 dark:bg-slate-700 w-8 h-8 flex items-center justify-center rounded-lg">⚙️</span>
                                <span className="text-xs font-bold uppercase tracking-wider">{car.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg bg-slate-100 dark:bg-slate-700 w-8 h-8 flex items-center justify-center rounded-lg">⛽</span>
                                <span className="text-xs font-bold uppercase tracking-wider">{car.fuel}</span>
                            </div>
                            <div className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg bg-slate-100 dark:bg-slate-700 w-8 h-8 flex items-center justify-center rounded-lg">💼</span>
                                <span className="text-xs font-bold uppercase tracking-wider">{car.luggage || 2} Bags</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center mt-auto">
                        <Link to={`/cars/${car._id}`} className="btn-primary w-full sm:w-auto px-10 py-3.5 rounded-2xl">
                            Rent This Car
                        </Link>
                        <Link to={`/booking/${car._id}`} className="btn-outline w-full sm:w-auto px-8 py-3.5 rounded-2xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full relative">
            <div className="relative aspect-[16/10] overflow-hidden">
                <Link to={`/cars/${car._id}`}>
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10 rounded-xl backdrop-blur-xl transition-all duration-300 ${favorite
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                        : 'bg-slate-900/40 text-white border border-white/20 hover:bg-white hover:text-red-500'
                        }`}
                >
                    {favorite ? '❤️' : '🤍'}
                </button>

                <div className="absolute bottom-4 left-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border border-white/10">
                        {car.year || 2024}
                    </span>
                    <span className="bg-primary-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg shadow-primary-600/20">
                        {car.type}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6 gap-2">
                    <div className="flex-1 min-w-0">
                        <Link to={`/cars/${car._id}`}>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-1 group-hover:text-primary-600 transition-colors truncate">
                                {car.name}
                            </h3>
                        </Link>
                        <Rating value={car.rating} size="sm" showValue />
                    </div>
                    <div className="text-right flex-shrink-0">
                        <span className="text-2xl font-black text-primary-600 leading-none">{formatPrice(car.price)}</span>
                        <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase mt-0.5">/ Day</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-700/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <span className="text-lg">⚙️</span>
                        <div className="min-w-0">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-0.5">Transmission</p>
                            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">{car.transmission}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-700/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <span className="text-lg">⛽</span>
                        <div className="min-w-0">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-0.5">Fuel</p>
                            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">{car.fuel}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2.5 mt-auto pt-5 border-t border-slate-50 dark:border-slate-700/50">
                    <Link to={`/cars/${car._id}`} className="flex-1 bg-primary-600 text-white text-center py-3.5 rounded-xl font-bold text-xs hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/10">
                        Details
                    </Link>
                    <Link to={`/booking/${car._id}`} className="flex-1 border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-center py-3 rounded-xl font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        Book
                    </Link>
                </div>
            </div>
        </div>
    )
}

CarCard.propTypes = {
    car: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        transmission: PropTypes.string.isRequired,
        fuel: PropTypes.string.isRequired,
        seats: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        reviewCount: PropTypes.number.isRequired,
        year: PropTypes.number,
        luggage: PropTypes.number,
    }).isRequired,
    variant: PropTypes.oneOf(['grid', 'list'])
}
