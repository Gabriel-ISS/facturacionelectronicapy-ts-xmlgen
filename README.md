# Facturación Electrónica - Generación de XML para la SET (Paraguay)

Módulo NodeJS que genera el **archivo XML** para enviar a la **SET** _(Subsecretaria de Estado de Tributación del Ministerio de Hacienda)_ para el proceso y generación del documento electrónico, a partir de una estructura de datos en formato JSON.

Versión del Manual Técnico: **150**.

Basado en la [documentación técnica de e-kuatia](https://www.dnit.gov.py/web/e-kuatia/documentacion-tecnica)

Este paquete pretende servir de **modelo de transferencia estandarizado** para la comunicación con la **SET** contemplando la totalidad de los campos exigidos para cada bloque y tipos de documentos electrónicos.

El mismo es utilizado y mantenido por el autor y otorgado a la comunidad de desarrolladores de forma gratuita bajo licencia **MIT**

El módulo está preparado de forma a proveer una fácil integración dentro de su entorno **NodeJS** y con cualquier otro lenguaje, sistema o librería que lo requiera, por ejemplo publicando el método desde un REST.

## Indices
- [Características](#características)
- [Instalación](#instalación)
- [Ejemplo de uso](#ejemplo-de-uso)
  - [Generación de documento electrónico](#generación-de-documento-electrónico)
  - [Generación de evento](#generación-de-evento)
  - [Base de datos](#base-de-datos)
- [Estructuras](#estructuras)
  - [Estructura de `params`](#estructura-de-params)
  - [Estructura de `data`](#estructura-de-data)
  - [Estructura de `config`](#estructura-de-config)
- [Base de datos](#base-de-datos)
- [Proyectos relacionados](#proyectos-relacionados)

## Características

- Genera el CDC automáticamente de acuerdo a los datos del documento electrónico
- Implementa el Algoritmo del dígito verificador del CDC
- Permite sobrescribir el valor del código de seguridad, de acuerdo a las necesidades del implementador
- Realiza la validación de los datos de entrada conforme el manual técnico de la SET

## Instalación

Para instalar el módulo en su proyecto node, ejecute el siguiente comando:

```bash
  npm install facturacionelectronicapy-xmlgen
```

## Ejemplo de uso

### Generación de documento electrónico

El método requiere 2 argumentos tipo **JSON** para general el XML. El primero es un argumento `params` con las informaciones estáticas del Contribuyente emisor, y el segundo es `data` con los datos variables para cada documento electrónico a generar.


```ts
import EDocument from 'facturacionelectronicapy-ts-xmlgen';

// incluye todos los esquemas y el tipo de resultado de cada uno
import * as EDSchemas from 'facturacionelectronicapy-ts-xmlgen/schemas';

// incluye todos los enums que puedes usar en el documento
import * as EDTypes from 'facturacionelectronicapy-ts-xmlgen/types';

const params: EDSchemas.EDocParamsInput = {};
const data: EDSchemas.EDocDataInput = {};
const options: EDTypes.XmlGenConfig = {};

try {
  const xml = await EDocument.generateXMLDocument(params, data, options);
  console.log(xml);
} catch (error) {
  console.log(error);
}
```

### Generación de evento

```ts
import * as EDTypes from 'facturacionelectronicapy-ts-xmlgen/types';
import EDocument from 'facturacionelectronicapy-ts-xmlgen';

const id: number = 0;
const data: EDTypes.EventData = {...};

try {
  const xml = await EDocument.generateXMLEvent(id, data);
} catch (error) {
  console.log(error);
}

```


### Base de datos

```ts
import EDocument from 'facturacionelectronicapy-ts-xmlgen';
import EDTypes from 'facturacionelectronicapy-ts-xmlgen/types';

// retorna el sevicio de base de datos
const db = EDocument.db();

// resultado: ['_id', 'description']
const documentTypesHeaders = db.documentTypes.headers;
// tipo del resultado: [EDocumentType, string][]
const documentTypesRows = db.documentTypes.data;

// resultado: { _id: 1, description: 'Factura electrónica' }
const elctronicInvoiceData = await db.documentTypes.findById(EDTypes.EDocumentType.FACTURA_ELECTRONICA);
```

## Estructuras

### Estructura de `params`

```ts
type EDocParamsInput = {
  ruc: string;
  tipoContribuyente: TaxpayerType;
  // en abiente de pruebas "DE generado en ambiente de prueba - sin valor comercial ni fiscal"
  razonSocial: string;
  establecimientos: {
    codigo: number;
    direccion: string;
    departamento: Department;
    ciudad: number;
    telefono: string;
    email: string;
    numeroCasa?: number; // por defecto 0
    complementoDireccion1?: string;
    complementoDireccion2?: string;
    distrito?: number;
    denominacion?: string;
  }[];
  // VER: https://servicios.set.gov.py/eset-publico/consultarActividadEconomicaIService.do
  actividadesEconomicas: {
    codigo: string;
    descripcion: string;
  }[];
  timbradoNumero: number;
  timbradoFecha: Date;
  tipoRegimen?: RegimeType;
  nombreFantasia?: string;
};
```

### Estructura de `data`

```ts
export type EDocDataInput = {
  cdc?: string; // obligatorio si no se proporciona el código de seguridad aleatorio
  fechaFirmaDigital?: Date;
  tipoEmision?: EmissionType;
  codigoSeguridadAleatorio?: number;
  observacion?: string;
  descripcion?: string;
  tipoDocumento?: EDocumentType;
  establecimiento?: number;
  punto?: number;
  numero?: number;
  serie?: string;
  fecha?: Date;
  tipoTransaccion?: TransactionType;
  tipoImpuesto?: TaxType;
  moneda?: Currency;
  condicionTipoCambio?: GlobalAndPerItem;
  cambio?: number;
  condicionAnticipo?: GlobalAndPerItem;
  obligaciones?: {
    codigo: Obligation;
  };
  descuentoGlobal?: number;
  anticipoGlobal?: number;
  usuario?: {
    documentoTipo?: IdentityDocumentUser;
    documentoTipoDescripcion?: string;
    documentoNumero?: string;
    nombre?: string;
    cargo?: string;
  };
  cliente?: {
    codigo?: string;
    distrito?: number;
    documentoTipo?: IdentityDocumentReceptor;
    documentoNumero?: string;
    contribuyente?: boolean;
    tipoOperacion?: OperationType;
    pais?: Country;
    tipoContribuyente?: TaxpayerType;
    ruc?: string;
    descripcionTipoDocumento?: string;
    razonSocial?: string;
    nombreFantasia?: string;
    direccion?: string;
    telefono?: string;
    celular?: string;
    email?: string;
    numeroCasa?: number;
    departamento?: Department;
    ciudad?: number;
  };
  factura?: {
    presencia?: PresenceIndicator;
    descripcionPresencia?: string;
    fechaEnvio?: Date;
  };
  dncp?: {
    fecha?: Date;
    modalidad?: string;
    entidad?: number;
    año?: number;
    secuencia?: number;
  };
  autoFactura?: {
    distrito?: number;
    documentoTipo?: IdentityDocumentCarrier;
    documentoNumero?: string;
    nombre?: string;
    direccion?: string;
    numeroCasa?: number;
    departamento?: Department;
    ciudad?: number;
    tipoVendedor?: SellerNatureSelfInvoicing;
    ubicacion?: {
      distrito?: number;
      departamento?: Department;
      ciudad?: number;
      lugar?: string;
    };
  };
  notaCreditoDebito?: {
    motivo?: CreditNoteReason;
  };
  remision?: {
    motivo?: RemissionReason;
    motivoDescripcion?: string;
    tipoResponsable?: FreightResponsible;
    kms?: number;
    fechaFactura?: Date;
    costoFlete?: number;
  };
  condicion?: {
    tipo?: PaymentCondition;
    entregas?: {
      tipoDescripcion: string;
      monedaDescripcion: string;
      monto: number;
      moneda: Currency;
      tipo: PaymentType;
      cambio?: number;
      infoTarjeta?: {
        tipoDescripcion: string;
        rucID: string;
        rucDV: string;
        tipo: CreditCard;
        medioPago: CreditCardProcessingMethod;
        numero?: number;
        razonSocial?: string;
        ruc?: string;
        codigoAutorizacion?: number;
        titular?: string;
      };
      infoCheque?: {
        numeroCheque: string;
        banco: string;
      };
    }[];
    credito?: {
      tipo?: CreditType;
      plazo?: string;
      cuotas?: number;
      infoCuotas?: {
        monedaDescripcion: string;
        monto: number;
        moneda: Currency;
        vencimiento?: string;
      };
    };
  };
  items?: {
    codigo?: string;
    partidaArancelaria?: number;
    ncm?: number;
    dncp?: {
      codigoNivelGeneral?: number;
      codigoNivelEspecifico?: string;
      codigoGtinProducto?: number;
      codigoNivelPaquete?: number;
    };
    descripcion?: string;
    unidadMedida?: MeasurementUnit;
    cantidad?: number;
    pais?: Country;
    observacion?: string;
    tolerancia?: MerchandiseRelevance;
    toleranciaCantidad?: number;
    toleranciaPorcentaje?: number;
    cdcAnticipo?: string;
    monto?: {
      precioUnitario?: number;
      cambio?: number;
      descuento?: number;
      anticipo?: number;
    };
    impuesto?: {
      ivaTipo?: TaxTreatment;
      proporcionGravada?: number;
      iva?: TaxRate;
    };
    lote?: string;
    vencimiento?: Date;
    numeroSerie?: string;
    numeroPedido?: string;
    numeroSeguimiento?: string;
    registroSenave?: string;
    registroEntidadComercial?: string;
    nombreProducto?: string;
    sectorAutomotor?: {
      tipo?: VehicleOperationType;
      chasis?: string;
      color?: string;
      potencia?: number;
      capacidadMotor?: number;
      pesoNeto?: number;
      pesoBruto?: number;
      tipoCombustible?: FuelType;
      tipoCombustibleDescripcion?: string;
      numeroMotor?: string;
      capacidadTraccion?: number;
      año?: number;
      tipoVehiculo?: string;
      capacidadPasajeros?: number;
      cilindradas?: string;
    };
  }[];
  sectorEnergiaElectrica?: {
    numeroMedidor?: string;
    codigoActividad?: number;
    codigoCategoria?: string;
    lecturaAnterior?: number;
    lecturaActual?: number;
  };
  sectorSeguros?: {
    codigoAseguradora?: string;
    codigoPoliza?: string;
    vigenciaUnidad?: string;
    vigencia?: number;
    numeroPoliza?: string;
    inicioVigencia?: Date;
    finVigencia?: Date;
    codigoInternoItem?: string;
  };
  sectorSupermercados?: {
    nombreCajero?: string;
    efectivo?: number;
    vuelto?: number;
    donacion?: number;
    donacionDescripcion?: string;
  };
  sectorAdicional?: {
    ciclo?: string;
    inicioCiclo?: Date;
    finCiclo?: Date;
    vencimientoPago?: Date;
    numeroContrato?: string;
    saldoAnterior?: number;
    codigoContratacionDncp?: string;
  };
  transporte?: {
    modalidad?: TransportModality;
    tipoResponsable?: FreightResponsible;
    tipo?: TransportType;
    condicionNegociacion?: TradingCondition;
    numeroManifiesto?: string;
    numeroDespachoImportacion?: string;
    inicioEstimadoTranslado?: Date;
    finEstimadoTranslado?: Date;
    paisDestino?: Country;
    salida?: {
      distrito?: number;
      direccion?: string;
      numeroCasa?: number;
      departamento?: Department;
      ciudad?: number;
      complementoDireccion1?: string;
      complementoDireccion2?: string;
      telefonoContacto?: string;
    };
    entrega?: {
      distrito?: number;
      direccion?: string;
      numeroCasa?: number;
      departamento?: Department;
      ciudad?: number;
      complementoDireccion1?: string;
      complementoDireccion2?: string;
      telefonoContacto?: string;
    };
    vehiculo?: {
      documentoTipo?: VehicleIdentification;
      documentoNumero?: string;
      tipo?: string;
      marca?: string;
      obs?: string;
      numeroMatricula?: string;
      numeroVuelo?: string;
    };
    transportista?: {
      documentoTipo?: IdentityDocumentCarrier;
      documentoNumero?: string;
      nombre?: string;
      contribuyente?: boolean;
      pais?: Country;
      ruc?: string;
      direccion?: string;
      chofer?: {
        documentoNumero?: string;
        nombre?: string;
        direccion?: string;
      };
      agente?: {
        nombre?: string;
        ruc?: string;
        direccion?: string;
      };
    };
  };
  comision?: number;
  documentoAsociado?: {
    formatoDescripcion: string;
    tipoDocumentoImpresoDescripcion: string;
    constanciaTipoDescripcion: string;
    formato: AssociatedDocumentType;
    cdc?: string;
    timbrado?: number;
    establecimiento?: string;
    punto?: string;
    numero?: string;
    tipoDocumentoImpreso?: PrintedDocumentType;
    fecha?: string;
    numeroRetencion?: string;
    resolucionCreditoFiscal?: string;
    constanciaTipo?: ConstancyType;
    constanciaNumero?: number;
    constanciaControl?: string;
    rucFusionado?: string;
  };
  complementarios?: {
    ordenCompra?: string;
    ordenVenta?: string;
    numeroAsiento?: string;
    carga?: {
      unidadMedidaVolumenTotal?: MeasurementUnit;
      volumenTotal?: number;
      unidadMedidaPesoTotal?: MeasurementUnit;
      pesoTotal?: number;
      caracteristicaCarga?: CargoCharacteristic;
      caracteristicaCargaDescripcion?: string;
    };
  };
};
```

```json
{
  "tipoDocumento": 1,
  "establecimiento": "001",
  "codigoSeguridadAleatorio": "298398",
  "punto": "001",
  "numero": "0000001",
  "descripcion": "Aparece en el documento",
  "observacion": "Cualquier informacion de marketing, publicidad, sorteos, promociones para el Receptor",
  "fecha": "2022-08-14T10:11:00",
  "tipoEmision": 1,
  "tipoTransaccion": 1,
  "tipoImpuesto": 1,
  "moneda": "PYG",
  "condicionAnticipo": 1,
  "condicionTipoCambio": 1,
  "descuentoGlobal": 0,
  "anticipoGlobal": 0,
  "cambio": 6700,
  "cliente": {
    "contribuyente": true,
    "ruc": "2005001-1",
    "razonSocial": "Marcos Adrian Jara Rodriguez",
    "nombreFantasia": "Marcos Adrian Jara Rodriguez",
    "tipoOperacion": 1,
    "direccion": "Avda Calle Segunda y Proyectada",
    "numeroCasa": "1515",
    "departamento": 11,
    "departamentoDescripcion": "ALTO PARANA",
    "distrito": 143,
    "distritoDescripcion": "DOMINGO MARTINEZ DE IRALA",
    "ciudad": 3344,
    "ciudadDescripcion": "PASO ITA (INDIGENA)",
    "pais": "PRY",
    "paisDescripcion": "Paraguay",
    "tipoContribuyente": 1,
    "documentoTipo": 1,
    "documentoNumero": "2324234",
    "telefono": "061-575903",
    "celular": "0973-809103",
    "email": "cliente@empresa.com, cliente@personal.com",
    "codigo": "1548"
  },
  "usuario": {
    "documentoTipo": 1,
    "documentoNumero": "157264",
    "nombre": "Marcos Jara",
    "cargo": "Vendedor"
  },
  "factura": {
    "presencia": 1,
    "fechaEnvio": "2023-10-21",
    "dncp": {
      "modalidad": "ABC",
      "entidad": 1,
      "año": 2021,
      "secuencia": 3377,
      "fecha": "2022-09-14T10:11:00"
    }
  },
  "autoFactura": {
    "tipoVendedor": 1,
    "documentoTipo": 1,
    "documentoNumero": 1,
    "nombre": "Vendedor autofactura",
    "direccion": "Vendedor autofactura",
    "numeroCasa": "Vendedor autofactura",
    "departamento": 11,
    "departamentoDescripcion": "ALTO PARANA",
    "distrito": 143,
    "distritoDescripcion": "DOMINGO MARTINEZ DE IRALA",
    "ciudad": 3344,
    "ciudadDescripcion": "PASO ITA (INDIGENA)",
    "transaccion": {
      "lugar": "Donde se realiza la transaccion",
      "departamento": 11,
      "departamentoDescripcion": "ALTO PARANA",
      "distrito": 143,
      "distritoDescripcion": "DOMINGO MARTINEZ DE IRALA",
      "ciudad": 3344,
      "ciudadDescripcion": "PASO ITA (INDIGENA)"
    }
  },
  "notaCreditoDebito": {
    "motivo": 1
  },
  "remision": {
    "motivo": 1,
    "tipoResponsable": 1,
    "kms": 150,
    "fechaFactura": "2022-08-21"
  },
  "condicion": {
    "tipo": 1,
    "entregas": [
      {
        "tipo": 1,
        "monto": "150000",
        "moneda": "PYG",
        "cambio": 0
      },
      {
        "tipo": 3,
        "monto": "150000",
        "moneda": "PYG",
        "cambio": 0,
        "infoTarjeta": {
          "tipo": 1,
          "tipoDescripcion": "Dinelco",
          "titular": "Marcos Jara",
          "ruc": "6969549654-1",
          "razonSocial": "Bancard",
          "medioPago": 1,
          "codigoAutorizacion": 232524234
        }
      },
      {
        "tipo": 2,
        "monto": "150000",
        "moneda": "PYG",
        "cambio": 0,
        "infoCheque": {
          "numeroCheque": "32323232",
          "banco": "Sudameris"
        }
      }
    ],
    "credito": {
      "tipo": 1,
      "plazo": "30 días",
      "cuotas": 2,
      "montoEntrega": 1500000.0,
      "infoCuotas": [
        {
          "moneda": "PYG",
          "monto": 800000.0,
          "vencimiento": "2021-10-30"
        },
        {
          "moneda": "PYG",
          "monto": 800000.0,
          "vencimiento": "2021-11-30"
        }
      ]
    }
  },
  "items": [
    {
      "codigo": "A-001",
      "descripcion": "Producto o Servicio",
      "observacion": "Información adicional o complementaria sobre el producto",
      "partidaArancelaria": 4444,
      "ncm": "ABCD1234",
      "unidadMedida": 77,
      "cantidad": 10.5,
      "precioUnitario": 10800,
      "cambio": 0,
      "descuento": 0,
      "anticipo": 0,
      "pais": "PRY",
      "paisDescripcion": "Paraguay",
      "tolerancia": 1,
      "toleranciaCantidad": 1,
      "toleranciaPorcentaje": 1,
      "cdcAnticipo": "44digitos",
      "dncp": {
        "codigoNivelGeneral": "12345678",
        "codigoNivelEspecifico": "1234",
        "codigoGtinProducto": "12345678",
        "codigoNivelPaquete": "12345678"
      },
      "ivaTipo": 1,
      "ivaBase": 100,
      "iva": 5,
      "lote": "A-001",
      "vencimiento": "2022-10-30",
      "numeroSerie": "",
      "numeroPedido": "",
      "numeroSeguimiento": "",
      "importador": {
        "nombre": "Importadora Parana S.A.",
        "direccion": "Importadora Parana S.A.",
        "registroImportador": "Importadora Parana S.A."
      },
      "registroSenave": "323223",
      "registroEntidadComercial": "RI-32/22",
      "sectorAutomotor": {
        "tipo": 1,
        "chasis": "45252345235423532",
        "color": "Rojo",
        "potencia": 1500,
        "capacidadMotor": 5,
        "capacidadPasajeros": 5,
        "pesoBruto": 10000,
        "pesoNeto": 8000,
        "tipoCombustible": 9,
        "tipoCombustibleDescripcion": "Vapor",
        "numeroMotor": "323234234234234234",
        "capacidadTraccion": 151.01,
        "año": 2009,
        "tipoVehiculo": "Camioneta",
        "cilindradas": "3500"
      }
    }
  ],
  "sectorEnergiaElectrica": {
    "numeroMedidor": "132423424235425",
    "codigoActividad": 125,
    "codigoCategoria": "001",
    "lecturaAnterior": 4,
    "lecturaActual": 5
  },
  "sectorSeguros": {
    "codigoAseguradora": "",
    "codigoPoliza": "AAAA",
    "numeroPoliza": "BBBB",
    "vigencia": 1,
    "vigenciaUnidad": "año",
    "inicioVigencia": "2021-10-01",
    "finVigencia": "2022-10-01",
    "codigoInternoItem": "A-001"
  },
  "sectorSupermercados": {
    "nombreCajero": "Juan Antonio Caceres",
    "efectivo": 150000,
    "vuelto": 30000,
    "donacion": 1000,
    "donacionDescripcion": "Donado para la caridad"
  },
  "sectorAdicional": {
    "ciclo": "Mensualidad",
    "inicioCiclo": "2021-09-01",
    "finCiclo": "2021-10-01",
    "vencimientoPago": "2021-11-01",
    "numeroContrato": "AF-2541",
    "saldoAnterior": 1550000
  },
  "transporte": {
    "tipo": 1,
    "modalidad": 1,
    "tipoResponsable": 1,
    "condicionNegociacion": "CFR",
    "numeroManifiesto": "AF-2541",
    "numeroDespachoImportacion": "153223232332",
    "inicioEstimadoTranslado": "2021-11-01",
    "finEstimadoTranslado": "2021-11-01",
    "paisDestino": "PRY",
    "paisDestinoNombre": "Paraguay",
    "salida": {
      "direccion": "Paraguay",
      "numeroCasa": "Paraguay",
      "complementoDireccion1": "Entre calle 2",
      "complementoDireccion2": "y Calle 7",
      "departamento": 11,
      "departamentoDescripcion": "ALTO PARANA",
      "distrito": 143,
      "distritoDescripcion": "DOMINGO MARTINEZ DE IRALA",
      "ciudad": 3344,
      "ciudadDescripcion": "PASO ITA (INDIGENA)",
      "pais": "PRY",
      "paisDescripcion": "Paraguay",
      "telefonoContacto": "097x"
    },
    "entrega": {
      "direccion": "Paraguay",
      "numeroCasa": "Paraguay",
      "complementoDireccion1": "Entre calle 2",
      "complementoDireccion2": "y Calle 7",
      "departamento": 11,
      "departamentoDescripcion": "ALTO PARANA",
      "distrito": 143,
      "distritoDescripcion": "DOMINGO MARTINEZ DE IRALA",
      "ciudad": 3344,
      "ciudadDescripcion": "PASO ITA (INDIGENA)",
      "pais": "PRY",
      "paisDescripcion": "Paraguay",
      "telefonoContacto": "097x"
    },
    "vehiculo": {
      "tipo": 1,
      "marca": "Nissan",
      "documentoTipo": 1,
      "documentoNumero": "232323-1",
      "obs": "",
      "numeroMatricula": "ALTO PARANA",
      "numeroVuelo": 143
    },
    "transportista": {
      "contribuyente": true,
      "nombre": "Paraguay",
      "ruc": "80068684-1",
      "documentoTipo": 1,
      "documentoNumero": "99714584",
      "direccion": "y Calle 7",
      "obs": 11,
      "pais": "PRY",
      "paisDescripcion": "Paraguay",
      "chofer": {
        "documentoNumero": "",
        "nombre": "Jose Benitez",
        "direccion": "Jose Benitez"
      },
      "agente": {
        "nombre": "Jose Benitez",
        "ruc": "515415-1",
        "direccion": "Jose Benitez"
      }
    }
  },
  "complementarios": {
    "ordenCompra": "",
    "ordenVenta": "",
    "numeroAsiento": "",
    "carga": {
      "ordenCompra": "",
      "ordenVenta": "",
      "numeroAsiento": ""
    }
  },
  "documentoAsociado": {
    "formato": 1,
    "cdc": "01800695631001001000000612021112917595714694",
    "tipo": 1,
    "timbrado": "32323",
    "establecimiento": "001",
    "punto": "001",
    "numero": "00278211",
    "fecha": "2022-09-14",
    "numeroRetencion": "32323232",
    "resolucionCreditoFiscal": "32323",
    "constanciaTipo": 1,
    "constanciaNumero": 32323,
    "constanciaControl": "33232323"
  }
}
```

### Estructura de `config`

```ts
export type XmlGenConfig = {
  /**
   * En consideración a la Resolución 347 del 2014 (Secretaría de Defensa del Consumidor - SEDECO).
   * Resta a los valores de la sección F un valor menor a 50, para que sea múltiplo de 50 guaranies.
   * VER: https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907
   */
  redondeoSedeco?: boolean;
  decimals?: number;
  taxDecimals?: number;
  pygDecimals?: number;
  pygTaxDecimals?: number;
  /**
   * Cantidad de decimales para resultados parciales
   * de base de impuestos (dBasExe, dBasGravIva, dLiqIVAItem)
   */
  partialTaxDecimals?: number;
  userObjectRemove?: boolean;
  /**
   * Indica si se debe generar XML en formato de TEST, por default false,
   * a partir del 21/04/2023
   */
  test: boolean;
};
```

### Estructuta de los distintos eventos

```ts
export type EventData =
  | {
      event: SIFENEvent.CANCELACION;
      cdc?: string;
      motivo?: string;
    }
  | {
      event: SIFENEvent.INUTILIZACION;
      motivo?: string;
      timbrado?: number;
      establecimiento?: number;
      punto?: number;
      desde?: number;
      hasta?: number;
      tipoDocumento?: EDocumentType;
      serie?: string;
    }
  | {
      event: SIFENEvent.CONFORMIDAD;
      cdc?: string;
      tipoConformidad?: ConformityType;
      fechaRecepcion?: any;
    }
  | {
      event: SIFENEvent.DISCONFORMIDAD;
      cdc?: string;
      motivo?: string;
    }
  | {
      event: SIFENEvent.DESCONOCIMIENTO;
      cdc?: string;
      motivo?: string;
      fechaRecepcion?: any;
      fechaEmision?: any;
      contribuyente?: boolean;
      nombre?: string;
      ruc?: string;
      documentoTipo?: IdentityDocumentCarrier;
      documentoNumero?: string;
    }
  | {
      event: SIFENEvent.NOTIFICACION;
      cdc?: string;
      fechaRecepcion?: any;
      fechaEmision?: any;
      contribuyente?: boolean;
      nombre?: string;
      ruc?: string;
      documentoTipo?: IdentityDocumentCarrier;
      documentoNumero?: string;
      totalPYG?: number;
    }
  | {
      event: SIFENEvent.NOMINACION;
      cdc?: string;
      contribuyente?: boolean;
      ruc?: string;
      documentoTipo?: IdentityDocForNominationEvent;
      documentoNumero?: string;
      motive?: string;
      pais?: Country;
      tipoReceptor?: TaxpayerType;
      descripcionTipoDocumento?: string;
      razonSocial?: string;
      nombreFantasia?: string;
      direccion?: string;
      numeroCasa?: number;
      departamento?: Department;
      distrito?: number;
      ciudad?: number;
      telefono?: string;
      celular?: string;
      email?: string;
      codigo?: string;
      tipoOperacion?: OperationTypeNoB2G;
    }
  | {
      event: SIFENEvent.ACTUALIZACION_DATOS_TRANSPORTE;
      cdc?: string;
      motivo?: TransportUpdateMotive;
      entrega?: {
        departamento?: Department;
        distrito?: number;
        ciudad?: number;
        direccion?: string;
        numeroCasa?: number;
        direccionComplementaria1?: string;
        tipoTransporte?: TransportType;
        modalidadTransporte?: TransportModality;
        vehiculo?: {
          tipo?: string;
          marca?: string;
          documentoTipo?: VehicleIdentification;
          documentoNumero?: string;
          numeroMatricula?: string;
        };
      };
      transportista?: {
        documentoTipo?: IdentityDocumentCarrier;
        documentoNumero?: string;
        nombre?: string;
        chofer?: { documentoNumero?: string; nombre?: string };
        contribuyente?: boolean;
        ruc?: string;
      };
    };
```

## Proyectos relacionados

- [Generación de XML (proyecto original)](https://www.npmjs.com/package/facturacionelectronicapy-xmlgen)
- [Firma de XML](https://www.npmjs.com/package/facturacionelectronicapy-xmlsign)
- [Generación de QR](https://www.npmjs.com/package/facturacionelectronicapy-qrgen)
- [API de la SET](https://www.npmjs.com/package/facturacionelectronicapy-setapi)
- [Generación KUDE](https://www.npmjs.com/package/facturacionelectronicapy-kude)
