import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Car from '../models/Car.js'
import Location from '../models/Location.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')

        // Clear existing data
        await User.deleteMany()
        await Car.deleteMany()
        await Location.deleteMany()
        console.log('Cleared existing data')

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@driveease.com',
            password: 'admin123',
            role: 'admin'
        })
        console.log('Created admin user')

        const seller = await User.create({
            name: 'John Seller',
            email: 'seller@driveease.com',
            password: 'seller123',
            role: 'seller'
        })

        // Create sample user
        await User.create({
            name: 'Test User',
            email: 'user@driveease.com',
            password: 'user123',
            role: 'user'
        })
        console.log('Created users')

        const locationsData = [
            { name: 'JFK Airport', address: 'JFK International Airport, Queens, NY', city: 'New York', isAirport: true },
            { name: 'LAX Airport', address: 'Los Angeles International Airport, CA', city: 'Los Angeles', isAirport: true },
            { name: 'Downtown Manhattan', address: '123 Broadway, New York, NY 10006', city: 'New York' },
            { name: 'Miami Beach', address: '456 Ocean Drive, Miami Beach, FL 33139', city: 'Miami' },
            { name: 'San Francisco Downtown', address: '789 Market St, San Francisco, CA 94103', city: 'San Francisco' },
            { name: 'Chicago O\'Hare', address: 'O\'Hare International Airport, Chicago, IL', city: 'Chicago', isAirport: true },
            { name: 'Las Vegas Strip', address: '3570 Las Vegas Blvd, Las Vegas, NV 89109', city: 'Las Vegas' },
            { name: 'Seattle Downtown', address: '123 Pike St, Seattle, WA 98101', city: 'Seattle' }
        ]

        const locations = await Location.insertMany(locationsData)
        console.log('Created locations')

        const carsData = [
            { name: 'Toyota Camry', brand: 'Toyota', type: 'Midsize', price: 45, fuel: 'Petrol', transmission: 'Automatic', seats: 5, luggage: 3, doors: 4, year: 2023, features: ['Bluetooth', 'Cruise Control', 'Backup Camera'], image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', popular: true },
            { name: 'Honda Civic', brand: 'Honda', type: 'Compact', price: 38, fuel: 'Petrol', transmission: 'Automatic', seats: 5, luggage: 2, doors: 4, year: 2023, features: ['Apple CarPlay', 'Lane Assist'], image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800' },
            { name: 'BMW 5 Series', brand: 'BMW', type: 'Luxury', price: 120, fuel: 'Petrol', transmission: 'Automatic', seats: 5, luggage: 3, doors: 4, year: 2024, features: ['Leather Seats', 'Sunroof', 'Navigation'], image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', recommended: true },
            { name: 'Tesla Model 3', brand: 'Tesla', type: 'Electric', price: 89, fuel: 'Electric', transmission: 'Automatic', seats: 5, luggage: 2, doors: 4, year: 2024, features: ['Autopilot', 'Premium Audio', 'Glass Roof'], image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', popular: true },
            { name: 'Ford Mustang', brand: 'Ford', type: 'Sports', price: 95, fuel: 'Petrol', transmission: 'Manual', seats: 4, luggage: 2, doors: 2, year: 2023, features: ['Sport Mode', 'Premium Sound'], image: 'https://images.unsplash.com/photo-1584345604476-8ec5f82bd14e?w=800' },
            { name: 'Jeep Grand Cherokee', brand: 'Jeep', type: 'SUV', price: 75, fuel: 'Petrol', transmission: 'Automatic', seats: 7, luggage: 4, doors: 4, year: 2023, features: ['4WD', 'Tow Package', 'Heated Seats'], image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', popular: true },
            { name: 'Mercedes-Benz E-Class', brand: 'Mercedes-Benz', type: 'Luxury', price: 135, fuel: 'Diesel', transmission: 'Automatic', seats: 5, luggage: 3, doors: 4, year: 2024, features: ['MBUX', 'Burmester Audio', 'Air Suspension'], image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800' },
            { name: 'Toyota RAV4 Hybrid', brand: 'Toyota', type: 'SUV', price: 65, fuel: 'Hybrid', transmission: 'Automatic', seats: 5, luggage: 3, doors: 4, year: 2023, features: ['AWD', 'Safety Sense', 'Wireless Charging'], image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800' },
            { name: 'Nissan Versa', brand: 'Nissan', type: 'Economy', price: 29, fuel: 'Petrol', transmission: 'Automatic', seats: 5, luggage: 2, doors: 4, year: 2023, features: ['Bluetooth', 'USB Ports'], image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800' },
            { name: 'Chevrolet Suburban', brand: 'Chevrolet', type: 'Van', price: 110, fuel: 'Petrol', transmission: 'Automatic', seats: 8, luggage: 5, doors: 4, year: 2023, features: ['Entertainment System', 'Captain Chairs'], image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800' }
        ]

        const carsWithRefs = carsData.map(car => ({
            ...car,
            seller: seller._id,
            location: locations[0]._id,
            images: [car.image, car.image]
        }))

        await Car.insertMany(carsWithRefs)
        console.log('Created cars')

        console.log('\n✅ Database seeded successfully!')
        console.log('\nTest Accounts:')
        console.log('Admin: admin@driveease.com / admin123')
        console.log('Seller: seller@driveease.com / seller123')
        console.log('User: user@driveease.com / user123')

        process.exit(0)
    } catch (err) {
        console.error('Error:', err.message)
        process.exit(1)
    }
}

seedData()
