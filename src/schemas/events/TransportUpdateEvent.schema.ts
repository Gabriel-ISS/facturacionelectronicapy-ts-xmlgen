import { z } from 'zod';
import CommonValidators from '../../helpers/validation/CommonValidators';
import ZodValidator from '../../helpers/validation/ZodValidator';
import dbService from '../../services/db.service';
import { IdentityDocumentCarriers } from '../../data/idDocsCarriers.table';
import { TransportType } from '../../data/transportTypes.table';
import { TransportModality } from '../../data/transportModalities.table';
import { VehicleIdentification } from '../../data/vehicleIdentifications.table';
import { Path } from '../../helpers/Path';
import { TaxpayerNotTaxpayer } from '../../data/taxpayerNotTaxpayer.table';

export enum TransportUpdateMotive {
  CAMBIO_LOCAL_ENTREGA = 1,
  CAMBIO_CHOFER = 2,
  CAMBIO_TRANSPORTISTA = 3,
  CAMBIO_VEHICULO = 4,
}

// GET001
export const TransportUpdateEventSchema = z
  .object({
    // GET002
    cdc: CommonValidators.cdc(),

    // GET003
    motivo: z.nativeEnum(TransportUpdateMotive),

    entrega: z.object({
      // GET004
      departamento: CommonValidators.department().optional(),

      // GET006
      distrito: CommonValidators.district().optional(),

      // GET008
      ciudad: CommonValidators.city().optional(),

      // GET010
      direccion: CommonValidators.address().optional(),

      // GET011
      numeroCasa: CommonValidators.houseNumber().optional(),

      // GET012
      direccionComplementaria1: CommonValidators.address().optional(),

      // GET022
      tipoTransporte: z.nativeEnum(TransportType).optional(),

      // GET024
      modalidadTransporte: z.nativeEnum(TransportModality).optional(),

      vehiculo: z.object({
        // GET026
        tipo: z.string().min(4).max(10).optional(),

        // GET027
        marca: z.string().min(1).max(10).optional(),

        // GET028
        documentoTipo: z.nativeEnum(VehicleIdentification).optional(),

        // GET029
        documentoNumero: z.string().min(1).max(20).optional(),

        // GET030
        numeroMatricula: z.string().length(6).optional(),
      }),
    }).superRefine((data, ctx) => {
      CommonValidators.location(
        ctx,
        data.departamento,
        data.distrito,
        data.ciudad,
      );
    }),

    transportista: z.object({
      chofer: z
        .object({
          // GET013: TODO_NT: obligatorio SI, pero "Obligatorio si ..." debería ser opcional
          nombre: CommonValidators.name(),

          // GET014
          documentoNumero: CommonValidators.identityDocNumber(),
        })
        .optional(),

      // GET015
      contribuyente: CommonValidators.taxpayer().optional(),

      // para calcular GET016 y GET017
      ruc: CommonValidators.ruc().optional(),

      // GET018
      nombre: CommonValidators.name().optional(),

      // GET019
      documentoTipo: z.nativeEnum(IdentityDocumentCarriers).optional(),

      // GET021
      documentoNumero: CommonValidators.identityDocNumber().optional(),
    }),
  })
  .transform((data, ctx) => {
    const validator = new ZodValidator(ctx, data);

    const deliveryPath = new Path<typeof data>('entrega');
    const vehiclePath = deliveryPath.concat('vehiculo');
    const transporterPath = new Path<typeof data>('transportista');
    const driverPath = transporterPath.concat('chofer');

    /**GET003 = 1 */
    const isDeliveryLocationChange =
      data.motivo == TransportUpdateMotive.CAMBIO_LOCAL_ENTREGA;
    /**GET003 = 2 */
    const isDriverChange = data.motivo == TransportUpdateMotive.CAMBIO_CHOFER;
    /**GET003 = 3 */
    const isTransporterChange =
      data.motivo == TransportUpdateMotive.CAMBIO_TRANSPORTISTA;
    /**GET003 = 4 */
    const isVehicleChange =
      data.motivo == TransportUpdateMotive.CAMBIO_VEHICULO;
    /**GET015 = 1 */
    const isTaxpayer =
      data.transportista.contribuyente == TaxpayerNotTaxpayer.CONTRIBUYENTE;
    /**GET015 = 2 */
    const isNotTaxpayer =
      data.transportista.contribuyente == TaxpayerNotTaxpayer.NO_CONTRIBUYENTE;

    // GET004, GET008, GET010, GET011
    {
      /*
      Obligatorio si GET003=1
      */
      if (isDeliveryLocationChange) {
        validator.requiredField(deliveryPath.concat('departamento'));
        validator.requiredField(deliveryPath.concat('ciudad'));
        validator.requiredField(deliveryPath.concat('direccion'));
        validator.requiredField(deliveryPath.concat('numeroCasa'));
      }
    }

    // GET012
    {
      /* TODO_TEST: asumo que en caso contrario es obligatorio o si no para que esta esta condición
      Opcional si GET003=1
      */
      if (!isDeliveryLocationChange) {
        validator.requiredField(
          deliveryPath.concat('direccionComplementaria1'),
        );
      }
    }

    // GET013, GET014
    {
      /*
      Obligatorio si GET003=2
      */
      if (isDriverChange) {
        validator.requiredField(driverPath);
      }
    }

    // GET015, GET018
    {
      /*
      Obligatorio si GET003=3
      */
      if (isTransporterChange) {
        validator.requiredField(transporterPath.concat('contribuyente'));
        validator.requiredField(transporterPath.concat('nombre'));
      }
    }

    // GET016, GET017
    {
      /*
      Obligatorio si GET015 = 1
      No informar si GET015 ≠ 1
      */
      if (isTaxpayer) {
        validator.requiredField(transporterPath.concat('ruc'));
      } else {
        validator.undesiredField(transporterPath.concat('ruc'));
      }
    }

    // GET019
    {
      /*
      Obligatorio si GET015 = 2
      No informar si GET015 = 1
      */
     if (isNotTaxpayer) {
       validator.requiredField(transporterPath.concat('documentoTipo'));
     } else {
       validator.undesiredField(transporterPath.concat('documentoTipo'));
     }
    }

    // GET021
    {
      /*
      Obligatorio si existe el campo GET019
      */
     if (data.transportista.documentoTipo) {
       validator.requiredField(transporterPath.concat('documentoNumero'));
     }
    }

    // GET022, GET024, GET026, GET027, GET028
    {
      /*
      Obligatorio si GET003=4
      */
     if (isVehicleChange) {
      validator.requiredField(deliveryPath.concat('tipoTransporte'));
      validator.requiredField(deliveryPath.concat('modalidadTransporte'));
      validator.requiredField(vehiclePath.concat('tipo'));
      validator.requiredField(vehiclePath.concat('marca'));
      validator.requiredField(vehiclePath.concat('documentoTipo'));
     }
    }

    // GET029
    {
      /*
      Debe informarse cuando el GET028=1
      */
      if (data.entrega.vehiculo.documentoTipo == VehicleIdentification.NUMERO_DE_IDENTIFICACION_DEL_VEHICULO) {
        validator.requiredField(vehiclePath.concat('documentoNumero'));
      }
    }

    // GET030
    {
      /*
      Debe informarse cuando el GET028=2
      */
      if (data.entrega.vehiculo.documentoTipo == VehicleIdentification.NUMERO_DE_MATRICULA_DEL_VEHICULO) {
        validator.requiredField(vehiclePath.concat('numeroMatricula'));
      }
    }

    const entrega = data.entrega;
    const transportista = data.transportista;
    const chofer = transportista.chofer;
    const vehiculo = entrega.vehiculo;

    const [rucID, rucDV] = transportista.ruc?.split('-') ?? [];

    return {
      ...data,

      entrega: {
        ...entrega,

        // GET005
        descripcionDepartamento: dbService
          .departments
          ._findByIdIfExist(entrega.departamento)?.description,

        // GET007
        descripcionDistrito: dbService
          .districts
          ._findByIdIfExist(entrega.distrito)?.description,

        // GET009
        descripcionCiudad: dbService
          .cities
          ._findByIdIfExist(entrega.ciudad)?.description,

        // GET023
        descripcionTipoTransporte: dbService
          .transportTypes
          ._findByIdIfExist(data.entrega.tipoTransporte)?.description,

        // GET025
        descripcionModalidadTransporte: dbService
          .transportModalities
          ._findByIdIfExist(data.entrega.modalidadTransporte)?.description,

        vehiculo: {
          ...vehiculo,
        },
      },

      transportista: {
        ...transportista,

        // GET016
        rucID: rucID as string | undefined,

        // GET017
        rucDV: rucDV as string | undefined,

        // GET020
        descripcionTipoDocumento: dbService
          .idDocsCarriers
          ._findByIdIfExist(transportista.documentoTipo)?.description,

        chofer: {
          ...chofer,
        },
      },
    };
  });

export type TransportUpdateEventInput = z.infer<
  typeof TransportUpdateEventSchema
>;
