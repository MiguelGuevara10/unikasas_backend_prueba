import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { createAccesToken } from "../libs/jwt.js"
import jwt from 'jsonwebtoken'
import { TOKEN_SECERT } from "../config.js"
import { sendEmail } from "../libs/email.js"
import Role from "../models/roles.model.js"

// Registar un usurio y devolver tpken de autenticacion
export const register = async (req, res) => {
    const {username, email, password} = req.body

    try{
        const userFound = await User.findOne({email}).populate('role')
        if (userFound) return res.status(400).json(["El email ya se encuentra en uso"]) 

        const passwordHash = await bcrypt.hash(password, 10)

        // Asignar el rol de visitante
        const role = await Role.findOne({name: "visitante"})

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role: role._id.toString(),
            state: true 
        })

        const userSave = await newUser.save()
        const token = await createAccesToken({id: userSave._id})
        res.cookie('token', token)

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        //     path: "/",
        //     maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
        // });

        res.json({
            _id: userSave._id,
            username: userSave.username,
            email: userSave.email,
            role: role,
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
        console.log(error)
        res.status(500).json({message: error.message})
    }
};

// Login de usuarios devolviendo token de acceso
export const login = async (req, res) => {
    try{
        const {email, password} = req.body

        const userFound = await User.findOne({email}).populate('role')
        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        // Validar que el password sea valido
        const isMath = await bcrypt.compare(password, userFound.password)
        if (!isMath) return res.status(400).json({ message: "Credenciales de acceso incorrectas"})

        // Validar que el usuario este activo
        if (userFound.state === false) return res.status(400).json({ message: "El usuario esta inactivo, no se permite iniciar sesión"})

        const token = await createAccesToken({id: userFound._id})
        res.cookie('token', token)

        // res.cookie("token", token, {
        //     httpOnly: false,
        //     sameSite: "none",
        //     secure: false,
        //     path: "/",
        //     maxAge: 3600000, // 1 days
        //     // domain: "http://127.0.0.1:5173",
        //   });

        res.json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            state: userFound.state,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Cerrar sesion del usuario
export const logout = async (req, res) => {
    res.cookie('token', "", {expires: new Date(0)})
    return res.sendStatus(200)
} 

// Verificar perfil del usuario
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id).populate('role')
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
    
    return res.json({
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
        state: userFound.state,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

// Validar token para dar permiso a rutas protegidas
export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    // console.log(token)

    if (!token) return res.status(401).json({message: "No autorizado"})
    
    jwt.verify(token, TOKEN_SECERT, async (error, user) => {
        if (error) return res.status(401).json({message: "No autorizado"})

        const userFound = await User.findById(user.id).populate('role')
        if (!userFound) return res.status(401).json({message: "No autorizado"})

        return res.json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            state: userFound.state,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    })
}

// Recuperar acceso a la cuenta
export const recoverAccount = async (req, res) => {
    const { email, pin, password } = req.body

    try{
        const userFound = await User.findOne({email}).populate('role')
        if (!userFound) return res.status(400).json(["Usuario no encontrado"]) 

        if (email && !pin) {
            // Generar pin
            let pin = ''
            Array.from({ length: 6 }).forEach(() => {
                const digit = Math.floor(Math.random() * 10); // Genera un número aleatorio del 0 al 9
                pin += digit;
            })

            const userUpdate = {
                email,
                pin: pin
            }

            // Guardar pin en la  base de datos
            const userSave = await User.findByIdAndUpdate(userFound._id, userUpdate, {new: true})
            if (!userSave) return res.status(404).json({message: "Usuario no encontrado"})
            // res.json(userSave)
            res.json({
                _id: userSave._id,
                username: userSave.username,
                email: userSave.email,
                role: userSave.role,
                state: userSave.state,
                createdAt: userSave.createdAt,
                updatedAt: userSave.updatedAt
            })

            // Enviar pin al correo eletronico
            if (userSave) {
                try {
                    sendEmail(userSave, "recover_account")
                } catch (error) {
                    return res.status(500).json({message: "Error al enviar email con el pin para el usuario"})
                }
            }
        } else if (email && pin && !password) { // Validadr pin del usuario ingresado
            if (userFound.pin === pin) {
                return res.status(200).json(["El pin es igual al enviado al correo eletronico"])
            } else {
                return res.status(400).json(["El pin no es igual al enviado al correo eletrotico"])
            }
        } else if (email && password) { // Cambiar el password de usuario
            const passwordHash = await bcrypt.hash(password, 10)

            const userUpdate = {
                email,
                password: passwordHash,
            }

            // Guardar el usuario con la nueva contraseña
            const userSave = await User.findByIdAndUpdate(userFound._id, userUpdate, {new: true})
            if (!userSave) return res.status(404).json({message: "Usuario no encontrado"})
            // res.json(userSave)
            res.json({
                _id: userSave._id,
                username: userSave.username,
                email: userSave.email,
                role: userSave.role,
                state: userSave.state,
                createdAt: userSave.createdAt,
                updatedAt: userSave.updatedAt
            })
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}