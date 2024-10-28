import constanteService from './constants.service';
import StringUtilService from './StringUtil.service';

class JSonDteTransporteService {
  /**
   * E10. Campos que describen el transporte de las mercaderías (E900-E999)
   *
   * @param params
   * @param data
   * @param options
   */
  public generateDatosTransporte(params: any, data: any) {
    const jsonResult: any = {
      iTipTrans: data.detalleTransporte['tipo'],
      dDesTipTrans: constanteService.transportTypes.filter((tt) => tt.code == data.detalleTransporte['tipo'])[0][
        'description'
      ],
      iModTrans: data.detalleTransporte['modalidad'],
      dDesModTrans: constanteService.transportModalities.filter(
        (mt) => mt.code == data.detalleTransporte['modalidad'],
      )[0]['description'],
      iRespFlete: data.detalleTransporte['tipoResponsable'],
      //cCondNeg: data.detalleTransporte['condicionNegociacion'],
    };

    if (data.detalleTransporte['condicionNegociacion']) {
      jsonResult['cCondNeg'] = data.detalleTransporte['condicionNegociacion'];
    }
    if (data.detalleTransporte['numeroManifiesto']) {
      jsonResult['dNuManif'] = data.detalleTransporte['numeroManifiesto'];
    }
    if (data.detalleTransporte && data.detalleTransporte['numeroDespachoImportacion']) {
      if (data.detalleTransporte['numeroDespachoImportacion'].length >= 16) {
        jsonResult['dNuDespImp'] = data.detalleTransporte['numeroDespachoImportacion'].substring(0, 16);
      }
    }
    if (data.detalleTransporte['inicioEstimadoTranslado']) {
      jsonResult['dIniTras'] = (data.detalleTransporte['inicioEstimadoTranslado'] + '').substring(0, 10);
    }
    if (data.detalleTransporte['finEstimadoTranslado']) {
      jsonResult['dFinTras'] = (data.detalleTransporte['finEstimadoTranslado'] + '').substring(0, 10);
    }
    if (data.detalleTransporte['paisDestino']) {
      jsonResult['cPaisDest'] = data.detalleTransporte['paisDestino'];
      jsonResult['dDesPaisDest'] = constanteService.countries.filter(
        (pais) => pais.code === data.detalleTransporte['paisDestino'],
      )[0]['description'];
    }

    if (data.detalleTransporte['salida']) {
      jsonResult['gCamSal'] = this.generateDatosSalida(params, data);
    }

    if (data.detalleTransporte['entrega']) {
      jsonResult['gCamEnt'] = this.generateDatosEntrega(params, data);
    }

    if (data.detalleTransporte['vehiculo']) {
      jsonResult['gVehTras'] = this.generateDatosVehiculo(params, data);
    }

    if (data.detalleTransporte['transportista']) {
      jsonResult['gCamTrans'] = this.generateDatosTransportista(params, data);
    }

    return jsonResult;
  }

  /**
   * E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosSalida(params: any, data: any) {
    const jsonResult: any = {
      dDirLocSal: data.detalleTransporte['salida']['direccion'],
    };

    if (!data.detalleTransporte['salida']['numeroCasa']) {
      data.detalleTransporte['salida']['numeroCasa'] = '0';
    }
    jsonResult['dNumCasSal'] = data.detalleTransporte['salida']['numeroCasa'];

    if (data.detalleTransporte['salida']['complementoDireccion1']) {
      jsonResult['dComp1Sal'] = data.detalleTransporte['salida']['complementoDireccion1'];
    }

    if (data.detalleTransporte['salida']['complementoDireccion2']) {
      jsonResult['dComp2Sal'] = data.detalleTransporte['salida']['complementoDireccion2'];
    }

    jsonResult['cDepSal'] = +data.detalleTransporte['salida']['departamento'];
    jsonResult['dDesDepSal'] = constanteService.departments.filter(
      (td) => td.code === +data.detalleTransporte['salida']['departamento'],
    )[0]['description'];

    jsonResult['cDisSal'] = data.detalleTransporte['salida']['distrito'];
    jsonResult['dDesDisSal'] = constanteService.districts.filter(
      (td) => td.code === +data.detalleTransporte['salida']['distrito'],
    )[0]['description'];

    jsonResult['cCiuSal'] = +data.detalleTransporte['salida']['ciudad'];
    jsonResult['dDesCiuSal'] = constanteService.cities.filter(
      (td) => td.code === +data.detalleTransporte['salida']['ciudad'],
    )[0]['description'];

    if (
      data.detalleTransporte &&
      data.detalleTransporte['salida'] &&
      data.detalleTransporte['salida']['telefonoContacto']
    ) {
      if (data.detalleTransporte['salida']['telefonoContacto'].length >= 6) {
        jsonResult['dTelSal'] = data.detalleTransporte['salida']['telefonoContacto'];
      }
    }
    return jsonResult;
  }

  /**
   * E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosEntrega(params: any, data: any) {
    const jsonResult: any = {
      dDirLocEnt: data.detalleTransporte['entrega']['direccion'],
    };

    if (!data.detalleTransporte['entrega']['numeroCasa']) {
      data.detalleTransporte['entrega']['numeroCasa'] = '0';
    }
    jsonResult['dNumCasEnt'] = data.detalleTransporte['entrega']['numeroCasa'];

    if (data.detalleTransporte['entrega']['complementoDireccion1']) {
      jsonResult['dComp1Ent'] = data.detalleTransporte['entrega']['complementoDireccion1'];
    }
    if (data.detalleTransporte['entrega']['complementoDireccion2']) {
      jsonResult['dComp2Ent'] = data.detalleTransporte['entrega']['complementoDireccion2'];
    }

    if (data.detalleTransporte['entrega']['departamento']) {
      jsonResult['cDepEnt'] = +data.detalleTransporte['entrega']['departamento'];

      jsonResult['dDesDepEnt'] = constanteService.departments.filter(
        (td) => td.code === +data.detalleTransporte['entrega']['departamento'],
      )[0]['description'];
    }

    if (data.detalleTransporte['entrega']['distrito']) {
      jsonResult['cDisEnt'] = +data.detalleTransporte['entrega']['distrito'];

      jsonResult['dDesDisEnt'] = constanteService.districts.filter(
        (td) => td.code === +data.detalleTransporte['entrega']['distrito'],
      )[0]['description'];
    }

    if (data.detalleTransporte['entrega']['ciudad']) {
      jsonResult['cCiuEnt'] = +data.detalleTransporte['entrega']['ciudad'];

      jsonResult['dDesCiuEnt'] = constanteService.cities.filter(
        (td) => td.code === +data.detalleTransporte['entrega']['ciudad'],
      )[0]['description'];
    }

    if (
      data.detalleTransporte &&
      data.detalleTransporte['entrega'] &&
      data.detalleTransporte['entrega']['telefonoContacto']
    ) {
      if (data.detalleTransporte['entrega']['telefonoContacto'].length >= 6) {
        jsonResult['dTelEnt'] = data.detalleTransporte['entrega']['telefonoContacto'];
      }
    }
    return jsonResult;
  }

  /**
     * E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979)

     * 
     * @param params 
     * @param data 
     * @param options 
     * @param items Es el item actual del array de items de "data" que se está iterando
     */
  private generateDatosVehiculo(params: any, data: any) {
    const jsonResult: any = {
      dTiVehTras: data.detalleTransporte['vehiculo']['tipo'],
      dMarVeh: data.detalleTransporte['vehiculo']['marca'],
    };

    if (data.detalleTransporte['vehiculo']['documentoTipo']) {
      jsonResult['dTipIdenVeh'] = data.detalleTransporte['vehiculo']['documentoTipo'];
    }

    if (data.detalleTransporte['vehiculo']['documentoNumero']) {
      jsonResult['dNroIDVeh'] = data.detalleTransporte['vehiculo']['documentoNumero'];
    }
    if (
      data.detalleTransporte &&
      data.detalleTransporte['vehiculo'] &&
      data.detalleTransporte['vehiculo']['obs']
    ) {
      jsonResult['dAdicVeh'] = data.detalleTransporte['vehiculo']['obs'];
    }
    if (data.detalleTransporte['vehiculo']['numeroMatricula']) {
      jsonResult['dNroMatVeh'] = data.detalleTransporte['vehiculo']['numeroMatricula'];
    }
    if (data.detalleTransporte['vehiculo']['numeroVuelo']) {
      if (data.detalleTransporte['vehiculo']['numeroVuelo'].length >= 6) {
        jsonResult['dNroVuelo'] = data.detalleTransporte['vehiculo']['numeroVuelo'].substring(0, 6);
      }
    }
    return jsonResult;
  }

  /**
   * E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosTransportista(params: any, data: any) {
    const jsonResult: any = {
      iNatTrans: data.detalleTransporte['transportista']['contribuyente'] ? 1 : 2,
      dNomTrans: data.detalleTransporte['transportista']['nombre'],
    };

    if (data.detalleTransporte['transportista']['contribuyente']) {
      jsonResult['dRucTrans'] = data.detalleTransporte['transportista']['ruc'].split('-')[0];
      jsonResult['dDVTrans'] = data.detalleTransporte['transportista']['ruc'].split('-')[1];
    }

    if (!data.detalleTransporte['transportista']['contribuyente']) {
      jsonResult['iTipIDTrans'] = data.detalleTransporte['transportista']['documentoTipo'];
      jsonResult['dDTipIDTrans'] = constanteService.identityDocuments.filter(
        (td) => td.code === data.detalleTransporte['transportista']['documentoTipo'],
      )[0]['description'];
      jsonResult['dNumIDTrans'] = data.detalleTransporte['transportista']['documentoNumero'].substring(0, 20);
    }

    if (data.detalleTransporte['transportista'] && data.detalleTransporte['transportista']['pais']) {
      jsonResult['cNacTrans'] = data.detalleTransporte['transportista']['pais'];
      jsonResult['dDesNacTrans'] = constanteService.countries.filter(
        (pais) => pais.code === data.detalleTransporte['transportista']['pais'],
      )[0]['description'];
    }

    if (data.detalleTransporte['transportista']['chofer']['documentoNumero']) {
      jsonResult['dNumIDChof'] = data.detalleTransporte['transportista']['chofer']['documentoNumero'].substring(
        0,
        20,
      );
    }

    jsonResult['dNomChof'] = data.detalleTransporte['transportista']['chofer']['nombre'];

    //if (data.detalleTransporte['transportista']['direccion']) {
    //MT010 - pasa a ser obligatorio
    jsonResult['dDomFisc'] = data.detalleTransporte['transportista']['direccion'];
    //}

    //if (data.detalleTransporte['transportista']['chofer']['direccion']) {
    //MT010 - pasa a ser obligatorio
    jsonResult['dDirChof'] = data.detalleTransporte['transportista']['chofer']['direccion'];
    //}

    if (
      data.detalleTransporte['transportista']['agente'] &&
      data.detalleTransporte['transportista']['agente']['ruc']
    ) {
      jsonResult['dNombAg'] = data.detalleTransporte['transportista']['agente']['nombre'];
      jsonResult['dRucAg'] = data.detalleTransporte['transportista']['agente']['ruc'].split('-')[0];
      jsonResult['dDVAg'] = data.detalleTransporte['transportista']['agente']['ruc'].split('-')[1];
      jsonResult['dDirAge'] = data.detalleTransporte['transportista']['agente']['direccion'];
    }

    return jsonResult;
  }
}

export default new JSonDteTransporteService();
