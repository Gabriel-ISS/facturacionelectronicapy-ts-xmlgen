import { z } from 'zod';
import { Currency } from '../constants/curencies.constants';
import { ValidDocumentType } from '../constants/documentTypes.constants';
import { EmissionType } from '../constants/emissionTypes.constants';
import { GlobalAndPerItem } from '../constants/globalAndPerItem.constants';
import { OperationType } from '../constants/operationTypes.constants';
import { TaxType } from '../constants/taxTypes.constants';
import { TransactionType } from '../constants/transactionTypes.constants';
import DateHelper from '../helpers/DateHelper';
import { enumToZodEnum, enumToZodUnion } from '../helpers/zod.helpers';
import { AutoFacturaSchema } from './EDoc/autoFactura.schema';
import { ClienteSchema } from './EDoc/cliente.schema';
import { ComplementariosSchema } from './EDoc/complementarios.schema';
import { CondicionSchema } from './EDoc/condicion.schema';
import { DncpSchema } from './EDoc/dncp.schema';
import { DocumentoAsociadoSchema } from './EDoc/documentoAsociado.schema';
import { FacturaSchema } from './EDoc/factura.schema';
import { ItemSchema } from './EDoc/item.schama';
import { NotaCreditoDebitoSchema } from './EDoc/notaCheditoDebitoSchema';
import { ObligacionSchema } from './EDoc/obligacion.schema';
import { RemisionSchema } from './EDoc/remision.schema';
import { SectorAdicionalSchema } from './EDoc/sectorAdicional.schema';
import { SectorEnergiaElectricaSchema } from './EDoc/sectorEnergiaElectrica.schema';
import { SectorSegurosSchema } from './EDoc/sectorSeguros.schema';
import { SectorSupermercadosSchema } from './EDoc/sectorSupermercados.schema';
import { TransporteSchema } from './EDoc/transporte.schema';
import { UsuarioSchema } from './EDoc/usuario.schema';

// TODO: BUSCAR COGIGOS INVENTADOS POR LA IA
// TODO: VALIDAR LONGITUD DE STRINGS
// TODO: NÚMEROS Y DECIMALES (Tabla C del manual)
// TODO: VALIDAR FECHAS DE INICIO Y FIN
// TODO: VALIDAR CORREOS Y NÚMEROS DE TELÉFONOS

/**
 * TODO: ASEGURARSE DE QUE TODOS LOS TRANSFORMS RETORNEN UN VALOR
 * - agregar valores perdidos
 * - algunas descripciones no permiten el valor "otro", que se agreguen
 * solo en el transform
 */

// TODO: VALIDAR DATOS RELACIONADOS A TIMBRADO

// TODO: CREAR OBJETO CON TODOS LOS MENSAJES POR DEFECTO
// TODO: CREAR FUNCION PARA SOBREESCRIBIR TODOS LOS MENSAJES

/** Estructura de los datos de un Documento Electrónico.
 *
 * Referencias:
 * @link https://docs.facturasend.com.py/#parametros-de-creacion-de-un-de
 * @link https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907
 */
export const EDocDataSchema = z
  .object({
    // C002
    tipoDocumento: z.union(enumToZodUnion(ValidDocumentType)),

    // C005: Debe coincidir con la estructura de timbrado
    establecimiento: z
      .number()
      .min(1)
      .max(999)
      .transform((value) => {
        return value.toString().padStart(3, '0');
      }),

    // C006: Debe coincidir con la estructura de timbrado
    punto: z
      .number()
      .min(1)
      .max(999)
      .transform((value) => {
        return value.toString().padStart(3, '0');
      }),

    // C007: Debe coincidir con la estructura de timbrado
    numero: z
      .number()
      .min(1)
      .max(
        9999999,
        'No se permiten numeros mayores a 9999999, utilice el campo "serie"',
      )
      .transform((value) => {
        return value.toString().padStart(7, '0');
      }),

    // C010: obligatorio cuando se consumió la numeración permitida
    serie: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (value == undefined) return true;

          // Solo 2 letras mayúsculas
          return /^[A-Z]{2}$/.test(value);
        },
        {
          message: 'El valor debe ser exactamente 2 letras mayúsculas',
        },
      ),

    // B006
    descripcion: z.string().min(1).max(3000).optional(),

    // B005
    observacion: z.string().min(1).max(3000).optional(),

    // D002
    fecha: z.coerce.date().transform(value => {
      return DateHelper.getISODateTimeString(value);
    }),


    // B002
    tipoEmision: z
      .union(enumToZodUnion(EmissionType))
      .default(EmissionType.NORMAL),

    // D011
    tipoTransaccion: z
      .union(enumToZodUnion(TransactionType)),

    // D013
    tipoImpuesto: z.union(enumToZodUnion(TaxType)),

    // D015
    moneda: z.enum(enumToZodEnum(Currency)),

    // D019
    condicionAnticipo: z.union(enumToZodUnion(GlobalAndPerItem)).optional(),

    // D017
    condicionTipoCambio: z.union(enumToZodUnion(GlobalAndPerItem)).optional(),

    // D030 - NT18 ?
    // ⚠️ TODO: EL CÓDIGO NO ESTA EN EL MANUAL TÉCNICO NI EN NINGÚN LADO
    /* obligaciones: z.array(ObligacionSchema).optional(), */

    // D018
    cambio: z.number().optional(),

    // Relacionado a EA004
    descuentoGlobal: z.number().default(0),

    // Relacionado a EA007
    anticipoGlobal: z.number().default(0),

    // TODO: PARECE DE FS, sin código asociado
    /* cdc: z.string().length(44).optional(), */

    cliente: ClienteSchema,
    usuario: UsuarioSchema.optional(),
    factura: FacturaSchema.optional(),
    autoFactura: AutoFacturaSchema.optional(),
    notaCreditoDebito: NotaCreditoDebitoSchema.optional(),
    remision: RemisionSchema.optional(),
    condicion: CondicionSchema.optional(),
    items: z.array(ItemSchema),
    complementarios: ComplementariosSchema.optional(),
    documentoAsociado: DocumentoAsociadoSchema.optional(),
    transporte: TransporteSchema.optional(),
    dncp: DncpSchema.optional(),
    
    // Oscar, esto lo dejo en tus manos
    // Campos complementarios comerciales de uso específico
    sectorEnergiaElectrica: SectorEnergiaElectricaSchema.optional(),
    sectorSeguros: SectorSegurosSchema.optional(),
    sectorSupermercados: SectorSupermercadosSchema.optional(),
    sectorAdicional: SectorAdicionalSchema.optional(),
  })
  .superRefine((EDoc, ctx) => {
    if (EDoc.tipoDocumento == ValidDocumentType.FACTURA_ELECTRONICA || EDoc.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA) {
      if (!EDoc.tipoTransaccion) {
        ctx.addIssue({
          path: ['tipoTransaccion'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar el tipo de transacción',
        });
      }
    } else {
      if (EDoc.tipoTransaccion) {
        ctx.addIssue({
          path: ['tipoTransaccion'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el tipo de transacción',
        });
      }
    }
    
    if (EDoc.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA) {
      if (!EDoc.descripcion) {
        ctx.addIssue({
          path: ['descripcion'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar la descripción de la nota de remisión',
        });
      }

      if (!EDoc.transporte?.tipo) {
        ctx.addIssue({
          path: ['transporte', 'tipo'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar el tipo de transporte',
        });
      }
      if (!EDoc.transporte?.salida) {
        ctx.addIssue({
          path: ['salida'],
          message: 'El campo salida es requerido si tipoDocumento = 7.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!EDoc.transporte?.entrega) {
        ctx.addIssue({
          path: ['entrega'],
          message: 'El campo entrega es requerido si tipoDocumento = 7.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!EDoc.transporte?.vehiculo) {
        ctx.addIssue({
          path: ['vehiculo'],
          message: 'El campo vehiculo es requerido si tipoDocumento = 7.',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!EDoc.transporte?.transportista) {
        ctx.addIssue({
          path: ['transportista'],
          message: 'El campo transportista es requerido si tipoDocumento = 7.',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (EDoc.moneda != Currency.GUARANI) {
      if (!EDoc.condicionTipoCambio) {
        ctx.addIssue({
          path: ['condicionTipoCambio'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar el Tipo de Cambio',
        });
      }

      if (!EDoc.cambio) {
        ctx.addIssue({
          path: ['cambio'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar el Cambio',
        });
      }

    } else {
      if (EDoc.condicionTipoCambio) {
        ctx.addIssue({
          path: ['condicionTipoCambio'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el Tipo de Cambio si la moneda es GUARANI',
        });
      }

      if (EDoc.cambio != undefined) {
        ctx.addIssue({
          path: ['cambio'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el Cambio si la moneda es GUARANI',
        });
      }
    }

    if (EDoc.condicionTipoCambio == GlobalAndPerItem.GLOBAL) {
      if (!EDoc.cambio) {
        ctx.addIssue({
          path: ['cambio'],
          code: z.ZodIssueCode.custom,
          message: 'Debe informar el Cambio si la condición de tipo de cambio es GLOBAL',
        });
      }
    } else if (EDoc.condicionTipoCambio == GlobalAndPerItem.POR_ITEM) {
      if (EDoc.cambio) {
        ctx.addIssue({
          path: ['cambio'],
          code: z.ZodIssueCode.custom,
          message: 'No debe informar el Cambio si la condición de tipo de cambio es POR_ITEM',
        });
      }
    }

    // TODO: VALIDAR CDC

    if (EDoc.cliente.tipoOperacion == OperationType.B2G && !EDoc.dncp) {
      ctx.addIssue({
        path: ['dncp'],
        code: z.ZodIssueCode.custom,
        message: 'Debe informar el DNCP si el tipo de operación es B2G',
      });
    }

    if (
      EDoc.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA &&
      !EDoc.cliente.direccion
    ) {
      ctx.addIssue({
        path: ['cliente', 'direccion'],
        code: z.ZodIssueCode.custom,
        message: 'Debe informar la Dirección del Cliente',
      });
    }
  });

/** Estructura de los datos de un Documento Electrónico.
 *
 * Referencias:
 * @link https://docs.facturasend.com.py/#parametros-de-creacion-de-un-de
 * @link https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907
 */
export type EDocumentDataInput = z.input<typeof EDocDataSchema>;

/** Estructura de los datos de un Documento Electrónico.
 *
 * Referencias:
 * @link https://docs.facturasend.com.py/#parametros-de-creacion-de-un-de
 * @link https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907
 */
export type EDocumentData = z.infer<typeof EDocDataSchema>;
