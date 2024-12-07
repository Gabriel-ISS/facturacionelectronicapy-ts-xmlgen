import { EDocDataSchema } from '../../../src/schemas/EDocData.schema';
import { EDocParamsSchema } from '../../../src/schemas/EDocParams.schema';
import { CancellationEventSchema } from '../../../src/schemas/events/CancellationEvent.schema';
import { DisablingEventSchema } from '../../../src/schemas/events/DisablingEvent.schema';
import { ConformityEventSchema } from '../../../src/schemas/events/ConformityEvent.schema';
import { DisconformityEventSchema } from '../../../src/schemas/events/DisconformityEvent.schema';
import { IgnoranceEventSchema } from '../../../src/schemas/events/IgnoranceEvent.schema';
import { NotificationEventSchema } from '../../../src/schemas/events/NotificationEvent.schema';
import { NominationEventSchema } from '../../../src/schemas/events/NominationEvent.schema';
import { TransportUpdateEventSchema } from '../../../src/schemas/events/TransportUpdateEvent.schema';
import { generateDocs } from './generate-schema-docs';
import { generateMarkdown } from './schema-docs-to-md';
import fs from 'fs';
import MarkdownGenerator from './markdown-generator';
import replaceInTemplate from '../replaceInTemplate';

const baseSchemas = {
  data: EDocDataSchema,
  params: EDocParamsSchema,
  cancellationEvent: CancellationEventSchema,
  disablingEvent: DisablingEventSchema,
  conformityEvent: ConformityEventSchema,
  disconformityEvent: DisconformityEventSchema,
  ignoranceEvent: IgnoranceEventSchema,
  notificationEvent: NotificationEventSchema,
  nominationEvent: NominationEventSchema,
  transportUpdateEvent: TransportUpdateEventSchema,
};

const keys: string[] = [];
Object.entries(baseSchemas).forEach(([key, value]) => {
  keys.push(key);
  const docs = generateDocs(value);

  const path = `./docs/${key}.md`;
  const readablePath = `src/docs/${key}.md`;

  console.log('Generando:', readablePath);

  const mdg = new MarkdownGenerator(path);

  // remove file content
  fs.writeFileSync(path, '');

  generateMarkdown(docs, key, mdg);
});

const links: string[] = keys.map(
  (k) =>
    `- [${k}](https://github.com/Gabriel-ISS/facturacionelectronicapy-ts-xmlgen/blob/main/docs/${k}.md)`,
);

replaceInTemplate({ structures: links.join('\n') });

console.log('Done');
