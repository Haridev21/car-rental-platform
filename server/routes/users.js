import express from 'express'
import User from '../models/User.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// All user routes require admin access
router.use(protect)
router.use(authorize('admin'))

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 })
        res.json({ success: true, count: users.length, users })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   POST /api/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put('/:id/role', async (req, res) => {
    try {
        const { role } = req.body
        if (!['user', 'seller', 'admin'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' })
        }

        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        user.role = role
        await user.save()

        res.json({ success: true, user })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // Optional: Also delete user's cars and bookings here if desired
        await user.deleteOne()

        res.json({ success: true, message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router
