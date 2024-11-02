import { z } from 'zod';
import { FreightResponsible } from '../../constants/freightResponsibles.constants';
import { TradingCondition } from '../../constants/tradingConditions.constants';
import { TransportModality } from '../../constants/transportModalities.constants';
import { TransportType } from '../../constants/transportTypes.constants';
import { enumToZodUnion, enumToZodEnum } from '../../helpers/zod.helpers';
import { EntregaSchema } from './entrega.schema';
import { SalidaSchema } from './salida.schema';
import { VehiculoSchema } from './vehiculo.schema';
import { TransportistaSchema } from './transportista.schema';

export const TransporteSchema = z.object({
  // E901
  tipo: z.union(enumToZodUnion(TransportType)).optional(),

  // E903
  modalidad: z.union(enumToZodUnion(TransportModality)),

  // E905
  tipoResponsable: z.union(enumToZodUnion(FreightResponsible)),

  // E906
  condicionNegociacion: z
    .enum(
      enumToZodEnum<typeof TradingCondition, TradingCondition>(
        TradingCondition,
      ),
    )
    .optional(),

  // E907
  numeroManifiesto: z.string().min(1).max(15).optional(),

  // E908
  // Obligatorio si Motivo de emisión  = 5
  numeroDespachoImportacion: z.string().length(16).optional(),

  // E909
  inicioEstimadoTranslado: z.string().optional(),

  // E910
  finEstimadoTranslado: z.string().optional(),

  // E911
  paisDestino: z.string().optional(),

  // E912
  paisDestinoNombre: z.string().optional(),

  // E901, E903, E905
  salida: SalidaSchema.optional(),

  // E901, E903, E905
  entrega: EntregaSchema.optional(),

  // E901, E903, E905
  vehiculo: VehiculoSchema.optional(),

  // E901, E903, E905
  transportista: TransportistaSchema.optional(),
});

export type Transporte = z.infer<typeof TransporteSchema>;
