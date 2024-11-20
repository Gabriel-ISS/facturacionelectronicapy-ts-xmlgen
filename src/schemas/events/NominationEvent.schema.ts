import { z } from 'zod';
import { OperationTypeNoB2G } from '../../constants/operationTypes.constants';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { Taxpayer } from '../../constants/taxpayer.constants';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import { IdentityDocForNominationEvent } from '../../constants/IdDocForNominationEvent.constants';

// VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_014_MT_V150X.pdf/dbbb0294-8678-357a-1657-bcd0318077f9?t=1706189857282
// GENFE001
export const NominationEventSchema = z
  .object({
    // GENFE002
    cdc: CommonValidators.cdc(),

    // GENFE003
    motive: CommonValidators.motive(),

    // GENFE004
    contribuyente: CommonValidators.taxpayer(),

    // GENFE005
    pais: CommonValidators.country(),

    // GENFE007
    tipoReceptor: z.nativeEnum(Taxpayer).optional(),

    // para calcular GENFE008 y GENFE009
    ruc: CommonValidators.ruc().optional(),

    // GENFE010
    documentoTipo: z.nativeEnum(IdentityDocForNominationEvent).optional(),

    // GENFE012
    documentoNumero: CommonValidators.identityDocNumber().optional(),

    // GENFE013
    razonSocial: CommonValidators.legalName().optional(),

    // GENFE014
    nombreFantasia: CommonValidators.tradeName().optional(),

    // GENFE015
    direccion: CommonValidators.address().optional(),

    // GENFE016
    numeroCasa: CommonValidators.houseNumber().optional(),

    // GENFE017
    departamento: CommonValidators.department().optional(),

    // GENFE019
    distrito: CommonValidators.district().optional(),

    // GENFE021
    ciudad: CommonValidators.city().optional(),

    // GENFE023
    telefono: CommonValidators.tel().optional(),

    // GENFE024
    celular: CommonValidators.cel().optional(),

    // GENFE025
    email: CommonValidators.email().optional(),

    // GENFE026
    codigo: CommonValidators.clientCode().optional(),

    // GENFE027
    tipoOperacion: z.nativeEnum(OperationTypeNoB2G),
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
      paisDescripcion: dbService.select('countries').findByIdIfExist(data.pais)
        ?.description,

      // GENFE008
      rucID: rucID as string | undefined,

      // GENFE009
      rucDV: rucDV as string | undefined,

      // GENFE011
      descripcionTipoDocumento: dbService
        .select('identityDocsForNominationEvent')
        .findByIdIfExist(data.documentoTipo)?.description,

      // GENFE018
      descripcionDepartamento: dbService
        .select('departments')
        .findByIdIfExist(data.departamento)?.description,

      // GENFE020
      descripcionDistrito: dbService
        .select('districts')
        .findByIdIfExist(data.distrito)?.description,

      // GENFE022
      descripcionCiudad: dbService.select('cities').findByIdIfExist(data.ciudad)
        ?.description,
    };
  });

export type NominationEventInput = z.input<typeof NominationEventSchema>;