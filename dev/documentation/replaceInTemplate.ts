import fs from 'fs';

function replaceInTemplate(replacements: Record<string, string>) {
  let template = fs.readFileSync('./dev/documentation/template.md', 'utf8');
  template = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return replacements[key];
  });
  fs.writeFileSync('./README.md', template);
}

export default replaceInTemplate;