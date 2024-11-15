import { EDocData } from '../../../schemas/EDoc.schema';
import { Credito } from '../../../schemas/EDocData/credito.schema';
import { Entrega } from '../../../schemas/EDocData/entregas.schema';

class CondicionXMLSG {
  /**E7. Campos que describen la condición de la operación (E600-E699)*/
  public get_gCamCond(data: EDocData) {
    const condicion = data.condicion;
    if (!condicion) return;

    return {
      // E601
      iCondOpe: condicion.tipo,

      // E602
      dDCondOpe: condicion.tipoDescripcion,

      // E7.1. Campos que describen la forma de pago de la operación al contado o del monto
      gPaConEIni: this.get_gPaConEIni(data),

      // E7.2. Campos que describen la operación a crédito (E640-E649)
      gPagCred: this.get_gPagCred(data),
    };
  }

  /**E7.1. Campos que describen la forma de pago de la operación al contado o del monto*/
  private get_gPaConEIni(data: EDocData) {
    return data.condicion?.entregas?.map((entrega) => ({
      iTiPago: entrega.tipo,
      dDesTiPag: entrega.tipoDescripcion,
      dMonTiPag: entrega.monto,
      cMoneTiPag: entrega.moneda,
      dDMoneTiPag: entrega.monedaDescripcion,
      dTiCamTiPag: entrega.cambio,

      // E7.1.1.Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito
      gPagTarCD: this.get_gPagTarCD(entrega),

      // E7.1.2.Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639)
      gPagCheq: this.get_gPagCheq(entrega),
    }));
  }

  /**E7.1.1.Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito */
  private get_gPagTarCD(entrega: Entrega) {
    const infoTarjeta = entrega.infoTarjeta;
    if (!infoTarjeta) return;

    return {
      iDenTarj: infoTarjeta.tipo,
      dDesDenTarj: infoTarjeta.tipoDescripcion,
      dRSProTar: infoTarjeta.razonSocial,
      dRUCProTar: infoTarjeta.rucID,
      dDVProTar: infoTarjeta.rucDV,
      iForProPa: infoTarjeta.medioPago,
      dCodAuOpe: infoTarjeta.codigoAutorizacion,
      dNomTit: infoTarjeta.titular,
      dNumTarj: infoTarjeta.numero,
    };
  }

  /**E7.1.2.Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639) */
  private get_gPagCheq(entrega: Entrega) {
    const infoCheque = entrega.infoCheque;
    if (!infoCheque) return;

    return {
      dNumCheq: infoCheque.numeroCheque,
      dBcoEmi: infoCheque.banco,
    };
  }

  /**E7.2. Campos que describen la operación a crédito (E640-E649)*/
  private get_gPagCred(data: EDocData) {
    const credito = data.condicion?.credito;
    if (!credito) return;

    return {
      // E641
      iCondCred: credito.tipo,

      // E642
      dDCondCred: credito.tipoDescripcion,

      // E643
      dPlazoCre: credito.plazo,

      // E644
      dCuotas: credito.cuotas,

      // E645
      dMonEnt: credito.montoEntregaInicial,

      // E7.1.3.Campos que describen el pago o entrega inicial de la operación con cuotas (E620-E629)
      gCuotas: this.get_gCuotas(credito),
    };
  }

  /**E7.1.3.Campos que describen el pago o entrega inicial de la operación con cuotas (E620-E629) */
  private get_gCuotas(credito: Credito) {
    const infoCuotas = credito.infoCuotas;
    if (!infoCuotas) return;

    return infoCuotas.map((infoCuota) => ({
      // E651
      dMonCuota: infoCuota.monto,

      //  E652
      dVencCuo: infoCuota.vencimiento,

      // E653
      cMoneCuo: infoCuota.moneda,

      // E654
      dDMoneCuo: infoCuota.monedaDescripcion,
    }));
  }
}

export default new CondicionXMLSG();