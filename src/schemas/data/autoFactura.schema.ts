import { z } from 'zod';
import { IdentityDocumentCarrier } from '../../data/idDocsCarriers.table';
import { SellerNatureSelfInvoicing } from '../../data/sellerNatureSelfInvoicingCases.table';

import CommonValidators from '../../helpers/validation/CommonValidators';
import dbService from '../../services/db.service';
import { UbicacionSchema } from './ubicacion.schema';
import SDParser from '../../helpers/SDParser';

/**E4. Campos que componen la Autofactura Electrónica AFE (E300-E399) */
export const AutoFacturaSchema = z
  .object({
    // E301
    tipoVendedor: z
      .nativeEnum(SellerNatureSelfInvoicing)
      .describe(SDParser.stringify('E301', { e: 'SellerNatureSelfInvoicing' })),

    // E304
    documentoTipo: z
      .nativeEnum(IdentityDocumentCarrier)
      .describe(SDParser.stringify('E304', { e: 'IdentityDocumentCarrier' })),

    // E306
    documentoNumero: CommonValidators.identityDocNumber().describe(
      SDParser.stringify('E306'),
    ),

    // E307
    nombre: CommonValidators.name().describe(SDParser.stringify('E307')),

    // E308
    direccion: CommonValidators.address().describe(SDParser.stringify('E308')),

    // E309
    numeroCasa: CommonValidators.houseNumber().describe(
      SDParser.stringify('E309'),
    ),

    // E310
    departamento: CommonValidators.department().describe(
      SDParser.stringify('E310', { e: 'Department' }),
    ),

    // E312
    distrito: CommonValidators.district()
      .optional()
      .describe(SDParser.stringify('E312', { t: 'distritos' })),

    // E314
    ciudad: CommonValidators.city().describe(
      SDParser.stringify('E314', { t: 'ciudades' }),
    ),

    // E316 - E322
    ubicacion: UbicacionSchema.describe(SDParser.stringify('E316 - E322')),
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
      tipoVendedorDescripcion:
        dbService.sellerNatureSelfInvoicingCases._findById(data.tipoVendedor)
          .description,

      // E305
      documentoTipoDescripcion: dbService.idDocsCarriers._findById(
        data.documentoTipo,
      ).description,

      // E311
      departamentoDescripcion: dbService.departments._findById(
        data.departamento,
      ).description,

      // E313
      distritoDescripcion: dbService.districts._findByIdIfExist(data.distrito, {
        ctx,
        fieldName: 'distrito',
      })?.description,

      // E315
      ciudadDescripcion: dbService.districts._findById(data.ciudad, {
        ctx,
        fieldName: 'distrito',
      })?.description,
    };
  });

export type AutoFactura = z.infer<typeof AutoFacturaSchema>;
