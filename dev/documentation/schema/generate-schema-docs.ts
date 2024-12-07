import { z } from 'zod';

type Doc = {
  type: string;
  description: string | undefined;
  optional: boolean;
  inner?: Docs | Docs[];
};
export type Docs = Record<string, Doc>;

type ValidSchema =
  | z.AnyZodObject
  | z.ZodEffects<z.AnyZodObject>
  | z.ZodOptional<z.AnyZodObject>
  | z.ZodEffects<z.ZodOptional<z.AnyZodObject>>;

function getShape(schema: z.ZodTypeAny): z.ZodRawShape | null {
  if (schema instanceof z.ZodObject) {
    return schema._def.shape();
  } else if (schema instanceof z.ZodEffects) {
    return getShape(schema._def.schema);
  } else if (schema instanceof z.ZodOptional) {
    return getShape(schema._def.innerType);
  } else if (schema instanceof z.ZodArray) {
    return getShape(schema._def.type);
  } else {
    return null;
  }
}

function getType(value: z.ZodTypeAny): string {
  if (value instanceof z.ZodOptional) {
    return getType(value._def.innerType);
  } else if (value instanceof z.ZodDefault) {
    return getType(value._def.innerType);
  } else if (value instanceof z.ZodEffects) {
    return getType(value._def.schema);
  } else if (value instanceof z.ZodArray) {
    return `${getType(value._def.type)}[]`;
  } else if (value instanceof z.ZodUnion) {
    return value._def.options.map(getType).join(' \\| ');
  }  else if (value instanceof z.ZodNativeEnum) {
    return 'Enum';
  } else {
    try {
      return value._def.typeName.replace('Zod', '');
    } catch (e) {
      console.log(value);
      throw e;
    }
  }
};

export function generateDocs(Schema: ValidSchema, shape?: z.ZodRawShape | null): Docs {
  shape = shape ?? getShape(Schema);

  if (!shape) {
    console.log('Invalid schema:', Schema);
    throw new Error('Invalid schema');
  }

  const docs: Docs = {};

  Object.entries(shape).map(([key, value]) => {
    const definition = value._def;

    const doc: Doc = {
      type: getType(value),
      description: definition.description,
      optional: value instanceof z.ZodOptional,
    };

    const childShape = getShape(value);

    if (childShape) {
      doc.inner = generateDocs(definition.type as ValidSchema, childShape);
    } else if (value instanceof z.ZodUnion) {
      const docs = (definition.options as z.ZodTypeAny[]).map((option) => {
        const childShape = getShape(option);
        if (childShape) {
          return generateDocs(option as ValidSchema, childShape);
        }

        return null;
      }).filter((option) => option !== null);

      if (docs.length) {
        doc.inner = docs;
      }
    }

    docs[key] = doc;
  });

  return docs;
}
