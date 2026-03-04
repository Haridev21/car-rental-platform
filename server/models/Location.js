import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a location name'],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    city: {
        type: String,
        required: true
    },
    state: String,
    country: {
        type: String,
        default: 'USA'
    },
    zipCode: String,
    phone: String,
    email: String,
    hours: {
        type: String,
        default: '8:00 AM - 8:00 PM'
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    isAirport: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Location', locationSchema)
