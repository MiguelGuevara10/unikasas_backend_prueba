import Role from "../models/roles.model.js" 
import { generateReport } from "../libs/reports.js"

// Traer todos los roles
export const getRoles = async (req, res) => {
    let roles = []
    try {
        if (req && req.query.query) { // Filtrar roles mediante parametro de busqueda
            roles = await Role.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    // {"description": {$regex:req.query.query, $options:"i"}},
                ]
            })
            // .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            roles = await Role.find()
            // .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(roles)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar roles"})   
    }
}

// Traer una rol por id
export const getRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id)
        if (!role) return res.status(404).json({message: "Rol no encontrado"})
        res.json(role)
    } catch (error) {
        return res.status(404).json({message: "Rol no encontrado"})
    }
}

// Crear un rol
export const createRole = async (req, res) => {
    try {
        const { name, privileges } = req.body

        const newRole = Role({
            name,
            privileges
        })

        const saveRole = await newRole.save()
        res.json(saveRole)
    } catch (error) {
        return res.status(500).json({message: "Error al crear rol"})
    }
}

// Modificar un rol
export const updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!role) return res.status(404).json({message: "Rol no encontrado"})
        res.json(role)
    } catch (error) {
        return res.status(404).json({message: "Rol no encontrado"})
    } 
}

// Eliminar un rol
export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id)
        if (!role) return res.status(404).json({message: "Rol no encontrado"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Rol no encontrado"})
    }
}

export const getReportRoles = async (req, res) => {
    try {
        const { start_date, end_date, report } = req.body

        const roles = await Role.find({ 
            createdAt: {
                $gte: start_date, // Mayor o igual que 
                $lte: end_date    // Menor o igual que 
            }
        })

        // retornar un archivo vacio
        if (roles.length === 0) {
            res.setHeader('Content-Type', 'application');
            return res.send()
        }

        // Convertir campos
        const rolesModified = roles.map(role => {
            const modifiedRole = role.toObject(); // Convierte el documento Mongoose a un objeto JS
        
            // Convierte los campos al formato deseado
            modifiedRole.createdAt = role.createdAt.toISOString()
            modifiedRole.updatedAt = role.updatedAt.toISOString()
            modifiedRole.privileges = role.privileges.join(', ')
            delete modifiedRole.__v
        
            return modifiedRole;
        })
        
        await generateReport(rolesModified, 
            "Reporte de roles Unikasas", "Este es el reporte de roles de usuarios", res, report)
        
    } catch (error) {
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}