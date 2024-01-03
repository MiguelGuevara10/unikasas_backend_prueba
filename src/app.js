import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import productRoutes from "./routes/produts.routes.js"
import homeRoutes from "./routes/home.routes.js"
import quoteRoutes from "./routes/quotes.routes.js"
import userRoutes from "./routes/users.routes.js"
import projectRoutes from "./routes/projects.routes.js"
import projectStageRoutes from "./routes/stages.routes.js"
import projectStageActivityRoutes from "./routes/activities.routes.js"
import contactPeoplesRoutes from "./routes/contactspeoples.routes.js"
import rolesRoutes from "./routes/roles.routes.js"

const app = express()

// Configuarcion de cors para autenticacion y dominios diferentes
app.use(cors({
    // origin: ['http://127.0.0.1:5173','http://localhost:5173'],
    allowedOrigins: ['*'],
    origin: true,
    credentials: true,
}))

// Configuracion de mensaje es la cosola con morgan
// express para manejar datos en json 
// y cookieParser para manejar cookies
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Rutas de la api
app.use('/api', homeRoutes) // Rutas del Home
app.use('/api', authRoutes) // Rutas protegidas
app.use('/api', taskRoutes) // Rutas de tareas
app.use('/api', productRoutes) // Rutas de productos
app.use('/api', quoteRoutes) // Rutas de cotizaciones
app.use('/api', userRoutes) // Rutas de usuarios
app.use('/api', projectRoutes) // Rutas de proyectos
app.use('/api', projectStageRoutes) // Rutas de etapas de proyecto
app.use('/api', projectStageActivityRoutes) // Rutas de actividades de etapas de proyecto
app.use('/api', contactPeoplesRoutes) // Rutas de contactos de personas
app.use('/api', rolesRoutes) // Rutas de roles de usuarios

export default app