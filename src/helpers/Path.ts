export type Key<T> = T extends any[] ? number : keyof T;

type Value<T, K extends Key<T>> = T extends any[]
  ? T[number]
  : K extends keyof T
  ? T[K]
  : never;

export class Path<T, K extends Key<T> = Key<T>> {
  path: string[];

  constructor(key: K, path: string[] = []) {
    this.path = path.concat(key as string);
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
        // es posible que el valor simplemente no este presente, por eso no se lanza error
      }
    }
    return currentValue;
  }

  toString() {
    return this.path.join('.');
  }

}
