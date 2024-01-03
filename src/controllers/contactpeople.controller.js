import { generateReport } from "../libs/reports.js"
import Contactme from "../models/contactme.model.js" 

// Traer todos los contactos de personas realizados | filtro de busqueda por campos
export const getContacts = async (req, res) => {
    let contacts = []
    try {
        if (req && req.query.query) { // Filtrar usuarios mediante parametro de busqueda
            contacts = await Contactme.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"email": {$regex:req.query.query, $options:"i"}},
                ]
            }).sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        } else {
            contacts = await Contactme.find()
                .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(contacts)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar los contactos realizados"})   
    }
}

// Generar reporte de contactos
export const getReportContacts = async (req, res) => {
    try {
        const { start_date, end_date, report } = req.body

        const contacts = await Contactme.find({ 
            createdAt: {
                $gte: start_date, // Mayor o igual que 
                $lte: end_date    // Menor o igual que 
            }
        })

        // retornar un archivo vacio
        if (contacts.length === 0) {
            res.setHeader('Content-Type', 'application');
            return res.send()
        }

        // Convertir campos
        const contactsModified = contacts.map(contact => {
            const modifiedContact = contact.toObject() // Convierte el documento Mongoose a un objeto JS
        
            // Convierte los campos al formato deseado
            modifiedContact.createdAt = contact.createdAt.toISOString()
            modifiedContact.updatedAt = contact.updatedAt.toISOString()
            modifiedContact.consent = contact.consent ? "Acepto la recopialción de sus datos personales" : "No acepto la recopilacion de sus datos"
            delete modifiedContact.__v
        
            return modifiedContact
        })

        await generateReport(contactsModified, 
            "Reporte de contactos Unikasas", "Este es el reporte de contactos del sistema", res, report)
        
    } catch (error) {
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}