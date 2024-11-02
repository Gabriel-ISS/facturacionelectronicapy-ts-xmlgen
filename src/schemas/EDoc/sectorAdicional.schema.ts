import { z } from 'zod';
import { validateNumberLength } from '../../helpers/zod.helpers';

export const SectorAdicionalSchema = z.object({
  // E821
  ciclo: z.string().min(1).max(15).optional().describe('Ciclo'),
  
  // E822
  inicioCiclo: z.string().length(10).optional().describe('Fecha de inicio de ciclo'),
  
  // E823
  finCiclo: z.string().length(10).optional().describe('Fecha de fin de ciclo'),
  
  // E824
  vencimientoPago: z.string().length(10).optional().describe('Fecha de vencimiento para el pago'),
  
  // E825
  numeroContrato: z.string().min(1).max(30).optional().describe('Número de contrato E'),
  
  // E826
  saldoAnterior: z.number().optional().superRefine((data, ctx) => {
    if (data == undefined) return;
    validateNumberLength({
      value: data,
      fieldName: 'saldoAnterior',
      maxDecimals: 4,
      max: 15,
      ctx,
    })
  }).describe('Saldo anterior'),
}).superRefine((data, ctx) => {
  if (data.inicioCiclo && data.finCiclo) {
    const inicio = new Date(data.inicioCiclo);
    const fin = new Date(data.finCiclo);
    if (inicio > fin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La fecha de inicio del ciclo no puede ser mayor que la fecha de fin del ciclo.',
        path: ['inicioCiclo'],
      });
    }
  }
});

export type SectorAdicional = z.infer<typeof SectorAdicionalSchema>;