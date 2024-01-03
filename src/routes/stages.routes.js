import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createStageSchema } from '../schemas/stage.schema.js'
import { createStage, deleteStage, getSatge, getStages, updateStage } from '../controllers/stages.controller.js'

const router = Router()

// Rutas de etapas de un proyecto verificando los datos que llegan 
router.get('/stages', authRequired, getStages)
router.get('/stages/:id', authRequired, getSatge)
router.post('/stages', authRequired, validateSchema(createStageSchema), createStage)
router.delete('/stages/:id', authRequired, deleteStage)
router.put('/stages/:id', authRequired, validateSchema(createStageSchema), updateStage)

// router.post('/reports-tasks', authRequired, getReportTasks)

export default router