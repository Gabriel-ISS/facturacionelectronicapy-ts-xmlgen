import { BasicData } from '../services/constants.service';

export enum IscCategory {
  SECCION_I____CIGARRILLOS__TABACOS__ESENCIAS_Y_OTROS_DERIVADOS_DEL_TABACO_ = 1,
  SECCION_II____BEBIDAS_CON_Y_SIN_ALCOHOL_ = 2,
  SECCION_III____ALCOHOLES_Y_DERIVADOS_DEL_ALCOHOL_ = 3,
  SECCION_IV___COMBUSTIBLES_ = 4,
  SECCION_V___ARTICULOS_CONSIDERADOS_DE_LUJO_ = 5,
}

export const iscCategories: BasicData<IscCategory>[] = [
  {
    code: IscCategory.SECCION_I____CIGARRILLOS__TABACOS__ESENCIAS_Y_OTROS_DERIVADOS_DEL_TABACO_,
    description: 'Sección I - (Cigarrillos, Tabacos, Esencias y Otros derivados del Tabaco)',
  },
  {
    code: IscCategory.SECCION_II____BEBIDAS_CON_Y_SIN_ALCOHOL_,
    description: 'Sección II - (Bebidas con y sin alcohol)',
  },
  {
    code: IscCategory.SECCION_III____ALCOHOLES_Y_DERIVADOS_DEL_ALCOHOL_,
    description: 'Sección III - (Alcoholes y Derivados del alcohol)',
  },
  {
    code: IscCategory.SECCION_IV___COMBUSTIBLES_,
    description: 'Sección IV- (Combustibles)',
  },
  {
    code: IscCategory.SECCION_V___ARTICULOS_CONSIDERADOS_DE_LUJO_,
    description: 'Sección V- (Artículos considerados de lujo)',
  },
];
