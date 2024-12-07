import { z } from 'zod';
import { Currency } from '../data/currencies.table';
import { EDocumentType } from '../data/eDocumentTypes.table';
import { EmissionType } from '../data/emissionTypes.table';
import { OperationType } from '../data/operationTypes.table';
import { PaymentType } from '../data/paymentTypes.table';
import { RemissionReason } from '../data/remissionReasons.table';
import { GlobalAndPerItem } from '../data/shared/globalAndPerItem.table';
import { TaxTreatment } from '../data/taxTreatments.table';
import { TaxType } from '../data/taxTypes.table';
import { TransactionType } from '../data/transactionTypes.table';
import DateHelper from '../helpers/DateHelper';
import getTotals from '../helpers/getTotals';
import { Path } from '../helpers/Path';
import CommonValidators from '../helpers/validation/CommonValidators';
import NumberLength from '../helpers/validation/NumberLenght';
import ZodValidator from '../helpers/validation/ZodValidator';
import dbService from '../services/db.service';
import { AutoFacturaSchema } from './data/autoFactura.schema';
import { ClienteSchema } from './data/cliente.schema';
import { ComplementariosSchema } from './data/complementarios.schema';
import { CondicionSchema } from './data/condicion.schema';
import { DncpSchema } from './data/dncp.schema';
import { DocumentoAsociadoSchema } from './data/documentoAsociado.schema';
import { FacturaSchema } from './data/factura.schema';
import { Impuesto } from './data/impuesto.schema';
import { CompleteItem, Item, ItemSchema } from './data/item.schema';
import { Monto } from './data/monto.schema';
import { NotaCreditoDebitoSchema } from './data/notaCheditoDebito.schema';
import { ObligacionSchema } from './data/obligacion.schema';
import { RemisionSchema } from './data/remision.schema';
import { SectorAdicionalSchema } from './data/sectorAdicional.schema';
import { SectorEnergiaElectricaSchema } from './data/sectorEnergiaElectrica.schema';
import { SectorSegurosSchema } from './data/sectorSeguros.schema';
import { SectorSupermercadosSchema } from './data/sectorSupermercados.schema';
import { TransporteSchema } from './data/transporte.schema';
import { UsuarioSchema } from './data/usuario.schema';
import SDParser from '../helpers/SDParser';

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
    cdc: CommonValidators.cdc().optional().describe(SDParser.stringify('A002')),

    // A004
    fechaFirmaDigital: z.coerce
      .date()
      .optional()
      .transform((value, ctx) => {
        return value
          ? DateHelper.getIsoDateTime(value)
          : DateHelper.getIsoDateTime(new Date());
      })
      .describe(SDParser.stringify('A004')),

    // B. Campos inherentes a la operación de Documentos Electrónicos (B001-B099)

    // B002
    tipoEmision: z
      .nativeEnum(EmissionType)
      .default(EmissionType.NORMAL)
      .describe(
        SDParser.stringify('B002', {
          e: 'EmissionType',
          d: 'NORMAL por defecto',
        }),
      ),

    // B004
    // VER: 10.3. Generación del código de seguridad
    codigoSeguridadAleatorio: z
      .number()
      .optional()
      .transform((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).int().length(9);
        return value.toString();
      })
      .describe(SDParser.stringify('B004')),

    // B005
    observacion: z
      .string()
      .min(1)
      .max(3000)
      .optional()
      .describe(SDParser.stringify('B005')),

    // B006
    descripcion: z
      .string()
      .min(1)
      .max(3000)
      .optional()
      .describe(SDParser.stringify('B006')),

    // C. Campos de datos del Timbrado (C001-C099)

    // C002
    tipoDocumento: z.nativeEnum(EDocumentType).describe(
      SDParser.stringify('C002', {
        e: 'EDocumentType',
      }),
    ),

    // C005: Debe coincidir con la estructura de timbrado
    establecimiento: CommonValidators.zeroPadToLength(3).describe(
      SDParser.stringify('C005'),
    ),

    // C006: Debe coincidir con la estructura de timbrado
    punto: CommonValidators.zeroPadToLength(3).describe(
      SDParser.stringify('C006'),
    ),

    // C007: Debe coincidir con la estructura de timbrado
    numero: CommonValidators.zeroPadToLength(7).describe(
      SDParser.stringify('C007'),
    ),

    // C010: obligatorio cuando se consumió la numeración permitida
    // VER: "10.5. Manejo del timbrado y Numeración"
    serie: CommonValidators.serie()
      .optional()
      .describe(
        SDParser.stringify('C010', {
          d: 'Obligatorio cuando se consumió la numeración permitida',
          v: '10.5. Manejo del timbrado y Numeración',
        }),
      ),

    // D. Campos Generales del Documento Electrónico DE (D001-D299)

    // D002
    fecha: CommonValidators.isoDateTime().describe(SDParser.stringify('D002')),

    // D011: En este repo se agrega el tipo por defecto
    tipoTransaccion: z
      .nativeEnum(TransactionType)
      .default(TransactionType.VENTA_DE_MERCADERIA)
      .describe(
        SDParser.stringify('D011', {
          e: 'TransactionType',
          d: 'Por defecto venta de mercadería',
        }),
      ),

    // D013
    tipoImpuesto: z.nativeEnum(TaxType).describe(
      SDParser.stringify('D013', {
        e: 'TaxType',
      }),
    ),

    // D015
    moneda: CommonValidators.currency()
      .default(Currency.GUARANI)
      .describe(
        SDParser.stringify('D015', { e: 'Currency', d: 'Guarani por defecto' }),
      ),

    // D017
    condicionTipoCambio: z
      .nativeEnum(GlobalAndPerItem)
      .optional()
      .describe(SDParser.stringify('D017', { e: 'GlobalAndPerItem' })),

    // D018
    cambio: CommonValidators.currencyChange()
      .optional()
      .describe(SDParser.stringify('D018')),

    // D019
    condicionAnticipo: z
      .nativeEnum(GlobalAndPerItem)
      .optional()
      .describe(SDParser.stringify('D019', { e: 'GlobalAndPerItem' })),

    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642
    // D1.1. Campos que identifican las obligaciones afectadas (D030-D040)
    obligaciones: z
      .array(ObligacionSchema)
      .max(11)
      .optional()
      .describe(
        SDParser.stringify('D1.1', {
          d: 'Campos que identifican las obligaciones afectadas (D030-D040)',
          v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642',
        }),
      ),

    // ⚠️ No es del manual, pero si del repo original
    // Es el valor monetario total a descontar de la suma de los items
    // Se usa para calcular EA004
    descuentoGlobal: z
      .number()
      .default(0)
      .describe(
        SDParser.stringify('para calcular EA004', {
          d: 'Es el valor monetario total a descontar de la suma de los items',
        }),
      ),

    // ⚠️ No es del manual, pero si del repo original
    // Es el valor monetario total que se aplica como anticipo a la suma de los items
    // Se usa para calcular EA007
    anticipoGlobal: z
      .number()
      .default(0)
      .describe(
        SDParser.stringify('para calcular EA007', {
          d: 'Es el valor monetario total que se aplica como anticipo a la suma de los items',
        }),
      ),

    // D2.2 Campos que identifican al responsable de la generación del DE (D140-D160)
    usuario: UsuarioSchema.optional().describe(
      SDParser.stringify('D2.2', {
        d: 'Campos que identifican al responsable de la generación del DE (D140-D160)',
      }),
    ),

    // D3. Campos que identifican al receptor del Documento Electrónico DE (D200-D299)
    cliente: ClienteSchema.describe(
      SDParser.stringify('D3', {
        d: 'Campos que identifican al receptor del Documento Electrónico DE (D200-D299)',
      }),
    ),

    // E1. Campos que componen la Factura Electrónica FE (E002-E099)
    factura: FacturaSchema.optional().describe(
      SDParser.stringify('E1', {
        d: 'Campos que componen la Factura Electrónica FE (E002-E099)',
      }),
    ),

    // E1.1. Campos de informaciones de Compras Públicas (E020-E029)
    dncp: DncpSchema.optional().describe(
      SDParser.stringify('E1.1', {
        d: 'Campos de informaciones de Compras Públicas (E020-E029)',
      }),
    ),

    // E4. Campos que componen la Autofactura Electrónica AFE (E300-E399)
    autoFactura: AutoFacturaSchema.optional().describe(
      SDParser.stringify('E4', {
        d: 'Campos que componen la Autofactura Electrónica AFE (E300-E399)',
      }),
    ),

    // E5. Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499)
    notaCreditoDebito: NotaCreditoDebitoSchema.optional().describe(
      SDParser.stringify('E5', {
        d: 'Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499)',
      }),
    ),

    // E6. Campos que componen la Nota de Remisión Electrónica (E500-E599)
    remision: RemisionSchema.optional().describe(
      SDParser.stringify('E6', {
        d: 'Campos que componen la Nota de Remisión Electrónica (E500-E599)',
      }),
    ),

    // E7. Campos que describen la condición de la operación (E600-E699)
    condicion: CondicionSchema.optional().describe(
      SDParser.stringify('E7', {
        d: 'Campos que describen la condición de la operación (E600-E699)',
      }),
    ),

    // E8. Campos que describen los ítems de la operación (E700-E899)
    items: z.array(ItemSchema).describe(
      SDParser.stringify('E8', {
        d: 'Campos que describen los ítems de la operación (E700-E899)',
      }),
    ),

    // E9. Campos complementarios comerciales de uso específico (E790-E899)

    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006
    // E9.2. Sector Energía Eléctrica (E791-E799)
    sectorEnergiaElectrica: SectorEnergiaElectricaSchema.optional().describe(
      SDParser.stringify('E9.2', {
        d: 'Sector Energía Eléctrica (E791-E799)',
        v: 'https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006',
      }),
    ),

    // E9.3. Sector de Seguros (E800-E809)
    sectorSeguros: SectorSegurosSchema.optional().describe(
      SDParser.stringify('E9.3', {
        d: 'Sector de Seguros (E800-E809)',
      }),
    ),

    // E9.4. Sector de Supermercados (E810-E819)
    sectorSupermercados: SectorSupermercadosSchema.optional().describe(
      SDParser.stringify('E9.4', {
        d: 'Sector de Supermercados (E810-E819)',
      }),
    ),

    // E9.5. Grupo de datos adicionales de uso comercial (E820-E829)
    sectorAdicional: SectorAdicionalSchema.optional().describe(
      SDParser.stringify('E9.5', {
        d: 'Grupo de datos adicionales de uso comercial (E820-E829)',
      }),
    ),

    // E10. Campos que describen el transporte de las mercaderías (E900-E999)
    transporte: TransporteSchema.optional().describe(
      SDParser.stringify('E10', {
        d: 'Campos que describen el transporte de las mercaderías (E900-E999)',
      }),
    ),

    // F025
    comision: z
      .number()
      .optional()
      .superRefine((value, ctx) => {
        if (value == undefined) return;
        new NumberLength(value, ctx).max(15).maxDecimals(8);
      })
      .describe(SDParser.stringify('F025')),

    // G. Campos complementarios comerciales de uso general (G001-G049)
    complementarios: ComplementariosSchema.optional().describe(
      SDParser.stringify('G', {
        d: 'Campos complementarios comerciales de uso general (G001-G049)',
      }),
    ),

    // H. Campos que identifican al documento asociado (H001-H049)
    documentoAsociado: z
      .union([DocumentoAsociadoSchema, DocumentoAsociadoSchema.array().max(99)])
      .optional()
      .describe(
        SDParser.stringify('H', {
          d: 'Campos que identifican al documento asociado (H001-H049)',
        }),
      ),
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
      data.tipoDocumento == EDocumentType.FACTURA_ELECTRONICA;
    /**C002 = 4 */
    const isAutoInvoice =
      data.tipoDocumento == EDocumentType.AUTOFACTURA_ELECTRONICA;
    /**C002 = 5 */
    const isElectronicCreditNote =
      data.tipoDocumento == EDocumentType.NOTA_DE_CREDITO_ELECTRONICA;
    /**C002 = 6 */
    const isElectronicDebitNote =
      data.tipoDocumento == EDocumentType.NOTA_DE_DEBITO_ELECTRONICA;
    /**C002 = 7 */
    const isElectronicRemissionNote =
      data.tipoDocumento == EDocumentType.NOTA_DE_REMISION_ELECTRONICA;
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
    /**D013 = 1 */
    const taxIsIVA = data.tipoImpuesto == TaxType.IVA;
    /**D013 = 2 */
    const taxIsISC = data.tipoImpuesto == TaxType.ISC;
    /**D013 = 3 */
    const taxIsRent = data.tipoImpuesto == TaxType.RENTA;
    /**D013 = 4 */
    const taxIsNone = data.tipoImpuesto == TaxType.NINGUNO;
    /**D013 = 5 */
    const taxIsIvaRent = data.tipoImpuesto == TaxType.IVA___RENTA;
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
      const dncpDatePath = dncpPath.concat('fecha');
      validator.validate(
        'fecha',
        Boolean(
          isElectronicInvoice && data.dncp && data.dncp.fecha > data.fecha,
        ),
        `La fecha de emisión $path de la FE debe ser anterior a '${dncpDatePath}'`,
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

        const datePath = new Path<Data>('fecha');
        validator.validate(
          remisionPath.concat('fechaFactura'),
          fechaFactura > fechaEmision,
          `$path debe ser antes de la fecha de emisión '${datePath}'`,
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

    // E704 - data.items.dncp.codigoNivelGeneral
    {
      /*
      Obligatorio si D202 = 3
      OBS: Informar se existe el código de la DNCP
      */
      if (operationIsB2G) {
        data.items.forEach((_item, i) => {
          validator.requiredField(
            itemsPath.concat(i).concat('dncp').concat('codigoNivelGeneral'),
          );
        });
      }
    }

    // E719 - data.items.cdcAnticipo
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

    // E720 - data.items.monto
    {
      /*
      Obligatorio si C002 ≠ 7
      No informar si C002 = 7
      */
      if (!isElectronicRemissionNote) {
        data.items.forEach((_item, i) => {
          validator.requiredField(itemsPath.concat(i).concat('monto'));
        });
      } else {
        data.items.forEach((_item, i) => {
          validator.undesiredField(itemsPath.concat(i).concat('monto'));
        });
      }
    }

    // E725 - data.items.cambio
    {
      /*
      Obligatorio si D017 = 2
      No informar si D017 = 1
      */
      if (currencyChangeConditionIsPerItem) {
        data.items.forEach((_item, i) => {
          validator.requiredField(
            itemsPath.concat(i).concat('monto').concat('cambio'),
          );
        });
      } else if (currencyChangeConditionIsGlobal) {
        data.items.forEach((_item, i) => {
          validator.undesiredField(
            itemsPath.concat(i).concat('monto').concat('cambio'),
          );
        });
      }
    }

    // E730 - data.items.impuesto
    {
      /*
      Obligatorio si D013=1, 3, 4 o 5 y C002 ≠ 4 o 7
      No informar si D013=2 y C002= 4
      */
      if (
        (taxIsIVA || taxIsRent || taxIsNone || taxIsIvaRent) &&
        !isAutoInvoice &&
        !isElectronicRemissionNote
      ) {
        data.items.forEach((_item, i) => {
          validator.requiredField(itemsPath.concat(i).concat('impuesto'));
        });
      } else if (taxIsISC && isAutoInvoice) {
        data.items.forEach((_item, i) => {
          validator.undesiredField(itemsPath.concat(i).concat('impuesto'));
        });
      }
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

    const totalItemsPrice = data.items.reduce(
      (acc, item) => acc + (item.monto?.precioUnitario || 0) * item.cantidad,
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

      return globalDiscountItemUnit;
    };

    // EA008 - totalOperacion
    const calcTotalOperacion = (
      itemQuantity_E711: number,
      itemAmmountData: Monto | undefined,
    ) => {
      /*
      Si D013 = 1, 3, 4 o 5 (afectado al
      IVA, Renta, ninguno, IVA - Renta),
      entonces EA008 corresponde al
      cálculo aritmético: 
      (
        E721 (Precio unitario) – 
        EA002 (Descuento particular) – 
        EA004 (Descuento global) – 
        EA006 (Anticipo particular) – 
        EA007 (Anticipo global)
      ) * E711(cantidad)
      Cálculo para Autofactura (C002=4):
      E721*E711
      */

      if (!itemAmmountData) return 0;

      const itemPrice = isAutoInvoice
        ? itemAmmountData.precioUnitario
        : itemAmmountData.precioUnitario -
          data.descuentoGlobal -
          data.anticipoGlobal -
          (itemAmmountData.descuento || 0) -
          (itemAmmountData.anticipo || 0);

      // TODO_TEST: que pasa si es ISC y no es auto-factura? ahora retorna 0, pero no se como se debería de tratar

      if (
        [
          TaxType.IVA,
          TaxType.RENTA,
          TaxType.NINGUNO,
          TaxType.IVA___RENTA,
        ].includes(data.tipoImpuesto)
      ) {
        return itemPrice * itemQuantity_E711;
      }
      if (isAutoInvoice) {
        return itemPrice * itemQuantity_E711;
      }

      return 0;
    };

    // EA009 - totalOperacionGuaranies
    const calcTotalOperacionGuaranies = (
      totalOperacion_EA008: number,
      currencyChange_E725: number | undefined,
    ) => {
      if (!currencyChange_E725) return 0;

      return totalOperacion_EA008 * currencyChange_E725;
    };

    // E735 - ivaBase
    const calcIvaBase = (
      itemTaxData: Impuesto,
      totalOperacion_EA008: number,
    ) => {
      /*
      Si E731 = 1 o 4 este campo es igual al resultado del cálculo:
      [100 * EA008 * E733] / [10000 + (E734 * E733)]

      Si E731 = 2 o 3 este campo es igual 0

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
      */

      /**E731 = 1 */
      const isGravado = itemTaxData.ivaTipo == TaxTreatment.GRAVADO_IVA;
      /**E731 = 2 */
      const isExonerado =
        itemTaxData.ivaTipo ==
        TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_;
      /**E731 = 3 */
      const isExento = itemTaxData.ivaTipo == TaxTreatment.EXENTO;
      /**E731 = 4 */
      const isGravadoParcial =
        itemTaxData.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_;

      if (isGravado || isGravadoParcial) {
        return (
          (100 * totalOperacion_EA008 * itemTaxData.proporcionGravada) /
          (10000 + itemTaxData.iva * itemTaxData.proporcionGravada)
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
    const calcLiquidacionIvaPorItem = (
      iva_E734: number,
      ivaBase_E735: number,
    ) => {
      /*
      Corresponde al cálculo aritmético:
      E735 * (E734/100)
      Si E731 = 2 o 3 este campo es
      igual 0
      */
      // esto resume el calculo
      // si es exonerado o exento (E731 = 2 o 3) iva cera 0 y el resto son matemáticas
      return ivaBase_E735 * (iva_E734 / 100);
    };

    // E737 - baseExentaIva
    // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
    const calcBaseExentaIva = (
      itemTaxData: Impuesto,
      totalOperacion_EA008: number,
    ) => {
      /*
      Si E731 = 4 este campo es igual al resultado del cálculo:
      [100 * EA008 * (100 – E733)] / [10000 + (E734 * E733)]

      Si E731 = 1 , 2 o 3 este campo es igual 0 
      */

      /**E731 = 1 */
      const isGravado = itemTaxData.ivaTipo == TaxTreatment.GRAVADO_IVA;
      /**E731 = 2 */
      const isExonerado =
        itemTaxData.ivaTipo ==
        TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_;
      /**E731 = 3 */
      const isExento = itemTaxData.ivaTipo == TaxTreatment.EXENTO;
      /**E731 = 4 */
      const isGravadoParcial =
        itemTaxData.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_;

      if (isGravadoParcial) {
        return (
          (100 * totalOperacion_EA008 * (100 - itemTaxData.proporcionGravada)) /
          (10000 + itemTaxData.iva * itemTaxData.proporcionGravada)
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
      const totalItemPrice = (item.monto?.precioUnitario || 0) * item.cantidad;
      const percentageInAllItems = (totalItemPrice * 100) / totalItemsPrice;

      const descuentoGlobalItem = calcDescuentoGlobalItem(
        item,
        percentageInAllItems,
      );
      const anticipoGlobalItem = calcAnticipoGlobalItem(
        item,
        percentageInAllItems,
      );

      const totalOperacion = calcTotalOperacion(item.cantidad, item.monto);

      // E720
      let monto;
      if (item.monto) {
        const totalOperacionGuaranies = calcTotalOperacionGuaranies(
          totalOperacion,
          item.monto.cambio,
        );

        monto = {
          ...item.monto,

          /**EA004 */
          descuentoGlobalItem,

          /**EA007 */
          anticipoGlobalItem,

          /**EA008 */
          totalOperacion,

          /**EA009 */
          totalOperacionGuaranies,
        };
      }

      // E730
      let impuesto;
      if (item.impuesto) {
        const ivaBase = calcIvaBase(item.impuesto, totalOperacion);
        const baseExentaIva = calcBaseExentaIva(item.impuesto, totalOperacion);

        impuesto = {
          ...item.impuesto,

          /**E735 */
          ivaBase,

          /**E736 */
          liquidacionIvaPorItem: calcLiquidacionIvaPorItem(
            item.impuesto.iva,
            ivaBase,
          ),

          /**E737 */
          baseExentaIva,
        };
      }

      return {
        ...item,
        monto,
        impuesto,
      } satisfies CompleteItem;
    });

    return {
      ...data,

      // A002 y A003 se definen en EDocSchema

      // A005
      sistemaDeFacturacion: 1,

      // B003
      descripcionEmision: dbService.emissionTypes._findById(data.tipoEmision)
        .description,

      // C003
      descripcionDocumento: dbService.eDocumentTypes._findById(
        data.tipoDocumento,
      ).description,

      // C004 se define en EDocSchema y C008 en EDocParamsSchema

      // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
      // D012
      descripcionTipoTransaccion: dbService.transactionTypes._findById(
        data.tipoTransaccion,
      ).description,

      // D014
      descripcionTipoImpuesto: dbService.taxTypes._findById(data.tipoImpuesto)
        .description,

      // D016
      descripcionMoneda: dbService.currencies._findById(data.moneda)
        .description,

      // D020
      descripcionCondicionAnticipo:
        dbService.advancePaymentConditions._findByIdIfExist(
          data.condicionAnticipo,
        )?.description,

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
