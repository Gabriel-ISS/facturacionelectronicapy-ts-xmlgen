import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const EntregaSchema = z.object({
  // E941
  direccion: z.string(),

  // E942
  numeroCasa: z.string(),

  // E943
  complementoDireccion1: z.string().optional(),

  // E944
  complementoDireccion2: z.string().optional(),

  // E945
  departamento: z.union(enumToZodUnion(Department)),

  // E946
  departamentoDescripcion: z.string(),

  // E947
  distrito: z.string().optional(),

  // E948
  distritoDescripcion: z.string().optional(),

  // E949
  ciudad: z.string(),

  // E950
  ciudadDescripcion: z.string(),

  // E951
  pais: z.string().optional(),

  // E951
  paisDescripcion: z.string().optional(),

  // E951
  telefonoContacto: z.string().optional(),
});
export type Entrega = z.infer<typeof EntregaSchema>;
