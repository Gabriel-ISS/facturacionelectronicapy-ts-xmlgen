import { z } from 'zod';

export const SectorAdicionalSchema = z.object({
  // E821
  ciclo: z.string().optional().describe('Ciclo'),
  
  // E822
  inicioCiclo: z.string().optional().describe('Fecha de inicio de ciclo'),
  
  // E823
  finCiclo: z.string().optional().describe('Fecha de fin de ciclo'),
  
  // E824
  vencimientoPago: z.string().optional().describe('Fecha de vencimiento para el pago'),
  
  // E825
  numeroContrato: z.string().optional().describe('Número de contrato E'),
  
  // E826
  saldoAnterior: z.number().optional().describe('Saldo anterior'),
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