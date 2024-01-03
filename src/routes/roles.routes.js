import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createRole, deleteRole, getReportRoles, getRole, getRoles, updateRole } from '../controllers/roles.controller.js'
import { createRoleSchema } from '../schemas/role.schema.js'

const router = Router()

// Rutas de tareas verificando los datos que llegan 
router.get('/roles', authRequired, getRoles)
router.get('/roles/:id', authRequired, getRole)
router.post('/roles', authRequired, validateSchema(createRoleSchema), createRole)
router.delete('/roles/:id', authRequired, deleteRole)
router.put('/roles/:id', authRequired, validateSchema(createRoleSchema), updateRole)

router.post('/reports-roles', authRequired, getReportRoles)

export default router