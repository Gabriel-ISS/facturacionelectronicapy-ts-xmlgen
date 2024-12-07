import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import dbService from '../../services/db.service';
import SDParser from '../../helpers/SDParser';

export const UbicacionSchema = z
  .object({
    // E316
    lugar: CommonValidators.address().describe(SDParser.stringify('E316')),

    // E317
    departamento: CommonValidators.department().describe(
      SDParser.stringify('E317', { e: 'Department' }),
    ),

    // E319
    distrito: CommonValidators.district()
      .optional()
      .describe(SDParser.stringify('E319', { t: 'distritos' })),

    // E321
    ciudad: CommonValidators.city().describe(
      SDParser.stringify('E321', { t: 'ciudades' }),
    ),
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
      departamentoDescripcion: dbService.departments._findById(
        data.departamento,
      ).description,

      // E320
      distritoDescripcion: dbService.districts._findByIdIfExist(data.distrito, {
        ctx,
        fieldName: 'distrito',
      })?.description,

      // E322
      ciudadDescripcion: dbService.districts._findById(data.ciudad, {
        ctx,
        fieldName: 'distrito',
      })?.description,
    };
  });

export type Ubicacion = z.infer<typeof UbicacionSchema>;
