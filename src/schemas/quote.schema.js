import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de registro de cotizaciones
export const createQuoteSchema = z.object({
    name: z.string({
        required_error: 'El nombre debe ser un texto'
    }).min(5, {
        message: 'El nombre debe tener al menos 5 caracteres',
    }),
    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'El email no es valido'
    }),
    phone: z.number({
        required_error: 'El telefono no es un numero'
    }).refine(value => value = 10, {
        message: 'El telefono debe ser igual a 10 caractreres'
    }),
    city: z.string({
        required_error: 'La ciudad no es un texto'
    }),
    location: z.string({
        required_error: 'La ubicación no es un texto'
    }),
    date: z.string().datetime().optional(),
    comments: z.string({
        required_error: 'El comentario no son un texto'
    }).min(10, {
        message: 'El comentario debe tener al menos 10 caracteres',
    }).max(255, {
        message: 'El comentario no debe sobrepasar los 255 caracteres',
    }).optional(),
})