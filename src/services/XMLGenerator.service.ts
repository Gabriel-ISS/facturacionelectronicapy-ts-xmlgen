import xml2js from 'xml2js';

import { EDocData, EDocParams } from '../schemas/EDoc.schema';
import { XmlGenConfig } from '../types/XmlGenConfig';
import constantService from './constants.service';
import ComplementariosEspXMLSG from './xml-structure-generators/E-section/ComplementariosEsp.XMLSG';
import ComplementariosGenXMLSG from './xml-structure-generators/ComplementariosGen.XMLSG';
import CondicionXMLSG from './xml-structure-generators/E-section/Condicion.XMLSG';
import { default as DocAsociadoXMLSG, default as jsonDteDocumentIdentify } from './xml-structure-generators/DocAsociado.XMLSG';
import FacturaXMLSG from './xml-structure-generators/E-section/Factura.XMLSG';
import GeneralXMLSG from './xml-structure-generators/General.XMLSG';
import ItemsXMLSG from './xml-structure-generators/E-section/Items.XMLSG';
import TotalesXMLSG from './xml-structure-generators/Totales.XMLSG';
import TransporteXMLSG from './xml-structure-generators/E-section/Transporte.XMLSG';
import AutoFacturaXMLSG from './xml-structure-generators/E-section/AutoFactura.XMLSG';
import NotaRemisionXMLSG from './xml-structure-generators/E-section/NotaRemision.XMLSG';
import NotaCreditoDebitoXMLSG from './xml-structure-generators/E-section/NotaCreditoDebito.XMLSG';

// TODO: Nada de any
class XMLGenerator {
  private defaultConfig: XmlGenConfig = {
    errorSeparator: '; ',
    errorLimit: 10,
    redondeoSedeco: true,
    decimals: 2,
    taxDecimals: 2,
    pygDecimals: 0,
    partialTaxDecimals: 8,
    pygTaxDecimals: 0,
    userObjectRemove: false,
    test: false, //Para ambiente de test se debe informar true por "config" exterior..
  };

  private xmlBuilder = new xml2js.Builder({
    xmldec: {
      version: '1.0',
      encoding: 'UTF-8',
      standalone: false,
    },
    renderOpts: {
      //Para firmar tiene que estar normalizado
      pretty: false,
    },
  });

  public generateXMLDocument(
    params: EDocParams,
    data: EDocData,
    config?: XmlGenConfig,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // TODO: empezar a usar
        config = { ...this.defaultConfig, ...config };

        const xmlStructure = this.transformToXMLStructure(params, data);

        const xml = this.xmlBuilder.buildObject(xmlStructure);

        resolve(xml);
      } catch (error) {
        reject(error);
      }
    });
  }

  private transformToXMLStructure(
    params: EDocParams,
    data: EDocData,
  ) {
    return {
      rDE: this.get_rDE(params, data),
    };
  }

  private get_rDE(params: EDocParams, data: EDocData) {
    // ver: "7.2.2.1. Particularidad de la firma digital"
    // todos los valores dentro del $ son atributos de la etiqueta

    return removeUndefinedValues({
      $: {
        xmlns: 'http://ekuatia.set.gov.py/sifen/xsd',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation':
          'http://ekuatia.set.gov.py/sifen/xsd/siRecepDE_v150.xsd',
      },
      dVerFor: params.version,
      DE: this.get_DE(params, data),
      
      // I. Información de la Firma Digital del DTE (I001-I049)
      Signature: undefined,

      // J. Campos fuera de la Firma Digital (J001-J049)
      gCamFuFD: undefined,
    });
  }

  /**A. Campos firmados del Documento Electrónico (A001-A099) */
  private get_DE(params: EDocParams, data: EDocData) {
    return {
      $: {
        // A002
        Id: data.Id,
      },

      // A003
      dDVId: data.dvId,

      // A004
      dFecFirma: data.fechaFirmaDigital,

      // A005
      dSisFact: data.sistemaDeFacturacion,

      // B. Campos inherentes a la operación de Documentos Electrónicos (B001-B099)
      gOpeDE: this.get_gOpeDE(data),

      // C. Campos de datos del Timbrado (C001-C099)
      gTimb: this.get_gTimb(params, data),

      // D. Campos Generales del Documento Electrónico DE (D001-D299)
      gDatGralOpe: GeneralXMLSG.get_gDatGralOpe(params, data),

      // E. Campos específicos por tipo de Documento Electrónico (E001-E009)
      gDtipDE: this.get_gDtipDE(data),

      // F. Campos que describen los subtotales y totales de la transacción documentada (F001-F099)
      gTotSub: TotalesXMLSG.get_gTotSub(data),

      // G. Campos complementarios comerciales de uso general (G001-G049)
      gCamGen: ComplementariosGenXMLSG.get_gCamGen(data),

      // H. Campos que identifican al documento asociado (H001-H049)
      gCamDEAsoc: DocAsociadoXMLSG.get_gCamDEAsoc(data),
    };
  }

  /**B. Campos inherentes a la operación de Documentos Electrónicos (B001-B099) */
  private get_gOpeDE(data: EDocData) {
    return {
      // B002
      iTipEmi: data.tipoEmision,

      // B003
      dDesTipEmi: data.descripcionEmision,

      // B004
      dCodSeg: data.codigoSeguridadAleatorio,

      // B005
      dInfoEmi: data.observacion,

      // B006
      dInfoFisc: data.descripcion,
    };
  }

  /**C. Campos de datos del Timbrado (C001-C099) */
  private get_gTimb(params: EDocParams, data: EDocData) {
    return {
      // C002
      iTiDE: data.tipoDocumento,

      // C003
      dDesTiDE: data.descripcionDocumento,

      // C004
      dNumTim: params.timbradoNumero,

      // C005
      dEst: data.establecimiento,

      // C006
      dPunExp: data.punto,

      // C007
      dNumDoc: data.numero,

      // C008
      dFeIniT: params.timbradoFecha,

      // C010
      dSerieNum: data.serie,
    };
  }

  /**E. Campos específicos por tipo de Documento Electrónico (E001-E009)*/
  private get_gDtipDE(data: EDocData) {
    return {
      // E1. Campos que componen la Factura Electrónica FE (E002-E099)
      gCamFE: FacturaXMLSG.get_gCamFE(data),

      // E4. Campos que componen la Autofactura Electrónica AFE (E300-E399)
      gCamAE: AutoFacturaXMLSG.get_gCamAE(data),

      // E5. Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499)
      gCamNCDE: NotaCreditoDebitoXMLSG.get_gCamNCDE(data),

      // E6. Campos que componen la Nota de Remisión Electrónica (E500-E599)
      gCamNRE: NotaRemisionXMLSG.get_gCamNRE(data),

      // E7. Campos que describen la condición de la operación (E600-E699)
      gCamCond: CondicionXMLSG.get_gCamCond(data),

      // E8. Campos que describen los ítems de la operación (E700-E899)
      gCamItem: ItemsXMLSG.get_gCamItem(data),

      // E9. Campos complementarios comerciales de uso específico (E790-E899)
      gCamEsp: ComplementariosEspXMLSG.get_gCamEsp(data),

      // E10. Campos que describen el transporte de las mercaderías (E900-E999)
      gCamTrans: TransporteXMLSG.get_gTransp(data),
    };
  }
}

export default new XMLGenerator();
