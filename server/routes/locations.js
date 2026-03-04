import express from 'express'
import Location from '../models/Location.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/locations
// @desc    Get all locations
// @access  Public
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find({ isActive: true }).sort({ name: 1 })
        res.json({ success: true, count: locations.length, locations })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   GET /api/locations/:id
// @desc    Get single location
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id)
        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' })
        }
        res.json({ success: true, location })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   POST /api/locations
// @desc    Create a location
// @access  Private (admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const location = await Location.create(req.body)
        res.status(201).json({ success: true, location })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   PUT /api/locations/:id
// @desc    Update a location
// @access  Private (admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' })
        }
        res.json({ success: true, location })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

// @route   DELETE /api/locations/:id
// @desc    Delete a location
// @access  Private (admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id)
        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' })
        }
        res.json({ success: true, message: 'Location deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

export default router
