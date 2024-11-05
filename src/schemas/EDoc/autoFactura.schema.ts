import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import { SellerNatureSelfInvoicing } from '../../constants/sellerNatureSelfInvoicingCases.constants';
import { enumToZodUnion } from '../../helpers/validation/enumConverter';
import { UbicacionSchema } from './ubicacion.schema';
import constantsService from '../../services/constants.service';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';

export const AutoFacturaSchema = z
  .object({
    // E301
    tipoVendedor: z.union(enumToZodUnion(SellerNatureSelfInvoicing), {
      required_error: 'El tipo de vendedor es requerido',
    }),

    // E304
    documentoTipo: z.union(enumToZodUnion(IdentityDocumentCarriers), {
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

    ubicacion: UbicacionSchema,
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const foundDepartment = constantsService.departments.find(
      (department) => department._id == data.departamento,
    );

    validator.validate(
      'departamento',
      !foundDepartment,
      `El código del departamento no es válido`,
    );

    let distritoDescripcion;
    if (data.distrito) {
      const foundDistrict = constantsService.districts.find(
        (district) => district._id == data.distrito,
      );

      distritoDescripcion = foundDistrict?.description;

      validator.validate(
        'distrito',
        !foundDistrict,
        `El código del distrito no es válido`,
      );
    }

    const foundCity = constantsService.cities.find(
      (city) => city._id == data.ciudad,
    );

    validator.validate(
      'ciudad',
      !foundCity,
      `El código de la ciudad no es válido`,
    );

    return {
      ...data,
      // E311
      departamentoDescripcion: foundDepartment?.description as string,
      // E313
      distritoDescripcion,
      // E315
      ciudadDescripcion: foundCity?.description as string,
    };
  });

export type AutoFactura = z.infer<typeof AutoFacturaSchema>;
