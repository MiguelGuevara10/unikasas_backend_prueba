// Funcion de validacion de datos que llegan al backend  antes de enviarlos a la base de datos
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