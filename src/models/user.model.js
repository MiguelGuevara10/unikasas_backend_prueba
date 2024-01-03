import mongoose from 'mongoose'

// Esquema de usuarios en Mongo db
const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    state: {
        type: Boolean,
        required: false,
        default: true
    },
    pin: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userShema)