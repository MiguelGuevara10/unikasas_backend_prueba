import mongoose from 'mongoose'

// Esquema de productos en Mongo db
const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    floors: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean, // pasar a boolean
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('Product', productShema)