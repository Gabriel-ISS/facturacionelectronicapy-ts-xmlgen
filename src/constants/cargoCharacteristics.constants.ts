import { BasicData } from '../services/constants.service';

export enum CargoCharacteristic {
  MERCADERIA_CON_CADENA_DE_FRIO = 1,
  CARGA_PELIGROSA = 2,
  OTRO = 3,
}

export const cargoCharacteristics: BasicData<CargoCharacteristic>[] = [
  {
    code: CargoCharacteristic.MERCADERIA_CON_CADENA_DE_FRIO,
    description: 'Mercadería con cadena de frio',
  },
  {
    code: CargoCharacteristic.CARGA_PELIGROSA,
    description: 'Carga peligrosa',
  },
  {
    code: CargoCharacteristic.OTRO,
    description: 'Otro',
  },
];
