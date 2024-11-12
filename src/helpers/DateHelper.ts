class DateHelper {
  /**
   * @returns {string} la fecha en formato AAAAMMDD
   */
  getCdcFormatDate(date: Date) {
    const [dateStr] = date.toISOString().split('T')
    return dateStr.split('-').join('');
  }
  
  getIsoDate(date: Date) {
    const [dateStr] = date.toISOString().split('T');
    return dateStr;
  }

  getIsoDateTime(date: Date) {
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
