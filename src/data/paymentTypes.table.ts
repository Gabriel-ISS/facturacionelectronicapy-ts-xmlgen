import Table from '../helpers/Table';

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

export default new Table<{
  0: ['_id', PaymentType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Efectivo'],
    [2, 'Cheque'],
    [3, 'Tarjeta de crédito'],
    [4, 'Tarjeta de débito'],
    [5, 'Transferencia'],
    [6, 'Giro'],
    [7, 'Billetera electrónica'],
    [8, 'Tarjeta empresarial'],
    [9, 'Vale'],
    [10, 'Retención'],
    [11, 'Pago por anticipo'],
    [12, 'Valor fiscal'],
    [13, 'Valor comercial'],
    [14, 'Compensación'],
    [15, 'Permuta'],
    [16, 'Pago bancario'],
    [17, 'Pago Móvil'],
    [18, 'Donación'],
    [19, 'Promoción'],
    [20, 'Consumo Interno'],
    [21, 'Pago Electrónico'],
    [99, 'Otro'],
  ],
);
