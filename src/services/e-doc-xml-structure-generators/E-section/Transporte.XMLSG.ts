import { EDocData } from '../../../schemas/EDoc.schema';

class TransporteXMLSG {
  /**E10. Campos que describen el transporte de las mercaderías (E900-E999)*/
  public get_gTransp(data: EDocData) {
    const transporte = data.transporte;
    if (!transporte) return;

    return {
      // E901
      iTipTrans: transporte.tipo,

      // E902
      dDesTipTrans: transporte.tipoDescripcion,

      // E903
      iModTrans: transporte.modalidad,

      // E904
      dDesModTrans: transporte.modalidadDescripcion,

      // E905
      iRespFlete: transporte.tipoResponsable,

      // E906
      cCondNeg: transporte.condicionNegociacion,

      // E907
      dNuManif: transporte.numeroManifiesto,

      // E908
      dNuDespImp: transporte.numeroDespachoImportacion,

      // E909
      dIniTras: transporte.inicioEstimadoTranslado,

      // E910
      dFinTras: transporte.finEstimadoTranslado,

      // E911
      cPaisDest: transporte.paisDestino,

      // E912
      dDesPaisDest: transporte.paisDestinoNombre,

      // E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)
      gCamSal: this.get_gCamSal(data),

      // E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)
      gCamEnt: this.get_gCamEnt(data),

      // E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979)
      gVehTras: this.get_gVehTras(data),

      // E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999)
      gCamTrans: this.get_gCamTrans(data),
    };
  }

  /**E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)*/
  private get_gCamSal(data: EDocData) {
    const salida = data.transporte?.salida;
    if (!salida) return;

    return {
      // E921
      dDirLocSal: salida.direccion,

      // E922
      dNumCasSal: salida.numeroCasa,

      // E923
      dComp1Sal: salida.complementoDireccion1,

      // E924
      dComp2Sal: salida.complementoDireccion2,

      // E925
      cDepSal: salida.departamento,

      // E926
      dDesDepSal: salida.departamentoDescripcion,

      // E927
      cDisSal: salida.distrito,

      // E928
      dDesDisSal: salida.distritoDescripcion,

      // E929
      cCiuSal: salida.ciudad,

      // E930
      dDesCiuSal: salida.ciudadDescripcion,

      // E931
      dTelSal: salida.telefonoContacto,
    };
  }

  /**E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)*/
  private get_gCamEnt(data: EDocData) {
    const entrega = data.transporte?.entrega;
    if (!entrega) return;

    return {
      // E941
      dDirLocEnt: entrega.direccion,

      // E942
      dNumCasEnt: entrega.numeroCasa,

      // E943
      dComp1Ent: entrega.complementoDireccion1,

      // E944
      dComp2Ent: entrega.complementoDireccion2,

      // E945
      cDepEnt: entrega.departamento,

      // E946
      dDesDepEnt: entrega.departamentoDescripcion,

      // E947
      cDisEnt: entrega.distrito,

      // E948
      dDesDisEnt: entrega.distritoDescripcion,

      // E949
      cCiuEnt: entrega.ciudad,

      // E950
      dDesCiuEnt: entrega.ciudadDescripcion,

      // E951
      dTelEnt: entrega.telefonoContacto,
    };
  }

  /**E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979)*/
  private get_gVehTras(data: EDocData) {
    const vehiculo = data.transporte?.vehiculo;
    if (!vehiculo) return;

    return {
      // E961
      dTiVehTras: vehiculo.tipo,

      // E962
      dMarVeh: vehiculo.marca,

      // E967
      dTipIdenVeh: vehiculo.documentoTipo,

      // E963
      dNroIDVeh: vehiculo.documentoNumero,

      // E964
      dAdicVeh: vehiculo.obs,

      // E965
      dNroMatVeh: vehiculo.numeroMatricula,

      // E966
      dNroVuelo: vehiculo.numeroVuelo,
    };
  }

  /**E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999)*/
  private get_gCamTrans(data: EDocData) {
    const transportista = data.transporte?.transportista;
    if (!transportista) return;

    const { chofer, agente } = transportista;

    return {
      // E981
      iNatTrans: transportista.contribuyente,

      // E982
      dNomTrans: transportista.nombre,

      // E983
      dDirTrans: transportista.direccion,

      // E984
      dRucTrans: transportista.rucID,

      // E985
      dDVTrans: transportista.rucDV,

      // E986
      iTipIDTrans: transportista.documentoTipo,

      // E987
      dDTipIDTrans: transportista.documentoTipoDescripcion,

      // E988
      dNumIDTrans: transportista.documentoNumero,

      // E989
      cNacTrans: transportista.pais,

      // E990
      dDesNacTrans: transportista.paisDescripcion,

      // E991
      dNumIDChof: chofer.documentoNumero,

      // E992
      dNomChof: chofer.nombre,

      // E993
      dDirChof: chofer.direccion,

      // E994
      dNombAg: agente?.nombre,

      // E995
      dRucAg: agente?.rucID,

      // E996
      dDVAg: agente?.rucDV,

      // E997
      dDirAge: agente?.direccion,
    };
  }
}

export default new TransporteXMLSG();
