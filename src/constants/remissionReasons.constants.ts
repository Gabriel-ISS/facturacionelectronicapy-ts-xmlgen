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
      code: RemissionReason.TRASLADO_POR_VENTAS, 
      description: "Traslado por ventas",
      
    },
    { 
      code: RemissionReason.TRASLADO_POR_CONSIGNACION, 
      description: "Traslado por consignación",
      
    },
    { 
      code: RemissionReason.EXPORTACION, 
      description: "Exportación",
      
    },
    { 
      code: RemissionReason.TRASLADO_POR_COMPRA, 
      description: "Traslado por compra",
      
    },
    { 
      code: RemissionReason.IMPORTACION, 
      description: "Importación",
      
    },
    { 
      code: RemissionReason.TRASLADO_POR_DEVOLUCION, 
      description: "Traslado por devolución",
      
    },
    { 
      code: RemissionReason.TRASLADO_ENTRE_LOCALES_DE_LA_EMPRESA, 
      description: "Traslado entre locales de la empresa",
      
    },
    { 
      code: RemissionReason.TRASLADO_DE_BIENES_POR_TRANSFORMACION, 
      description: "Traslado de bienes por transformación",
      
    },
    { 
      code: RemissionReason.TRASLADO_DE_BIENES_POR_REPARACION, 
      description: "Traslado de bienes por reparación",
      
    },
    { 
      code: RemissionReason.TRASLADO_POR_EMISOR_MOVIL, 
      description: "Traslado por emisor móvil",
      
    },
    { 
      code: RemissionReason.EXHIBICION_O_DEMOSTRACION, 
      description: "Exhibición o demostración",
      
    },
    { 
      code: RemissionReason.PARTICIPACION_EN_FERIAS, 
      description: "Participación en ferias",
      
    },
    { 
      code: RemissionReason.TRASLADO_DE_ENCOMIENDA, 
      description: "Traslado de encomienda",
      
    },
    { 
      code: RemissionReason.DECOMISO, 
      description: "Decomiso",
      
    },
    { 
      code: RemissionReason.OTRO, 
      description: "Otro",
      
    },
    
  ]