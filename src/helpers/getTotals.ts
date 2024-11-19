import { TaxRate } from '../constants/taxRate.constants';
import { TaxTreatment } from '../constants/taxTreatments.constants';
import { TaxType } from '../constants/taxTypes.constants';
import { CompleteItem } from '../schemas/EDocData/item.schema';

type Props = {
  items: CompleteItem[];
  /**C002 = 7 */
  isElectronicRemissionNote: boolean;
  /**C002 = 4 */
  isAutoInvoice: boolean;
  /**D015 = PYG */
  isGuarani: boolean;
  /**D017 = 1 */
  currencyChangeConditionIsGlobal: boolean;
  /**D017 = 2 */
  currencyChangeConditionIsPerItem: boolean;
  /**D018 */
  cambio: number | undefined;
  /**F025*/
  comision: number | undefined;
  tipoImpuesto: TaxType;
};

/**F. Campos que describen los subtotales y totales de la transacción documentada (F001-F099)
 * OBS: Sin incluir el campo F025
 *
 * VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
 */
export default function getTotals({
  items,
  isElectronicRemissionNote,
  isAutoInvoice,
  isGuarani,
  currencyChangeConditionIsGlobal,
  currencyChangeConditionIsPerItem,
  cambio = 0,
  comision = 0,
  tipoImpuesto,
}: Props) {
  /*
  Obligatorio si C002 ≠ 7
  No informar si C002 = 7
  Cuando C002= 4, no informar
  F002, F003, F004, F005, F015,
  F016, F017, F018, F019, F020,
  F023, F025 y F026
  */

  if (!isElectronicRemissionNote) return undefined;

  type Totals = {
    /**F002*/
    subtotalExento: number;

    /**F003*/
    subtotalExonerado: number;

    /**F004*/
    subtotalIva5?: number;

    /**F005*/
    subtotalIva10?: number;

    /**F008*/
    totalBruto: number;

    /**F009 */
    totalDescuento: number;

    /**F010*/
    porcentajeDescuentoTotal: number;

    /**F011*/
    descuentoTotal: number;

    /**F012*/
    anticipo: number;

    /**F013*/
    redondeo: number;

    /**F014*/
    totalNeto: number;

    /**F015*/
    liquidacionIva5?: number;

    /**F016*/
    liquidacionIva10?: number;

    /**F017*/
    liquidacionTotalIva?: number;

    /**F018*/
    totalIvaGrabado5?: number;

    /**F019*/
    totalIvaGrabado10?: number;

    /**F020*/
    totalIvaGrabado?: number;

    /**F023*/
    totalGuaranies?: number;

    /**F026*/
    ivaComision: number;

    /**F033*/
    totalDescuentoGlobalItem: number;

    /**F034*/
    totalAnticipoItem: number;

    /**F035*/
    totalAnticipoGlobalItem: number;

    /**F036*/
    liquidacionTotalIva5?: number;

    /**F037*/
    liquidacionTotalIva10?: number;
  };

  const totals: Totals = {
    subtotalExento: 0,
    subtotalExonerado: 0,
    totalBruto: 0,
    totalDescuento: 0,
    porcentajeDescuentoTotal: 0,
    descuentoTotal: 0,
    anticipo: 0,
    redondeo: 0,
    totalNeto: 0,
    ivaComision: 0,
    totalDescuentoGlobalItem: 0,
    totalAnticipoItem: 0,
    totalAnticipoGlobalItem: 0,
  };

  // calcular los que estan presentes en ambos casos

  /**D013=1 */
  const isIvaTax = tipoImpuesto == TaxType.IVA;
  /**D013=3 */
  const isRentTax = tipoImpuesto == TaxType.RENTA;
  /**D013=4 */
  const isNoneTax = tipoImpuesto == TaxType.NINGUNO;
  /**D013=5 */
  const isIvaRentTax = tipoImpuesto == TaxType.IVA___RENTA;

  let totalWithoutDiscount = 0;

  items.forEach((item) => {
    /**E731 = 1 */
    const isGravado = item.ivaTipo == TaxTreatment.GRAVADO_IVA;
    /**E731 = 2 */
    const isExonerado =
      item.ivaTipo == TaxTreatment.EXONERADO__ART__100___LEY_6380_2019_;
    /**E731 = 3 */
    const isExento = item.ivaTipo == TaxTreatment.EXENTO;
    /**E731 = 4 */
    const isGravadoParcial =
      item.ivaTipo == TaxTreatment.GRAVADO_PARCIAL__GRAV__EXENTO_;
    /**E734 = 5 */
    const isAt5Percent = item.iva == TaxRate.CINCO;
    /**E734 = 10 */
    const isAt10Percent = item.iva == TaxRate.DIEZ;

    /** Comentario del repo original:
     * Ahora mismo solo es el precio por la cantidad y se usa para calcular
     * mas adelante F010 (OJO: Si F010 solo debe estar relacionado al total,
     * entonces a E721 (precioUnitario) hay que restarle EA002 (descuento)
     * antes de multiplicar por la cantidad)
     */
    totalWithoutDiscount += item.precioUnitario * item.cantidad;

    // F002 subtotalExento
    {
      /*
      Suma de todas las ocurrencias de EA008
      (Valor total de la operación por ítem)
      cuando la operación sea exenta (Si E731 = 3), más
      todas las ocurrencias de la Base Exenta (E737)
      cuando la operación sea Gravado Parcial (Si E731 = 4). 

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
      */
      if (isExento) {
        totals.subtotalExento += item.totalOperacion;
      }

      if (isGravadoParcial) {
        totals.subtotalExento += item.baseExentaIva;
      }
    }

    // F003 subtotalExonerado
    {
      /*
      Si E731 = 2: Suma de todas las
      ocurrencias de EA008 (Valor
      total de la operación por ítem)
      cuando la operación sea
      exonerada
      */
      if (isExonerado) {
        totals.subtotalExonerado += item.totalOperacion;
      }
    }

    // F004 subtotalIva5
    {
      /*
      Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem)
      cuando la operación sea a la tasa del 5% (E734=5) y (Si E731 = 1), 
      más todas las ocurrencias de (E735 + E736) cuando la operación sea 
      a la tasa del 5% (E734=5) y (Si E731 = 4).

      No debe existir el campo si D013 ≠ 1 o D013 ≠ 5

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
      */
      if (isIvaTax || isIvaRentTax) {
        if (isAt5Percent) {
          if (isGravado) {
            if (!totals.subtotalIva5) totals.subtotalIva5 = 0;
            totals.subtotalIva5 += item.totalOperacion;
          } else if (isGravadoParcial) {
            if (!totals.subtotalIva5) totals.subtotalIva5 = 0;
            totals.subtotalIva5 += item.ivaBase + item.liquidacionIvaPorItem;
          }
        }
      }
    }

    // F005 subtotalIva10
    {
      /*
      Suma de todas las ocurrencias de EA008
      (Valor total de la operación por ítem)
      cuando la operación sea a la tasa del 10% (E734=10) y (Si E731 = 1), 
      más todas las ocurrencias de (E735 + E736) cuando la
      operación sea a la tasa del 10% (E734=10) y (Si E731 = 4).

      No debe existir el campo si D013 ≠ 1 o D013 ≠ 5

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
      */
      if (isIvaTax || isIvaRentTax) {
        if (isAt10Percent) {
          if (isGravado) {
            if (!totals.subtotalIva10) totals.subtotalIva10 = 0;
            totals.subtotalIva10 += item.totalOperacion;
          } else if (isGravadoParcial) {
            if (!totals.subtotalIva10) totals.subtotalIva10 = 0;
            totals.subtotalIva10 += item.ivaBase + item.liquidacionIvaPorItem;
          }
        }
      }
    }

    // F009 totalDescuento
    {
      /*
      Suma de la multiplicación de cada
      descuento particular por ítem por la
      cantidad de ese ítem (sumatoria de
      EA002*E711)

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
      */
      totals.totalDescuento += (item.descuento || 0) * item.cantidad;
    }

    // F015 liquidacionIva5
    {
      /*
      Suma de todas las ocurrencias
      de E736 (Liquidación del IVA por
      ítem) cuando la operación sea a
      la tasa del 5% (E734=5)
      No debe existir el campo si D013≠1 o D013≠5
      */
      if (isIvaTax || isIvaRentTax) {
        if (!totals.liquidacionIva5) totals.liquidacionIva5 = 0;
        if (isAt5Percent) {
          totals.liquidacionIva5 += item.liquidacionIvaPorItem;
        }
      }
    }

    // F016 liquidacionIva10
    {
      /*
      Suma de todas las ocurrencias
      de E736 (Liquidación del IVA por
      ítem) cuando la operación sea a
      la tasa del 10% (E734=10)
      No debe existir el campo si D013≠1 o D013≠5
      */
      if (isIvaTax || isIvaRentTax) {
        if (!totals.liquidacionIva10) totals.liquidacionIva10 = 0;
        if (isAt10Percent) {
          totals.liquidacionIva10 += item.liquidacionIvaPorItem;
        }
      }
    }

    // F018 totalIvaGrabado5
    {
      /* 
      Suma de todas las ocurrencias
      de E735 (base gravada del IVA
      por ítem) cuando la operación
      sea a la tasa del 5% (E734=5).
      No debe existir el campo si D013≠1 o D013≠5
      */
      if (isIvaTax || isIvaRentTax) {
        if (!totals.totalIvaGrabado5) totals.totalIvaGrabado5 = 0;
        if (isAt5Percent) {
          totals.totalIvaGrabado5 += item.ivaBase;
        }
      }
    }

    // F019 totalIvaGrabado10
    {
      /* 
      Suma de todas las ocurrencias
      de E735 (base gravada del IVA
      por ítem) cuando la operación
      sea a la tasa del 10% (E734=10).
      No debe existir el campo si D013≠1 o D013≠5
      */
      if (isIvaTax || isIvaRentTax) {
        if (!totals.totalIvaGrabado10) totals.totalIvaGrabado10 = 0;
        if (isAt10Percent) {
          totals.totalIvaGrabado10 += item.ivaBase;
        }
      }
    }

    // F033 totalDescuntoGlobalItem
    {
      /*
      Sumatoria de la multiplicación de
      cada descuento global por ítem por la
      cantidad de ese ítem (sumatoria de
      EA004*E711)

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
      */
      totals.totalDescuentoGlobalItem +=
        (item.descuentoGlobalItem || 0) * item.cantidad;
    }

    // F034 totalAnticipoItem
    {
      /*
      Sumatoria de todas las ocurrencias de
      anticipos por ítem por la cantidad del
      ítem (EA006*E711)

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
      */
      if (!totals.totalAnticipoItem) totals.totalAnticipoItem = 0;
      totals.totalAnticipoItem += (item.anticipo || 0) * item.cantidad;
    }

    // F035 totalAnticipoGlobalItem
    {
      /*
      Sumatoria de todas las ocurrencias de
      anticipos globales por ítem por la
      cantidad del ítem (EA007*E711)

      VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
      */
      totals.totalAnticipoGlobalItem +=
        (item.anticipoGlobalItem || 0) * item.cantidad;
    }
  });

  const {
    subtotalExento,
    subtotalExonerado,
    subtotalIva5 = 0,
    subtotalIva10 = 0,
    totalDescuento,
    totalDescuentoGlobalItem,
    totalAnticipoItem,
    totalAnticipoGlobalItem,
    redondeo,
    liquidacionIva5 = 0,
    liquidacionIva10 = 0,
    totalIvaGrabado5 = 0,
    totalIvaGrabado10 = 0,
    ivaComision,
  } = totals;

  /**F008 */
  let totalBruto;
  {
    /* 
    Cuando D013 = 1, 3, 4 o 5
    corresponde a la suma de los
    subtotales de la operación
    (F002, F003, F004 y F005)
    Cuando C002=4 corresponde a
    la suma de todas las ocurrencias
    de EA008 (Valor total de la
    operación por ítem)
    */
    if (isIvaTax || isRentTax || isNoneTax || isIvaRentTax) {
      totals.totalBruto =
        subtotalExento + subtotalExonerado + subtotalIva5 + subtotalIva10;
    }
    totalBruto = totals.totalBruto;
  }

  /**F011 */
  let descuentoTotal;
  {
    /*
    Sumatoria de todos los descuentos
    (Global por Ítem y particular por ítem)
    de cada ítem (F009+F033)

    VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
    */
    totals.descuentoTotal = totalDescuento + totalDescuentoGlobalItem;
    descuentoTotal = totals.descuentoTotal;
  }

  /**F012 */
  let anticipo;
  {
    /*
    1 Sumatoria de todos los Anticipos
    (Global por Ítem y particular por ítem)
    F034 + F035

    VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
    */
    totals.anticipo = totalAnticipoItem + totalAnticipoGlobalItem;
    anticipo = totals.anticipo;
  }

  // F013 redondeo
  {
    /*
    Se realiza sobre el campo F008
    y conforme a la explicación
    inicial en el grupo F
    Si no cuenta con redondeo
    completar con cero
    */
    /*
    El redondeo o es lo que hay que restar para que sea multiplo de 50 guaranies,
    en caso de otras monedas, 50 centimos
    */
    if (isGuarani) {
      totals.redondeo = totalBruto % 50;
    } else {
      totals.redondeo = 0;
    }
  }

  /**F014 */
  let totalNeto;
  {
    /*
    Corresponde al cálculo aritmético
    F008-F013+F025

    VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_001_MT_V150.pdf/c4d2ab8e-632b-dc8f-d3f6-6a144a3a3d9c?t=1687353745680
    */
    totals.totalNeto = totalBruto - redondeo + comision;
    totalNeto = totals.totalNeto;
  }

  /**F036 */
  let liquidacionTotalIva5;
  {
    /*
    Corresponde al cálculo del
    impuesto al IVA a la tasa del 5%
    sobre el valor del redondeo
    (Valor del redondeo/1,05),
    cuando la operación sea a la
    tasa del 5% (E734=5)
    No debe existir el campo si D013≠1 o D013≠5
    */
    if (isIvaTax || isIvaRentTax) {
      totals.liquidacionTotalIva5 = redondeo / 1.05;
    }
    liquidacionTotalIva5 = totals.liquidacionTotalIva5;
  }

  /**F037 */
  let liquidacionTotalIva10;
  {
    /*
    Corresponde al cálculo del
    impuesto al IVA a la tasa del
    10% (E734=10)
    sobre el valor del redondeo
    (Valor del redondeo/1,1), cuando
    la operación sea a la tasa del
    10% (E734=10)
    No debe existir el campo si D013≠1 o D013≠5
    */
    if (isIvaTax || isIvaRentTax) {
      totals.liquidacionTotalIva10 = redondeo / 1.1;
    }
    liquidacionTotalIva10 = totals.liquidacionTotalIva10;
  }

  /**F017 */
  let liquidacionTotalIva;
  {
    /*
    Corresponde al cálculo
    aritmético 
    F015 (Liquidación del IVA al 10%) + 
    F016(Liquidación del IVA al 5%) – 
    F036 (redondeo al 5%) – 
    F037 (redondeo al 10%) + 
    F026 (Liquidación total del IVA de la comisión)
    No debe existir el campo si D013≠1 o D013≠5
    */
    totals.liquidacionTotalIva =
      liquidacionIva5 +
      liquidacionIva10 -
      (liquidacionTotalIva5 || 0) -
      (liquidacionTotalIva10 || 0) +
      ivaComision;
    liquidacionTotalIva = totals.liquidacionTotalIva;
  }

  /**F020 */
  let totalIvaGrabado;
  {
    /*
    Corresponde al cálculo aritmético F018+F019
    No debe existir el campo si D013≠1 o D013≠5
    */
    if (isIvaTax || isIvaRentTax) {
      totals.totalIvaGrabado = totalIvaGrabado5 + totalIvaGrabado10;
    }
    totalIvaGrabado = totals.totalIvaGrabado;
  }

  /**F023 */
  let totalGuaranies;
  {
    /*
    Si D015 ≠ PYG y D017 = 1, corresponde al cálculo aritmético F014 * D018
    Si D015 ≠ PYG y D017 = 2, corresponde a la suma de todas las ocurrencias de EA009
    No informar si D015 = PYG

    VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_008_MT_V150.pdf/81fba389-0f27-e757-88c3-ec7b3dbab90b?t=1687353746734
    */
    if (!isGuarani) {
      if (currencyChangeConditionIsGlobal) {
        totals.totalGuaranies = totalNeto * cambio;
      } else if (currencyChangeConditionIsPerItem) {
        let total = 0;
        items.forEach((item) => {
          total += item.totalOperacionGuaranies;
        });
        totals.totalGuaranies = total;
      }
    }
    totalGuaranies = totals.totalGuaranies;
  }

  /**F026 */
  let comisionIva;
  {
    /*
    Se aplica la tasa del 10% para
    comisiones
    */
    totals.ivaComision = (comision * 10) / 100;
    comisionIva = totals.ivaComision;
  }

  /**F010 */
  {
    /*
    Informativo, si no existe %,
    completar con cero
    */

    // ⚠️ según el repo original...
    totals.porcentajeDescuentoTotal =
      (totalDescuentoGlobalItem * 100) / totalWithoutDiscount;
  }

  if (isAutoInvoice) {
    const {
      subtotalExento,
      subtotalExonerado,
      subtotalIva5,
      subtotalIva10,
      liquidacionIva5,
      liquidacionIva10,
      liquidacionTotalIva,
      totalIvaGrabado5,
      totalIvaGrabado10,
      totalIvaGrabado,
      totalGuaranies,
      ivaComision,
      ...valid
    } = totals;

    type OmittedKeys =
      | 'subtotalExento'
      | 'subtotalExonerado'
      | 'subtotalIva5'
      | 'subtotalIva10'
      | 'liquidacionIva5'
      | 'liquidacionIva10'
      | 'liquidacionTotalIva'
      | 'totalIvaGrabado5'
      | 'totalIvaGrabado10'
      | 'totalIvaGrabado'
      | 'totalGuaranies'
      | 'ivaComision';

    type Result = SecureOmit<Totals, OmittedKeys> & Partial<Pick<Totals, OmittedKeys>>;
    return valid as Result;
  } else {
    return totals;
  }
}
