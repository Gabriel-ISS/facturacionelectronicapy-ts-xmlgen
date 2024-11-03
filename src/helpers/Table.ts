import fs from 'fs';
import csv from 'csv-parser';

type SchemaPart = [header: string, value: any]

export type Schema<T extends SchemaPart[] = SchemaPart[]> = T;
type Row<S extends Schema> = { [key in keyof S]: S[key][1] };

// LO DEJO PORQUE PUEDE VOLVER A SER UTIL
/* type _Combine<
  T,
  K extends PropertyKey = T extends unknown ? keyof T : never,
> = T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

type Combine<T> = Required<{ [K in keyof _Combine<T>]: _Combine<T>[K] }>; */

/**
 * @example
 * type S = Schema<[['_id', number], ['description', string]]>;
 *
 * const t = new Table<S>(
 *   'test',
 *   '../data/test.csv',
 * );
 */
export default class Table<
  S extends Schema<[[header: '_id', value: string | number], ...SchemaPart[]]>,
  ID extends S[0][0] = S[0][0],
  R extends Row<S> & {_id: ID} = Row<S> & {_id: ID},
> {
  data: Promise<R[]>;
  idIndex: Promise<Map<S[0][0], number>>;

  constructor(readonly tableName: string, readonly filePath: string) {
    this.data = new Promise(() => {});
    this.idIndex = new Promise(() => {});

    let data: R[] = [];
    let idIndex: Map<S[0][0], number> = new Map();
    let i = 0;

    fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
        idIndex.set((row as R)._id, i);
        i++;
      })
      .on('end', () => {
        this.data = Promise.resolve(data);
        this.idIndex = Promise.resolve(idIndex);
      })
      .on('error', (error) => {
        console.error('Error al leer el archivo CSV:', error);
      });
  }

  async findById(id: ID) {
    const idIndex = await this.idIndex;

    const index = idIndex.get(id);
    if (index == null) return null;

    const data = await this.data;
    return data[index];
  }
}
