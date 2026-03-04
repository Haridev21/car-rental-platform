import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: true
    },
    pickupLocation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location',
        required: true
    },
    returnLocation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location',
        required: true
    },
    pickupDate: {
        type: Date,
        required: [true, 'Please add a pickup date']
    },
    returnDate: {
        type: Date,
        required: [true, 'Please add a return date']
    },
    extras: [{
        name: String,
        price: Number
    }],
    customerInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        licenseNumber: String,
        dateOfBirth: Date
    },
    pricing: {
        basePrice: Number,
        extrasTotal: Number,
        taxes: Number,
        discount: Number,
        total: Number
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    promoCode: String,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Prevent double booking
bookingSchema.index({ car: 1, pickupDate: 1, returnDate: 1 })

export default mongoose.model('Booking', bookingSchema)
