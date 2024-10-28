import { BasicData } from '../services/constants.service';

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

export const regimeTypes: BasicData<RegimeType>[] = [
  {
    code: RegimeType.REGIMEN_DE_TURISMO,
    description: 'Régimen de Turismo',
  },
  {
    code: RegimeType.IMPORTADOR,
    description: 'Importador',
  },
  {
    code: RegimeType.EXPORTADOR,
    description: 'Exportador',
  },
  {
    code: RegimeType.MAQUILA,
    description: 'Maquila',
  },
  {
    code: RegimeType.LEY_N__60_90,
    description: 'Ley N° 60/90',
  },
  {
    code: RegimeType.REGIMEN_DEL_PEQUENO_PRODUCTOR,
    description: 'Régimen del Pequeño Productor',
  },
  {
    code: RegimeType.REGIMEN_DEL_MEDIANO_PRODUCTOR,
    description: 'Régimen del Mediano Productor',
  },
  {
    code: RegimeType.REGIMEN_CONTABLE,
    description: 'Régimen Contable',
  },
];
