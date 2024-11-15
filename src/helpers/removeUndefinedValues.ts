function removeUndefinedValues(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj;

  // Iterar sobre todas las propiedades del objeto
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeUndefinedValues(obj[key]);
      
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }

  return obj;
}
