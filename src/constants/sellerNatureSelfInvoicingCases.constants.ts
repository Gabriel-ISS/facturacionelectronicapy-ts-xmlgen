import { BasicData } from '../services/constants.service';

export enum SellerNatureSelfInvoicing {
  NO_CONTRIBUYENTE = 1,
  EXTRANJERO = 2,
}

export const sellerNatureSelfInvoicingCases: BasicData<SellerNatureSelfInvoicing>[] = [
  {
    _id: SellerNatureSelfInvoicing.NO_CONTRIBUYENTE,
    description: 'No contribuyente',
  },
  {
    _id: SellerNatureSelfInvoicing.EXTRANJERO,
    description: 'Extranjero',
  },
];
