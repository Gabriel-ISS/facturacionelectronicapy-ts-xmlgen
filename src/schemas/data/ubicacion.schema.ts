import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
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
        .departments
        ._findById(data.departamento).description,

      // E320
      distritoDescripcion: dbService
        .districts
        ._findByIdIfExist(data.distrito, {
          ctx,
          fieldName: 'distrito',
        })?.description,

      // E322
      ciudadDescripcion: dbService
        .districts
        ._findById(data.ciudad, {
          ctx,
          fieldName: 'distrito',
        })?.description,
    };
  });

export type Ubicacion = z.infer<typeof UbicacionSchema>;
