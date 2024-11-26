import * as xml2js from 'xml2js';
import DateHelper from '../helpers/DateHelper';
import {
  CancellationEventInput,
  CancellationEventSchema,
} from '../schemas/events/CancellationEvent.schema';
import {
  DisablingEventInput,
  DisablingEventSchema,
} from '../schemas/events/DisablingEvent.schema';
import { SIFENEvent } from '../types/Events';

import {
  ConformityEventInput,
  ConformityEventSchema,
} from '../schemas/events/ConformityEvent.schema';
import {
  DisconformityEventInput,
  DisconformityEventSchema,
} from '../schemas/events/DisconformityEvent.schema';
import {
  IgnoranceEventInput,
  IgnoranceEventSchema,
} from '../schemas/events/IgnoranceEvent.schema';
import {
  NominationEventInput,
  NominationEventSchema,
} from '../schemas/events/NominationEvent.schema';
import {
  NotificationEventInput,
  NotificationEventSchema,
} from '../schemas/events/NotificationEvent.schema';
import {
  TransportUpdateEventInput,
  TransportUpdateEventSchema,
} from '../schemas/events/TransportUpdateEvent.schema';
import { removeUndefinedValues } from '../helpers/removeUndefinedValues';

type Pair<E extends SIFENEvent, D> = { event: E } & D;

export type EventData =
  | Pair<SIFENEvent.CANCELACION, CancellationEventInput>
  | Pair<SIFENEvent.INUTILIZACION, DisablingEventInput>
  | Pair<SIFENEvent.CONFORMIDAD, ConformityEventInput>
  | Pair<SIFENEvent.DISCONFORMIDAD, DisconformityEventInput>
  | Pair<SIFENEvent.DESCONOCIMIENTO, IgnoranceEventInput>
  | Pair<SIFENEvent.NOTIFICACION, NotificationEventInput>
  | Pair<SIFENEvent.NOMINACION, NominationEventInput>
  | Pair<SIFENEvent.ACTUALIZACION_DATOS_TRANSPORTE, TransportUpdateEventInput>;

/** VER:
 * 11. Gestión de eventos
 * Tabla J: Resumen de los eventos de SIFEN según los actores
 * Tabla K: Correcciones de los eventos del Receptor en el SIFEN
 */
class EventService {
  private readonly builder = new xml2js.Builder({
    xmldec: {
      version: '1.0',
      encoding: 'UTF-8',
      standalone: false,
    },
    renderOpts: {
      // Para firmar tiene que estar normalizado
      pretty: false,
    },
  });

  public generateXMLEvent(
    _id: number,
    data: EventData,
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let xml = await this.generateXMLEventoService(data);
        xml = xml.replace(
          '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
          '',
        );

        let soapXMLData = this.wrapEvent(_id, xml);
        resolve(soapXMLData);
      } catch (error) {
        reject(error);
      }
    });
  }

  private wrapEvent(_id: number, xml: string) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">\n\
                <env:Header/>\n\
                <env:Body>\n\
                    <rEnviEventoDe xmlns="http://ekuatia.set.gov.py/sifen/xsd">\n\
                      <dId>${_id}</dId>\n\
                      <dEvReg>${xml}</dEvReg>\n\
                    </rEnviEventoDe>\n\
                </env:Body>\n\
            </env:Envelope>\n`;
  }

  /**
   * Metodo principal de generacion de XML del Evento
   * @param params
   * @param data
   * @returns
   */
  private generateXMLEventoService(data: EventData) {
    const result = {
      // GDE000
      gGroupGesEve: {
        $: {
          xmlns: 'http://ekuatia.set.gov.py/sifen/xsd',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://ekuatia.set.gov.py/sifen/xsd/siRecepEvento_v150.xsd',
        },

        // GDE001
        rGesEve: {

          // GDE002
          rEve: {
            $: {
              // GDE003
              Id: 1,
            },

            // GDE004
            dFecFirma: DateHelper.getIsoDateTime(new Date()),

            // GDE005
            dVerFor: 150,

            // GDE007
            gGroupTiEvt: removeUndefinedValues(this.get_gGroupTiEvt(data)),
          },
        },
      },
    };

    return this.builder.buildObject(result); //Para firmar tiene que estar normalizado
  }

  private get_gGroupTiEvt(data: EventData) {
    switch (data.event) {
      case SIFENEvent.CANCELACION:
        return this.eventoEmisorCancelacion(data);
      case SIFENEvent.INUTILIZACION:
        return this.eventoEmisorInutilizacion(data);
      case SIFENEvent.CONFORMIDAD:
        return this.eventoReceptorConformidad(data);
      case SIFENEvent.DISCONFORMIDAD:
        return this.eventosReceptorDisconformidad(data);
      case SIFENEvent.DESCONOCIMIENTO:
        return this.eventosReceptorDesconocimiento(data);
      case SIFENEvent.NOTIFICACION:
        return this.eventosReceptorNotificacionRecepcion(data);
      case SIFENEvent.NOMINACION:
        return this.eventoEmisorNominacion(data);
      case SIFENEvent.ACTUALIZACION_DATOS_TRANSPORTE:
        return this.eventoEmisorActualizacionDatosTransporte(data);
      default:
        throw new Error('Tipo de Evento no soportado');
    }
  }

  private eventoEmisorCancelacion(data: CancellationEventInput) {
    const d = CancellationEventSchema.parse(data);

    return {
      // GEC001
      rGeVeCan: {
        // GEC002
        Id: d.cdc,

        // GEC003
        mOtEve: d.motivo,
      },
    };
  }

  private eventoEmisorInutilizacion(data: DisablingEventInput) {
    const d = DisablingEventSchema.parse(data);

    return {
      // GEI001
      rGeVeInu: {
        // GEI002
        dNumTim: d.timbrado,

        // GEI003
        dEst: d.establecimiento,

        // GEI004
        dPunExp: d.punto,

        // GEI005
        dNumIn: d.desde,

        // GEI006
        dNumFin: d.hasta,

        // GEI007
        iTiDE: d.tipoDocumento,

        // GEI008
        mOtEve: d.motivo,

        // GEI009
        // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_010_MT_V150.pdf/d64a693b-6c63-86e1-ec6a-d4fe5ec4eeea?t=1687353747196
        dSerieNum: d.serie,
      },
    };
  }

  private eventoReceptorConformidad(data: ConformityEventInput) {
    const d = ConformityEventSchema.parse(data);

    return {
      // GCO001
      rGeVeConf: {
        // GCO002
        Id: d.cdc,

        // GCO003
        iTipConf: d.tipoConformidad,

        // GCO004
        dFecRecep: d.fechaRecepcion,
      },
    };
  }

  private eventosReceptorDisconformidad(data: DisconformityEventInput) {
    const d = DisconformityEventSchema.parse(data);

    return {
      // GDI001
      rGeVeDisconf: {
        // GDI002
        Id: d.cdc,

        // GDI003
        mOtEve: d.motivo,
      },
    };
  }

  private eventosReceptorDesconocimiento(data: IgnoranceEventInput) {
    const d = IgnoranceEventSchema.parse(data);

    return {
      // GED001
      rGeVeDescon: {
        // GED002
        Id: d.cdc,

        // GED003
        dFecEmi: d.fechaEmision,

        // GED004
        dFecRecep: d.fechaRecepcion,

        // GED005
        iTipRec: d.contribuyente,

        // GED006
        dNomRec: d.nombre,

        // GED007
        dRucRec: d.rucID,

        // GED008
        dDVRec: d.rucDV,

        // GED009
        dTipIDRec: d.documentoTipo,

        // GED010
        dNumID: d.documentoNumero,

        // GED011
        mOtEve: d.motivo,
      },
    };
  }

  private eventosReceptorNotificacionRecepcion(data: NotificationEventInput) {
    const d = NotificationEventSchema.parse(data);

    return {
      // GEN001
      rGeVeNotRec: {
        // GEN002
        Id: d.cdc,

        // GEN003
        dFecEmi: d.fechaEmision,

        // GEN004
        dFecRecep: d.fechaRecepcion,

        // GEN005
        iTipRec: d.contribuyente,

        // GEN006
        dNomRec: d.nombre,

        // GEN007
        dRucRec: d.rucID,

        // GEN008
        dDVRec: d.rucDV,

        // GEN009
        dTipIDRec: d.documentoTipo,

        // GEN010
        dNumID: d.documentoNumero,

        // GEN011
        dTotalGs: d.totalPYG,
      },
    };
  }

  // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_014_MT_V150X.pdf/dbbb0294-8678-357a-1657-bcd0318077f9?t=1706189857282
  private eventoEmisorNominacion(data: NominationEventInput) {
    const d = NominationEventSchema.parse(data);

    return {
      // GENFE001
      rGEveNom: {
        // GENFE002
        Id: d.cdc,

        // GENFE003
        mOtEve: d.motive,

        // GENFE004
        iNatRec: d.contribuyente,

        // GENFE027
        iTiOpe: d.tipoOperacion,

        // GENFE005
        cPaisRec: d.pais,

        // GENFE006
        dDesPaisRe: d.paisDescripcion,

        // GENFE007
        iTiContRec: d.tipoReceptor,

        // GENFE008
        dRucRec: d.rucID,

        // GENFE009
        dDVRec: d.rucDV,

        // GENFE010
        iTipIDRec: d.documentoTipo,

        // GENFE011
        dDTipIDRec: d.descripcionTipoDocumento,

        // GENFE012
        dNumIDRec: d.documentoNumero,

        // GENFE013
        dNomRec: d.razonSocial,

        // GENFE014
        dNomFanRec: d.nombreFantasia,

        // GENFE015
        dDirRec: d.direccion,

        // GENFE016
        dNumCasRec: d.numeroCasa,

        // GENFE017
        cDepRec: d.departamento,

        // GENFE018
        dDesDepRec: d.descripcionDepartamento,

        // GENFE019
        cDisRec: d.distrito,

        // GENFE020
        dDesDisRec: d.descripcionDistrito,

        // GENFE021
        cCiuRec: d.ciudad,

        // GENFE022
        dDesCiuRec: d.descripcionCiudad,

        // GENFE023
        dTelRec: d.telefono,

        // GENFE024
        dCelRec: d.celular,

        // GENFE025
        dEmailRec: d.email,

        // GENFE026
        dCodCliente: d.codigo,
      },
    };
  }

  private eventoEmisorActualizacionDatosTransporte(
    data: TransportUpdateEventInput,
  ) {
    const d = TransportUpdateEventSchema.parse(data);

    const entrega = d.entrega;
    const transportista = d.transportista;
    const chofer = transportista.chofer;
    const vehiculo = entrega.vehiculo;

    return {
      // GET001
      rGeVeTr: {
        // GET002
        Id: d.cdc,

        // GET003
        dMotEv: d.motivo,

        // GET004
        cDepEnt: entrega.departamento,

        // GET005
        dDesDepEnt: entrega.departamento,

        // GET006
        cDisEnt: entrega.distrito,

        // GET007
        dDesDisEnt: entrega.descripcionDistrito,

        // GET008
        cCiuEnt: entrega.ciudad,

        // GET009
        dDesCiuEnt: entrega.descripcionCiudad,

        // GET010
        dDirEnt: entrega.direccion,

        // GET011
        dNumCas: entrega.numeroCasa,

        // GET012
        dCompDir1: entrega.direccionComplementaria1,

        // GET013
        dNomChof: chofer.nombre,

        // GET014
        dNumIDChof: chofer.documentoNumero,

        // GET015
        iNatTrans: transportista.contribuyente,

        // GET016
        dRucTrans: transportista.rucID,

        // GET017
        dDVTrans: transportista.rucDV,

        // GET018
        dNomTrans: transportista.nombre,

        // GET019
        iTipIDTrans: transportista.documentoTipo,

        // GET020
        dDTipIDTrans: transportista.descripcionTipoDocumento,

        // GET021
        dNumIDTrans: transportista.documentoNumero,

        // GET022
        iTipTrans: entrega.tipoTransporte,

        // GET023
        dDesTipTrans: entrega.descripcionTipoTransporte,

        // GET024
        iModTrans: entrega.modalidadTransporte,

        // GET025
        dDesModTrans: entrega.descripcionModalidadTransporte,

        // GET026
        dTiVehTras: vehiculo.tipo,

        // GET027
        dMarVeh: vehiculo.marca,

        // GET028
        dTipIdenVeh: vehiculo.documentoTipo,

        // GET029
        dNroIDVeh: vehiculo.documentoNumero,

        // GET030
        dNroMatVeh: vehiculo.numeroMatricula,
      },
    };
  }
}

export default new EventService();
