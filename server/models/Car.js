import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a car name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    type: {
        type: String,
        required: [true, 'Please add a car type'],
        enum: ['Economy', 'Compact', 'Midsize', 'SUV', 'Luxury', 'Sports', 'Electric', 'Van']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price per day']
    },
    image: {
        type: String,
        default: 'default-car.jpg'
    },
    images: [{
        type: String
    }],
    fuel: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        required: true
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual'],
        required: true
    },
    seats: {
        type: Number,
        required: true,
        min: 2,
        max: 12
    },
    luggage: {
        type: Number,
        default: 2
    },
    doors: {
        type: Number,
        default: 4
    },
    year: {
        type: Number,
        required: true
    },
    mileage: String,
    range: String,
    features: [{
        type: String
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    popular: {
        type: Boolean,
        default: false
    },
    recommended: {
        type: Boolean,
        default: false
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    },
    bookedDates: [{
        startDate: Date,
        endDate: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

carSchema.index({ name: 'text', brand: 'text' })
carSchema.index({ type: 1, brand: 1, price: 1 })

export default mongoose.model('Car', carSchema)
