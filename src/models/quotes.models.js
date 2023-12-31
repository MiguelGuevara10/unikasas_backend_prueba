import mongoose from 'mongoose'

// Esquema de cotizaciones en Mongo db
const quoteShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 10, // Restringir a 10 por ser el numero de telefono 
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
    comments: {
        type: String,
        required: false,
        trim: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    state: {
        type: String,
        enum: ['pendiente','respondida','cancelada','completada','finalizada'],
        default: 'pendiente'
    },
    response: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Quote', quoteShema)