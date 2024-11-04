import { BasicData } from '../services/constants.service';

export enum TaxpayerNotTaxpayer {
  CONTRIBUYENTE = 1,
  NO_CONTRIBUYENTE = 2,
}

export const taxpayerNotTaxpayer: BasicData<TaxpayerNotTaxpayer>[] = [
  {
    _id: TaxpayerNotTaxpayer.CONTRIBUYENTE,
    description: 'Contribuyente',
  },
  {
    _id: TaxpayerNotTaxpayer.NO_CONTRIBUYENTE,
    description: 'No Contribuyente',
  },
];
