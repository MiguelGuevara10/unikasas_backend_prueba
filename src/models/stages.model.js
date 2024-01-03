import mongoose from 'mongoose'

// Esquema de Etapas de un proyecto en Mongo db
const stageShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Stage', stageShema)