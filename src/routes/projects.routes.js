import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createProjectSchema } from '../schemas/project.schema.js'
import { createProject, deleteProject, getProject, getProjects, getReportProjects, updateProject } from '../controllers/projects.controller.js'

const router = Router()

// Rutas de proyectos verificando los datos que llegan 
router.get('/projects', authRequired, getProjects)
router.get('/projects/:id', authRequired, getProject)
router.post('/projects', authRequired, validateSchema(createProjectSchema), createProject)
router.delete('/projects/:id', authRequired, deleteProject)
router.put('/projects/:id', authRequired, validateSchema(createProjectSchema), updateProject)

router.post('/reports-projects', authRequired, getReportProjects)

export default router