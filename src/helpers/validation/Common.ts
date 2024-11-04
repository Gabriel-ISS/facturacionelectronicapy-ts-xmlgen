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

export function enumToZodEnum<
  T extends Record<string, string>,
  V extends T[string],
>(enumObj: T) {
  return Object.values(enumObj) as any as readonly [V, ...V[]];
}

type Min = {min?: string}
type Max = {max?: string}

export function name(messages?: Min & Max) {
  return z.string().min(4, messages?.min).max(60, messages?.max);
}

export function address(messages?: Min & Max) {
  return z.string().min(1, messages?.min).max(255, messages?.max);
}

// TODO: AGREGAR MAS VALIDACIONES COMUNES
