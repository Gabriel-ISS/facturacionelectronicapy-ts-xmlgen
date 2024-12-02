import Table from '../helpers/Table';

export enum PresenceIndicator {
  OPERACION_PRESENCIAL = 1,
  OPERACION_ELECTRONICA = 2,
  OPERACION_TELEMARKETING = 3,
  VENTA_A_DOMICILIO = 4,
  OPERACION_BANCARIA = 5,
  OPERACION_CICLICA = 6,
  OTRO = 9,
}

export default new Table<{
  0: ['_id', PresenceIndicator];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Operación presencial'],
    [2, 'Operación electrónica'],
    [3, 'Operación telemarketing'],
    [4, 'Venta a domicilio'],
    [5, 'Operación bancaria'],
    [6, 'Operación cíclica'],
    [9, 'Otro'],
  ],
);
