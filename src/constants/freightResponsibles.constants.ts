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
    _id: FreightResponsible.EMISOR_DE_LA_FACTURA_ELECTRONICA,
    description: 'Emisor de la Factura Electrónica',
  },
  {
    _id: FreightResponsible.RECEPTOR_DE_LA_FACTURA_ELECTRONICA,
    description: 'Receptor de la Factura Electrónica',
  },
  {
    _id: FreightResponsible.TERCERO,
    description: 'Tercero',
  },
  {
    _id: FreightResponsible.AGENTE_INTERMEDIARIO_DEL_TRANSPORTE__CUANDO_INTERVENGA_,
    description: 'Agente intermediario del transporte (cuando intervenga)',
  },
  {
    _id: FreightResponsible.TRANSPORTE_PROPIO,
    description: 'Transporte propio',
  },
];
