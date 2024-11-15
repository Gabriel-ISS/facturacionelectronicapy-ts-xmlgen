/**
 * Calcula Digito Verificador numérico con entrada alfanumérica y basemax 11
 * @link https://www.dnit.gov.py/documents/d/global/digito-verificador
 */
export default function calcDV(cdc: string, baseMax: number = 11) {
  let v_total = 0,
    v_resto,
    k = 2,
    v_digit;
  let v_numero_al = '';

  for (let i = 0; i < cdc.length; i++) {
    let v_caracter = cdc[i];
    if (v_caracter >= '0' && v_caracter <= '9') {
      v_numero_al += v_caracter;
    } else {
      v_numero_al += v_caracter.charCodeAt(0);
    }
  }

  let i = v_numero_al.length - 1;
  let p = v_numero_al.charCodeAt(i);

  while (i--) {
    k = k > baseMax ? 2 : k;
    let v_numero_aux = p - 48;
    v_total += v_numero_aux * k++;
    p = v_numero_al.charCodeAt(i);
  }

  v_resto = v_total % 11;
  v_digit = v_resto > 1 ? 11 - v_resto : 0;

  return v_digit;
}
