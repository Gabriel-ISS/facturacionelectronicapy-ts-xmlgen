import { z } from 'zod';
import { Currency } from '../constants/curencies.constants';
import { ValidDocumentType } from '../constants/documentTypes.constants';
import { EmissionType } from '../constants/emissionTypes.constants';
import { GlobalAndPerItem } from '../constants/globalAndPerItem.constants';
import { OperationType } from '../constants/operationTypes.constants';
import { PaymentType } from '../constants/paymentTypes.constants';
import { RemissionReason } from '../constants/remissionReasons.constants';
import { TaxType } from '../constants/taxTypes.constants';
import { TransactionType } from '../constants/transactionTypes.constants';
import DateHelper from '../helpers/DateHelper';
import { Path } from '../helpers/Path';
import CommonValidators from '../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../helpers/validation/enumConverter';
import NumberLength from '../helpers/validation/NumberLenght';
import ZodValidator from '../helpers/validation/ZodValidator';
import { AutoFacturaSchema } from './EDoc/autoFactura.schema';
import { ClienteSchema } from './EDoc/cliente.schema';
import { ComplementariosSchema } from './EDoc/complementarios.schema';
import { CondicionSchema } from './EDoc/condicion.schema';
import { DncpSchema } from './EDoc/dncp.schema';
import { DocumentoAsociadoSchema } from './EDoc/documentoAsociado.schema';
import { FacturaSchema } from './EDoc/factura.schema';
import { ItemSchema } from './EDoc/item.schama';
import { NotaCreditoDebitoSchema } from './EDoc/notaCheditoDebitoSchema';
import { RemisionSchema } from './EDoc/remision.schema';
import { SectorAdicionalSchema } from './EDoc/sectorAdicional.schema';
import { SectorEnergiaElectricaSchema } from './EDoc/sectorEnergiaElectrica.schema';
import { SectorSegurosSchema } from './EDoc/sectorSeguros.schema';
import { SectorSupermercadosSchema } from './EDoc/sectorSupermercados.schema';
import { TransporteSchema } from './EDoc/transporte.schema';
import { UsuarioSchema } from './EDoc/usuario.schema';

// TODO: COMMON SCHEMAS
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
    // TODO DAVITD: APLICAR ZodValidator
    // C002
    tipoDocumento: z.union(enumToZodUnion(ValidDocumentType)),

    // C005: Debe coincidir con la estructura de timbrado
    establecimiento: z
      .number()
      .min(1)
      .transform((value, ctx) => {
        new NumberLength(value, ctx).int().max(3);
        return value.toString().padStart(3, '0');
      }),

    // C006: Debe coincidir con la estructura de timbrado
    punto: z
      .number()
      .min(1)
      .transform((value, ctx) => {
        new NumberLength(value, ctx).int().max(3);
        return value.toString().padStart(3, '0');
      }),

    // C007: Debe coincidir con la estructura de timbrado
    numero: z
      .number()
      .min(1)
      .transform((value, ctx) => {
        new NumberLength(value, ctx).int().max(7);
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
      return DateHelper.getIsoDateTimeString(value);
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
    moneda: CommonValidators.currency(),

    // D017
    condicionTipoCambio: z.union(enumToZodUnion(GlobalAndPerItem)).optional(),

    // D018
    cambio: CommonValidators.currencyChange().optional(),

    // D019
    condicionAnticipo: z.union(enumToZodUnion(GlobalAndPerItem)).optional(),


    // D030 - NT18 ?
    // ⚠️ TODO: EL CÓDIGO NO ESTA EN EL MANUAL TÉCNICO NI EN NINGÚN LADO
    /* obligaciones: z.array(ObligacionSchema).optional(), */


    // Relacionado a EA004
    descuentoGlobal: z
      .number()
      .default(0)
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      }),

    // Relacionado a EA007
    anticipoGlobal: z
      .number()
      .default(0)
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      }),

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

    // Campos complementarios comerciales de uso específico
    sectorEnergiaElectrica: SectorEnergiaElectricaSchema.optional(),
    sectorSeguros: SectorSegurosSchema.optional(),
    sectorSupermercados: SectorSupermercadosSchema.optional(),
    sectorAdicional: SectorAdicionalSchema.optional(),
  })
  .superRefine((data, ctx) => {
    type Data = typeof data;
    const validator = new ZodValidator(ctx, data);
    const transportPath = new Path<Data>('transporte');
    const associatedDocumentPath = new Path<Data>('documentoAsociado');
    const clientePath = new Path<Data>('cliente');

    // POR EL TIPO DE DOCUMENTO (C002)
    if (
      data.tipoDocumento == ValidDocumentType.FACTURA_ELECTRONICA ||
      data.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA
    ) {
      validator.requiredField('tipoTransaccion');
    } else if (
      data.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA
    ) {
      validator.requiredField('descripcion');
      validator.requiredField('transporte');
      validator.requiredField(transportPath.concat('tipo'));
      validator.requiredField(transportPath.concat('inicioEstimadoTranslado'));
      validator.requiredField(transportPath.concat('salida'));
      validator.requiredField(transportPath.concat('entrega'));
      validator.requiredField(transportPath.concat('vehiculo'));
      validator.requiredField(transportPath.concat('transportista'));
      validator.requiredField(clientePath.concat('direccion'));
    } else {
      validator.undesiredField('tipoTransaccion');
    }

    // POR EL TIPO DE MONEDA (D015)
    if (data.moneda != Currency.GUARANI) {
      validator.requiredField('condicionTipoCambio');
      validator.requiredField('cambio');
    } else {
      validator.undesiredField('condicionTipoCambio');
      validator.undesiredField('cambio');
    }

    // POR EL TIPO DE CAMBIO (D017)
    if (data.condicionTipoCambio == GlobalAndPerItem.GLOBAL) {
      validator.requiredField('cambio');
    } else if (data.condicionTipoCambio == GlobalAndPerItem.POR_ITEM) {
      validator.undesiredField('cambio');
    }

    // TODO: VALIDAR CDC

    // POR EL TIPO DE OPERACIÓN (D202)
    if (data.cliente.tipoOperacion == OperationType.B2G) {
      validator.requiredField('dncp');
    }

    // POR EL TIPO DE TRANSACCIÓN (D011)
    if (data.tipoTransaccion == TransactionType.ANTICIPO) {
      const itemsPath = new Path<Data>('items');
      data.items.forEach((_item, i) => {
        validator.requiredField(itemsPath.concat(i).concat('cdcAnticipo'));
      });
    } else if (
      data.tipoTransaccion == TransactionType.VENTA_DE_CREDITO_FISCAL
    ) {
      validator.requiredField(
        associatedDocumentPath.concat('resolucionCreditoFiscal'),
      );
    } else {
      validator.undesiredField(
        associatedDocumentPath.concat('resolucionCreditoFiscal'),
      );
    }

    // POR EL TIPO DE PAGO DE ENTREGA (E606)
    if (
      data.condicion?.entregas?.some((d) => d.tipo == PaymentType.RETENCION)
    ) {
      validator.requiredField(associatedDocumentPath.concat('numeroRetencion'));
    } else {
      validator.undesiredField(
        associatedDocumentPath.concat('numeroRetencion'),
      );
    }

    // POR EL MOTIVO DE REMISION (E501)
    if (data.remision?.motivo == RemissionReason.IMPORTACION) {
      validator.requiredField(
        transportPath.concat('numeroDespachoImportacion'),
      );
    }

    // Y POR LA GLORIA!!! (TODO: ELIMINAR ESTO)
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
