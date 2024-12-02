import Table from '../helpers/Table';

export enum ComplianceEventType {
  CONFORMIDAD_TOTAL_DEL_DTE = 1,
  CONFORMIDAD_PARCIAL_DEL_DTE = 2,
}

export default new Table<{
  0: ['_id', ComplianceEventType];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Conformidad Total del DTE'],
    [2, 'Conformidad Parcial del DTE'],
  ],
);
