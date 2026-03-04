import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// Route imports
import authRoutes from './routes/auth.js'
import carRoutes from './routes/cars.js'
import bookingRoutes from './routes/bookings.js'
import reviewRoutes from './routes/reviews.js'
import locationRoutes from './routes/locations.js'
import statsRoutes from './routes/stats.js'

// Load env vars
dotenv.config()

// Connect to database
await connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/stats', statsRoutes)

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'DriveEase API is running' })
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error'
    })
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
