import Table from '../helpers/Table';

export enum TaxTreatment {
  GRAVADO_IVA = 1,
  EXONERADO__ART__100___LEY_6380_2019_ = 2,
  EXENTO = 3,
  GRAVADO_PARCIAL__GRAV__EXENTO_ = 4,
}

export default new Table<{
  0: ['_id', TaxTreatment];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Gravado IVA'],
    [2, 'Exonerado (Art. 100 - Ley 6380/2019)'],
    [3, 'Exento'],
    [4, 'Gravado parcial (Grav- Exento)'],
  ],
);
