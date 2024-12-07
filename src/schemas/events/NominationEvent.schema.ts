import { z } from 'zod';
import { OperationTypeNoB2G } from '../../data/operationTypes.table';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { TaxpayerType } from '../../data/taxpayerTypes.table';
import { TaxpayerNotTaxpayer } from '../../data/taxpayerNotTaxpayer.table';
import { IdentityDocForNominationEvent } from '../../data/idDocsForNominationEvent.table';
import SDParser from '../../helpers/SDParser';

// VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_014_MT_V150X.pdf/dbbb0294-8678-357a-1657-bcd0318077f9?t=1706189857282
// GENFE001
export const NominationEventSchema = z
  .object({
    // GENFE002
    cdc: CommonValidators.cdc().describe(SDParser.stringify('GENFE002')),

    // GENFE003
    motive: CommonValidators.motive().describe(SDParser.stringify('GENFE003')),

    // GENFE004
    contribuyente: CommonValidators.taxpayer().describe(
      SDParser.stringify('GENFE004'),
    ),

    // GENFE005
    pais: CommonValidators.country().describe(SDParser.stringify('GENFE005',  {
      e: 'Country'
    })),

    // GENFE007
    tipoReceptor: z
      .nativeEnum(TaxpayerType)
      .optional()
      .describe(SDParser.stringify('GENFE007', { e: 'TaxpayerType' })),

    // para calcular GENFE008 y GENFE009
    ruc: CommonValidators.ruc()
      .optional()
      .describe(SDParser.stringify('GENFE008 y GENFE009')),

    // GENFE010
    documentoTipo: z
      .nativeEnum(IdentityDocForNominationEvent)
      .optional()
      .describe(
        SDParser.stringify('GENFE010', { e: 'IdentityDocForNominationEvent' }),
      ),

    // GENFE011
    descripcionTipoDocumento: CommonValidators.identityDocDescription()
      .optional()
      .describe(SDParser.stringify('GENFE011')),

    // GENFE012
    documentoNumero: CommonValidators.identityDocNumber()
      .optional()
      .describe(SDParser.stringify('GENFE012')),

    // GENFE013
    razonSocial: CommonValidators.legalName()
      .optional()
      .describe(SDParser.stringify('GENFE013')),

    // GENFE014
    nombreFantasia: CommonValidators.tradeName()
      .optional()
      .describe(SDParser.stringify('GENFE014')),

    // GENFE015
    direccion: CommonValidators.address()
      .optional()
      .describe(SDParser.stringify('GENFE015')),

    // GENFE016
    numeroCasa: CommonValidators.houseNumber()
      .optional()
      .describe(SDParser.stringify('GENFE016')),

    // GENFE017
    departamento: CommonValidators.department()
      .optional()
      .describe(SDParser.stringify('GENFE017', {
        e: 'Department'
      })),

    // GENFE019
    distrito: CommonValidators.district()
      .optional()
      .describe(SDParser.stringify('GENFE019')),

    // GENFE021
    ciudad: CommonValidators.city()
      .optional()
      .describe(SDParser.stringify('GENFE021')),

    // GENFE023
    telefono: CommonValidators.tel()
      .optional()
      .describe(SDParser.stringify('GENFE023')),

    // GENFE024
    celular: CommonValidators.cel()
      .optional()
      .describe(SDParser.stringify('GENFE024')),

    // GENFE025
    email: CommonValidators.email()
      .optional()
      .describe(SDParser.stringify('GENFE025')),

    // GENFE026
    codigo: CommonValidators.clientCode()
      .optional()
      .describe(SDParser.stringify('GENFE026')),

    // GENFE027
    tipoOperacion: z
      .nativeEnum(OperationTypeNoB2G)
      .describe(SDParser.stringify('GENFE027', { e: 'OperationTypeNoB2G' })),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    CommonValidators.location(
      ctx,
      data.departamento,
      data.distrito,
      data.ciudad,
    );

    /**GENFE004 = 1 */
    const isTaxpayer = data.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**GENFE004 = 2 */
    const isNotTaxpayer =
      data.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;
    /**GENFE010 = 9 */
    const isOther = data.documentoTipo == IdentityDocForNominationEvent.OTRO;

    // GENFE007, GENFE008, GENFE009
    {
      /*
      Obligatorio si GENFE004=1
      No informar si GENFE004=2
      */
      if (isTaxpayer) {
        validator.requiredField('tipoReceptor');
        validator.requiredField('ruc');
      } else if (isNotTaxpayer) {
        validator.undesiredField('tipoReceptor');
        validator.undesiredField('ruc');
      }
    }

    // GENFE010, GENFE012
    {
      /*
      Obligatorio si GENFE004=2
      */
      if (isNotTaxpayer) {
        validator.requiredField('documentoTipo');
        validator.requiredField('documentoNumero');
      }
    }

    // GENFE011 - descripcionTipoDocumento
    {
      /*
      Si GENFE010 = 9 informar el tipo de
      documento de identidad del
      receptor
      */
      if (isOther) {
        validator.requiredField('descripcionTipoDocumento');
      } else {
        data.descripcionTipoDocumento =
          dbService.identityDocsForNominationEvent._findByIdIfExist(
            data.documentoTipo,
          )?.description;
      }
    }

    // GENFE016
    {
      /*
      Campo obligatorio si se informa el campo GENFE015
      */
      if (data.direccion) {
        validator.requiredField('numeroCasa');
      }
    }

    // GENFE023
    {
      /*DELETE: una vez se resuelva
      Debe incluir el prefijo de la ciudad si GENFE005= PRY
      */
    }

    const [rucID, rucDV] = data.ruc?.split('-') ?? [];

    return {
      ...data,

      // GENFE006
      paisDescripcion: dbService.countries._findByIdIfExist(data.pais)
        ?.description,

      // GENFE008
      rucID: rucID as string | undefined,

      // GENFE009
      rucDV: rucDV as string | undefined,

      // GENFE018
      descripcionDepartamento: dbService.departments._findByIdIfExist(
        data.departamento,
      )?.description,

      // GENFE020
      descripcionDistrito: dbService.districts._findByIdIfExist(data.distrito)
        ?.description,

      // GENFE022
      descripcionCiudad: dbService.cities._findByIdIfExist(data.ciudad)
        ?.description,
    };
  });

export type NominationEventInput = z.input<typeof NominationEventSchema>;
