import { Country } from '../constants/countries.constants';
import constantsService from './constants.service';

type Tables = typeof constantsService;

class DbService {
  select<K extends Exclude<keyof Tables, 'validateLocation'>, T extends Tables[K]>(tableName: K) {

    const table = constantsService[tableName] as T;

    type TD = T[number];

    return {
      findById: (_id: TD['_id']): TD | null => {
        if (!table[0]._id) throw new Error('Invalid table');
        return table.find((item) => item._id === _id) ?? null;
      },
    };
  }
}

export default new DbService;
