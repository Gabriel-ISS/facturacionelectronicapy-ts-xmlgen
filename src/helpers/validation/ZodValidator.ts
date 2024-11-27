import { z } from 'zod';
import { Path } from '../Path';

/** ZodValidator */
export default class ZodValidator<T extends Record<string, any>> {
  constructor(readonly ctx: z.RefinementCtx, readonly object: T) {}

  private getPathString(fieldNameOrPath: keyof T | Path<any>) {
    const startPath = this.ctx.path.length ? this.ctx.path.join('.') + '.' : '';
    const pathStr = fieldNameOrPath.toString();
    return startPath + pathStr;
  }

  private getPath(fieldNameOrPath: keyof T | Path<any>) {
    let pathStr: (string | number)[];
    if (fieldNameOrPath instanceof String) {
      pathStr = fieldNameOrPath.split('.');
    } else if (fieldNameOrPath instanceof Path) {
      pathStr = fieldNameOrPath.path;
    } else {
      pathStr = [fieldNameOrPath.toString()];
    }

    return this.ctx.path.concat(pathStr);
  }

  private completeMessage(
    message: string,
    fieldNameOrPath: keyof T | Path<any>,
  ) {
    return message.replace('$path', `'${this.getPathString(fieldNameOrPath)}'`);
  }

  validate(
    fieldNameOrPath: keyof T | Path<any>,
    errorCondition: boolean,
    message: string,
  ) {
    if (errorCondition) {
      this.ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: this.completeMessage(message, fieldNameOrPath),
        path: this.getPath(fieldNameOrPath),
      });
    }
  }

  undesiredField(fieldNameOrPath: keyof T | Path<any>, customMessage?: string) {
    const value =
      fieldNameOrPath instanceof Path
        ? fieldNameOrPath.getValueFromPath(this.object)
        : this.object[fieldNameOrPath];

    this.validate(
      fieldNameOrPath,
      value != undefined,
      customMessage ??
        `El campo $path no es requerido`,
    );
  }

  requiredField(fieldNameOrPath: keyof T | Path<any>, customMessage?: string) {
    const value =
      fieldNameOrPath instanceof Path
        ? fieldNameOrPath.getValueFromPath(this.object)
        : this.object[fieldNameOrPath];
    

    this.validate(
      fieldNameOrPath,
      value == undefined,
      customMessage ??
        `El campo $path es requerido`,
    );
  }
}
