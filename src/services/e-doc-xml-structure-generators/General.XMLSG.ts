import { ValidDocumentType } from '../../constants/documentTypes.constants';
import { EDocParams, EDocData } from '../../schemas/EDoc.schema';

class GeneralXMLSG {
  /**D. Campos Generales del Documento Electrónico DE (D001-D299) */
  public get_gDatGralOpe(params: EDocParams, data: EDocData) {
    return {
      // D002
      dFeEmiDE: data.fecha,

      // D1. Campos inherentes a la operación comercial (D010-D099)
      gOpeCom: this.get_gOpeCom(data),

      // D2. Campos que identifican al emisor del Documento Electrónico DE (D100-D129)*/
      gEmis: this.get_gEmis(params, data),

      // D3. Campos que identifican al receptor del Documento Electrónico DE (D200-D299)*/
      gDatRec: this.get_gDatRec(data),
    };
  }

  /**D1. Campos inherentes a la operación comercial (D010-D099) */
  private get_gOpeCom(data: EDocData) {
    // C002 = 7
    if (data.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA) {
      // No informa si el tipo de documento es 7
      return;
    }

    return {
      // D011
      iTipTra: data.tipoTransaccion,

      // D012
      dDesTipTra: data.descripcionTipoTransaccion,

      // D013
      iTImp: data.tipoImpuesto,

      // D014
      dDesTImp: data.descripcionTipoImpuesto,

      // D015
      cMoneOpe: data.moneda,

      // D016
      dDesMoneOpe: data.descripcionMoneda,

      // D017
      dCondTipCam: data.condicionTipoCambio,

      // D018
      dTiCam: data.cambio,

      // D019
      iCondAnt: data.condicionAnticipo,

      // D020
      dDesCondAnt: data.descripcionCondicionAnticipo,

      // D1.1. Campos que identifican las obligaciones afectadas (D030-D040)
      gOblAfe: this.get_gOblAfe(data),
    };
  }

  /** D1.1. Campos que identifican las obligaciones afectadas (D030-D040)
   * @link https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642
   */
  private get_gOblAfe(data: EDocData) {
    if (!data.obligaciones) return undefined;

    return data.obligaciones.map((ob) => ({
      cOblAfe: ob.codigo,
      dDesOblAfe: ob.descripcion,
    }));
  }

  /** D2. Campos que identifican al emisor del Documento Electrónico DE (D100-D129)*/
  private get_gEmis(params: EDocParams, data: EDocData) {
    const foundEst = params.establecimientos.find(
      (e) => e.codigo === data.establecimiento,
    );
    if (!foundEst) {
      throw new Error(
        `Establecimiento '${
          data.establecimiento
        }' no encontrado en params.establecimientos*.codigo. Valores: ${params.establecimientos.map(
          (a) => a.codigo + '-' + a.denominacion,
        )}`,
      );
    }

    return {
      // D101
      dRucEm: params.rucID,

      // D102
      dDVEmi: params.rucDV,

      // D103
      iTipCont: params.tipoContribuyente,

      // D104
      cTipReg: params.tipoRegimen,

      // D105
      dNomEmi: params.razonSocial,

      // D106
      dNomFanEmi: params.nombreFantasia,

      // D107
      dDirEmi: foundEst.direccion,

      // D108
      dNumCas: foundEst.numeroCasa,

      // D109
      dCompDir1: foundEst.complementoDireccion1,

      // D110
      dCompDir2: foundEst.complementoDireccion2,

      // D111
      cDepEmi: foundEst.departamento,

      // D112
      dDesDepEmi: foundEst.departamentoDescripcion,

      // D113
      cDisEmi: foundEst.distrito,

      // D114
      dDesDisEmi: foundEst.distritoDescripcion,

      // D115
      cCiuEmi: foundEst.ciudad,

      // D116
      dDesCiuEmi: foundEst.ciudadDescripcion,

      // D117
      dTelEmi: foundEst.telefono,

      // D118
      dEmailE: foundEst.email,

      // D119
      dDenSuc: foundEst.denominacion,

      // D2.1 Campos que describen la actividad económica del emisor (D130-D139)
      gActEco: this.get_gActEco(params),

      // D2.2 Campos que identifican al responsable de la generación del DE (D140-D160)
      gRespDE: this.get_gRespDE(data),
    };
  }

  /**D2.1 Campos que describen la actividad económica del emisor (D130-D139) */
  private get_gActEco(params: EDocParams) {
    return params.actividadesEconomicas.map((act) => ({
      cActEco: act.codigo,
      dDesActEco: act.descripcion,
    }));
  }

  /**D2.2 Campos que identifican al responsable de la generación del DE (D140-D160) */
  private get_gRespDE(data: EDocData) {
    const user = data.usuario;
    if (!user) return undefined;

    return {
      // D141
      iTipIDRespDE: user.documentoTipo,

      // D142
      dDTipIDRespDE: user.documentoTipoDescripcion,

      // D143
      dNumIDRespDE: user.documentoNumero,

      // D144
      dNomRespDE: user.nombre,

      // D145
      dCarRespDE: user.cargo,
    };
  }

  /** D3. Campos que identifican al receptor del Documento Electrónico DE (D200-D299)*/
  private get_gDatRec(data: EDocData) {
    const client = data.cliente;

    return {
      // D201
      iNatRec: client.contribuyente,

      // D202
      iTiOpe: client.tipoOperacion,

      // D203
      cPaisRec: client.pais,

      // D204
      dDesPaisRe: client.paisDescripcion,

      // D205
      iTiContRec: client.tipoContribuyente,

      // D206
      dRucRec: client.rucID,

      // D207
      dDVRec: client.rucDV,

      // D208
      iTipIDRec: client.documentoTipo,

      // D209
      dDTipIDRec: client.descripcionTipoDocumento,

      // D210
      dNumIDRec: client.documentoNumero,

      // D211
      dNomRec: client.razonSocial,

      // D212
      dNomFanRec: client.nombreFantasia,

      // D213
      dDirRec: client.direccion,

      // D218
      dNumCasRec: client.numeroCasa,

      // D219
      cDepRec: client.departamento,

      // D220
      dDesDepRec: client.descripcionDepartamento,

      // D221
      cDisRec: client.distrito,

      // D222
      dDesDisRec: client.descripcionDistrito,

      // D223
      cCiuRec: client.ciudad,

      // D224
      dDesCiuRec: client.descripcionCiudad,

      // D214
      dTelRec: client.telefono,

      // D215
      dCelRec: client.celular,

      // D216
      dEmailRec: client.email,

      // D217
      dCodCliente: client.codigo,
    };
  }
}

export default new GeneralXMLSG();