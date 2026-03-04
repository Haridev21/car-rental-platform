import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { CarCard } from '../components/features/CarCard'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Button } from '../components/ui/Button'

export default function FavoritesPage() {
    const { favorites, clearFavorites, favoritesCount } = useFavorites()

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container-custom py-8">
                <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Favorites' }]} className="mb-8" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-2">My Wishlist</h1>
                        <p className="text-slate-500">You have {favoritesCount} vehicles saved in your favorites.</p>
                    </div>

                    {favoritesCount > 0 && (
                        <button
                            onClick={clearFavorites}
                            className="text-sm font-bold text-red-600 hover:text-red-700 underline"
                        >
                            Clear All Favorites
                        </button>
                    )}
                </div>

                {favoritesCount === 0 ? (
                    <div className="max-w-md mx-auto text-center py-20">
                        <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 grayscale opacity-80">
                            ❤️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Explore our fleet and save your favorite premium vehicles here for easy access later.
                        </p>
                        <Link to="/cars">
                            <Button size="lg" rounded="full">Start Browsing</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favorites.map(car => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
