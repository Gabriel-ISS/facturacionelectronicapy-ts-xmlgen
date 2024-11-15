import { EDocSchema } from './schemas/EDoc.schema';
import { EDocDataInput } from './schemas/EDocData.schema';
import { EDocParamsInput } from './schemas/EDocParams.schema';
import EDocumentService from './services/XMLGenerator.service';
import eventService from './services/jsonEventoMain.service';
import { XmlGenConfig } from './types/XmlGenConfig';

class EDocument {
  async generateXMLDocument(
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    const parsed = await EDocSchema.parseAsync({
      data,
      params,
    });
    
    return EDocumentService.generateXMLDocument(
      parsed.params,
      parsed.data,
      config,
    );
  }

  generateXMLCancellationEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLCancellationEvent(_id, params, data, config);
  }

  generateXMLDisablementEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLDisablementEvent(_id, params, data, config);
  }

  generateXMLComplianceEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLComplianceEvent(_id, params, data, config);
  }

  generateXMLDisagreementEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLDisagreementEvent(_id, params, data, config);
  }

  generateXMLUnawarenceEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLUnawarenceEvent(_id, params, data, config);
  }

  generateXMLNotificationEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLNotificationEvent(_id, params, data, config);
  }

  generateXMLNominationEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLNominationEvent(_id, params, data, config);
  }

  generateXMLTransportDataUpdateEvent(
    _id: number,
    params: EDocParamsInput,
    data: EDocDataInput,
    config?: XmlGenConfig,
  ) {
    return eventService.generateXMLTransportDataUpdateEvent(
      _id,
      params,
      data,
      config,
    );
  }

  async getCountries() {
    // Esto es del repo original: Enviar Copia
    return EDocumentService.getCountries();
  }

  async getDepartments() {
    // Esto es del repo original: Enviar Copia
    return EDocumentService.getDepartments();
  }

  async getDistricts(department: number | null) {
    // Esto es del repo original: Enviar Copia
    return EDocumentService.getDistricts(department);
  }

  async getCities(district: number | null) {
    // Esto es del repo original: Enviar Copia
    return EDocumentService.getCities(district);
  }

  async getRegimeTypes() {
    return EDocumentService.getRegimeTypes();
  }

  async getDepartment(departmentId: number) {
    return EDocumentService.getDepartment(departmentId);
  }

  async getDistrict(districtId: number) {
    return EDocumentService.getDistrict(districtId);
  }

  async getCity(cityId: number) {
    return EDocumentService.getCity(cityId);
  }
}

export default new EDocument();
