import { z } from 'zod';

export default class NumberLength {
  intPart: string;
  decimalPart: string;

  constructor(value: number, readonly ctx: z.RefinementCtx) {
    const [intPart, decimalPart] = value.toString().split('.');

    if (value < 0) {
      this.addError('No se admiten números negativos');
    }

    this.intPart = intPart;
    this.decimalPart = decimalPart;
  }

  addError(message: string) {
    this.ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message,
      path: this.ctx.path,
    });
  }

  /** No es necesario si el mínimo es menor o igual a 1 */
  int(message?: string) {
    if (!this.intPart.length || this.decimalPart.length) {
      this.addError(message ?? 'El valor debe ser un número entero');
    }

    return this as SecureOmit<
      typeof this,
      'minDecimals' | 'maxDecimals' | 'decimalsLength'
    >;
  }

  min(min: number, message?: string) {
    if (this.intPart.length < min) {
      this.addError(
        message ?? `El valor debe tener al menos ${min} dígitos enteros`,
      );
    }
    return this;
  }

  max(max: number, message?: string) {
    if (this.intPart.length > max) {
      this.addError(
        message ?? `El valor no puede tener más de ${max} dígitos enteros`,
      );
    }
    return this;
  }

  length(len: number, message?: string) {
    if (this.intPart.length != len) {
      this.addError(message ?? `El valor debe tener ${len} dígitos enteros`);
    }
    return this;
  }

  minDecimals(min: number, message?: string) {
    if (this.decimalPart.length < min) {
      this.addError(message ?? `El valor debe tener al menos ${min} decimales`);
    }
    return this;
  }

  maxDecimals(max: number, message?: string) {
    if (this.decimalPart.length > max) {
      this.addError(
        message ?? `El valor no puede tener más de ${max} decimales`,
      );
    }
    return this;
  }

  decimalsLength(length: number, message?: string) {
    if (this.decimalPart.length != length) {
      this.addError(message ?? `El valor debe tener ${length} decimales`);
    }
    return this;
  }
}
