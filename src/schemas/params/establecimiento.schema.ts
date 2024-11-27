import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import dbService from '../../services/db.service';

export const EstablecimientoSchema = z
  .object({
    // relacionado con C005
    codigo: CommonValidators.zeroPadToLength(3),

    // D107
    direccion: CommonValidators.address(),

    // D108
    numeroCasa: CommonValidators.houseNumber().default(0),

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
    CommonValidators.location(
      ctx,
      data.departamento,
      data.distrito,
      data.ciudad,
    );

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
        })?.description,

      // D116
      ciudadDescripcion: dbService.select('cities').findById(data.ciudad, {
        ctx,
        fieldName: 'ciudad',
      })?.description,
    };
  });

export type Establecimiento = z.infer<typeof EstablecimientoSchema>;
