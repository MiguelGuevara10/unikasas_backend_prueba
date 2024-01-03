import Stage from "../models/stages.model.js"

// Traer todos las etapas | filtro de busqueda por campos
export const getStages = async (req, res) => {
    let stages = []
    try {
        if (req && req.query.query) { // Filtrar etapas mediante parametro de busqueda
            stages = await Stage.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"description": {$regex:req.query.query, $options:"i"}},
                ],
                project: req.query.id_project
            }).sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            stages = await Stage.find({ project: req.query.id_project }) // Traer solo las etapas del proyecto por id
                .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(stages)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar etapas"})   
    }
}

// Traer una etapa por id
export const getSatge = async (req, res) => {
    try {
        const stage = await Stage.findById(req.params.id)
        if (!stage) return res.status(404).json({message: "Etapa del proyecto no encontrada"})
        res.json(stage)
    } catch (error) {
        return res.status(404).json({message: "Etapa del proyecto no encontrada"})
    }
}

// Crear una etapa
export const createStage = async (req, res) => {
    try {
        const { name, description, project } = req.body

        const newStage = Stage({
            name,
            description,
            project,
        })

        const saveStage = await newStage.save()
        res.json(saveStage)
    } catch (error) {
        return res.status(500).json({message: "Error al crear etapa"})
    }
}

// Modificar una etapa
export const updateStage = async (req, res) => {
    try {
        const stage = await Stage.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!stage) return res.status(404).json({message: "Etapa del proyecto no encontrada"})
        res.json(stage)
    } catch (error) {
        return res.status(404).json({message: "Etapa del proyecto no encontrada"})
    } 
}

// Eliminar una etapa
export const deleteStage = async (req, res) => {
    try {
        const stage = await Stage.findByIdAndDelete(req.params.id)
        if (!stage) return res.status(404).json({message: "Etapa del proyecto no encontrada"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Etapa del proyecto no encontrada"})
    }
}