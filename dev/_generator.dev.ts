import fs from 'fs';
import * as readline from 'readline';
import constantsService, { BasicData } from '../src/services/constants.service';
import Table from '../src/helpers/Table';
import {Parser} from 'json2csv';

/**
 * Para no tener que repetir los archivos si se deja el trabajo a la mitad
 * sirve para administrar archivos que guardan el progreso de la generación
 */
class Progress {
  constructor(
    readonly PROGRESS_FILE = '_progress.dev.txt',
    readonly SKIP_FILE = '_skipped.dev.txt',
    readonly SEPARATOR = '\n',
  ) {}

  private getFileValues(filePath: string) {
    return new Promise<string[]>((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        const values = data.split(this.SEPARATOR);
        resolve(values);
      });
    });
  }

  private setFileItem(filePath: string, value: string) {
    return new Promise<string>((resolve, reject) => {
      fs.appendFile(filePath, value + this.SEPARATOR, (err) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
  }

  async getToSkip(): Promise<string[]> {
    const progress = await this.getFileValues(this.PROGRESS_FILE);
    const skip = await this.getFileValues(this.SKIP_FILE);
    return progress.concat(skip);
  }

  async addToSkip(value: string) {
    try {
      await this.setFileItem(this.SKIP_FILE, value);
    } catch (error) {
      console.error(
        'Error al guardar archivo a omitir:',
        (error as Error).message,
      );
    }
  }

  async addToProgress(value: string) {
    try {
      await this.setFileItem(this.PROGRESS_FILE, value);
    } catch (error) {
      console.error(
        'Error al guardar archivo a omitir:',
        (error as Error).message,
      );
    }
  }
}

/** para interactuar a través de la terminal */
class ReadLine {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  ask(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (response) => {
        resolve(response);
      });
    });
  }

  close() {
    this.rl.close();
  }
}

class ToTableTransformer<
  D extends Record<string, string | number>,
  T extends D[],
> {
  readonly json2csvParser = new Parser();

  constructor(readonly currentData: T) {}

  /** 
   * @param currentConstantFilePath
   * debería ser relativo a este archivo
   * 
   * @param tableName
   * el nombre que identifica la tabla
   * 
   * @param csvFilePath
   * debería ser relativo al archivo donde se guardara la tabla
   * ademas debería guardarse en la carpeta data
   */
  getTableFileContent(
    currentConstantFilePath: string,
    tableName: string,
    csvFilePath: string,
  ): string {
    let r = '';
    r += this.getEnumContent(fs.readFileSync(currentConstantFilePath, 'utf8'));
    r += this.getTypeStr();
    r += this.getTableStr(tableName, csvFilePath);
    return r;
  }

  getCsvFileContent(): string {
    return this.json2csvParser.parse(this.currentData);
  }

  /** Busca el el contenido del archivo el enum y retorna el contenido del enum */
  private getEnumContent(fileContent: string): string {
    // 'export enum' index
    let startIndex = fileContent.indexOf('export enum');
    let endIndex = 0;

    const chars = fileContent.split('');
    let i = startIndex;
    while (i < chars.length) {
      i++;
      if (chars[i] == '}') {
        endIndex = i;
        break;
      }
    }

    return fileContent.substring(startIndex, endIndex) + '\n\n';
  }

  private getTypeStr(): string {
    const fields: string[] = [];
    for (const [header, value] of Object.entries(this.currentData[0])) {
      fields.push(`['${header}', ${typeof value}]`);
    }
    return `type S = Schema<[${fields.join(', ')}]>;\n\n`;
  }

  private getTableStr(
    tableName: string, 
    csvFilePath: string,
  ): string {
    let table = '';
    table += `const table: Table<S> = new Table<S>(\n`;
    table += `  '${tableName}',\n`;
    table += `  ${csvFilePath},\n`;
    table += `);\n\n`;

    return table;
  }
}

const progress = new Progress('_progress.dev.txt', '_skipped.dev.txt', '\n');
//const constantFormatter = new ConstantFormatter();
const rl = new ReadLine();


type ConstanteService = typeof constantsService;
type KeyOfData = keyof ConstanteService;
async function createConstantFile<T extends BasicData>(
  key: KeyOfData,
  data: T[],
  fileName: string,
  folderName: string = ''
) {
  const fileContent = new ToTableTransformer(data).getTableFileContent(fileName);

  const createFile = (fileName: string, content: string) => {
    return new Promise<string>((resolve, reject) => {
      fs.writeFile(fileName, content, (err) => {
        if (err) reject(err);
        else resolve(fileName);
      });
    });
  };

  try {
    await createFile(folderName + fileName, fileContent);
    await progress.addToProgress(key);
  } catch (error) {
    console.error('Error al crear el archivo:', (error as Error).message);
  }
}

async function createFiles(object: Record<string, any>) {
  const toSkip = await progress.getToSkip();

  for (const key in object) {
    if (toSkip.includes(key)) continue;

    const data = object[key];
    if (!Array.isArray(data)) {
      await progress.addToSkip(key);
      console.log(`\nSe ignora ${key} porque no es un array`);
      continue;
    }

    const exampleData = data[0];
    if (!exampleData.code || !exampleData.description) {
      await progress.addToSkip(key);
      console.log(`\nSe ignora ${key} porque no tiene codigo o descripcion`);
      continue;
    }

    console.log(`\nProcesando ${key} con longitud ${object[key].length} ...`);
    console.log(
      `\nPrimer valor:\n${JSON.stringify(object[key][0], null, 2)}\n\n`,
    );

    const omitir = await rl.ask('Desea omitir (y/n) (n):');

    if (omitir == 'y') {
      await progress.addToSkip(key);
      continue;
    }

    const userConstantName = rl.ask(`Nombre de constante (${key}):`);

    const fileName = (userConstantName ?? key) + '.table.ts';

    await createConstantFile(key as KeyOfData, data, fileName, '../db/');
  }

  rl.close();
}

createFiles(constantsService);
