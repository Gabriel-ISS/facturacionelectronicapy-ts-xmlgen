import Table from '../helpers/Table';

export enum FreightResponsible {
  EMISOR_DE_LA_FACTURA_ELECTRONICA = 1,
  RECEPTOR_DE_LA_FACTURA_ELECTRONICA = 2,
  TERCERO = 3,
  AGENTE_INTERMEDIARIO_DEL_TRANSPORTE__CUANDO_INTERVENGA_ = 4,
  TRANSPORTE_PROPIO = 5,
}

export default new Table<{
  0: ['_id', FreightResponsible];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Emisor de la Factura Electrónica'],
    [2, 'Receptor de la Factura Electrónica'],
    [3, 'Tercero'],
    [4, 'Agente intermediario del transporte (cuando intervenga)'],
    [5, 'Transporte propio'],
  ],
);
