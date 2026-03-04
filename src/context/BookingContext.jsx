import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { calculateTotalPrice, calculateDuration } from '../utils/pricing'

const BookingContext = createContext()

const initialBookingState = {
    car: null,
    pickupLocation: null,
    returnLocation: null,
    pickupDate: null,
    returnDate: null,
    extras: [],
    customerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        dateOfBirth: ''
    },
    paymentInfo: {
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    },
    promoCode: null,
    promoDiscount: 0,
    currentStep: 1
}

export function BookingProvider({ children }) {
    const [booking, setBooking] = useState(initialBookingState)
    const [bookingHistory, setBookingHistory] = useState(() => {
        const saved = localStorage.getItem('bookingHistory')
        return saved ? JSON.parse(saved) : []
    })

    // Calculate rental duration
    const duration = useMemo(() => {
        if (booking.pickupDate && booking.returnDate) {
            return calculateDuration(booking.pickupDate, booking.returnDate)
        }
        return 0
    }, [booking.pickupDate, booking.returnDate])

    // Calculate total price
    const priceBreakdown = useMemo(() => {
        if (!booking.car || !duration) {
            return {
                basePrice: 0,
                extrasTotal: 0,
                subtotal: 0,
                discount: 0,
                taxes: 0,
                total: 0
            }
        }

        return calculateTotalPrice(
            booking.car,
            duration,
            booking.extras,
            booking.pickupDate,
            booking.promoCode
        )
    }, [booking.car, duration, booking.extras, booking.pickupDate, booking.promoCode])

    // Set selected car
    const selectCar = useCallback((car) => {
        setBooking(prev => ({ ...prev, car }))
    }, [])

    // Update pickup/return details
    const setRentalDetails = useCallback((details) => {
        setBooking(prev => ({
            ...prev,
            pickupLocation: details.pickupLocation ?? prev.pickupLocation,
            returnLocation: details.returnLocation ?? prev.returnLocation,
            pickupDate: details.pickupDate ?? prev.pickupDate,
            returnDate: details.returnDate ?? prev.returnDate
        }))
    }, [])

    // Toggle extra
    const toggleExtra = useCallback((extra) => {
        setBooking(prev => {
            const exists = prev.extras.find(e => e.id === extra.id)
            if (exists) {
                return {
                    ...prev,
                    extras: prev.extras.filter(e => e.id !== extra.id)
                }
            }
            return {
                ...prev,
                extras: [...prev.extras, extra]
            }
        })
    }, [])

    // Update customer info
    const updateCustomerInfo = useCallback((info) => {
        setBooking(prev => ({
            ...prev,
            customerInfo: { ...prev.customerInfo, ...info }
        }))
    }, [])

    // Update payment info
    const updatePaymentInfo = useCallback((info) => {
        setBooking(prev => ({
            ...prev,
            paymentInfo: { ...prev.paymentInfo, ...info }
        }))
    }, [])

    // Apply promo code
    const applyPromoCode = useCallback((code) => {
        // Mock promo codes
        const promoCodes = {
            'SAVE10': { discount: 10, type: 'percent' },
            'SAVE20': { discount: 20, type: 'percent' },
            'FLAT50': { discount: 50, type: 'fixed' }
        }

        const promo = promoCodes[code.toUpperCase()]
        if (promo) {
            setBooking(prev => ({
                ...prev,
                promoCode: code.toUpperCase(),
                promoDiscount: promo.discount
            }))
            return { success: true, message: `Promo code applied! ${promo.type === 'percent' ? promo.discount + '%' : '$' + promo.discount} off` }
        }
        return { success: false, message: 'Invalid promo code' }
    }, [])

    // Remove promo code
    const removePromoCode = useCallback(() => {
        setBooking(prev => ({
            ...prev,
            promoCode: null,
            promoDiscount: 0
        }))
    }, [])

    // Navigate between steps
    const nextStep = useCallback(() => {
        setBooking(prev => ({
            ...prev,
            currentStep: Math.min(prev.currentStep + 1, 5)
        }))
    }, [])

    const prevStep = useCallback(() => {
        setBooking(prev => ({
            ...prev,
            currentStep: Math.max(prev.currentStep - 1, 1)
        }))
    }, [])

    const goToStep = useCallback((step) => {
        setBooking(prev => ({
            ...prev,
            currentStep: Math.max(1, Math.min(step, 5))
        }))
    }, [])

    // Confirm booking
    const confirmBooking = useCallback(() => {
        const confirmedBooking = {
            ...booking,
            id: `BK-${Date.now()}`,
            status: 'confirmed',
            priceBreakdown,
            duration,
            confirmedAt: new Date().toISOString()
        }

        const updatedHistory = [confirmedBooking, ...bookingHistory]
        setBookingHistory(updatedHistory)
        localStorage.setItem('bookingHistory', JSON.stringify(updatedHistory))

        return confirmedBooking
    }, [booking, priceBreakdown, duration, bookingHistory])

    // Reset booking
    const resetBooking = useCallback(() => {
        setBooking(initialBookingState)
    }, [])

    // Start new booking with car
    const startBooking = useCallback((car, pickupDate, returnDate, pickupLocation) => {
        setBooking({
            ...initialBookingState,
            car,
            pickupDate,
            returnDate,
            pickupLocation,
            returnLocation: pickupLocation
        })
    }, [])

    const value = {
        booking,
        duration,
        priceBreakdown,
        bookingHistory,
        selectCar,
        setRentalDetails,
        toggleExtra,
        updateCustomerInfo,
        updatePaymentInfo,
        applyPromoCode,
        removePromoCode,
        nextStep,
        prevStep,
        goToStep,
        confirmBooking,
        resetBooking,
        startBooking
    }

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    )
}

BookingProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export function useBooking() {
    const context = useContext(BookingContext)
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider')
    }
    return context
}

export default BookingContext
