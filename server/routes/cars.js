import express from 'express'
import Car from '../models/Car.js'
import { protect, authorize } from '../middleware/auth.js'
import Booking from '../models/Booking.js'

const router = express.Router()

// @route   GET /api/cars
// @desc    Get all cars with filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { type, brand, transmission, fuel, minPrice, maxPrice, seats, available, sort, page = 1, limit = 12 } = req.query

        // Build query
        const query = {}

        if (type) query.type = { $in: type.split(',') }
        if (brand) query.brand = { $in: brand.split(',') }
        if (transmission) query.transmission = { $in: transmission.split(',') }
        if (fuel) query.fuel = { $in: fuel.split(',') }
        if (seats) query.seats = { $gte: parseInt(seats) }
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = parseInt(minPrice)
            if (maxPrice) query.price.$lte = parseInt(maxPrice)
        }
        if (available === 'true') query.available = true

        // Sort
        let sortOption = {}
        switch (sort) {
            case 'price-low': sortOption = { price: 1 }; break
            case 'price-high': sortOption = { price: -1 }; break
            case 'rating': sortOption = { rating: -1 }; break
            case 'newest': sortOption = { createdAt: -1 }; break
            default: sortOption = { popular: -1, rating: -1 }
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit)

        const [cars, total] = await Promise.all([
            Car.find(query).populate('seller', 'name email').sort(sortOption).skip(skip).limit(parseInt(limit)),
            Car.countDocuments(query)
        ])

        res.json({
            success: true,
            count: cars.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            cars
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/cars/featured
// @desc    Get featured cars
// @access  Public
router.get('/featured', async (req, res) => {
    try {
        const cars = await Car.find({ available: true })
            .sort({ popular: -1, rating: -1 })
            .limit(6)

        res.json({ success: true, cars })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})



// @route   POST /api/cars
// @desc    Create a car
// @access  Private (seller, admin)
router.post('/', protect, authorize('seller', 'admin'), async (req, res) => {
    try {
        req.body.seller = req.user._id
        const car = await Car.create(req.body)

        res.status(201).json({ success: true, car })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   PUT /api/cars/:id
// @desc    Update a car
// @access  Private (seller owner, admin)
router.put('/:id', protect, authorize('seller', 'admin'), async (req, res) => {
    try {
        let car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' })
        }

        // Check ownership (unless admin)
        if (req.user.role !== 'admin' && car.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this car' })
        }

        car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        res.json({ success: true, car })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   DELETE /api/cars/:id
// @desc    Delete a car
// @access  Private (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' })
        }

        await car.deleteOne()

        res.json({ success: true, message: 'Car deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/cars/my-cars
// @desc    Get current seller's cars
// @access  Private (seller)
router.get('/my-cars', protect, authorize('seller'), async (req, res) => {
    try {
        const cars = await Car.find({ seller: req.user._id })
        res.json({ success: true, count: cars.length, cars })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/cars/seller-stats
// @desc    Get stats for current seller
// @access  Private (seller)
router.get('/seller-stats', protect, authorize('seller'), async (req, res) => {
    try {
        const cars = await Car.find({ seller: req.user._id })
        const carIds = cars.map(c => c._id)

        const totalCars = cars.length
        const availableCars = cars.filter(c => c.available).length

        // Find bookings for these cars
        const bookings = await Booking.find({ car: { $in: carIds } })
        const totalBookings = bookings.length
        const totalEarnings = bookings.reduce((sum, b) => sum + (b.pricing?.total || 0), 0)

        // Current active bookings
        const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'active').length

        res.json({
            success: true,
            stats: {
                totalCars,
                availableCars,
                totalBookings,
                totalEarnings,
                activeBookings
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/cars/:id
// @desc    Get single car
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('seller', 'name').populate('location')

        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' })
        }

        res.json({ success: true, car })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router
