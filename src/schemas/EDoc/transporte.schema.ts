import { z } from 'zod';
import { Country } from '../../constants/countries.constants';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { TradingCondition } from '../../constants/tradingConditions.constants';
import { TransportModality } from '../../constants/transportModalities.constants';
import { TransportType } from '../../constants/transportTypes.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodEnum, enumToZodUnion } from '../../helpers/validation/enumConverter';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { SalidaYEntregaSchema } from './salidaYEntrega.schema';
import { TransportistaSchema } from './transportista.schema';
import { VehiculoSchema } from './vehiculo.schema';
import { Path } from '../../helpers/Path';

export const TransporteSchema = z
  .object({
    // E901
    tipo: z.union(enumToZodUnion(TransportType)).optional(),

    // E903
    modalidad: z.union(enumToZodUnion(TransportModality)),

    // E905
    tipoResponsable: z.union(enumToZodUnion(FreightResponsible)),

    // E906
    condicionNegociacion: z
      .enum(
        enumToZodEnum<typeof TradingCondition, TradingCondition>(
          TradingCondition,
        ),
      )
      .optional(),

    // E907
    numeroManifiesto: z.string().min(1).max(15).optional(),

    // E908
    numeroDespachoImportacion: z.string().length(16).optional(),

    // E909: TODO: ES UN POCO RARO, ESPECIFICA CUANDO ES OPCIONAL Y CUANDO ES REQUERIDO, PERO QUE HAY DE LAS OPCIONES QUE NO SE MENCIONAN?
    inicioEstimadoTranslado: z.coerce
      .date()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDateString(value);
      }),

    // E910
    finEstimadoTranslado: z.coerce
      .date()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDateString(value);
      }),

    // E911
    paisDestino: z
      .enum(enumToZodEnum<typeof Country, Country>(Country))
      .optional(),

    salida: SalidaYEntregaSchema.optional(),

    entrega: SalidaYEntregaSchema.optional(),

    vehiculo: VehiculoSchema.optional(),

    transportista: TransportistaSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);
    const vehiclePath = new Path<typeof data>('vehiculo');

    if (data.inicioEstimadoTranslado) {
      validator.requiredField('finEstimadoTranslado');

      if (data.finEstimadoTranslado) {
        validator.validate(
          'finEstimadoTranslado',
          data.finEstimadoTranslado < data.inicioEstimadoTranslado,
          'El valor de finEstimadoTranslado no puede ser menor que el valor de inicioEstimadoTranslado',
        );
      }
    }

    let paisDestinoNombre;
    if (data.paisDestino) {
      const countryFound = dbService
        .select('countries')
        .findById(data.paisDestino);
      paisDestinoNombre = countryFound?.description;
    }

    if (data.modalidad == TransportModality.AEREO) {
      validator.requiredField(vehiclePath.concat('numeroVuelo'));
    }

    return {
      ...data,

      // E912
      paisDestinoNombre,
    };
  });

export type Transporte = z.infer<typeof TransporteSchema>;
