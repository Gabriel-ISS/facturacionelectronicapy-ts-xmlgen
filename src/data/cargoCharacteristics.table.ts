import Table from '../helpers/Table';

export enum CargoCharacteristic {
  MERCADERIA_CON_CADENA_DE_FRIO = 1,
  CARGA_PELIGROSA = 2,
  OTRO = 3,
}

export default new Table<{
  0: ['_id', CargoCharacteristic];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Mercadería con cadena de frio'],
    [2, 'Carga peligrosa'],
    [3, 'Otro'],
  ],
);
