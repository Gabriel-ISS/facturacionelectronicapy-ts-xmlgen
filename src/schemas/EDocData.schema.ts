import { z } from 'zod';
import { Currency } from '../constants/curencies.constants';
import { ValidDocumentType } from '../constants/documentTypes.constants';
import { EmissionType } from '../constants/emissionTypes.constants';
import { GlobalAndPerItem } from '../constants/globalAndPerItem.constants';
import { OperationType } from '../constants/operationTypes.constants';
import { PaymentType } from '../constants/paymentTypes.constants';
import { RemissionReason } from '../constants/remissionReasons.constants';
import { TaxTreatment } from '../constants/taxTreatments.constants';
import { TaxType } from '../constants/taxTypes.constants';
import { TransactionType } from '../constants/transactionTypes.constants';
import getTotals from '../helpers/getTotals';
import { Path } from '../helpers/Path';
import CommonValidators from '../helpers/validation/CommonValidators';

import NumberLength from '../helpers/validation/NumberLenght';
import ZodValidator from '../helpers/validation/ZodValidator';
import dbService from '../services/db.service';
import { AutoFacturaSchema } from './EDocData/autoFactura.schema';
import { ClienteSchema } from './EDocData/cliente.schema';
import { ComplementariosSchema } from './EDocData/complementarios.schema';
import { CondicionSchema } from './EDocData/condicion.schema';
import { DncpSchema } from './EDocData/dncp.schema';
import { DocumentoAsociadoSchema } from './EDocData/documentoAsociado.schema';
import { FacturaSchema } from './EDocData/factura.schema';
import { CompleteItem, Item, ItemSchema } from './EDocData/item.schema';
import { NotaCreditoDebitoSchema } from './EDocData/notaCheditoDebito.schema';
import { ObligacionSchema } from './EDocData/obligacion.schema';
import { RemisionSchema } from './EDocData/remision.schema';
import { SectorAdicionalSchema } from './EDocData/sectorAdicional.schema';
import { SectorEnergiaElectricaSchema } from './EDocData/sectorEnergiaElectrica.schema';
import { SectorSegurosSchema } from './EDocData/sectorSeguros.schema';
import { SectorSupermercadosSchema } from './EDocData/sectorSupermercados.schema';
import { TransporteSchema } from './EDocData/transporte.schema';
import { UsuarioSchema } from './EDocData/usuario.schema';
import DateHelper from '../helpers/DateHelper';

/** El esquema no incluye...
 *
 * ...campos que se definen en EDocParams:
 * D2. Campos que identifican al emisor del Documento Electrónico DE (D100-D129)
 * D2.1 Campos que describen la actividad económica del emisor (D130-D139)
 *
 * ...J. Campos fuera de la Firma Digital (J001-J049)
 */
export const EDocDataSchema = z
  .object({
    // A. Campos firmados del Documento Electrónico (A001-A099)

    // para calcular A002
    cdc: CommonValidators.cdc().optional(),

    // A004
    fechaFirmaDigital: z.coerce
      .date()
      .optional()
      .transform((value, ctx) => {
        return value
          ? DateHelper.getIsoDateTime(value)
          : DateHelper.getIsoDateTime(new Date());
      }),

    // B. Campos inherentes a la operación de Documentos Electrónicos (B001-B099)

    // B002
    tipoEmision: z.nativeEnum(EmissionType)
      .default(EmissionType.NORMAL),

    // B004
    // VER: 10.3. Generación del código de seguridad
    codigoSeguridadAleatorio: z
      .string()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        if (value.length != 9) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El valor debe tener 9 caracteres',
          });
        }

        const isNumericOnly = value.match(/^\d+$/);
        if (!isNumericOnly) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El valor debe ser numérico',
          });
        }
      }),

    // B005
    observacion: z.string().min(1).max(3000).optional(),

    // B006
    descripcion: z.string().min(1).max(3000).optional(),

    // C. Campos de datos del Timbrado (C001-C099)

    // C002
    tipoDocumento: z.nativeEnum(ValidDocumentType),

    // C005: Debe coincidir con la estructura de timbrado
    establecimiento: CommonValidators.zeroPadToLength(3),

    // C006: Debe coincidir con la estructura de timbrado
    punto: CommonValidators.zeroPadToLength(3),

    // C007: Debe coincidir con la estructura de timbrado
    numero: CommonValidators.zeroPadToLength(7),

    // C010: obligatorio cuando se consumió la numeración permitida
    // VER: "10.5. Manejo del timbrado y Numeración"
    serie: CommonValidators.serie().optional(),

    // D. Campos Generales del Documento Electrónico DE (D001-D299)

    // D002
    fecha: CommonValidators.isoDateTime(),

    // D011: En este repo se agrega el tipo por defecto
    tipoTransaccion: z.nativeEnum(TransactionType)
      .default(TransactionType.VENTA_DE_MERCADERIA),

    // D013
    tipoImpuesto: z.nativeEnum(TaxType),

    // D015
    moneda: CommonValidators.currency().default(Currency.GUARANI),

    // D017
    condicionTipoCambio: z.nativeEnum(GlobalAndPerItem).optional(),

    // D018
    cambio: CommonValidators.currencyChange().optional(),

    // D019
    condicionAnticipo: z.nativeEnum(GlobalAndPerItem).optional(),

    // https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642
    // D1.1. Campos que identifican las obligaciones afectadas (D030-D040)
    obligaciones: z.array(ObligacionSchema).optional(),

    // ⚠️ No es del manual, pero si del repo original
    // Es el valor monetario total a descontar de la suma de los items
    // Se usa para calcular EA004
    descuentoGlobal: z.number().default(0),

    // ⚠️ No es del manual, pero si del repo original
    // Es el valor monetario total que se aplica como anticipo a la suma de los items
    // Se usa para calcular EA007
    anticipoGlobal: z.number().default(0),

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

    // TODO: ahora puede aparecer hasta 9 veces, como es eso?
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006
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

    // F025
    comision: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      }),

    // G. Campos complementarios comerciales de uso general (G001-G049)
    complementarios: ComplementariosSchema.optional(),

    // H. Campos que identifican al documento asociado (H001-H049)
    documentoAsociado: z
      .union([DocumentoAsociadoSchema, DocumentoAsociadoSchema.array()])
      .optional(),
  })
  .transform((data, ctx) => {
    type Data = typeof data;
    const validator = new ZodValidator(ctx, data);

    const transportPath = new Path<Data>('transporte');
    const associatedDocumentPath = new Path<Data>('documentoAsociado');
    const clientePath = new Path<Data>('cliente');
    const dncpPath = new Path<Data>('dncp');
    const remisionPath = new Path<Data>('remision');
    const itemsPath = new Path<Data>('items');
    const complementariosPath = new Path<Data>('complementarios');

    /**C002 = 1 */
    const isElectronicInvoice =
      data.tipoDocumento == ValidDocumentType.FACTURA_ELECTRONICA;
    /**C002 = 4 */
    const isAutoInvoice =
      data.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA;
    /**C002 = 5 */
    const isElectronicCreditNote =
      data.tipoDocumento == ValidDocumentType.NOTA_DE_CREDITO_ELECTRONICA;
    /**C002 = 6 */
    const isElectronicDebitNote =
      data.tipoDocumento == ValidDocumentType.NOTA_DE_DEBITO_ELECTRONICA;
    /**C002 = 7 */
    const isElectronicRemissionNote =
      data.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA;
    /**D015 = PYG */
    const currencyIsGuarani = data.moneda == Currency.GUARANI;
    /**D017 = 1 */
    const currencyChangeConditionIsGlobal =
      data.condicionTipoCambio == GlobalAndPerItem.GLOBAL;
    /**D017 = 2 */
    const currencyChangeConditionIsPerItem =
      data.condicionTipoCambio == GlobalAndPerItem.POR_ITEM;
    /**D202 = 3 */
    const operationIsB2G = data.cliente.tipoOperacion == OperationType.B2G;
    /**D011 = 9 */
    const transactionTypeIsAsociatedInvoice =
      data.tipoTransaccion == TransactionType.ANTICIPO;
    /**D011 = 12 */
    const transactionTypeIsTaxCreditSale =
      data.tipoTransaccion == TransactionType.VENTA_DE_CREDITO_FISCAL;
    /**E501 = 5 */
    const remissionReasonIsImport =
      data.remision?.motivo == RemissionReason.IMPORTACION;

    // B004
    {
      // ⚠️ según el repo original
      if (data.cdc) {
        //Caso ya se le pase el CDC
        data.codigoSeguridadAleatorio = data.cdc.substring(34, 43);
      }
    }

    // B006 - descripcion
    {
      /*
      Cuando el tipo de documento es
      Nota de remisión (C002=7) es
      obligatorio informar el mensaje

      En caso de realizar Factura
      Exportación, en este campo en
      la FE se debe completar con los
      siguientes datos y en este orden
      de conformidad al Art 20
      numeral 15 del Decreto N°
      10797/2013:
      a) Tipo de Operación,
      b) Condición de Negociación, (CIF, FOB, otros.)
      c) País de Destino,
      d) Empresa Fletera o Exportador Nacional,
      e) Agente de Transporte,
      f) Instrucciones de Pago para el cliente (Beneficiario, Banco, N°
      de cuenta, Código SWIFT, Cartas de Crédito, otro).
      g) Número/s de Conocimiento/s de Embarque.
      h) Número/s de Manifiesto/s Internacional/es de Carga.
      i) Número de barcaza o remolcador, descripción y
      cantidad del bien transportado (en los casos de Flete Internacional),
      j) Las demás informaciones que sean fijadas por la
      Administración Tributaria, en normas de carácter general ".

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_007_MT_V150.pdf/d6b31757-8906-a326-4e92-f9ec4b5d7706?t=1687353746603
      */
      if (isElectronicRemissionNote) {
        validator.requiredField('descripcion');
      }
    }

    // D011 - tipoTransaccion
    {
      /*
      Obligatorio si C002 = 1 o 4
      No informar si C002 ≠ 1 o 4
      */
      if (isElectronicInvoice || isAutoInvoice) {
        validator.requiredField('tipoTransaccion');
      } else {
        validator.undesiredField('tipoTransaccion');
      }
    }

    // D017 - condicionTipoCambio
    {
      /*
      Obligatorio si D015 ≠ PYG
      No informar si D015 = PYG
      */

      /** En este repo se agrega el tipo por defecto */
      if (!currencyIsGuarani) {
        data.condicionTipoCambio = GlobalAndPerItem.GLOBAL;
      } else {
        validator.undesiredField('condicionTipoCambio');
      }
    }

    // D018 - cambio
    {
      /*
      Obligatorio si D017 = 1
      No informar si D017 = 2
      */
      if (currencyChangeConditionIsGlobal) {
        validator.requiredField('cambio');
      } else if (currencyChangeConditionIsPerItem) {
        validator.undesiredField('cambio');
      }
    }

    // D213 - cliente.direccion
    {
      /*
      Campo obligatorio cuando C002=7
      o cuando D202=4 (se valida en ClienteSchema)
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(clientePath.concat('direccion'));
      }
    }

    // E010 - factura
    {
      /*
      Obligatorio si C002 = 1
      No informar si C002 ≠ 1
      */
      if (isElectronicInvoice) {
        validator.requiredField('factura');
      } else {
        validator.undesiredField('factura');
      }
    }

    // E020 - dncp
    {
      /*
      Obligatorio si D202 = 3 (Tipo de operación B2G)
      */
      if (operationIsB2G) {
        validator.requiredField('dncp');
      }
    }

    // E025 - dncp.fecha
    {
      /*
      Esta fecha debe ser anterior a la fecha
      de emisión de la FE
      */
      validator.validate(
        dncpPath.concat('fecha'),
        Boolean(
          isElectronicInvoice && data.dncp && data.dncp.fecha > data.fecha,
        ),
        'La fecha de emisión de la FE debe ser anterior a la fecha de la DNCP',
      );
    }

    // E400 - notaCreditoDebito
    {
      /*
      Obligatorio si C002 = 5 o 6 (NCE y NDE)
      No informar si C002 ≠ 5 o 6
      */
      if (isElectronicCreditNote || isElectronicDebitNote) {
        validator.requiredField('notaCreditoDebito');
      } else {
        validator.undesiredField('notaCreditoDebito');
      }
    }

    // E500 - remission
    {
      /*
      Obligatorio si C002 = 7
      No informar si C002 ≠ 7
      */
      if (isElectronicRemissionNote) {
        validator.requiredField('remision');
      } else {
        validator.undesiredField('remision');
      }
    }

    // E506 - fechaFactura
    {
      /*
      Obs.: Informar cuando no se ha
      emitido aún la factura electrónica,
      en caso que corresponda
      */
      if (data.remision?.fechaFactura) {
        const fechaFactura = new Date(data.remision.fechaFactura);
        const fechaEmision = new Date(data.fecha);

        validator.validate(
          remisionPath.concat('fechaFactura'),
          fechaFactura.getTime() > fechaEmision.getTime(),
          'remission.fechaFactura debe ser antes de la fecha de emisión',
        );
      }
    }

    // E600 - condicion
    {
      /*
      Obligatorio si C002 = 1 o 4
      No informar si C002 ≠ 1 o 4
      */
      if (isElectronicInvoice || isAutoInvoice) {
        validator.requiredField('condicion');
      } else {
        validator.undesiredField('condicion');
      }
    }

    // E704 - item.dncp.codigoNivelGeneral
    {
      /*
      Obligatorio si D202 = 3
      TODO: Informar se existe el código de la DNCP (cual de todos?)
      */
      if (operationIsB2G) {
        data.items.forEach((_item, i) => {
          validator.requiredField(
            itemsPath.concat(i).concat('dncp').concat('codigoNivelGeneral'),
          );
        });
      }
    }

    // E719 - item.cdcAnticipo
    {
      /*
        Obligatorio cuando se utilice una
        factura asociada con el tipo de
        transacción igual a Anticipo (D011 de la factura asociada 
        igual a 9)
      */
      if (transactionTypeIsAsociatedInvoice) {
        data.items.forEach((_item, i) => {
          validator.requiredField(itemsPath.concat(i).concat('cdcAnticipo'));
        });
      }
    }

    // E720 - (E720-E729)
    {
      /*
      Obligatorio si C002 ≠ 7
      No informar si C002 = 7
      TODO: de momento voy a asumir que es un error explicado
      en las notas de desarrollador
      */
      /* if (isElectronicRemissionNote) {
      
      } else {

      } */
    }

    // E725 - item.cambio
    {
      /*
      Obligatorio si D017 = 2
      No informar si D017 = 1
      */
      if (currencyChangeConditionIsPerItem) {
        data.items.forEach((_item, i) => {
          validator.requiredField(itemsPath.concat(i).concat('cambio'));
        });
      } else if (currencyChangeConditionIsGlobal) {
        data.items.forEach((_item, i) => {
          validator.undesiredField(itemsPath.concat(i).concat('cambio'));
        });
      }
    }

    // E730 - Campos que describen el IVA de la operación por ítem
    {
      /*
      Obligatorio si D013=1, 3, 4 o 5 y
      C002 ≠ 4 o 7
      No informar si D013=2 y C002= 4
      o 7. TODO: TODO, ASUMIRÉ QUE ES UN ERROR HASTA LEER LAS DEV-NOTES
      */
    }

    // E900 - transporte
    {
      /*
        Obligatorio si C002 = 7
        Opcional si C002 = 1
        No informar si C002= 4, 5, 6 
      */
      if (isElectronicRemissionNote) {
        validator.requiredField('transporte');
      } else if (
        isAutoInvoice ||
        isElectronicCreditNote ||
        isElectronicDebitNote
      ) {
        validator.undesiredField('transporte');
      }
    }

    // E901 - transporte.tipo
    {
      /*
      Obligatorio si C002 = 7
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(transportPath.concat('tipo'));
      }
    }

    // E908 - transporte.numeroDespachoImportacion
    {
      /*
      Obligatorio si E501 = 5
      */
      if (remissionReasonIsImport) {
        validator.requiredField(
          transportPath.concat('numeroDespachoImportacion'),
        );
      }
    }

    // E909 - transporte.inicioEstimadoTranslado
    {
      /*
      Obligatorio si C002 = 7
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(
          transportPath.concat('inicioEstimadoTranslado'),
        );
      }
    }

    // E920 - transporte.salida
    {
      /*
      Obligatorio si C002 = 7
      No informar si C002 = 4, 5, 6
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(transportPath.concat('salida'));
      } else if (
        isAutoInvoice ||
        isElectronicCreditNote ||
        isElectronicDebitNote
      ) {
        validator.undesiredField(transportPath.concat('salida'));
      }
    }

    // E940 - transporte.entrega
    {
      /*
      Obligatorio si C002 = 7
      No informar si C002 = 4, 5, 6
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(transportPath.concat('entrega'));
      } else if (
        isAutoInvoice ||
        isElectronicCreditNote ||
        isElectronicDebitNote
      ) {
        validator.undesiredField(transportPath.concat('entrega'));
      }
    }

    // E960 - transporte.vehiculo
    {
      /*
      Obligatorio si C002 = 7
      No informar si C002 = 4, 5, 6
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(transportPath.concat('vehiculo'));
      } else if (
        isAutoInvoice ||
        isElectronicCreditNote ||
        isElectronicDebitNote
      ) {
        validator.undesiredField(transportPath.concat('vehiculo'));
      }
    }

    // E980 - transporte.transportista
    {
      /*
      Obligatorio si C002 = 7
      No informar si C002 = 4, 5, 6
      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
      */
      if (isElectronicRemissionNote) {
        validator.requiredField(transportPath.concat('transportista'));
      } else if (
        isAutoInvoice ||
        isElectronicCreditNote ||
        isElectronicDebitNote
      ) {
        validator.undesiredField(transportPath.concat('transportista'));
      }
    }

    // G050 - complementarios.carga
    {
      /*
      Opcional cuando C002=1 o C002=7
      No informar para C002 ≠ 1 y C002≠7
      */
      if (!isElectronicInvoice && !isElectronicRemissionNote) {
        validator.undesiredField(complementariosPath.concat('carga'));
      }
    }

    // H001 - documentoAsociado
    {
      /*
      Obligatorio si C002 = 4, 5, 6
      Opcional si C002=1 o 7
      */
      if (isAutoInvoice || isElectronicCreditNote || isElectronicDebitNote) {
        validator.requiredField(associatedDocumentPath.concat('formato'));
      }
    }

    // H012 - documentoAsociado.numeroRetencion
    {
      /*
      No informar si E606 ≠ 10
      */
      if (
        !data.condicion?.entregas?.some((d) => d.tipo == PaymentType.RETENCION)
      ) {
        validator.undesiredField(
          associatedDocumentPath.concat('numeroRetencion'),
        );
      }
    }

    // H013 - documentoAsociado.resolucionCreditoFiscal
    {
      /*
      Si D011 = 12 obligatorio informar
      número de resolución de crédito fiscal
      No informar si D011 ≠ 12
      */
      if (transactionTypeIsTaxCreditSale) {
        validator.requiredField(
          associatedDocumentPath.concat('resolucionCreditoFiscal'),
        );
      } else {
        validator.undesiredField(
          associatedDocumentPath.concat('resolucionCreditoFiscal'),
        );
      }
    }

    // TODO: VALIDAR CDC

    // TODO: VER CALCULO
    const totalItemsPrice = data.items.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0,
    );

    // EA004 - descuentoGlobalItem
    const calcDescuentoGlobalItem = (
      item: Item,
      itemPercentageOfAllItems: number,
    ) => {
      /*
      Calculo según manual: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
      ⚠️ Calculo del repo original
      */
      if (!data.descuentoGlobal) return undefined;
      const globalDiscountItem =
        (data.descuentoGlobal * itemPercentageOfAllItems) / 100;
      const globalDiscountItemUnit = globalDiscountItem / item.cantidad;

      /*TODO: (por que lo dejo comentado?)
      if (data.moneda === 'PYG') {
        //jsonResult['dDescGloItem'] = parseFloat(jsonResult['dDescGloItem']).toFixed(config.pygDecimals);
      }
      */

      return globalDiscountItemUnit;
    };

    // EA007 - anticipoGlobalItem
    const calcAnticipoGlobalItem = (
      item: Item,
      itemPercentageOfAllItems: number,
    ) => {
      // ⚠️ Calculo del repo original

      if (!data.anticipoGlobal) return undefined;
      const globalDiscountItem =
        (data.anticipoGlobal * itemPercentageOfAllItems) / 100;
      const globalDiscountItemUnit = globalDiscountItem / item.cantidad;

      /* TODO:
      if (data.moneda === 'PYG') {
        jsonResult['dAntGloPreUniIt'] = parseFloat(jsonResult['dAntGloPreUniIt']).toFixed(config.pygDecimals);
      }
      */

      return globalDiscountItemUnit;
    };

    // EA008 - totalOperacion
    const calcTotalOperacion = (item: Item) => {
      /*
      Si D013 = 1, 3, 4 o 5 (afectado al
      IVA, Renta, ninguno, IVA - Renta),
      entonces EA008 corresponde al
      cálculo aritmético: (E721 (Precio
      unitario) – EA002 (Descuento
      particular) – EA004 (Descuento
      global) – EA006 (Anticipo
      particular) – EA007 (Anticipo
      global)) * E711(cantidad)
      Cálculo para Autofactura
      (C002=4):
      E721*E711
      */

      // TODO: que pasa si es ISC y no es auto-factura? ahora retorna 0, pero no se como se debería de tratar

      if (data.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA) {
        return item.precioUnitario * item.cantidad;
      }
      if (
        [
          TaxType.IVA,
          TaxType.RENTA,
          TaxType.NINGUNO,
          TaxType.IVA___RENTA,
        ].includes(data.tipoImpuesto)
      ) {
        return (
          item.precioUnitario -
          data.descuentoGlobal -
          data.anticipoGlobal -
          (item.descuento || 0) -
          (item.anticipo || 0)
        );
      }

      return 0;
    };

    // EA009 - totalOperacionGuaranies
    const calcTotalOperacionGuaranies = (
      item: Item,
      totalOperacion_EA008: number,
    ) => {
      if (item.cambio == undefined) return 0;

      return totalOperacion_EA008 * item.cambio;
    };

    // E735 - ivaBase
    const calcIvaBase = (item: Item, totalOperacion_EA008: number) => {
      /*
      Si E731 = 1 o 4 este campo es igual al resultado del cálculo:
      [100 * EA008 * E733] / [10000 + (E734 * E733)]

      Si E731 = 2 o 3 este campo es igual 0

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
      */

      /**E731 = 1 */
      const isGravado = item.ivaTipo == TaxTreatment.GRAVADO_IVA;
      /**E731 = 2 */
      const isExonerado =
        item.ivaTipo == TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_;
      /**E731 = 3 */
      const isExento = item.ivaTipo == TaxTreatment.EXENTO;
      /**E731 = 4 */
      const isGravadoParcial =
        item.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_;

      if (isGravado || isGravadoParcial) {
        return (
          (100 * totalOperacion_EA008 * item.proporcionGravada) /
          (10000 + item.iva * item.proporcionGravada)
        );
      } else if (isExonerado || isExento) {
        return 0;
      } else {
        throw new Error(
          'El tipo de iva no se reconoce en el calculo de E735 en NT013',
        );
      }
    };

    // E736 - liquidacionIvaPorItem
    const calcLiquidacionIvaPorItem = (item: Item, ivaBase: number) => {
      /*
      Corresponde al cálculo aritmético:
      E735 * (E734/100)
      Si E731 = 2 o 3 este campo es
      igual 0
      */
      // esto resume el calculo
      // si es exonerado o exento (E731 = 2 o 3) iva cera 0 y el resto son matemáticas
      return ivaBase * (item.iva / 100);
    };

    // E737 - baseExentaIva
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
    const calcBaseExentaIva = (item: Item, totalOperacion_EA008: number) => {
      /*
      Si E731 = 4 este campo es igual al resultado del cálculo:
      [100 * EA008 * (100 – E733)] / [10000 + (E734 * E733)]

      Si E731 = 1 , 2 o 3 este campo es igual 0 
      */

      /**E731 = 1 */
      const isGravado = item.ivaTipo == TaxTreatment.GRAVADO_IVA;
      /**E731 = 2 */
      const isExonerado =
        item.ivaTipo == TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_;
      /**E731 = 3 */
      const isExento = item.ivaTipo == TaxTreatment.EXENTO;
      /**E731 = 4 */
      const isGravadoParcial =
        item.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_;

      if (isGravadoParcial) {
        return (
          (100 * totalOperacion_EA008 * (100 - item.proporcionGravada)) /
          (10000 + item.iva * item.proporcionGravada)
        );
      } else if (isGravado || isExonerado || isExento) {
        return 0;
      } else {
        throw new Error(
          'El tipo de iva no se reconoce en el calculo de E737 en NT013',
        );
      }
    };

    const items = data.items.map((item) => {
      const totalItemPrice = item.precioUnitario * item.cantidad;
      const percentageInAllItems = (totalItemPrice * 100) / totalItemsPrice;

      const descuentoGlobalItem = calcDescuentoGlobalItem(
        item,
        percentageInAllItems,
      );
      const anticipoGlobalItem = calcAnticipoGlobalItem(
        item,
        percentageInAllItems,
      );

      const totalOperacion = calcTotalOperacion(item);
      const totalOperacionGuaranies = calcTotalOperacionGuaranies(
        item,
        totalOperacion,
      );
      const ivaBase = calcIvaBase(item, totalOperacion);
      const baseExentaIva = calcBaseExentaIva(item, totalOperacion);

      return {
        ...item,

        /**EA004 */
        descuentoGlobalItem,

        /**EA007 */
        anticipoGlobalItem,

        /**EA008 */
        totalOperacion,

        /**EA009 */
        totalOperacionGuaranies,

        /**E735 */
        ivaBase,

        /**E736 */
        liquidacionIvaPorItem: calcLiquidacionIvaPorItem(item, ivaBase),

        /**E737 */
        baseExentaIva,
      } satisfies CompleteItem;
    });

    return {
      ...data,

      // A002 y A003 se definen en EDocSchema

      // A005
      sistemaDeFacturacion: 1,

      // B003
      descripcionEmision: dbService
        .select('emissionTypes')
        .findById(data.tipoEmision).description,

      // C003
      descripcionDocumento: dbService
        .select('documentTypes')
        .findById(data.tipoDocumento).description,

      // C004 y C008 se define en EDocParams

      // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
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
      descripcionCondicionAnticipo: dbService
        .select('advancePaymentConditions')
        .findByIdIfExist(data.condicionAnticipo)?.description,

      items,

      // F001
      totales: getTotals({
        items,
        isElectronicRemissionNote,
        isAutoInvoice,
        tipoImpuesto: data.tipoImpuesto,
        isGuarani: currencyIsGuarani,
        currencyChangeConditionIsGlobal,
        currencyChangeConditionIsPerItem,
        cambio: data.cambio,
        comision: data.comision,
      }),
    };
  });

export type EDocDataInput = z.input<typeof EDocDataSchema>;
