import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de registro de roles
export const createRoleSchema = z.object({
    name: z.string({
        required_error: 'El nombre del rol debe ser un texto'
    }).min(4, {
        message: 'El nombre del rol debe tener al menos 4 caracteres',
    }),
})