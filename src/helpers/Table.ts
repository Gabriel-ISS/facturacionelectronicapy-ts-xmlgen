import { z } from 'zod';

type SchemaPart = [header: string, value: any];

type Schema = Record<number, SchemaPart>;

type Headers<S extends Schema> = {
  [key in keyof S]: key extends number ? S[key][0] : never;
};
type RawRow<S extends Schema> = {
  [key in keyof S]: key extends number ? S[key][1] : never;
};

type _Combine<
  T,
  K extends PropertyKey = T extends unknown ? keyof T : never,
> = T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

type Combine<T> = Required<{ [K in keyof _Combine<T>]: _Combine<T>[K] }>;

type PairToObject<T extends SchemaPart> = {
  [key in T[0]]: T[1];
};

type SchemaGroups<S extends Schema> = {
  [key in keyof S]: key extends number ? PairToObject<S[key]> : never;
};

type Row<S extends Schema> = Combine<SchemaGroups<S>[keyof SchemaGroups<S>]>;

type NotFoundErrorData = {
  ctx: z.RefinementCtx;
  fieldName: string;
  message?: string;
};

/**
 * @example
 * type S = {
 *  0: ['_id', E];
 *  1: ['description', string];
 *  2: ['value', number];
 * };
 *
 * const table = new Table<S>(
 *    'test',
 *    ['_id', 'description', 'value'],^
 *    [
 *      [0, 'description 0', 0],
 *      [1, 'description 1', 1],
 *    ],
 * );
 */
export default class Table<
  S extends { 0: [header: '_id', value: string | number] } & Schema,
  RR extends RawRow<S> = RawRow<S>,
  ID extends RR[0] = RR[0],
  R extends Row<S> = Row<S>,
> {
  idIndex = new Map<ID, number>();

  constructor(readonly headers: Headers<S>, readonly data: RR[]) {
    for (const index in data) {
      const row = data[index];
      this.idIndex.set(row[0] as ID, Number(index));
    }
  }

  private manageNotFoundError(
    result: RR | undefined,
    notFoundErrorData?: NotFoundErrorData,
  ) {
    if (!result && notFoundErrorData) {
      const { ctx, fieldName } = notFoundErrorData;
      const path = ctx.path.concat(fieldName);
      const pathStr = `'${notFoundErrorData.ctx.path.join('.')}.${
        notFoundErrorData.fieldName
      }'`;
      notFoundErrorData.ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          notFoundErrorData.message ??
          `El valor del campo ${pathStr} no es válido`,
        path,
      });
    }
  }

  normalizeRow(rawRow: RR): R {
    let obj: Record<string, any> = {};
    for (const index in this.headers) {
      const header = this.headers[index];
      const value = rawRow[index];
      obj[header] = value;
    }
    return obj as R;
  }

  /**Retorna el resultado que coincide con el id especificado, o null si no se encuentra ninguna coincidencia.*/
  findById(id: ID, _notFoundErrorData?: NotFoundErrorData): R | null {
    const index = this.idIndex.get(id);
    if (index == null) return null;

    const result = this.data.at(index);
    this.manageNotFoundError(result, _notFoundErrorData);
    if (!result) return null;

    return this.normalizeRow(result);
  }

  _findById(id: ID, _notFoundErrorData?: NotFoundErrorData): R {
    let index = this.idIndex.get(id);
    if (index == undefined) this.manageNotFoundError(undefined, _notFoundErrorData);
    index ??= 0;
    const result = this.data.at(index) as RR;
    return this.normalizeRow(result);
  }

  _findByIdIfExist(id: ID | undefined, _notFoundErrorData?: NotFoundErrorData): R | null {
    if (id == undefined) return null;
    return this._findById(id, _notFoundErrorData);
  }

  /**Retorna todos los resultados que cumplan con la condicion especificada.*/
  findWhere(expected: Partial<R>): R[] {
    // de acuerdo a headers generar un objeto con las claves y el index en el rr
    const keyIndex: Record<string, number> = {};
    for (const key in expected) {
      const headerIndex = (this.headers as string[]).indexOf(key);
      keyIndex[key] = headerIndex;
    }

    const result = this.data.filter((row) => {
      for (const key in expected) {
        const indexInRow = keyIndex[key];
        if (row[indexInRow] !== expected[key]) return false;
      }
      return true;
    });

    return result.map((row) => this.normalizeRow(row));
  }

  /**Retorna el primer resultado que cumpla con la condicion especificada, o null si no se encuentra ninguna coincidencia.*/
  findUniqueWhere(expected: Partial<R>): R | null {
    const result = this.findWhere(expected);
    return result.at(0) ?? null;
  }
}
