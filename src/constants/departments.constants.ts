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
    code: Department.ALTO_PARAGUAY,
    description: 'ALTO PARAGUAY',
  },
  {
    code: Department.ALTO_PARANA,
    description: 'ALTO PARANA',
  },
  {
    code: Department.AMAMBAY,
    description: 'AMAMBAY',
  },
  {
    code: Department.BOQUERON,
    description: 'BOQUERON',
  },
  {
    code: Department.CAAGUAZU,
    description: 'CAAGUAZU',
  },
  {
    code: Department.CAAZAPA,
    description: 'CAAZAPA',
  },
  {
    code: Department.CANINDEYU,
    description: 'CANINDEYU',
  },
  {
    code: Department.CAPITAL,
    description: 'CAPITAL',
  },
  {
    code: Department.CENTRAL,
    description: 'CENTRAL',
  },
  {
    code: Department.CONCEPCION,
    description: 'CONCEPCION',
  },
  {
    code: Department.CORDILLERA,
    description: 'CORDILLERA',
  },
  {
    code: Department.GUAIRA,
    description: 'GUAIRA',
  },
  {
    code: Department.ITAPUA,
    description: 'ITAPUA',
  },
  {
    code: Department.MISIONES,
    description: 'MISIONES',
  },
  {
    code: Department.NEEMBUCU,
    description: 'NEEMBUCU',
  },
  {
    code: Department.PARAGUARI,
    description: 'PARAGUARI',
  },
  {
    code: Department.PTE__HAYES,
    description: 'PTE. HAYES',
  },
  {
    code: Department.SAN_PEDRO,
    description: 'SAN PEDRO',
  },
];
