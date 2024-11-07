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

    // H018: TODO: NO APARECE EN EL MANUAL
    /* rucFusionado: z.string().optional(), */
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    /**H002 = 1 */
    const isElectronicDocument =
      data.formato == AssociatedDocumentType.ELECTRONICO;
    /**H002 = 2 */
    const isPrintedDocument = data.formato == AssociatedDocumentType.IMPRESO;
    /**H002 = 3 */
    const isConstancyElectronicDocument =
      data.formato == AssociatedDocumentType.CONSTANCIA_ELECTRONICA;
    /**H014 = 2 */
    const constancyTipeIsMicroproducer =
      data.constanciaTipo == ConstancyType.CONSTANCIA_DE_MICROPRODUCTORES;

    // H004 - cdc
    {
      /*
      Obligatorio si H002=1
      No informar si H002 = 2 o 3
      */
      if (isElectronicDocument) {
        validator.requiredField('cdc');
      } else if (isPrintedDocument || isConstancyElectronicDocument) {
        validator.undesiredField('cdc');
      }
    }

    // H005 - timbrado
    {
      /*
      Obligatorio si H002=2
      No informar si H002 = 1 o 3
      */
      if (isPrintedDocument) {
        validator.requiredField('timbrado');
      } else if (isElectronicDocument || isConstancyElectronicDocument) {
        validator.undesiredField('timbrado');
      }
    }

    // H006 - establecimiento
    {
      /*
      Obligatorio si H002=2
      No informar si H002 = 1 o 3
      */
      if (isPrintedDocument) {
        validator.requiredField('establecimiento');
      } else if (isElectronicDocument || isConstancyElectronicDocument) {
        validator.undesiredField('establecimiento');
      }
    }

    // H007 - punto
    {
      /*
      Obligatorio si H002=2
      No informar si H002 = 1 o 3
      */
      if (isPrintedDocument) {
        validator.requiredField('punto');
      } else if (isElectronicDocument || isConstancyElectronicDocument) {
        validator.undesiredField('punto');
      }
    }

    // H008 - numero
    {
      /*
      Obligatorio si H002=2
      No informar si H002 = 1 o 3
      */
      if (isPrintedDocument) {
        validator.requiredField('numero');
      } else if (isElectronicDocument || isConstancyElectronicDocument) {
        validator.undesiredField('numero');
      }
    }

    // H009 - tipoDocumentoImpreso
    {
      /*
      Obligatorio si H002=2
      No informar si H002 = 1 o 3
      */
      if (isPrintedDocument) {
        validator.requiredField('tipoDocumentoImpreso');
      } else if (isElectronicDocument || isConstancyElectronicDocument) {
        validator.undesiredField('tipoDocumentoImpreso');
      }
    }

    // H011 - fecha
    {
      /*
      Obligatorio si existe el campo H005
      No Informar si campo H005 no existe
      */
      if (data.timbrado) {
        validator.requiredField('fecha');
      } else {
        validator.undesiredField('fecha');
      }
    }

    // H014 - constanciaTipo
    {
      /*
      Obligatorio cuando H002 = 3
      No informar cuando H002 ≠ 3
      */
      if (isConstancyElectronicDocument) {
        validator.requiredField('constanciaTipo');
      } else {
        validator.undesiredField('constanciaTipo');
      }
    }

    // H016 - constanciaNumero
    {
      /*
      Obligatorio cuando H002 = 3 y H014 = 2
      No informar cuando H002 ≠ 3
      */
      if (isConstancyElectronicDocument && constancyTipeIsMicroproducer) {
        validator.requiredField('constanciaNumero');
      } else if (!isConstancyElectronicDocument) {
        validator.undesiredField('constanciaNumero');
      }
    }

    // H017 - constanciaControl
    {
      /*
      Obligatorio cuando H002 = 3 y H014 = 2
      No informar cuando H002 ≠ 3
      */
      if (isConstancyElectronicDocument && constancyTipeIsMicroproducer) {
        validator.requiredField('constanciaControl');
      } else if (!isConstancyElectronicDocument) {
        validator.undesiredField('constanciaControl');
      }
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
