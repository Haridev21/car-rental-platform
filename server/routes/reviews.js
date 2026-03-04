import express from 'express'
import Review from '../models/Review.js'
import Booking from '../models/Booking.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, async (req, res) => {
    try {
        const { car, rating, title, comment, booking } = req.body

        // Check if user has booked this car (optional validation)
        if (booking) {
            const bookingDoc = await Booking.findById(booking)
            if (!bookingDoc || bookingDoc.user.toString() !== req.user._id.toString()) {
                return res.status(400).json({ success: false, message: 'Invalid booking' })
            }
        }

        // Check if user already reviewed this car
        const existingReview = await Review.findOne({ car, user: req.user._id })
        if (existingReview) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this car' })
        }

        const review = await Review.create({
            user: req.user._id,
            car,
            booking,
            rating,
            title,
            comment
        })

        await review.populate('user', 'name avatar')

        res.status(201).json({ success: true, review })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/car/:carId', async (req, res) => {
    try {
        const reviews = await Review.find({ car: req.params.carId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 })

        res.json({ success: true, count: reviews.length, reviews })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get('/recent', async (req, res) => {
    try {
        const reviews = await Review.find({ rating: { $gte: 4 } })
            .populate('user', 'name avatar')
            .populate('car', 'name')
            .sort({ createdAt: -1 })
            .limit(6)

        res.json({ success: true, reviews })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.delete('/:id', protect, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' })
        }

        // Check ownership (unless admin)
        if (req.user.role !== 'admin' && review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' })
        }

        await review.deleteOne()

        res.json({ success: true, message: 'Review deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router
