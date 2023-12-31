import jwt from 'jsonwebtoken'
import { TOKEN_SECERT } from "../config.js"

/**
 * Funcion de creacion de token de acceso para usuarios,
 * recibe los siguientes parametros:
 * @param {Object} payload - Id del usuario para la generacion del token
 * @retunr Token de usuario generado
 */
export function createAccesToken(payload){
    try {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload, 
                TOKEN_SECERT,
                {
                    expiresIn: "1d"
                },
                (err, token) => {
                    if(err) reject(err)
                    resolve(token)
                }
            )
        })
    } catch (error) {
        console.error(error)
    }
}
