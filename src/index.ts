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
    const parsed = await EDocSchema.parseAsync({
      data,
      params,
    });

    return EDocXMLGenerator.generateXMLDocument(
      parsed.params,
      parsed.data,
      config,
    );
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

export { EDocDataInput, EDocParamsInput };
export { XmlGenConfig };
export { SIFENEvent } from './types/Events';
