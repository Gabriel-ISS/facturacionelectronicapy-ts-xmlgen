import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import constantsService from '../../services/constants.service';
import dbService from '../../services/db.service';

export const UbicacionSchema = z
  .object({
    // E316
    lugar: CommonValidators.address(),

    // E317
    departamento: CommonValidators.department(),

    // E319
    distrito: CommonValidators.district().optional(),

    // E321
    ciudad: CommonValidators.city(),
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

      // E318
      departamentoDescripcion: dbService
        .select('departments')
        .findById(data.departamento).description,

      // E320
      distritoDescripcion: dbService
        .select('districts')
        .findByIdIfExist(data.distrito, {
          ctx,
          fieldName: 'distrito',
        })?.description,

      // E322
      ciudadDescripcion: dbService
        .select('districts')
        .findById(data.ciudad, {
          ctx,
          fieldName: 'distrito',
        })?.description,
    };
  });

export type Ubicacion = z.infer<typeof UbicacionSchema>;
