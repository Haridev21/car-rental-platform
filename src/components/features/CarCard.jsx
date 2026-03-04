import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import { formatPrice } from '../../utils/pricing'
import Rating from '../ui/Rating'

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
                <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
                    <Link to={`/cars/${car._id}`}>
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
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">{car.type}</span>
                                <Link to={`/cars/${car._id}`}>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1 group-hover:text-primary-600 transition-colors">
                                        {car.name}
                                    </h3>
                                </Link>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">{formatPrice(car.price)}</span>
                                <span className="text-xs font-bold text-slate-400 block tracking-widest uppercase">/ Day</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <Rating value={car.rating} size="sm" showValue />
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{car.reviewCount} Reviews</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">👤</span>
                                <span className="text-sm font-semibold">{car.seats} Seats</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">⚙️</span>
                                <span className="text-sm font-semibold">{car.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">⛽</span>
                                <span className="text-sm font-semibold">{car.fuel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-lg">💼</span>
                                <span className="text-sm font-semibold">{car.luggage || 2} Luggage</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <Link to={`/cars/${car._id}`} className="btn-primary w-full sm:w-auto px-10 py-3.5 rounded-2xl shadow-lg shadow-primary-500/20">
                            Rent This Car
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-[40px] overflow-hidden shadow-card hover:shadow-dashboard transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full relative">
            <div className="relative h-64 overflow-hidden">
                <Link to={`/cars/${car._id}`}>
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-2xl backdrop-blur-xl transition-all duration-300 transform group-hover:translate-x-0 translate-x-12 ${favorite
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 translate-x-0'
                        : 'bg-white/40 text-white border border-white/40 hover:bg-white hover:text-red-500'
                        }`}
                >
                    {favorite ? '❤️' : '🤍'}
                </button>

                <div className="absolute bottom-5 left-5 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-white/20">
                        {car.year || 2024}
                    </span>
                    <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-primary-600/20">
                        {car.type}
                    </span>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to={`/cars/${car._id}`}>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight mb-2 group-hover:text-primary-600 transition-colors">
                                {car.name}
                            </h3>
                        </Link>
                        <Rating value={car.rating} size="sm" showValue />
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black text-primary-600 leading-none">{formatPrice(car.price)}</span>
                        <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase mt-1">/ Day</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-3xl group/item">
                        <span className="text-xl">⚙️</span>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Transmission</p>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{car.transmission}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-3xl group/item">
                        <span className="text-xl">⛽</span>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Fuel</p>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{car.fuel}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-50 dark:border-slate-700">
                    <Link to={`/cars/${car._id}`} className="flex-1 btn-primary py-4 rounded-2xl font-bold text-sm shadow-none">
                        View Details
                    </Link>
                    <Link to={`/booking/${car._id}`} className="flex-1 btn-outline py-4 rounded-2xl font-bold text-sm">
                        Book Now
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
