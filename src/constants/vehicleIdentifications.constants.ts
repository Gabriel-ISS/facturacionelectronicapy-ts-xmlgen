import { BasicData } from '../services/constants.service';

export enum VehicleIdentification {
  NUMERO_DE_IDENTIFICACION_DEL_VEHICULO = 1,
  NUMERO_DE_MATRICULA_DEL_VEHICULO = 2,
}

export const vehicleIdentifications: BasicData<VehicleIdentification>[] = [
  {
    id: VehicleIdentification.NUMERO_DE_IDENTIFICACION_DEL_VEHICULO,
    description: 'Número de identificación del vehículo',
  },
  {
    id: VehicleIdentification.NUMERO_DE_MATRICULA_DEL_VEHICULO,
    description: 'Número de matrícula del vehículo',
  },
];
