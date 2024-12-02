import Table from '../helpers/Table';

export enum TaxpayerNotTaxpayer {
  CONTRIBUYENTE = 1,
  NO_CONTRIBUYENTE = 2,
}

export default new Table<{
  0: ['_id', TaxpayerNotTaxpayer];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Contribuyente'],
    [2, 'No Contribuyente'],
  ],
);
