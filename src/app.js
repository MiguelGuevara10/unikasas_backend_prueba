import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import productRoutes from "./routes/produts.routes.js"
import homeRoutes from "./routes/home.routes.js"
import quoteRoutes from "./routes/quote.routes.js"

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

export default app