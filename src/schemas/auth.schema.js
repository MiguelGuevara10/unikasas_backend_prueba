import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de registro de usuarios 
export const registerSchema = z.object({
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
})

// Verificacion de login de usuarios 
export const loginSchema = z.object({
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
})

// Verificacion de recuperacion de cuenta de usuarios 
export const recoverAccountSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'El email no es valido'
    }),
    pin: z.string().min(6, {
            message: 'El pin debe tener 6 caracteres'
    }).max(6, {
            message: 'El pin debe tener 6 caracteres'
    }).optional(),
    password: z.string().min(6, {
        message: 'El password debe tener almenos 6 caracteres'
    }).optional(),
})