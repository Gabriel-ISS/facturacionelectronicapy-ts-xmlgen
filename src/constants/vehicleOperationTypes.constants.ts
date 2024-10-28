import { BasicData } from '../services/constants.service';

export enum VehicleOperationType {
  VENTA_A_REPRESENTANTE = 1,
  VENTA_AL_CONSUMIDOR_FINAL = 2,
  VENTA_A_GOBIERNO = 3,
  VENTA_A_FLOTA_DE_VEHICULOS = 4,
}

export const vehicleOperationTypes: BasicData<VehicleOperationType>[] = [
  {
    code: VehicleOperationType.VENTA_A_REPRESENTANTE,
    description: 'Venta a representante',
  },
  {
    code: VehicleOperationType.VENTA_AL_CONSUMIDOR_FINAL,
    description: 'Venta al consumidor final',
  },
  {
    code: VehicleOperationType.VENTA_A_GOBIERNO,
    description: 'Venta a gobierno',
  },
  {
    code: VehicleOperationType.VENTA_A_FLOTA_DE_VEHICULOS,
    description: 'Venta a flota de vehículos',
  },
];
