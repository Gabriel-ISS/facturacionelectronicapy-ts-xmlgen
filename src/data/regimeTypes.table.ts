import Table from '../helpers/Table';

export enum RegimeType {
  REGIMEN_DE_TURISMO = 1,
  IMPORTADOR = 2,
  EXPORTADOR = 3,
  MAQUILA = 4,
  LEY_N__60_90 = 5,
  REGIMEN_DEL_PEQUENO_PRODUCTOR = 6,
  REGIMEN_DEL_MEDIANO_PRODUCTOR = 7,
  REGIMEN_CONTABLE = 8,
}

export default new Table<{
  0: ['_id', RegimeType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Régimen de Turismo'],
    [2, 'Importador'],
    [3, 'Exportador'],
    [4, 'Maquila'],
    [5, 'Ley N° 60/90'],
    [6, 'Régimen del Pequeño Productor'],
    [7, 'Régimen del Mediano Productor'],
    [8, 'Régimen Contable'],
  ],
);
