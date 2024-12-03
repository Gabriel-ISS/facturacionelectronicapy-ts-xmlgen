export type XmlGenConfig = {
  /**
   * En consideración a la Resolución 347 del 2014 (Secretaría de Defensa del Consumidor-
   * SEDECO).
   * Resta a los valores de la sección F un valor menor a 50, para que sea múltiplo de 50 guaranies.
   * @see https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907
   */
  redondeoSedeco?: boolean;
  decimals?: number;
  taxDecimals?: number;
  pygDecimals?: number;
  pygTaxDecimals?: number;
  /**
   * Cantidad de decimales para resultados parciales
   * de base de impuestos (dBasExe dBasGravIva, dLiqIVAItem)
   */
  partialTaxDecimals?: number;
  userObjectRemove?: boolean;
  /**
   * Indica si se debe generar XML en formato de TEST, por default false,
   * a partir del 21/04/2023
   * */
  test: boolean;
};
