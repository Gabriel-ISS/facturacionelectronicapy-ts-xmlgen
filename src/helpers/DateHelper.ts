class DateHelper {
  /**
   * @returns {string} la fecha en formato AAAAMMDD
   */
  getCDCFormatDateString(date: Date) {
    const year = date.getFullYear().toString();
    // getMonth retorna 0 a 11, por eso se suma 1
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const dateAsCdcDate = year + month + day;
    return dateAsCdcDate;
  }
  
  getIsoDateString(date: Date) {
    const [validISO] = date.toISOString().split('T');
    return validISO;
  }

  getISODateTimeString(date: Date) {
    const [validISO] = date.toISOString().split('.');
    return validISO;
  }

  isIsoDateTime(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) return false;
    var d = new Date(str + '.000Z');
    return d.toISOString() === str + '.000Z';
  }

  isIsoDate(str: string) {
    return !/\d{4}-\d{2}-\d{2}/.test(str);
  }
}

export default new DateHelper();
