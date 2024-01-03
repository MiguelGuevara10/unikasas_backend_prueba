import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { getProducts, getProductsCatalogue, getProduct, createProduct, deleteProduct, updateProduct, getReportProducts } from "../controllers/products.controller.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createProductSchema } from "../schemas/product.schema.js"

const router = Router()

// Rutas de productos verificando los datos que llegan 
router.get('/products', getProducts) // Se quito la ruta protegida para filtrar productos desde el home
router.get('/', getProductsCatalogue)
router.get('/products/:id', authRequired, getProduct)
router.post('/products', authRequired, validateSchema(createProductSchema), createProduct)
router.delete('/products/:id', authRequired, deleteProduct)
router.put('/products/:id', authRequired, validateSchema(createProductSchema), updateProduct)

router.post('/reports-products', authRequired, getReportProducts)

export default router