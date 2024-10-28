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
    code: PaymentType.EFECTIVO,
    description: 'Efectivo',
  },
  {
    code: PaymentType.CHEQUE,
    description: 'Cheque',
  },
  {
    code: PaymentType.TARJETA_DE_CREDITO,
    description: 'Tarjeta de crédito',
  },
  {
    code: PaymentType.TARJETA_DE_DEBITO,
    description: 'Tarjeta de débito',
  },
  {
    code: PaymentType.TRANSFERENCIA,
    description: 'Transferencia',
  },
  {
    code: PaymentType.GIRO,
    description: 'Giro',
  },
  {
    code: PaymentType.BILLETERA_ELECTRONICA,
    description: 'Billetera electrónica',
  },
  {
    code: PaymentType.TARJETA_EMPRESARIAL,
    description: 'Tarjeta empresarial',
  },
  {
    code: PaymentType.VALE,
    description: 'Vale',
  },
  {
    code: PaymentType.RETENCION,
    description: 'Retención',
  },
  {
    code: PaymentType.PAGO_POR_ANTICIPO,
    description: 'Pago por anticipo',
  },
  {
    code: PaymentType.VALOR_FISCAL,
    description: 'Valor fiscal',
  },
  {
    code: PaymentType.VALOR_COMERCIAL,
    description: 'Valor comercial',
  },
  {
    code: PaymentType.COMPENSACION,
    description: 'Compensación',
  },
  {
    code: PaymentType.PERMUTA,
    description: 'Permuta',
  },
  {
    code: PaymentType.PAGO_BANCARIO,
    description: 'Pago bancario',
  },
  {
    code: PaymentType.PAGO_MOVIL,
    description: 'Pago Móvil',
  },
  {
    code: PaymentType.DONACION,
    description: 'Donación',
  },
  {
    code: PaymentType.PROMOCION,
    description: 'Promoción',
  },
  {
    code: PaymentType.CONSUMO_INTERNO,
    description: 'Consumo Interno',
  },
  {
    code: PaymentType.PAGO_ELECTRONICO,
    description: 'Pago Electrónico',
  },
  {
    code: PaymentType.OTRO,
    description: 'Otro',
  },
];
