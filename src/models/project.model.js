import mongoose from 'mongoose'

// Esquema de Proyectos en Mongo db
const projectShema = new mongoose.Schema({
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
    estimated_cost: {
        type: Number,
        required: true
    },
    final_cost: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
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
    quote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote',
        required: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    state: {
        type: String,
        required: false,
        enum: ['En ejecución', 'Suspendido','Finalizado'],
        default: 'En ejecución'
    },
}, {
    timestamps: true
})

export default mongoose.model('Project', projectShema)