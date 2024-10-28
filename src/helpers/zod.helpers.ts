import { z } from 'zod';

export function enumToZodUnion<T extends Record<string, any>>(
  enumObj: T,
): readonly [
  z.ZodLiteral<T[keyof T]>,
  z.ZodLiteral<T[keyof T]>,
  ...z.ZodLiteral<T[keyof T]>[],
] {
  return Object.values(enumObj).map((value) => z.literal(value)) as any;
}

export function enumToZodEnum<T extends Record<string, string>>(enumObj: T) {
  return Object.values(enumObj) as any as readonly [string, ...string[]];
}
