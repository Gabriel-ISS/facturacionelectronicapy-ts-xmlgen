import { z } from 'zod';
import constantsService from './constants.service';

type Tables = typeof constantsService;

class DbService {
  select<
    K extends keyof Tables,
    T extends Tables[K],
  >(tableName: K) {
    const table = constantsService[tableName] as T;

    type TD = T[number];

    type NotFoundErrorData = {
      ctx: z.RefinementCtx;
      fieldName: string;
      message?: string;
    };

    const manageNotFoundError = (
      result: TD | undefined,
      notFoundErrorData?: NotFoundErrorData,
    ) => {
      if (!result && notFoundErrorData) {
        const path = `'${notFoundErrorData.ctx.path.join('.')}.${notFoundErrorData.fieldName}'`;
        notFoundErrorData.ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notFoundErrorData.message ?? `El valor del campo ${path} no es válido`,
          path: [notFoundErrorData.fieldName],
        });
      }
    };

    return {
      findById(_id: TD['_id'], notFoundErrorData?: NotFoundErrorData): TD {
        const foundData = table.find((item) => item._id === _id);
        manageNotFoundError(foundData, notFoundErrorData);
        return table.find((item) => item._id === _id) as TD;
      },
      findByIdIfExist(_id: TD['_id'] | undefined, notFoundErrorData?: NotFoundErrorData): TD | null {
        if (_id == undefined) return null;
        const foundData = table.find((item) => item._id === _id);
        manageNotFoundError(foundData, notFoundErrorData);
        return foundData ?? null;
      },
      getAll() {
        return table;
      }
    };
  }
}

export default new DbService();
