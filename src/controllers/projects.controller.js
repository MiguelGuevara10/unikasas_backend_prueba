import { generateReport } from "../libs/reports.js"
import Project from "../models/project.model.js" 
import Quote from "../models/quotes.models.js" 

// Traer todos los proyectos | filtro de busqueda por campos
export const getProjects = async (req, res) => {
    let projects = []
    try {
        if (req && req.query.query) { // Filtrar usuarios mediante parametro de busqueda
            projects = await Project.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"responsible": {$regex:req.query.query, $options:"i"}},
                    {"city": {$regex:req.query.query, $options:"i"}},
                    {"state": {$regex:req.query.query, $options:"i"}},
                ]
            })
            .populate({
                path: 'quote',
                populate: { path: 'product' } // Aquí se indica que se quiere popular el campo 'product' de la colección 'Quote'
            })
            .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            projects = await Project.find()
                .populate({
                    path: 'quote',
                    populate: { path: 'product' } // Aquí se indica que se quiere popular el campo 'product' de la colección 'Quote'
                }).sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(projects)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar proyectos"})   
    }
}

// Traer un proyecto por id
export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) return res.status(404).json({message: "Proyecto no encontrado"})
        res.json(project)
    } catch (error) {
        return res.status(404).json({message: "Proyecto no encontrado"})
    }
}

// Crear un proyecto
export const createProject = async (req, res) => {
    try {
        const { name, responsible, estimated_cost, final_cost, city, address, start_date, end_date, quote, description, state } = req.body
         
        // Validar si ya existe un proyecto con el id de cotizacion creado para no permitir crearlo
        const project = await Project.find({ quote: quote })
        if (project.length > 0) return res.status(404).json({message: "Ya existe un proyecto creado para esa cotización"})

        const newProject = Project({
            name,
            responsible,
            estimated_cost,
            final_cost,
            city,
            address,
            start_date, 
            end_date,
            quote,
            description,
            state
        })

        const saveProject = await newProject.save()
        res.json(saveProject)

        // Modificar el estao de la cotizacion a fianlizada
        await Quote.findByIdAndUpdate(saveProject.quote, { state: 'finalizada' }, {new: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error al crear proyecto"})
    }
}

// Modificar un proyecto
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!project) return res.status(404).json({message: "Proyecto no encontrado"})
        res.json(project)
    } catch (error) {
        return res.status(404).json({message: "Proyecto no encontrado"})
    } 
}

// Eliminar un proyecto
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return res.status(404).json({message: "Proyecto no encontrado"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Proyecto no encontrado"})
    }
}

// Generar reporte de proyectos
export const getReportProjects = async (req, res) => {
    try {
        const { start_date, end_date, report } = req.body

        const projects = await Project.find({ 
            createdAt: {
                $gte: start_date, // Mayor o igual que 
                $lte: end_date    // Menor o igual que 
            }
        }).populate('quote')

        // retornar un archivo vacio
        if (projects.length === 0) {
            res.setHeader('Content-Type', 'application');
            return res.send()
        }

        // Convertir campos
        const projectsModified = projects.map(project => {
            const modifiedProject = project.toObject(); // Convierte el documento Mongoose a un objeto JS
        
            // Convierte los campos al formato deseado
            modifiedProject.start_date = project.start_date.toISOString()
            modifiedProject.end_date = project.end_date.toISOString()
            modifiedProject.quote = project.quote.name
            modifiedProject.createdAt = project.createdAt.toISOString()
            modifiedProject.updatedAt = project.updatedAt.toISOString()
            delete modifiedProject.__v
        
            return modifiedProject;
        })

        console.log(projectsModified)
        
        await generateReport(projectsModified, 
            "Reporte de proyectos Unikasas", "Este es el reporte de proyectos del sistema", res, report)
        
    } catch (error) {
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}