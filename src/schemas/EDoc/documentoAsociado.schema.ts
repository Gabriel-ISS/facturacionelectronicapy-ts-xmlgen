import { z } from 'zod';
import { AssociatedDocumentType } from '../../constants/associatedDocumentTypes.constants';
import { PrintedDocumentType } from '../../constants/printedDocumentTypes.constants';
import DateHelper from '../../helpers/DateHelper';
import { enumToZodUnion } from '../../helpers/zod.helpers';
import ZodValidator from '../../helpers/ZodValidator';
import { ConstancyType } from '../../constants/constancyTypes.constants';

export const DocumentoAsociadoSchema = z
  .object({
    // H002
    formato: z.union(enumToZodUnion(AssociatedDocumentType), {
      required_error: 'El campo formato es requerido',
    }),

    // H004
    cdc: z.string().length(44).optional(),

    // H005
    timbrado: z.string().length(8).optional(),

    // H005
    establecimiento: z
      .number()
      .optional()
      .transform((value) => {
        if (value == undefined) return value;
        return value.toString().padStart(3, '0');
      }),

    // H007
    punto: z
      .number()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return value.toString().padStart(3, '0');
      }),

    // H008
    numero: z
      .number()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return value.toString().padStart(7, '0');
      }),

    // H009
    tipoDocumentoImpreso: z
      .union(enumToZodUnion(PrintedDocumentType))
      .optional(),

    // H011
    fecha: z.coerce
      .date()
      .optional()
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDateString(value);
      }),

    // H012
    numeroRetencion: z.string().length(15).optional(),

    // H013
    resolucionCreditoFiscal: z.string().length(15).optional(),

    // H014
    constanciaTipo: z.union(enumToZodUnion(ConstancyType)).optional(),

    // H016
    constanciaNumero: z.string().optional(),

    // H017
    constanciaControl: z.string().optional(),

    // H018: TODO: OTRO DESAPARECIDO
    /* rucFusionado: z.string().optional(), */
  })
  .superRefine((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    if (data.formato == AssociatedDocumentType.IMPRESO) {
      validator.requiredField('cdc');
      validator.requiredField('timbrado');
      validator.requiredField('establecimiento');
      validator.requiredField('punto');
      validator.requiredField('numero');
      validator.requiredField('tipoDocumentoImpreso');
    } else if (
      data.formato == AssociatedDocumentType.ELECTRONICO ||
      data.formato == AssociatedDocumentType.CONSTANCIA_ELECTRONICA
    ) {
      validator.undesiredField('cdc');
      validator.undesiredField('timbrado');
      validator.undesiredField('establecimiento');
      validator.undesiredField('punto');
    }

    if (data.formato == AssociatedDocumentType.CONSTANCIA_ELECTRONICA) {
      validator.requiredField('constanciaTipo');

      if (data.constanciaTipo == ConstancyType.CONSTANCIA_DE_MICROPRODUCTORES) {
        validator.requiredField('constanciaNumero');
        validator.requiredField('constanciaControl');
      }
    } else {
      validator.undesiredField('constanciaTipo');
      validator.undesiredField('constanciaNumero');
      validator.undesiredField('constanciaControl');
    }

    if (data.establecimiento) {
      validator.requiredField('fecha');
    } else {
      validator.undesiredField('fecha');
    }
  });

export type DocumentoAsociado = z.infer<typeof DocumentoAsociadoSchema>;
