import { z } from 'zod';
import { AssociatedDocumentType } from '../../constants/associatedDocumentTypes.constants';
import { PrintedDocumentType } from '../../constants/printedDocumentTypes.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/zod.helpers';

export const DocumentoAsociadoSchema = z
  .object({
    // H002
    formato: z.union(enumToZodUnion(AssociatedDocumentType), {
      required_error: 'El campo formato es requerido',
    }),

    // H004
    cdc: z.string().optional(),

    // H009
    tipoDocumentoImpreso: z.union(enumToZodUnion(PrintedDocumentType), {
      required_error: 'El campo tipoDocumentoImpreso es requerido',
    }),

    // H005
    timbrado: z.string(),

    // H005
    establecimiento: z.string(),

    // H007
    punto: z.string(),

    // H008
    numero: z.string(),

    // H011
    fecha: z.string().refine((date) => DateHelper.isIsoDate(date), {
      message: 'El formato de fecha debe ser ISO 8601',
    }),

    // H012
    numeroRetencion: z.string().optional(),

    // H013
    resolucionCreditoFiscal: z.string().optional(),

    // H014
    constanciaTipo: z.string().optional(),

    // H016
    constanciaNumero: z.string().optional(),

    // H017
    constanciaControl: z.string().optional(),

    // H018
    rucFusionado: z.string().optional(),
  })
  .superRefine((associatedDocument, ctx) => {
    if (associatedDocument.establecimiento && !associatedDocument.fecha) {
      ctx.addIssue({
        path: ['fecha'],
        code: z.ZodIssueCode.custom,
        message: 'Debe proporcionar la fecha de emisión del documento impreso',
      });
    }
  });
export type DocumentoAsociado = z.infer<typeof DocumentoAsociadoSchema>;