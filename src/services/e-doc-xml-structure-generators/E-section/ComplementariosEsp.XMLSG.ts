import { EDocData } from '../../../schemas/EDoc.schema';

/** Complementarios de uso especifico */
class ComplementariosEspXMLSG {
  /**E9. Campos complementarios comerciales de uso específico (E790-E899)*/
  public get_gCamEsp(data: EDocData) {
    return {
      // E9.2. Sector Energía Eléctrica (E791-E799)
      gGrupEner: this.get_gGrupEner(data),

      // E9.3. Sector de Seguros (E800-E809)
      gGrupSeg: this.get_gGrupSeg(data),

      // E9.4. Sector de Supermercados (E810-E819)
      gGrupSup: this.get_gGrupSup(data),

      // E9.5. Grupo de datos adicionales de uso comercial (E820-E829)
      gGrupAdi: this.get_gGrupAdi(data),
    };
  }

  /**E9.2. Sector Energía Eléctrica (E791-E799)*/
  private get_gGrupEner(data: EDocData) {
    const sectorEnergiaElectrica = data.sectorEnergiaElectrica;
    if (!sectorEnergiaElectrica) return;

    return {
      // E792
      dNroMed: sectorEnergiaElectrica.numeroMedidor,

      // E793
      dActiv: sectorEnergiaElectrica.codigoActividad,

      // E794
      dCateg: sectorEnergiaElectrica.codigoCategoria,

      // E795
      dLecAnt: sectorEnergiaElectrica.lecturaAnterior,

      // E796
      dLecAct: sectorEnergiaElectrica.lecturaActual,

      // E797
      dConKwh: sectorEnergiaElectrica.consumo,
    };
  }

  /**E9.3. Sector de Seguros (E800-E809)*/
  private get_gGrupSeg(data: EDocData) {
    const sectorSeguros = data.sectorSeguros;
    if (!sectorSeguros) return;

    return {
      // E801
      dCodEmpSeg: sectorSeguros.codigoAseguradora,

      // E9.3.1. Póliza de seguros (EA790-EA799)
      gGrupPolSeg: this.get_gGrupPolSeg(data),
    };
  }

  /**E9.3.1. Póliza de seguros (EA790-EA799) */
  private get_gGrupPolSeg(data: EDocData) {
    const sectorSeguros = data.sectorSeguros;
    if (!sectorSeguros) return;

    return {
      // EA791
      dPoliza: sectorSeguros.codigoPoliza,

      // EA792
      dUnidVig: sectorSeguros.vigenciaUnidad,

      // EA793
      dVigencia: sectorSeguros.vigencia,

      // EA794
      dNumPoliza: sectorSeguros.numeroPoliza,

      // EA795
      dFecIniVig: sectorSeguros.inicioVigencia,

      // EA796
      dFecFinVig: sectorSeguros.finVigencia,

      // EA797
      dCodInt: sectorSeguros.codigoInternoItem,
    };
  }

  /**E9.4. Sector de Supermercados (E810-E819)*/
  private get_gGrupSup(data: EDocData) {
    const sectorSupermercados = data.sectorSupermercados;
    if (!sectorSupermercados) return;

    return {
      // E811
      dNomCaj: sectorSupermercados.nombreCajero,

      // E812
      dEfectivo: sectorSupermercados.efectivo,

      // E813
      dVuelto: sectorSupermercados.vuelto,

      // E814
      dDonac: sectorSupermercados.donacion,

      // E815
      dDesDonac: sectorSupermercados.donacionDescripcion,
    };
  }

  /**E9.5. Grupo de datos adicionales de uso comercial (E820-E829)*/
  private get_gGrupAdi(data: EDocData) {
    const sectorAdicional = data.sectorAdicional;
    if (!sectorAdicional) return;

    return {
      // E821
      dCiclo: sectorAdicional.ciclo,

      // E822
      dFecIniC: sectorAdicional.inicioCiclo,

      // E823
      dFecFinC: sectorAdicional.finCiclo,

      // E824
      dVencPag: sectorAdicional.vencimientoPago,

      // E825
      dContrato: sectorAdicional.numeroContrato,

      // E826
      dSalAnt: sectorAdicional.saldoAnterior,
    };
  }
}

export default new ComplementariosEspXMLSG();
