import { ZodError } from 'zod';
import EDocument, { EDocDataInput, EDocParamsInput } from '../src';
import { Country } from '../src/constants/countries.constants';
import { CreditCardProcessingMethod } from '../src/constants/creditCardProcessingMethods.constants';
import { CreditCard } from '../src/constants/creditCards.constants';
import { CreditType } from '../src/constants/creditTypes.constants';
import { Currency } from '../src/constants/curencies.constants';
import { Department } from '../src/constants/departments.constants';
import { ValidDocumentType } from '../src/constants/documentTypes.constants';
import { IdentityDocumentReceptor } from '../src/constants/identityDocumentsReceptors.constants';
import { MeasurementUnit } from '../src/constants/measurementUnits.constants';
import { PaymentCondition } from '../src/constants/paymentCondition.constants';
import { PaymentType } from '../src/constants/paymentTypes.constants';
import { PresenceIndicator } from '../src/constants/presenceIndicators.constants';
import { Taxpayer } from '../src/constants/taxpayer.constants';
import { TaxType } from '../src/constants/taxTypes.constants';
import { UserIdentityDocument } from '../src/constants/userIdentityDocuments.constants';

const params: EDocParamsInput = {
  tipoContribuyente: Taxpayer.PERSONA_FISICA,
  razonSocial: 'Gabriel Sanabria',
  ruc: '5859019-9',
  establecimientos: [],
  actividadesEconomicas: [{
    codigo: '47112',
    descripcion: 'COMERCIO AL POR MENOR EN MINI MERCADOS Y DESPENSAS'
  }],
  timbradoNumero: '00000000',
  timbradoFecha: new Date(),
};

const data: EDocDataInput = {
  tipoDocumento: ValidDocumentType.FACTURA_ELECTRONICA,
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
    tipoContribuyente: Taxpayer.PERSONA_FISICA,
    //documentoTipo: IdentityDocumentReceptor.CEDULA_PARAGUAYA,
    //documentoNumero: '2324234',
    telefono: '000000',
    //celular: '0986 000000',
    //email: 'cliente@cliente.com',
    //codigo: '1548',
  },
  usuario: {
    documentoTipo: UserIdentityDocument.CEDULA_PARAGUAYA,
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
        cambio: 0,
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
        cambio: 0,
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
        cambio: 0,
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

EDocument.generateXMLDocument(params, data).then(xml => {
  console.log(xml);
}).catch(e => {
  if (e instanceof ZodError) {
    e.issues.forEach((issue, i) => {
      console.log(`${i + 1} - ${issue.message}`);
    });
  } else {
    throw e;
  }
});
