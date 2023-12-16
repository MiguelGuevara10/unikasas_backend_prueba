import Contactme from "../models/contactme.model.js" 
import { sendEmail } from "../libs/email.js"

// Crear un registro de contacto de usario
export const createConctame = async (req, res) => {
    try {
        const { name, email, message } = req.body

        const newContactme = Contactme({
            name,
            email,
            message,
        })
        
        const saveContactme = await newContactme.save()
        res.json({message: ["Mensaje enviado exitosamente"], saveContactme})

        // Enviar email 
        try {
            await sendEmail(newContactme, "Mensaje de contacto")
        } catch (error) {
           console.error(error) 
        }
    } catch (error) {
        return res.status(500).json({message: "Error al registar el mensaje de contacto"})
    }
}

// TODO Crear cotizacion 