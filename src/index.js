import app from './app.js'
import { conectDB } from './db.js'

// Conexion a la base de datos
conectDB();

//  iniciar servidor Express 
const PORT = process.env.PORT || 4000;
app.listen(PORT)
console.log('Server on port ', PORT)