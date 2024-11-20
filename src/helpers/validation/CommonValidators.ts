import { z } from 'zod';
import { Country } from '../../constants/countries.constants';
import { Currency } from '../../constants/curencies.constants';
import { Department } from '../../constants/departments.constants';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';
import DateHelper from '../DateHelper';
import NumberLength from './NumberLenght';
import constantsService from '../../services/constants.service';
import dbService from '../../services/db.service';
import { TradingCondition } from '../../constants/tradingConditions.constants';

// MENSAJES
type Int = { int?: string };
type Min = { min?: string };
type Max = { max?: string };
type Lengths = { length?: string };

class CommonValidators {
  private addFieldError(ctx: z.RefinementCtx, message: string) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message,
    });
  }

  oneNumberOf(tableName: keyof typeof constantsService) {
    return z.number().refine(
      (value) => {
        if (!value) return true;
        const foundData = dbService.select(tableName).findByIdIfExist(value);
        return foundData != null;
      },
      {
        message: `El valor del campo no es válido`,
      },
    );
  }

  oneStringOf(tableName: 'countries' | 'currencies' | 'tradingConditions') {
    return z.string().refine(
      (value) => {
        if (!value) return true;
        const foundData = dbService
          .select(tableName)
          .findByIdIfExist(value as Country | Currency | TradingCondition);
        return foundData != null;
      },
      {
        message: `El valor del campo no es válido`,
      },
    );
  }

  location(
    ctx: z.RefinementCtx,
    departmentId: Department | undefined,
    districtId: number | undefined,
    cityId: number | undefined,
  ) {

    let foundDistrict = dbService
      .select('districts')
      .findByIdIfExist(districtId);

    if (!foundDistrict) {
      this.addFieldError(
        ctx,
        `No se encontró el distrito con el Id "${districtId}"`,
      );
    } else if (departmentId && foundDistrict.department != departmentId) {
      this.addFieldError(
        ctx,
        `El departamento con _id "${departmentId}" no coincide con el distrito con _id "${districtId}"`,
      );
    }

    if (!cityId) return;
    let foundCity = dbService.select('cities').findByIdIfExist(cityId);

    if (!foundCity) {
      this.addFieldError(ctx, `No se encontró la ciudad con el Id "${cityId}"`);
    } else if (districtId && foundCity.distrito != districtId) {
      this.addFieldError(
        ctx,
        `El distrito con _id "${districtId}" no coincide con la ciudad con _id "${cityId}"`,
      );
    }
  }

  zeroPadToLength(maxLength: number, messages?: Int & Max) {
    return z
      .number()
      .min(1)
      .transform((value, ctx) => {
        if (value == undefined) return value;
        new NumberLength(value, ctx)
          .int(messages?.int)
          .max(maxLength, messages?.max);
        return value.toString().padStart(maxLength, '0');
      });
  }

  isoDate() {
    return z.coerce.date().transform((value) => {
      if (!value) return value;
      return DateHelper.getIsoDate(value);
    });
  }

  isoDateTime() {
    return z.coerce.date().transform((value) => {
      if (!value) return value;
      return DateHelper.getIsoDateTime(value);
    });
  }

  taxpayer() {
    return z
      .boolean()
      .transform((v) =>
        v
          ? TaxpayerNotTaxpayer.CONTRIBUYENTE
          : TaxpayerNotTaxpayer.NO_CONTRIBUYENTE,
      );
  }

  ruc(messages?: Min & Max) {
    return z
      .string()
      .min(3)
      .max(8)
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
        }

        if (!dv) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El ruc debe contener el dígito verificador',
          });
        } else {
          const dvNumber = Number(dv);
          if (Number.isNaN(dvNumber) || dvNumber < 1 || dvNumber > 9) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'El dígito verificador debe ser un número entre 1 y 9',
            });
          }
        }
      });
  }

  name() {
    return z.string().min(4).max(60);
  }

  legalName() {
    return z.string().min(4).max(255);
  }

  tradeName() {
    return z.string().min(4).max(255);
  }

  tel() {
    return z.string().min(6).max(15);
  }

  cel() {
    return z.string().min(10).max(20);
  }

  email() {
    return z.string().email().min(3).max(80);
  }

  identityDocNumber() {
    return z.string().min(1).max(20);
  }

  currency() {
    return z.nativeEnum(Currency);
  }

  currencyChange() {
    return z.number().superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).max(5).maxDecimals(4);
    });
  }

  country() {
    return z.nativeEnum(Country);
  }

  department() {
    return z.nativeEnum(Department);
  }

  district() {
    return this.oneNumberOf('districts');
  }

  city() {
    return this.oneNumberOf('cities');
  }

  address() {
    return z.string().min(1).max(255);
  }

  houseNumber() {
    return z
      .number()
      .min(1)
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().max(6);
      });
  }

  gtinCode(messages?: Lengths) {
    return z.number().refine(
      (value) => {
        if (value == undefined) return;
        const nStr = value.toString();
        const validLenghts = [8, 12, 13, 14];
        if (!validLenghts.includes(nStr.length)) {
          return false;
        }
        return true;
      },
      {
        message:
          messages?.length ??
          `El valor debe ser del tipo de código GTIN de 8 o 12 o 13 o 14 caracteres`,
      },
    );
  }

  cdc() {
    return z.string().length(44);
  }

  motive() {
    return z.string().min(5).max(500);
  }

  timbardo() {
    return z.string().length(8);
  }

  serie() {
    return z.string().refine(
      (value) => {
        if (value == undefined) return true;

        // Solo 2 letras mayúsculas
        return /^[A-Z]{2}$/.test(value);
      },
      {
        message: 'El valor debe ser exactamente 2 letras mayúsculas',
      },
    );
  }

  clientCode() {
    return z.string().min(3).max(15);
  }
}

export default new CommonValidators();
