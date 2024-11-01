import { BasicData } from '../services/constants.service';

export enum TaxTreatment {
  GRAVADO_IVA = 1,
  EXONERADO__ART__100___LEY_6380_2019_ = 2,
  EXENTO = 3,
  GRAVADO_PARCIAL__GRAV__EXENTO_ = 4,
}

export const taxTreatments: BasicData<TaxTreatment>[] = [
  {
    id: TaxTreatment.GRAVADO_IVA,
    description: 'Gravado IVA',
  },
  {
    id: TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_,
    description: 'Exonerado (Art. 100 - Ley 6380/2019)',
  },
  {
    id: TaxTreatment.EXENTO,
    description: 'Exento',
  },
  {
    id: TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_,
    description: 'Gravado parcial (Grav- Exento)',
  },
];