import { EDocData } from '../../../schemas/EDoc.schema';

class FacturaXMLSG {
  /** E1. Campos que componen la Factura Electrónica FE (E002-E099) */
  public get_gCamFE(data: EDocData) {
    const factura = data.factura;
    if (!factura) return undefined;

    return {
      // E011
      iIndPres: factura.presencia,

      // E012
      dDesIndPres: factura.descripcionPresencia,

      // E013
      dFecEmNR: factura.fechaEnvio,

      // E1.1 Campos de informaciones de Compras Públicas (E020-E029)
      gCompPub: this.get_gCompPub(data),
    };
  }

  /**E1.1. Campos de informaciones de Compras Públicas (E020-E029) */
  private get_gCompPub(data: EDocData) {
    const dncp = data.dncp;
    if (!dncp) return;

    return {
      // E021
      dModCont: dncp.modalidad,

      // E022
      dEntCont: dncp.entidad,

      // E023
      dAnoCont: dncp.año,

      // E024
      dSecCont: dncp.secuencia,

      // E025
      dFeCodCont: dncp.fecha,
    };
  }
}

export default new FacturaXMLSG();
