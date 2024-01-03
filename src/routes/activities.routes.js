import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createActivity, deleteActivity, getActivities, getActivity, updateAcivity } from '../controllers/activities.controller.js'
import { createActivitySchema } from '../schemas/activity.schema.js'

const router = Router()

// Rutas de actividades de una etapa verificando los datos que llegan 
router.get('/activities', authRequired, getActivities)
router.get('/activities/:id', authRequired, getActivity)
router.post('/activities', authRequired, validateSchema(createActivitySchema), createActivity)
router.delete('/activities/:id', authRequired, deleteActivity)
router.put('/activities/:id', authRequired, validateSchema(createActivitySchema), updateAcivity)

// router.post('/reports-tasks', authRequired, getReportTasks)

export default router