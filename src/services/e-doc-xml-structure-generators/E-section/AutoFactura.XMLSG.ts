import { EDocData } from '../../../schemas/EDoc.schema';

class AutoFacturaXMLSG {
  /**E4. Campos que componen la Autofactura Electrónica AFE (E300-E399) */
  public get_gCamAE(data: EDocData) {
    const autoFactura = data.autoFactura;
    if (!autoFactura) return;

    const ubicacion = autoFactura.ubicacion;

    return {
      // E301
      iNatVen: autoFactura.tipoVendedor,

      // E302
      dDesNatVen: autoFactura.tipoVendedorDescripcion,

      // E303
      iTipIDVen: autoFactura.documentoTipo,

      // E304
      dDTipIDVen: autoFactura.documentoTipoDescripcion,

      // E305
      dNumIDVen: autoFactura.documentoNumero,

      // E306
      dNomVen: autoFactura.nombre,

      // E307
      dDirVen: autoFactura.direccion,

      // E308
      dNumCasVen: autoFactura.numeroCasa,

      // E309
      cDepVen: autoFactura.departamento,

      // E310
      dDesDepVen: autoFactura.departamentoDescripcion,

      // E311
      cDisVen: autoFactura.distrito,

      // E312
      dDesDisVen: autoFactura.distritoDescripcion,

      // E313
      cCiuVen: autoFactura.ciudad,

      // E314
      dDesCiuVen: autoFactura.ciudadDescripcion,

      // E315
      dDirProv: ubicacion.lugar,

      // E316
      cDepProv: ubicacion.departamento,

      // E317
      dDesDepProv: ubicacion.departamentoDescripcion,

      // E318
      cDisProv: ubicacion.distrito,

      // E319
      dDesDisProv: ubicacion.distritoDescripcion,

      // E320
      cCiuProv: ubicacion.ciudad,

      // E321
      dDesCiuProv: ubicacion.ciudadDescripcion,
    };
  }
}

export default new AutoFacturaXMLSG();