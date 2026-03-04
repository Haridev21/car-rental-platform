import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { cars } from '../data/cars'

const SearchContext = createContext()

const defaultFilters = {
    carType: [],
    brand: [],
    fuelType: [],
    transmission: [],
    priceRange: [0, 500],
    minSeats: 0,
    minRating: 0,
    availableOnly: false
}

export function SearchProvider({ children }) {
    // Search query
    const [searchQuery, setSearchQuery] = useState('')

    // Location and dates
    const [pickupLocation, setPickupLocation] = useState(null)
    const [returnLocation, setReturnLocation] = useState(null)
    const [pickupDate, setPickupDate] = useState(null)
    const [returnDate, setReturnDate] = useState(null)

    // Filters
    const [filters, setFilters] = useState(defaultFilters)

    // Sorting
    const [sortBy, setSortBy] = useState('popular') // popular, price-low, price-high, rating

    // View mode
    const [viewMode, setViewMode] = useState('grid') // grid, list

    // Recent searches
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches')
        return saved ? JSON.parse(saved) : []
    })

    // Get unique values for filter options
    const filterOptions = useMemo(() => ({
        carTypes: [...new Set(cars.map(c => c.type))],
        brands: [...new Set(cars.map(c => c.brand))],
        fuelTypes: [...new Set(cars.map(c => c.fuel))],
        transmissions: [...new Set(cars.map(c => c.transmission))],
        maxPrice: Math.max(...cars.map(c => c.price)),
        maxSeats: Math.max(...cars.map(c => c.seats))
    }), [])

    // Filter and sort cars
    const filteredCars = useMemo(() => {
        let result = [...cars]

        // Text search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(car =>
                car.name.toLowerCase().includes(query) ||
                car.brand.toLowerCase().includes(query) ||
                car.type.toLowerCase().includes(query)
            )
        }

        // Car type filter
        if (filters.carType.length > 0) {
            result = result.filter(car => filters.carType.includes(car.type))
        }

        // Brand filter
        if (filters.brand.length > 0) {
            result = result.filter(car => filters.brand.includes(car.brand))
        }

        // Fuel type filter
        if (filters.fuelType.length > 0) {
            result = result.filter(car => filters.fuelType.includes(car.fuel))
        }

        // Transmission filter
        if (filters.transmission.length > 0) {
            result = result.filter(car => filters.transmission.includes(car.transmission))
        }

        // Price range filter
        result = result.filter(car =>
            car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
        )

        // Minimum seats filter
        if (filters.minSeats > 0) {
            result = result.filter(car => car.seats >= filters.minSeats)
        }

        // Minimum rating filter
        if (filters.minRating > 0) {
            result = result.filter(car => car.rating >= filters.minRating)
        }

        // Available only filter
        if (filters.availableOnly) {
            result = result.filter(car => car.available)
        }

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                result.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                result.sort((a, b) => b.rating - a.rating)
                break
            case 'popular':
            default:
                result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
                break
        }

        return result
    }, [searchQuery, filters, sortBy])

    // Update filter
    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }, [])

    // Toggle array filter value
    const toggleFilterValue = useCallback((key, value) => {
        setFilters(prev => {
            const current = prev[key] || []
            const exists = current.includes(value)
            return {
                ...prev,
                [key]: exists
                    ? current.filter(v => v !== value)
                    : [...current, value]
            }
        })
    }, [])

    // Reset filters
    const resetFilters = useCallback(() => {
        setFilters(defaultFilters)
    }, [])

    // Get active filter count
    const activeFilterCount = useMemo(() => {
        let count = 0
        if (filters.carType.length > 0) count += filters.carType.length
        if (filters.brand.length > 0) count += filters.brand.length
        if (filters.fuelType.length > 0) count += filters.fuelType.length
        if (filters.transmission.length > 0) count += filters.transmission.length
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++
        if (filters.minSeats > 0) count++
        if (filters.minRating > 0) count++
        if (filters.availableOnly) count++
        return count
    }, [filters])

    // Save search to recent
    const saveRecentSearch = useCallback((search) => {
        setRecentSearches(prev => {
            // Remove duplicate if exists
            const filtered = prev.filter(s =>
                s.location !== search.location || s.query !== search.query
            )
            // Add new search at the beginning
            const updated = [
                { ...search, timestamp: new Date().toISOString() },
                ...filtered
            ].slice(0, 5) // Keep only last 5 searches
            localStorage.setItem('recentSearches', JSON.stringify(updated))
            return updated
        })
    }, [])

    // Clear recent searches
    const clearRecentSearches = useCallback(() => {
        setRecentSearches([])
        localStorage.removeItem('recentSearches')
    }, [])

    const value = {
        // Search
        searchQuery,
        setSearchQuery,

        // Location & Dates
        pickupLocation,
        setPickupLocation,
        returnLocation,
        setReturnLocation,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,

        // Filters
        filters,
        filterOptions,
        updateFilter,
        toggleFilterValue,
        resetFilters,
        activeFilterCount,

        // Sorting
        sortBy,
        setSortBy,

        // View mode
        viewMode,
        setViewMode,

        // Results
        filteredCars,
        totalResults: filteredCars.length,

        // Recent searches
        recentSearches,
        saveRecentSearch,
        clearRecentSearches
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}

export default SearchContext
