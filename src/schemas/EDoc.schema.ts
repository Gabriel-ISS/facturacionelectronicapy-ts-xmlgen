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
import { Path } from '../helpers/Path';
import CommonValidators from '../helpers/validation/CommonValidators';
import { enumToZodUnion } from '../helpers/validation/enumConverter';
import NumberLength from '../helpers/validation/NumberLenght';
import ZodValidator from '../helpers/validation/ZodValidator';
import dbService from '../services/db.service';
import { AutoFacturaSchema } from './EDoc/autoFactura.schema';
import { ClienteSchema } from './EDoc/cliente.schema';
import { ComplementariosSchema } from './EDoc/complementarios.schema';
import { CondicionSchema } from './EDoc/condicion.schema';
import { DncpSchema } from './EDoc/dncp.schema';
import { DocumentoAsociadoSchema } from './EDoc/documentoAsociado.schema';
import { FacturaSchema } from './EDoc/factura.schema';
import { ItemSchema } from './EDoc/item.schema';
import { NotaCreditoDebitoSchema } from './EDoc/notaCheditoDebito.schema';
import { RemisionSchema } from './EDoc/remision.schema';
import { SectorAdicionalSchema } from './EDoc/sectorAdicional.schema';
import { SectorEnergiaElectricaSchema } from './EDoc/sectorEnergiaElectrica.schema';
import { SectorSegurosSchema } from './EDoc/sectorSeguros.schema';
import { SectorSupermercadosSchema } from './EDoc/sectorSupermercados.schema';
import { TransporteSchema } from './EDoc/transporte.schema';
import { UsuarioSchema } from './EDoc/usuario.schema';

// TODO: VERIFICAR LOS VALORES QUE DEPENDEN DE VALORES "GLOBALES"
// TODO: VALIDAR FECHAS DE INICIO Y FIN
// TODO: VALIDAR NÚMEROS DE TELÉFONOS

// TODO: VALIDAR DATOS RELACIONADOS A TIMBRADO

// TODO: CREAR OBJETO CON TODOS LOS MENSAJES POR DEFECTO
// TODO: CREAR FUNCION PARA SOBREESCRIBIR TODOS LOS MENSAJES

/** El esquema no incluye:
 * AA. Campos que identifican el formato electrónico XML (AA001-AA009)
 * A. Campos firmados del Documento Electrónico (A001-A099)
 * D2. Campos que identifican al emisor del Documento Electrónico DE (D100-D129)
 * D2.1 Campos que describen la actividad económica del emisor (D130-D139)
 * E7.2. Campos que describen la operación a crédito (E640-E649)
 * E7.2.1.Campos que describen las cuotas (E650-E659)
 * F. Campos que describen los subtotales y totales de la transacción documentada (F001-F099)
 * J. Campos fuera de la Firma Digital (J001-J049)
 */

/** Estructura de los datos de un Documento Electrónico.
 *
 * Referencias:
 * @link https://docs.facturasend.com.py/#parametros-de-creacion-de-un-de
 * @link https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907
 */
export const EDocDataSchema = z
  .object({
    // B. Campos inherentes a la operación de Documentos Electrónicos (B001-B099)

    // B002
    tipoEmision: z
      .union(enumToZodUnion(EmissionType))
      .default(EmissionType.NORMAL),

    // B005
    observacion: z.string().min(1).max(3000).optional(),

    // B006
    descripcion: z.string().min(1).max(3000).optional(),

    // C. Campos de datos del Timbrado (C001-C099)

    // C002
    tipoDocumento: z.union(enumToZodUnion(ValidDocumentType)),

    // C005: Debe coincidir con la estructura de timbrado
    establecimiento: CommonValidators.zeroPadToLength(3),

    // C006: Debe coincidir con la estructura de timbrado
    punto: CommonValidators.zeroPadToLength(3),

    // C007: Debe coincidir con la estructura de timbrado
    numero: CommonValidators.zeroPadToLength(7),

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

    // D. Campos Generales del Documento Electrónico DE (D001-D299)

    // D002
    fecha: CommonValidators.isoDateTime(),

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

    // Relacionado a EA004 (TODO: IVESTIGAR)
    descuentoGlobal: z
      .number()
      .default(0)
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      }),

    // Relacionado a EA007 (TODO: IVESTIGAR)
    anticipoGlobal: z
      .number()
      .default(0)
      .superRefine((value, ctx) => {
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      }),

    // TODO: PARECE DE FS, sin código asociado
    /* cdc: z.string().length(44).optional(), */

    // D2.2 Campos que identifican al responsable de la generación del DE (D140-D160)
    usuario: UsuarioSchema.optional(),

    // Campos que identifican al receptor del Documento Electrónico DE (D200-D299)
    cliente: ClienteSchema,

    // E1. Campos que componen la Factura Electrónica FE (E002-E099)
    factura: FacturaSchema.optional(),

    // E1.1. Campos de informaciones de Compras Públicas (E020-E029)
    dncp: DncpSchema.optional(),

    // E4. Campos que componen la Autofactura Electrónica AFE (E300-E399)
    autoFactura: AutoFacturaSchema.optional(),

    // E5. Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499)
    notaCreditoDebito: NotaCreditoDebitoSchema.optional(),
    
    // E6. Campos que componen la Nota de Remisión Electrónica (E500-E599)
    remision: RemisionSchema.optional(),

    // E7. Campos que describen la condición de la operación (E600-E699)
    condicion: CondicionSchema.optional(),

    // E8. Campos que describen los ítems de la operación (E700-E899)
    items: z.array(ItemSchema),

    // E9. Campos complementarios comerciales de uso específico (E790-E899)

    // E9.2. Sector Energía Eléctrica (E791-E799)
    sectorEnergiaElectrica: SectorEnergiaElectricaSchema.optional(),
    
    // E9.3. Sector de Seguros (E800-E809)
    sectorSeguros: SectorSegurosSchema.optional(),

    // E9.4. Sector de Supermercados (E810-E819)
    sectorSupermercados: SectorSupermercadosSchema.optional(),

    // E9.5. Grupo de datos adicionales de uso comercial (E820-E829)
    sectorAdicional: SectorAdicionalSchema.optional(),
    
    // E10. Campos que describen el transporte de las mercaderías (E900-E999)
    transporte: TransporteSchema.optional(),

    // G. Campos complementarios comerciales de uso general (G001-G049)
    complementarios: ComplementariosSchema.optional(),

    // H. Campos que identifican al documento asociado (H001-H049)
    documentoAsociado: DocumentoAsociadoSchema.optional(),
  })
  .transform((data, ctx) => {
    type Data = typeof data;
    const validator = new ZodValidator(ctx, data);
    const transportPath = new Path<Data>('transporte');
    const associatedDocumentPath = new Path<Data>('documentoAsociado');
    const clientePath = new Path<Data>('cliente');
    const itemsPath = new Path<Data>('items');
    const additionalSectorPath = new Path<Data>('sectorAdicional');

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
      data.items.forEach((_item, i) => {
        const path = itemsPath
          .concat(i)
          .concat('dncp')
          .concat('codigoNivelGeneral');
        validator.requiredField(path);
      });
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

    if (data.sectorSupermercados) {
      // POR E811
      if (data.sectorSupermercados?.nombreCajero) {
        validator.requiredField(additionalSectorPath.concat('inicioCiclo'));
      } else {
        validator.undesiredField(additionalSectorPath.concat('inicioCiclo'));
      }
      //POR E812
      // TODO: PREGUNTAR A LA DNIT SI ESTO ES UN ERROR DEL MANUAL
      // CREO QUE DEBERIA DEPENDER DEL INICIO DE CICLO
      if (data.sectorSupermercados?.efectivo) {
        validator.requiredField(additionalSectorPath.concat('finCiclo'));
      } else {
        validator.undesiredField(additionalSectorPath.concat('finCiclo'));
      }
    }

    // Y POR LA GLORIA!!! (TODO: ELIMINAR ESTO)

    return {
      ...data,
      // B003
      descripcionEmision: dbService
        .select('emissionTypes')
        .findById(data.tipoEmision).description,

      // TODO: B004

      // C003
      descripcionDocumento: dbService
        .select('documentTypes')
        .findById(data.tipoDocumento).description,

      // TODO: C004 (Número del timbrado)

      // TODO: C008 (Fecha inicio de vigencia del timbrado)

      // D012
      descripcionTipoTransaccion: dbService
        .select('transactionTypes')
        .findById(data.tipoTransaccion).description,

      // D014
      descripcionTipoImpuesto: dbService
        .select('taxTypes')
        .findById(data.tipoImpuesto).description,

      // D016
      descripcionMoneda: dbService.select('currencies').findById(data.moneda)
        .description,

      // D020
      descripcripcionCondicionAnticipo: dbService
        .select('advancePaymentConditions')
        .findByIdIfExist(data.condicionAnticipo)?.description,
    };
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
