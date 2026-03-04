import express from 'express'
import Booking from '../models/Booking.js'
import Car from '../models/Car.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { car, pickupLocation, returnLocation, pickupDate, returnDate, extras, customerInfo, pricing, promoCode } = req.body

        // Check if car exists and is available
        const carDoc = await Car.findById(car)
        if (!carDoc) {
            return res.status(404).json({ success: false, message: 'Car not found' })
        }

        // Create booking
        const booking = await Booking.create({
            user: req.user._id,
            car,
            pickupLocation,
            returnLocation,
            pickupDate,
            returnDate,
            extras,
            customerInfo,
            pricing,
            promoCode,
            status: 'confirmed',
            paymentStatus: 'paid'
        })

        // Add booked dates to car
        await Car.findByIdAndUpdate(car, {
            $push: {
                bookedDates: { startDate: pickupDate, endDate: returnDate }
            }
        })

        res.status(201).json({ success: true, booking })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/bookings
// @desc    Get user bookings (or all for admin)
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let query = {}

        // Regular users can only see their bookings
        if (req.user.role !== 'admin') {
            if (req.query.type === 'sales' && req.user.role === 'seller') {
                // Find cars owned by this seller
                const cars = await Car.find({ seller: req.user._id })
                const carIds = cars.map(car => car._id)
                query.car = { $in: carIds }
            } else {
                // Default: my bookings (as a customer)
                query.user = req.user._id
            }
        }

        const bookings = await Booking.find(query)
            .populate('car', 'name image price type')
            .populate('pickupLocation', 'name address')
            .populate('returnLocation', 'name address')
            .sort({ createdAt: -1 })

        res.json({ success: true, count: bookings.length, bookings })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('car')
            .populate('pickupLocation')
            .populate('returnLocation')

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' })
        }

        // Check ownership (unless admin)
        if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' })
        }

        res.json({ success: true, booking })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' })
        }

        // Check ownership (unless admin)
        if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' })
        }

        // Check if already cancelled or completed
        if (['cancelled', 'completed'].includes(booking.status)) {
            return res.status(400).json({ success: false, message: 'Cannot cancel this booking' })
        }

        booking.status = 'cancelled'
        await booking.save()

        // Remove booked dates from car
        await Car.findByIdAndUpdate(booking.car, {
            $pull: {
                bookedDates: { startDate: booking.pickupDate, endDate: booking.returnDate }
            }
        })

        res.json({ success: true, booking })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private (seller owner, admin)
router.put('/:id/status', protect, authorize('seller', 'admin'), async (req, res) => {
    try {
        const { status } = req.body
        const booking = await Booking.findById(req.params.id).populate('car')

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' })
        }

        // Check permission: Admin or Car Owner
        if (req.user.role !== 'admin' && booking.car.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this booking' })
        }

        booking.status = status
        await booking.save()

        res.json({ success: true, booking })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router
