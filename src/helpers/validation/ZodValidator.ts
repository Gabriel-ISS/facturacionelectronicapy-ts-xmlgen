import { z } from 'zod';
import { Path } from '../Path';

/** ZodValidator */
export default class ZodValidator<T extends Record<string, any>> {
  constructor(
    readonly ctx: z.RefinementCtx,
    readonly object: T,
  ) {}

  validate(
    fieldNameOrPath: keyof T | Path<any>,
    errorCondition: boolean,
    message: string,
  ) {
    if (errorCondition) {
      this.ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
        path: this.ctx.path.concat(fieldNameOrPath.toString()),
      });
    }
  }

  undesiredField(fieldNameOrPath: keyof T | Path<any>, customMessage?: string) {
    const value = fieldNameOrPath instanceof Path
      ? fieldNameOrPath.getValueFromPath(this.object)
      : this.object[fieldNameOrPath];

    this.validate(
      fieldNameOrPath,
      value != undefined,
      customMessage ?? `El campo ${fieldNameOrPath as string} no es requerido`,
    );
  }

  requiredField(fieldNameOrPath: keyof T | Path<any>, customMessage?: string) {
    const value = fieldNameOrPath instanceof Path
      ? fieldNameOrPath.getValueFromPath(this.object)
      : this.object[fieldNameOrPath];

    this.validate(
      fieldNameOrPath,
      value != undefined,
      customMessage ?? `El campo ${fieldNameOrPath as string} no es requerido`,
    );
  }
}
