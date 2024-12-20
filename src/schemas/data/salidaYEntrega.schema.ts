import { z } from 'zod';
import { Department } from '../../data/departments.table';
import NumberLength from '../../helpers/validation/NumberLenght';

import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import CommonValidators from '../../helpers/validation/CommonValidators';
import SDParser from '../../helpers/SDParser';

/**
 * E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)
 * E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)
 *
 * @SALIDA
 * @field E921 = direccion
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
 *
 * @field ???? = pais
 * @field ???? = paisDescripcion
 */
export const SalidaYEntregaSchema = z
  .object({
    direccion: CommonValidators.address().describe(
      SDParser.stringify('E921 o E941'),
    ),
    numeroCasa: CommonValidators.houseNumber().describe(
      SDParser.stringify('E922 o E942'),
    ),
    complementoDireccion1: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('E923 o E943')),
    complementoDireccion2: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('E924 o E944')),
    departamento: z
      .nativeEnum(Department)
      .describe(SDParser.stringify('E925 o E945', { e: 'Department' })),
    distrito: CommonValidators.district()
      .optional()
      .describe(SDParser.stringify('E926 o E946', { t: 'distritos' })),
    ciudad: CommonValidators.city().describe(
      SDParser.stringify('E929 o E949', { t: 'ciudades' }),
    ),
    telefonoContacto: z
      .string()
      .min(6)
      .max(15)
      .optional()
      .describe(SDParser.stringify('E931 o E951')),
  })
  .transform((data, ctx) => {
    CommonValidators.location(
      ctx,
      data.departamento,
      data.distrito,
      data.ciudad,
    );

    return {
      ...data,
      departamentoDescripcion: dbService.departments._findById(
        data.departamento,
      ).description,

      // E928 - E948
      distritoDescripcion: dbService.districts._findByIdIfExist(data.distrito, {
        ctx,
        fieldName: 'distrito',
      })?.description,

      ciudadDescripcion: dbService.cities._findById(data.ciudad, {
        ctx,
        fieldName: 'ciudad',
      }).description,
    };
  });

export type Salida = z.infer<typeof SalidaYEntregaSchema>;
