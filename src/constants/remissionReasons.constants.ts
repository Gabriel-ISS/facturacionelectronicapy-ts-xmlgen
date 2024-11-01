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
      id: RemissionReason.TRASLADO_POR_VENTAS, 
      description: "Traslado por ventas",
      
    },
    { 
      id: RemissionReason.TRASLADO_POR_CONSIGNACION, 
      description: "Traslado por consignación",
      
    },
    { 
      id: RemissionReason.EXPORTACION, 
      description: "Exportación",
      
    },
    { 
      id: RemissionReason.TRASLADO_POR_COMPRA, 
      description: "Traslado por compra",
      
    },
    { 
      id: RemissionReason.IMPORTACION, 
      description: "Importación",
      
    },
    { 
      id: RemissionReason.TRASLADO_POR_DEVOLUCION, 
      description: "Traslado por devolución",
      
    },
    { 
      id: RemissionReason.TRASLADO_ENTRE_LOCALES_DE_LA_EMPRESA, 
      description: "Traslado entre locales de la empresa",
      
    },
    { 
      id: RemissionReason.TRASLADO_DE_BIENES_POR_TRANSFORMACION, 
      description: "Traslado de bienes por transformación",
      
    },
    { 
      id: RemissionReason.TRASLADO_DE_BIENES_POR_REPARACION, 
      description: "Traslado de bienes por reparación",
      
    },
    { 
      id: RemissionReason.TRASLADO_POR_EMISOR_MOVIL, 
      description: "Traslado por emisor móvil",
      
    },
    { 
      id: RemissionReason.EXHIBICION_O_DEMOSTRACION, 
      description: "Exhibición o demostración",
      
    },
    { 
      id: RemissionReason.PARTICIPACION_EN_FERIAS, 
      description: "Participación en ferias",
      
    },
    { 
      id: RemissionReason.TRASLADO_DE_ENCOMIENDA, 
      description: "Traslado de encomienda",
      
    },
    { 
      id: RemissionReason.DECOMISO, 
      description: "Decomiso",
      
    },
    { 
      id: RemissionReason.OTRO, 
      description: "Otro",
      
    },
    
  ]