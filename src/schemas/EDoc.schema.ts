import { z } from 'zod';
import { EDocDataSchema } from './EDocData.schema';
import { EDocParamsSchema } from './EDocParams.schema';
import ZodValidator from '../helpers/validation/ZodValidator';
import { Path } from '../helpers/Path';
import { RemissionReason } from '../constants/remissionReasons.constants';
import CDCHelper from '../helpers/CDCHelper';

export const EDocSchema = z
  .object({
    data: EDocDataSchema,
    params: EDocParamsSchema,
  })
  .transform(({ data, params }, ctx) => {
    const validator = new ZodValidator(ctx, data);
    const dataPath = new Path<EDoc>('data');
    const paramsPath = new Path<EDoc>('params');

    const isValidEstablishment = params.establecimientos.some(
      (d) => d.codigo == data.establecimiento,
    );

    validator.validate(
      dataPath.concat('establecimiento'),
      !isValidEstablishment,
      'Debe utilizar un establecimiento de params.establecimientos',
    );

    // E501
    {
      /*
      OBS: Cuando el motivo sea por
      operaciones internas de la empresa,
      el RUC del receptor debe ser igual al
      RUC del emisor.
      */
      if (
        data.remision &&
        data.remision.motivo ==
          RemissionReason.TRASLADO_ENTRE_LOCALES_DE_LA_EMPRESA
      ) {
        validator.validate(
          dataPath.concat('cliente').concat('ruc'),
          data.cliente.ruc != params.ruc,
          'RUC del receptor debe coincidir con el RUC del emisor',
        );
      }
    }

    // ⚠️ según el repo original
    if (!data.cdc) {
      if (data.codigoSeguridadAleatorio) {
        validator.validate(
          paramsPath.concat('ruc'),
          !params.rucDV,
          'RUC debe contener dígito verificador en params.ruc',
        );

        data.cdc = CDCHelper.generateCDC(params, data as EDocData);
      } else {
        validator.validate(
          dataPath.concat('codigoSeguridadAleatorio'),
          true,
          'Debe proveer el valor del código de seguridad aleatorio',
        );
      }
    }

    return {
      data: {
        ...data,

        // A002: ⚠️ según el repo original
        Id: data.cdc as string,

        // A003
        dvId: data.cdc?.charAt(data.cdc.length - 1) as string,

        // B004
        codigoSeguridadAleatorio: data.codigoSeguridadAleatorio as string,
      },

      params,
    };
  });

export type EDoc = z.infer<typeof EDocSchema>;
export type EDocData = EDoc['data'];
export type EDocParams = EDoc['params'];
