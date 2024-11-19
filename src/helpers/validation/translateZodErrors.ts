import { z, ZodErrorMap, ZodIssueCode } from 'zod';

export default function translateZodErrors(errorMapOverride?: ZodErrorMap) {
  const customErrorMap: ZodErrorMap = (issue, _ctx) => {
    const pathStr = `'${issue.path.join('.')}'`;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        return {
          message: `El campo ${pathStr} debe ser de tipo ${issue.expected}`,
        };
      case ZodIssueCode.invalid_literal:
        return { message: `El campo ${pathStr} debe ser ${issue.expected}` };
      case ZodIssueCode.invalid_union:
        return {
          message: `El campo ${pathStr} debe ser uno de los siguientes: ${issue.unionErrors
            .map((e) => e.message)
            .join(', ')}`,
        };
      case ZodIssueCode.invalid_union_discriminator:
        return {
          message: `El campo ${pathStr} debe ser uno de los siguientes: ${issue.options.join(
            ', ',
          )}`,
        };
      case ZodIssueCode.invalid_enum_value:
        return {
          message: `El campo ${pathStr} debe ser uno de los siguientes: ${issue.options.join(
            ', ',
          )}`,
        };
      case ZodIssueCode.unrecognized_keys:
        return {
          message: `El campo ${pathStr} contiene un campos no reconocidos`,
        };
      case ZodIssueCode.invalid_arguments:
        return {
          message: `El campo ${pathStr} debe ser un ${issue.argumentsError.message}`,
        };
      case ZodIssueCode.invalid_return_type:
        return {
          message: `El campo ${pathStr} debe ser un ${issue.returnTypeError.message}`,
        };
      case ZodIssueCode.invalid_date:
        return { message: `El campo ${pathStr} no es una fecha válida` };
      case ZodIssueCode.invalid_string:
        return {
          message: `El campo ${pathStr} debe ser un texto de tipo ${issue.validation}`,
        };
      case ZodIssueCode.too_small:
        return {
          message: `El campo ${pathStr} debe tener una longitud de ${issue.minimum} caracteres`,
        };
      case ZodIssueCode.too_big:
        return {
          message: `El campo ${pathStr} debe tener una longitud de ${issue.maximum} caracteres`,
        };
      case ZodIssueCode.invalid_intersection_types:
        // Al parecer esto solo aplica en las intersecciones de zod.
        return { message: `El campo ${pathStr} no es válido` };
      case ZodIssueCode.not_multiple_of:
        return {
          message: `El campo ${pathStr} debe ser multiplo de ${issue.multipleOf}`,
        };
      case ZodIssueCode.not_finite:
        return { message: `El campo ${pathStr} no puede ser infinito` };
      default:
        return { message: `El campo ${pathStr} no es válido` };
    }
  };

  z.setErrorMap(errorMapOverride || customErrorMap);
}
