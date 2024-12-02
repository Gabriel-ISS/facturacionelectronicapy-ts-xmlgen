import Table from '../helpers/Table';

export enum TransportModality {
  TERRESTRE = 1,
  FLUVIAL = 2,
  AEREO = 3,
  MULTIMODAL = 4,
}

export default new Table<{
  0: ['_id', TransportModality];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Terrestre'],
    [2, 'Fluvial'],
    [3, 'Aéreo'],
    [4, 'Multimodal'],
  ],
);
