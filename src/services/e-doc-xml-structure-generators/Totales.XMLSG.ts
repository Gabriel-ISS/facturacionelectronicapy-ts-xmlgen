import { EDocData } from '../../schemas/EDoc.schema';

class TotalesXMLSG {
  /**F. Campos que describen los subtotales y totales de la transacción documentada (F001-F099)*/
  public get_gTotSub(data: EDocData) {
    const totales = data.totales;
    if (!totales) return;

    return {
      // F002
      dSubExe: totales.subtotalExento,

      // F003
      dSubExo: totales.subtotalExonerado,

      // F004
      dSub5: totales.subtotalIva5,

      // F005
      dSub10: totales.subtotalIva10,

      //F008
      dTotOpe: totales.totalBruto,

      // F009
      dTotDesc: totales.totalDescuento,

      // F033
      dTotDescGlotem: totales.totalDescuentoGlobalItem,

      // F034
      dTotAntItem: totales.totalAnticipoItem,

      // F035
      dTotAnt: totales.totalAnticipoGlobalItem,

      // F010
      dPorcDescTotal: totales.porcentajeDescuentoTotal,

      // F011
      dDescTotal: totales.descuentoTotal,

      // F012
      dAnticipo: totales.anticipo,

      // F013
      dRedon: totales.redondeo,

      // F025
      dComi: data.comision,

      // F014
      dTotGralOpe: totales.totalNeto,

      // F015
      dIVA5: totales.liquidacionIva5,

      // F016
      dIVA10: totales.liquidacionIva10,

      // F036
      dLiqTotIVA5: totales.liquidacionTotalIva5,

      // F037
      dLiqTotIVA10: totales.liquidacionTotalIva10,

      // F026
      dIVAComi: totales.ivaComision,

      // F017
      dTotIVA: totales.liquidacionTotalIva,

      // F018
      dBaseGrav5: totales.totalIvaGrabado5,

      // F019
      dBaseGrav10: totales.totalIvaGrabado10,

      // F020
      dTBasGraIVA: totales.totalIvaGrabado,

      // F023
      dTotalGs: totales.totalGuaranies,
    };
  }
}

export default new TotalesXMLSG();
