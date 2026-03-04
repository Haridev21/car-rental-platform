// Rental extras/add-ons
export const extras = [
    {
        id: 'insurance-basic',
        category: 'insurance',
        name: 'Basic Protection',
        description: 'Covers damage to the rental vehicle with a $1000 deductible',
        pricePerDay: 15,
        icon: '🛡️',
        popular: true
    },
    {
        id: 'insurance-premium',
        category: 'insurance',
        name: 'Premium Protection',
        description: 'Full coverage with zero deductible, includes roadside assistance',
        pricePerDay: 28,
        icon: '🛡️',
        recommended: true
    },
    {
        id: 'insurance-liability',
        category: 'insurance',
        name: 'Liability Insurance',
        description: 'Supplemental liability protection up to $1 million',
        pricePerDay: 12,
        icon: '📋'
    },
    {
        id: 'gps',
        category: 'equipment',
        name: 'GPS Navigation',
        description: 'Portable GPS device with latest maps and traffic updates',
        pricePerDay: 8,
        icon: '🗺️',
        popular: true
    },
    {
        id: 'child-seat-infant',
        category: 'equipment',
        name: 'Infant Car Seat',
        description: 'Rear-facing car seat for infants (0-12 months)',
        pricePerDay: 10,
        icon: '👶'
    },
    {
        id: 'child-seat-toddler',
        category: 'equipment',
        name: 'Toddler Car Seat',
        description: 'Forward-facing car seat for toddlers (1-4 years)',
        pricePerDay: 10,
        icon: '🧒'
    },
    {
        id: 'child-seat-booster',
        category: 'equipment',
        name: 'Booster Seat',
        description: 'Booster seat for children (4-8 years)',
        pricePerDay: 8,
        icon: '💺'
    },
    {
        id: 'additional-driver',
        category: 'service',
        name: 'Additional Driver',
        description: 'Add an extra authorized driver to the rental agreement',
        pricePerDay: 12,
        icon: '👥',
        popular: true
    },
    {
        id: 'prepaid-fuel',
        category: 'service',
        name: 'Prepaid Fuel',
        description: 'Return the car with any fuel level - we fill it up at competitive rates',
        pricePerDay: 0,
        priceFixed: 65,
        icon: '⛽'
    },
    {
        id: 'wifi-hotspot',
        category: 'equipment',
        name: 'WiFi Hotspot',
        description: 'Portable WiFi device with unlimited data',
        pricePerDay: 10,
        icon: '📶'
    },
    {
        id: 'roadside-assistance',
        category: 'service',
        name: 'Roadside Assistance Plus',
        description: '24/7 roadside assistance including lockout service and flat tire help',
        pricePerDay: 7,
        icon: '🚗'
    },
    {
        id: 'ski-rack',
        category: 'equipment',
        name: 'Ski/Snowboard Rack',
        description: 'Roof-mounted rack for skis and snowboards',
        pricePerDay: 15,
        icon: '🎿',
        seasonal: true
    },
    {
        id: 'bike-rack',
        category: 'equipment',
        name: 'Bike Rack',
        description: 'Rear-mounted rack for up to 2 bicycles',
        pricePerDay: 12,
        icon: '🚴'
    },
    {
        id: 'toll-pass',
        category: 'service',
        name: 'Toll Pass',
        description: 'Pre-paid toll pass for convenient highway travel',
        pricePerDay: 6,
        icon: '🛣️'
    },
    {
        id: 'young-driver',
        category: 'service',
        name: 'Young Driver Fee',
        description: 'For drivers aged 21-24 (required by policy)',
        pricePerDay: 25,
        icon: '🎂',
        required: true
    }
]

// Get extras by category
export const getExtrasByCategory = (category) => {
    return extras.filter(extra => extra.category === category)
}

// Get popular extras
export const getPopularExtras = () => {
    return extras.filter(extra => extra.popular || extra.recommended)
}

// Get insurance options
export const getInsuranceOptions = () => {
    return extras.filter(extra => extra.category === 'insurance')
}

// Get equipment options
export const getEquipmentOptions = () => {
    return extras.filter(extra => extra.category === 'equipment')
}

// Get service options
export const getServiceOptions = () => {
    return extras.filter(extra => extra.category === 'service')
}

// Calculate extras total
export const calculateExtrasTotal = (selectedExtras, duration) => {
    return selectedExtras.reduce((total, extra) => {
        if (extra.priceFixed) {
            return total + extra.priceFixed
        }
        return total + (extra.pricePerDay * duration)
    }, 0)
}

// Extra categories for display
export const extraCategories = [
    { id: 'insurance', name: 'Protection Plans', icon: '🛡️' },
    { id: 'equipment', name: 'Equipment', icon: '🎒' },
    { id: 'service', name: 'Services', icon: '⚙️' }
]
