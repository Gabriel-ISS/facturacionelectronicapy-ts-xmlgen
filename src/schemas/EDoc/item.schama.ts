import { z } from 'zod';
import { ItemDncpSchema } from './itemDncp.schema';
import { SectorAutomotorSchema } from './sectorAutomotor.schema';

export const ItemSchema = z.object({
  // E701
  codigo: z
    .string()
    .min(1, { message: 'El código es requerido' })
    .describe(
      'Código interno de identificación de la mercadería o servicio de responsabilidad del emisor',
    ),

  // E708
  descripcion: z
    .string()
    .min(1, { message: 'La descripción es requerida' })
    .describe(
      'Descripción del producto y/o servicio. Equivalente a nombre del producto establecido en la RG 24/2019',
    ),

  // E714
  observacion: z
    .string()
    .optional()
    .describe('Información de interés acerca del ítem'),

  // E702
  partidaArancelaria: z.string().optional().describe('Partida arancelaria'),

  // E703
  ncm: z.string().optional().describe('Nomenclatura común del Mercosur (NCM)'),

  // E709
  unidadMedida: z
    .string()
    .min(1, { message: 'La unidad de medida es requerida' })
    .describe('Es la unidad de medida del producto'),

  // E711
  cantidad: z
    .number()
    .min(1, { message: 'La cantidad es requerida' })
    .describe('Cantidad del producto y/o servicio'),

  // E721
  precioUnitario: z
    .number()
    .positive({
      message: 'El precio unitario es requerido y debe ser positivo',
    })
    .describe(
      'Precio unitario del producto y/o servicio (incluidos impuestos)',
    ),

  // E725
  cambio: z.string().optional().describe('Tipo de cambio por ítem'),

  // EA002
  descuento: z
    .number()
    .optional()
    .describe(
      'Descuento particular sobre el precio unitario por ítem (incluidos impuestos)',
    ),

  // EA006
  anticipo: z
    .number()
    .optional()
    .describe(
      'Anticipo particular sobre el precio unitario por ítem (incluidos impuestos)',
    ),

  // E712
  pais: z
    .string()
    .optional()
    .describe('Código del país de origen del producto'),

  // E713
  paisDescripcion: z
    .string()
    .optional()
    .describe('Nombre del país de origen del producto'),

  // E715
  tolerancia: z
    .enum(['1', '2'])
    .optional()
    .describe(
      'Código de tolerancia de merma de los productos. 1=Tolerancia de quiebra, 2= Tolerancia de merma',
    ),

  // E717
  toleranciaCantidad: z
    .number()
    .optional()
    .describe(
      'Cantidad de quiebra o merma. Obligatorio si se envía la tolerancia',
    ),

  // E718
  toleranciaPorcentaje: z
    .number()
    .optional()
    .describe(
      'Porcentaje de quiebra o merma. Obligatorio si se envía la tolerancia',
    ),

  // E719
  cdcAnticipo: z.string().optional().describe('CDC del anticipo'),

  // E731
  ivaTipo: z
    .enum(['1', '2', '3', '4'], {
      required_error: 'El tipo de IVA es requerido',
    })
    .describe(
      'Forma de afectación tributaria del IVA. 1= Gravado IVA, 2= Exonerado, 3= Exento, 4= Gravado parcial',
    ),

  // E735
  ivaBase: z
    .number()
    .positive({
      message: 'La base gravada del IVA es requerida y debe ser positiva',
    })
    .describe('Base gravada del IVA por ítem'),

  // E734
  iva: z
    .enum(['0', '5', '10'], {
      required_error: 'La tasa del IVA es requerida',
    })
    .describe('Tasa del IVA. Posibles valores = 0, 5 o 10'),
  // E751
  lote: z
    .string()
    .max(80, {
      message:
        'El número de lote debe tener una longitud máxima de 80 caracteres',
    })
    .optional()
    .describe('Número de Lote del producto'),

  // E752
  vencimiento: z
    .string()
    .optional()
    .describe('Fecha de vencimiento del producto. Formato AAAA-MM-DD'),

  // E753
  numeroSerie: z
    .string()
    .max(10, {
      message:
        'El número de serie debe tener una longitud máxima de 10 caracteres',
    })
    .optional()
    .describe('Número de serie'),

  // E754
  numeroPedido: z.string().optional().describe('Número de pedido'),

  // E755
  numeroSeguimiento: z
    .string()
    .optional()
    .describe('Número de seguimiento del envío'),

  // E760
  registroEntidadComercial: z
    .string()
    .optional()
    .describe('Número de registro de entidad comercial otorgado por el SENAVE'),

  // E759
  registroSenave: z.string(),

  // E761
  nombreProducto: z
    .string()
    .optional()
    .describe('Obligados por el Art. 1 de la RG N° 106/2021 – Agroquímicos'),

  // E762
  dncp: ItemDncpSchema.optional(),

  sectorAutomotor: SectorAutomotorSchema.optional(),
});
export type Item = z.infer<typeof ItemSchema>;