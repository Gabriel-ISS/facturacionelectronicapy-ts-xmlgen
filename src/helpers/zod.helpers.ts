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

export function enumToZodEnum<T extends Record<string, string>, V extends T[string]>(enumObj: T) {
  return Object.values(enumObj) as any as readonly [V, ...V[]];
}

export function validateNumberLength(data: {
  value: number;
  min?: number;
  max: number;
  maxDecimals?: number;
  ctx: z.RefinementCtx;
  fieldName: string;
}) {
  const { value, min = 1, max, maxDecimals, ctx, fieldName } = data;

  if (value < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `No se permiten valores negativos`,
      path: [fieldName],
    });
  }

  const [intPart, decimalPart] = value.toString().split('.');

  if (intPart.length < min) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `El valor debe tener al menos ${min} caracteres`,
      path: [fieldName],
    });
  }
  if (intPart.length > max) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `El valor no puede tener más de ${max} caracteres`,
      path: [fieldName],
    });
  }

  if (maxDecimals) {
    if (decimalPart.length > maxDecimals) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `No se pueden tener más de ${maxDecimals} decimales`,
        path: [fieldName],
      });
    }
  }
}
