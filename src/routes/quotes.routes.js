import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { createQuote, deleteQuote, getQuote, getQuotes, getReportQuotes, updateQuote } from '../controllers/quotes.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createQuoteSchema } from '../schemas/quote.schema.js'

const router = Router()

// Rutas de cotizaciones verificando los datos que llegan 
router.get('/quotes', authRequired, getQuotes)
router.get('/quotes/:id', authRequired, getQuote)
router.post('/quotes', validateSchema(createQuoteSchema), createQuote)
router.delete('/quotes/:id', authRequired, deleteQuote)
router.put('/quotes/:id', authRequired, validateSchema(createQuoteSchema), updateQuote)

router.post('/reports-quotes', authRequired, getReportQuotes)

export default router