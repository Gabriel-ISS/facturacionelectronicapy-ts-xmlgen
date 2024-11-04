import { z } from 'zod';
import { TaxpayerNotTaxpayer } from '../../constants/taxpayerNotTaxpayer.constants';

export function enumToZodUnion<T extends Record<string, any>>(
  enumObj: T,
): readonly [
  z.ZodLiteral<T[keyof T]>,
  z.ZodLiteral<T[keyof T]>,
  ...z.ZodLiteral<T[keyof T]>[],
] {
  return Object.values(enumObj).map((value) => z.literal(value)) as any;
}

export function enumToZodEnum<
  T extends Record<string, string>,
  V extends T[string],
>(enumObj: T) {
  return Object.values(enumObj) as any as readonly [V, ...V[]];
}
