import Table from '../helpers/Table';

export enum Taxpayer {
  PERSONA_FISICA = 1,
  PERSONA_JURIDICA = 2,
}

export default new Table<{
  0: ['_id', Taxpayer];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Persona física'],
    [2, 'Persona jurídica'],
  ],
);
