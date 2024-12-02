import Table from '../helpers/Table';

export enum RemissionReason {
    TRASLADO_POR_VENTAS = 1,
    TRASLADO_POR_CONSIGNACION = 2,
    EXPORTACION = 3,
    TRASLADO_POR_COMPRA = 4,
    IMPORTACION = 5,
    TRASLADO_POR_DEVOLUCION = 6,
    TRASLADO_ENTRE_LOCALES_DE_LA_EMPRESA = 7,
    TRASLADO_DE_BIENES_POR_TRANSFORMACION = 8,
    TRASLADO_DE_BIENES_POR_REPARACION = 9,
    TRASLADO_POR_EMISOR_MOVIL = 10,
    EXHIBICION_O_DEMOSTRACION = 11,
    PARTICIPACION_EN_FERIAS = 12,
    TRASLADO_DE_ENCOMIENDA = 13,
    DECOMISO = 14,
    OTRO = 99,
    
  }

export default new Table<{
  0: ['_id', RemissionReason];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [1, 'Traslado por ventas'],
    [2, 'Traslado por consignación'],
    [3, 'Exportación'],
    [4, 'Traslado por compra'],
    [5, 'Importación'],
    [6, 'Traslado por devolución'],
    [7, 'Traslado entre locales de la empresa'],
    [8, 'Traslado de bienes por transformación'],
    [9, 'Traslado de bienes por reparación'],
    [10, 'Traslado por emisor móvil'],
    [11, 'Exhibición o demostración'],
    [12, 'Participación en ferias'],
    [13, 'Traslado de encomienda'],
    [14, 'Decomiso'],
    [99, 'Otro'],
  ],
);
