import mongoose from 'mongoose'

// Esquema de contacto de usuario en Mongo db
const contactmeShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('Contactme', contactmeShema)