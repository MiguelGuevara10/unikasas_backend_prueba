import Task from "../models/task.model.js" 
import { generateReport } from "../libs/reports.js"

// Traer todas las tareas del usuario logueado 
export const getTasks = async (req, res) => {
    let tasks = []
    try {
        if (req && req.query.query) { // Filtrar tareas mediante parametro de busqueda
            tasks = await Task.find({
                "$or" : [ 
                    {"title": {$regex:req.query.query, $options:"i"}},
                    {"description": {$regex:req.query.query, $options:"i"}},
                ]
            }).populate('user')
            .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            tasks = await Task.find({
                user: req.user.id
            }).populate('user')
            .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar tareas"})   
    }
}

// Traer una tarea por id
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({message: "Tarea no encontrada"})
        res.json(task)
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"})
    }
}

// Crear una tarea
export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body

        const newTask = Task({
            title,
            description,
            date,
            user: req.user.id,
        })

        const saveTask = await newTask.save()
        res.json(saveTask)
    } catch (error) {
        return res.status(500).json({message: "Error al crear tarea"})
    }
}

// Modificar una tarea
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!task) return res.status(404).json({message: "Tarea no encontrada"})
        res.json(task)
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"})
    } 
}

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({message: "Tarea no encontrada"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Tarea no encontrada"})
    }
}

// Generar reporte de tareas
export const getReportTasks = async (req, res) => {
    try {
        const { start_date, end_date, report } = req.body

        const tasks = await Task.find({ 
            user: req.user.id,
            createdAt: {
                $gte: start_date, // Mayor o igual que 
                $lte: end_date    // Menor o igual que 
            }
        }).populate('user')

        // retornar un archivo vacio
        if (tasks.length === 0) {
            res.setHeader('Content-Type', 'application');
            return res.send()
        }

        // Convertir campos
        const tasksModified = tasks.map(task => {
            const modifiedTask = task.toObject(); // Convierte el documento Mongoose a un objeto JS
        
            // Convierte los campos al formato deseado
            modifiedTask.date = task.date.toISOString()
            modifiedTask.createdAt = task.createdAt.toISOString()
            modifiedTask.updatedAt = task.updatedAt.toISOString()
            modifiedTask.user = task.user.username
            delete modifiedTask.__v
        
            return modifiedTask;
        })
        
        await generateReport(tasksModified, 
            "Reporte de tareas Unikasas", "Este es el reporte de tareas del usuario", res, report)
        
    } catch (error) {
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}