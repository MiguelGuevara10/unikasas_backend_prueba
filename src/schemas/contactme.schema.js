import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de registro de tareas
export const createContactmeSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido'
    }).min(5, {
        message: 'El nombre debe tener al menos 5 caracteres',
    }).regex(/^[^0-9]+$/, {
        message: 'El nombre no debe contener numeros',
    }),
    email: z.string({
        required_error: 'El email no es un texto'
    }).email({
        message: 'El email no es valido'
    }),
    message: z.string({
        required_error: 'El mensaje no es un texto'
    }).min(10, {
        message: 'El mensaje debe tener al menos 10 caracteres',
    }).max(255, {
        message: 'El mensaje no debe sobrepasar los 255 caracteres',
    }),
})