import { BasicData } from '../services/constants.service';

export enum FreightResponsible {
  EMISOR_DE_LA_FACTURA_ELECTRONICA = 1,
  RECEPTOR_DE_LA_FACTURA_ELECTRONICA = 2,
  TERCERO = 3,
  AGENTE_INTERMEDIARIO_DEL_TRANSPORTE__CUANDO_INTERVENGA_ = 4,
  TRANSPORTE_PROPIO = 5,
}

export const freightResponsibles: BasicData<FreightResponsible>[] = [
  {
    id: FreightResponsible.EMISOR_DE_LA_FACTURA_ELECTRONICA,
    description: 'Emisor de la Factura Electrónica',
  },
  {
    id: FreightResponsible.RECEPTOR_DE_LA_FACTURA_ELECTRONICA,
    description: 'Receptor de la Factura Electrónica',
  },
  {
    id: FreightResponsible.TERCERO,
    description: 'Tercero',
  },
  {
    id: FreightResponsible.AGENTE_INTERMEDIARIO_DEL_TRANSPORTE__CUANDO_INTERVENGA_,
    description: 'Agente intermediario del transporte (cuando intervenga)',
  },
  {
    id: FreightResponsible.TRANSPORTE_PROPIO,
    description: 'Transporte propio',
  },
];
