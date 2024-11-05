import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import constantsService from '../../services/constants.service';

export const UbicacionSchema = z
  .object({
    // E316
    lugar: CommonValidators.address(),

    // E317
    departamento: CommonValidators.department(),

    // E319
    distrito: CommonValidators.district().optional(),

    // E321
    ciudad: CommonValidators.city(),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const foundDepartment = constantsService.departments.find(
      (d) => d._id === data.departamento,
    );

    validator.validate(
      'departamento',
      !foundDepartment,
      'El departamento no es válido',
    );

    let distritoDescripcion;
    if (data.distrito) {
      const foundDistrict = constantsService.districts.find(
        (district) => district._id === data.distrito,
      );

      validator.validate(
        'distrito',
        !foundDistrict,
        'El distrito no es válido',
      );
      distritoDescripcion = foundDistrict?.description;
    }

    const foundCity = constantsService.cities.find(
      (city) => city._id === data.ciudad,
    );

    validator.validate('ciudad', !foundCity, 'La ciudad no es válida');

    return {
      ...data,
      // E318
      departamentoDescripcion: foundDepartment?.description as string,
      // E320
      distritoDescripcion: distritoDescripcion,
      // E322
      ciudadDescripcion: foundCity?.description as string,
    };
  });

export type Ubicacion = z.infer<typeof UbicacionSchema>;
