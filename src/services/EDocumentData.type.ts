import { Currency } from '../constants/curencies.constants';
import { ValidDocumentType } from '../constants/documentTypes.constants';

export type EDocumentData = {
  readonly tipoDocumento:            ValidDocumentType;
  readonly establecimiento:          string;
  readonly codigoSeguridadAleatorio: string;
  readonly punto:                    string;
  readonly numero:                   string;
  readonly descripcion:              string;
  readonly observacion:              string;
  /** Ej. "2022-08-14T10:11:00" */
  readonly fecha:                    string;
  readonly tipoEmision:              number;
  readonly tipoTransaccion:          number;
  readonly tipoImpuesto:             number;
  readonly moneda:                   Currency;
  readonly condicionAnticipo:        number;
  readonly condicionTipoCambio:      number;
  readonly descuentoGlobal:          number;
  readonly anticipoGlobal:           number;
  readonly cambio:                   number;
  readonly cliente:                  Cliente;
  readonly usuario:                  Usuario;
  readonly factura:                  Factura;
  readonly autoFactura:              AutoFactura;
  readonly notaCreditoDebito:        NotaCreditoDebito;
  readonly remision:                 Remision;
  readonly condicion:                Condicion;
  readonly items:                    Item[];
  readonly sectorEnergiaElectrica:   SectorEnergiaElectrica;
  readonly sectorSeguros:            SectorSeguros;
  readonly sectorSupermercados:      SectorSupermercados;
  readonly sectorAdicional:          SectorAdicional;
  readonly detalleTransporte:        DetalleTransporte;
  readonly complementarios:          Complementarios;
  readonly documentoAsociado:        DocumentoAsociado;
  readonly cdc:                      string;
}

export type AutoFactura = {
  readonly tipoVendedor:            number;
  readonly documentoTipo:           number;
  readonly documentoNumero:         number;
  readonly nombre:                  string;
  readonly direccion:               string;
  readonly numeroCasa:              string;
  readonly departamento:            number;
  readonly departamentoDescripcion: string;
  readonly distrito:                number;
  readonly distritoDescripcion:     string;
  readonly ciudad:                  number;
  readonly ciudadDescripcion:       string;
  readonly transaccion:             Transaccion;
}

export type Transaccion = {
  readonly lugar:                   string;
  readonly departamento:            number;
  readonly departamentoDescripcion: string;
  readonly distrito:                number;
  readonly distritoDescripcion:     string;
  readonly ciudad:                  number;
  readonly ciudadDescripcion:       string;
}

export type Cliente = {
  readonly contribuyente:           boolean;
  readonly ruc:                     string;
  readonly razonSocial:             string;
  readonly nombreFantasia:          string;
  readonly tipoOperacion:           number;
  readonly direccion:               string;
  readonly numeroCasa:              string;
  readonly departamento:            number;
  readonly departamentoDescripcion: string;
  readonly distrito:                number;
  readonly distritoDescripcion:     string;
  readonly ciudad:                  number;
  readonly ciudadDescripcion:       string;
  readonly pais:                    string;
  readonly paisDescripcion:         string;
  readonly tipoContribuyente:       number;
  readonly documentoTipo:           number;
  readonly documentoNumero:         string;
  readonly telefono:                string;
  readonly celular:                 string;
  readonly email:                   string;
  readonly codigo:                  string;
}

export type Complementarios = {
  readonly ordenCompra:   string;
  readonly ordenVenta:    string;
  readonly numeroAsiento: string;
  readonly carga?:        Complementarios;
}

export type Condicion = {
  readonly tipo:     number;
  readonly entregas: Entregas[];
  readonly credito:  Credito;
}

export type Credito = {
  readonly tipo:         number;
  readonly plazo:        string;
  readonly cuotas:       number;
  readonly montoEntrega: number;
  readonly infoCuotas:   InfoCuota[];
}

export type InfoCuota = {
  readonly moneda:      string;
  readonly monto:       number;
  readonly vencimiento: Date;
}

export type Entregas = {
  readonly tipo:         number;
  readonly monto:        string;
  readonly moneda:       string;
  readonly cambio:       number;
  readonly infoTarjeta?: InfoTarjeta;
  readonly infoCheque?:  InfoCheque;
}

export type InfoCheque = {
  readonly numeroCheque: string;
  readonly banco:        string;
}

export type InfoTarjeta = {
  readonly tipo:               number;
  readonly tipoDescripcion:    string;
  readonly titular:            string;
  readonly ruc:                string;
  readonly razonSocial:        string;
  readonly medioPago:          number;
  readonly codigoAutorizacion: number;
}

export type DetalleTransporte = {
  readonly tipo:                      number;
  readonly modalidad:                 number;
  readonly tipoResponsable:           number;
  readonly condicionNegociacion:      string;
  readonly numeroManifiesto:          string;
  readonly numeroDespachoImportacion: string;
  readonly inicioEstimadoTranslado:   Date;
  readonly finEstimadoTranslado:      Date;
  readonly paisDestino:               string;
  readonly paisDestinoNombre:         string;
  readonly salida:                    Entrega;
  readonly entrega:                   Entrega;
  readonly vehiculo:                  Vehiculo;
  readonly transportista:             Transportista;
}

export type Entrega = {
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
  readonly pais:                    string;
  readonly paisDescripcion:         string;
  readonly telefonoContacto:        string;
}

export type Transportista = {
  readonly contribuyente:   boolean;
  readonly nombre:          string;
  readonly ruc:             string;
  readonly documentoTipo:   number;
  readonly documentoNumero: string;
  readonly direccion:       string;
  readonly obs:             number;
  readonly pais:            string;
  readonly paisDescripcion: string;
  readonly chofer:          Chofer;
  readonly agente:          Agente;
}

export type Agente = {
  readonly nombre:    string;
  readonly ruc:       string;
  readonly direccion: string;
}

export type Chofer = {
  readonly documentoNumero: string;
  readonly nombre:          string;
  readonly direccion:       string;
}

export type Vehiculo = {
  readonly tipo:            number;
  readonly marca:           string;
  readonly documentoTipo:   number;
  readonly documentoNumero: string;
  readonly obs:             string;
  readonly numeroMatricula: string;
  readonly numeroVuelo:     number;
}

export type DocumentoAsociado = {
  readonly formato:                 number;
  readonly cdc:                     string;
  readonly tipo:                    number;
  readonly timbrado:                string;
  readonly establecimiento:         string;
  readonly punto:                   string;
  readonly numero:                  string;
  /** Ej. "2022-09-14" */
  readonly fecha:                   string;
  readonly numeroRetencion:         string;
  readonly resolucionCreditoFiscal: string;
  readonly constanciaTipo:          number;
  readonly constanciaNumero:        number;
  readonly constanciaControl:       string;
}

export type Factura = {
  readonly presencia:  number;
  /** Ej. "2023-10-21" */
  readonly fechaEnvio: string;
  readonly dncp:       FacturaDncp;
}

export type FacturaDncp = {
  readonly modalidad: string;
  readonly entidad:   number;
  readonly año:       number;
  readonly secuencia: number;
  /** Ej. "2022-09-14T10:11:00" */
  readonly fecha:     string;
}

export type Item = {
  readonly codigo:                   string;
  readonly descripcion:              string;
  readonly observacion:              string;
  readonly partidaArancelaria:       number;
  readonly ncm:                      string;
  readonly unidadMedida:             number;
  readonly cantidad:                 number;
  readonly precioUnitario:           number;
  readonly cambio:                   number;
  readonly descuento:                number;
  readonly anticipo:                 number;
  readonly pais:                     string;
  readonly paisDescripcion:          string;
  readonly tolerancia:               number;
  readonly toleranciaCantidad:       number;
  readonly toleranciaPorcentaje:     number;
  readonly cdcAnticipo:              string;
  readonly dncp:                     ItemDncp;
  readonly ivaTipo:                  number;
  readonly ivaBase:                  number;
  readonly iva:                      number;
  readonly lote:                     string;
  readonly vencimiento:              Date;
  readonly numeroSerie:              string;
  readonly numeroPedido:             string;
  readonly numeroSeguimiento:        string;
  readonly importador:               Importador;
  readonly registroSenave:           string;
  readonly registroEntidadComercial: string;
  readonly sectorAutomotor:          SectorAutomotor;
}

export type ItemDncp = {
  readonly codigoNivelGeneral:    string;
  readonly codigoNivelEspecifico: string;
  readonly codigoGtinProducto:    string;
  readonly codigoNivelPaquete:    string;
}

export type Importador = {
  readonly nombre:             string;
  readonly direccion:          string;
  readonly registroImportador: string;
}

export type SectorAutomotor = {
  readonly tipo:                       number;
  readonly chasis:                     string;
  readonly color:                      string;
  readonly potencia:                   number;
  readonly capacidadMotor:             number;
  readonly capacidadPasajeros:         number;
  readonly pesoBruto:                  number;
  readonly pesoNeto:                   number;
  readonly tipoCombustible:            number;
  readonly tipoCombustibleDescripcion: string;
  readonly numeroMotor:                string;
  readonly capacidadTraccion:          number;
  readonly año:                        number;
  readonly tipoVehiculo:               string;
  readonly cilindradas:                string;
}

export type NotaCreditoDebito = {
  readonly motivo: number;
}

export type Remision = {
  readonly motivo:          number;
  readonly tipoResponsable: number;
  readonly kms:             number;
  /** Ej. "2022-08-21" */
  readonly fechaFactura:    string;
}

export type SectorAdicional = {
  readonly ciclo:           string;
  readonly inicioCiclo:     Date;
  readonly finCiclo:        Date;
  readonly vencimientoPago: Date;
  readonly numeroContrato:  string;
  readonly saldoAnterior:   number;
}

export type SectorEnergiaElectrica = {
  readonly numeroMedidor:   string;
  readonly codigoActividad: number;
  readonly codigoCategoria: string;
  readonly lecturaAnterior: number;
  readonly lecturaActual:   number;
}

export type SectorSeguros = {
  readonly codigoAseguradora: string;
  readonly codigoPoliza:      string;
  readonly numeroPoliza:      string;
  readonly vigencia:          number;
  readonly vigenciaUnidad:    string;
  readonly inicioVigencia:    Date;
  readonly finVigencia:       Date;
  readonly codigoInternoItem: string;
}

export type SectorSupermercados = {
  readonly nombreCajero:        string;
  readonly efectivo:            number;
  readonly vuelto:              number;
  readonly donacion:            number;
  readonly donacionDescripcion: string;
}

export type Usuario = {
  readonly documentoTipo:   number;
  readonly documentoNumero: string;
  readonly nombre:          string;
  readonly cargo:           string;
}
