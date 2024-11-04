import { z } from 'zod';
import { Department } from '../../constants/departments.constants';
import { IdentityDocumentCarriers } from '../../constants/identityDocumentsCarriers.constants';
import { SellerNatureSelfInvoicing } from '../../constants/sellerNatureSelfInvoicingCases.constants';
import { enumToZodUnion } from '../../helpers/validation/Common';
import { UbicacionSchema } from './ubicacion.schema';
import constantsService from '../../services/constants.service';

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
    documentoNumero: z
      .string({
        required_error: 'El número de documento es requerido',
      })
      .min(1)
      .max(20),

    // E307
    nombre: z
      .string({
        required_error: 'El nombre y apellido del vendedor son requeridos',
      })
      .min(4)
      .max(60),

    // E308
    direccion: z
      .string({
        required_error: 'La dirección del vendedor es requerida',
      })
      .min(1)
      .max(255),

    // E309
    numeroCasa: z
      .number({
        required_error: 'El número de casa es requerido',
      })
      .min(0, { message: 'El número de casa no puede ser menor que 0' })
      .max(999999, {
        message: 'El número de casa no puede ser mayor que 999999',
      }),

    // E310
    departamento: z.union(enumToZodUnion(Department), {
      required_error: 'El código del departamento es requerido',
    }),

    // E311: SE ESTABLECE AUTOMÁTICAMENTE (no se valida)
    departamentoDescripcion: z.string().optional(),

    // E312
    distrito: z.number().optional(),

    // E313: SE ESTABLECE AUTOMÁTICAMENTE (no se valida)
    distritoDescripcion: z.string().optional(),

    // E314
    ciudad: z.number({
      required_error: 'El código de la ciudad es requerido',
    }),

    // E315: SE ESTABLECE AUTOMÁTICAMENTE (no se valida)
    ciudadDescripcion: z.string().optional(),

    ubicacion: UbicacionSchema,
  })
  .transform((data, ctx) => {
    const departmentDescription = constantsService.departments.find(
      (department) => department._id == data.departamento,
    );
    if (departmentDescription) {
      data.departamentoDescripcion = departmentDescription.description;
    } else {
      ctx.addIssue({
        path: ['departamentoDescripcion'],
        code: z.ZodIssueCode.custom,
        message: 'El código del departamento no es válido',
      });
    }

    if (data.distrito) {
      const foundDistrict = constantsService.districts.find(
        (district) => district._id == data.distrito,
      );
      if (foundDistrict) {
        data.distritoDescripcion = foundDistrict.description;
      } else {
        ctx.addIssue({
          path: ['distritoDescripcion'],
          code: z.ZodIssueCode.custom,
          message: 'El código del distrito no es válido',
        });
      }
    }

    const foundCity = constantsService.cities.find(
      (city) => city._id == data.ciudad,
    );
    if (foundCity) {
      data.ciudadDescripcion = foundCity.description;
    } else {
      ctx.addIssue({
        path: ['ciudadDescripcion'],
        code: z.ZodIssueCode.custom,
        message: 'El código de la ciudad no es válido',
      });
    }

    return data;
  });

export type AutoFactura = z.infer<typeof AutoFacturaSchema>;
