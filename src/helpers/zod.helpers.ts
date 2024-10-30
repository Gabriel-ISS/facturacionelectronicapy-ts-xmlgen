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

// TODO: PREGUNTAR A LA GENTE DE E-KUATIA QUE RAYOS SIGNIFICA X-Y EN EL CONTEXTO (x-y)p(n-m)
// Y ES EL MÁXIMO TOTAL O EL MÁXIMO DE LA PARTE ENTERA???
export function validateNumberLength(data: {
  value: number;
  min: number;
  max: number;
  maxDecimals?: number;
  ctx: z.RefinementCtx;
  fieldName: string;
}) {
  const { value, min, max, maxDecimals, ctx, fieldName } = data;

  if (value < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `No se permiten valores negativos`,
      path: [fieldName],
    });
  }

  const [intPart, decimalPart] = value.toString().split('.');

  const totalLength = intPart.length + (decimalPart ? decimalPart.length : 0);

  if (totalLength < min) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `El valor debe tener al menos ${min} caracteres`,
      path: [fieldName],
    });
  }
  if (totalLength > max) {
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
