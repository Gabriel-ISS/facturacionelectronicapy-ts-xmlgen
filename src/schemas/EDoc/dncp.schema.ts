import { z } from 'zod';
import DateHelper from '../../helpers/DateHelper';
import CommonValidators from '../../helpers/validation/CommonValidators';
import NumberLength from '../../helpers/validation/NumberLenght';

export const DncpSchema = z.object({
   // E021
   modalidad: z.string().length(2),

   // E022
   entidad: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(5);
   }),
 
   // E023
   año: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(2);
   }),
 
   // E024
   secuencia: z.number().superRefine((value, ctx) => {
      new NumberLength(value, ctx).int().length(7);
   }),
 
   // E025
   fecha: CommonValidators.isoDate(),
});

export type Dncp = z.infer<typeof DncpSchema>;