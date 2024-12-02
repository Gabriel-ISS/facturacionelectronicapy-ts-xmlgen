import { z } from 'zod';
import { IdentityDocumentCarriers } from '../../data/idDocsCarriers.table';
import { SellerNatureSelfInvoicing } from '../../data/sellerNatureSelfInvoicingCases.table';

import CommonValidators from '../../helpers/validation/CommonValidators';
import dbService from '../../services/db.service';
import { UbicacionSchema } from './ubicacion.schema';

/**E4. Campos que componen la Autofactura Electrónica AFE (E300-E399) */
export const AutoFacturaSchema = z
  .object({
    // E301
    tipoVendedor: z.nativeEnum(SellerNatureSelfInvoicing),

    // E304
    documentoTipo: z.nativeEnum(IdentityDocumentCarriers),

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
        .sellerNatureSelfInvoicingCases
        ._findById(data.tipoVendedor).description,

      // E305
      documentoTipoDescripcion: dbService
        .idDocsCarriers
        ._findById(data.documentoTipo).description,

      // E311
      departamentoDescripcion: dbService
        .departments
        ._findById(data.departamento).description,

      // E313
      distritoDescripcion: dbService
        .districts
        ._findByIdIfExist(data.distrito, {
          ctx,
          fieldName: 'distrito',
        })?.description,

      // E315
      ciudadDescripcion: dbService
        .districts
        ._findById(data.ciudad, {
          ctx,
          fieldName: 'distrito',
        })?.description,
    };
  });

export type AutoFactura = z.infer<typeof AutoFacturaSchema>;
