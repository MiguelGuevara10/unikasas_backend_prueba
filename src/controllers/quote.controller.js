import Quote from "../models/quotes.models.js" 

// Traer todas las cotizaciones 
export const getQuotes = async (req, res) => {
    let quotes = []
    try {
        if (req && req.query.query) { // Filtrat cotizaciones mediante parametro de busqueda
            console.log(req.query)
            quotes = await Quote.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"state": {$regex:req.query.query, $options:"i"}},
                    {"email": {$regex:req.query.query, $options:"i"}},
                    {"city": {$regex:req.query.query, $options:"i"}},
                ]
            }).populate('product')

        } else {
            quotes = await Quote.find().populate('product')
        }
        res.json(quotes)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar cotizaciones"})   
    }
}

// Traer una cotizacion por id
export const getQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)
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