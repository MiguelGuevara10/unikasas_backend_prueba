import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de creacion de proyectos
export const createProjectSchema = z.object({
    name: z.string({
        required_error: 'El nombre de proyecto es requerido'
    }).min(5, {
        message: 'El nombre debe tener al menos 5 caracteres',
    }),
    responsible: z.string({
        required_error: 'El responsable del proyecto es requerido'
    }).min(5, {
        message: 'El responsable debe tener al menos 5 caracteres',
    }).regex(/^[^0-9]+$/, {
        message: 'El responsable no debe contener numeros',
    }),
    estimated_cost: z.number({
        required_error: 'El costo estimado del proyecto no es un numero'
    }).refine(value => value > 0, {
        message: 'El costo estimado del proyecto debe ser mayor a 0'
    }),
    final_cost: z.number().optional(),
    city: z.string({
        required_error: 'La ciudad del proyecto es requerida'
    }).min(5, {
        message: 'La ciudad del proyecto debe tener al menos 5 caracteres',
    }),
    address: z.string({
        required_error: 'La dirección del proyecto es requerida'
    }).min(5, {
        message: 'La dirección del proyecto debe tener al menos 5 caracteres',
    }),
    start_date: z.string({
        required_error: 'La fecha inicial del proyecto es requerida'
    }).datetime(),
    end_date: z.string().datetime().optional(),
    description: z.string().optional(),
    state: z.string({
        required_error: 'El estado del proyecto es requerido'
    }),
})