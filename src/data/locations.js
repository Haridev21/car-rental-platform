// 15 pickup/return locations
export const locations = [
    {
        id: 1,
        name: 'Los Angeles International Airport (LAX)',
        address: '1 World Way, Los Angeles, CA 90045',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90045',
        phone: '(310) 555-0123',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 33.9425, lng: -118.4081 },
        popular: true
    },
    {
        id: 2,
        name: 'San Francisco International Airport (SFO)',
        address: 'San Francisco International Airport, San Francisco, CA 94128',
        city: 'San Francisco',
        state: 'CA',
        zip: '94128',
        phone: '(650) 555-0124',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 37.6213, lng: -122.3790 },
        popular: true
    },
    {
        id: 3,
        name: 'Downtown Los Angeles',
        address: '700 S Flower St, Los Angeles, CA 90017',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90017',
        phone: '(213) 555-0125',
        hours: '7:00 AM - 9:00 PM',
        type: 'city',
        coordinates: { lat: 34.0522, lng: -118.2437 },
        popular: true
    },
    {
        id: 4,
        name: 'Downtown San Francisco',
        address: '75 Howard St, San Francisco, CA 94105',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        phone: '(415) 555-0126',
        hours: '7:00 AM - 9:00 PM',
        type: 'city',
        coordinates: { lat: 37.7749, lng: -122.4194 },
        popular: true
    },
    {
        id: 5,
        name: 'John F. Kennedy International Airport (JFK)',
        address: 'John F Kennedy Intl Airport, Jamaica, NY 11430',
        city: 'New York',
        state: 'NY',
        zip: '11430',
        phone: '(718) 555-0127',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 40.6413, lng: -73.7781 }
    },
    {
        id: 6,
        name: 'Manhattan Midtown',
        address: '250 W 43rd St, New York, NY 10036',
        city: 'New York',
        state: 'NY',
        zip: '10036',
        phone: '(212) 555-0128',
        hours: '7:00 AM - 10:00 PM',
        type: 'city',
        coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    {
        id: 7,
        name: 'Miami International Airport (MIA)',
        address: '2100 NW 42nd Ave, Miami, FL 33142',
        city: 'Miami',
        state: 'FL',
        zip: '33142',
        phone: '(305) 555-0129',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 25.7959, lng: -80.2870 }
    },
    {
        id: 8,
        name: 'Miami Beach',
        address: '1701 Collins Ave, Miami Beach, FL 33139',
        city: 'Miami Beach',
        state: 'FL',
        zip: '33139',
        phone: '(305) 555-0130',
        hours: '8:00 AM - 8:00 PM',
        type: 'city',
        coordinates: { lat: 25.7907, lng: -80.1300 }
    },
    {
        id: 9,
        name: 'Las Vegas McCarran Airport (LAS)',
        address: '7135 Gilespie St, Las Vegas, NV 89119',
        city: 'Las Vegas',
        state: 'NV',
        zip: '89119',
        phone: '(702) 555-0131',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 36.0840, lng: -115.1537 },
        popular: true
    },
    {
        id: 10,
        name: 'Las Vegas Strip',
        address: '3570 Las Vegas Blvd S, Las Vegas, NV 89109',
        city: 'Las Vegas',
        state: 'NV',
        zip: '89109',
        phone: '(702) 555-0132',
        hours: '24/7',
        type: 'city',
        coordinates: { lat: 36.1215, lng: -115.1739 }
    },
    {
        id: 11,
        name: "O'Hare International Airport (ORD)",
        address: "10000 W O'Hare Ave, Chicago, IL 60666",
        city: 'Chicago',
        state: 'IL',
        zip: '60666',
        phone: '(773) 555-0133',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 41.9742, lng: -87.9073 }
    },
    {
        id: 12,
        name: 'Chicago Downtown',
        address: '151 E Wacker Dr, Chicago, IL 60601',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        phone: '(312) 555-0134',
        hours: '7:00 AM - 9:00 PM',
        type: 'city',
        coordinates: { lat: 41.8867, lng: -87.6185 }
    },
    {
        id: 13,
        name: 'Seattle-Tacoma Airport (SEA)',
        address: '17801 International Blvd, Seattle, WA 98158',
        city: 'Seattle',
        state: 'WA',
        zip: '98158',
        phone: '(206) 555-0135',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 47.4502, lng: -122.3088 }
    },
    {
        id: 14,
        name: 'Denver International Airport (DEN)',
        address: '8500 Peña Blvd, Denver, CO 80249',
        city: 'Denver',
        state: 'CO',
        zip: '80249',
        phone: '(303) 555-0136',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 39.8561, lng: -104.6737 }
    },
    {
        id: 15,
        name: 'Boston Logan Airport (BOS)',
        address: '1 Harborside Dr, Boston, MA 02128',
        city: 'Boston',
        state: 'MA',
        zip: '02128',
        phone: '(617) 555-0137',
        hours: '24/7',
        type: 'airport',
        coordinates: { lat: 42.3656, lng: -71.0096 }
    }
]

// Get location by ID
export const getLocationById = (id) => {
    return locations.find(loc => loc.id === parseInt(id))
}

// Get popular locations
export const getPopularLocations = (limit = 6) => {
    return locations.filter(loc => loc.popular).slice(0, limit)
}

// Get airport locations
export const getAirportLocations = () => {
    return locations.filter(loc => loc.type === 'airport')
}

// Get city center locations
export const getCityLocations = () => {
    return locations.filter(loc => loc.type === 'city')
}

// Search locations
export const searchLocations = (query) => {
    const q = query.toLowerCase()
    return locations.filter(loc =>
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q)
    )
}

// Popular destinations for homepage
export const popularDestinations = [
    { id: 1, city: 'Los Angeles', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400', carsAvailable: 156 },
    { id: 2, city: 'San Francisco', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', carsAvailable: 98 },
    { id: 3, city: 'Miami', image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=400', carsAvailable: 124 },
    { id: 4, city: 'Las Vegas', image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=400', carsAvailable: 87 },
    { id: 5, city: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', carsAvailable: 201 },
    { id: 6, city: 'Chicago', image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400', carsAvailable: 76 }
]
