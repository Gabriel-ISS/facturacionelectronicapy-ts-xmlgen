import { EDocumentData } from './EDocumentData.type';
import { EDocumentParams } from './EDocumentParams.type';
import fechaUtilService from '../helpers/DateHelper';
import stringUtilService from './StringUtil.service';
import constanteService from './constants.service';
import { Currency } from '../constants/curencies.constants';
import { ValidDocumentType } from '../constants/documentTypes.constants';
import { GlobalAndPerItem } from '../constants/globalAndPerItem.constant';
import jsonDteItemValidate from './jsonDteItemValidate.service';
import { XmlGenConfig } from './type.interface';
import DateHelper from '../helpers/DateHelper';

class GenericValidator {
  errors: Array<string> = [];

  private replace(search: string, replace: { toString(): string }, target: string) {
    return target.replace(search, replace.toString());
  }

  require(value: any, error: string): boolean {
    const isValid = !!value;
    if (!isValid) {
      let err = error;
      this.errors.push(err);
    }
    return isValid;
  }

  isArray(value: any, error: string): boolean {
    const isValid = Array.isArray(value)
    if (!isValid) {
      let err = error;
      err = this.replace('$valueType', typeof value, err);
      this.errors.push(err);
    }
    return isValid;
  }

  length(value: { length: number }, length: number, error: string): boolean {
    const isValid = value.length == length
    if (!isValid) {
      let err = error;
      err = this.replace('$value', value, err);
      err = this.replace('$length', length, err);
      this.errors.push(err);
    }
    return isValid
  }

  minLength(value: string, min: number, error: string): boolean {
    const isValid = value.length >= min
    if (!isValid) {
      let err = error;
      err = this.replace('$value', value, err);
      err = this.replace('$min', min, err);
      this.errors.push(err);
    }
    return isValid
  }

  maxLength(value: string, max: number, error: string): boolean {
    const isValid = value.length <= max
    if (!isValid) {
      let err = error;
      err = this.replace('$value', value, err);
      err = this.replace('$max', max, err);
      this.errors.push(err);
    }
    return isValid;
  }

  lengthRange(value: string, min: number, max: number, error: string): boolean {
    const isValid = value.length >= min || value.length <= max
    if (!isValid) {
      let err = error;
      err = this.replace('$value', value, err);
      err = this.replace('$min', min, err);
      err = this.replace('$max', max, err);
      this.errors.push(err);
    }
    return isValid;
  }

  oneOf<T extends string | number>(validValues: { _id: T; description: string }[], value: T, error: string): boolean {
    const foundValue = validValues.find((v) => v._id === value);
    const isValid = !!foundValue;
    if (!isValid) {
      const validValuesStr = validValues.map(({ _id, description }) => `${_id} - ${description}`).join(', \n');
      let err = error;
      err = this.replace('$value', value, err);
      err = this.replace('$validValues', validValuesStr, err);

      this.errors.push(err);
    }
    return isValid;
  }

  range(value: number, min: number, max: number, error: string): boolean {
    const isValid = value >= min || value <= max
    if (!isValid) {
      let err = error;
      err = this.replace('$value', value, err);
      err = this.replace('$min', min, error);
      err = this.replace('$max', max, error);
      this.errors.push(err);
    }
    return isValid;
  }

  justNumbers(value: string, error: string): boolean {
    var numberReg = new RegExp(/^\d+$/);
    const isValid = numberReg.test(value)
    if (!isValid) {
      let err = error;
      err = this.replace('$value', value, err);
      this.errors.push(err);
    }
    return isValid;
  }

  isIsoDate(date: string, error: string): boolean {
    const isValid = fechaUtilService.isIsoDate(date)
    if (!isValid) {
      let err = error;
      err = this.replace('$value', date, err);
      this.errors.push(err);
    }
    return isValid;
  }

  clearErrors() {
    this.errors = [];
  }
}

/**
 * El CDC se valida
 * El RUC debe contener dígito verificador
 * El timbrado se valida
 */

class EDocumentMainValidateService {
  validator: GenericValidator = new GenericValidator();

  /**
   * Valida los datos ingresados en el data
   * A. Campos firmados del Documento Electrónico (A001-A099)
   *   1 - Validación automática
   *   2 - Se realiza en el SIFEN, pero puede ser realizado en la API de integración
   *   3 - Se realiza en el SIFEN, pero puede ser realizado en la API de integración
   *   4 - Validación automática
   *   5 - Se realiza en el SIFEN, la fecha/hora del servidor debe sincronizarse con el SIFEN
   *   6 - Falta, pero es AO
   *
   * B. Campos inherentes a la operación comercial de los Documentos Electrónicos (B001 -B099)
   *   7 - Falta
   *   8 - Validación automática, via constante.service
   *
   * C. Campos de datos del Timbrado (C001 - C099)
   *   9 - Validación automática, via constante.service
   *  10 - Se realiza en el SIFEN, se valida solo la primera vez
   *  11 - Se realiza en el SIFEN, se valida solo la primera vez
   *  12 - Se realiza en el SIFEN, se valida solo la primera vez
   *  13 - Se realiza en el SIFEN, se valida solo la primera vez
   *  14 - Se realiza en el SIFEN, se valida solo la primera vez
   *  15 - Se realiza en el SIFEN, se valida solo la primera vez
   *  16 - Se realiza en el SIFEN, pero puede ser realizado en la API de integración
   *
   * @param data
   */
  public validateValues(params: EDocumentParams, data: EDocumentData, config: XmlGenConfig) {
    this.validator.clearErrors();

    this.validateCdc(params, data);

    this.validateIssuer(params, data);

    this.generateDatosOperacionValidate(params, data);

    this.generateDatosGeneralesValidate(params, data, config);

    this.generateDatosEspecificosPorTipoDEValidate(params, data);

    if (data.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA) {
      this.generateDatosAutofacturaValidate(params, data);
    }

    if (
      data.tipoDocumento == ValidDocumentType.FACTURA_ELECTRONICA ||
      data.tipoDocumento == ValidDocumentType.AUTOFACTURA_ELECTRONICA
    ) {
      this.generateDatosCondicionOperacionDEValidate(params, data);
    }

    this.validator.errors = jsonDteItemValidate.generateDatosItemsOperacionValidate(
      params,
      data,
      config,
      this.validator.errors,
    );

    this.generateDatosComplementariosComercialesDeUsoEspecificosValidate(params, data);

    if (data.tipoDocumento == ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA) {
      //1 Opcional, 7 Obligatorio
      if (!data.detalleTransporte) {
        this.validator.errors.push(
          'Debe especificar el detalle de tranporte en data.tranporte para el Tipo de Documento = 7',
        );
      } else {
        this.generateDatosTransporteValidate(params, data);
      }
    } else if (data.tipoDocumento == ValidDocumentType.FACTURA_ELECTRONICA) {
      //Es por que tipoDocumento = 1
      if (data.detalleTransporte) {
        this.generateDatosTransporteValidate(params, data);
      }
    }

    if (data.tipoDocumento != ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA) {
      this.generateDatosTotalesValidate(params, data, config);
    }

    if (data.complementarios) {
      this.generateDatosComercialesUsoGeneralValidate(params, data);
    }

    if (data.moneda != Currency.GUARANI && data.condicionTipoCambio == GlobalAndPerItem.GLOBAL) {
      if (!data.cambio) {
        this.validator.errors.push(
          `Debe especificar el valor del Cambio en data.cambio cuando moneda != ${Currency.GUARANI} y la Cotización es Global`,
        );
      }
    }

    const requireAsociatedDocument = [
      ValidDocumentType.AUTOFACTURA_ELECTRONICA,
      ValidDocumentType.NOTA_DE_CREDITO_ELECTRONICA,
      ValidDocumentType.NOTA_DE_DEBITO_ELECTRONICA,
    ];

    if (requireAsociatedDocument.includes(data.tipoDocumento) && !data.documentoAsociado) {
      this.validator.errors.push(
        `Documento asociado es obligatorio para el tipo de documento electrónico con _id "${data.tipoDocumento}"`,
      );
    }

    const requireAsociatedDocumentValidation = [
      ValidDocumentType.FACTURA_ELECTRONICA,
      ValidDocumentType.AUTOFACTURA_ELECTRONICA,
      ValidDocumentType.NOTA_DE_CREDITO_ELECTRONICA,
      ValidDocumentType.NOTA_DE_DEBITO_ELECTRONICA,
      ValidDocumentType.NOTA_DE_REMISION_ELECTRONICA,
    ];

    if (requireAsociatedDocumentValidation.includes(data.tipoDocumento) && data.documentoAsociado) {
      if (Array.isArray(data.documentoAsociado)) {
        for (const documentoAsociado of data.documentoAsociado) {
          this.generateDatosDocumentoAsociadoValidate(params, documentoAsociado, data);
        }
      } else {
        this.generateDatosDocumentoAsociadoValidate(params, data.documentoAsociado, data);
      }
    }

    // TODO: mejor usar una clase "ValidationError"
    // disparar error
    if (this.validator.errors.length) {
      let strErrors = '';

      const configErrorLimit = config.errorLimit || 3;
      let maxErrors = configErrorLimit < this.validator.errors.length ? configErrorLimit : this.validator.errors.length;

      for (let i = 0; i < maxErrors; i++) {
        const error = this.validator.errors[i];
        strErrors += error;

        const isLast = i == maxErrors - 1;
        if (!isLast) {
          strErrors += config.errorSeparator + '';
        }
      }

      throw new Error(strErrors);
    }
  }

  /** CDC (Código de Control Digital) */
  validateCdc(params: EDocumentParams, data: EDocumentData) {
    if (!data.cdc || data.cdc.length != 44) return;

    const cdc = {
      //securityCode: controlCode.substring(34, 43),
      /** Como se va utilizar el CDC enviado como parámetro, va a verificar que
       * todos los datos del XML coincidan con el CDC. */
      documentType: data.cdc.substring(0, 2),
      //ruc: cdc.substring(2, 10),
      //dv: cdc.substring(10, 11),
      establishment: data.cdc.substring(11, 14),
      point: data.cdc.substring(14, 17),
      number: data.cdc.substring(17, 24),
      //taxpayerType: cdc.substring(24, 25),
      date: data.cdc.substring(25, 33),
      issuanceType: data.cdc.substring(33, 34),
    };

    if (data.tipoDocumento != Number(cdc.documentType)) {
      this.validator.errors.push(
        `El Tipo de Documento con _id "${data.tipoDocumento}" debe coincidir con el tipo de documento del CDC "${cdc.documentType}"`,
      );
    }

    const establishment = stringUtilService.leftZero(data.establecimiento, 3);
    if (establishment != cdc.establishment) {
      this.validator.errors.push(
        `El Establecimiento '${establishment}' debe coincidir con el establecimiento del CDC '${cdc.establishment}'`,
      );
    }

    const point = stringUtilService.leftZero(data.punto, 3);
    if (point != cdc.point) {
      this.validator.errors.push(`El Punto '${point}' debe coincidir con el punto del CDC '${cdc.point}'`);
    }

    const number = stringUtilService.leftZero(data.numero, 7);
    if (number != cdc.number) {
      this.validator.errors.push(
        `El Numero de Documento '${number}' debe coincidir con el numero del documento del CDC '${cdc.number}'`,
      );
    }

    /*if (+data['tipoContribuyente'] != +tipoContribuyenteCDC) {
        this.validator.errors.push("El Tipo de Contribuyente '" + data['tipoContribuyente'] + "' en data.tipoContribuyente debe coincidir con el CDC reutilizado (" + tipoContribuyenteCDC + ")");
      }*/

    const formattedDate = DateHelper.getCdcFormatDate(new Date(data.fecha));
    if (formattedDate != cdc.date) {
      this.validator.errors.push(`La fecha '${formattedDate}' debe coincidir con la fecha del CDC '${cdc.date}'`);
    }

    if (data.tipoEmision != Number(cdc.issuanceType)) {
      this.validator.errors.push(
        `El Tipo de Emisión '${data.tipoEmision}' debe coincidir con el del CDC '${cdc.issuanceType}'`,
      );
    }
  }

  /** Genera los errores relacionados con el emisor */
  private validateIssuer(params: EDocumentParams, data: EDocumentData) {
    const [RUC, DV] = params.ruc.split('-');

    // RUC
    /*if (!reg.test(rucEmisor)) {
      this.validator.errors.push("La parte que corresponde al RUC '" + params.ruc + "' en params.ruc debe ser numérico");
    }*/
    this.validator.lengthRange(
      RUC,
      1,
      8,
      `La parte que corresponde al RUC en '$value' debe contener entre $min y $max caracteres`,
    );

    // DV
    this.validator.require(params.ruc, 'RUC debe contener dígito verificador');
    this.validator.justNumbers(DV, `La parte que corresponde al DV del RUC '${params.ruc}' debe ser numérico`);
    this.validator.range(
      Number(DV),
      1,
      9,
      `La parte que corresponde al DV del RUC '${params.ruc}' debe ser del $min al $max`,
    );

    // TIMBRADO FECHA
    this.validator.isIsoDate(
      params.timbradoFecha,
      `Valor de la Fecha de Timbrado '$value' no válido. Formato: YYYY-MM-DD`,
    );

    //Aqui hay que verificar los datos de las sucursales
    const establishmentsIsArray = this.validator.isArray(
      params.establecimientos,
      `Debe especificar un array de establecimientos, pero se obtuvo $valueType`,
    );
    if (establishmentsIsArray) {
      for (let i = 0; i < params.establecimientos.length; i++) {
        const establecimiento = params.establecimientos[i];

        this.validator.require(establecimiento.codigo, `Debe especificar el código del establecimiento en el index ${i}`);


        if (establecimiento.telefono) {
          this.validator.lengthRange(
            establecimiento.telefono,
            6,
            15,
            `El valor del teléfono '$value' en el establecimiento con index ${i} debe tener una longitud de 6 a 15 caracteres`,
          );

          const isValidTelephoneLength = this.validator.lengthRange(
            establecimiento.telefono,
            6,
            15,
            `El valor del teléfono '$value' en el establecimiento con index ${i} debe tener una longitud de $min a $max caracteres`,
          )

          if (isValidTelephoneLength) {
            if (
              (establecimiento.telefono + '').includes('(') ||
              (establecimiento.telefono + '').includes(')') ||
              (establecimiento.telefono + '').includes('[') ||
              (establecimiento.telefono + '').includes(']')
            ) {
              /*this.validator.errors.push(
                "El valor '" +
                  establecimiento.telefono +
                  "' en params.establecimientos[" +
                  i +
                  '].telefono no puede contener () o []',
              );*/
              // Del repo original: Finalmente no da error en la SET por esto
            }
          }
        }
      }
    }
  }

  // ???
  private generateDatosOperacionValidate(params: EDocumentParams, data: EDocumentData) {
    /*if (params.ruc.indexOf('-') == -1) { //removido temporalmente, parece que no hace falta
      this.validator.errors.push('RUC debe contener dígito verificador en params.ruc');
    }*/
  }

  // ???
  private generateDatosGeneralesValidate(params: EDocumentParams, data: EDocumentData, config: XmlGenConfig) {
    this.generateDatosGeneralesInherentesOperacionValidate(params, data);

    this.generateDatosGeneralesEmisorDEValidate(params, data);

    if (config.userObjectRemove == false) {
      //Si está TRUE no crea el objeto usuario
      if (data['usuario']) {
        //No es obligatorio
        this.generateDatosGeneralesResponsableGeneracionDEValidate(params, data);
      }
    }
    this.generateDatosGeneralesReceptorDEValidate(params, data);
  }

  private generateDatosGeneralesInherentesOperacionValidate(params: EDocumentParams, data: EDocumentData) {




    if (data['condicionAnticipo']) {
      if (constanteService.advancePaymentConditions.filter((um) => um._id === data['condicionAnticipo']).length == 0) {
        this.validator.errors.push(
          "Condición de Anticipo '" +
            data['condicionAnticipo'] +
            "' en data.condicionAnticipo no válido. Valores: " +
            constanteService.advancePaymentConditions.map((a) => a._id + '-Anticipo ' + a.description),
        );
      }
    } else {
      //condicionAnticipo - si no tiene condicion anticipo, pero tipo transaccion es 9, que de un error.
    }

    if (constanteService.transactionTypes.filter((um) => um._id === data['tipoTransaccion']).length == 0) {
      this.validator.errors.push(
        "Tipo de Transacción '" +
          data['tipoTransaccion'] +
          "' en data.tipoTransaccion no válido. Valores: " +
          constanteService.transactionTypes.map((a) => a._id + '-' + a.description),
      );
    }

    if (data.tipoDocumento == 1 || data.tipoDocumento == 4) {
      //Obligatorio informar iTipTra D011
      if (!data['tipoTransaccion']) {
        this.validator.errors.push('Debe proveer el Tipo de Transacción en data.tipoTransaccion');
      }
    }

    if (moneda != 'PYG') {
      if (!data.condicionTipoCambio) {
        this.validator.errors.push('Debe informar el tipo de Cambio en data.condicionTipoCambio');
      }
    }

    if (data.condicionTipoCambio == 1 && moneda != 'PYG') {
      if (!(data['cambio'] && data['cambio'] > 0)) {
        this.validator.errors.push('Debe informar el valor del Cambio en data.cambio');
      }
    }

    if (data['obligaciones']) {
      if (!Array.isArray(data['obligaciones'])) {
        this.validator.errors.push('El valor de data.obligaciones debe ser un Array');
      } else {
        for (let i = 0; i < data['obligaciones'].length; i++) {
          let obligacion = data['obligaciones'][i];

          if (!obligacion.codigo) {
            this.validator.errors.push('No fue especificado un código en data.obligaciones[' + i + '].codigo');
          } else {
            //Verificar cada item
            if (constanteService.obligations.filter((um) => um._id === +obligacion.codigo).length == 0) {
              this.validator.errors.push(
                "Obligación '" +
                  obligacion.codigo +
                  "' en data.obligaciones[" +
                  i +
                  '].codigo no válido. Valores: ' +
                  constanteService.obligations.map((a) => a._id + '-' + a.description),
              );
            }
          }
        }
      }
    }
  }

  private generateDatosGeneralesEmisorDEValidate(params: EDocumentParams, data: EDocumentData) {
    const regExpOnlyNumber = new RegExp(/^\d+$/);

    if (!(params && params.establecimientos)) {
      this.validator.errors.push('Debe proveer un Array con la información de los establecimientos en params');
    }

    //Validar si el establecimiento viene en params
    let establecimiento = stringUtilService.leftZero(data.establecimiento, 3);
    //let punto = stringUtilService.leftZero(data.punto, 3);

    if (params.establecimientos.filter((um: any) => um.codigo === establecimiento).length == 0) {
      this.validator.errors.push(
        "Establecimiento '" +
          establecimiento +
          "' no encontrado en params.establecimientos*.codigo. Valores: " +
          params.establecimientos.map((a: any) => a.codigo + '-' + a.denominacion),
      );
    }

    /*if (params.ruc.indexOf('-') == -1) { //Removido temporalmente, al parecer no hace falta
      this.validator.errors.push('RUC debe contener dígito verificador en params.ruc');
    }*/

    if (!(params['actividadesEconomicas'] && params['actividadesEconomicas'].length > 0)) {
      this.validator.errors.push('Debe proveer el array de actividades económicas en params.actividadesEconomicas');
    }

    //Validacion de algunos datos de la sucursal
    const establecimientoUsado = params.establecimientos.filter((e: any) => e.codigo === establecimiento)[0];

    if (!establecimientoUsado) {
      this.validator.errors.push(
        'Debe especificar los datos del Establecimiento "' + establecimiento + '" en params.establecimientos*',
      );
    } else {
      if (!establecimientoUsado.ciudad) {
        this.validator.errors.push('Debe proveer la Ciudad del establecimiento en params.establecimientos*.ciudad');
      }
      if (!establecimientoUsado.distrito) {
        this.validator.errors.push('Debe proveer la Distrito del establecimiento en params.establecimientos*.distrito');
      }
      if (!establecimientoUsado.departamento) {
        this.validator.errors.push(
          'Debe proveer la Departamento del establecimiento en params.establecimientos*.departamento',
        );
      }

      constanteService.validateLocation(
        'params.establecimientos*',
        +establecimientoUsado.departamento,
        +establecimientoUsado.distrito,
        +establecimientoUsado.ciudad,
        this.validator.errors,
      );

      if (establecimientoUsado['numeroCasa']) {
        if (!regExpOnlyNumber.test(establecimientoUsado['numeroCasa'])) {
          this.validator.errors.push('El Número de Casa en params.establecimientos*.numeroCasa debe ser numérico');
        }
      }
    }
  }

  private generateDatosGeneralesResponsableGeneracionDEValidate(params: EDocumentParams, data: EDocumentData) {
    if (
      constanteService.userIdentityDocuments.filter((um: any) => um.codigo === +data['usuario']['documentoTipo'])
        .length == 0
    ) {
      this.validator.errors.push(
        "Tipo de Documento '" +
          data['usuario']['documentoTipo'] +
          "' no encontrado en data.usuario.documentoTipo. Valores: " +
          constanteService.userIdentityDocuments.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }

    if (!data['usuario']['documentoNumero']) {
      this.validator.errors.push('El Documento del Responsable en data.usuario.documentoNumero no puede ser vacio');
    }

    if (!data['usuario']['nombre']) {
      this.validator.errors.push('El Nombre del Responsable en data.usuario.nombre no puede ser vacio');
    }

    if (!data['usuario']['cargo']) {
      this.validator.errors.push('El Cargo del Responsable en data.usuario.cargo no puede ser vacio');
    }
  }

  private generateDatosGeneralesReceptorDEValidate(params: EDocumentParams, data: EDocumentData) {
    if (!data['cliente']) {
      return; //El error de cliente vacio, ya fue validado arriba
    }

    if (!data['cliente']['tipoOperacion']) {
      this.validator.errors.push('Tipo de Operación del Cliente en data.cliente.tipoOperacion es requerido > 0');
    } else {
      if (
        constanteService.operationTypes.filter((um: any) => um.codigo === +data['cliente']['tipoOperacion']).length == 0
      ) {
        this.validator.errors.push(
          "Tipo de Operación '" +
            data['cliente']['tipoOperacion'] +
            "' del Cliente en data.cliente.tipoOperacion no encontrado. Valores: " +
            constanteService.operationTypes.map((a: any) => a.codigo + '-' + a.descripcion),
        );
      }
    }
    if (!data['cliente']['contribuyente'] && data['cliente']['tipoOperacion'] != 4) {
      if (
        constanteService.identityDocumentsReceptors.filter((um: any) => um.codigo === +data['cliente']['documentoTipo'])
          .length == 0
      ) {
        this.validator.errors.push(
          "Tipo de Documento '" +
            data['cliente']['documentoTipo'] +
            "' del Cliente en data.cliente.documentoTipo no encontrado. Valores: " +
            constanteService.identityDocumentsReceptors.map((a: any) => a.codigo + '-' + a.descripcion),
        );

        if (+data['cliente']['documentoTipo'] == 9) {
          if (!data['cliente']['documentoTipoDescripcion']) {
            this.validator.errors.push(
              'Debe especificar la Descripción para el tipo de Documento en data.cliente.documentoTipoDescripcion para documentoTipo=9',
            );
          }
        }
      }
    }

    var regExpOnlyNumber = new RegExp(/^\d+$/);
    if (data['cliente']['contribuyente']) {
      if (!data['cliente']['ruc']) {
        this.validator.errors.push('Debe proporcionar el RUC en data.cliente.ruc');
      } else {
        if (data['cliente']['ruc'].indexOf('-') == -1) {
          this.validator.errors.push('RUC debe contener dígito verificador en data.cliente.ruc');
        }

        const rucCliente = data['cliente']['ruc'].split('-');

        //Un RUC puede ser alphanumerico
        /*if (!regExpOnlyNumber.test((rucCliente[0] + '').trim())) {
          this.validator.errors.push(
            "La parte del RUC del Cliente '" + data['cliente']['ruc'] + "' en data.cliente.ruc debe ser numérico",
          );
        }*/
        if (!regExpOnlyNumber.test((rucCliente[1] + '').trim())) {
          this.validator.errors.push(
            "La parte del DV del RUC del Cliente '" +
              data['cliente']['ruc'] +
              "' en data.cliente.ruc debe ser numérico",
          );
        }

        if (!(rucCliente[0].length >= 3 && rucCliente[0].length <= 8)) {
          this.validator.errors.push(
            "La parte del RUC '" + data['cliente']['ruc'] + "' en data.cliente.ruc debe contener de 3 a 8 caracteres",
          );
        }

        if (rucCliente[1] > 9) {
          this.validator.errors.push(
            "La parte del DV del RUC '" + data['cliente']['ruc'] + "' en data.cliente.ruc debe ser del 1 al 9",
          );
        }
      }

      if (!data['cliente']['tipoContribuyente']) {
        this.validator.errors.push('Debe proporcionar el Tipo de Contribuyente en data.cliente.tipoContribuyente');
      }
    }

    if (!data['cliente']['razonSocial']) {
      this.validator.errors.push('La razon social del receptor en data.cliente.razonSocial no puede ser vacio');
    } else {
      if (!((data['cliente']['razonSocial'] + '').length >= 4 && (data['cliente']['razonSocial'] + '').length <= 250)) {
        this.validator.errors.push(
          "La razon Social del Cliente '" +
            data['cliente']['razonSocial'] +
            "' en data.cliente.razonSocial debe tener de 4 a 250 caracteres",
        );
      }
    }

    if (data['cliente']['nombreFantasia'] && (data['cliente']['nombreFantasia'] + '').length > 0) {
      if (
        !(
          (data['cliente']['nombreFantasia'] + '').length >= 4 && (data['cliente']['nombreFantasia'] + '').length <= 250
        )
      ) {
        this.validator.errors.push(
          "El nombre de Fantasia del Cliente '" +
            data['cliente']['nombreFantasia'] +
            "' en data.cliente.nombreFantasia debe tener de 4 a 250 caracteres",
        );
      }
    }

    if (constanteService.countries.filter((pais: any) => pais.codigo === data['cliente']['pais']).length == 0) {
      this.validator.errors.push(
        "Pais '" +
          data['cliente']['pais'] +
          "' del Cliente en data.cliente.pais no encontrado. Valores: " +
          constanteService.countries.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }

    if (data.tipoDocumento == 4) {
      if (data['cliente']['tipoOperacion'] != 2) {
        this.validator.errors.push('El Tipo de Operación debe ser 2-B2C para el Tipo de Documento AutoFactura');
      }
    }

    if (!data['cliente']['contribuyente'] && data['cliente']['tipoOperacion']) {
      //No es contribuyente
      //Obligatorio completar D210

      if (!data['cliente']['contribuyente'] && data['cliente']['tipoOperacion'] != 4) {
        if (!data['cliente']['documentoTipo']) {
          //Val.: 59
          this.validator.errors.push('Debe informar el Tipo de Documento del Cliente en data.cliente.documentoTipo');
        }

        //Cuando el campo puede ser un número, y se admite el valor cero, mejor preguntar de ésta forma
        if (typeof data['cliente']['documentoNumero'] == 'undefined') {
          //Val.: 65
          this.validator.errors.push('Debe informar el número de documento en data.cliente.documentoNumero');
        } else {
          //Validar que documentoNumero no tenga .
          if ((data['cliente']['documentoNumero'] + '').indexOf('.') > -1) {
            this.validator.errors.push(
              'El valor "' + data['cliente']['documentoNumero'] + '" en data.cliente.documentoNumero no es válido ',
            );
          }
          //Validar que documentoNumero no tenga /
          if ((data['cliente']['documentoNumero'] + '').indexOf('/') > -1) {
            this.validator.errors.push(
              'El valor "' + data['cliente']['documentoNumero'] + '" en data.cliente.documentoNumero no es válido ',
            );
          }
        }
      }
    }

    if (
      !data['cliente']['contribuyente'] &&
      data.tipoDocumento != 4 &&
      data['cliente']['tipoOperacion'] != 2 &&
      data['cliente']['tipoOperacion'] != 4
    ) {
      //Val.: 46. parrafo 1
      this.validator.errors.push('El tipo de Operación debe ser 2-B2C o 4-B2F para el Receptor "No Contribuyente"');
    }

    if (data['cliente']['tipoOperacion'] == 4 && data['cliente']['contribuyente'] == true) {
      //Val.: 46. parrafo 2
      this.validator.errors.push(
        'La naturaleza del Receptor debe ser "No contribuyente" para el Tipo de Operación = 4-B2F',
      );
    }

    //Temporal Mercosys
    /*if (data.tipoDocumento === 7 || data['cliente']['tipoOperacion'] === 4) {
      if (!data['cliente']['direccion']) {
        this.validator.errors.push('data.cliente.direccion es Obligatorio para Tipo de Documento 7 o Tipo de Operación 4');
      }
    }*/

    if (data.tipoDocumento === 7) {
      if (!data['cliente']['direccion']) {
        this.validator.errors.push('data.cliente.direccion es Obligatorio para Tipo de Documento 7');
      }
    }

    if (data['cliente']['direccion']) {
      //Si tiene dirección hay que completar numero de casa.

      if (
        !(
          (data['cliente']['direccion'] + '').trim().length >= 1 &&
          (data['cliente']['direccion'] + '').trim().length <= 255
        )
      ) {
        this.validator.errors.push(
          "La dirección del Receptor '" +
            data['cliente']['direccion'] +
            "' en data.cliente.direccion debe tener de 1 a 255 caracteres",
        );
      }

      if (data['cliente']['numeroCasa'] == null) {
        this.validator.errors.push('Debe informar el Número de casa del Receptor en data.cliente.numeroCasa');
      }

      if (!((data['cliente']['numeroCasa'] + '').length > 0)) {
        this.validator.errors.push('Debe informar el Número de casa del Receptor en data.cliente.numeroCasa');
      }

      //Nueva forma de validar campos numericos
      /*
      if (  ! ( data['cliente']['numeroCasa'] != null && 
                (data['cliente']['numeroCasa'] + '').length > 0 &&
                regExpOnlyNumber.test(data['cliente']['numeroCasa']) )
      ) {
        this.validator.errors.push('Debe informar el Número de casa del Receptor en data.cliente.numeroCasa');
      }
      */
    }

    if (data['cliente']['numeroCasa']) {
      if (!regExpOnlyNumber.test(data['cliente']['numeroCasa'])) {
        this.validator.errors.push('El Número de Casa en data.cliente.numeroCasa debe ser numérico');
      }
    }

    if (data['cliente']['direccion'] && data['cliente']['tipoOperacion'] != 4) {
      if (!data['cliente']['ciudad']) {
        this.validator.errors.push(
          'Obligatorio especificar la Ciudad en data.cliente.ciudad para Tipo de Operación != 4',
        );
      } else {
        if (constanteService.cities.filter((ciudad: any) => ciudad.codigo === +data['cliente']['ciudad']).length == 0) {
          this.validator.errors.push(
            "Ciudad '" +
              data['cliente']['ciudad'] +
              "' del Cliente en data.cliente.ciudad no encontrado. Valores: " +
              constanteService.cities.map((a: any) => a.codigo + '-' + a.descripcion),
          );
        }

        //De acuerdo a la Ciudad pasada como parametro, buscar el distrito y departamento y asignar dichos
        //valores de forma predeterminada, aunque este valor sera sobre-escrito caso el usuario envie
        //data['cliente']['distrito'] y data['cliente']['departamento']
        let objCiudad: any = constanteService.cities.filter((ciu) => ciu._id === +data['cliente']['ciudad']);

        if (objCiudad && objCiudad[0]) {
          let objDistrito: any = constanteService.districts.filter((dis) => dis._id === +objCiudad[0]['distrito']);

          let objDepartamento: any = constanteService.departments.filter(
            (dep) => dep._id === +objDistrito[0]['departamento'],
          );

          data['cliente']['distrito'] = objDistrito[0]['codigo'];

          data['cliente']['departamento'] = objDepartamento[0]['codigo'];
        }
      }

      if (!data['cliente']['distrito']) {
        this.validator.errors.push(
          'Obligatorio especificar el Distrito en data.cliente.distrito para Tipo de Operación != 4',
        );
      } else if (
        constanteService.districts.filter((distrito: any) => distrito.codigo === +data['cliente']['distrito']).length ==
        0
      ) {
        this.validator.errors.push(
          "Distrito '" +
            data['cliente']['distrito'] +
            "' del Cliente en data.cliente.distrito no encontrado. Valores: " +
            constanteService.districts.map((a: any) => a.codigo + '-' + a.descripcion),
        );
      }

      if (!data['cliente']['departamento']) {
        this.validator.errors.push(
          'Obligatorio especificar el Departamento en data.cliente.departamento para Tipo de Operación != 4',
        );
      } else if (
        constanteService.departments.filter(
          (departamento: any) => departamento.codigo === +data['cliente']['departamento'],
        ).length == 0
      ) {
        this.validator.errors.push(
          "Departamento '" +
            data['cliente']['departamento'] +
            "' del Cliente en data.cliente.departamento no encontrado. Valores: " +
            constanteService.departments.map((a: any) => a.codigo + '-' + a.descripcion),
        );
      }

      //console.log("distrito", data['cliente']['distrito'], "ciudad", data['cliente']['ciudad'], "departamento", data['cliente']['departamento']);
      constanteService.validateLocation(
        'data.cliente',
        +data['cliente']['departamento'],
        +data['cliente']['distrito'],
        +data['cliente']['ciudad'],
        this.validator.errors,
      );
    }

    if (data['cliente']['tipoOperacion'] == 4) {
      if (data['cliente']['pais'] == 'PRY') {
        this.validator.errors.push('El tipo de Operación = 4-B2F requiere un pais diferente a PRY');
      }
    }

    if (data['cliente']['telefono']) {
      if (!(data['cliente']['telefono'].length >= 6 && data['cliente']['telefono'].length <= 15)) {
        this.validator.errors.push(
          "El valor '" +
            data['cliente']['telefono'] +
            "' en data.cliente.telefono debe tener una longitud de 6 a 15 caracteres",
        );
      } else {
        if (
          (data['cliente']['telefono'] + '').includes('(') ||
          (data['cliente']['telefono'] + '').includes(')') ||
          (data['cliente']['telefono'] + '').includes('[') ||
          (data['cliente']['telefono'] + '').includes(']')
        ) {
          /*this.validator.errors.push(
            "El valor '" + data['cliente']['telefono'] + "' en data.cliente.telefono no puede contener () o []",
          );*/
          //Finalmente no da error en la SET por esto
        }
      }
    }

    if (data['cliente']['celular']) {
      if (!(data['cliente']['celular'].length >= 10 && data['cliente']['celular'].length <= 20)) {
        this.validator.errors.push(
          "El valor '" +
            data['cliente']['celular'] +
            "' en data.cliente.celular debe tener una longitud de 10 a 20 caracteres",
        );
      } else {
        if (
          (data['cliente']['celular'] + '').includes('(') ||
          (data['cliente']['celular'] + '').includes(')') ||
          (data['cliente']['celular'] + '').includes('[') ||
          (data['cliente']['celular'] + '').includes(']')
        ) {
          this.validator.errors.push(
            "El valor '" + data['cliente']['celular'] + "' en data.cliente.celular no puede contener () o []",
          );
        }
      }
    }

    if (data['cliente']['email']) {
      let email = new String(data['cliente']['email']); //Hace una copia, para no alterar.

      //Verificar si tiene varios correos.
      if (email.indexOf(',') > -1) {
        //Si el Email tiene , (coma) entonces va enviar solo el primer valor, ya que la SET no acepta Comas
        email = email.split(',')[0].trim();
      }

      //Verificar espacios
      if (email.indexOf(' ') > -1) {
        this.validator.errors.push("El valor '" + email + "' en data.cliente.email no puede poseer espacios");
      }

      if (!(email.length >= 3 && email.length <= 80)) {
        this.validator.errors.push(
          "El valor '" + email + "' en data.cliente.email debe tener una longitud de 3 a 80 caracteres",
        );
      }

      //se valida el mail
      var regExEmail = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm);
      if (!regExEmail.test(email + '')) {
        this.validator.errors.push("El valor '" + email + "' en data.cliente.email es inválido");
      }
    }

    if (data['cliente']['codigo']) {
      if (!((data['cliente']['codigo'] + '').length >= 3 && (data['cliente']['codigo'] + '').length <= 15)) {
        this.validator.errors.push(
          "El código del Cliente '" +
            data['cliente']['codigo'] +
            "' en data.cliente.codigo debe tener de 3 a 15 caracteres",
        );
      }
    }
  }

  private generateDatosEspecificosPorTipoDEValidate(params: EDocumentParams, data: EDocumentData) {
    if (data.tipoDocumento === 1) {
      this.generateDatosEspecificosPorTipoDE_FacturaElectronicaValidate(params, data);
    }
    if (data.tipoDocumento === 4) {
      this.generateDatosEspecificosPorTipoDE_AutofacturaValidate(params, data);
    }

    if (data.tipoDocumento === 5 || data.tipoDocumento === 6) {
      this.generateDatosEspecificosPorTipoDE_NotaCreditoDebitoValidate(params, data);
    }

    if (data.tipoDocumento === 7) {
      this.generateDatosEspecificosPorTipoDE_RemisionElectronicaValidate(params, data);
    }
  }

  private generateDatosEspecificosPorTipoDE_FacturaElectronicaValidate(params: EDocumentParams, data: EDocumentData) {
    if (!data['factura']) {
      this.validator.errors.push('Debe indicar los datos especificos de la Factura en data.factura');
      return; // Termina el metodos
    }

    if (
      constanteService.presenceIndicators.filter((um: any) => um.codigo === +data['factura']['presencia']).length == 0
    ) {
      this.validator.errors.push(
        "Indicador de Presencia '" +
          data['factura']['presencia'] +
          "' en data.factura.presencia no encontrado. Valores: " +
          constanteService.presenceIndicators.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }

    if (data['factura']['fechaEnvio']) {
      let fechaFactura = new Date(data['fecha']);
      let fechaEnvio = new Date(data['factura']['fechaEnvio']);

      if (fechaFactura.getTime() > fechaEnvio.getTime()) {
        this.validator.errors.push(
          "La Fecha de envío '" +
            data['factura']['fechaEnvio'] +
            "'en data.factura.fechaEnvio, debe ser despues de la fecha de Factura",
        );
      }
    }

    if (data['cliente']['tipoOperacion'] === 3) {
      this.generateDatosEspecificosPorTipoDE_ComprasPublicasValidate(params, data);
    }
  }

  /**
   * Datos especificos cuando el tipo de operacion del receptor es B2G (Campo D202)
   * Dentro de la factura electronica
   *
   * @param params
   * @param data
   * @param options
   */
  private generateDatosEspecificosPorTipoDE_ComprasPublicasValidate(params: EDocumentParams, data: EDocumentData) {
    if (!(data['dncp'] && data['dncp']['modalidad'] && (data['dncp']['modalidad'] + '').length == 2)) {
      this.validator.errors.push('Debe informar la modalidad de Contratación DNCP  (2 digitos) en data.dncp.modalidad');
    }
    /*    if (!(data['dncp'] && data['dncp']['entidad'] && data['dncp']['entidad'].length > 0)) {
      this.validator.errors.push('Debe informar la entidad de Contratación DNCP en data.dncp.entidad');
    }*/
    if (
      !(data['dncp'] && data['dncp']['entidad'] && +data['dncp']['entidad'] > 9999 && +data['dncp']['entidad'] < 100000)
    ) {
      this.validator.errors.push('Debe informar la entidad de Contratación DNCP (5 digitos) en data.dncp.entidad');
    }
    /*if (!(data['dncp'] && data['dncp']['año'] && data['dncp']['año'].length > 0)) {
      this.validator.errors.push('Debe informar el año de Contratación DNCP en data.dncp.año');
    }*/
    if (!(data['dncp'] && data['dncp']['año'] && +data['dncp']['año'] > 0 && +data['dncp']['año'] < 100)) {
      this.validator.errors.push('Debe informar el año de Contratación DNCP (2 digitos) en data.dncp.año');
    }
    /*if (!(data['dncp'] && data['dncp']['secuencia'] && data['dncp']['secuencia'].length > 0)) {
      this.validator.errors.push('Debe informar la secuencia de Contratación DNCP en data.dncp.secuencia');
    }*/
    if (
      !(
        data['dncp'] &&
        data['dncp']['secuencia'] &&
        +data['dncp']['secuencia'] > 999999 &&
        +data['dncp']['secuencia'] < 10000000
      )
    ) {
      this.validator.errors.push('Debe informar la secuencia de Contratación DNCP (7 digitos) en data.dncp.secuencia');
    }

    if (!(data['dncp'] && data['dncp']['fecha'] && (data['dncp']['fecha'] + '').length > 0)) {
      this.validator.errors.push('Debe informar la fecha de emisión de código de Contratación DNCP en data.dncp.fecha');
    } else {
      if (!fechaUtilService.isIsoDate(data['dncp']['fecha'])) {
        this.validator.errors.push(
          "Fecha DNCP '" + data['dncp']['fecha'] + "' en data.dncp.fecha no válida. Formato: yyyy-MM-dd",
        );
      }
    }
  }

  private generateDatosEspecificosPorTipoDE_AutofacturaValidate(params: EDocumentParams, data: EDocumentData) {
    if (!data['autoFactura']) {
      this.validator.errors.push('Para tipoDocumento = 4 debe proveer los datos de Autofactura en data.autoFactura');
    }
    if (!data['autoFactura']['ubicacion']) {
      this.validator.errors.push(
        'Para tipoDocumento = 4 debe proveer los datos del Lugar de Transacción de la Autofactura en data.autoFactura.ubicacion',
      );
    }

    if (!data['autoFactura']['tipoVendedor']) {
      this.validator.errors.push('Debe especificar la Naturaleza del Vendedor en data.autoFactura.tipoVendedor');
    }

    if (!data['autoFactura']['documentoTipo']) {
      this.validator.errors.push(
        'Debe especificar el Tipo de Documento del Vendedor en data.autoFactura.documentoTipo',
      );
    }

    if (
      constanteService.sellerNatureSelfInvoicingCase.filter(
        (um: any) => um.codigo === data['autoFactura']['tipoVendedor'],
      ).length == 0
    ) {
      this.validator.errors.push(
        "Tipo de Vendedor '" +
          data['autoFactura']['tipoVendedor'] +
          "' en data.autoFactura.tipoVendedor no encontrado. Valores: " +
          constanteService.sellerNatureSelfInvoicingCase.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }

    if (
      constanteService.userIdentityDocuments.filter((um: any) => um.codigo === data['autoFactura']['documentoTipo'])
        .length == 0
    ) {
      this.validator.errors.push(
        "Tipo de Documento '" +
          data['autoFactura']['documentoTipo'] +
          "' en data.autoFactura.documentoTipo no encontrado. Valores: " +
          constanteService.userIdentityDocuments.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }

    if (!data['autoFactura']['ubicacion']) {
      this.validator.errors.push('Debe especificar la ubicación de la transacción en data.autoFactura.ubicacion');
    }

    if (!data['autoFactura']['documentoNumero']) {
      this.validator.errors.push(
        'Debe especificar el Nro. de Documento del Vendedor en data.autoFactura.documentoNumero',
      );
    }
    if (!data['autoFactura']['nombre']) {
      this.validator.errors.push('Debe especificar el Nombre del Vendedor en data.autoFactura.nombre');
    }
    if (!data['autoFactura']['direccion']) {
      this.validator.errors.push('Debe especificar la Dirección del Vendedor en data.autoFactura.direccion');
    }
    if (!data['autoFactura']['numeroCasa']) {
      this.validator.errors.push('Debe especificar el Número de Casa del Vendedor en data.autoFactura.numeroCasa');
    }

    let errorDepDisCiu = false;
    let errorDepDisCiuUbi = false;

    if (!data['autoFactura']['ciudad']) {
      this.validator.errors.push('Debe especificar la Ciudad del Vendedor en data.autoFactura.ciudad');
      errorDepDisCiu = true;
    } else {
      if (
        constanteService.cities.filter((ciudad: any) => ciudad.codigo === +data['autoFactura']['ciudad']).length == 0
      ) {
        this.validator.errors.push(
          "Ciudad '" +
            data['autoFactura']['ciudad'] +
            "' del Cliente en data.autoFactura.ciudad no encontrado. Valores: " +
            constanteService.cities.map((a: any) => a.codigo + '-' + a.descripcion),
        );
        errorDepDisCiu = true;
      }

      //De acuerdo a la Ciudad pasada como parametro, buscar el distrito y departamento y asignar dichos
      //valores de forma predeterminada, aunque este valor sera sobre-escrito caso el usuario envie
      //data['autoFactura']['ciudad']['distrito'] y data['autoFactura']['ciudad']['departamento']
      let objCiudad: any = constanteService.cities.filter((ciu) => ciu._id === +data['autoFactura']['ciudad']);

      if (objCiudad && objCiudad[0]) {
        let objDistrito: any = constanteService.districts.filter((dis) => dis._id === +objCiudad[0]['distrito']);

        let objDepartamento: any = constanteService.departments.filter(
          (dep) => dep._id === +objDistrito[0]['departamento'],
        );

        //Solo actualiza si no tiene valor
        if (!data['autoFactura']['distrito']) data['autoFactura']['distrito'] = objDistrito[0]['codigo'];

        if (!data['autoFactura']['departamento']) data['autoFactura']['departamento'] = objDepartamento[0]['codigo'];
      }

      if (errorDepDisCiu) {
        if (!data['autoFactura']['departamento']) {
          this.validator.errors.push('Debe especificar el Departamento del Vendedor en data.autoFactura.departamento');
          errorDepDisCiu = true;
        }
        if (!data['autoFactura']['distrito']) {
          this.validator.errors.push('Debe especificar el Distrito Vendedor en data.autoFactura.distrito');
          errorDepDisCiu = true;
        }
      }
    }

    if (!data['autoFactura']['ubicacion']['ciudad']) {
      this.validator.errors.push(
        'Debe especificar la Ciudad del Lugar de la Transacción en data.autoFactura.ubicacion.ciudad',
      );
      errorDepDisCiuUbi = true;
    } else {
      if (
        constanteService.cities.filter((ciudad: any) => ciudad.codigo === +data['autoFactura']['ubicacion']['ciudad'])
          .length == 0
      ) {
        this.validator.errors.push(
          "Ciudad '" +
            data['autoFactura']['ubicacion']['ciudad'] +
            "' del Cliente en data.autoFactura.ubicacion.ciudad no encontrado. Valores: " +
            constanteService.cities.map((a: any) => a.codigo + '-' + a.descripcion),
        );
        errorDepDisCiuUbi = true;
      }

      //De acuerdo a la Ciudad pasada como parametro, buscar el distrito y departamento y asignar dichos
      //valores de forma predeterminada, aunque este valor sera sobre-escrito caso el usuario envie
      //data['autoFactura']['ubicacion']['ciudad']['distrito'] y data['autoFactura']['ubicacion']['ciudad']['departamento']
      let objCiudad: any = constanteService.cities.filter(
        (ciu) => ciu._id === +data['autoFactura']['ubicacion']['ciudad'],
      );

      if (objCiudad && objCiudad[0]) {
        let objDistrito: any = constanteService.districts.filter((dis) => dis._id === +objCiudad[0]['distrito']);

        let objDepartamento: any = constanteService.departments.filter(
          (dep) => dep._id === +objDistrito[0]['departamento'],
        );

        //Solo actualiza si no tiene valor
        if (!data['autoFactura']['ubicacion']['distrito'])
          data['autoFactura']['ubicacion']['distrito'] = objDistrito[0]['codigo'];

        if (!data['autoFactura']['ubicacion']['departamento'])
          data['autoFactura']['ubicacion']['departamento'] = objDepartamento[0]['codigo'];
      }

      if (errorDepDisCiuUbi) {
        if (!data['autoFactura']['ubicacion']['departamento']) {
          this.validator.errors.push(
            'Debe especificar el Departamento del Lugar de la Transacción en data.autoFactura.ubicacion.departamento',
          );
          errorDepDisCiuUbi = true;
        }
        if (!data['autoFactura']['ubicacion']['distrito']) {
          this.validator.errors.push(
            'Debe especificar el Distrito del Lugar de la Transacciónen data.autoFactura.ubicacion.distrito',
          );
          errorDepDisCiuUbi = true;
        }
      }
    }

    if (errorDepDisCiu) {
      constanteService.validateLocation(
        'data.autoFactura',
        +data['autoFactura']['departamento'],
        +data['autoFactura']['distrito'],
        +data['autoFactura']['ciudad'],
        this.validator.errors,
      );
    }

    if (errorDepDisCiuUbi) {
      constanteService.validateLocation(
        'data.autoFactura.ubicacion',
        +data['autoFactura']['ubicacion']['departamento'],
        +data['autoFactura']['ubicacion']['distrito'],
        +data['autoFactura']['ubicacion']['ciudad'],
        this.validator.errors,
      );
    }
  }

  private generateDatosEspecificosPorTipoDE_NotaCreditoDebitoValidate(params: EDocumentParams, data: EDocumentData) {
    if (!(data['notaCreditoDebito']['motivo'] && data['notaCreditoDebito']['motivo'])) {
      this.validator.errors.push(
        'Debe completar el motivo para la nota de crédito/débito en data.notaCreditoDebito.motivo',
      );
    } else {
      if (
        constanteService.creditNoteReasons.filter((um: any) => um.codigo === +data['notaCreditoDebito']['motivo'])
          .length == 0
      ) {
        this.validator.errors.push(
          "Motivo de la Nota de Crédito/Débito '" +
            data['notaCreditoDebito']['motivo'] +
            "' en data.notaCreditoDebito.motivo no encontrado. Valores: " +
            constanteService.creditNoteReasons.map((a: any) => a.codigo + '-' + a.descripcion),
        );
      }
    }
  }

  private generateDatosEspecificosPorTipoDE_RemisionElectronicaValidate(params: EDocumentParams, data: EDocumentData) {
    if (!(data['remision'] && data['remision']['motivo'])) {
      this.validator.errors.push('No fue pasado el Motivo de la Remisión en data.remision.motivo.');
    } else {
      if (+data['remision']['motivo'] == 99) {
        if (!(data['remision'] && data['remision']['motivoDescripcion'])) {
          this.validator.errors.push(
            'Debe especificar la Descripción el Motivo de la Remisión en data.remision.motivoDescripcion para el motivo=99.',
          );
        }
      }
    }

    if (!(data['remision'] && data['remision']['tipoResponsable'])) {
      this.validator.errors.push(
        'No fue pasado el Tipo de Responsable de la Remisión en data.remision.tipoResponsable.',
      );
    }

    if (constanteService.remissionReasons.filter((um: any) => um.codigo === +data['remision']['motivo']).length == 0) {
      this.validator.errors.push(
        "Motivo de la Remisión '" +
          data['remision']['motivo'] +
          "' en data.remision.motivo no encontrado. Valores: " +
          constanteService.remissionReasons.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }

    if (!data['remision']['kms']) {
      //analizar por que se puso
      this.validator.errors.push('Debe especificar Kilometros estimado recorrido en data.remision.kms');
    }

    if (data['remision'] && data['remision']['motivo'] == 7) {
      //Motivo=7-Translado entre locales
      if (data['cliente']['ruc'] != params.ruc) {
        this.validator.errors.push('RUC del receptor debe coincidir con el RUC del emisor');
      }
    }

    if (
      constanteService.referralResponsible.filter((um: any) => um.codigo === data['remision']['tipoResponsable'])
        .length == 0
    ) {
      this.validator.errors.push(
        "Tipo de Responsable '" +
          data['remision']['tipoResponsable'] +
          "' en data.remision.tipoResponsable no encontrado. Valores: " +
          constanteService.referralResponsible.map((a: any) => a.codigo + '-' + a.descripcion),
      );
    }
  }

  private generateDatosAutofacturaValidate(params: EDocumentParams, data: EDocumentData) {
    if (!data['autoFactura']) {
      this.validator.errors.push(
        'Debe especificar los datos de Autofactura en data.autoFactura para el Tipo de Documento = 4',
      );
      return;
    }

    if (!data['autoFactura']['documentoNumero']) {
      this.validator.errors.push(
        'Debe especificar el Documento del Vendedor para la AutoFactura en data.autoFactura.documentoNumero',
      );
    } else {
      if (
        !(
          (data['autoFactura']['documentoNumero'] + '').length >= 1 &&
          (data['autoFactura']['documentoNumero'] + '').length <= 20
        )
      ) {
        this.validator.errors.push(
          'El Numero de Documento del Vendedor en data.autoFactura.numeroDocuemnto debe contener entre 1 y 20 caracteres ',
        );
      }

      if (
        new RegExp(/[a-zA-Z]/g).test(data['autoFactura']['documentoNumero']) ||
        new RegExp(/\./g).test(data['autoFactura']['documentoNumero'])
      ) {
        this.validator.errors.push(
          'El Numero de Documento del Vendedor "' +
            data['autoFactura']['documentoNumero'] +
            '" en data.autoFactura.numeroDocuemnto no puede contener Letras ni puntos',
        );
      }
    }

    if (!data.documentoAsociado) {
      this.validator.errors.push(
        'Debe indicar el Documento Asociado en data.documentoAsociado para el Tipo de Documento = 4',
      );
    } else {
      if (Array.isArray(data.documentoAsociado)) {
        this.validateAsociadoConstancia(params, data.documentoAsociado[0], true);
      } else {
        this.validateAsociadoConstancia(params, data.documentoAsociado, false);
      }

      if (data['cliente']['contribuyente'] == false) {
        this.validator.errors.push(
          'El Cliente de una Autofactura debe ser Contribuyente en data.cliente.contribuyente',
        );
      }
    }
  }

  private validateAsociadoConstancia(params: EDocumentParams, documentoAsociado: any, isArray: boolean) {
    if (!(documentoAsociado['constanciaControl'] && documentoAsociado['constanciaControl'].length > 0)) {
      this.validator.errors.push(
        'Debe indicar el Número de Control de la Constancia en data.documentoAsociado.constanciaControl. ' +
          (isArray ? 'En la posicion 0' : ''),
      );
    } else {
      if ((documentoAsociado['constanciaControl'] + '').length != 8) {
        this.validator.errors.push(
          'El Numero de Control de la Constancia "' +
            documentoAsociado['constanciaControl'] +
            '" en data.documentoAsociado.constanciaControl debe contener 8 caracteres. ' +
            (isArray ? 'En la posicion 0' : ''),
        );
      }
    }

    if (!(documentoAsociado['constanciaNumero'] && (documentoAsociado['constanciaNumero'] + '').length > 0)) {
      this.validator.errors.push(
        'Debe indicar el Numero de la Constancia en data.documentoAsociado.constanciaNumero. ' +
          (isArray ? 'En la posicion 0' : ''),
      );
    } else {
      if (isNaN(documentoAsociado['constanciaNumero'])) {
        this.validator.errors.push(
          'El Numero de la Constancia "' +
            documentoAsociado['constanciaNumero'] +
            '" en data.documentoAsociado.constanciaNumero debe ser numérico. ' +
            (isArray ? 'En la posicion 0' : ''),
        );
      }
      if ((documentoAsociado['constanciaNumero'] + '').length != 11) {
        this.validator.errors.push(
          'El Numero de la Constancia "' +
            documentoAsociado['constanciaNumero'] +
            '" en data.documentoAsociado.constanciaNumero debe contener 11 caracteres. ' +
            (isArray ? 'En la posicion 0' : ''),
        );
      }
    }
  }
  private generateDatosCondicionOperacionDEValidate(params: EDocumentParams, data: EDocumentData) {
    const items = data['items'];
    let sumaSubtotales = 0;

    if (true) {
      if (!data['condicion']) {
        this.validator.errors.push('Debe indicar los datos de la Condición de la Operación en data.condicion');
        return; // sale metodo
      } else {
        if (
          constanteService.operatingConditions.filter((um: any) => um.codigo === data['condicion']['tipo']).length == 0
        ) {
          this.validator.errors.push(
            "Condición de la Operación '" +
              data['condicion']['tipo'] +
              "' en data.condicion.tipo no encontrado. Valores: " +
              constanteService.operatingConditions.map((a: any) => a.codigo + '-' + a.descripcion),
          );
        }

        this.generateDatosCondicionOperacionDE_ContadoValidate(params, data);

        if (data['condicion']['tipo'] === 2) {
          this.generateDatosCondicionOperacionDE_CreditoValidate(params, data);
        }
      }
    }
  }

  /**
   * E7.1. Campos que describen la forma de pago de la operación al contado o del monto
   * de la entrega inicial (E605-E619)
   * @param params
   * @param data
   * @param options
   */
  private generateDatosCondicionOperacionDE_ContadoValidate(params: EDocumentParams, data: EDocumentData) {
    if (data['condicion']['tipo'] === 1) {
      if (!(data['condicion']['entregas'] && data['condicion']['entregas'].length > 0)) {
        this.validator.errors.push(
          'El Tipo de Condición es 1 en data.condicion.tipo pero no se encontraron entregas en data.condicion.entregas',
        );
      }
    }

    if (data['condicion']['entregas'] && data['condicion']['entregas'].length > 0) {
      for (let i = 0; i < data['condicion']['entregas'].length; i++) {
        const dataEntrega = data['condicion']['entregas'][i];

        if (constanteService.paymentTypes.filter((um: any) => um.codigo === dataEntrega['tipo']).length == 0) {
          this.validator.errors.push(
            "Condición de Tipo de Pago '" +
              dataEntrega['tipo'] +
              "' en data.condicion.entregas[" +
              i +
              '].tipo no encontrado. Valores: ' +
              constanteService.paymentTypes.map((a: any) => a.codigo + '-' + a.descripcion),
          );
        }

        if (dataEntrega['tipo'] == 99 && !dataEntrega['tipoDescripcion']) {
          this.validator.errors.push(
            'Es obligatorio especificar la Descripción en data.condicion.entregas[' +
              i +
              '].tipoDescripcion para el tipo=99',
          );
        } else if (dataEntrega['tipo'] == 99) {
          if (
            !((dataEntrega['tipoDescripcion'] + '').length >= 4 && (dataEntrega['tipoDescripcion'] + '').length <= 30)
          ) {
            this.validator.errors.push(
              'La Descripción del Tipo de Entrega en data.condicion.entregas[' +
                i +
                '].tipoDescripcion debe tener de 4 a 30 caracteres, para el tipo=99',
            );
          }
        }

        if (!dataEntrega['moneda']) {
          this.validator.errors.push('Moneda es obligatorio en data.condicion.entregas[' + i + '].moneda');
        }

        if (constanteService.currencies.filter((um) => um._id === dataEntrega['moneda']).length == 0) {
          this.validator.errors.push("Moneda '" + dataEntrega['moneda']) +
            "' data.condicion.entregas[" +
            i +
            '].moneda no válido. Valores: ' +
            constanteService.currencies.map((a) => a._id + '-' + a.description);
        }

        //Verificar si el Pago es con Tarjeta de crédito
        if (dataEntrega['tipo'] === 3 || dataEntrega['tipo'] === 4) {
          if (!dataEntrega['infoTarjeta']) {
            this.validator.errors.push(
              'Debe informar los datos de la tarjeta en data.condicion.entregas[' +
                i +
                '].infoTarjeta si la forma de Pago es a Tarjeta',
            );
          } else {
            if (!dataEntrega['infoTarjeta']['tipo']) {
              this.validator.errors.push(
                'Debe especificar el tipo de tarjeta en data.condicion.entregas[' +
                  i +
                  '].infoTarjeta.tipo si la forma de Pago es a Tarjeta',
              );
            } else {
              if (
                constanteService.creditCards.filter((um: any) => um.codigo === dataEntrega['infoTarjeta']['tipo'])
                  .length == 0
              ) {
                this.validator.errors.push(
                  "Tipo de Tarjeta '" +
                    dataEntrega['infoTarjeta']['tipo'] +
                    "' en data.condicion.entregas[" +
                    i +
                    '].infoTarjeta.tipo no encontrado. Valores: ' +
                    constanteService.creditCards.map((a: any) => a.codigo + '-' + a.descripcion),
                );
              }

              if (dataEntrega['infoTarjeta']['tipoDescripcion']) {
                if (
                  !(
                    (dataEntrega['infoTarjeta']['tipoDescripcion'] + '').length >= 4 &&
                    (dataEntrega['infoTarjeta']['tipoDescripcion'] + '').length <= 20
                  )
                ) {
                  this.validator.errors.push(
                    'La descripción del Tipo de Tarjeta en data.condicion.entregas[' +
                      i +
                      '].infoTarjeta.tipoDescripcion debe tener de 4 a 20 caracteres',
                  );
                }
              }
            }

            if (dataEntrega['infoTarjeta']['ruc']) {
              if (dataEntrega['infoTarjeta']['ruc'].indexOf('-') == -1) {
                this.validator.errors.push(
                  'RUC de Proveedor de Tarjeta debe contener digito verificador en data.condicion.entregas[' +
                    i +
                    '].infoTarjeta.ruc',
                );
              }

              var regExpOnlyNumber = new RegExp(/^\d+$/);
              const rucCliente = dataEntrega['infoTarjeta']['ruc'].split('-');

              //Un RUC puede ser alphanumerico
              /*if (!regExpOnlyNumber.test((rucCliente[0] + '').trim())) {
                this.validator.errors.push(
                  "La parte del RUC del Cliente '" +
                    dataEntrega['infoTarjeta']['ruc'] +
                    "' en data.condicion.entregas[" +
                    i +
                    '].infoTarjeta.ruc debe ser numérico',
                );
              }*/
              if (!regExpOnlyNumber.test((rucCliente[1] + '').trim())) {
                this.validator.errors.push(
                  "La parte del DV del RUC del Cliente '" +
                    dataEntrega['infoTarjeta']['ruc'] +
                    "' en data.condicion.entregas[" +
                    i +
                    '].infoTarjeta.ruc debe ser numérico',
                );
              }

              if (!(rucCliente[0].length >= 3 && rucCliente[0].length <= 8)) {
                this.validator.errors.push(
                  "La parte del RUC '" +
                    dataEntrega['infoTarjeta']['ruc'] +
                    "' en data.condicion.entregas[" +
                    i +
                    '].infoTarjeta.ruc debe contener de 1 a 8 caracteres',
                );
              }

              if (rucCliente[1] > 9) {
                this.validator.errors.push(
                  "La parte del DV del RUC '" +
                    dataEntrega['infoTarjeta']['ruc'] +
                    "' en data.condicion.entregas[" +
                    i +
                    '].infoTarjeta.ruc debe ser del 1 al 9',
                );
              }
            }

            if (dataEntrega['infoTarjeta']['codigoAutorizacion']) {
              if (
                !(
                  (dataEntrega['infoTarjeta']['codigoAutorizacion'] + '').length >= 6 &&
                  (dataEntrega['infoTarjeta']['codigoAutorizacion'] + '').length <= 10
                )
              ) {
                this.validator.errors.push(
                  'El código de Autorización en data.condicion.entregas[' +
                    i +
                    '].infoTarjeta.codigoAutorizacion debe tener de 6 y 10 caracteres',
                );
              }
            }

            if (dataEntrega['infoTarjeta']['titular']) {
              if (
                !(
                  (dataEntrega['infoTarjeta']['titular'] + '').length >= 4 &&
                  (dataEntrega['infoTarjeta']['titular'] + '').length <= 30
                )
              ) {
                this.validator.errors.push(
                  'El Titular de la Tarjeta en data.condicion.entregas[' +
                    i +
                    '].infoTarjeta.titular debe tener de 4 y 30 caracteres',
                );
              }
              //Validar que titular no tenga .
              if (dataEntrega['infoTarjeta']['titular'].indexOf('.') > -1) {
                this.validator.errors.push(
                  'El valor "' +
                    dataEntrega['infoTarjeta']['titular'] +
                    '" en data.condicion.entregas[' +
                    i +
                    '].infoTarjeta.titular no es válido ',
                );
              }
              //Validar que titular no tenga /
              if (dataEntrega['infoTarjeta']['titular'].indexOf('/') > -1) {
                this.validator.errors.push(
                  'El valor "' +
                    dataEntrega['infoTarjeta']['titular'] +
                    '" en data.condicion.entregas[' +
                    i +
                    '].infoTarjeta.titular no es válido ',
                );
              }
            }

            if (dataEntrega['infoTarjeta']['numero']) {
              if (!((dataEntrega['infoTarjeta']['numero'] + '').length == 4)) {
                this.validator.errors.push(
                  'El código de Autorización en data.condicion.entregas[' +
                    i +
                    '].infoTarjeta.numero debe tener de 4 caracteres',
                );
              }
            }
          }
        }

        //Verificar si el Pago es con Cheque
        if (dataEntrega['tipo'] === 2) {
          if (!dataEntrega['infoCheque']) {
            this.validator.errors.push(
              'Debe informar sobre el cheque en data.condicion.entregas[' +
                i +
                '].infoCheque si la forma de Pago es 2-Cheques',
            );
          }
        }

        if (dataEntrega['moneda'] !== 'PYG') {
          if (!dataEntrega['cambio']) {
            this.validator.errors.push(
              'Debe informar la cotizacion del monto de la Entrega en data.condicion.entregas[' +
                i +
                '].cambio si la forma de Pago es diferente a PYG',
            );
          }
        }
      }
    }
  }

  /**
   * E7.2. Campos que describen la operación a crédito (E640-E649)
   *
   * @param params
   * @param data
   * @param options
   */
  private generateDatosCondicionOperacionDE_CreditoValidate(params: EDocumentParams, data: EDocumentData) {
    if (!data['condicion']['credito']) {
      this.validator.errors.push(
        'Fue especificado Condicion Tipo 2 (Crédito) pero el detalle de Crédito en data.condicion.credito es nulo',
      );
    } else {
      if (!data['condicion']['credito']['tipo']) {
        this.validator.errors.push(
          'El tipo de Crédito en data.condicion.credito.tipo es obligatorio si la condición posee créditos',
        );
      } else {
        if (
          constanteService.creditTypes.filter((um: any) => um.codigo === data['condicion']['credito']['tipo']).length ==
          0
        ) {
          this.validator.errors.push(
            "Tipo de Crédito '" +
              data['condicion']['credito']['tipo'] +
              "' en data.condicion.credito.tipo no encontrado. Valores: " +
              constanteService.creditTypes.map((a: any) => a.codigo + '-' + a.descripcion),
          );
        }
      }

      if (+data['condicion']['credito']['tipo'] === 1) {
        //Plazo
        if (!data['condicion']['credito']['plazo']) {
          this.validator.errors.push(
            'El tipo de Crédito en data.condicion.credito.tipo es 1 entonces data.condicion.credito.plazo es obligatorio',
          );
        } else {
          if (
            !(
              (data['condicion']['credito']['plazo'] + '').length >= 2 &&
              (data['condicion']['credito']['plazo'] + '').length <= 15
            )
          ) {
            this.validator.errors.push(
              'El Plazo de Crédito en data.condicion.credito.plazo debe contener entre 2 y 15 caracteres ',
            );
          }
        }
      }

      if (+data['condicion']['credito']['tipo'] === 2) {
        //Cuota
        if (!data['condicion']['credito']['cuotas']) {
          this.validator.errors.push(
            'El tipo de Crédito en data.condicion.credito.tipo es 2 entonces data.condicion.credito.cuotas es obligatorio',
          );
        } else {
        }

        //Si es Cuotas
        //Recorrer array de infoCuotas e informar en el JSON

        if (data['condicion']['credito']['infoCuotas'] && data['condicion']['credito']['infoCuotas'].length > 0) {
          for (let i = 0; i < data['condicion']['credito']['infoCuotas'].length; i++) {
            const infoCuota = data['condicion']['credito']['infoCuotas'][i];

            if (constanteService.currencies.filter((um: any) => um.codigo === infoCuota['moneda']).length == 0) {
              this.validator.errors.push(
                "Moneda '" +
                  infoCuota['moneda'] +
                  "' en data.condicion.credito.infoCuotas[" +
                  i +
                  '].moneda no encontrado. Valores: ' +
                  constanteService.currencies.map((a: any) => a.codigo + '-' + a.descripcion),
              );
            }

            if (!infoCuota['vencimiento']) {
              //No es obligatorio
              //this.validator.errors.push('Obligatorio informar data.transporte.inicioEstimadoTranslado. Formato yyyy-MM-dd');
            } else {
              if (!fechaUtilService.isIsoDate(infoCuota['vencimiento'])) {
                this.validator.errors.push(
                  "Vencimiento de la Cuota '" +
                    infoCuota['vencimiento'] +
                    "' en data.condicion.credito.infoCuotas[" +
                    i +
                    '].vencimiento no válido. Formato: yyyy-MM-dd',
                );
              }
            }
          }
        } else {
          this.validator.errors.push('Debe proporcionar data.condicion.credito.infoCuotas[]');
        }
      }
    }
  }

  public generateDatosComplementariosComercialesDeUsoEspecificosValidate(params: EDocumentParams, data: EDocumentData) {
    if (data['sectorEnergiaElectrica']) {
      this.generateDatosSectorEnergiaElectricaValidate(params, data);
    }

    if (data['sectorSeguros']) {
      this.generateDatosSectorSegurosValidate(params, data);
    }

    if (data['sectorSupermercados']) {
      this.generateDatosSectorSupermercadosValidate(params, data);
    }

    if (data['sectorAdicional']) {
      this.generateDatosDatosAdicionalesUsoComercialValidate(params, data);
    }
  }

  /**
   * E9.2. Sector Energía Eléctrica (E791-E799)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosSectorEnergiaElectricaValidate(params: EDocumentParams, data: EDocumentData) {
    /*const jsonResult: any = {
      dNroMed: data['sectorEnergiaElectrica']['numeroMedidor'],
      dActiv: data['sectorEnergiaElectrica']['codigoActividad'],
      dCateg: data['sectorEnergiaElectrica']['codigoCategoria'],
      dLecAnt: data['sectorEnergiaElectrica']['lecturaAnterior'],
      dLecAct: data['sectorEnergiaElectrica']['lecturaActual'],
      dConKwh: data['sectorEnergiaElectrica']['lecturaActual'] - data['sectorEnergiaElectrica']['lecturaAnterior'],
    };*/

    if (data['sectorEnergiaElectrica']['lecturaAnterior'] > data['sectorEnergiaElectrica']['lecturaActual']) {
      this.validator.errors.push('Sector Energia Electrica lecturaActual debe ser mayor a lecturaAnterior');
    }
  }

  /**
   * E9.3. Sector de Seguros (E800-E809)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosSectorSegurosValidate(params: EDocumentParams, data: EDocumentData) {
    /*const jsonResult: any = {
      dCodEmpSeg: data['sectorSeguros']['codigoAseguradora'],
      gGrupPolSeg: {
        dPoliza: data['sectorSeguros']['codigoPoliza'],
        dUnidVig: data['sectorSeguros']['vigenciaUnidad'], //horas, dias, año
        dVigencia: data['sectorSeguros']['vigencia'],
        dNumPoliza: data['sectorSeguros']['numeroPoliza'],
        dFecIniVig: data['sectorSeguros']['inicioVigencia'],
        dFecFinVig: data['sectorSeguros']['finVigencia'],
        dCodInt: data['sectorSeguros']['codigoInternoItem'],
      },
    };*/
  }

  /**
   * E9.4. Sector de Supermercados (E810-E819
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosSectorSupermercadosValidate(params: EDocumentParams, data: EDocumentData) {
    /*const jsonResult: any = {
      dNomCaj: data['sectorSupermercados']['nombreCajero'],
      dEfectivo: data['sectorSupermercados']['efectivo'],
      dVuelto: data['sectorSupermercados']['vuelto'],
      dDonac: data['sectorSupermercados']['donacion'],
      dDesDonac: data['sectorSupermercados']['donacionDescripcion'].substring(0, 20),
    };*/
  }

  /**
   * E9.5. Grupo de datos adicionales de uso comercial (E820-E829)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosDatosAdicionalesUsoComercialValidate(params: EDocumentParams, data: EDocumentData) {
    /*const jsonResult: any = {
      dCiclo: data['sectorAdicional']['ciclo'].substring(0, 15),
      dFecIniC: data['sectorAdicional']['inicioCiclo'],
      dFecFinC: data['sectorAdicional']['finCiclo'],
      dVencPag: data['sectorAdicional']['vencimientoPago'],
      dContrato: data['sectorAdicional']['numeroContrato'],
      dSalAnt: data['sectorAdicional']['saldoAnterior'],
    };*/

    if (data['sectorAdicional']['ciclo']) {
      if (
        !((data['sectorAdicional']['ciclo'] + '').length >= 1 && (data['sectorAdicional']['ciclo'] + '').length <= 15)
      ) {
        this.validator.errors.push('El Ciclo en data.sectorAdicional.ciclo debe contener entre 1 y 15 caracteres ');
      }
    }

    if (data['sectorAdicional']['inicioCiclo']) {
      if (!((data['sectorAdicional']['inicioCiclo'] + '').length == 10)) {
        this.validator.errors.push(
          'El Inicio de Ciclo en data.sectorAdicional.inicioCiclo debe contener 10 caracteres ',
        );
      }
    }

    if (data['sectorAdicional']['finCiclo']) {
      if (!((data['sectorAdicional']['finCiclo'] + '').length == 10)) {
        this.validator.errors.push('El Fin de Ciclo en data.sectorAdicional.finCiclo debe contener 10 caracteres ');
      }
    }

    if (data['sectorAdicional']['vencimientoPago']) {
      if (!((data['sectorAdicional']['vencimientoPago'] + '').length == 10)) {
        this.validator.errors.push(
          'La fecha de Pago en data.sectorAdicional.vencimientoPago debe contener 10 caracteres ',
        );
      }

      let fecha = new Date(data.fecha);
      let fechaPago = new Date(data['sectorAdicional']['vencimientoPago']);
      if (fecha.getTime() > fechaPago.getTime()) {
        this.validator.errors.push(
          "La fecha de pago '" +
            data['sectorAdicional']['vencimientoPago'] +
            "' en data.sectorAdicional.vencimientoPago debe ser despues de la Fecha del Documento",
        );
      }
    }

    if (data['sectorAdicional']['numeroContrato']) {
      if (
        !(
          (data['sectorAdicional']['numeroContrato'] + '').length >= 1 &&
          (data['sectorAdicional']['numeroContrato'] + '').length <= 30
        )
      ) {
        this.validator.errors.push(
          'El numero de Contrato en data.sectorAdicional.numeroContrato debe contener entre 1 y 30 caracteres ',
        );
      }
    }

    if (data['sectorAdicional']['saldoAnterior']) {
      /*if ( ! ( (data['sectorAdicional']['saldoAnterior']+"").length >= 1 && (data['sectorAdicional']['saldoAnterior']+"").length <= 30 ) ) {
        this.validator.errors.push("El numero de Contrato en data.sectorAdicional.saldoAnterior debe contener entre 1 y 30 caracteres ");        
      }*/
    }
  }

  /**
   * E10. Campos que describen el transporte de las mercaderías (E900-E999)
   *
   * Aqui puede entrar si tipoDocumento = 1 (opcional) o tipoDocumento = 7 (obligatorio)
   * @param params
   * @param data
   * @param options
   */
  public generateDatosTransporteValidate(params: EDocumentParams, data: EDocumentData) {
    if (data.tipoDocumento == 7) {
      if (!(data.detalleTransporte && data.detalleTransporte['tipo'] && data.detalleTransporte['tipo'] > 0)) {
        this.validator.errors.push('Obligatorio informar transporte.tipo');
      }
    }
    if (data.detalleTransporte && data.detalleTransporte['condicionNegociacion']) {
      if (constanteService.tradingConditions.indexOf(data.detalleTransporte['condicionNegociacion']) < -1) {
        this.validator.errors.push(
          'detalleTransporte.condicionNegociación (' + data.detalleTransporte['condicionNegociacion'] + ') no válido',
        );
      }
    }
    if (data.tipoDocumento == 7) {
      if (!data.detalleTransporte['inicioEstimadoTranslado']) {
        this.validator.errors.push('Obligatorio informar data.transporte.inicioEstimadoTranslado. Formato yyyy-MM-dd');
      } else {
        if (!fechaUtilService.isIsoDate(data.detalleTransporte['inicioEstimadoTranslado'])) {
          this.validator.errors.push(
            "Valor de la Fecha '" +
              data.detalleTransporte['inicioEstimadoTranslado'] +
              "' en data.transporte.inicioEstimadoTranslado no válido. Formato: yyyy-MM-dd",
          );
        }
      }
    }
    if (data.tipoDocumento == 7) {
      if (!data.detalleTransporte['finEstimadoTranslado']) {
        this.validator.errors.push('Obligatorio informar data.transporte.finEstimadoTranslado. Formato yyyy-MM-dd');
      } else {
        if (!fechaUtilService.isIsoDate(data.detalleTransporte['finEstimadoTranslado'])) {
          this.validator.errors.push(
            "Valor de la Fecha '" +
              data.detalleTransporte['finEstimadoTranslado'] +
              "' en data.transporte.finEstimadoTranslado no válido. Formato: yyyy-MM-dd",
          );
        }
      }
    }

    if (data.tipoDocumento == 7) {
      if (data.detalleTransporte['inicioEstimadoTranslado'] && data.detalleTransporte['finEstimadoTranslado']) {
        let fechaInicio = new Date(data.detalleTransporte['inicioEstimadoTranslado']);
        let fechaFin = new Date(data.detalleTransporte['finEstimadoTranslado']);

        let fechaHoy = new Date(new Date().toISOString().slice(0, -14));
        fechaHoy.setHours(0);
        fechaHoy.setMinutes(0);
        fechaHoy.setSeconds(0);
        fechaHoy.setMilliseconds(0);
      }
    }

    if (constanteService.transportTypes.filter((um) => um._id === data.detalleTransporte['tipo']).length == 0) {
      this.validator.errors.push(
        "Tipo de Transporte '" +
          data.detalleTransporte['tipo'] +
          "' en data.transporte.tipo no encontrado. Valores: " +
          constanteService.transportTypes.map((a) => a._id + '-' + a.description),
      );
    }
    if (
      constanteService.transportModalities.filter((um) => um._id === data.detalleTransporte['modalidad']).length == 0
    ) {
      this.validator.errors.push(
        "Modalidad de Transporte '" +
          data.detalleTransporte['modalidad'] +
          "' en data.transporte.modalidad no encontrado. Valores: " +
          constanteService.transportModalities.map((a) => a._id + '-' + a.description),
      );
    }

    /*if (
      constanteService.condicionesNegociaciones.filter(
        (um) => um.codigo === data.detalleTransporte['condicionNegociacion'],
      ).length == 0
    ) {
      this.validator.errors.push(
        "Condición de Negociación '" +
          data.detalleTransporte['condicionNegociacion'] +
          "' en data.transporte.condicionNegociacion no encontrado. Valores: " +
          constanteService.condicionesNegociaciones.map((a) => a.codigo + '-' + a.descripcion),
      );
    }*/

    if (data.detalleTransporte['salida']) {
      this.generateDatosSalidaValidate(params, data);
    }
    if (data.detalleTransporte['entrega']) {
      this.generateDatosEntregaValidate(params, data);
    }
    if (data.detalleTransporte['vehiculo']) {
      this.generateDatosVehiculoValidate(params, data);
    }
    if (data.detalleTransporte['transportista']) {
      this.generateDatosTransportistaValidate(params, data);
    }
  }

  /**
   * E10.1. Campos que identifican el local de salida de las mercaderías (E920-E939)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosSalidaValidate(params: EDocumentParams, data: EDocumentData) {
    var regExpOnlyNumber = new RegExp(/^\d+$/);

    let errorDepDisCiu = false;
    if (!data.detalleTransporte['salida']['ciudad']) {
      this.validator.errors.push('Debe especificar la Ciudad del Local de Salida en data.transporte.salida.ciudad');
      errorDepDisCiu = true;
    } else {
      if (
        constanteService.cities.filter((ciudad: any) => ciudad.codigo === +data.detalleTransporte['salida']['ciudad'])
          .length == 0
      ) {
        this.validator.errors.push(
          "Ciudad '" +
            data.detalleTransporte['salida']['ciudad'] +
            "' del Cliente en data.transporte.salida.ciudad no encontrado. Valores: " +
            constanteService.cities.map((a: any) => a.codigo + '-' + a.descripcion),
        );
        errorDepDisCiu = true;
      }

      //De acuerdo a la Ciudad pasada como parametro, buscar el distrito y departamento y asignar dichos
      //valores de forma predeterminada, aunque este valor sera sobre-escrito caso el usuario envie
      //data.detalleTransporte['salida']['distrito'] y data.detalleTransporte['salida']['departamento']
      let objCiudad: any = constanteService.cities.filter(
        (ciu) => ciu._id === +data.detalleTransporte['salida']['ciudad'],
      );

      if (objCiudad && objCiudad[0]) {
        let objDistrito: any = constanteService.districts.filter((dis) => dis._id === +objCiudad[0]['distrito']);

        let objDepartamento: any = constanteService.departments.filter(
          (dep) => dep._id === +objDistrito[0]['departamento'],
        );

        //Solo actualiza si no tiene valor
        if (!data.detalleTransporte['salida']['distrito'])
          data.detalleTransporte['salida']['distrito'] = objDistrito[0]['codigo'];

        if (!data.detalleTransporte['salida']['departamento'])
          data.detalleTransporte['salida']['departamento'] = objDepartamento[0]['codigo'];
      }

      if (!errorDepDisCiu) {
        if (!data.detalleTransporte['salida']['departamento']) {
          this.validator.errors.push(
            'Debe especificar el Departamento del Local de Salida en data.transporte.salida.departamento',
          );
          errorDepDisCiu = true;
        }
        if (!data.detalleTransporte['salida']['distrito']) {
          this.validator.errors.push(
            'Debe especificar el Distrito del Local de Salida en data.transporte.salida.distrito',
          );
          errorDepDisCiu = true;
        }
      }
    }

    if (!errorDepDisCiu) {
      constanteService.validateLocation(
        'data.transporte.salida',
        +data.detalleTransporte['salida']['departamento'],
        +data.detalleTransporte['salida']['distrito'],
        +data.detalleTransporte['salida']['ciudad'],
        this.validator.errors,
      );
    }

    if (!data.detalleTransporte['salida']['direccion']) {
      this.validator.errors.push(
        'Debe especificar la Dirección del Local de Salida en data.transporte.salida.direccion',
      );
    } else {
      if (
        !(
          data.detalleTransporte['salida']['direccion'].length >= 1 &&
          data.detalleTransporte['salida']['direccion'].length <= 255
        )
      ) {
        this.validator.errors.push(
          "Dirección del Local de Salida '" +
            data.detalleTransporte['salida']['direccion'] +
            "' en data.transporte.salida.direccion debe tener una longitud de 1 a 255 caracteres",
        );
      }
    }

    if (data.detalleTransporte['salida']['numeroCasa'] == null) {
      this.validator.errors.push(
        'Debe especificar el Número de Casa del Local de Salida en data.transporte.salida.numeroCasa',
      );
    } else {
      if (!((data.detalleTransporte['salida']['numeroCasa'] + '').length > 0)) {
        this.validator.errors.push(
          'Debe especificar el Número de Casa del Local de Salida en data.transporte.salida.numeroCasa',
        );
      } else {
        if (data.detalleTransporte['salida']['numeroCasa']) {
          if (!regExpOnlyNumber.test(data.detalleTransporte['salida']['numeroCasa'])) {
            this.validator.errors.push('El Número de Casa en data.transporte.salida.numeroCasa debe ser numérico');
          }
        } else {
          if (
            !(
              (data.detalleTransporte['salida']['numeroCasa'] + '').length >= 1 &&
              (data.detalleTransporte['salida']['numeroCasa'] + '').length <= 6
            )
          ) {
            this.validator.errors.push(
              "Número de Casa del Local de Salida '" +
                data.detalleTransporte['salida']['numeroCasa'] +
                "' en data.transporte.salida.numeroCasa debe tener una longitud de 1 a 6 caracteres",
            );
          }
        }
      }
    }

    /*if (!data.detalleTransporte['salida']['numeroCasa']) {
      this.validator.errors.push('Debe especificar el Número de Casa del Local de Salida en data.transporte.salida.numeroCasa');
    } else {
      if (
        !(
          (data.detalleTransporte['salida']['numeroCasa'] + '').length >= 1 &&
          (data.detalleTransporte['salida']['numeroCasa'] + '').length <= 6
        )
      ) {
        this.validator.errors.push(
          "Número de Casa del Local de Salida '" +
            data.detalleTransporte['salida']['numeroCasa'] +
            "' en data.transporte.salida.numeroCasa debe tener una longitud de 1 a 6 caracteres",
        );
      }
    }*/
  }

  /**
   * E10.2. Campos que identifican el local de entrega de las mercaderías (E940-E959)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosEntregaValidate(params: EDocumentParams, data: EDocumentData) {
    var regExpOnlyNumber = new RegExp(/^\d+$/);
    let errorDepDisCiu = false;
    if (!data.detalleTransporte['entrega']['ciudad']) {
      this.validator.errors.push('Debe especificar la Ciudad del Local de Entrega en data.transporte.entrega.ciudad');
      errorDepDisCiu = true;
    } else {
      if (
        constanteService.cities.filter((ciudad: any) => ciudad.codigo === +data.detalleTransporte['entrega']['ciudad'])
          .length == 0
      ) {
        this.validator.errors.push(
          "Ciudad '" +
            data.detalleTransporte['entrega']['ciudad'] +
            "' del Cliente en data.transporte.entrega.ciudad no encontrado. Valores: " +
            constanteService.cities.map((a: any) => a.codigo + '-' + a.descripcion),
        );
        errorDepDisCiu = true;
      }

      //De acuerdo a la Ciudad pasada como parametro, buscar el distrito y departamento y asignar dichos
      //valores de forma predeterminada, aunque este valor sera sobre-escrito caso el usuario envie
      //data.detalleTransporte['entrega']['distrito'] y data.detalleTransporte['entrega']['departamento']
      let objCiudad: any = constanteService.cities.filter(
        (ciu) => ciu._id === +data.detalleTransporte['entrega']['ciudad'],
      );

      if (objCiudad && objCiudad[0]) {
        let objDistrito: any = constanteService.districts.filter((dis) => dis._id === +objCiudad[0]['distrito']);

        let objDepartamento: any = constanteService.departments.filter(
          (dep) => dep._id === +objDistrito[0]['departamento'],
        );

        //Solo actualiza si no tiene valor
        if (!data.detalleTransporte['entrega']['distrito'])
          data.detalleTransporte['entrega']['distrito'] = objDistrito[0]['codigo'];

        if (!data.detalleTransporte['entrega']['departamento'])
          data.detalleTransporte['entrega']['departamento'] = objDepartamento[0]['codigo'];
      }

      if (!errorDepDisCiu) {
        if (!data.detalleTransporte['entrega']['departamento']) {
          this.validator.errors.push(
            'Debe especificar el Departamento del Local de Entrega en data.transporte.entrega.departamento',
          );
          errorDepDisCiu = true;
        }
        if (!data.detalleTransporte['entrega']['distrito']) {
          this.validator.errors.push(
            'Debe especificar el Distrito del Local de Entrega en data.transporte.entrega.distrito',
          );
          errorDepDisCiu = true;
        }
      }
    }

    if (!errorDepDisCiu) {
      constanteService.validateLocation(
        'data.transporte.entrega',
        +data.detalleTransporte['entrega']['departamento'],
        +data.detalleTransporte['entrega']['distrito'],
        +data.detalleTransporte['entrega']['ciudad'],
        this.validator.errors,
      );
    }

    /*
      const jsonResult: any = {
        dDirLocEnt: data.detalleTransporte['entrega']['direccion'],
        dNumCasEnt: data.detalleTransporte['entrega']['numeroCasa'],
        dComp1Ent: data.detalleTransporte['entrega']['complementoDireccion1'],
        dComp2Ent: data.detalleTransporte['entrega']['complementoDireccion1'],
        cDepEnt: data.detalleTransporte['entrega']['departamento'],
        dDesDepEnt: constanteService.departamentos.filter(
          (td) => td.codigo === data.detalleTransporte['entrega']['departamento'],
        )[0]['descripcion'],
        cDisEnt: data.detalleTransporte['entrega']['distrito'],
        dDesDisEnt: constanteService.distritos.filter(
          (td) => td.codigo === data.detalleTransporte['entrega']['distrito'],
        )[0]['descripcion'],
        cCiuEnt: data.detalleTransporte['entrega']['ciudad'],
        dDesCiuEnt: constanteService.ciudades.filter(
          (td) => td.codigo === data.detalleTransporte['entrega']['ciudad'],
        )[0]['descripcion'],
        //dTelEnt : data.detalleTransporte['entrega']['telefonoContacto'],
      };
    */
    if (!data.detalleTransporte['entrega']['direccion']) {
      this.validator.errors.push(
        'Debe especificar la Dirección del Local de Entrega en data.transporte.entrega.direccion',
      );
    } else {
      if (
        !(
          data.detalleTransporte['entrega']['direccion'].length >= 1 &&
          data.detalleTransporte['entrega']['direccion'].length <= 255
        )
      ) {
        this.validator.errors.push(
          "Dirección del Local de Entrega '" +
            data.detalleTransporte['entrega']['direccion'] +
            "' en data.transporte.entrega.direccion debe tener una longitud de 1 a 255 caracteres",
        );
      }
    }

    if (data.detalleTransporte['entrega']['numeroCasa'] == null) {
      this.validator.errors.push(
        'Debe especificar el Número de Casa del Local de Entrega en data.transporte.entrega.numeroCasa',
      );
    } else {
      if (!((data.detalleTransporte['entrega']['numeroCasa'] + '').length > 0)) {
        this.validator.errors.push(
          'Debe especificar el Número de Casa del Local de Entrega en data.transporte.entrega.numeroCasa',
        );
      } else {
        if (data.detalleTransporte['entrega']['numeroCasa']) {
          if (!regExpOnlyNumber.test(data.detalleTransporte['entrega']['numeroCasa'])) {
            this.validator.errors.push('El Número de Casa en data.transporte.entrega.numeroCasa debe ser numérico');
          }
        } else {
          if (
            !(
              (data.detalleTransporte['entrega']['numeroCasa'] + '').length >= 1 &&
              (data.detalleTransporte['entrega']['numeroCasa'] + '').length <= 6
            )
          ) {
            this.validator.errors.push(
              "Número de Casa del Local de Entrega '" +
                data.detalleTransporte['entrega']['numeroCasa'] +
                "' en data.transporte.entrega.numeroCasa debe tener una longitud de 1 a 6 caracteres",
            );
          }
        }
      }
    }

    /*if (!data.detalleTransporte['entrega']['numeroCasa']) {
      this.validator.errors.push('Debe especificar el Número de Casa del Local de Entrega en data.transporte.entrega.numeroCasa');
    } else {
      if (
        !(
          data.detalleTransporte['entrega']['numeroCasa'].length >= 1 &&
          data.detalleTransporte['entrega']['numeroCasa'].length <= 255
        )
      ) {
        this.validator.errors.push(
          "Número de Casa del Local de Entrega '" +
            data.detalleTransporte['entrega']['numeroCasa'] +
            "' en data.transporte.entrega.numeroCasa debe tener una longitud de 1 a 255 caracteres",
        );
      }
    }*/
  }

  /**
       * E10.3. Campos que identifican el vehículo de traslado de mercaderías (E960-E979)
  
       * 
       * @param params 
       * @param data 
       * @param options 
       * @param items Es el item actual del array de items de "data" que se está iterando
       */
  private generateDatosVehiculoValidate(params: EDocumentParams, data: EDocumentData) {
    if (!(data.detalleTransporte && data.detalleTransporte['vehiculo'])) {
      this.validator.errors.push('Los datos del Vehiculo en data.transporte.vehiculo no fueron informados');
    } else {
      if (!data.detalleTransporte['vehiculo']['tipo']) {
        this.validator.errors.push('El tipo de Vehiculo en data.transporte.vehiculo.tipo no fue informado');
      } else {
        if (
          !(
            data.detalleTransporte['vehiculo']['tipo'].length >= 4 &&
            data.detalleTransporte['vehiculo']['tipo'].length <= 10
          )
        ) {
          this.validator.errors.push(
            "Tipo de Vehiculo '" +
              data.detalleTransporte['vehiculo']['tipo'] +
              "' en data.transporte.vehiculo.tipo debe tener una longitud de 4 a 10 caracteres ",
          );
        }
      }

      if (!data.detalleTransporte['vehiculo']['documentoTipo']) {
        this.validator.errors.push(
          'El Tipo de Documento del Vehiculo en data.transporte.vehiculo.documentoTipo no fue informado',
        );
      } else {
        if (+data.detalleTransporte['vehiculo']['documentoTipo'] == 1) {
          if (!data.detalleTransporte['vehiculo']['documentoNumero']) {
            this.validator.errors.push(
              'El numero de identificacion del Vehiculo en data.transporte.vehiculo.documentoNumero no fue informado',
            );
          } else {
            if (
              !(
                data.detalleTransporte['vehiculo']['documentoNumero'].length >= 1 &&
                data.detalleTransporte['vehiculo']['documentoNumero'].length <= 20
              )
            ) {
              this.validator.errors.push(
                "Número de Identificacion del Vehiculo '" +
                  data.detalleTransporte['vehiculo']['documentoNumero'] +
                  "' en data.transporte.vehiculo.documentoNumero debe tener una longitud de 1 a 20 caracteres ",
              );
            }
          }
        }

        if (+data.detalleTransporte['vehiculo']['documentoTipo'] == 2) {
          if (!data.detalleTransporte['vehiculo']['numeroMatricula']) {
            this.validator.errors.push(
              'El numero de matricula del Vehiculo en data.transporte.vehiculo.numeroMatricula no fue informado',
            );
          } else {
            if (
              !(
                data.detalleTransporte['vehiculo']['numeroMatricula'].length >= 6 &&
                data.detalleTransporte['vehiculo']['numeroMatricula'].length <= 7
              )
            ) {
              this.validator.errors.push(
                "Número de Matricula '" +
                  data.detalleTransporte['vehiculo']['numeroMatricula'] +
                  "' en data.transporte.vehiculo.numeroMatricula debe tener una longitud de 6 a 7 caracteres ",
              );
            }
          }
        }
      }
    }

    if (!data.detalleTransporte['vehiculo']['marca']) {
      this.validator.errors.push('La marca del Vehiculo en data.transporte.vehiculo.marca no fue informado');
    } else {
      if (
        !(
          data.detalleTransporte['vehiculo']['marca'].length >= 1 &&
          data.detalleTransporte['vehiculo']['marca'].length <= 10
        )
      ) {
        this.validator.errors.push(
          "Marca del Vehiculo '" +
            data.detalleTransporte['vehiculo']['marca'] +
            "' en data.transporte.vehiculo.marca debe tener una longitud de 1 a 10 caracteres",
        );
      }
    }
  }

  /**
   * E10.4. Campos que identifican al transportista (persona física o jurídica) (E980-E999)
   *
   * @param params
   * @param data
   * @param options
   * @param items Es el item actual del array de items de "data" que se está iterando
   */
  private generateDatosTransportistaValidate(params: EDocumentParams, data: EDocumentData) {
    let errorEsContribuyente = false;
    if (data.detalleTransporte['transportista']) {
      if (typeof data.detalleTransporte['transportista']['contribuyente'] == 'undefined') {
        this.validator.errors.push(
          'Debe indicar si el Transportista es o no un Contribuyente true|false en data.transporte.transportista.contribuyente',
        );
        errorEsContribuyente = true;
      }

      if (typeof data.detalleTransporte['transportista']['contribuyente'] == 'undefined') {
        this.validator.errors.push(
          'Debe indicar si el Transportista es o no un Contribuyente true|false en data.transporte.transportista.contribuyente',
        );
        errorEsContribuyente = true;
      }

      if (
        !(
          data.detalleTransporte['transportista']['contribuyente'] === true ||
          data.detalleTransporte['transportista']['contribuyente'] === false
        )
      ) {
        this.validator.errors.push('data.transporte.transportista.contribuyente debe ser true|false');
        errorEsContribuyente = true;
      }
    }

    if (!errorEsContribuyente) {
      if (
        data.detalleTransporte &&
        data.detalleTransporte['transportista'] &&
        data.detalleTransporte['transportista']['contribuyente'] === true
      ) {
        if (
          !(
            data.detalleTransporte &&
            data.detalleTransporte['transportista'] &&
            data.detalleTransporte['transportista']['ruc']
          )
        ) {
          this.validator.errors.push(
            'Debe especificar el RUC para el Transportista en data.transporte.transportista.ruc',
          );
        } else {
          if (data.detalleTransporte['transportista']['ruc'].indexOf('-') == -1) {
            console.log('agregar error');

            this.validator.errors.push('RUC debe contener dígito verificador en data.transporte.transportista.ruc');
          }

          var regExpOnlyNumber = new RegExp(/^\d+$/);
          const rucCliente = data.detalleTransporte['transportista']['ruc'].split('-');

          //Un RUC puede ser alphanumerico
          /*if (!regExpOnlyNumber.test((rucCliente[0] + '').trim())) {
            this.validator.errors.push(
              "La parte del RUC del Cliente '" +
                data.detalleTransporte['transportista']['ruc'] +
                "' en data.transporte.transportista.ruc debe ser numérico",
            );
          }*/
          if (!regExpOnlyNumber.test((rucCliente[1] + '').trim())) {
            this.validator.errors.push(
              "La parte del DV del RUC del Cliente '" +
                data.detalleTransporte['transportista']['ruc'] +
                "' en data.transporte.transportista.ruc debe ser numérico",
            );
          }

          if (!(rucCliente[0].length >= 3 && rucCliente[0].length <= 8)) {
            this.validator.errors.push(
              "La parte del RUC '" +
                data.detalleTransporte['transportista']['ruc'] +
                "' en data.transporte.transportista.ruc debe contener de 1 a 8 caracteres",
            );
          }

          if (rucCliente[1] > 9) {
            this.validator.errors.push(
              "La parte del DV del RUC '" +
                data.detalleTransporte['transportista']['ruc'] +
                "' data.transporte.transportista.ruc debe ser del 1 al 9",
            );
          }
        }
      } else {
        //No es contribuyente
        if (!data.detalleTransporte['transportista']['documentoTipo']) {
          this.validator.errors.push(
            'Debe especificar el Tipo de Documento en data.transporte.transportista.documentoTipo',
          );
        } else {
          if (
            constanteService.userIdentityDocuments.filter(
              (um) => um._id === data.detalleTransporte['transportista']['documentoTipo'],
            ).length == 0
          ) {
            this.validator.errors.push(
              "Tipo de Documento '" +
                data.detalleTransporte['transportista']['documentoTipo'] +
                "' en data.transporte.transportista.documentoTipo no encontrado. Valores: " +
                constanteService.userIdentityDocuments.map((a) => a._id + '-' + a.description),
            );
          }
        }

        if (!data.detalleTransporte['transportista']['documentoNumero']) {
          this.validator.errors.push(
            'Es obligatorio especificar el Número de Documento la Empresa transportista en data.transporte.transportista.documentoNumero',
          );
        }
      }
    }

    //Datos obligatorios que no dependen de si es o no contribuyente
    if (!data.detalleTransporte['transportista']['direccion']) {
      this.validator.errors.push(
        'Es obligatorio especificar la dirección de la Empresa transportista en data.transporte.transportista.direccion',
      );
    } else {
      //Validar longitud
      if (
        !(
          data.detalleTransporte['transportista']['direccion'].length >= 1 &&
          data.detalleTransporte['transportista']['direccion'].length <= 150
        )
      ) {
        this.validator.errors.push(
          'La direccion de la Empresa Transportista (' +
            data.detalleTransporte['transportista']['direccion'] +
            ') en data.transporte.transportista.direccion debe tener una longitud de 1 a 150 caracteres',
        );
      }
    }

    //Chofer - Obligatorio
    if (
      !(
        data.detalleTransporte &&
        data.detalleTransporte['transportista'] &&
        data.detalleTransporte['transportista']['chofer']
      )
    ) {
      this.validator.errors.push(
        'Es obligatorio especificar los datos del chofer en data.transporte.transportista.chofer',
      );
    } else {
      //Valida los datos del chofer

      if (!data.detalleTransporte['transportista']['chofer']['documentoNumero']) {
        this.validator.errors.push(
          'Es obligatorio especificar el nombre del chofer en data.transporte.transportista.chofer.documentoNumero',
        );
      } else {
        //Validar longitud
        if (
          !(
            data.detalleTransporte['transportista']['chofer']['documentoNumero'].length >= 1 &&
            data.detalleTransporte['transportista']['chofer']['documentoNumero'].length <= 20
          )
        ) {
          this.validator.errors.push(
            'El número de documento del Chofer (' +
              data.detalleTransporte['transportista']['chofer']['documentoNumero'] +
              ') en data.transporte.transportista.chofer.documentoNumero debe tener una longitud de 1 a 20 caracteres',
          );
        }

        //Validar si tiene puntos
        if ((data.detalleTransporte['transportista']['chofer']['documentoNumero'] + '').includes('.')) {
          this.validator.errors.push(
            'El número de documento del Chofer (' +
              data.detalleTransporte['transportista']['chofer']['documentoNumero'] +
              ') en data.transporte.transportista.chofer.documentoNumero debe estar sin puntos',
          );
        }
      }

      if (!data.detalleTransporte['transportista']['chofer']['nombre']) {
        this.validator.errors.push(
          'Es obligatorio especificar el nombre del chofer en data.transporte.transportista.chofer.nombre',
        );
      } else {
        //Validar longitud
        if (
          !(
            data.detalleTransporte['transportista']['chofer']['nombre'].length >= 4 &&
            data.detalleTransporte['transportista']['chofer']['nombre'].length <= 60
          )
        ) {
          this.validator.errors.push(
            'El nombre del Chofer (' +
              data.detalleTransporte['transportista']['chofer']['nombre'] +
              ') en data.transporte.transportista.chofer.nombre debe tener una longitud de 4 a 60 caracteres',
          );
        }
      }

      if (!data.detalleTransporte['transportista']['chofer']['direccion']) {
        this.validator.errors.push(
          'Es obligatorio especificar la dirección del chofer en data.transporte.transportista.chofer.direccion',
        );
      } else {
        //Validar longitud
        if (
          !(
            data.detalleTransporte['transportista']['chofer']['direccion'].length >= 4 &&
            data.detalleTransporte['transportista']['chofer']['direccion'].length <= 60
          )
        ) {
          this.validator.errors.push(
            'La direccion del Chofer (' +
              data.detalleTransporte['transportista']['chofer']['direccion'] +
              ') en data.transporte.transportista.chofer.direccion debe tener una longitud de 4 a 60 caracteres',
          );
        }
      }
    }

    if (
      data.detalleTransporte &&
      data.detalleTransporte['transportista'] &&
      data.detalleTransporte['transportista']['agente'] &&
      data.detalleTransporte['transportista']['agente']['ruc']
    ) {
      if (data.detalleTransporte['transportista']['agente']['ruc'].indexOf('-') == -1) {
        this.validator.errors.push('RUC debe contener dígito verificador en data.transporte.transportista.agente.ruc');
      }

      var regExpOnlyNumber = new RegExp(/^\d+$/);
      const rucCliente = data.detalleTransporte['transportista']['agente']['ruc'].split('-');

      //Un RUC puede ser alphanumerico
      /*if (!regExpOnlyNumber.test((rucCliente[0] + '').trim())) {
        this.validator.errors.push(
          "La parte del RUC del Cliente '" +
            data.detalleTransporte['transportista']['agente']['ruc'] +
            "' en data.transporte.transportista.agente.ruc debe ser numérico",
        );
      }*/
      if (!regExpOnlyNumber.test((rucCliente[1] + '').trim())) {
        this.validator.errors.push(
          "La parte del DV del RUC del Cliente '" +
            data.detalleTransporte['transportista']['agente']['ruc'] +
            "' en data.transporte.transportista.agente.ruc debe ser numérico",
        );
      }

      if (!(rucCliente[0].length >= 3 && rucCliente[0].length <= 8)) {
        this.validator.errors.push(
          "La parte del RUC '" +
            data.detalleTransporte['transportista']['agente']['ruc'] +
            "' en data.transporte.transportista.agente.ruc debe contener de 3 a 8 caracteres",
        );
      }

      if (rucCliente[1] > 9) {
        this.validator.errors.push(
          "La parte del DV del RUC '" +
            data.detalleTransporte['transportista']['agente']['ruc'] +
            "' data.transporte.transportista.agente.ruc debe ser del 1 al 9",
        );
      }
    }

    if (data.detalleTransporte['transportista'] && data.detalleTransporte['transportista']['pais']) {
      if (
        constanteService.countries.filter(
          (pais: any) => pais.codigo === data.detalleTransporte['transportista']['pais'],
        ).length == 0
      ) {
        this.validator.errors.push(
          "Pais '" +
            data.detalleTransporte['transportista']['pais'] +
            "' del Cliente en data.transporte.transportista.pais no encontrado. Valores: " +
            constanteService.countries.map((a: any) => a.codigo + '-' + a.descripcion),
        );
      }
    }
  }

  public generateDatosTotalesValidate(params: EDocumentParams, data: EDocumentData, config: XmlGenConfig) {
    /*let temporalTotal = jsonDteTotales.generateDatosTotales(params, data, data.items, config);
    console.log("temporalTotal", temporalTotal);

    if (data.descuentoGlobal > 0) {
      console.log("temporalTotal", data.descuentoGlobal);
    }*/

    if (data.moneda != 'PYG' && data.condicionTipoCambio == 1) {
      if (!data['cambio']) {
        this.validator.errors.push(
          'Debe especificar el valor del Cambio en data.cambio cuando moneda != PYG y la Cotización es Global',
        );
      }
    }

    if (data.moneda == 'PYG') {
      if ((data['descuentoGlobal'] + '').split('.')[1]?.length > 0) {
        this.validator.errors.push(
          'El Descuento Global "' +
            data['descuentoGlobal'] +
            '" en "PYG" en data.descuentoGlobal, no puede contener decimales',
        );
      }
    } else {
      if ((data['descuentoGlobal'] + '').split('.')[1]?.length > 8) {
        this.validator.errors.push(
          'El Descuento Global "' +
            data['descuentoGlobal'] +
            '" en data.descuentoGlobal, no puede contener mas de 8 decimales',
        );
      }
    }

    if (data.moneda == 'PYG') {
      if ((data['anticipoGlobal'] + '').split('.')[1]?.length > 0) {
        this.validator.errors.push(
          'El Anticipo Global "' +
            data['anticipoGlobal'] +
            '" en "PYG" en data.anticipoGlobal, no puede contener decimales',
        );
      }
    } else {
      if ((data['anticipoGlobal'] + '').split('.')[1]?.length > 8) {
        this.validator.errors.push(
          'El Anticipo Global "' +
            data['anticipoGlobal'] +
            '" en data.anticipoGlobal, no puede contener mas de 8 decimales',
        );
      }
    }
  }

  /**
   * G. Campos complementarios comerciales de uso general (G001-G049)
   *
   * @param params
   * @param data
   * @param options
   */
  public generateDatosComercialesUsoGeneralValidate(params: EDocumentParams, data: EDocumentData) {
    const jsonResult: any = {
      //dOrdCompra : data.complementarios['ordenCompra'],
      //dOrdVta : data.complementarios['ordenVenta'],
      //dAsiento : data.complementarios['numeroAsiento']
    };

    if (data.tipoDocumento == 1 || data.tipoDocumento == 7) {
      //Opcional si 1 o 7
      if (
        (data.complementarios && data.complementarios['carga'] && data.complementarios['carga']['volumenTotal']) ||
        (data.complementarios && data.complementarios['carga'] && data.complementarios['carga']['pesoTotal'])
      ) {
        this.generateDatosCargaValidate(params, data);
      }
    }
  }

  /**
   * G1. Campos generales de la carga (G050 - G099)
   *
   * @param params
   * @param data
   * @param options
   */
  private generateDatosCargaValidate(params: EDocumentParams, data: EDocumentData) {
    //TODO ALL
    /*const jsonResult: any = {
      cUniMedTotVol : data.complementarios['carga']['unidadMedida'], 
            dDesUniMedTotVol : data.complementarios['carga']['ordenVenta'],
            dTotVolMerc : data.complementarios['carga']['totalVolumenMercaderia'],
            cUniMedTotPes : data.complementarios['carga']['numeroAsiento'],
            dDesUniMedTotPes : data.complementarios['carga']['numeroAsiento'],
            dTotPesMerc : data.complementarios['carga']['numeroAsiento'],
            iCarCarga : data.complementarios['carga']['numeroAsiento'],
            dDesCarCarga : data.complementarios['carga']['numeroAsiento'],
    };*/

    if (
      data.complementarios &&
      data.complementarios['carga'] &&
      data.complementarios['carga']['unidadMedidaVolumenTotal']
    ) {
      if (
        constanteService.measurementUnits.filter(
          (um) => um._id === data.complementarios['carga']['unidadMedidaVolumenTotal'],
        ).length == 0
      ) {
        this.validator.errors.push(
          "Unidad de Medida '" +
            data.complementarios['carga']['unidadMedidaVolumenTotal'] +
            "' en data.complementarios.carga.unidadMedidaVolumenTotal no válido. Valores: " +
            constanteService.measurementUnits.map((a) => a._id + '-' + a.description.trim()),
        );
      }
    }

    if (
      data.complementarios &&
      data.complementarios['carga'] &&
      data.complementarios['carga']['unidadMedidaPesoTotal']
    ) {
      if (
        constanteService.measurementUnits.filter(
          (um) => um._id === data.complementarios['carga']['unidadMedidaPesoTotal'],
        ).length == 0
      ) {
        this.validator.errors.push(
          "Unidad de Medida '" +
            data.complementarios['carga']['unidadMedidaPesoTotal'] +
            "' en data.complementarios.carga.unidadMedidaPesoTotal no válido. Valores: " +
            constanteService.measurementUnits.map((a) => a._id + '-' + a.description.trim()),
        );
      }
    }

    if (data.complementarios && data.complementarios['carga'] && data.complementarios['carga']['caracteristicaCarga']) {
      if (
        constanteService.cargoCharacteristics.filter(
          (um) => um._id === data.complementarios['carga']['caracteristicaCarga'],
        ).length == 0
      ) {
        this.validator.errors.push(
          "Característica de Carga '" +
            data.complementarios['carga']['caracteristicaCarga'] +
            "' en data.complementarios.carga.caracteristicaCarga no válido. Valores: " +
            constanteService.cargoCharacteristics.map((a) => a._id + '-' + a.description),
        );
      }

      if (data.complementarios['carga']['caracteristicaCarga'] == 3) {
        if (!data.complementarios['carga']['caracteristicaCargaDescripcion']) {
          this.validator.errors.push(
            'Para data.complementarios.carga.caracteristicaCarga = 3 debe informar el campo data.complementarios.carga.caracteristicaCargaDescripcion',
          );
        }
      }
    }
  }

  /**
   * H. Campos que identifican al documento asociado (H001-H049)
   *
   * @param params
   * @param data
   * @param options
   */
  public generateDatosDocumentoAsociadoValidate(
    params: EDocumentParams,
    dataDocumentoAsociado: any,
    data: EDocumentData,
  ) {
    if (data['tipoTransaccion'] == 11 && !dataDocumentoAsociado['resolucionCreditoFiscal']) {
      this.validator.errors.push('Obligatorio informar data.documentoAsociado.resolucionCreditoFiscal');
    }

    //Validaciones
    if (
      constanteService.associatedDocumentTypes.filter((um) => um._id === +dataDocumentoAsociado['formato']).length == 0
    ) {
      this.validator.errors.push(
        "Formato de Documento Asociado '" +
          dataDocumentoAsociado['formato'] +
          "' en data.documentoAsociado.formato no encontrado. Valores: " +
          constanteService.associatedDocumentTypes.map((a) => a._id + '-' + a.description),
      );
    }

    if (dataDocumentoAsociado['tipo'] == 2) {
      if (
        constanteService.printedDocumentTypes.filter((um) => um._id === dataDocumentoAsociado['tipoDocumentoImpreso'])
          .length == 0
      ) {
        this.validator.errors.push(
          "Tipo de Documento impreso '" +
            dataDocumentoAsociado['tipoDocumentoImpreso'] +
            "' en data.documentoAsociado.tipoDocumentoImpreso no encontrado. Valores: " +
            constanteService.printedDocumentTypes.map((a) => a._id + '-' + a.description),
        );
      }
    }

    if (dataDocumentoAsociado['formato'] == 1) {
      //H002 = Electronico
      if (!(dataDocumentoAsociado['cdc'] && dataDocumentoAsociado['cdc'].length >= 44)) {
        this.validator.errors.push('Debe indicar el CDC asociado en data.documentoAsociado.cdc');
      }
      if (dataDocumentoAsociado['rucFusionado']) {
        if (!(dataDocumentoAsociado['rucFusionado'] >= 3 && dataDocumentoAsociado['rucFusionado'].length <= 8)) {
          this.validator.errors.push('El RUC fusionado debe estar entre 3 y 8 caracteres');
        }
      }
    }
    if (dataDocumentoAsociado['formato'] == 2) {
      //H002 = Impreso
      if (!dataDocumentoAsociado['timbrado']) {
        this.validator.errors.push(
          'Debe especificar el Timbrado del Documento impreso Asociado en data.documentoAsociado.timbrado',
        );
      }
      if (!dataDocumentoAsociado['establecimiento']) {
        this.validator.errors.push(
          'Debe especificar el Establecimiento del Documento impreso Asociado en data.documentoAsociado.establecimiento',
        );
      }
      if (!dataDocumentoAsociado['punto']) {
        this.validator.errors.push(
          'Debe especificar el Punto del Documento impreso Asociado en data.documentoAsociado.punto',
        );
      }

      if (!dataDocumentoAsociado['numero']) {
        this.validator.errors.push(
          'Debe especificar el Número del Documento impreso Asociado en data.documentoAsociado.numero',
        );
      }

      if (!dataDocumentoAsociado['tipoDocumentoImpreso']) {
        this.validator.errors.push(
          'Debe especificar el Tipo del Documento Impreso Asociado en data.documentoAsociado.tipoDocumentoImpreso',
        );
      }

      if (dataDocumentoAsociado['fecha']) {
        if ((dataDocumentoAsociado['fecha'] + '').length != 10) {
          this.validator.errors.push(
            'La Fecha del Documento impreso Asociado en data.documentoAsociado.fecha debe tener una longitud de 10 caracteres',
          );
        }
      } else {
        this.validator.errors.push(
          'Debe especificar la Fecha del Documento impreso Asociado en data.documentoAsociado.fecha',
        );
      }
    }

    if (dataDocumentoAsociado['formato'] == 3) {
      //H002 = Constancia electronica
      if (!dataDocumentoAsociado['constanciaTipo']) {
        this.validator.errors.push('Debe especificar el Tipo de Constancia data.documentoAsociado.constanciaTipo');
      } else {
        if (
          constanteService.constancyTypes.filter((um) => um._id === dataDocumentoAsociado['constanciaTipo']).length ==
          0
        ) {
          this.validator.errors.push(
            "Tipo de Constancia '" +
              dataDocumentoAsociado['constanciaTipo'] +
              "' en data.documentoAsociado.constanciaTipo no encontrado. Valores: " +
              constanteService.constancyTypes.map((a) => a._id + '-' + a.description),
          );
        }
      }
    }
  }
}

export default new EDocumentMainValidateService();
