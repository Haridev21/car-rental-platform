import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role, phone, licenseNumber, dateOfBirth } = req.body
        console.log(req.body)
        // Check if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            })
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
            phone,
            licenseNumber,
            dateOfBirth
        })

        // Generate token
        const token = user.getSignedJwtToken()

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            })
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // Check password
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // Generate token
        const token = user.getSignedJwtToken()

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/me', protect, async (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
})

router.put('/profile', protect, async (req, res) => {
    try {
        const { name, phone, licenseNumber, dateOfBirth } = req.body

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone, licenseNumber, dateOfBirth },
            { new: true, runValidators: true }
        )

        res.json({
            success: true,
            user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.put('/password', protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        const user = await User.findById(req.user._id).select('+password')

        // Check current password
        const isMatch = await user.matchPassword(currentPassword)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            })
        }

        user.password = newPassword
        await user.save()

        const token = user.getSignedJwtToken()

        res.json({
            success: true,
            token,
            message: 'Password updated successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

export default router
