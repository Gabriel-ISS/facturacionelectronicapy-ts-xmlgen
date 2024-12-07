import { SecureOmit } from '../types/helpers';

export type SchemaDescription = {
  /** id del campo */
  id: string;
  /** descripción del campo */
  d?: string;
  /** nombre del enum en caso de ser un enum*/
  e?: string;
  /** nombre de la tabla con los datos de origen */
  t?: string;
  /** ejemplo */
  ej?: string;
  /** ver */
  v?: string;
};

/** Schema Description Parser */
class SDParser {
  stringify(
    id: string,
    schema: SecureOmit<SchemaDescription, 'id'> = {},
  ): string {
    return JSON.stringify({ id, ...schema });
  }

  parse(schema: string): SchemaDescription {
    return JSON.parse(schema);
  }
}

export default new SDParser();
