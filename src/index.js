import { startSession } from 'mongoose';
import app from './app.js'
import { conectDB } from './db.js'
import { createRoles } from './libs/start.setup.js';

// Conexion a la base de datos
conectDB()

// Crear roles por primera vez
createRoles()

//  iniciar servidor Express 
const PORT = process.env.PORT || 4000;
app.listen(PORT)
console.log('Server on port ', PORT)