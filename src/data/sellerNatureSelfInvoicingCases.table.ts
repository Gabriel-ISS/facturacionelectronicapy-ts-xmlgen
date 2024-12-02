import Table from '../helpers/Table';

export enum SellerNatureSelfInvoicing {
  NO_CONTRIBUYENTE = 1,
  EXTRANJERO = 2,
}

export default new Table<{
  0: ['_id', SellerNatureSelfInvoicing];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'No contribuyente'],
    [2, 'Extranjero'],
  ],
);
