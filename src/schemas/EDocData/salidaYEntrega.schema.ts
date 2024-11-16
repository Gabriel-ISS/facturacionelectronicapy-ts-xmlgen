import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import NumberLength from '../../helpers/validation/NumberLenght';

import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import CommonValidators from '../../helpers/validation/CommonValidators';

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
 * TODO: SIN CÓDIGO
 * @field ???? = pais
 * @field ???? = paisDescripcion
 */
export const SalidaYEntregaSchema = z
  .object({
    direccion: CommonValidators.address(),
    numeroCasa: CommonValidators.houseNumber().default(0),
    complementoDireccion1: CommonValidators.address().optional(),
    complementoDireccion2: CommonValidators.address().optional(),
    departamento: z.nativeEnum(Department),
    distrito: CommonValidators.district().optional(),
    ciudad: CommonValidators.city(),
    telefonoContacto: z.string().min(6).max(15).optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    // E928 - E948
    let distritoDescripcion;
    {
      /*
      Obligatorio si existe el campo E927/E947
      */
      if (data.distrito) {
        distritoDescripcion = dbService
          .select('districts')
          .findById(data.distrito, {
            ctx,
            fieldName: 'distrito',
            message: `No existe el distrito con id ${data.distrito}`,
          }).description;
      }
    }

    return {
      ...data,
      departamentoDescripcion: dbService
        .select('departments')
        .findById(data.departamento).description,

      distritoDescripcion,

      ciudadDescripcion: dbService.select('cities').findById(data.ciudad, {
        ctx,
        fieldName: 'ciudad',
        message: `No existe la ciudad con id ${data.ciudad}`,
      }).description,
    };
  });

export type Salida = z.infer<typeof SalidaYEntregaSchema>;
