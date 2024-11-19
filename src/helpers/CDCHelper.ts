import { z } from 'zod';
import {
  default as DateHelper,
  default as fechaUtilService,
} from './DateHelper';
import { EDocData, EDocParams } from '../schemas/EDoc.schema';
import calcDV from './calcDV';

// VER: 10.1. Estructura del código de control (CDC) de los DE
class CDCHelper {
  validateCDC(EDoc: EDocData & { cdc?: string }, ctx: z.RefinementCtx) {
    if (!EDoc.cdc) return;

    const addError = (error: string, path: (string | number)[]) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error,
        path,
      });
    };

    const cdc = {
      //securityCode: controlCode.substring(34, 43),
      /** Como se va utilizar el CDC enviado como parámetro, va a verificar que
       * todos los datos del XML coincidan con el CDC. */
      documentType: Number(EDoc.cdc.substring(0, 2)),
      //ruc: cdc.substring(2, 10),
      //dv: cdc.substring(10, 11),
      establishment: EDoc.cdc.substring(11, 14),
      point: EDoc.cdc.substring(14, 17),
      number: EDoc.cdc.substring(17, 24),
      //taxpayerType: cdc.substring(24, 25),
      date: EDoc.cdc.substring(25, 33),
      issuanceType: Number(EDoc.cdc.substring(33, 34)),
    };

    if (EDoc.tipoDocumento != cdc.documentType) {
      addError(
        `El Tipo de Documento con _id "${EDoc.tipoDocumento}" debe coincidir con el tipo de documento del CDC "${cdc.documentType}"`,
        ['tipoDocumento'],
      );
    }

    if (EDoc.establecimiento != cdc.establishment) {
      addError(
        `El Establecimiento '${EDoc.establecimiento}' debe coincidir con el establecimiento del CDC '${cdc.establishment}'`,
        ['establecimiento'],
      );
    }

    if (EDoc.punto != cdc.point) {
      addError(
        `El Punto '${EDoc.punto}' debe coincidir con el punto del CDC '${cdc.point}'`,
        ['punto'],
      );
    }

    if (EDoc.numero != cdc.number) {
      addError(
        `El Numero de Documento '${EDoc.numero}' debe coincidir con el numero del documento del CDC '${cdc.number}'`,
        ['numero'],
      );
    }

    /*if (+data['tipoContribuyente'] != +tipoContribuyenteCDC) {
        this.validator.errors.push("El Tipo de Contribuyente '" + data['tipoContribuyente'] + "' en data.tipoContribuyente debe coincidir con el CDC reutilizado (" + tipoContribuyenteCDC + ")");
      }*/

    const formattedDate = DateHelper.getCdcFormatDate(new Date(EDoc.fecha));
    if (formattedDate != cdc.date) {
      addError(
        `La fecha de emisión de la FE debe coincidir con la fecha del CDC '${cdc.date}'`,
        ['fecha'],
      );
    }

    if (EDoc.tipoEmision != cdc.issuanceType) {
      addError(
        `El Tipo de Emisión '${EDoc.tipoEmision}' debe coincidir con el del CDC '${cdc.issuanceType}'`,
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
