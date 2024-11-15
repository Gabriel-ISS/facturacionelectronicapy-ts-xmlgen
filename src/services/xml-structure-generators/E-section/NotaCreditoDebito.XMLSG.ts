import { EDocData } from '../../../schemas/EDoc.schema';

class NotaCreditoDebitoXMLSG {
  /**E5. Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499) */
  public get_gCamNCDE(data: EDocData) {
    const notaCreditoDebito = data.notaCreditoDebito;
    if (!notaCreditoDebito) return;

    return {
      iMotEmi: notaCreditoDebito.motivo,
      dDesMotEmi: notaCreditoDebito.motivoDescripcion,
    };
  }
}

export default new NotaCreditoDebitoXMLSG();