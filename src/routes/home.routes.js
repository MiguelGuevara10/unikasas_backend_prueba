import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { createConctame } from '../controllers/home.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createContactmeSchema } from '../schemas/contactme.schema.js'

const router = Router()

// Rutas del home
// router.get('/tasks', authRequired, getTasks)
// router.get('/tasks/:id', authRequired, getTask)
// router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask)
// router.delete('/tasks/:id', authRequired, deleteTask)
// router.put('/tasks/:id', authRequired, updateTask)

router.post('/contactme', validateSchema(createContactmeSchema), createConctame)

export default router