import Table from '../helpers/Table';

export enum VehicleIdentification {
  NUMERO_DE_IDENTIFICACION_DEL_VEHICULO = 1,
  NUMERO_DE_MATRICULA_DEL_VEHICULO = 2,
}

export default new Table<{
  0: ['_id', VehicleIdentification];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Número de identificación del vehículo'],
    [2, 'Número de matrícula del vehículo'],
  ],
);
