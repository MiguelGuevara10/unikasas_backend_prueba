import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createUserSchema } from '../schemas/user.schema.js'
import { createUser, deleteUser, getReportUsers, getUser, getUsers, updateUser } from '../controllers/users.controller.js'

const router = Router()

// Rutas de tareas verificando los datos que llegan 
router.get('/users', authRequired, getUsers)
router.get('/users/:id', authRequired, getUser)
router.post('/users', authRequired, validateSchema(createUserSchema), createUser)
router.delete('/users/:id', authRequired, deleteUser)
router.put('/users/:id', authRequired, validateSchema(createUserSchema), updateUser)

router.post('/reports-users', authRequired, getReportUsers)

export default router