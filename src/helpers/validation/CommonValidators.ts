import { z } from 'zod';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import NumberLength from './NumberLenght';
import { Country } from '../../constants/countries.constants';
import { enumToZodEnum, enumToZodUnion } from './enumConverter';
import { Department } from '../../constants/departments.constants';
import { Currency } from '../../constants/curencies.constants';
import DateHelper from '../DateHelper';

// MENSAJES
type Required = { required?: string };
type Type = { invalid_type?: string };
type Int = { int?: string };
type Min = { min?: string };
type Max = { max?: string };
type Lengths = { length?: string };

class CommonValidators {
  zeroPadToLength(maxLength: number, messages?: Required & Type & Int & Max) {
    return z
      .number({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .min(1)
      .transform((value, ctx) => {
        if (value == undefined) return value;
        new NumberLength(value, ctx)
          .int(messages?.int)
          .max(maxLength, messages?.max);
        return value.toString().padStart(maxLength, '0');
      });
  }

  isoDate(messages?: Required & Type) {
    return z.coerce
      .date({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDate(value);
      });
  }

  isoDateTime(messages?: Required & Type) {
    return z.coerce
      .date({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .transform((value) => {
        if (!value) return value;
        return DateHelper.getIsoDateTime(value);
      });
  }

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
      .max(8, messages?.max)
      .superRefine((value, ctx) => {
        const [id, dv] = value.split('-');

        if (id.length > 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages?.max,
          });
        } else if (id.length < 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages?.min,
          });
        } else if (Number.isNaN(Number(id))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El numero de identificación del RUC debe ser un número',
          });
        }

        if (!dv) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El ruc debe contener el dígito verificador',
          })
        } else {
          const dvNumber = Number(dv);
          if (Number.isNaN(dvNumber) || dvNumber < 1 || dvNumber > 9) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'El dígito verificador debe ser un número entre 1 y 9',
            })
          }
        }
      });
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
      })
      .superRefine((value, ctx) => {
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

  gtinCode(messages?: Required & Type & Lengths) {
    return z
      .number({
        required_error: messages?.required,
        invalid_type_error: messages?.invalid_type,
      })
      .refine(value => {
        if (value == undefined) return;
        const nStr = value.toString();
        const validLenghts = [8, 12, 13, 14];
        if (!validLenghts.includes(nStr.length)) {
          return false;
        }
        return true;
      }, {
        message: 
        messages?.length ??
        `El valor debe ser del tipo de código GTIN de 8 o 12 o 13 o 14 caracteres`,,
      });
  }
}

export default new CommonValidators();
