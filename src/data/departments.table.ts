import Table from '../helpers/Table';

export enum Department {
  CAPITAL = 1,
  CONCEPCION = 2,
  SAN_PEDRO = 3,
  CORDILLERA = 4,
  GUAIRA = 5,
  CAAGUAZU = 6,
  CAAZAPA = 7,
  ITAPUA = 8,
  MISIONES = 9,
  PARAGUARI = 10,
  ALTO_PARANA = 11,
  CENTRAL = 12,
  NEEMBUCU = 13,
  AMAMBAY = 14,
  PTE__HAYES = 15,
  BOQUERON = 16,
  ALTO_PARAGUAY = 17,
  CANINDEYU = 18,
}

export default new Table<{
  0: ['_id', Department];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [17, 'ALTO PARAGUAY'],
    [11, 'ALTO PARANA'],
    [14, 'AMAMBAY'],
    [16, 'BOQUERON'],
    [6, 'CAAGUAZU'],
    [7, 'CAAZAPA'],
    [18, 'CANINDEYU'],
    [1, 'CAPITAL'],
    [12, 'CENTRAL'],
    [2, 'CONCEPCION'],
    [4, 'CORDILLERA'],
    [5, 'GUAIRA'],
    [8, 'ITAPUA'],
    [9, 'MISIONES'],
    [13, 'NEEMBUCU'],
    [10, 'PARAGUARI'],
    [15, 'PTE. HAYES'],
    [3, 'SAN PEDRO'],
  ],
);
