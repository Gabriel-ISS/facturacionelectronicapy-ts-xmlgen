import { BasicData } from '../services/constants.service';

export enum ComplianceEventType {
  CONFORMIDAD_TOTAL_DEL_DTE = 1,
  CONFORMIDAD_PARCIAL_DEL_DTE = 2,
}

export const complianceEventTypes: BasicData<ComplianceEventType>[] = [
  {
    code: ComplianceEventType.CONFORMIDAD_TOTAL_DEL_DTE,
    description: 'Conformidad Total del DTE',
  },
  {
    code: ComplianceEventType.CONFORMIDAD_PARCIAL_DEL_DTE,
    description: 'Conformidad Parcial del DTE',
  },
];
