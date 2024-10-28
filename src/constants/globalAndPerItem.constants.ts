import { BasicData } from '../services/constants.service';

export enum GlobalAndPerItem {
  GLOBAL = 1,
  POR_ITEM = 2,
}

export const globalAndPerItem: BasicData<GlobalAndPerItem>[] = [
  {
    code: GlobalAndPerItem.GLOBAL,
    description: 'Global',
  },
  {
    code: GlobalAndPerItem.POR_ITEM,
    description: 'Por item',
  },
];
