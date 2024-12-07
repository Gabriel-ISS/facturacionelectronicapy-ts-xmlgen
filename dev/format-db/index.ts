import fs from 'fs';
import * as readline from 'readline';
// @ts-ignore
import * as prettier from 'prettier';

/**
 * Para no tener que repetir los archivos si se deja el trabajo a la mitad
 * sirve para administrar archivos que guardan el progreso de la generación
 */
class Progress {
  constructor(
    readonly PROGRESS_FILE: string,
    readonly SKIP_FILE: string,
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
  async getTableFileContent<D extends { _id: string | number }>(
    currentConstantFilePath: string,
    currentValues: D[],
  ): Promise<string> {
    const fileContent = fs.readFileSync(currentConstantFilePath, 'utf8');
    const { enumName, enumContent } = this.getEnumNameAndContent(fileContent);

    let r = `import Table from '../helpers/Table';\n\n`;
    r += enumContent;
    r += await this.getTableStr(enumName, currentValues);
    return r;
  }

  private getEnumNameAndContent(fileContent: string) {
    const nameRegex = /export enum (\w+)/g;
    const nameMatch = nameRegex.exec(fileContent);
    if (!nameMatch) return { enumName: undefined, enumContent: '' };
    const enumName = nameMatch?.[1];

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
    const enumContent = fileContent.substring(startIndex, endIndex) + '}\n\n';

    return { enumName, enumContent };
  }

  private getTypeStr(enumName: string | undefined): string {
    const fields: string[] = [];
    for (const [header, value] of Object.entries(this.currentData[0])) {
      if (enumName && header == '_id') {
        fields.push(`['${header}', ${enumName}]`);
        continue;
      }
      fields.push(`['${header}', ${typeof value}]`);
    }

    return `{\n${fields.map((f, i) => `\t\t${i}: ${f}, \n`).join('')}}`;
  }

  private async getTableStr<D extends { _id: string | number }>(
    enumName: string | undefined,
    currentValues: D[],
  ): Promise<string> {
    const headers = Object.keys(currentValues[0]);
    const data = currentValues.map((d) => Object.values(d));

    let table = '';
    table += `export const table = new Table<`;
    table += `${this.getTypeStr(enumName)}>(\n`;
    table += `  ${JSON.stringify(headers)},\n`;
    table += `  ${JSON.stringify(data, null, 2)},\n`;
    table += `);\n\n`;

    return await prettier.format(table, {
      parser: 'typescript',
      printWidth: 80,
      trailingComma: 'all',
      singleQuote: true,
    });
  }
}

function createFile(path: string, content: string) {
  return new Promise<string>((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      else resolve(path);
    });
  });
}

async function createFiles(object: Record<string, any>) {
  const progress = new Progress('progress.txt', 'skipped.txt');
  const rl = new ReadLine();

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
    if (!exampleData._id) {
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

    const constantsPath = '../src/constants/';
    const dataPath = '../src/data/';

    const currentConstantFilePath = constantsPath + key + '.constants.ts';
    const u_currentConstantFilePath = await rl.ask(
      `Ruta al archivo con los datos (${currentConstantFilePath}):`,
    );
    const fileName = key + '.table.ts';

    const tableFilePath = dataPath + fileName;

    const tt = new ToTableTransformer(data);

    const tableFileContent = await tt.getTableFileContent(
      u_currentConstantFilePath
        ? u_currentConstantFilePath
        : currentConstantFilePath,
      data,
    );

    try {
      await createFile(tableFilePath, tableFileContent);
      await progress.addToProgress(key);
    } catch (error) {
      console.error('Error al crear el archivo:', (error as Error).message);
    }
  }

  rl.close();
}

createFiles(constantsService);
