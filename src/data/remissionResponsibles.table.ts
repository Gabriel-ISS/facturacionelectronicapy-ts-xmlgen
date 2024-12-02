import Table from '../helpers/Table';

export enum RemissionResponsible {
  EMISOR_DE_LA_FACTURA = 1,
  POSEEDOR_DE_LA_FACTURA_Y_BIENES = 2,
  EMPRESA_TRANSPORTISTA = 3,
  DESPACHANTE_DE_ADUANAS = 4,
  AGENTE_DE_TRANSPORTE_O_INTERMEDIARIO = 5,
}

export default new Table<{
  0: ['_id', RemissionResponsible];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Emisor de la factura'],
    [2, 'Poseedor de la factura y bienes'],
    [3, 'Empresa transportista'],
    [4, 'Despachante de Aduanas'],
    [5, 'Agente de transporte o intermediario'],
  ],
);
