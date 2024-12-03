import associatedDocumentTypes from '../data/associatedDocumentTypes.table';
import cargoCharacteristics from '../data/cargoCharacteristics.table';
import cities from '../data/cities.table';
import complianceEventTypes from '../data/complianceEventTypes.table';
import constancyTypes from '../data/constancyTypes.table';
import countries from '../data/countries.table';
import creditCardProcessingMethods from '../data/creditCardProcessingMethods.table';
import creditCards from '../data/creditCards.table';
import creditNoteReasons from '../data/creditNoteReasons.table';
import creditTypes from '../data/creditTypes.table';
import currencies from '../data/currencies.table';
import departments from '../data/departments.table';
import districts from '../data/districts.table';
import eDocumentTypes from '../data/eDocumentTypes.table';
import emissionTypes from '../data/emissionTypes.table';
import freightResponsibles from '../data/freightResponsibles.table';
import fuelTypes from '../data/fuelTypes.table';
import advancePaymentConditions from '../data/advancePaymentConditions.table';
import iscCategories from '../data/iscCategories.table';
import iscTaxes from '../data/iscTaxes.table';
import measurementUnits from '../data/measurementUnits.table';
import merchandiseRelevances from '../data/merchandiseRelevances.table';
import obligations from '../data/obligations.table';
import operatingConditions from '../data/operatingConditions.table';
import operationTypes from '../data/operationTypes.table';
import paymentTypes from '../data/paymentTypes.table';
import presenceIndicators from '../data/presenceIndicators.table';
import printedDocumentTypes from '../data/printedDocumentTypes.table';
import taxpayerNotTaxpayer from '../data/taxpayerNotTaxpayer.table';
import remissionReasons from '../data/remissionReasons.table';
import remissionResponsibles from '../data/remissionResponsibles.table';
import regimeTypes from '../data/regimeTypes.table';
import sellerNatureSelfInvoicingCases from '../data/sellerNatureSelfInvoicingCases.table';
import taxTreatments from '../data/taxTreatments.table';
import taxTypes from '../data/taxTypes.table';
import tradingConditions from '../data/tradingConditions.table';
import transactionTypes from '../data/transactionTypes.table';
import transportModalities from '../data/transportModalities.table';
import transportTypes from '../data/transportTypes.table';
import vehicleIdentifications from '../data/vehicleIdentifications.table';
import vehicleOperationTypes from '../data/vehicleOperationTypes.table';
import exchangeRateConditions from '../data/exchangeRateConditions.table';
import paymentConditions from '../data/paymentConditions.table';

import idDocsInnominateReceptors from '../data/idDocsInnominateReceptors.table';
import idDocsReceptors from '../data/idDocsReceptors.table';
import idDocsUsers from '../data/idDocsUsers.table';
import idDocsCarriers from '../data/idDocsCarriers.table';
import identityDocsForNominationEvent from '../data/idDocsForNominationEvent.table';
import taxpayerTypes from '../data/taxpayerTypes.table';

/** Data reference:
 * @link https://www.dnit.gov.py/documents/20123/420592/Manual+T%C3%A9cnico+Versi%C3%B3n+150.pdf/e706f7c7-6d93-21d4-b45b-5d22d07b2d22?t=1687351495907 */
export default Object.freeze({
  //global and per item
  exchangeRateConditions,
  advancePaymentConditions,

  idDocsUsers,
  idDocsCarriers,
  idDocsReceptors,
  idDocsInnominateReceptors,
  identityDocsForNominationEvent,

  eDocumentTypes,
  emissionTypes,
  transactionTypes,
  taxpayerTypes,
  taxTypes,
  obligations,
  currencies,
  regimeTypes,
  operationTypes,
  presenceIndicators,
  taxpayerNotTaxpayer,
  sellerNatureSelfInvoicingCases,
  creditNoteReasons,
  remissionReasons,
  remissionResponsibles,
  operatingConditions,
  paymentTypes,
  paymentConditions,
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
});

