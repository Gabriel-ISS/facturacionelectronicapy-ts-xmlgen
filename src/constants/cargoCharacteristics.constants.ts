import { BasicData } from '../services/constants.service';

export enum CargoCharacteristic {
  MERCADERIA_CON_CADENA_DE_FRIO = 1,
  CARGA_PELIGROSA = 2,
  OTRO = 3,
}

export const cargoCharacteristics: BasicData<CargoCharacteristic>[] = [
  {
    id: CargoCharacteristic.MERCADERIA_CON_CADENA_DE_FRIO,
    description: 'Mercadería con cadena de frio',
  },
  {
    id: CargoCharacteristic.CARGA_PELIGROSA,
    description: 'Carga peligrosa',
  },
  {
    id: CargoCharacteristic.OTRO,
    description: 'Otro',
  },
];
