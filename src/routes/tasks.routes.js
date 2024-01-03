import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { getTask, getTasks, createTask, updateTask, deleteTask, getReportTasks} from '../controllers/tasks.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createTaskSchema } from "../schemas/task.schema.js"

const router = Router()

// Rutas de tareas verificando los datos que llegan 
router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id', authRequired, validateSchema(createTaskSchema), updateTask)

router.post('/reports-tasks', authRequired, getReportTasks)

export default router