import express from 'express'
import Car from '../models/Car.js'
import Booking from '../models/Booking.js'
import User from '../models/User.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.get('/admin', protect, authorize('admin'), async (req, res) => {
    try {
        const [totalCars, totalBookings, totalUsers, totalSellers] = await Promise.all([
            Car.countDocuments(),
            Booking.countDocuments(),
            User.countDocuments({ role: 'user' }),
            User.countDocuments({ role: 'seller' })
        ])

        const bookings = await Booking.find()
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricing?.total || 0), 0)

        // Month-over-month calculation (simple mock version for now, could be improved with agg pipeline)
        const recentBookings = await Booking.find({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        })
        const monthlyRevenue = recentBookings.reduce((sum, b) => sum + (b.pricing?.total || 0), 0)

        res.json({
            success: true,
            stats: {
                totalCars,
                totalBookings,
                totalUsers,
                totalSellers,
                totalRevenue,
                monthlyRevenue
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router
