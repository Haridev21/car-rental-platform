import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useToast } from './ToastContext'

const FavoritesContext = createContext()

/**
 * Context for managing favorite/wishlist cars
 */
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })

    const { success, warning } = useToast()

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (car) => {
        const exists = favorites.find(f => f._id === car._id)

        if (exists) {
            setFavorites(favorites.filter(f => f._id !== car._id))
            warning(`${car.name} removed from favorites`)
        } else {
            setFavorites([...favorites, car])
            success(`${car.name} added to favorites!`)
        }
    }

    const isFavorite = (carId) => {
        return favorites.some(f => f._id === carId)
    }

    const clearFavorites = () => {
        setFavorites([])
        warning('Favorites cleared')
    }

    return (
        <FavoritesContext.Provider value={{
            favorites,
            favoritesCount: favorites.length,
            toggleFavorite,
            isFavorite,
            clearFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
