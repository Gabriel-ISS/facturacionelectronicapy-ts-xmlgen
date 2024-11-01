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
    id: RegimeType.REGIMEN_DE_TURISMO,
    description: 'Régimen de Turismo',
  },
  {
    id: RegimeType.IMPORTADOR,
    description: 'Importador',
  },
  {
    id: RegimeType.EXPORTADOR,
    description: 'Exportador',
  },
  {
    id: RegimeType.MAQUILA,
    description: 'Maquila',
  },
  {
    id: RegimeType.LEY_N__60_90,
    description: 'Ley N° 60/90',
  },
  {
    id: RegimeType.REGIMEN_DEL_PEQUENO_PRODUCTOR,
    description: 'Régimen del Pequeño Productor',
  },
  {
    id: RegimeType.REGIMEN_DEL_MEDIANO_PRODUCTOR,
    description: 'Régimen del Mediano Productor',
  },
  {
    id: RegimeType.REGIMEN_CONTABLE,
    description: 'Régimen Contable',
  },
];
