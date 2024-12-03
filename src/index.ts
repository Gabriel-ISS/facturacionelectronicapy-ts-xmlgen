import translateZodErrors from './helpers/validation/translateZodErrors';
import { EDocSchema } from './schemas/EDoc.schema';
import { EDocDataInput } from './schemas/EDocData.schema';
import { EDocParamsInput } from './schemas/EDocParams.schema';
import dbService from './services/db.service';
import EDocXMLGenerator from './services/EDocXMLGenerator.service';
import EventXMLGenerator from './services/EventXMLGenerator.service';
import { XmlGenConfig } from './types/XmlGenConfig';

class EDocument {
  constructor() {
    translateZodErrors();
  }

  async generateXMLDocument(
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    try {
      const parsed = await EDocSchema.parseAsync({
        data,
        params,
      });

      return EDocXMLGenerator.generateXMLDocument(
        parsed.params,
        parsed.data,
        config,
      );
    } catch (error) {
      if (error instanceof Error && Object.getPrototypeOf(error) === Error.prototype) {
        error.message +=
          '. Por favor reporte el error en https://github.com/Gabriel-ISS/facturacionelectronicapy-ts-xmlgen/issues/new';
      }
      throw error;
    }
  }

  async generateXMLEvent(
    ...p: Parameters<(typeof EventXMLGenerator)['generateXMLEvent']>
  ) {
    return EventXMLGenerator.generateXMLEvent(...p);
  }

  db() {
    return dbService;
  }
}

export default new EDocument();