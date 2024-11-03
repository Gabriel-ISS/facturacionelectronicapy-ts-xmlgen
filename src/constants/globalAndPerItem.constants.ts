import { BasicData } from '../services/constants.service';

export enum GlobalAndPerItem {
  GLOBAL = 1,
  POR_ITEM = 2,
}

export const globalAndPerItem: BasicData<GlobalAndPerItem>[] = [
  {
    _id: GlobalAndPerItem.GLOBAL,
    description: 'Global',
  },
  {
    _id: GlobalAndPerItem.POR_ITEM,
    description: 'Por item',
  },
];
