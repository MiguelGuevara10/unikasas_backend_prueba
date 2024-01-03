import User from "../models/user.model.js"
import { sendEmail } from "../libs/email.js"
import bcrypt from 'bcryptjs'
import { generateReport } from "../libs/reports.js"

// Traer todas los usuarios 
export const getUsers = async (req, res) => {
    let users = []
    try {
        if (req && req.query.query) { // Filtrar usuarios mediante parametro de busqueda
            users = await User.find({
                "$or" : [ 
                    {"username": {$regex:req.query.query, $options:"i"}},
                    {"email": {$regex:req.query.query, $options:"i"}},
                    // {"role": {$regex:req.query.query, $options:"i"}},
                ]
            }).populate('role')
            .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            users = await User.find().populate('role')
                .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(users)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar usuarios"})   
    }
}

// Traer un usuario por id
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('role')
        if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        res.json(user)
    } catch (error) {
        return res.status(404).json({message: "Usuario no encontrado"})
    }
}

// crear un usuario
export const createUser = async (req, res) => {
    const {username, email, password, role, state} = req.body

    try{
        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(["El email ya se encuentra en uso"]) 

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
            state
        })

        const userSave = await newUser.save()

        res.status(200).json({
            id: userSave._id,
            username: userSave.username,
            email: userSave.email,
            role: userSave.role,
            state: userSave.state,
            createdAt: userSave.createdAt,
            updatedAt: userSave.updatedAt
        })
         // Enviar email de registo de usuario
         if (userSave) {
            try {
                sendEmail(userSave, "registro_usuario")
            } catch (error) {
                return res.status(500).json({message: "Error al enviar email de registro de usuario"}) 
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Modificar un usuario
export const updateUser = async (req, res) => {
    try {
        const {username, email, password, role, state} = req.body

        const passwordHash = await bcrypt.hash(password, 10)

        const newUpdate = {
            username,
            email,
            password: passwordHash,
            role, 
            state
        } 

        // TODO pendiente validar el password anterior antes de hacer el cambio

        const user = await User.findByIdAndUpdate(req.params.id, newUpdate, {new: true})
        if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        res.json(user)
    } catch (error) {
        return res.status(404).json({message: "Usuario no encontrado"})
    } 
}

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Usuario no encontrado"})
    }
}

// Generar reporte de usuarios
export const getReportUsers = async (req, res) => {
    try {
        const { start_date, end_date, report } = req.body

        const users = await User.find({ 
            createdAt: {
                $gte: start_date, // Mayor o igual que 
                $lte: end_date    // Menor o igual que 
            }
        }).populate('role')

        // retornar un archivo vacio
        if (users.length === 0) {
            res.setHeader('Content-Type', 'application');
            return res.send()
        }

        // Convertir campos
        const usersModified = users.map(user => {
            const modifiedUser = user.toObject(); // Convierte el documento Mongoose a un objeto JS
        
            // Convierte los campos al formato deseado
            modifiedUser.state = user.state === true ? "Activo" : "Inactivo"
            modifiedUser.privileges = user.role.privileges.join(', ')
            modifiedUser.role = user.role.name
            modifiedUser.createdAt = user.createdAt.toISOString()
            modifiedUser.updatedAt = user.updatedAt.toISOString()
            // modifiedUser.user = user.user.username
            delete modifiedUser.__v
            delete modifiedUser.password
            delete modifiedUser.pin
        
            return modifiedUser;
        });
        
        await generateReport(usersModified, 
            "Reporte de usuarios Unikasas", "Este es el reporte de usuarios del sistema", res, report)
        
    } catch (error) {
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}