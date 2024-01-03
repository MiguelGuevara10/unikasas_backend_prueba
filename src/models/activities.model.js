import mongoose from 'mongoose'

// Esquema de Actividades de una etapa de un proyecto en Mongo db
const actvityShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    responsible: {
        type: String,
        required: true,
        trim: true
    },
    objective: {
        type: String,
        required: true,
        trim: true
    },
    start_date: {
        type: Date,
        default: Date.now,
    }, 
    end_date: {
        type: Date,
        default: Date.now,
    },
    observations: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: false,
        enum: ['En ejecución', 'Suspendida','Finalizada'],
        default: 'En ejecución'
    },
    stage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stage',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Activity', actvityShema)