import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { getContacts, getReportContacts } from '../controllers/contactpeople.controller.js'
// import { validateSchema } from "../middlewares/validator.middleware.js"
// import { createActivitySchema } from '../schemas/activity.schema.js'

const router = Router()

// Rutas de actividades de una etapa verificando los datos que llegan 
router.get('/contacts-peoples', authRequired, getContacts)
// router.get('/activities/:id', authRequired, getActivity)
// router.post('/activities', authRequired, validateSchema(createActivitySchema), createActivity)
// router.delete('/activities/:id', authRequired, deleteActivity)
// router.put('/activities/:id', authRequired, validateSchema(createActivitySchema), updateAcivity)

router.post('/reports-contacts', authRequired, getReportContacts)

export default router