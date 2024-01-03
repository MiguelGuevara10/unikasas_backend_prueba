import mongoose from 'mongoose'

// Esquema de contacto de usuario en Mongo db
const contactmeShema = new mongoose.Schema({
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
        required: false,
        maxlength: 10, // Restringir a 10 por ser el numero de telefono 
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    consent: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
})

export default mongoose.model('Contactme', contactmeShema)