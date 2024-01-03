import mongoose from 'mongoose'

// Esquema de roles de usuario en Mongo db
const roleShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    privileges: {
        type: [String],
        required: false,
        default: ['Visualize']
    }
}, {
    timestamps: true
})

export default mongoose.model('Role', roleShema)