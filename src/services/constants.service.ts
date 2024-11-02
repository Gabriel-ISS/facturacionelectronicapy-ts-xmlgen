import { associatedDocumentTypes } from '../constants/associatedDocumentTypes.constants';
import { cargoCharacteristics } from '../constants/cargoCharacteristics.constants';
import { cities } from '../constants/cities.constants';
import { complianceEventTypes } from '../constants/complianceEventTypes.constants';
import { constancyTypes } from '../constants/constancyTypes.constants';
import { countries } from '../constants/countries.constants';
import { creditCardProcessingMethods } from '../constants/creditCardProcessingMethods.constants';
import { creditCards } from '../constants/creditCards.constants';
import { creditNoteReasons } from '../constants/creditNoteReasons.constants';
import { creditTypes } from '../constants/creditTypes.constants';
import { currencies } from '../constants/curencies.constants';
import { departments } from '../constants/departments.constants';
import { districts } from '../constants/districts.constants';
import { documentTypes } from '../constants/documentTypes.constants';
import { emissionTypes } from '../constants/emissionTypes.constants';
import { freightResponsibles } from '../constants/freightResponsibles.constants';
import { fuelTypes } from '../constants/fuelTypes.constants';
import { advancePaymentConditions } from '../constants/advancePaymentConditions.constants';
import { iscCategories } from '../constants/iscCategories.constants';
import { iscTaxes } from '../constants/iscTaxes.constants';
import { measurementUnits } from '../constants/measurementUnits.constants';
import { merchandiseRelevances } from '../constants/merchandiseRelevances.constants';
import { obligations } from '../constants/obligations.constants';
import { operatingConditions } from '../constants/operatingConditions.constants';
import { operationTypes } from '../constants/operationTypes.constants';
import { paymentTypes } from '../constants/paymentTypes.constants';
import { presenceIndicators } from '../constants/presenceIndicators.constants';
import { printedDocumentTypes } from '../constants/printedDocumentTypes.constants';
import { receptorTypes } from '../constants/receptorTypes.constants';
import { remissionReasons } from '../constants/remissionReasons.constants';
import { remissionResponsibles } from '../constants/referralResponsibles.constants';
import { regimeTypes } from '../constants/regimeTypes.constants';
import { sellerNatureSelfInvoicingCases } from '../constants/sellerNatureSelfInvoicingCases.constants';
import { taxTreatments } from '../constants/taxTreatments.constants';
import { taxTypes } from '../constants/taxTypes.constants';
import { tradingConditions } from '../constants/tradingConditions.constants';
import { transactionTypes } from '../constants/transactionTypes.constants';
import { transportModalities } from '../constants/transportModalities.constants';
import { transportTypes } from '../constants/transportTypes.constants';
import { identityDocumentsInnominateReceptors } from '../constants/typesOfDocumentsInnominateReceptors.constants';
import { identityDocumentsReceptors } from '../constants/identityDocumentsReceptors.constants';
import { userIdentityDocuments } from '../constants/userIdentityDocuments.constants';
import { identityDocumentsCarriers } from '../constants/identityDocumentsCarriers.constants';
import { vehicleIdentifications } from '../constants/vehicleIdentifications.constants';
import { vehicleOperationTypes } from '../constants/vehicleOperationTypes.constants';
import { exchangeRateConditions } from '../constants/exchangeRateConditions.constants';

export type BasicData<Code = number> = {
  id: Code;
  description: string;
};

export type DataWithState<Code = number> = BasicData<Code> & {
  /** Anteriormente situación */
  state: number;
};

/** Data reference:
 * @link https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907 */
export default Object.freeze({
  /*  tiposEventos: [
      {
        codigo: 1,
        descripcion: 'Cancelación',
        situacion: 0,
      },
      {
        codigo: 2,
        descripcion: 'Inutilización',
        situacion: 1, //A futuro
      },
      {
        codigo: 3,
        descripcion: 'Endoso',
        situacion: 1, //A futuro
      },
      {
        codigo: 10,
        descripcion: 'Acuse del DE',
        situacion: 0,
      },
      {
        codigo: 11,
        descripcion: 'Conformidad del DE',
        situacion: 0,
      },
      {
        codigo: 12,
        descripcion: 'Disconformidad del DE',
        situacion: 0,
      },
      {
        codigo: 13,
        descripcion: 'Desconocimiento del DE',
        situacion: 0,
      },
    ];
  */


  //global and per item
  exchangeRateConditions,
  advancePaymentConditions,

  documentTypes,
  emissionTypes,
  transactionTypes,
  taxTypes,
  obligations,
  currencies,
  regimeTypes,
  userIdentityDocuments,
  typesOfIdentityDocumentsCarriers: identityDocumentsCarriers,
  typesOfDocumentsReceptors: identityDocumentsReceptors,
  typesOfDocumentsInnominateReceptors: identityDocumentsInnominateReceptors,
  operationTypes,
  presenceIndicators,
  receptorTypes,
  sellerNatureSelfInvoicingCases,
  creditNoteReasons,
  remissionReasons,
  remissionResponsibles,
  operatingConditions,
  paymentTypes,
  creditTypes,
  creditCards,
  creditCardProcessingMethods,
  measurementUnits,
  taxTreatments,
  iscCategories,
  iscTaxes,
  tradingConditions,
  merchandiseRelevances,
  vehicleOperationTypes,
  vehicleIdentifications,
  fuelTypes,
  transportTypes,
  transportModalities,
  freightResponsibles,
  associatedDocumentTypes,
  printedDocumentTypes,
  constancyTypes,
  cargoCharacteristics,
  complianceEventTypes,
  countries,
  departments,
  districts,
  cities,
  
  validateLocation(
    /**@deprecated no se para que esta esto aqui */
    field: string,
    departmentId: number,
    districtId: number,
    cityId: number,
    errors: string[],
  ) {
    if (cityId) {
      let foundCity = this.cities.find((c) => c.id === cityId);

      if (!foundCity) {
        errors.push(`No se encontro la ciudad con el Id "${cityId}"`);
      } else if (foundCity.distrito != districtId) {
        errors.push(
          `El distrito con id "${districtId}" no pertenece a la ciudad con id "${cityId}"`,
        );
      }
    } else {
      errors.push(`El id de ciudad "${cityId}" no es valido`);
    }

    if (districtId) {
      let districtFound = this.districts.find((d) => d.id === districtId);

      if (!districtFound) {
        errors.push(`No se encontro el distrito con el Id "${districtId}"`);
      } else if (districtFound.department != departmentId) {
        errors.push(
          `El departamento con id "${departmentId}" no pertenece al distrito con id "${districtId}"`,
        );
      }
    } else {
      errors.push(`El id del distrito "${districtId}" no es valido`);
    }
  },
});
