import Table from '../helpers/Table';

export enum VehicleOperationType {
  VENTA_A_REPRESENTANTE = 1,
  VENTA_AL_CONSUMIDOR_FINAL = 2,
  VENTA_A_GOBIERNO = 3,
  VENTA_A_FLOTA_DE_VEHICULOS = 4,
}

export default new Table<{
  0: ['_id', VehicleOperationType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Venta a representante'],
    [2, 'Venta al consumidor final'],
    [3, 'Venta a gobierno'],
    [4, 'Venta a flota de vehículos'],
  ],
);
