import { z } from 'zod';
import { AssociatedDocumentType } from '../../constants/associatedDocumentTypes.constants';
import { ConstancyType } from '../../constants/constancyTypes.constants';
import { PrintedDocumentType } from '../../constants/printedDocumentTypes.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/**H. Campos que identifican al documento asociado (H001-H049) */
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

    // H006
    establecimiento: CommonValidators.zeroPadToLength(3).optional(),

    // H007
    punto: CommonValidators.zeroPadToLength(3).optional(),

    // H008
    numero: CommonValidators.zeroPadToLength(7).optional(),

    // H009
    tipoDocumentoImpreso: z
      .union(enumToZodUnion(PrintedDocumentType))
      .optional(),

    // H011
    fecha: CommonValidators.isoDate().optional(),

    // H012
    numeroRetencion: z.string().length(15).optional(),

    // H013
    resolucionCreditoFiscal: z.string().length(15).optional(),

    // H014
    constanciaTipo: z.union(enumToZodUnion(ConstancyType)).optional(),

    // H016
    constanciaNumero: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(11);
      }),

    // H017
    constanciaControl: z.string().length(8).optional(),

    // H018: TODO: OTRO DESAPARECIDO
    /* rucFusionado: z.string().optional(), */
  })
  .transform((data, ctx) => {
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

    return {
      ...data,

      // H003
      formatoDescripcion: dbService
        .select('associatedDocumentTypes')
        .findById(data.formato)?.description,

      // H010
      tipoDocumentoImpresoDescripcion: dbService
        .select('printedDocumentTypes')
        .findByIdIfExist(data.tipoDocumentoImpreso)?.description,

      // H015
      constanciaTipoDescripcion: dbService
        .select('constancyTypes')
        .findByIdIfExist(data.constanciaTipo)?.description,
    };
  });

export type DocumentoAsociado = z.infer<typeof DocumentoAsociadoSchema>;
