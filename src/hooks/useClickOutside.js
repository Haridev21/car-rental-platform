import { useEffect, useRef } from 'react'

/**
 * Custom hook for detecting clicks outside an element
 * @param {Function} handler - callback to run when clicking outside
 * @returns {Object} - ref to attach to element
 */
export function useClickOutside(handler) {
    const ref = useRef(null)

    useEffect(() => {
        const listener = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [handler])

    return ref
}

export default useClickOutside
