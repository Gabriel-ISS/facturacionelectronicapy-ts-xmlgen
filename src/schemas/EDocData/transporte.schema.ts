import { z } from 'zod';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { TradingCondition } from '../../constants/tradingConditions.constants';
import { TransportModality } from '../../constants/transportModalities.constants';
import { TransportType } from '../../constants/transportTypes.constants';
import { Path } from '../../helpers/Path';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { SalidaYEntregaSchema } from './salidaYEntrega.schema';
import { TransportistaSchema } from './transportista.schema';
import { VehiculoSchema } from './vehiculo.schema';

export const TransporteSchema = z
  .object({
    // E901
    tipo: z.nativeEnum(TransportType).optional(),

    // E903
    modalidad: z.nativeEnum(TransportModality),

    // E905
    tipoResponsable: z.nativeEnum(FreightResponsible),

    // E906
    condicionNegociacion: z.nativeEnum(TradingCondition).optional(),

    // E907
    numeroManifiesto: z.string().min(1).max(15).optional(),

    // E908
    numeroDespachoImportacion: z.string().length(16).optional(),

    // E909
    inicioEstimadoTranslado: CommonValidators.isoDate().optional(),

    // E910
    finEstimadoTranslado: CommonValidators.isoDate().optional(),

    // E911
    paisDestino: CommonValidators.country().optional(),

    // (E920) E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)
    salida: SalidaYEntregaSchema.optional(),

    // (E940) E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)
    entrega: SalidaYEntregaSchema.optional(),

    // (E960) E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979)
    vehiculo: VehiculoSchema.optional(),

    // (E980) E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999)
    transportista: TransportistaSchema.optional(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);
    const vehiclePath = new Path<typeof data>('vehiculo');

    // E910 - finEstimadoTranslado
    {
      /*
      Obligatorio si existe el campo E909
      */
      if (data.inicioEstimadoTranslado) {
        validator.requiredField('finEstimadoTranslado');
      }
    }

    // ⚠️ esto no esta en el manual
    {
      if (data.inicioEstimadoTranslado && data.finEstimadoTranslado) {
        validator.validate(
          'finEstimadoTranslado',
          data.finEstimadoTranslado < data.inicioEstimadoTranslado,
          'El valor de finEstimadoTranslado no puede ser menor que el valor de inicioEstimadoTranslado',
        );
      }
    }

    // E912 - paisDestinoNombre
    let paisDestinoNombre;
    {
      /*
      Obligatorio si existe el campo E911
      */
      if (data.paisDestino) {
        const countryFound = dbService
          .select('countries')
          .findById(data.paisDestino);
        paisDestinoNombre = countryFound.description;
      }
    }

    // E966 - vehiculo.numeroVuelo
    {
      /*
      Obligatorio si E903 = 3
      No informar si E903 ≠ 3
      */
      if (data.modalidad == TransportModality.AEREO) {
        validator.requiredField(vehiclePath.concat('numeroVuelo'));
      }
    }

    return {
      ...data,

      // E902
      tipoDescripcion: dbService
        .select('transportTypes')
        .findByIdIfExist(data.tipo)?.description,

      // E904
      modalidadDescripcion: dbService
        .select('transportModalities')
        .findById(data.modalidad).description,

      // E912
      paisDestinoNombre,
    };
  });

export type Transporte = z.infer<typeof TransporteSchema>;
