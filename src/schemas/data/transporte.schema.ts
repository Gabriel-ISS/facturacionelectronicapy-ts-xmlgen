import { z } from 'zod';
import { FreightResponsible } from '../../data/freightResponsibles.table';
import { TradingCondition } from '../../data/tradingConditions.table';
import { TransportModality } from '../../data/transportModalities.table';
import { TransportType } from '../../data/transportTypes.table';
import { Path } from '../../helpers/Path';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { SalidaYEntregaSchema } from './salidaYEntrega.schema';
import { TransportistaSchema } from './transportista.schema';
import { VehiculoSchema } from './vehiculo.schema';
import SDParser from '../../helpers/SDParser';

export const TransporteSchema = z
  .object({
    // E901
    tipo: z
      .nativeEnum(TransportType)
      .optional()
      .describe(SDParser.stringify('E901', { e: 'TransportType' })),

    // E903
    modalidad: z
      .nativeEnum(TransportModality)
      .describe(SDParser.stringify('E903', { e: 'TransportModality' })),

    // E905
    tipoResponsable: z
      .nativeEnum(FreightResponsible)
      .describe(SDParser.stringify('E905', { e: 'FreightResponsible' })),

    // E906
    condicionNegociacion: z
      .nativeEnum(TradingCondition)
      .optional()
      .describe(SDParser.stringify('E906', { e: 'TradingCondition' })),

    // E907
    numeroManifiesto: z
      .string()
      .min(1)
      .max(15)
      .optional()
      .describe(SDParser.stringify('E907')),

    // E908
    numeroDespachoImportacion: z
      .string()
      .length(16)
      .optional()
      .describe(SDParser.stringify('E908')),

    // E909
    inicioEstimadoTranslado: CommonValidators.isoDate()
      .optional()
      .describe(SDParser.stringify('E909')),

    // E910
    finEstimadoTranslado: CommonValidators.isoDate()
      .optional()
      .describe(SDParser.stringify('E910')),

    // E911
    paisDestino: CommonValidators.country()
      .optional()
      .describe(
        SDParser.stringify('E911', {
          e: 'Country',
        }),
      ),

    // (E920) E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)
    salida: SalidaYEntregaSchema.optional().describe(
      SDParser.stringify('E10.1', {
        d: 'Campos que identifican el local de salida de las mercaderías (E920-E939)',
      }),
    ),

    // (E940) E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)
    entrega: SalidaYEntregaSchema.optional().describe(
      SDParser.stringify('E10.2', {
        d: 'Campos que identifican el local de entrega de las mercaderías (E940-E959)',
      }),
    ),

    // (E960) E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979)
    vehiculo: VehiculoSchema.optional().describe(
      SDParser.stringify('E10.3', {
        d: 'Campos que identifican el vehículo de traslado de mercaderías (E960-E979)',
      }),
    ),

    // (E980) E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999)
    transportista: TransportistaSchema.optional().describe(
      SDParser.stringify('E10.4', {
        d: 'Campos que identifican al transportista (persona física o jurídica) (E980-E999)',
      }),
    ),
  })
  .transform((data, ctx) => {
    type Data = typeof data;
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
      const startPath = new Path<Data>('inicioEstimadoTranslado');
      if (data.inicioEstimadoTranslado && data.finEstimadoTranslado) {
        validator.validate(
          'finEstimadoTranslado',
          data.finEstimadoTranslado < data.inicioEstimadoTranslado,
          `$path no puede ser anterior a '${startPath}'`,
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
        const countryFound = dbService.countries._findById(data.paisDestino);
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
      tipoDescripcion: dbService.transportTypes._findByIdIfExist(data.tipo)
        ?.description,

      // E904
      modalidadDescripcion: dbService.transportModalities._findById(
        data.modalidad,
      ).description,

      // E912
      paisDestinoNombre,
    };
  });

export type Transporte = z.infer<typeof TransporteSchema>;
