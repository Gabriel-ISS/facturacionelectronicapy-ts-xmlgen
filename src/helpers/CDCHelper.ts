import { z } from 'zod';
import { Taxpayer } from '../constants/taxpayer.constants';
import { EDocData, EDocParams } from '../schemas/EDoc.schema';
import calcDV from './calcDV';
import {
  default as DateHelper,
  default as fechaUtilService,
} from './DateHelper';

// VER: 10.1. Estructura del código de control (CDC) de los DE
class CDCHelper {
  /** Verificar que el CDC coincida los los datos relacionados del documento. */
  validateCDC(
    params: Pick<EDocParams, 'ruc' | 'rucID' | 'rucDV' | 'tipoContribuyente'>,
    data: Pick<
      EDocData,
      | 'cdc'
      | 'fecha'
      | 'tipoDocumento'
      | 'establecimiento'
      | 'punto'
      | 'numero'
      | 'tipoEmision'
    >,
    ctx: z.RefinementCtx,
  ) {
    if (!data.cdc) return;

    const addError = (error: string, path: (string | number)[]) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error,
        path,
      });
    };

    const cdc = {
      // COO2
      documentType: Number(data.cdc.substring(0, 2)),

      // D101
      rucID: data.cdc.substring(2, 10),

      // D102
      rucDV: data.cdc.substring(10, 11),

      // C005
      establishment: data.cdc.substring(11, 14),

      // C006
      point: data.cdc.substring(14, 17),

      // C007
      number: data.cdc.substring(17, 24),

      // D103
      taxpayerType: Number(data.cdc.substring(24, 25)) as Taxpayer,

      // D002
      date: data.cdc.substring(25, 33),

      // B002
      issuanceType: Number(data.cdc.substring(33, 34)),

      // B004 y A003: no se valida porque se define de forma automática
      // securityCode: EDoc.cdc.substring(34, 43),
      // dv: EDoc.cdc.substring(44, 45),
    };

    if (data.tipoDocumento != cdc.documentType) {
      addError(
        `El Tipo de Documento con _id "${data.tipoDocumento}" debe coincidir con el tipo de documento del CDC "${cdc.documentType}"`,
        ['tipoDocumento'],
      );
    }

    if (params.rucID != cdc.rucID || params.rucDV != cdc.rucDV) {
      // convertimos a numero para eliminar los ceros a la izquierda
      const cdcRuc = `${Number(cdc.rucID)}-${cdc.rucDV}`;
      addError(
        `El RUC '${params.ruc}' debe coincidir con el RUC del CDC '${cdcRuc}'`,
        ['rucID'],
      );
    }

    if (data.establecimiento != cdc.establishment) {
      addError(
        `El Establecimiento '${data.establecimiento}' debe coincidir con el establecimiento del CDC '${cdc.establishment}'`,
        ['establecimiento'],
      );
    }

    if (data.punto != cdc.point) {
      addError(
        `El Punto '${data.punto}' debe coincidir con el punto del CDC '${cdc.point}'`,
        ['punto'],
      );
    }

    if (data.numero != cdc.number) {
      addError(
        `El Numero de Documento '${data.numero}' debe coincidir con el numero del documento del CDC '${cdc.number}'`,
        ['numero'],
      );
    }

    if (params.tipoContribuyente != cdc.taxpayerType) {
      addError(
        `El Tipo de Contribuyente '${params.tipoContribuyente}' debe coincidir con el del CDC '${cdc.taxpayerType}'`,
        ['tipoContribuyente'],
      );
    }

    const formattedDate = DateHelper.getCdcFormatDate(new Date(data.fecha));
    if (formattedDate != cdc.date) {
      addError(
        `La fecha de emisión de la FE debe coincidir con la fecha del CDC '${cdc.date}'`,
        ['fecha'],
      );
    }

    if (data.tipoEmision != cdc.issuanceType) {
      addError(
        `El Tipo de Emisión '${data.tipoEmision}' debe coincidir con el del CDC '${cdc.issuanceType}'`,
        ['tipoEmision'],
      );
    }
  }

  /**
   * Generacion del codigo de control de 44 digitos
   */
  generateCDC(
    params: Pick<EDocParams, 'tipoContribuyente' | 'rucID' | 'rucDV'>,
    data: Pick<
      EDocData,
      | 'tipoDocumento'
      | 'establecimiento'
      | 'punto'
      | 'numero'
      | 'fecha'
      | 'tipoEmision'
      | 'codigoSeguridadAleatorio'
    >,
  ) {
    const fechaEmision = fechaUtilService.getCdcFormatDate(
      new Date(data.fecha),
    );

    let cdc: string =
      data.tipoDocumento.toString().padStart(2, '0') +
      params.rucID.padStart(8, '0') +
      params.rucDV +
      data.establecimiento +
      data.punto +
      data.numero +
      params.tipoContribuyente +
      fechaEmision +
      data.tipoEmision +
      data.codigoSeguridadAleatorio;

    cdc += calcDV(cdc, 11);
    return cdc;
  }
}

export default new CDCHelper();
