import { BasicData } from '../services/constants.service';

export enum Department {
  ALTO_PARAGUAY = 17,
  ALTO_PARANA = 11,
  AMAMBAY = 14,
  BOQUERON = 16,
  CAAGUAZU = 6,
  CAAZAPA = 7,
  CANINDEYU = 18,
  CAPITAL = 1,
  CENTRAL = 12,
  CONCEPCION = 2,
  CORDILLERA = 4,
  GUAIRA = 5,
  ITAPUA = 8,
  MISIONES = 9,
  NEEMBUCU = 13,
  PARAGUARI = 10,
  PTE__HAYES = 15,
  SAN_PEDRO = 3,
}

export const departments: BasicData<Department>[] = [
  {
    id: Department.ALTO_PARAGUAY,
    description: 'ALTO PARAGUAY',
  },
  {
    id: Department.ALTO_PARANA,
    description: 'ALTO PARANA',
  },
  {
    id: Department.AMAMBAY,
    description: 'AMAMBAY',
  },
  {
    id: Department.BOQUERON,
    description: 'BOQUERON',
  },
  {
    id: Department.CAAGUAZU,
    description: 'CAAGUAZU',
  },
  {
    id: Department.CAAZAPA,
    description: 'CAAZAPA',
  },
  {
    id: Department.CANINDEYU,
    description: 'CANINDEYU',
  },
  {
    id: Department.CAPITAL,
    description: 'CAPITAL',
  },
  {
    id: Department.CENTRAL,
    description: 'CENTRAL',
  },
  {
    id: Department.CONCEPCION,
    description: 'CONCEPCION',
  },
  {
    id: Department.CORDILLERA,
    description: 'CORDILLERA',
  },
  {
    id: Department.GUAIRA,
    description: 'GUAIRA',
  },
  {
    id: Department.ITAPUA,
    description: 'ITAPUA',
  },
  {
    id: Department.MISIONES,
    description: 'MISIONES',
  },
  {
    id: Department.NEEMBUCU,
    description: 'NEEMBUCU',
  },
  {
    id: Department.PARAGUARI,
    description: 'PARAGUARI',
  },
  {
    id: Department.PTE__HAYES,
    description: 'PTE. HAYES',
  },
  {
    id: Department.SAN_PEDRO,
    description: 'SAN PEDRO',
  },
];
