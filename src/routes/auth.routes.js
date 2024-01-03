import {Router} from 'express'
import { login, logout, profile, recoverAccount, register, verifyToken } from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { registerSchema, loginSchema, recoverAccountSchema} from "../schemas/auth.schema.js"

const router = Router()

// Rutas de acceso al sistema verificando los datos que llegan 
router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyToken)
router.post('/recover-account', validateSchema(recoverAccountSchema), recoverAccount)

export default router