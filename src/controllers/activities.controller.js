import { generateReport } from "../libs/reports.js"
import Activity from "../models/activities.model.js" 

// Traer todos las actvividades | filtro de busqueda por campos
export const getActivities = async (req, res) => {
    let activities = []
    try {
        if (req && req.query.query) { // Filtrar actividades mediante parametro de busqueda
            activities = await Activity.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"responsible": {$regex:req.query.query, $options:"i"}},
                    {"state": {$regex:req.query.query, $options:"i"}},
                ],
                stage_id: req.query.id_stage
            }).sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            activities = await Activity.find({ stage_id: req.query.id_stage }) // Traer solo las actividades de la etapa por id
                .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(activities)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar actividades de una etapa"})   
    }
}

// Traer una actividad por id
export const getActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id)
        if (!activity) return res.status(404).json({message: "Actividad de etapa no encontrada"})
        res.json(activity)
    } catch (error) {
        return res.status(404).json({message: "Actividad de etapa no encontrada"})
    }
}

// Crear una actividad
export const createActivity = async (req, res) => {
    try {
        const { name, responsible, objective, start_date, end_date, observations, state, stage } = req.body
            
        const newActivity = Activity({
            name,
            responsible,
            objective,
            start_date,
            end_date,
            observations,
            state,
            stage_id: stage
        })

        console.log(newActivity)

        const saveActivity = await newActivity.save()
        res.json(saveActivity)
    } catch (error) {
        return res.status(500).json({message: "Error al crear actividad"})
    }
}

// Modificar una actividad
export const updateAcivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!activity) return res.status(404).json({message: "Actividad de etapa no encontrada"})
        res.json(activity)
    } catch (error) {
        return res.status(404).json({message: "Actividad de etapa no encontrada"})
    } 
}

// Eliminar una actividad
export const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id)
        if (!activity) return res.status(404).json({message: "Actividad de etapa no encontrada"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Actividad de etapa no encontrada"})
    }
}