import { z } from 'zod';
import { Country } from '../../data/countries.table';
import { Currency } from '../../data/currencies.table';
import { Department } from '../../data/departments.table';
import { TaxpayerNotTaxpayer } from '../../data/taxpayerNotTaxpayer.table';
import dbService from '../../services/db.service';
import { SecureOmit } from '../../types/helpers';
import DateHelper from '../DateHelper';
import NumberLength from './NumberLenght';

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
      path: ctx.path,
    });
  }

  oneNumberOf(
    tableName: keyof SecureOmit<
      typeof dbService,
      'countries' | 'currencies' | 'tradingConditions'
    >,
    message?: string,
  ) {
    return z.number().superRefine((value, ctx) => {
      if (!value) return;
      const foundData = dbService[tableName]._findByIdIfExist(value as any);
      if (foundData) return;

      const path = `'${ctx.path.join('.')}'`;
      this.addFieldError(
        ctx,
        message ?? `El valor del campo ${path} no es válido`,
      );
    });
  }

  // DELETE: de momento no se usa, pero se puede usar para mejorar la eficiencia de algunas validaciones
  /* oneStringOf(tableName: 'countries' | 'currencies' | 'tradingConditions', message?: string) {
    return z.string().superRefine((value, ctx) => {
      if (!value) return;
      const foundData = dbService
        .select(tableName)
        ._findByIdIfExist(value as Country | Currency | TradingCondition);
      if (foundData) return;

      const path = `'${ctx.path.join('.')}'`;
      this.addFieldError(
        ctx,
        message ?? `El valor del campo ${path} no es válido`,
      );
    });
  } */

  location(
    ctx: z.RefinementCtx,
    departmentId: Department | undefined,
    districtId: number | undefined,
    cityId: number | undefined,
  ) {
    const strPath = `'${ctx.path.join('.')}'`;

    let foundDistrict = dbService.districts._findByIdIfExist(districtId);

    if (districtId && !foundDistrict) {
      this.addFieldError(
        ctx,
        `No se encontró el distrito con el Id '${districtId}' en ${strPath}`,
      );
    } else if (
      foundDistrict &&
      departmentId &&
      foundDistrict.department != departmentId
    ) {
      this.addFieldError(
        ctx,
        `El departamento con _id '${departmentId}' no coincide con el distrito con _id '${districtId}' en ${strPath}`,
      );
    }

    if (!cityId) return;
    let foundCity = dbService.cities._findByIdIfExist(cityId);

    if (!foundCity) {
      this.addFieldError(
        ctx,
        `No se encontró la ciudad con el Id '${cityId}' en ${strPath}`,
      );
    } else if (districtId && foundCity.distrito != districtId) {
      this.addFieldError(
        ctx,
        `El distrito con _id '${districtId}' no coincide con la ciudad con _id '${cityId}' en ${strPath}`,
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
    return z.string().superRefine((value, ctx) => {
      const [id, dv] = value.split('-');
      const path = `'${ctx.path.join('.')}'`;

      if (id.length > 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            messages?.max ??
            `El numero de identificación en ${path} debe tener como máximo 8 caracteres`,
        });
      } else if (id.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            messages?.min ??
            `El numero de identificación en ${path} debe tener al menos 3 caracteres`,
        });
      }

      if (!dv) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `El ruc en ${path} debe contener el dígito verificador`,
        });
      } else {
        const dvNumber = Number(dv);
        if (Number.isNaN(dvNumber) || dvNumber < 1 || dvNumber > 9) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El dígito verificador de ${path} debe ser un número entre 1 y 9`,
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

  identityDocDescription() {
    return z.string().min(9).max(41);
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
    return z.number().superRefine((value, ctx) => {
      if (value == undefined) return;
      new NumberLength(value, ctx).int().max(6);
    });
  }

  gtinCode(messages?: Lengths) {
    return z.number().superRefine((value, ctx) => {
      if (value == undefined) return;
      const nStr = value.toString();
      const validLenghts = [8, 12, 13, 14];
      if (validLenghts.includes(nStr.length)) return;

      const path = `'${ctx.path.join('.')}'`;
      this.addFieldError(
        ctx,
        messages?.length ??
          `El valor del campo ${path} debe ser del tipo de código GTIN de 8 o 12 o 13 o 14 caracteres`,
      );
    });
  }

  cdc() {
    return z.string().length(44);
  }

  motive() {
    return z.string().min(5).max(500);
  }

  timbrado() {
    return z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(8);
    });
  }

  serie() {
    return z.string().superRefine((value, ctx) => {
      if (value == undefined) return true;

      // Solo 2 letras mayúsculas
      if (/^[A-Z]{2}$/.test(value)) return;

      const path = `'${ctx.path.join('.')}'`;
      this.addFieldError(
        ctx,
        `El valor del campo ${path} debe ser exactamente 2 letras mayúsculas`,
      );
    });
  }

  clientCode() {
    return z.string().min(3).max(15);
  }
}

export default new CommonValidators();
