import { DataWithState } from '../services/constants.service';

export enum TaxType {
  IVA = 1,
  ISC = 2,
  RENTA = 3,
  NINGUNO = 4,
  IVA___RENTA = 5,
}

export const taxTypes: DataWithState<TaxType>[] = [
  {
    id: TaxType.IVA,
    description: 'IVA',
    state: 0,
  },
  {
    id: TaxType.ISC,
    description: 'ISC',
    state: 1,
  },
  {
    id: TaxType.RENTA,
    description: 'Renta',
    state: 1,
  },
  {
    id: TaxType.NINGUNO,
    description: 'Ninguno',
    state: 0,
  },
  {
    id: TaxType.IVA___RENTA,
    description: 'IVA - Renta',
    state: 0,
  },
];
