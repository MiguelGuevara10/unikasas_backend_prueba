import Role from "../models/roles.model.js"
import User from "../models/user.model.js"
import { EMAIL_UNIKASAS, PASSWORD_EMAIL} from "../config.js"
import bcrypt from 'bcryptjs'

export const createRoles = async () => {
    try {
        // Validar si ya existen para no volever a crearlos
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return

        // Privilegios de los roles a crear
        const privileges = [
            "Visualizar",
            "Crear",
            "Modificar",
            "Eliminar",
            "Reportes",
            "Roles"
        ]

        const rolesData = [
            {
                name: "admin",
                privileges: privileges
            },
            {
                name: "administrador",
                privileges: [privileges[0],privileges[1],privileges[2],privileges[4]]
            },
            {
                name: "secertaria",
                privileges: [privileges[0],privileges[1],privileges[2],privileges[4]] 
            },
            {
                name: "usuario",
                privileges: [privileges[0], privileges[1],privileges[2]] 
            },
            {
                name: "visitante",
                privileges: [privileges[0]] 
            }
        ]
        
        // Crear los roles en la base de datos
        const newRoles = await Role.insertMany(rolesData)

        // Crear un usuario admin con el correo de la empresa
        const userFound = await User.findOne({ email: EMAIL_UNIKASAS })
        if (userFound !== null && userFound !== undefined) return 

        const passwordHash = await bcrypt.hash(PASSWORD_EMAIL, 10)
        
        const newUser = User({
            username: 'admin',
            email: EMAIL_UNIKASAS,
            password: passwordHash,
            role: newRoles[0]._id,
            state: true
        })

        const saveUser = await newUser.save()
        // console.log(saveUser)

    } catch (error) {
        console.error(error)
    }
}