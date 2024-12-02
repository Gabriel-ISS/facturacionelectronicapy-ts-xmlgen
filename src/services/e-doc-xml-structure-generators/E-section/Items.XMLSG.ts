import { EDocData } from '../../../schemas/EDoc.schema';
import { CompleteItem } from '../../../schemas/data/item.schema';
import { CompleteMonto } from '../../../schemas/data/monto.schema';

class ItemsXMLSG {
  /**E8. Campos que describen los ítems de la operación (E700-E899)*/
  public get_gCamItem(data: EDocData) {
    return data.items.map((item) => ({
      // E701
      dCodInt: item.codigo,

      // E702
      dParAranc: item.partidaArancelaria,

      // E703
      dNCM: item.ncm,

      // E704
      dDncpG: item.dncp?.codigoNivelGeneral,

      // E705
      dDncpE: item.dncp?.codigoNivelEspecifico,

      // E706
      dGtin: item.dncp?.codigoGtinProducto,

      //E707
      dGtinPq: item.dncp?.codigoGtinProducto,

      // E708
      dDesProSer: item.descripcion,

      // E709
      cUniMed: item.unidadMedida,

      // E710
      dDesUniMed: item.unidadMedidaDescripcion.trim(),

      // E711
      dCantProSer: item.cantidad,

      // E712
      cPaisOrig: item.pais,

      // E713
      dDesPaisOrig: item.paisDescripcion,

      // E714
      dInfItem: item.observacion,

      // E715
      cRelMerc: item.tolerancia,

      // E716
      dDesRelMerc: item.toleranciaDescripcion,

      // E717
      dCanQuiMer: item.toleranciaCantidad,

      // E718
      dPorQuiMer: item.toleranciaPorcentaje,

      // E719
      dCDCAnticipo: item.cdcAnticipo,

      // E8.1. Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729)
      gValorItem: this.get_gValorItem(item),

      // E8.2. Campos que describen el IVA de la operación por ítem (E730-E739)
      gCamIVA: this.get_gCamIVA(item),

      // E8.4. Grupo de rastreo de la mercadería (E750-E761)
      gRasMerc: this.get_gRasMerc(item),

      // E8.5. Sector de automotores nuevos y usados (E770-E789)
      gVehNuevo: this.get_gVehNuevo(item),
    }));
  }

  /**E8.1. Campos que describen el precio, tipo de cambio y valor total de la operación por ítem (E720-E729)*/
  private get_gValorItem(item: CompleteItem) {
    const monto = item.monto;
    if (!monto) return;

    return {
      // E721: del repo original: "Mejor no tocar como el usuario envia desde el JSON"
      dPUniProSer: monto.precioUnitario,

      // E725
      dTiCamIt: monto.cambio,

      // E727
      dTotBruOpeItem: monto.precioTotal,

      // E8.1.1 Campos que describen los descuentos, anticipos y valor total por ítem (EA001-EA050)
      gValorRestaItem: this.get_gValorRestaItem(monto),
    };
  }

  /**E8.1.1 Campos que describen los descuentos, anticipos y valor total por ítem (EA001-EA050)*/
  private get_gValorRestaItem(monto: CompleteMonto) {
    return {
      // EA002
      dDescItem: monto.descuento,

      // EA003
      dPorcDesIt: monto.procentajeDescuentoPorItem,

      // EA004
      dDescGloItem: monto.descuentoGlobalItem,

      // EA006
      dAntPreUniIt: monto.anticipo,

      // EA007
      dAntGloPreUniIt: monto.anticipoGlobalItem,

      // EA008
      dTotOpeItem: monto.totalOperacion,

      // EA009
      dTotOpeGs: monto.totalOperacionGuaranies,
    };
  }

  /**E8.2. Campos que describen el IVA de la operación por ítem (E730-E739)*/
  private get_gCamIVA(item: CompleteItem) {
    const impuesto = item.impuesto;
    if (!impuesto) return;

    return {
      // E731
      iAfecIVA: impuesto.ivaTipo,

      // E732
      dDesAfecIVA: impuesto.ivaTipoDescripcion,

      // E733
      dPropIVA: impuesto.proporcionGravada,

      // E734
      dTasaIVA: impuesto.iva,

      // E735
      dBasGravIVA: impuesto.ivaBase,

      // E736
      dLiqIVAItem: impuesto.liquidacionIvaPorItem,

      // E737
      // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_013_MT_V150.pdf/ba73ec3b-5901-ae28-5d8c-9bed5632ab89?t=1687353747529
      dBasExe: impuesto.baseExentaIva,
    };
  }

  /**E8.4. Grupo de rastreo de la mercadería (E750-E760)*/
  private get_gRasMerc(item: CompleteItem) {
    return {
      // E751
      dNumLote: item.lote,

      // E752
      dVencMerc: item.vencimiento,

      // E753
      dNSerie: item.numeroSerie,

      // E754
      dNumPedi: item.numeroPedido,

      // E755
      dNumSegui: item.numeroSeguimiento,

      // E759
      dNumReg: item.registroSenave,

      // E760
      dNumRegEntCom: item.registroEntidadComercial,
    };
  }

  /**E8.5. Sector de automotores nuevos y usados (E770-E789)*/
  private get_gVehNuevo(item: CompleteItem) {
    const sectorAutomotor = item.sectorAutomotor;
    if (!sectorAutomotor) return;

    return {
      // E771
      iTipOpVN: sectorAutomotor.tipo,

      // E772
      dDesTipOpVN: sectorAutomotor.tipoDescripcion,

      // E773
      dChasis: sectorAutomotor.chasis,

      // E774
      dColor: sectorAutomotor.color,

      // E775
      dPotencia: sectorAutomotor.potencia,

      // E776
      dCapMot: sectorAutomotor.capacidadMotor,

      // E777
      dPNet: sectorAutomotor.pesoNeto,

      // E778
      dPBruto: sectorAutomotor.pesoBruto,

      // E779
      iTipCom: sectorAutomotor.tipoCombustible,

      // E780
      dDesTipCom: sectorAutomotor.tipoCombustibleDescripcion,

      // E781
      dNroMotor: sectorAutomotor.numeroMotor,

      // E782
      dCapTracc: sectorAutomotor.capacidadTraccion,

      // E783
      dAnoFab: sectorAutomotor.año,

      // E784
      cTipVeh: sectorAutomotor.tipoVehiculo,

      // E785
      dCapac: sectorAutomotor.capacidadPasajeros,

      // E786
      dCilin: sectorAutomotor.cilindradas,
    };
  }
}

export default new ItemsXMLSG();
