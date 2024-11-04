import { z } from 'zod';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { Department } from '../../constants/departments.constants';
import constantsService from '../../services/constants.service';

export const UbicacionSchema = z.object({
  // E316
  lugar: z.string({
    required_error: 'El lugar de la transacción es requerido',
  }).min(1).max(255),

  // E317
  departamento: z.union(enumToZodUnion(Department)),

  // E318
  departamentoDescripcion: z.string().optional(),

  // E319
  distrito: z.number({
    required_error: 'El código del distrito es requerido',
  }),

  // E320
  distritoDescripcion: z.string().optional(),

  // E321
  ciudad: z.number({
    required_error: 'El código de la ciudad es requerido',
  }),

  // E322
  ciudadDescripcion: z.string().optional(),
}).transform((data, ctx) => {
  const departmentDescription = constantsService.departments.find(
    (department) => department._id === data.departamento,
  )
  if (!departmentDescription) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El departamento no es válido',
      path: ['departamento'],
    })
  } else {
    data.departamentoDescripcion = departmentDescription.description
  }

  const districtDescription = constantsService.districts.find(
    (district) => district._id === data.distrito,
  )
  if (!districtDescription) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El distrito no es válido',
      path: ['distrito'],
    })
  } else {
    data.distritoDescripcion = districtDescription.description
  }

  const cityDescription = constantsService.cities.find(
    (city) => city._id === data.ciudad,
  )
  if (!cityDescription) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'La ciudad no es válida',
      path: ['ciudad'],
    })
  } else {
    data.ciudadDescripcion = cityDescription.description
  }
});

export type Ubicacion = z.infer<typeof UbicacionSchema>;