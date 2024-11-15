import { EDocData } from '../../../schemas/EDoc.schema';

class AutoFacturaXMLSG {
  /**E4. Campos que componen la Autofactura Electrónica AFE (E300-E399) */
  public get_gCamAE(data: EDocData) {
    const autoFactura = data.autoFactura;
    if (!autoFactura) return;

    return {
      iNatVen: autoFactura.tipoVendedor,
      dDesNatVen: autoFactura.tipoVendedorDescripcion,
      iTipIDVen: autoFactura.documentoTipo,
      dDTipIDVen: autoFactura.documentoTipoDescripcion,
      dNumIDVen: autoFactura.documentoNumero,
      dNomVen: autoFactura.nombre,
      dDirVen: autoFactura.direccion,
      dNumCasVen: autoFactura.numeroCasa,
      cDepVen: autoFactura.departamento,
      dDesDepVen: autoFactura.departamentoDescripcion,
      cDisVen: autoFactura.distrito,
      dDesDisVen: autoFactura.distritoDescripcion,
      cCiuVen: autoFactura.ciudad,
      dDesCiuVen: autoFactura.ciudadDescripcion,
      dDirProv: autoFactura.ubicacion.lugar,
      cDepProv: autoFactura.ubicacion.departamento,
      dDesDepProv: autoFactura.ubicacion.departamentoDescripcion,
      cDisProv: autoFactura.ubicacion.distrito,
      dDesDisProv: autoFactura.ubicacion.distritoDescripcion,
      cCiuProv: autoFactura.ubicacion.ciudad,
      dDesCiuProv: autoFactura.ubicacion.ciudadDescripcion,
    };
  }
}

export default new AutoFacturaXMLSG();