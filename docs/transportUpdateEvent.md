### transportUpdateEvent

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| GET002 | cdc | String | Requerido |  |
| GET003 | motivo | Enum = TransportUpdateMotive | Requerido |  |
| GET004 - GET030 (excluyendo GET013 - GET021) | entrega | [transportUpdateEvent.entrega](#transportUpdateEvent.entrega) | Requerido |  |
| GET013 - GET021 | transportista | [transportUpdateEvent.transportista](#transportUpdateEvent.transportista) | Requerido |  |
### transportUpdateEvent.entrega

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| GET004 | departamento | Enum = Department | Opcional |  |
| GET006 | distrito | Number | Opcional |  |
| GET008 | ciudad | Number | Opcional |  |
| GET010 | direccion | String | Opcional |  |
| GET011 | numeroCasa | Number | Opcional |  |
| GET012 | direccionComplementaria1 | String | Opcional |  |
| GET022 | tipoTransporte | Enum = TransportType | Opcional |  |
| GET024 | modalidadTransporte | Enum = TransportModality | Opcional |  |
| GET026 - GET030 | vehiculo | [transportUpdateEvent.entrega.vehiculo](#transportUpdateEvent.entrega.vehiculo) | Requerido |  |
### transportUpdateEvent.entrega.vehiculo

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| GET026 | tipo | String | Opcional |  |
| GET027 | marca | String | Opcional |  |
| GET028 | documentoTipo | Enum = VehicleIdentification | Opcional |  |
| GET029 | documentoNumero | String | Opcional |  |
| GET030 | numeroMatricula | String | Opcional |  |
### transportUpdateEvent.transportista

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| GET013 - GET014 | chofer | [transportUpdateEvent.transportista.chofer](#transportUpdateEvent.transportista.chofer) | Opcional |  |
| GET015 | contribuyente | Boolean | Opcional |  |
| GET016 y GET017 | ruc | String | Opcional |  |
| GET018 | nombre | String | Opcional |  |
| GET019 | documentoTipo | Enum = IdentityDocumentCarrier | Opcional |  |
| GET021 | documentoNumero | String | Opcional |  |
### transportUpdateEvent.transportista.chofer

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| GET013 | nombre | String | Requerido |  |
| GET014 | documentoNumero | String | Requerido |  |
