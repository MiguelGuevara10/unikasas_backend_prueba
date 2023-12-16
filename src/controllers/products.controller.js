import Product from "../models/product.models.js"

// Traer todo los productos ruta protegida para usuarios
export const getProducts = async (req, res) => {
    try {
        let products = []
        if (req && req.query.query) { // Filtrar productos mediante parametro de busqueda
            products = await Product.find({
                "$or" : [ 
                    {"name": {$regex:req.query.query, $options:"i"}},
                    {"type": {$regex:req.query.query, $options:"i"}},
                    {"material": {$regex:req.query.query, $options:"i"}},
                    {"size": {$regex:req.query.query, $options:"i"}},
                    // {"price": {$regex:req.query.query, $options:"i"}},
                ]
            })

        } else {
            products = await Product.find() 
        }
        res.json(products)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar productos"})   
    }
}

// Traer todo los productos ruta no protegida ya que es el catalogo para clientes
export const getProductsCatalogue = async (req, res) => {
    try {
        const products = await Product.find().where({ state: true }) // Solo mostrar los activos en el catalogo
        res.json(products)
    } catch (error) {
        return res.status(500).json({message: "Error al consultar productos"})   
    }
}

// Traer un producto por id
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({message: "Producto no encontrado"})
        res.json(product)
    } catch (error) {
        return res.status(404).json({message: "Producto no encontrado"})
    }
}

// Crear un producto
export const createProduct = async (req, res) => {
    try {
        const { name,
            image,
            description, 
            price,
            type,
            material,
            floors,
            size,
            bedrooms,
            state
        } = req.body

        const newProduct = Product({
            name,
            image,
            description, 
            price,
            type,
            material,
            floors,
            size,
            bedrooms,
            state,
        })

        const saveProduct = await newProduct.save()
        res.json(saveProduct)
    } catch (error) {
        return res.status(500).json({message: "Error al crear producto"})
    }
}

// Modificar un producto
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!product) return res.status(404).json({message: "Producto no encontrado"})
        res.json(product)
    } catch (error) {
        return res.status(404).json({message: "Producto no encontrado"})
    } 
}

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).json({message: "Producto no encontrado"})
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({message: "Producto no encontrado"})
    }
}