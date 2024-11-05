import { z } from 'zod';
import NumberLength from '../../helpers/validation/NumberLenght';
import ZodValidator from '../../helpers/validation/ZodValidator';
import CommonValidators from '../../helpers/validation/CommonValidators';

export const SectorAdicionalSchema = z.object({
  // E821
  ciclo: z.string().min(1).max(15).optional(),
  
  // E822
  inicioCiclo: CommonValidators.isoDate().optional(),
  
  // E823
  finCiclo: CommonValidators.isoDate().optional(),
  
  // E824: TODO: TIENE HASTA 3 OCURRENCIAS, COMO SE MANEJA ESO?
  vencimientoPago: CommonValidators.isoDate().optional(),
  
  // E825
  numeroContrato: z.string().min(1).max(30).optional(),
  
  // E826
  saldoAnterior: z.number().optional().superRefine((value, ctx) => {
    if (value == undefined) return;
    new NumberLength(value, ctx).max(15).maxDecimals(4);
  }).describe('Saldo anterior'),
  
}).superRefine((data, ctx) => {
  const validator = new ZodValidator(ctx, data)

  if (data.inicioCiclo && data.finCiclo) {
    const inicio = new Date(data.inicioCiclo);
    const fin = new Date(data.finCiclo);

    validator.validate(
      'inicioCiclo',
      inicio > fin,
      'La fecha de inicio del ciclo no puede ser mayor que la fecha de fin del ciclo.',
    )
  }
});

export type SectorAdicional = z.infer<typeof SectorAdicionalSchema>;