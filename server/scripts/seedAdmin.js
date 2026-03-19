import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import connectDB from '../config/db.js'

dotenv.config()

const seedAdmin = async () => {
    try {
        await connectDB()

        const adminEmail = 'admin@driveease.com'
        const existingAdmin = await User.findOne({ email: adminEmail })

        if (existingAdmin) {
            console.log('Admin user found. Forcing password reset to "password123"...')
            existingAdmin.password = 'password123'
            existingAdmin.role = 'admin'
            await existingAdmin.save()
            console.log('Admin user reset successfully!')
            process.exit(0)
        }

        const adminUser = await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: 'password123', // Hardcoded for this sample script
            role: 'admin',
            isVerified: true
        })

        console.log('Admin user seeded successfully!')
        console.log(`Email: ${adminEmail}`)
        console.log(`Password: password123`)
        
        process.exit(0)
    } catch (err) {
        console.error('Error seeding admin:', err)
        process.exit(1)
    }
}

seedAdmin()
