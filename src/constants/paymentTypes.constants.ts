import { BasicData } from '../services/constants.service';

export enum PaymentType {
  EFECTIVO = 1,
  CHEQUE = 2,
  TARJETA_DE_CREDITO = 3,
  TARJETA_DE_DEBITO = 4,
  TRANSFERENCIA = 5,
  GIRO = 6,
  BILLETERA_ELECTRONICA = 7,
  TARJETA_EMPRESARIAL = 8,
  VALE = 9,
  RETENCION = 10,
  PAGO_POR_ANTICIPO = 11,
  VALOR_FISCAL = 12,
  VALOR_COMERCIAL = 13,
  COMPENSACION = 14,
  PERMUTA = 15,
  PAGO_BANCARIO = 16,
  PAGO_MOVIL = 17,
  DONACION = 18,
  PROMOCION = 19,
  CONSUMO_INTERNO = 20,
  PAGO_ELECTRONICO = 21,
  OTRO = 99,
}

export const paymentTypes: BasicData<PaymentType>[] = [
  {
    _id: PaymentType.EFECTIVO,
    description: 'Efectivo',
  },
  {
    _id: PaymentType.CHEQUE,
    description: 'Cheque',
  },
  {
    _id: PaymentType.TARJETA_DE_CREDITO,
    description: 'Tarjeta de crédito',
  },
  {
    _id: PaymentType.TARJETA_DE_DEBITO,
    description: 'Tarjeta de débito',
  },
  {
    _id: PaymentType.TRANSFERENCIA,
    description: 'Transferencia',
  },
  {
    _id: PaymentType.GIRO,
    description: 'Giro',
  },
  {
    _id: PaymentType.BILLETERA_ELECTRONICA,
    description: 'Billetera electrónica',
  },
  {
    _id: PaymentType.TARJETA_EMPRESARIAL,
    description: 'Tarjeta empresarial',
  },
  {
    _id: PaymentType.VALE,
    description: 'Vale',
  },
  {
    _id: PaymentType.RETENCION,
    description: 'Retención',
  },
  {
    _id: PaymentType.PAGO_POR_ANTICIPO,
    description: 'Pago por anticipo',
  },
  {
    _id: PaymentType.VALOR_FISCAL,
    description: 'Valor fiscal',
  },
  {
    _id: PaymentType.VALOR_COMERCIAL,
    description: 'Valor comercial',
  },
  {
    _id: PaymentType.COMPENSACION,
    description: 'Compensación',
  },
  {
    _id: PaymentType.PERMUTA,
    description: 'Permuta',
  },
  {
    _id: PaymentType.PAGO_BANCARIO,
    description: 'Pago bancario',
  },
  {
    _id: PaymentType.PAGO_MOVIL,
    description: 'Pago Móvil',
  },
  {
    _id: PaymentType.DONACION,
    description: 'Donación',
  },
  {
    _id: PaymentType.PROMOCION,
    description: 'Promoción',
  },
  {
    _id: PaymentType.CONSUMO_INTERNO,
    description: 'Consumo Interno',
  },
  {
    _id: PaymentType.PAGO_ELECTRONICO,
    description: 'Pago Electrónico',
  },
  {
    _id: PaymentType.OTRO,
    description: 'Otro',
  },
];
