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
import { PaymentType } from '../constants/paymentTypes.constants';
import ZodValidator from '../helpers/ZodValidator';
import { Path } from '../helpers/Path';

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
    fecha: z.coerce.date().transform((value) => {
      return DateHelper.getISODateTimeString(value);
    }),

    // B002
    tipoEmision: z
      .union(enumToZodUnion(EmissionType))
      .default(EmissionType.NORMAL),

    // D011
    tipoTransaccion: z.union(enumToZodUnion(TransactionType)),

    // D013
    tipoImpuesto: z.union(enumToZodUnion(TaxType)),

    // D015
    moneda: z.enum(enumToZodEnum<typeof Currency, Currency>(Currency)),

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
    // listo bro (corregido por mi) :)
  })
  .superRefine((EDoc, ctx) => {
    type ParserEDoc = z.infer<typeof EDocDataSchema>;

    const validator = new ZodValidator(ctx, EDoc);

    if (
      EDoc.tipoDocumento == ValidDocumentType.FACTURA_ELECTRONICA ||
      EDoc.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA
    ) {
      validator.requiredField('tipoTransaccion');
    } else {
      validator.undesiredField('tipoTransaccion');
    }

    if (EDoc.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA) {
      const transportPath = new Path<ParserEDoc>('transporte');

      validator.requiredField('descripcion');
      validator.requiredField('transporte');
      validator.requiredField(transportPath.concat('tipo'));
      validator.requiredField(transportPath.concat('salida'));
      validator.requiredField(transportPath.concat('entrega'));
      validator.requiredField(transportPath.concat('vehiculo'));
      validator.requiredField(transportPath.concat('transportista'));
    }

    if (EDoc.moneda != Currency.GUARANI) {
      validator.requiredField('condicionTipoCambio');
      validator.requiredField('cambio');
    } else {
      validator.undesiredField('condicionTipoCambio');
      validator.undesiredField('cambio');
    }

    if (EDoc.condicionTipoCambio == GlobalAndPerItem.GLOBAL) {
      validator.requiredField('cambio');
    } else if (EDoc.condicionTipoCambio == GlobalAndPerItem.POR_ITEM) {
      validator.undesiredField('cambio');
    }

    // TODO: VALIDAR CDC

    if (EDoc.cliente.tipoOperacion == OperationType.B2G) {
      validator.requiredField('dncp');
    }

    if (EDoc.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA) {
      const clientePath = new Path<ParserEDoc>('cliente');
      validator.requiredField(clientePath.concat('direccion'));
    }

    if (EDoc.tipoTransaccion == TransactionType.ANTICIPO) {
      const itemsPath = new Path<ParserEDoc>('items');
      EDoc.items.forEach((_item, i) => {
        validator.requiredField(itemsPath.concat(i).concat('cdcAnticipo'));
      });
    }

    const associatedDocumentPath = new Path<ParserEDoc>('documentoAsociado');
    if (EDoc.condicion?.entregas?.[0].tipo == PaymentType.RETENCION) {
      validator.requiredField(associatedDocumentPath.concat('numeroRetencion'));
    } else {
      validator.undesiredField(
        associatedDocumentPath.concat('numeroRetencion'),
      );
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
