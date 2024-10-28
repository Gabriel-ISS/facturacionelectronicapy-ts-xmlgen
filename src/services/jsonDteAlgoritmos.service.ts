import fechaUtilService from '../helpers/DateHelper';
import { EDocumentData } from './EDocumentData.type';

class JSonDteAlgoritmosService {
  /**
   * Calcula Digito Verificador numérico con entrada alfanumérica y basemax 11
   */
  public calcularDigitoVerificador(cdc: String, baseMax: number = 11) {
    let v_total = 0;
    let v_resto = 0;
    let k = 0;
    let v_numero_aux = 0;
    let v_numero_al = '';
    let v_caracter = '';
    let v_digit = 0;

    // Cambia la ultima letra por ascii en caso que la cedula termine en letra
    for (let i = 0; i < cdc.length; i++) {
      v_caracter = cdc.toUpperCase().substring(i, i + 1);
      if (!(v_caracter.charCodeAt(0) >= 48 && v_caracter.charCodeAt(0) <= 57)) {
        v_numero_al = v_numero_al + v_caracter.charCodeAt(0);
      } else {
        v_numero_al = v_numero_al + v_caracter;
      }
    }

    // Calcula el DV
    k = 2;
    v_total = 0;
    //FOR i IN REVERSE 1 .. LENGTH(v_numero_al) LOOP
    for (let i = v_numero_al.length; i > 0; i--) {
      if (k > baseMax) {
        k = 2;
      }
      v_numero_aux = parseInt(v_numero_al.substring(i - 1, i));
      v_total = v_total + v_numero_aux * k;
      k = k + 1;
    }
    v_resto = v_total % 11;
    if (v_resto > 1) {
      v_digit = 11 - v_resto;
    } else {
      v_digit = 0;
    }
    return v_digit;
  }

  /**
   * Generacion del codigo de control de 44 digitos
   *
   * Conformacion del CDC
   * 1. Tipo de Documento, iTiDE, 2, Completar con left zero hasta alcanzar 2 digit.
   * 2. Ruc Emisor, dRucEm, 8, Completar con left zero hasta 8
   * 3. DV del Emisor, dDVEmi, 1, Digito verificador del emisor.
   * 4. Establecimiento, dEst, 3, Establecimiento
   * 5. Punto de Expedicion, dPunExp, 3, Punto de Expe.
   * 6. Numero de Docummento, dNumDoc, 7, Numero de DE, completar con left zero hasta 7
   * 7. Tipo de Contribuyente, iTipCon, 1, Codigo del tipo de contribuyente
   * 8. Fecha Emision, dFeEmiDE, 8, en formato AAAAMMDD
   * 9. Tipo de Emision, iTipEmi, 1, Tipo de Emision
   * 10. Codigo de Seguridad, dCodSeg, 9, Num. Aleatorio
   * 11. Digito Verificador, dDVId, 1, Resultado del Algoritmo M. 11
   *
   * @param data
   * @returns
   */
  public generateCodigoControl(
    params: any,
    data: EDocumentData,
    codigoSeguridad: any,
  ) {
    if (params.ruc.indexOf('-') == -1) {
      throw new Error('RUC debe contener dígito verificador en params.ruc');
    }
    const tipoDocumento = data.tipoDocumento;

    let [rucEmisor, dvEmisor] = (params.ruc as string).split('-');

    let rucEmisorParaCalculoDV = rucEmisor;
    let dvEmisorParaCalculoDV = dvEmisor;

    rucEmisor = rucEmisor.padStart(8, '0');

    const establecimiento = data.establecimiento.padStart(3, '0');
    const punto = data.punto.padStart(3, '0');
    const numero = data.numero.padStart(7, '0');
    const tipoContribuyente = params['tipoContribuyente'];
    const fechaEmision = fechaUtilService.getCDCFormatDateString(
      new Date(data['fecha']),
    );
    const tipoEmision = data.tipoEmision; //1=Normal 2=Contingencia
    const codigoSeguridadAleatorio = codigoSeguridad;

    let cdc =
      tipoDocumento.toString().padStart(2, '0') +
      rucEmisor +
      dvEmisor +
      establecimiento +
      punto +
      numero +
      tipoContribuyente +
      fechaEmision +
      tipoEmision +
      codigoSeguridadAleatorio;

    //Si el RUC tiene letras A, B o C, esas letras hay que reemplazar con el código ASCII
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.replace('A', '65');
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.replace('B', '66');
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.replace('C', '67');
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.replace('a', '97');
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.replace('b', '98');
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.replace('c', '99');
    rucEmisorParaCalculoDV = rucEmisorParaCalculoDV.padStart(8, '0');

    let cdcParaCalculoDV =
      tipoDocumento.toString().padStart(2, '0') +
      rucEmisorParaCalculoDV +
      dvEmisorParaCalculoDV +
      establecimiento +
      punto +
      numero +
      tipoContribuyente +
      fechaEmision +
      tipoEmision +
      codigoSeguridadAleatorio;

    //const digitoVerificador = this.calcularDigitoVerificador(cdcParaCalculoDV, 11);
    const digitoVerificador = this.calcularDigitoVerificador(cdc, 11);
    cdc += digitoVerificador;
    return cdc;
  }
}

export default new JSonDteAlgoritmosService();
