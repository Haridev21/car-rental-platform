import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import statsRoutes from './routes/stats.js'

dotenv.config()

await connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'DriveEase API is active. Go to /api/health for more info.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/stats', statsRoutes)

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'DriveEase API is running' })
})

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
