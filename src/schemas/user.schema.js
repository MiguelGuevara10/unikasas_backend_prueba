import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de creacion de usuario
export const createUserSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(5, {
        message: 'El nombre debe tener al menos 5 caracteres',
    }).regex(/^[^0-9]+$/, {
        message: 'El nombre no debe contener numeros',
    }),
    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'El email no es valido'
    }),
    password: z.string({
        required_error: 'El password es requerido'
    }).min(6, {
        message: 'El password debe tener almenos 6 caracteres'
    }),
    role: z.string({
        required_error: 'El rol debe ser un texto'
    }).optional(),
    state: z.boolean({
        required_error: 'El estado debe ser un boleano activo o inactivo'
    }).optional(),
})