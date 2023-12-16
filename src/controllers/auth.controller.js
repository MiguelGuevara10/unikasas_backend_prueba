import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { createAccesToken } from "../libs/jwt.js"
import jwt from 'jsonwebtoken'
import { TOKEN_SECERT } from "../config.js"

// Registar un usurio y devolver tpken de autenticacion
export const register = async (req, res) => {
    const {username, email, password} = req.body

    try{
        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(["El email ya se encuentra en uso"]) 

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

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
            id: userSave._id,
            username: userSave.username,
            email: userSave.email,
            createdAt: userSave.createdAt,
            updatedAt: userSave.updatedAt
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Login de usuarios devolviendo token de acceso
export const login = async (req, res) => {
    const {email, password} = req.body

    try{
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        const isMath = await bcrypt.compare(password, userFound.password)

        if (!isMath) return res.status(400).json({ message: "Credenciales de acceso incorrectas"})
        
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
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
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
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

// Validar token para dar permiso a rutas protegidas
export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    // console.log(token)

    if (!token) return res.status(401).json({message: "No autorizado"})
    
    jwt.verify(token, TOKEN_SECERT, async (error, user) => {
        if (error) return res.status(401).json({message: "No autorizado"})

        const userFound = await User.findById(user.id)
        if (!userFound) return res.tastus(401).json({message: "No autorizado"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}