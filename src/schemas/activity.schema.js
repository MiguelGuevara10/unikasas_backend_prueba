import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de creacion de actividades de una etapa de proyecto
export const createActivitySchema = z.object({
    name: z.string({
        required_error: 'El nombre de la actividad es requerido'
    }).min(5, {
        message: 'El nombre de la actividad debe tener al menos 5 caracteres',
    }),
    responsible: z.string({
        required_error: 'El responsable de la actividad es requerido'
    }).min(5, {
        message: 'El responsable de la actividad debe tener al menos 5 caracteres',
    }).regex(/^[^0-9]+$/, {
        message: 'El responsable de la actividad no debe contener numeros',
    }),
    objective: z.string({
        required_error: 'El objetivo de la actividad es requerido'
    }).min(20, {
        message: 'El objetivo de la actividad debe tener al menos 20 caracteres',
    }),
    start_date: z.string({
        required_error: 'La fecha inicial de la actividad es requerida'
    }).datetime(),
    end_date: z.string().datetime().optional(),
    observations: z.string().optional(),
    state: z.string({
        required_error: 'El estado de la actividad es requerido'
    }),
})