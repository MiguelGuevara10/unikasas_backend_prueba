/**
 * Funcion de validacion de datos que llegan al backend  antes de enviarlos a la base de datos,
 * recibe los siguientes parametros:
 * @param {Object} schema - Esquema en zod con los campos y tipos de datos a validar
 * @param {Object} req - Objeto request con los campos a vaildar
 * @param {Object} res - Objeto response para generar una respuesta al cliente si los datos no son validos
 * @param {Function} next - Para permitir el registro de los datos
 */
export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json(
            error.errors.map((error) => error.message)
        )
    }
}