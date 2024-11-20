import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import { SellerNatureSelfInvoicing } from '../../constants/sellerNatureSelfInvoicingCases.constants';

import { UbicacionSchema } from './ubicacion.schema';
import constantsService from '../../services/constants.service';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';

/**E4. Campos que componen la Autofactura Electrónica AFE (E300-E399) */
export const AutoFacturaSchema = z
  .object({
    // E301
    tipoVendedor: z.nativeEnum(SellerNatureSelfInvoicing, {
      required_error: 'El tipo de vendedor es requerido',
    }),

    // E304
    documentoTipo: z.nativeEnum(IdentityDocumentCarriers, {
      required_error: 'El tipo de documento es requerido',
    }),

    // E306
    documentoNumero: CommonValidators.identityDocNumber(),

    // E307
    nombre: CommonValidators.name(),

    // E308
    direccion: CommonValidators.address(),

    // E309
    numeroCasa: CommonValidators.houseNumber(),

    // E310
    departamento: CommonValidators.department(),

    // E312
    distrito: CommonValidators.district().optional(),

    // E314
    ciudad: CommonValidators.city(),

    // E316 - E322
    ubicacion: UbicacionSchema,
  })
  .transform((data, ctx) => {
    CommonValidators.location(
      ctx,
      data.departamento,
      data.distrito,
      data.ciudad,
    );

    return {
      ...data,

      // E302
      tipoVendedorDescripcion: dbService
        .select('sellerNatureSelfInvoicingCases')
        .findById(data.tipoVendedor).description,

      // E305
      documentoTipoDescripcion: dbService
        .select('identityDocumentsCarriers')
        .findById(data.documentoTipo).description,

      // E311
      departamentoDescripcion: dbService
        .select('departments')
        .findById(data.departamento).description,

      // E313
      distritoDescripcion: dbService
        .select('districts')
        .findByIdIfExist(data.distrito, {
          ctx,
          fieldName: 'distrito',
          message: 'El código del distrito no es válido',
        })?.description,

      // E315
      ciudadDescripcion: dbService
        .select('districts')
        .findById(data.ciudad, {
          ctx,
          fieldName: 'distrito',
          message: 'El código de ciudad no es válido',
        })?.description,
    };
  });

export type AutoFactura = z.infer<typeof AutoFacturaSchema>;
