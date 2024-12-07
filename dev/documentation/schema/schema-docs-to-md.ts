import SDParser, { SchemaDescription } from '../../../src/helpers/SDParser';
import { Docs } from './generate-schema-docs';
import MarkdownGenerator from './markdown-generator';

export function generateMarkdown(
  docs: Docs | Docs[],
  path: string,
  mdg: MarkdownGenerator,
) {
  const generate = (docs: Docs, path: string) => {
    const embeddedObjects: { path: string; docs: Docs | Docs[] }[] = [];

    mdg.setTitle(path);
    mdg.setHeaderRow(['ID', 'Campo', 'Tipo', 'Opcional', 'Descripción']);
    Object.entries(docs).map(([key, value]) => {
      if (value.inner) {
        value.type = value.type.replace(/Object/g, mdg.getLink(path + '.' + key));
      }
      if (!value.description) {
        throw new Error(`Missing description for ${path}.${key}`);
      }
      let parsedDescription: SchemaDescription;
      try {
        parsedDescription = SDParser.parse(value.description);
      } catch (e) {
        console.log(`Error en ${path}.${key}`);
        throw e;
      }
      if (parsedDescription.id == 'H') {
        console.log(value);
      }
      let description = '';
      description += parsedDescription.d ? `${parsedDescription.d}. ` : '';
      description += parsedDescription.ej ? `Ej.: ${parsedDescription.ej}. ` : '';
      description += parsedDescription.v ? `Ver: ${parsedDescription.v}. ` : '';
      if (value.type == 'Enum') {
        if (!parsedDescription.e) {
          throw new Error(`Missing enum name for ${parsedDescription.id}`);
        }
        value.type = 'Enum = ' + parsedDescription.e;
      }

      if (parsedDescription.t) {
        value.type = `Valores en EDocument.db().${parsedDescription.t}`;
      }
      mdg.setRow([
        parsedDescription.id,
        key,
        value.type,
        value.optional ? 'Opcional' : 'Requerido',
        description,
      ]);

      if (value.inner) {
        embeddedObjects.push({ path: `${path}.${key}`, docs: value.inner });
      }
    });

    embeddedObjects.forEach(({ path, docs }) => {
      generateMarkdown(docs, path, mdg);
    });
  };

  if (Array.isArray(docs)) {
    generate(docs[0], path);
  } else {
    generate(docs, path);
  }
}
