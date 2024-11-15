import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import constantsService from '../../services/constants.service';
import dbService from '../../services/db.service';

export const EstablecimientoSchema = z
  .object({
    codigo: z.string(),

    // D107
    direccion: CommonValidators.address(),

    // D108
    numeroCasa: CommonValidators.houseNumber(),

    // D109
    complementoDireccion1: CommonValidators.address().optional(),

    // D110
    complementoDireccion2: CommonValidators.address().optional(),

    // D111
    departamento: CommonValidators.department(),

    // D113
    distrito: CommonValidators.district().optional(),

    // D115
    ciudad: CommonValidators.city(),

    // D117
    telefono: CommonValidators.tel(),

    // D118
    email: CommonValidators.email(),

    // D119
    denominacion: z.string().min(1).max(30).optional(),
  })
  .transform((data, ctx) => {

    let errors: string[] = [];

    if (data.distrito) {
      constantsService.validateLocation(
        'params.establecimientos',
        data.departamento,
        data.distrito,
        data.ciudad,
        errors,
      );
      errors.forEach((error) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error,
        });
      });
    }

    return {
      ...data,

      // D112
      departamentoDescripcion: dbService
        .select('departments')
        .findById(data.departamento).description,

      // D114
      distritoDescripcion: dbService
        .select('districts')
        .findByIdIfExist(data.distrito, {
          ctx,
          fieldName: 'distrito',
          message: 'El código del distrito no es válido',
        })?.description,

      // D116
      ciudadDescripcion: dbService.select('districts').findById(data.ciudad, {
        ctx,
        fieldName: 'distrito',
        message: 'El código de ciudad no es válido',
      })?.description,
    };
  });

export type Establecimiento = z.infer<typeof EstablecimientoSchema>;
