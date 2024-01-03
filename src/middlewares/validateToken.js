import jwt from 'jsonwebtoken'
import { TOKEN_SECERT } from '../config.js'

/**
 * Verificacion de acceso a rutas protegidas con el token enviado,
 * recibe los siguientes parametros:
 * @param {Object} req - Objeto request con la informacion de la cookie de usuario
 * @param {Object} res - Objeto response para generar una respuesta al cliente
 * @param {Function} next - Para permitir que el usuario continue
 */
export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token)
            return res.status(401).json({message: "No token, authorization denied"})

            jwt.verify(token, TOKEN_SECERT, (err, user) => {
                if(err) return res.status(403).json({message: "Invalid Token"})
                req.user = user
                next()
            })
    } catch (error) {
        console.error(error)
    }
    
}