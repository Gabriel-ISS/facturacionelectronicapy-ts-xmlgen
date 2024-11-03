import EDocumentService from './services/jsonDeMain.service';
import eventService from './services/jsonEventoMain.service';
import { XmlGenConfig } from './services/type.interface';

// TODO: NI PARAMS NI DATA COMO ANY
// TODO: REALMENTE ES NECESARIO USAR CÓDIGO ASÍNCRONO?
class EDocument {
  generateXMLDocument(params: any, data: any, config?: XmlGenConfig) {
    return EDocumentService.generateXMLDocument(params, data, config);
  }

  generateXMLCancellationEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLCancellationEvent(_id, params, data, config);
  }

  generateXMLDisablementEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLDisablementEvent(_id, params, data, config);
  }

  generateXMLComplianceEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLComplianceEvent(_id, params, data, config);
  }

  generateXMLDisagreementEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLDisagreementEvent(_id, params, data, config);
  }

  generateXMLUnawarenceEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLUnawarenceEvent(_id, params, data, config);
  }

  generateXMLNotificationEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLNotificationEvent(_id, params, data, config);
  }

  generateXMLNominationEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLNominationEvent(_id, params, data, config);
  }

  generateXMLTransportDataUpdateEvent(_id: number, params: any, data: any, config?: XmlGenConfig) {
    return eventService.generateXMLTransportDataUpdateEvent(_id, params, data, config);
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
    return EDocumentService.getRegimeTypes()
  }

  getDepartment(departmentId: number) {
    return EDocumentService.getDepartment(departmentId);
  }

  getDistrict(districtId: number) {
    return EDocumentService.getDistrict(districtId);
  }

  getCity(cityId: number) {
    return EDocumentService.getCity(cityId);
  }
}

export default new EDocument();
