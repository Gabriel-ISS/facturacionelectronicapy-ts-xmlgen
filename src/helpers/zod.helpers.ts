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

export function validateNumberLength(data: {
  value: number;
  min?: number;
  max: number;
  maxDecimals?: number;
  decimalsLength?: number;
  ctx: z.RefinementCtx;
}) {
  const { value, min = 1, max, maxDecimals, decimalsLength, ctx } = data;

  const addError = (message: string) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message,
      path: ctx.path,
    });
  };

  if (value < 0) {
    addError('No se permiten valores negativos');
  }

  const [intPart, decimalPart] = value.toString().split('.');

  if (intPart.length < min) {
    addError(`El valor debe tener al menos ${min} caracteres`);
  }
  if (intPart.length > max) {
    addError(`El valor no puede tener más de ${max} caracteres`);
  }

  if (maxDecimals && decimalPart?.length > maxDecimals) {
    addError(`El valor no puede tener más de ${maxDecimals} decimales`);
  }

  if (decimalsLength && decimalPart && decimalsLength != decimalPart.length) {
    addError(`La longitud de la parte decimal debe ser de ${decimalsLength}`);
  }

  if (!maxDecimals && !decimalsLength && decimalPart) {
    addError(`No se permiten decimales`);
  }
}
