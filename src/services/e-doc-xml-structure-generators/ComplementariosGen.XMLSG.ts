import { EDocData } from '../../schemas/EDoc.schema';

/** Complementarios de uso general */
class ComplementariosGenXMLSG {
  /**G. Campos complementarios comerciales de uso general (G001-G049)*/
  public get_gCamGen(data: EDocData) {
    const complementarios = data.complementarios;
    if (!complementarios) return;

    return {
      // G002
      dOrdCompra: complementarios.ordenCompra,

      // G003
      dOrdVta: complementarios.ordenVenta,

      // G004
      dAsiento: complementarios.numeroAsiento,

      // G1. Campos generales de la carga (G050 - G099)
      gCamCarg: this.get_gCamCarg(data),
    };
  }

  /**G1. Campos generales de la carga (G050 - G099)*/
  private get_gCamCarg(data: EDocData) {
    const carga = data.complementarios?.carga;
    if (!carga) return;

    return {
      // G051
      cUniMedTotVol: carga.unidadMedidaVolumenTotal,

      // G052
      dDesUniMedTotVol: carga.unidadMedidaVolumenDescripcion,

      // G053
      dTotVolMerc: carga.volumenTotal,

      // G054
      cUniMedTotPes: carga.unidadMedidaPesoTotal,

      // G055
      dDesUniMedTotPes: carga.unidadMedidaPesoDescripcion,

      // G056
      dTotPesMerc: carga.pesoTotal,

      // G057
      iCarCarga: carga.caracteristicaCarga,

      // G058
      dDesCarCarga: carga.caracteristicaCargaDescripcion,
    };
  }
}

export default new ComplementariosGenXMLSG();
