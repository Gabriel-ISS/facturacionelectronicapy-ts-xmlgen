import { BasicData } from '../services/constants.service';

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

  export const remissionReasons: BasicData<RemissionReason>[] = [
    { 
      _id: RemissionReason.TRASLADO_POR_VENTAS, 
      description: "Traslado por ventas",
      
    },
    { 
      _id: RemissionReason.TRASLADO_POR_CONSIGNACION, 
      description: "Traslado por consignación",
      
    },
    { 
      _id: RemissionReason.EXPORTACION, 
      description: "Exportación",
      
    },
    { 
      _id: RemissionReason.TRASLADO_POR_COMPRA, 
      description: "Traslado por compra",
      
    },
    { 
      _id: RemissionReason.IMPORTACION, 
      description: "Importación",
      
    },
    { 
      _id: RemissionReason.TRASLADO_POR_DEVOLUCION, 
      description: "Traslado por devolución",
      
    },
    { 
      _id: RemissionReason.TRASLADO_ENTRE_LOCALES_DE_LA_EMPRESA, 
      description: "Traslado entre locales de la empresa",
      
    },
    { 
      _id: RemissionReason.TRASLADO_DE_BIENES_POR_TRANSFORMACION, 
      description: "Traslado de bienes por transformación",
      
    },
    { 
      _id: RemissionReason.TRASLADO_DE_BIENES_POR_REPARACION, 
      description: "Traslado de bienes por reparación",
      
    },
    { 
      _id: RemissionReason.TRASLADO_POR_EMISOR_MOVIL, 
      description: "Traslado por emisor móvil",
      
    },
    { 
      _id: RemissionReason.EXHIBICION_O_DEMOSTRACION, 
      description: "Exhibición o demostración",
      
    },
    { 
      _id: RemissionReason.PARTICIPACION_EN_FERIAS, 
      description: "Participación en ferias",
      
    },
    { 
      _id: RemissionReason.TRASLADO_DE_ENCOMIENDA, 
      description: "Traslado de encomienda",
      
    },
    { 
      _id: RemissionReason.DECOMISO, 
      description: "Decomiso",
      
    },
    { 
      _id: RemissionReason.OTRO, 
      description: "Otro",
      
    },
    
  ]