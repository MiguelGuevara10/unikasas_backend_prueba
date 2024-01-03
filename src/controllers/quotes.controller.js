import { sendEmail } from "../libs/email.js"
import { generateReport } from "../libs/reports.js"
import Quote from "../models/quotes.models.js" 

// Traer todas las cotizaciones 
export const getQuotes = async (req, res) => {
    let quotes = []
    try {
        if (req && req.query.query) { // Filtrar cotizaciones mediante parametro de busqueda
            quotes = await Quote.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"state": {$regex:req.query.query, $options:"i"}},
                    {"email": {$regex:req.query.query, $options:"i"}},
                    {"city": {$regex:req.query.query, $options:"i"}},
                ]
            }).populate('product')
            .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación

        } else {
            quotes = await Quote.find().populate('product')
            .sort({ createdAt: -1 }) // Ordenar desendetemente por fecha de creación
        }
        res.json(quotes)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar cotizaciones"})   
    }
}

// Traer una cotizacion por id
export const getQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id).populate('product')
        if (!quote) return res.status(404).json({message: "Cotización no encontrada"})
        res.json(quote)
    } catch (error) {
        return res.status(404).json({message: "Cotización no encontrada"})
    }
}

// Crear una cotizacion
export const createQuote = async (req, res) => {
    try {
        const { name, email, phone, city, product, location, date, comments } = req.body

        const newQuote = Quote({
            name, 
            email, 
            phone, 
            city, 
            product,
            location, 
            date, 
            comments
        })
        const saveQuote = await newQuote.save()
        res.json(saveQuote)
        // Enviar email de respuesta de cotización realizada
        if (saveQuote) {
            try {
                sendEmail(req.body, "cotizacion_realizada")
            } catch (error) {
                return res.status(500).json({message: "Error al enviar email de cotzacion realizada"}) 
            }
        }
    } catch (error) {
        return res.status(500).json({message: "Error al crear cotización"})
    }
}

// Modificar una cotizacion
export const updateQuote = async (req, res) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!quote) return res.status(404).json({message: "Cotización no encontrada"})
        res.json(quote)
        // Enviar email de respuesta de la cotización si se recibio el campo de respuesta
        if (req.body.response) {
            try {
                sendEmail(req.body, "respuesta_cotizacion")
            } catch (error) {
                return res.status(500).json({message: "Error al enviar email de respuesta"}) 
            }
        }
    } catch (error) {
        return res.status(404).json({message: "Cotización no encontrada"})
    } 
}

// Eliminar una cotizacion
export const deleteQuote = async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id)
        if (!quote) return res.status(404).json({message: "Cotización no encontrada"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Cotización no encontrada"})
    }
}

// Generar reporte de cotizaciones
export const getReportQuotes = async (req, res) => {
    try {
        const { start_date, end_date, report } = req.body

        const quotes = await Quote.find({ 
            createdAt: {
                $gte: start_date, // Mayor o igual que 
                $lte: end_date    // Menor o igual que 
            }
        }).populate('product')

        // retornar un archivo vacio
        if (quotes.length === 0) {
            res.setHeader('Content-Type', 'application');
            return res.send()
        }

        // Convertir campos
        const quotesModified = quotes.map(quote => {
            const modifiedQuote = quote.toObject(); // Convierte el documento Mongoose a un objeto JS
        
            // Convierte los campos al formato deseado
            modifiedQuote.date = quote.date.toISOString()
            modifiedQuote.createdAt = quote.createdAt.toISOString()
            modifiedQuote.updatedAt = quote.updatedAt.toISOString()
            modifiedQuote.product = quote.product.name
            delete modifiedQuote.__v
        
            return modifiedQuote;
        });
        
        await generateReport(quotesModified, 
            "Reporte de cotizaciones Unikasas", "Este es el reporte de cotizaciones de clientes", res, report)
        
    } catch (error) {
        return res.status(500).json({message: "Error al generar reporte"})   
    }
}