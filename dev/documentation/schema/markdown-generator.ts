import fs from 'fs';

export default class MarkdownGenerator {
  constructor(readonly path: string) {}

  addToFile(content: string) {
    fs.appendFileSync(this.path, content)
  }

  setTitle(title: string) {
    this.addToFile(`### ${title}\n\n`)
  }

  getLink(value: string) {
    return `[${value}](#${value.replace(/ /g, '-').replace(/\./g, '')})`;
  }

  setHeaderRow(headers: any[]) {
    const header = '| ' + headers.join(' | ') + ' |';
    const divisor = '| ' + headers.map(() => '---').join(' | ') + ' |';
    this.addToFile(header + '\n' + divisor + '\n');
  }

  setRow(row: string[]) {
    this.addToFile('| ' + row.join(' | ') + ' |\n');
  }
}