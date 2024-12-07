# Facturación Electrónica - Generación de XML para la SET (Paraguay)

Módulo NodeJS que genera el **archivo XML** para enviar a la **SET** _(Subsecretaria de Estado de Tributación del Ministerio de Hacienda)_ para el proceso y generación del documento electrónico, a partir de una estructura de datos en formato JSON.

Versión del Manual Técnico: **150**.

Basado en la [documentación técnica de e-kuatia](https://www.dnit.gov.py/web/e-kuatia/documentacion-tecnica)

Este paquete pretende servir de **modelo de transferencia estandarizado** para la comunicación con la **SET** contemplando la totalidad de los campos exigidos para cada bloque y tipos de documentos electrónicos.

El mismo es utilizado y mantenido por el autor y otorgado a la comunidad de desarrolladores de forma gratuita bajo licencia **MIT**

El módulo está preparado de forma a proveer una fácil integración dentro de su entorno **NodeJS** y con cualquier otro lenguaje, sistema o librería que lo requiera, por ejemplo publicando el método desde un REST.

## Indices
- [Características](#características)
- [Instalación](#instalación)
- [Ejemplo de uso](#ejemplo-de-uso)
  - [Generación de documento electrónico](#generación-de-documento-electrónico)
  - [Generación de evento](#generación-de-evento)
  - [Base de datos](#base-de-datos)
- [Estructuras](#estructuras)
- [Proyectos relacionados](#proyectos-relacionados)

## Características

- Genera el CDC automáticamente de acuerdo a los datos del documento electrónico
- Implementa el Algoritmo del dígito verificador del CDC
- Permite sobrescribir el valor del código de seguridad, de acuerdo a las necesidades del implementador
- Realiza la validación de los datos de entrada conforme el manual técnico de la SET

## Instalación

Para instalar el módulo en su proyecto node, ejecute el siguiente comando:

```bash
  npm install facturacionelectronicapy-ts-xmlgen
```

## Ejemplo de uso

Cuando se produce un error puede ser una instancia de `Error` (error imprevisto) o una instancia de (ZodError)[https://zod.dev/?id=error-handling] (error de validación).

### Generación de documento electrónico

El método requiere 2 argumentos tipo **JSON** para general el XML. El primero es un argumento `params` con las informaciones estáticas del Contribuyente emisor, y el segundo es `data` con los datos variables para cada documento electrónico a generar.


```ts
import EDocument from 'facturacionelectronicapy-ts-xmlgen';

// incluye todos los esquemas y el tipo de resultado de cada uno
import * as EDSchemas from 'facturacionelectronicapy-ts-xmlgen/schemas';

// incluye todos los enums que puedes usar en el documento
import * as EDTypes from 'facturacionelectronicapy-ts-xmlgen/types';

const params: EDSchemas.EDocParamsInput = {};
const data: EDSchemas.EDocDataInput = {};
const options: EDTypes.XmlGenConfig = {};

try {
  const xml = await EDocument.generateXMLDocument(params, data, options);
  console.log(xml);
} catch (error) {
  console.log(error);
}
```

### Generación de evento

```ts
import * as EDTypes from 'facturacionelectronicapy-ts-xmlgen/types';
import EDocument from 'facturacionelectronicapy-ts-xmlgen';

const id: number = 0;
const data: EDTypes.EventData = {...};

try {
  const xml = await EDocument.generateXMLEvent(id, data);
} catch (error) {
  console.log(error);
}

```


### Base de datos

```ts
import EDocument from 'facturacionelectronicapy-ts-xmlgen';
import EDTypes from 'facturacionelectronicapy-ts-xmlgen/types';

// retorna el sevicio de base de datos
const db = EDocument.db();

// resultado: ['_id', 'description']
const documentTypesHeaders = db.documentTypes.headers;
// tipo del resultado: [EDocumentType, string][]
const documentTypesRows = db.documentTypes.data;

// resultado: { _id: 1, description: 'Factura electrónica' }
const elctronicInvoiceData = await db.documentTypes.findById(EDTypes.EDocumentType.FACTURA_ELECTRONICA);
```

## Estructuras

{{structures}}

## Proyectos relacionados

- [Generación de XML (proyecto original)](https://www.npmjs.com/package/facturacionelectronicapy-xmlgen)
- [Firma de XML](https://www.npmjs.com/package/facturacionelectronicapy-xmlsign)
- [Generación de QR](https://www.npmjs.com/package/facturacionelectronicapy-qrgen)
- [API de la SET](https://www.npmjs.com/package/facturacionelectronicapy-setapi)
- [Generación KUDE](https://www.npmjs.com/package/facturacionelectronicapy-kude)
