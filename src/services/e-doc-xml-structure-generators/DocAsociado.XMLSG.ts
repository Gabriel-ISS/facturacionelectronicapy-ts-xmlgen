import { EDocData } from '../../schemas/EDoc.schema';
import { DocumentoAsociado } from '../../schemas/data/documentoAsociado.schema';

class DocAsociadoXMLSG {
  /**H. Campos que identifican al documento asociado (H001-H049)*/
  public get_gCamDEAsoc(data: EDocData) {
    const documentoAsociado = data.documentoAsociado;
    if (!documentoAsociado) return;

    if (Array.isArray(documentoAsociado)) {
      return documentoAsociado.map((da) => this.get_gCamDEAsoc_item(da));
    } else {
      return this.get_gCamDEAsoc_item(documentoAsociado);
    }
  }

  private get_gCamDEAsoc_item(documentoAsociado: DocumentoAsociado) {
    return {
      iTipDocAso: documentoAsociado.formato,
      dDesTipDocAso: documentoAsociado.formatoDescripcion,
      dCdCDERef: documentoAsociado.cdc,
      dRucFus: documentoAsociado.rucFusionado,
      dNTimDI: documentoAsociado.timbrado,
      dEstDocAso: documentoAsociado.establecimiento,
      dPExpDocAso: documentoAsociado.punto,
      dNumDocAso: documentoAsociado.numero,
      iTipoDocAso: documentoAsociado.tipoDocumentoImpreso,
      dDTipoDocAso: documentoAsociado.tipoDocumentoImpresoDescripcion,
      dFecEmiDI: documentoAsociado.fecha,
      dNumComRet: documentoAsociado.numeroRetencion,
      dNumResCF: documentoAsociado.resolucionCreditoFiscal,
      iTipCons: documentoAsociado.constanciaTipo,
      dDesTipCons: documentoAsociado.constanciaTipoDescripcion,
      dNumCons: documentoAsociado.constanciaNumero,
      dNumControl: documentoAsociado.constanciaControl,
    };
  }
}

export default new DocAsociadoXMLSG();
