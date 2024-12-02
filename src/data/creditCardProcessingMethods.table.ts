import Table from '../helpers/Table';

export enum CreditCardProcessingMethod {
  POS = 1,
  PAGO_ELECTRONICO = 2,
  OTRO = 9,
}

export default new Table<{
  0: ['_id', CreditCardProcessingMethod];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'POS'],
    [2, 'Pago Electrónico'],
    [9, 'Otro'],
  ],
);
