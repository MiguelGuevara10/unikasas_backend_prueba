import jwt from 'jsonwebtoken'
import { TOKEN_SECERT } from '../config.js'

// Verificacion de acceso a rutas protegidas con el token enviado
export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token)
        return res.status(401).json({message: "No token, authorization denied"})

        jwt.verify(token, TOKEN_SECERT, (err, user) => {
            if(err) return res.status(403).json({message: "Invalid Token"})
            req.user = user
            next()
        })
}