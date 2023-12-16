import mongoose from 'mongoose'

// Esquema de cotizaciones en Mongo db
const quoteShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 10, // Restringir a 10 por ser el numero de telefono 
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
    comments: {
        type: String,
        required: false,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    state: {
        type: String,
        enum: ['pendiente', 'respondida'],
        default: 'pendiente'
      }
}, {
    timestamps: true
})

export default mongoose.model('Quote', quoteShema)