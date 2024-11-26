export type Key<T> = T extends any[] ? number : keyof T;

type Value<T, K extends Key<T>> = T extends any[]
  ? T[number]
  : K extends keyof T
  ? T[K]
  : never;

export class Path<T, K extends Key<T> = Key<T>> {
  constructor(key: K, readonly path: string[] = []) {
    this.path.push(key as string);
  }

  concat<NK extends Key<Value<T, K>>>(key: NK) {
    return new Path<Value<T, K>>(key, this.path);
  }

  getValueFromPath(object: any) {
    let currentValue = object;
    for (const key of this.path) {
      try {
        currentValue = currentValue[key];
      } catch (error) {
        console.info(JSON.stringify(object, null, 2));
        throw new Error(
          `Error al intentar ingresar al campo '${this.path.join('.')}' en la clave '${key}', por favor reporte el error en la seccion de errores del repositorio`,
        )
      }
    }
    return currentValue;
  }

  toString() {
    return this.path.join('.');
  }
}
