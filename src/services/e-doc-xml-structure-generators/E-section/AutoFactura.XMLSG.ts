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

      // E304
      iTipIDVen: autoFactura.documentoTipo,

      // E305
      dDTipIDVen: autoFactura.documentoTipoDescripcion,

      // E306
      dNumIDVen: autoFactura.documentoNumero,

      // E307
      dNomVen: autoFactura.nombre,

      // E308
      dDirVen: autoFactura.direccion,

      // E309
      dNumCasVen: autoFactura.numeroCasa,

      // E310
      cDepVen: autoFactura.departamento,

      // E311
      dDesDepVen: autoFactura.departamentoDescripcion,

      // E312
      cDisVen: autoFactura.distrito,

      // E313
      dDesDisVen: autoFactura.distritoDescripcion,

      // E314
      cCiuVen: autoFactura.ciudad,

      // E315
      dDesCiuVen: autoFactura.ciudadDescripcion,

      // E316
      dDirProv: ubicacion.lugar,

      // E317
      cDepProv: ubicacion.departamento,

      // E318
      dDesDepProv: ubicacion.departamentoDescripcion,

      // E319
      cDisProv: ubicacion.distrito,

      // E320
      dDesDisProv: ubicacion.distritoDescripcion,

      // E321
      cCiuProv: ubicacion.ciudad,

      // E322
      dDesCiuProv: ubicacion.ciudadDescripcion,
    };
  }
}

export default new AutoFacturaXMLSG();