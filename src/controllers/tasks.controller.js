import Task from "../models/task.model.js" 
import { generateReport } from "../libs/reports.js"

// Traer todas las tareas del usuario logueado 
export const getTasks = async (req, res) => {
    // const tasks = await Task.find()
    let tasks = []
    try {
        if (req && req.query.query) { // Filtrat tareas mediante parametro de busqueda
            console.log(req.query)
            tasks = await Task.find({
                "$or" : [ 
                    {"title": {$regex:req.query.query, $options:"i"}},
                    {"description": {$regex:req.query.query, $options:"i"}},
                ]
            })

        } else {
            tasks = await Task.find({
                user: req.user.id
            }).populate('user')
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
export const getReport = async (req, res) => {
    try {
        const { isPdf } = req.body
        
        const tasks = await Task.find({
            user: req.user.id
        })
        // .select({
        //     titulo: '$title',
        //     descripcion: '$description',
        //     fecha_creacion: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        //     // usuario: '$user.username'
        // });

        const fileName = "reporte"
        const title = "Reporte de tareas"
        const subtitle = "Este es el reporte de tareas del usuario"
        
        await generateReport(tasks, fileName, title, subtitle, res, isPdf)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}