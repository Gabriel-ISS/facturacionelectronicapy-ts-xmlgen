import { BasicData } from '../services/constants.service';

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

export const tradingConditions: BasicData<TradingCondition>[] = [
  {
    code: TradingCondition.COSTO_Y_FLETE,
    description: 'Costo y flete',
  },
  {
    code: TradingCondition.COSTO__SEGURO_Y_FLETE,
    description: 'Costo, seguro y flete',
  },
  {
    code: TradingCondition.TRANSPORTE_Y_SEGURO_PAGADOS_HASTA,
    description: 'Transporte y seguro pagados hasta',
  },
  {
    code: TradingCondition.TRANSPORTE_PAGADO_HASTA,
    description: 'Transporte pagado hasta',
  },
  {
    code: TradingCondition.ENTREGADA_EN_LUGAR_CONVENIDO,
    description: 'Entregada en lugar convenido',
  },
  {
    code: TradingCondition.ENTREGADA_EN_TERMINAL,
    description: 'Entregada en terminal',
  },
  {
    code: TradingCondition.ENTREGADA_DERECHOS_PAGADOS,
    description: 'Entregada derechos pagados',
  },
  {
    code: TradingCondition.EN_FABRICA,
    description: 'En fabrica',
  },
  {
    code: TradingCondition.FRANCO_AL_COSTADO_DEL_BUQUE,
    description: 'Franco al costado del buque',
  },
  {
    code: TradingCondition.FRANCO_TRANSPORTISTA,
    description: 'Franco transportista',
  },
  {
    code: TradingCondition.FRANCO_A_BORDO,
    description: 'Franco a bordo',
  },
];
