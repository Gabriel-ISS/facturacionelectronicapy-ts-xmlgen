import { z } from 'zod';
import DateHelper from '../../helpers/DateHelper';

export const DncpSchema = z.object({
   // E021
   modalidad: z.string().length(2),

   // E022
   entidad: z.number().refine(value => {
      return value.toString().length == 5;
   }, {
      message: 'El valor debe tener 5 dígitos',
   }),
 
   // E023
   año: z.number().refine(value => {
      return value.toString().length == 2;
   }, {
      message: 'El valor debe tener 5 dígitos',
   }),
 
   // E024
   secuencia: z.number().refine(value => {
      return value.toString().length == 7;
   }, {
      message: 'El valor debe tener 5 dígitos',
   }),
 
   // E025
   fecha: z.coerce.date().transform((value) => {
      return DateHelper.getIsoDateString(value);
   }),
});

export type Dncp = z.infer<typeof DncpSchema>;