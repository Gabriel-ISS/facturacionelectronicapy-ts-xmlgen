### params

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| D101 - D102 | ruc | String | Requerido |  |
| D103 | tipoContribuyente | Enum = TaxpayerType | Requerido |  |
| D104 | tipoRegimen | Enum = RegimeType | Opcional |  |
| D105 | razonSocial | String | Requerido |  |
| D106 | nombreFantasia | String | Opcional |  |
| D107 - D119 | establecimientos | [params.establecimientos](#paramsestablecimientos)[] | Requerido |  |
| D2.1 | actividadesEconomicas | [params.actividadesEconomicas](#paramsactividadesEconomicas)[] | Requerido | Campos que describen la actividad económica del emisor (D130-D139). Ver: https://servicios.set.gov.py/eset-publico/consultarActividadEconomicaIService.do.  |
| C004 | timbradoNumero | Number | Requerido |  |
| C008 | timbradoFecha | Date | Requerido |  |
### params.establecimientos

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| relacionado con C005 | codigo | Number | Requerido |  |
| D107 | direccion | String | Requerido |  |
| D108 | numeroCasa | Number | Requerido |  |
| D109 | complementoDireccion1 | String | Opcional |  |
| D110 | complementoDireccion2 | String | Opcional |  |
| D111 | departamento | Enum = Department | Requerido |  |
| D113 | distrito | Number | Opcional |  |
| D115 | ciudad | Number | Requerido |  |
| D117 | telefono | String | Requerido |  |
| D118 | email | String | Requerido |  |
| D119 | denominacion | String | Opcional |  |
### params.actividadesEconomicas

| ID | Campo | Tipo | Opcional | Descripción |
| --- | --- | --- | --- | --- |
| D131 | codigo | String | Requerido |  |
| D132 | descripcion | String | Requerido |  |
