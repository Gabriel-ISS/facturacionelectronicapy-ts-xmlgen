import { BasicData } from '../services/constants.service';

export enum RemissionResponsible {
  EMISOR_DE_LA_FACTURA = 1,
  POSEEDOR_DE_LA_FACTURA_Y_BIENES = 2,
  EMPRESA_TRANSPORTISTA = 3,
  DESPACHANTE_DE_ADUANAS = 4,
  AGENTE_DE_TRANSPORTE_O_INTERMEDIARIO = 5,
}

export const remissionResponsibles: BasicData<RemissionResponsible>[] = [
  {
    id: RemissionResponsible.EMISOR_DE_LA_FACTURA,
    description: 'Emisor de la factura',
  },
  {
    id: RemissionResponsible.POSEEDOR_DE_LA_FACTURA_Y_BIENES,
    description: 'Poseedor de la factura y bienes',
  },
  {
    id: RemissionResponsible.EMPRESA_TRANSPORTISTA,
    description: 'Empresa transportista',
  },
  {
    id: RemissionResponsible.DESPACHANTE_DE_ADUANAS,
    description: 'Despachante de Aduanas',
  },
  {
    id: RemissionResponsible.AGENTE_DE_TRANSPORTE_O_INTERMEDIARIO,
    description: 'Agente de transporte o intermediario',
  },
];
