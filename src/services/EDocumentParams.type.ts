export type EDocumentParams = {
  readonly version:               150;
  readonly ruc:                   string;
  readonly razonSocial:           string;
  readonly nombreFantasia:        string;
  readonly actividadesEconomicas: ActividadesEconomica[];
  readonly timbradoNumero:        string;
  /** Ej. "2022-08-25" */
  readonly timbradoFecha:         string;
  readonly tipoContribuyente:     number;
  readonly tipoRegimen:           number;
  readonly establecimientos:      Establecimiento[];
}

export type ActividadesEconomica = {
  readonly codigo:      string;
  readonly descripcion: string;
}

export type Establecimiento = {
  readonly codigo:                  string;
  readonly direccion:               string;
  readonly numeroCasa:              string;
  readonly complementoDireccion1:   string;
  readonly complementoDireccion2:   string;
  readonly departamento:            number;
  readonly departamentoDescripcion: string;
  readonly distrito:                number;
  readonly distritoDescripcion:     string;
  readonly ciudad:                  number;
  readonly ciudadDescripcion:       string;
  readonly telefono:                string;
  readonly email:                   string;
  readonly denominacion:            string;
}
