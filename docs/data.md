### data

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| A002 | cdc | String | Opcional |  |
| A004 | fechaFirmaDigital | Date | Requerido |  |
| B002 | tipoEmision | Enum = EmissionType | Requerido | NORMAL por defecto.  |
| B004 | codigoSeguridadAleatorio | Number | Requerido |  |
| B005 | observacion | String | Opcional |  |
| B006 | descripcion | String | Opcional |  |
| C002 | tipoDocumento | Enum = EDocumentType | Requerido |  |
| C005 | establecimiento | Number | Requerido |  |
| C006 | punto | Number | Requerido |  |
| C007 | numero | Number | Requerido |  |
| C010 | serie | String | Opcional | Obligatorio cuando se consumió la numeración permitida. Ver: 10.5. Manejo del timbrado y Numeración.  |
| D002 | fecha | Date | Requerido |  |
| D011 | tipoTransaccion | Enum = TransactionType | Requerido | Por defecto venta de mercadería.  |
| D013 | tipoImpuesto | Enum = TaxType | Requerido |  |
| D015 | moneda | Enum = Currency | Requerido | Guarani por defecto.  |
| D017 | condicionTipoCambio | Enum = GlobalAndPerItem | Opcional |  |
| D018 | cambio | Number | Opcional |  |
| D019 | condicionAnticipo | Enum = GlobalAndPerItem | Opcional |  |
| D1.1 | obligaciones | [data.obligaciones](#dataobligaciones)[] | Opcional | Campos que identifican las obligaciones afectadas (D030-D040). Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_018_MT_V150-+Junio.pdf/2ace18c4-5c03-c339-7f5c-bed6d5b5eb5e?t=1717699899642.  |
| para calcular EA004 | descuentoGlobal | Number | Requerido | Es el valor monetario total a descontar de la suma de los items.  |
| para calcular EA007 | anticipoGlobal | Number | Requerido | Es el valor monetario total que se aplica como anticipo a la suma de los items.  |
| D2.2 | usuario | [data.usuario](#datausuario) | Opcional | Campos que identifican al responsable de la generación del DE (D140-D160).  |
| D3 | cliente | [data.cliente](#datacliente) | Requerido | Campos que identifican al receptor del Documento Electrónico DE (D200-D299).  |
| E1 | factura | [data.factura](#datafactura) | Opcional | Campos que componen la Factura Electrónica FE (E002-E099).  |
| E1.1 | dncp | [data.dncp](#datadncp) | Opcional | Campos de informaciones de Compras Públicas (E020-E029).  |
| E4 | autoFactura | [data.autoFactura](#dataautoFactura) | Opcional | Campos que componen la Autofactura Electrónica AFE (E300-E399).  |
| E5 | notaCreditoDebito | [data.notaCreditoDebito](#datanotaCreditoDebito) | Opcional | Campos que componen la Nota de Crédito/Débito Electrónica NCE-NDE (E400-E499).  |
| E6 | remision | [data.remision](#dataremision) | Opcional | Campos que componen la Nota de Remisión Electrónica (E500-E599).  |
| E7 | condicion | [data.condicion](#datacondicion) | Opcional | Campos que describen la condición de la operación (E600-E699).  |
| E8 | items | [data.items](#dataitems)[] | Requerido | Campos que describen los ítems de la operación (E700-E899).  |
| E9.2 | sectorEnergiaElectrica | [data.sectorEnergiaElectrica](#datasectorEnergiaElectrica) | Opcional | Sector Energía Eléctrica (E791-E799). Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006.  |
| E9.3 | sectorSeguros | [data.sectorSeguros](#datasectorSeguros) | Opcional | Sector de Seguros (E800-E809).  |
| E9.4 | sectorSupermercados | [data.sectorSupermercados](#datasectorSupermercados) | Opcional | Sector de Supermercados (E810-E819).  |
| E9.5 | sectorAdicional | [data.sectorAdicional](#datasectorAdicional) | Opcional | Grupo de datos adicionales de uso comercial (E820-E829).  |
| E10 | transporte | [data.transporte](#datatransporte) | Opcional | Campos que describen el transporte de las mercaderías (E900-E999).  |
| F025 | comision | Number | Requerido |  |
| G | complementarios | [data.complementarios](#datacomplementarios) | Opcional | Campos complementarios comerciales de uso general (G001-G049).  |
| H | documentoAsociado | [data.documentoAsociado](#datadocumentoAsociado) \| [data.documentoAsociado](#datadocumentoAsociado)[] | Opcional | Campos que identifican al documento asociado (H001-H049).  |
### data.obligaciones

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| D031 | codigo | Enum = Obligation | Requerido |  |
### data.usuario

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| D141 | documentoTipo | Enum = IdentityDocumentUser | Requerido |  |
| D142 | documentoTipoDescripcion | String | Opcional |  |
| D143 | documentoNumero | String | Requerido |  |
| D144 | nombre | String | Requerido |  |
| D145 | cargo | String | Requerido |  |
### data.cliente

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| D201 | contribuyente | Boolean | Requerido |  |
| D202 | tipoOperacion | Enum = OperationType | Requerido |  |
| D203 | pais | Enum = Country | Requerido |  |
| D205 | tipoContribuyente | Enum = TaxpayerType | Opcional |  |
| D206 | ruc | String | Opcional |  |
| D208 | documentoTipo | Enum = IdentityDocumentReceptor | Opcional |  |
| D209 | descripcionTipoDocumento | String | Opcional |  |
| D210 | documentoNumero | String | Opcional |  |
| D211 | razonSocial | String | Requerido |  |
| D212 | nombreFantasia | String | Opcional |  |
| D213 | direccion | String | Opcional |  |
| D214 | telefono | String | Requerido |  |
| D215 | celular | String | Opcional |  |
| D216 | email | String | Opcional |  |
| D217 | codigo | String | Opcional |  |
| D218 | numeroCasa | Number | Opcional |  |
| D219 | departamento | Enum = Department | Opcional |  |
| D221 | distrito | Valores en EDocument.db().distritos | Opcional |  |
| D223 | ciudad | Valores en EDocument.db().ciudades | Opcional |  |
### data.factura

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E011 | presencia | Enum = PresenceIndicator | Requerido |  |
| E012 | descripcionPresencia | String | Opcional | Obligatorio si E011 = 9 (presencia = OTRO).  |
| E013 | fechaEnvio | Date | Opcional |  |
### data.dncp

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E021 | modalidad | String | Requerido |  |
| E022 | entidad | Number | Requerido |  |
| E023 | año | Number | Requerido |  |
| E024 | secuencia | Number | Requerido |  |
| E025 | fecha | Date | Requerido |  |
### data.autoFactura

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E301 | tipoVendedor | Enum = SellerNatureSelfInvoicing | Requerido |  |
| E304 | documentoTipo | Enum = IdentityDocumentCarrier | Requerido |  |
| E306 | documentoNumero | String | Requerido |  |
| E307 | nombre | String | Requerido |  |
| E308 | direccion | String | Requerido |  |
| E309 | numeroCasa | Number | Requerido |  |
| E310 | departamento | Enum = Department | Requerido |  |
| E312 | distrito | Valores en EDocument.db().distritos | Opcional |  |
| E314 | ciudad | Valores en EDocument.db().ciudades | Requerido |  |
| E316 - E322 | ubicacion | [data.autoFactura.ubicacion](#dataautoFacturaubicacion) | Requerido |  |
### data.autoFactura.ubicacion

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E316 | lugar | String | Requerido |  |
| E317 | departamento | Enum = Department | Requerido |  |
| E319 | distrito | Valores en EDocument.db().distritos | Opcional |  |
| E321 | ciudad | Valores en EDocument.db().ciudades | Requerido |  |
### data.notaCreditoDebito

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E401 | motivo | Enum = CreditNoteReason | Requerido |  |
### data.remision

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E501 | motivo | Enum = RemissionReason | Requerido |  |
| E502 | motivoDescripcion | String | Opcional |  |
| E503 | tipoResponsable | Enum = FreightResponsible | Requerido |  |
| E505 | kms | Number | Requerido |  |
| E506 | fechaFactura | Date | Opcional |  |
| E507 | costoFlete | Number | Requerido | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196.  |
### data.condicion

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E601 | tipo | Enum = PaymentCondition | Requerido |  |
| E7.1 | entregas | [data.condicion.entregas](#datacondicionentregas)[] | Opcional | Campos que describen la forma de pago de la operación al contado o del monto de la entrega inicial (E605-E619).  |
| E7.2 | credito | [data.condicion.credito](#datacondicioncredito) | Opcional | Campos que describen la operación a crédito (E640-E649).  |
### data.condicion.entregas

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E606 | tipo | Enum = PaymentType | Requerido |  |
| E607 | tipoDescripcion | String | Opcional |  |
| E608 | monto | Number | Requerido |  |
| E609 | moneda | Enum = Currency | Requerido |  |
| E611 | cambio | Number | Opcional |  |
| E7.1.1 | infoTarjeta | [data.condicion.entregas.infoTarjeta](#datacondicionentregasinfoTarjeta) | Opcional | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito.  |
| E7.1.2 | infoCheque | [data.condicion.entregas.infoCheque](#datacondicionentregasinfoCheque) | Opcional | Campos que describen el pago o entrega inicial de la operación con cheque (E630-E639).  |
### data.condicion.entregas.infoTarjeta

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E621 | tipo | Enum = CreditCard | Requerido |  |
| E622 | tipoDescripcion | String | Opcional | Obligatorio si E621 = 99 (tipo = OTRO).  |
| E623 | razonSocial | String | Opcional |  |
| E624 | ruc | String | Opcional |  |
| E626 | medioPago | Enum = CreditCardProcessingMethod | Requerido |  |
| E627 | codigoAutorizacion | Number | Requerido |  |
| E628 | titular | String | Opcional |  |
| E629 | numero | Number | Requerido |  |
### data.condicion.entregas.infoCheque

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E631 | numeroCheque | Number | Requerido |  |
| E632 | banco | String | Requerido |  |
### data.condicion.credito

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E641 | tipo | Enum = CreditType | Requerido |  |
| E643 | plazo | String | Opcional |  |
| E644 | cuotas | Number | Requerido |  |
| E7.2.1 | infoCuotas | [data.condicion.credito.infoCuotas](#datacondicioncreditoinfoCuotas)[] | Requerido | Campos que describen las cuotas (E650-E659).  |
### data.condicion.credito.infoCuotas

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E751 | monto | Number | Requerido |  |
| E752 | vencimiento | Date | Opcional |  |
| E753 | moneda | Enum = Currency | Requerido |  |
### data.items

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E701 | codigo | String | Requerido | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900.  |
| E702 | partidaArancelaria | Number | Requerido |  |
| E703 | ncm | Number | Requerido |  |
| E704-E707 | dncp | [data.items.dncp](#dataitemsdncp) | Opcional |  |
| E708 | descripcion | String | Requerido | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_009_MT_V150.pdf/c268a447-11e3-ee1e-b4d5-8d83dd408401?t=1687353746900.  |
| E709 | unidadMedida | Enum = MeasurementUnit | Requerido |  |
| E711 | cantidad | Number | Requerido | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006.  |
| E712 | pais | Enum = Country | Opcional |  |
| E714 | observacion | String | Opcional |  |
| E715 | tolerancia | Enum = MerchandiseRelevance | Opcional |  |
| E717 | toleranciaCantidad | Number | Requerido |  |
| E718 | toleranciaPorcentaje | Number | Requerido |  |
| E719 | cdcAnticipo | String | Opcional |  |
| E8.1 | monto | [data.items.monto](#dataitemsmonto) | Opcional | Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729).  |
| E8.2 | impuesto | [data.items.impuesto](#dataitemsimpuesto) | Opcional | Campos que describen el IVA de la operación por ítem (E730-E739).  |
| E751 | lote | String | Opcional |  |
| E752 | vencimiento | Date | Requerido |  |
| E753 | numeroSerie | String | Opcional |  |
| E754 | numeroPedido | String | Opcional |  |
| E755 | numeroSeguimiento | String | Opcional |  |
| E759 | registroSenave | String | Opcional |  |
| E760 | registroEntidadComercial | String | Opcional |  |
| E761 | nombreProducto | String | Opcional | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196.  |
| E8.5 | sectorAutomotor | [data.items.sectorAutomotor](#dataitemssectorAutomotor) | Opcional | Sector de automotores nuevos y usados (E770-E789).  |
### data.items.dncp

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E704 | codigoNivelGeneral | Number | Opcional |  |
| E705 | codigoNivelEspecifico | String | Opcional |  |
| E706 | codigoGtinProducto | Number | Opcional |  |
| E707 | codigoNivelPaquete | Number | Opcional |  |
### data.items.monto

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E721 | precioUnitario | Number | Requerido |  |
| E725 | cambio | Number | Requerido |  |
| EA002 | descuento | Number | Requerido |  |
| EA006 | anticipo | Number | Requerido |  |
### data.items.impuesto

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E731 | ivaTipo | Enum = TaxTreatment | Requerido |  |
| E733 | proporcionGravada | Number | Opcional |  |
| E734 | iva | Enum = TaxRate | Requerido |  |
### data.items.sectorAutomotor

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E771 | tipo | Enum = VehicleOperationType | Opcional |  |
| E773 | chasis | String | Opcional |  |
| E774 | color | String | Opcional |  |
| E775 | potencia | Number | Requerido |  |
| E776 | capacidadMotor | Number | Requerido |  |
| E777 | pesoNeto | Number | Requerido |  |
| E778 | pesoBruto | Number | Requerido |  |
| E779 | tipoCombustible | Enum = FuelType | Opcional |  |
| E780 | tipoCombustibleDescripcion | String | Opcional |  |
| E781 | numeroMotor | String | Opcional |  |
| E782 | capacidadTraccion | Number | Requerido |  |
| E783 | año | Number | Requerido |  |
| E784 | tipoVehiculo | String | Opcional |  |
| E785 | capacidadPasajeros | Number | Requerido |  |
| E786 | cilindradas | String | Opcional |  |
### data.sectorEnergiaElectrica

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E792 | numeroMedidor | String | Opcional |  |
| E793 | codigoActividad | Number | Requerido |  |
| E794 | codigoCategoria | String | Opcional |  |
| E795 | lecturaAnterior | Number | Requerido |  |
| E796 | lecturaActual | Number | Requerido |  |
### data.sectorSeguros

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E801 | codigoAseguradora | String | Opcional |  |
| EA791 | codigoPoliza | String | Requerido |  |
| EA792 | vigenciaUnidad | String | Requerido |  |
| EA793 | vigencia | Number | Requerido |  |
| EA794 | numeroPoliza | String | Requerido |  |
| EA795 | inicioVigencia | Date | Opcional |  |
| EA796 | finVigencia | Date | Opcional |  |
| EA797 | codigoInternoItem | String | Opcional | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_008_MT_V150.pdf/81fba389-0f27-e757-88c3-ec7b3dbab90b?t=1687353746734.  |
### data.sectorSupermercados

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E811 | nombreCajero | String | Opcional |  |
| E812 | efectivo | Number | Requerido |  |
| E813 | vuelto | Number | Requerido |  |
| E814 | donacion | Number | Requerido |  |
| E815 | donacionDescripcion | String | Opcional |  |
### data.sectorAdicional

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E821 | ciclo | String | Opcional |  |
| E822 | inicioCiclo | Date | Opcional |  |
| E823 | finCiclo | Date | Opcional |  |
| E824 | vencimientoPago | Date | Opcional |  |
| E825 | numeroContrato | String | Opcional |  |
| E826 | saldoAnterior | Number | Requerido |  |
| E827 | codigoContratacionDncp | String | Opcional | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_020_MT_V150.pdf/f9a47078-748e-db87-bf2f-e6826ef048b9?t=1700242734040.  |
### data.transporte

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E901 | tipo | Enum = TransportType | Opcional |  |
| E903 | modalidad | Enum = TransportModality | Requerido |  |
| E905 | tipoResponsable | Enum = FreightResponsible | Requerido |  |
| E906 | condicionNegociacion | Enum = TradingCondition | Opcional |  |
| E907 | numeroManifiesto | String | Opcional |  |
| E908 | numeroDespachoImportacion | String | Opcional |  |
| E909 | inicioEstimadoTranslado | Date | Opcional |  |
| E910 | finEstimadoTranslado | Date | Opcional |  |
| E911 | paisDestino | Enum = Country | Opcional |  |
| E10.1 | salida | [data.transporte.salida](#datatransportesalida) | Opcional | Campos que identifican el local de salida de las mercaderías (E920-E939).  |
| E10.2 | entrega | [data.transporte.entrega](#datatransporteentrega) | Opcional | Campos que identifican el local de entrega de las mercaderías (E940-E959).  |
| E10.3 | vehiculo | [data.transporte.vehiculo](#datatransportevehiculo) | Opcional | Campos que identifican el vehículo de traslado de mercaderías (E960-E979).  |
| E10.4 | transportista | [data.transporte.transportista](#datatransportetransportista) | Opcional | Campos que identifican al transportista (persona física o jurídica) (E980-E999).  |
### data.transporte.salida

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E921 o E941 | direccion | String | Requerido |  |
| E922 o E942 | numeroCasa | Number | Requerido |  |
| E923 o E943 | complementoDireccion1 | String | Opcional |  |
| E924 o E944 | complementoDireccion2 | String | Opcional |  |
| E925 o E945 | departamento | Enum = Department | Requerido |  |
| E926 o E946 | distrito | Valores en EDocument.db().distritos | Opcional |  |
| E929 o E949 | ciudad | Valores en EDocument.db().ciudades | Requerido |  |
| E931 o E951 | telefonoContacto | String | Opcional |  |
### data.transporte.entrega

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E921 o E941 | direccion | String | Requerido |  |
| E922 o E942 | numeroCasa | Number | Requerido |  |
| E923 o E943 | complementoDireccion1 | String | Opcional |  |
| E924 o E944 | complementoDireccion2 | String | Opcional |  |
| E925 o E945 | departamento | Enum = Department | Requerido |  |
| E926 o E946 | distrito | Valores en EDocument.db().distritos | Opcional |  |
| E929 o E949 | ciudad | Valores en EDocument.db().ciudades | Requerido |  |
| E931 o E951 | telefonoContacto | String | Opcional |  |
### data.transporte.vehiculo

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E961 | tipo | String | Requerido | Debe ser acorde al atributo modalidad (E903).  |
| E962 | marca | String | Requerido |  |
| E963 | documentoNumero | String | Opcional |  |
| E964 | obs | String | Opcional |  |
| E965 | numeroMatricula | String | Opcional |  |
| E966 | numeroVuelo | String | Opcional |  |
| E967 | documentoTipo | Enum = VehicleIdentification | Requerido |  |
### data.transporte.transportista

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E981 | contribuyente | Boolean | Requerido |  |
| E982 | nombre | String | Requerido |  |
| E983 | ruc | String | Requerido |  |
| E985 | documentoTipo | Enum = IdentityDocumentCarrier | Opcional |  |
| E987 | documentoNumero | String | Opcional |  |
| E988 | pais | Enum = Country | Requerido | País de nacimiento.  |
| E990 - E993 (excluyendo E992) | chofer | [data.transporte.transportista.chofer](#datatransportetransportistachofer) | Requerido |  |
| E992 | direccion | String | Requerido | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196.  |
| E994 - E997 | agente | [data.transporte.transportista.agente](#datatransportetransportistaagente) | Opcional |  |
### data.transporte.transportista.chofer

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E990 | documentoNumero | String | Requerido |  |
| E991 | nombre | String | Requerido |  |
| E993 | direccion | String | Requerido | Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196.  |
### data.transporte.transportista.agente

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| E994 | nombre | String | Opcional |  |
| E995 y E996 | ruc | String | Opcional | Ej.: 123123-1.  |
| E997 | direccion | String | Opcional |  |
### data.complementarios

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| G002 | ordenCompra | String | Opcional |  |
| G003 | ordenVenta | String | Opcional |  |
| G004 | numeroAsiento | String | Opcional |  |
| G1 | carga | [data.complementarios.carga](#datacomplementarioscarga) | Opcional | Campos generales de la carga (G050 - G099).  |
### data.complementarios.carga

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| G051 | unidadMedidaVolumenTotal | Enum = MeasurementUnit | Opcional |  |
| G053 | volumenTotal | Number | Requerido |  |
| G054 | unidadMedidaPesoTotal | Enum = MeasurementUnit | Opcional |  |
| G056 | pesoTotal | Number | Requerido |  |
| G057 | caracteristicaCarga | Enum = CargoCharacteristic | Opcional |  |
| G058 | caracteristicaCargaDescripcion | String | Opcional | Obligatorio para KUDE. Se establece automáticamente si la opción no es OTRO..  |
### data.documentoAsociado

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| H002 | formato | Enum = AssociatedDocumentType | Requerido |  |
| H004 | cdc | String | Opcional |  |
| H005 | timbrado | Number | Opcional |  |
| H006 | establecimiento | Number | Opcional |  |
| H007 | punto | Number | Opcional |  |
| H008 | numero | Number | Opcional |  |
| H009 | tipoDocumentoImpreso | Enum = PrintedDocumentType | Opcional |  |
| H011 | fecha | Date | Opcional |  |
| H012 | numeroRetencion | String | Opcional |  |
| H013 | resolucionCreditoFiscal | String | Opcional |  |
| H014 | constanciaTipo | Enum = ConstancyType | Opcional |  |
| H016 | constanciaNumero | Number | Requerido |  |
| H017 | constanciaControl | String | Opcional |  |
| H018 | rucFusionado | String | Opcional | Obligatorio cuando el CDC del DTE referenciado corresponda a un RUC fusionado. Ver: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006.  |
