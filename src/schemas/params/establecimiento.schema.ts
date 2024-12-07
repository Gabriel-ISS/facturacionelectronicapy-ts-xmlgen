import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import dbService from '../../services/db.service';
import SDParser from '../../helpers/SDParser';

export const EstablecimientoSchema = z
  .object({
    // relacionado con C005
    codigo: CommonValidators.zeroPadToLength(3).describe(
      SDParser.stringify('relacionado con C005'),
    ),

    // D107
    direccion: CommonValidators.address().describe(SDParser.stringify('D107')),

    // D108
    numeroCasa: CommonValidators.houseNumber()
      .default(0)
      .describe(SDParser.stringify('D108')),

    // D109
    complementoDireccion1: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('D109')),

    // D110
    complementoDireccion2: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('D110')),

    // D111
    departamento: CommonValidators.department().describe(
      SDParser.stringify('D111', {
        e: 'Department'
      }),
    ),

    // D113
    distrito: CommonValidators.district()
      .optional()
      .describe(SDParser.stringify('D113')),

    // D115
    ciudad: CommonValidators.city().describe(SDParser.stringify('D115')),

    // D117
    telefono: CommonValidators.tel().describe(SDParser.stringify('D117')),

    // D118
    email: CommonValidators.email().describe(SDParser.stringify('D118')),

    // D119
    denominacion: z
      .string()
      .min(1)
      .max(30)
      .optional()
      .describe(SDParser.stringify('D119')),
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

      // D112
      departamentoDescripcion: dbService.departments._findById(
        data.departamento,
      ).description,

      // D114
      distritoDescripcion: dbService.districts._findByIdIfExist(data.distrito, {
        ctx,
        fieldName: 'distrito',
      })?.description,

      // D116
      ciudadDescripcion: dbService.cities._findById(data.ciudad, {
        ctx,
        fieldName: 'ciudad',
      })?.description,
    };
  });

export type Establecimiento = z.infer<typeof EstablecimientoSchema>;
