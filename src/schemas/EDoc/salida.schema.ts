import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const SalidaSchema = z.object({
  // E921
  direccion: z.string(),

  // E922
  numeroCasa: z.string(),

  // E923
  complementoDireccion1: z.string().optional(),

  // E924
  complementoDireccion2: z.string().optional(),
  // E925
  departamento: z.union(enumToZodUnion(Department)),

  // E926
  departamentoDescripcion: z.string(),

  // E927
  distrito: z.string().optional(),

  // E928
  distritoDescripcion: z.string().optional(),

  // E929
  ciudad: z.string(),

  // E930
  ciudadDescripcion: z.string(),

  // E931
  pais: z.string().optional(),

  // E931
  paisDescripcion: z.string().optional(),

  // E931
  telefonoContacto: z.string().optional(),
});
export type Salida = z.infer<typeof SalidaSchema>;