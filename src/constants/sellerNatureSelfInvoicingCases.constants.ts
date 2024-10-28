import { BasicData } from '../services/constants.service';

export enum SellerNatureSelfInvoicing {
  NO_CONTRIBUYENTE = 1,
  EXTRANJERO = 2,
}

export const sellerNatureSelfInvoicingCases: BasicData<SellerNatureSelfInvoicing>[] = [
  {
    code: SellerNatureSelfInvoicing.NO_CONTRIBUYENTE,
    description: 'No contribuyente',
  },
  {
    code: SellerNatureSelfInvoicing.EXTRANJERO,
    description: 'Extranjero',
  },
];
