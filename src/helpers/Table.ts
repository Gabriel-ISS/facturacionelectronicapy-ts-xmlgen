type SchemaPart<
  T extends [header: string, value: any] = [header: string, value: any],
> = T;

export type Schema<T extends SchemaPart[] = SchemaPart[]> = T;

type Header<S extends Schema> = { [key in keyof S]: S[key][0] };
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



/**
 * @example
 * type S = Schema<[['id', number], ['description', string]]>;
 * 
 * const t = new Table<S>(
 *   'test',
 *   ['id', 'description'],
 *   [
 *     [1, 'asdf'],
 *     [2, 'qwer'],
 *   ],
 * );
 */
export default class Table<S extends Schema> {
  idIndex: number;

  constructor(
    readonly tableName: string,
    readonly header: Header<S>,
    readonly rows: Row<S>[],
  ) {
    this.idIndex = this.header.indexOf('id');
    if (this.idIndex < 0) {
      throw new Error(
        `No se encontró el campo id en la cabecera de la tabla "${tableName}"`,
      );
    }
  }

  private rowToObject(row: Row<S>): RowAsObject<S> {
    let obj: any = {};
    for (const index in this.header) {
      const key = this.header[index];
      obj[key] = row[index];
    }
    return obj;
  }

  findById(id: number) {
    const foundRow = this.rows.find((row) => row[this.idIndex] == id);
    return foundRow ? this.rowToObject(foundRow) : null;
  }
}
