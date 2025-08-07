import { z } from 'zod'

export const usuarioCreateSchema = z.object({
  guid: z.string().uuid(), // Validación de UUID
  nombres: z.string().max(100),
  apellidos: z.string().max(100),
  email: z.string().email(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  contrasenia: z.string().min(6),
  es_activo: z.boolean().default(true)
})

export const usuarioUpdateSchema = z.object({
  nombres: z.string().max(100).optional(),
  apellidos: z.string().max(100).optional(),
  email: z.string().email().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  es_activo: z.boolean().optional()
})

export const usuarioLoginSchema = z.object({
  email: z.string().email(),
  contrasenia: z.string().min(6)
})
