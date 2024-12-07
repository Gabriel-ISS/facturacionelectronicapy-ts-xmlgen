import { Country } from '../src/data/countries.table';
import { CreditCardProcessingMethod } from '../src/data/creditCardProcessingMethods.table';
import { CreditCard } from '../src/data/creditCards.table';
import { CreditType } from '../src/data/creditTypes.table';
import { Currency } from '../src/data/currencies.table';
import { Department } from '../src/data/departments.table';
import { EDocumentType } from '../src/data/eDocumentTypes.table';
import { IdentityDocumentUser } from '../src/data/idDocsUsers.table';
import { MeasurementUnit } from '../src/data/measurementUnits.table';
import { PaymentCondition } from '../src/data/paymentConditions.table';
import { PaymentType } from '../src/data/paymentTypes.table';
import { PresenceIndicator } from '../src/data/presenceIndicators.table';
import { TaxpayerType } from '../src/data/taxpayerTypes.table';
import { TaxType } from '../src/data/taxTypes.table';
import { EDocDataInput } from '../src/schemas/EDocData.schema';
import { EDocParamsInput } from '../src/schemas/EDocParams.schema';
import EDocument from '../src'
import { ZodError } from 'zod';
import { EventData } from '../src/services/EventXMLGenerator.service';
import { SIFENEvent } from '../src/types/Events';

const params: EDocParamsInput = {
  tipoContribuyente: TaxpayerType.PERSONA_FISICA,
  razonSocial: 'Gabriel Sanabria',
  ruc: '5859019-9',
  establecimientos: [
    {
      codigo: 1,
      direccion: 'Avda Calle Segunda y Proyectada',
      departamento: Department.ALTO_PARANA,
      ciudad: 3344,
      telefono: '100000',
      email: 'generadorde@generadorde.com',
    },
  ],
  actividadesEconomicas: [
    {
      codigo: '47112',
      descripcion: 'COMERCIO AL POR MENOR EN MINI MERCADOS Y DESPENSAS',
    },
  ],
  timbradoNumero: 10000000,
  timbradoFecha: new Date(),
};

const data: EDocDataInput = {
  codigoSeguridadAleatorio: 123456789,
  tipoDocumento: EDocumentType.FACTURA_ELECTRONICA,
  establecimiento: 1,
  punto: 1,
  numero: 5,
  //descripcion: 'Aparece en el documento',
  //observacion: 'Cualquier informacion de interes',
  fecha: new Date('2021-10-19T10:11:00'),
  //tipoEmision: EmissionType.NORMAL,
  //tipoTransaccion: TransactionType.VENTA_DE_MERCADERIA,
  tipoImpuesto: TaxType.IVA,
  //moneda: Currency.GUARANI,
  cliente: {
    contribuyente: true,
    ruc: '2005001-1',
    razonSocial: 'Marcos Adrian Jara Rodriguez',
    //nombreFantasia: 'Marcos Adrian Jara Rodriguez',
    tipoOperacion: 1,
    direccion: 'Avda Calle Segunda y Proyectada',
    numeroCasa: 1515,
    departamento: Department.ALTO_PARANA,
    distrito: 143,
    ciudad: 3344,
    pais: Country.PARAGUAY,
    tipoContribuyente: TaxpayerType.PERSONA_FISICA,
    //documentoTipo: IdentityDocumentReceptor.CEDULA_PARAGUAYA,
    //documentoNumero: '2324234',
    telefono: '100000',
    //celular: '0986 000000',
    //email: 'cliente@cliente.com',
    //codigo: '1548',
  },
  usuario: {
    documentoTipo: IdentityDocumentUser.CEDULA_PARAGUAYA,
    documentoNumero: '157264',
    nombre: 'Marcos Jara',
    cargo: 'Vendedor',
  },
  factura: {
    presencia: PresenceIndicator.OPERACION_PRESENCIAL,
  },
  condicion: {
    tipo: PaymentCondition.CREDITO,
    entregas: [
      {
        tipo: 1,
        monto: 150000,
        moneda: Currency.GUARANI,
      },
      {
        tipo: 3,
        monto: 150000,
        moneda: Currency.GUARANI,
        //cambio: 0,
        infoTarjeta: {
          numero: 1234,
          tipo: CreditCard.VISA,
          titular: 'Marcos Jara',
          ruc: '69695654-1',
          razonSocial: 'Bancard',
          medioPago: CreditCardProcessingMethod.POS,
          codigoAutorizacion: 232524234,
        },
      },
      {
        tipo: PaymentType.CHEQUE,
        monto: 150000,
        moneda: Currency.GUARANI,
        //cambio: 0,
        infoCheque: {
          numeroCheque: 32323232,
          banco: 'Sudameris',
        },
      },
    ],
    credito: {
      tipo: CreditType.PLAZO,
      plazo: '30 días',
      cuotas: 2,
      infoCuotas: [
        {
          moneda: Currency.GUARANI,
          monto: 800000,
          vencimiento: new Date('2021-10-30'),
        },
        {
          moneda: Currency.GUARANI,
          monto: 800000,
          vencimiento: new Date('2021-11-30'),
        },
      ],
    },
  },
  items: [
    {
      codigo: 'A-001',
      descripcion: 'Producto o Servicio',
      observacion: 'Cualquier informacion de interes',
      //ncm: 123456,
      unidadMedida: MeasurementUnit.UNIDAD,
      cantidad: 10.5,
      monto: {
        precioUnitario: 10800,
        //cambio: 0,
      },
      impuesto: {
        ivaTipo: 1,
        proporcionGravada: 100,
        iva: 5,
      },
      lote: 'A-001',
      vencimiento: new Date('2022-10-30'),
      //numeroSerie: '',
      //numeroPedido: '',
      //numeroSeguimiento: '',
    },
  ],
};

const eventData: EventData = {
  event: SIFENEvent.CANCELACION,
  cdc: '12345678901234567890123456789012345678901234',
  motivo: 'Cancelación por falta de pago',
}

async function sendRequest(test = true) {
  const baseURL = test
    ? 'https://sifen-test.set.gov.py/de/ws/'
    : 'https://sifen.set.gov.py/de/ws/';

  const endpoints = {
    enviar: `${baseURL}sync/recibe.wsdl`,
    enviarLote: `${baseURL}async/recibe-lote.wsdl`,
    evento: `${baseURL}eventos/evento.wsdl`,
    consulta: `${baseURL}consultas/consulta.wsdl`,
    consultaLote: `${baseURL}consultas/consulta-lote.wsdl`,
    consultaRuc: `${baseURL}consultas/consulta-ruc.wsdl`,
  };

  try {
    // Generar el XML que se enviará
    const xml = await EDocument.generateXMLDocument(params, data);
    //const xml = await EDocument.generateXMLEvent(1, eventData);
    console.log(xml);

    // Crear el cliente SOAP usando el WSDL
    /* const client = await soap.createClientAsync(endpoints.enviar); */

    // Llamar al método correspondiente con el XML generado
    /* const result = await client.NombreDelMetodoAsync({ xml });
    console.log('Respuesta del servicio:', result); */
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((issue, i) => {
        console.log(`${i + 1} - ${issue.message}`);
      });
    } else {
      console.error('Error en la solicitud:', error);
    }
  }
}

sendRequest();