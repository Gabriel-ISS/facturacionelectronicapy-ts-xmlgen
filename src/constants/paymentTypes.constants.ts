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
    id: PaymentType.EFECTIVO,
    description: 'Efectivo',
  },
  {
    id: PaymentType.CHEQUE,
    description: 'Cheque',
  },
  {
    id: PaymentType.TARJETA_DE_CREDITO,
    description: 'Tarjeta de crédito',
  },
  {
    id: PaymentType.TARJETA_DE_DEBITO,
    description: 'Tarjeta de débito',
  },
  {
    id: PaymentType.TRANSFERENCIA,
    description: 'Transferencia',
  },
  {
    id: PaymentType.GIRO,
    description: 'Giro',
  },
  {
    id: PaymentType.BILLETERA_ELECTRONICA,
    description: 'Billetera electrónica',
  },
  {
    id: PaymentType.TARJETA_EMPRESARIAL,
    description: 'Tarjeta empresarial',
  },
  {
    id: PaymentType.VALE,
    description: 'Vale',
  },
  {
    id: PaymentType.RETENCION,
    description: 'Retención',
  },
  {
    id: PaymentType.PAGO_POR_ANTICIPO,
    description: 'Pago por anticipo',
  },
  {
    id: PaymentType.VALOR_FISCAL,
    description: 'Valor fiscal',
  },
  {
    id: PaymentType.VALOR_COMERCIAL,
    description: 'Valor comercial',
  },
  {
    id: PaymentType.COMPENSACION,
    description: 'Compensación',
  },
  {
    id: PaymentType.PERMUTA,
    description: 'Permuta',
  },
  {
    id: PaymentType.PAGO_BANCARIO,
    description: 'Pago bancario',
  },
  {
    id: PaymentType.PAGO_MOVIL,
    description: 'Pago Móvil',
  },
  {
    id: PaymentType.DONACION,
    description: 'Donación',
  },
  {
    id: PaymentType.PROMOCION,
    description: 'Promoción',
  },
  {
    id: PaymentType.CONSUMO_INTERNO,
    description: 'Consumo Interno',
  },
  {
    id: PaymentType.PAGO_ELECTRONICO,
    description: 'Pago Electrónico',
  },
  {
    id: PaymentType.OTRO,
    description: 'Otro',
  },
];
