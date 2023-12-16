import { z } from 'zod'

// Verificacion con zod para validar y devolver resouestas con mensaje de datos no validos
// Verificacion de registro de productos
export const createProductSchema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido'
    }).min(5, {
        message: 'El nombre debe tener al menos 5 caracteres',
    }).regex(/^[^0-9]+$/, {
        message: 'El nombre no debe contener numeros',
    }),
    image: z.string({
        required_error: 'La imagen debe ser una url en texto'
    }).url({
        message: 'El formato de la url no es valido'
    }),
    description: z.string({
        required_error: 'La descripcion no es un texto'
    }).min(10, {
        message: 'La descripcion debe tener al menos 10 caracteres',
    }).max(255, {
        message: 'La descripcion no debe sobrepasar los 255 caracteres',
    }),
    price: z.number({
        required_error: 'El precio no es un numero'
    }).refine(value => value > 0, {
        message: 'El precio debe ser mayor a 0'
    }),
    type: z.string({
        required_error: 'El tipo debe ser un texto'
    }),
    material: z.string({
        required_error: 'El material debe ser un texto'
    }),
    floors: z.number({
        required_error: 'La cantidad de pisos debe ser un numero'
    }).refine(value => value > 0, {
        message: 'La cantidad de pisos debe ser mayor a 0'
    }),
    bedrooms: z.string({
        required_error: 'La cantidad de habitaciones debe ser un texto'
    }),
    state: z.boolean({
        required_error: 'El estado debe ser un boleano activo o inactivo'
    })
})