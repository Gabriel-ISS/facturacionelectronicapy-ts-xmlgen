import { z } from 'zod';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import NumberLength from './NumberLenght';
import { Country } from '../../constants/countries.constants';
import { enumToZodEnum, enumToZodUnion } from './enumConverter';
import { Department } from '../../constants/departments.constants';
import { Currency } from '../../constants/curencies.constants';

// MENSAJES
type Required = { required?: string };
type Type = { invalid_type?: string };
type Min = { min?: string };
type Max = { max?: string };

class CommonValidators {
  taxpayer(messages?: Required & Type) {
    return z
      .boolean({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .transform((v) =>
        v
          ? TaxpayerNotTaxpayer.CONTRIBUYENTE
          : TaxpayerNotTaxpayer.NO_CONTRIBUYENTE,
      );
  }

  ruc(messages?: Required & Type & Min & Max) {
    return z
      .string({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(3, messages?.min)
      .max(8, messages?.max);
  }

  name(messages?: Required & Type & Min & Max) {
    return z
      .string({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(4, messages?.min)
      .max(60, messages?.max);
  }

  identityDocNumber(messages?: Required & Type & Min & Max) {
    return z
      .string({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(1, messages?.min)
      .max(20, messages?.max);
  }

  currency(messages?: Required & Type & Min & Max) {
    return z.enum(enumToZodEnum<typeof Currency, Currency>(Currency), {
      required_error: messages?.required,
      invalid_type_error: messages?.invalid_type,
    });
  }

  currencyChange(messages?: Required & Type & Min & Max) {
    return z
      .number({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      }).superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(5).maxDecimals(4);
      });
  }

  country(messages?: Required & Type & Min & Max) {
    return z.enum(enumToZodEnum<typeof Country, Country>(Country), {
      required_error: messages?.required,
      invalid_type_error: messages?.invalid_type,
    });
  }

  department(messages?: Required & Type & Min & Max) {
    return z.union(enumToZodUnion(Department), {
      required_error: messages?.required,
      invalid_type_error: messages?.invalid_type,
    });
  }

  district(messages?: Required & Type & Min & Max) {
    return z
      .number({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(1, messages?.min)
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(4);
      });
  }

  city(messages?: Required & Type & Min & Max) {
    return z
      .number({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(1, messages?.min)
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(5);
      });
  }

  address(messages?: Required & Type & Min & Max) {
    return z
      .string({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(1, messages?.min)
      .max(255, messages?.max);
  }

  houseNumber(messages?: Required & Type & Min & Max) {
    return z
      .number({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(1, messages?.min)
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(6);
      });
  }

  // TODO: AGREGAR MAS VALIDACIONES COMUNES
}

export default new CommonValidators();
