import { BasicData } from '../services/constants.service';

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

export const departments: BasicData<Department>[] = [
  {
    _id: Department.ALTO_PARAGUAY,
    description: 'ALTO PARAGUAY',
  },
  {
    _id: Department.ALTO_PARANA,
    description: 'ALTO PARANA',
  },
  {
    _id: Department.AMAMBAY,
    description: 'AMAMBAY',
  },
  {
    _id: Department.BOQUERON,
    description: 'BOQUERON',
  },
  {
    _id: Department.CAAGUAZU,
    description: 'CAAGUAZU',
  },
  {
    _id: Department.CAAZAPA,
    description: 'CAAZAPA',
  },
  {
    _id: Department.CANINDEYU,
    description: 'CANINDEYU',
  },
  {
    _id: Department.CAPITAL,
    description: 'CAPITAL',
  },
  {
    _id: Department.CENTRAL,
    description: 'CENTRAL',
  },
  {
    _id: Department.CONCEPCION,
    description: 'CONCEPCION',
  },
  {
    _id: Department.CORDILLERA,
    description: 'CORDILLERA',
  },
  {
    _id: Department.GUAIRA,
    description: 'GUAIRA',
  },
  {
    _id: Department.ITAPUA,
    description: 'ITAPUA',
  },
  {
    _id: Department.MISIONES,
    description: 'MISIONES',
  },
  {
    _id: Department.NEEMBUCU,
    description: 'NEEMBUCU',
  },
  {
    _id: Department.PARAGUARI,
    description: 'PARAGUARI',
  },
  {
    _id: Department.PTE__HAYES,
    description: 'PTE. HAYES',
  },
  {
    _id: Department.SAN_PEDRO,
    description: 'SAN PEDRO',
  },
];
