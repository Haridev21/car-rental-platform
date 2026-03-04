import { useState, useEffect } from 'react'

/**
 * Custom hook for persisting state to localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - initial value if no stored value exists
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
    // Get from localStorage or use initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    // Update localStorage when value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    // Wrapper function that also updates localStorage
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
        } catch (error) {
            console.warn(`Error in setValue for localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue]
}

export default useLocalStorage
