import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import NumberLength from '../../helpers/validation/NumberLenght';
import { enumToZodUnion } from '../../helpers/validation/Common';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/**
 * @SALIDA
 * @field E911 = direccion
 * @field E922 = numeroCasa
 * @field E923 = complementoDireccion1
 * @field E924 = complementoDireccion2
 * @field E925 = departamento
 * @field E926 = departamentoDescripcion
 * @field E927 = distrito
 * @field E928 = distritoDescripccion
 * @field E929 = ciudad
 * @field E930 = ciudadDescripcion
 * @field E931 = telefonoContacto
 * 
 * @ENTREGA
 * @field E941 = direccion
 * @field E942 = numeroCasa
 * @field E943 = complementoDireccion1
 * @field E944 = complementoDireccion2
 * @field E945 = departamento
 * @field E946 = departamentoDescripcion
 * @field E947 = distrito
 * @field E948 = distritoDescripccion
 * @field E949 = ciudad
 * @field E950 = ciudadDescripcion
 * @field E951 = telefonoContacto
 */
export const SalidaYEntregaSchema = z.object({
  direccion: z.string().min(1).max(255),
  numeroCasa: z.number().default(0).superRefine((value, ctx) => {
    new NumberLength(value, ctx).int().max(6);
  }),
  complementoDireccion1: z.string().min(1).max(255).optional(),
  complementoDireccion2: z.string().min(1).max(255).optional(),
  departamento: z.union(enumToZodUnion(Department)),
  distrito: z.number().optional(),
  ciudad: z.number(),

  // TODO: OTRO SIN CÓDIGO (lo mismo para la descripción)
  /* pais: z.union(enumToZodUnion(Country)).optional(), */

  telefonoContacto: z.string().min(6).max(15).optional(),

}).transform((data, ctx) => {
  const validator = new ZodValidator(ctx, data);

  const foundDepartment = dbService.select('departments').findById(data.departamento);
  
  const foundCity = dbService.select('cities').findById(data.ciudad);
  validator.validate(
    'ciudad',
    !foundCity,
    `No existe la ciudad con id ${data.ciudad}`
  )

  let distritoDescripcion;
  if (data.distrito) {
    const foundDistrict = dbService.select('districts').findById(data.distrito);
    validator.validate(
      'distrito',
      !foundDistrict,
      `No existe el distrito con id ${data.distrito}`
    )
    distritoDescripcion = foundDistrict?.description;
  }

  return {
    ...data,
    departamentoDescripcion: foundDepartment?.description as string,
    distritoDescripcion,
    ciudadDescripcion: foundCity?.description as string,
  };
});

export type Salida = z.infer<typeof SalidaYEntregaSchema>;