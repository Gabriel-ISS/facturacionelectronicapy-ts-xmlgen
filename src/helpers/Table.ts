type SchemaPart<
  T extends [header: string, value: any] = [header: string, value: any],
> = T;

export type Schema<T extends SchemaPart[] = SchemaPart[]> = T;

type Headers<S extends Schema> = { [key in keyof S]: S[key][0] };
type Row<S extends Schema> = { [key in keyof S]: S[key][1] };

type _Combine<
  T,
  K extends PropertyKey = T extends unknown ? keyof T : never,
> = T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

type Combine<T> = Required<{ [K in keyof _Combine<T>]: _Combine<T>[K] }>;

type RowAsObject<S extends Schema> = Combine<
  {
    [key in keyof S]: Record<S[key][0], S[key][1]>;
  }[number]
>;

// TODO: usar file name para leer el archivo y parsearlo con csv-parser

/**
 * @example
 * type S = Schema<[['_id', number], ['description', string]]>;
 * 
 * const t = new Table<S>(
 *   'test',
 *   ['_id', 'description'],
 *   [
 *     [1, 'asdf'],
 *     [2, 'qwer'],
 *   ],
 * );
 */
export default class Table<S extends Schema> {
  constructor(
    readonly tableName: string,
    readonly fileName: string,
  ) {}

  private rowToObject(row: Row<S>): RowAsObject<S> {
    let obj: any = {};
    for (const index in this.headers) {
      const key = this.headers[index];
      obj[key] = row[index];
    }
    return obj;
  }

  findById(_id: number) {
    const foundRow = this.rows.find((row) => row[0] == _id);
    return foundRow ? this.rowToObject(foundRow) : null;
  }
}
