import Contactme from "../models/contactme.model.js" 
import { sendEmail } from "../libs/email.js"

// Crear un registro de contacto de usario
export const createConctame = async (req, res) => {
    try {
        const { name, email, phone, message, consent } = req.body

        const newContactme = Contactme({
            name,
            email,
            phone,
            message,
            consent
        })
        
        const saveContactme = await newContactme.save()
        res.json({message: ["Mensaje enviado exitosamente"], saveContactme})

        // Enviar email 
        try {
            await sendEmail(newContactme, "mensaje_contacto")
        } catch (error) {
            return res.status(500).json({message: "Error al enviar email contacto"})
        }
    } catch (error) {
        return res.status(500).json({message: "Error al registar el mensaje de contacto"})
    }
}