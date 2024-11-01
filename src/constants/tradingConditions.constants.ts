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
    id: TradingCondition.COSTO_Y_FLETE,
    description: 'Costo y flete',
  },
  {
    id: TradingCondition.COSTO__SEGURO_Y_FLETE,
    description: 'Costo, seguro y flete',
  },
  {
    id: TradingCondition.TRANSPORTE_Y_SEGURO_PAGADOS_HASTA,
    description: 'Transporte y seguro pagados hasta',
  },
  {
    id: TradingCondition.TRANSPORTE_PAGADO_HASTA,
    description: 'Transporte pagado hasta',
  },
  {
    id: TradingCondition.ENTREGADA_EN_LUGAR_CONVENIDO,
    description: 'Entregada en lugar convenido',
  },
  {
    id: TradingCondition.ENTREGADA_EN_TERMINAL,
    description: 'Entregada en terminal',
  },
  {
    id: TradingCondition.ENTREGADA_DERECHOS_PAGADOS,
    description: 'Entregada derechos pagados',
  },
  {
    id: TradingCondition.EN_FABRICA,
    description: 'En fabrica',
  },
  {
    id: TradingCondition.FRANCO_AL_COSTADO_DEL_BUQUE,
    description: 'Franco al costado del buque',
  },
  {
    id: TradingCondition.FRANCO_TRANSPORTISTA,
    description: 'Franco transportista',
  },
  {
    id: TradingCondition.FRANCO_A_BORDO,
    description: 'Franco a bordo',
  },
];
