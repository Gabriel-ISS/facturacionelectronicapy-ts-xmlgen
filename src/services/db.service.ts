import { Country } from '../constants/countries.constants';
import constantsService from './constants.service';

type Tables = typeof constantsService;

class DbService {
  select<K extends Exclude<keyof Tables, 'validateLocation'>, T extends Tables[K]>(tableName: K) {

    const table = constantsService[tableName] as T;

    type TD = T[number];

    return {
      findById: (id: TD['id']): TD | null => {
        if (!table[0].id) throw new Error('Invalid table');
        return table.find((item) => item.id === id) ?? null;
      },
    };
  }
}

export default new DbService;
