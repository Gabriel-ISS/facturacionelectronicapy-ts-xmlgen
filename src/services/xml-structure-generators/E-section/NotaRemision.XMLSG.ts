import { EDocData } from '../../../schemas/EDoc.schema';

class NotaRemisionXMLSG {
  /**E6. Campos que componen la Nota de Remisión Electrónica (E500-E599) */
  public get_gCamNRE(data: EDocData) {
    const remision = data.remision;
    if (!remision) return;

    return {
      // E501
      iMotEmiNR: remision.motivo,

      // E502
      dDesMotEmiNR: remision.motivoDescripcion,

      // E503
      iRespEmiNR: remision.tipoResponsable,

      // E504
      dDesRespEmiNR: remision.descripcionTipoResponsable,

      // E505
      dKmR: remision.kms,

      // E506
      dFecEm: remision.fechaFactura,

      // E507
      cPreFle: remision.costoFlete,
    };
  }
}

export default new NotaRemisionXMLSG();