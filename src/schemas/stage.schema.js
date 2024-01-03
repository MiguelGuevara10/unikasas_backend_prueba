import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de registro de etapas
export const createStageSchema = z.object({
    name: z.string({
        required_error: 'El nombre de la etapa debe ser un texto'
    }).min(5, {
        message: 'El nombre de la etapa debe tener al menos 5 caracteres',
    }),
    description: z.string({
        required_error: 'La descripción de la tarea debe ser un texto'
    }).min(10, {
        message: 'La descripción debe tener al menos 10 caracteres',
    }).max(255, {
        message: 'La descripción no debe sobrepasar los 255 caracteres',
    }),
})