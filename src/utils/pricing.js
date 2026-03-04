// Pricing configuration and calculations

// Seasonal price multipliers
const seasonalPricing = {
    peak: 1.3,      // Summer (Jun-Aug), Holidays
    high: 1.15,    // Spring/Fall
    regular: 1.0,   // Normal
    low: 0.85      // Winter (Jan-Feb)
}

// Duration discounts (percentage off)
const durationDiscounts = {
    3: 5,    // 3-6 days: 5% off
    7: 10,   // 7-13 days: 10% off
    14: 15,  // 14-29 days: 15% off
    30: 20   // 30+ days: 20% off
}

// Weekend surcharge (Fri-Sun pickup)
const weekendSurcharge = 1.1

// Get season for a date
export const getSeason = (date) => {
    const month = new Date(date).getMonth() + 1
    const day = new Date(date).getDate()

    // Peak season: June to August, December holidays
    if (month >= 6 && month <= 8) return 'peak'
    if (month === 12 && day >= 15) return 'peak'

    // Low season: January to February
    if (month >= 1 && month <= 2) return 'low'

    // High season: March to May, September to November
    if ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) return 'high'

    return 'regular'
}

// Check if date is weekend
export const isWeekend = (date) => {
    const day = new Date(date).getDay()
    return day === 0 || day === 5 || day === 6 // Fri, Sat, Sun
}

// Calculate rental duration in days
export const calculateDuration = (pickupDate, returnDate) => {
    if (!pickupDate || !returnDate) return 0
    const pickup = new Date(pickupDate)
    const return_ = new Date(returnDate)
    const diffTime = Math.abs(return_ - pickup)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(1, diffDays) // Minimum 1 day
}

// Get duration discount
export const getDurationDiscount = (days) => {
    if (days >= 30) return durationDiscounts[30]
    if (days >= 14) return durationDiscounts[14]
    if (days >= 7) return durationDiscounts[7]
    if (days >= 3) return durationDiscounts[3]
    return 0
}

// Calculate base price with modifiers
export const calculateBasePrice = (car, days, pickupDate) => {
    let pricePerDay = car.price

    // Apply seasonal pricing
    const season = getSeason(pickupDate)
    pricePerDay *= seasonalPricing[season]

    // Apply weekend surcharge if applicable
    if (isWeekend(pickupDate)) {
        pricePerDay *= weekendSurcharge
    }

    // Calculate base total
    let baseTotal = pricePerDay * days

    // Apply duration discount
    const discountPercent = getDurationDiscount(days)
    const discount = baseTotal * (discountPercent / 100)

    return {
        pricePerDay: Math.round(pricePerDay * 100) / 100,
        baseTotal: Math.round(baseTotal * 100) / 100,
        durationDiscount: Math.round(discount * 100) / 100,
        discountPercent,
        season
    }
}

// Calculate extras total
export const calculateExtrasPrice = (extras, days) => {
    return extras.reduce((total, extra) => {
        if (extra.priceFixed) {
            return total + extra.priceFixed
        }
        return total + (extra.pricePerDay * days)
    }, 0)
}

// Promo code validation and discounts
const promoCodes = {
    'SAVE10': { discount: 10, type: 'percent', description: '10% off' },
    'SAVE20': { discount: 20, type: 'percent', description: '20% off' },
    'FLAT50': { discount: 50, type: 'fixed', description: '$50 off' },
    'WELCOME': { discount: 15, type: 'percent', description: '15% off for new customers' },
    'SUMMER24': { discount: 25, type: 'percent', description: '25% summer special' }
}

export const validatePromoCode = (code) => {
    const promo = promoCodes[code?.toUpperCase()]
    if (promo) {
        return { valid: true, ...promo }
    }
    return { valid: false, message: 'Invalid promo code' }
}

// Calculate promo discount
export const calculatePromoDiscount = (subtotal, promoCode) => {
    const promo = promoCodes[promoCode?.toUpperCase()]
    if (!promo) return 0

    if (promo.type === 'percent') {
        return subtotal * (promo.discount / 100)
    }
    return Math.min(promo.discount, subtotal) // Fixed discount, max = subtotal
}

// Tax rate
const TAX_RATE = 0.085 // 8.5%

// Calculate total price with full breakdown
export const calculateTotalPrice = (car, days, extras = [], pickupDate, promoCode = null) => {
    // Base price
    const baseCalc = calculateBasePrice(car, days, pickupDate)

    // Extras total
    const extrasTotal = calculateExtrasPrice(extras, days)

    // Subtotal before discounts
    const subtotalBeforeDiscount = baseCalc.baseTotal - baseCalc.durationDiscount + extrasTotal

    // Promo discount
    const promoDiscount = calculatePromoDiscount(subtotalBeforeDiscount, promoCode)

    // Subtotal after discounts
    const subtotal = subtotalBeforeDiscount - promoDiscount

    // Taxes
    const taxes = subtotal * TAX_RATE

    // Final total
    const total = subtotal + taxes

    return {
        pricePerDay: baseCalc.pricePerDay,
        basePrice: baseCalc.baseTotal,
        durationDiscount: baseCalc.durationDiscount,
        discountPercent: baseCalc.discountPercent,
        extrasTotal: Math.round(extrasTotal * 100) / 100,
        promoDiscount: Math.round(promoDiscount * 100) / 100,
        subtotal: Math.round(subtotal * 100) / 100,
        taxes: Math.round(taxes * 100) / 100,
        total: Math.round(total * 100) / 100,
        season: baseCalc.season,
        days
    }
}

// Format price
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(price)
}

// Get price range label
export const getPriceRangeLabel = (min, max) => {
    if (min === 0 && max >= 500) return 'Any price'
    if (min === 0) return `Up to ${formatPrice(max)}/day`
    if (max >= 500) return `${formatPrice(min)}+/day`
    return `${formatPrice(min)} - ${formatPrice(max)}/day`
}
