import { EDocData } from '../../../schemas/EDoc.schema';

class NotaRemisionXMLSG {
  /**E6. Campos que componen la Nota de Remisión Electrónica (E500-E599) */
  public get_gCamNRE(data: EDocData) {
    const remision = data.remision;
    if (!remision) return;

    return {
      iMotEmiNR: remision.motivo, //E501
      dDesMotEmiNR: remision.motivoDescripcion,
      iRespEmiNR: remision.tipoResponsable,
      dDesRespEmiNR: remision.descripcionTipoResponsable,
      dKmR: remision.kms,
      dFecEm: remision.fechaFactura,
      cPreFle: remision.costoFlete,
    };
  }
}

export default new NotaRemisionXMLSG();