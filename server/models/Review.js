import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
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
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking'
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: 1,
        max: 5
    },
    title: {
        type: String,
        maxlength: 100
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

reviewSchema.index({ car: 1, user: 1 }, { unique: true })

reviewSchema.statics.getAverageRating = async function (carId) {
    const obj = await this.aggregate([
        { $match: { car: carId } },
        {
            $group: {
                _id: '$car',
                averageRating: { $avg: '$rating' },
                count: { $sum: 1 }
            }
        }
    ])

    try {
        await mongoose.model('Car').findByIdAndUpdate(carId, {
            rating: obj[0] ? Math.round(obj[0].averageRating * 10) / 10 : 0,
            reviewCount: obj[0] ? obj[0].count : 0
        })
    } catch (err) {
        console.error(err)
    }
}

reviewSchema.post('save', async function () {
    await this.constructor.getAverageRating(this.car)
})

reviewSchema.post('remove', async function () {
    await this.constructor.getAverageRating(this.car)
})

export default mongoose.model('Review', reviewSchema)
