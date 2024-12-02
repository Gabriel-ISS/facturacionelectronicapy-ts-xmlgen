import Table from '../helpers/Table';

export enum TradingCondition {
  COSTO_Y_FLETE = 'CFR',
  COSTO__SEGURO_Y_FLETE = 'CIF',
  TRANSPORTE_Y_SEGURO_PAGADOS_HASTA = 'CIP',
  TRANSPORTE_PAGADO_HASTA = 'CPT',
  ENTREGADA_EN_LUGAR_CONVENIDO = 'DAP',
  ENTREGADA_EN_TERMINAL = 'DAT',
  ENTREGADA_DERECHOS_PAGADOS = 'DDP',
  EN_FABRICA = 'EXW',
  FRANCO_AL_COSTADO_DEL_BUQUE = 'FAS',
  FRANCO_TRANSPORTISTA = 'FCA',
  FRANCO_A_BORDO = 'FOB',
}

export default new Table<{
  0: ['_id', `${TradingCondition}`];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    ['CFR', 'Costo y flete'],
    ['CIF', 'Costo, seguro y flete'],
    ['CIP', 'Transporte y seguro pagados hasta'],
    ['CPT', 'Transporte pagado hasta'],
    ['DAP', 'Entregada en lugar convenido'],
    ['DAT', 'Entregada en terminal'],
    ['DDP', 'Entregada derechos pagados'],
    ['EXW', 'En fabrica'],
    ['FAS', 'Franco al costado del buque'],
    ['FCA', 'Franco transportista'],
    ['FOB', 'Franco a bordo'],
  ],
);
