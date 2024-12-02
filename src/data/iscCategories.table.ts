import Table from '../helpers/Table';

export enum IscCategory {
  SECCION_I____CIGARRILLOS__TABACOS__ESENCIAS_Y_OTROS_DERIVADOS_DEL_TABACO_ = 1,
  SECCION_II____BEBIDAS_CON_Y_SIN_ALCOHOL_ = 2,
  SECCION_III____ALCOHOLES_Y_DERIVADOS_DEL_ALCOHOL_ = 3,
  SECCION_IV___COMBUSTIBLES_ = 4,
  SECCION_V___ARTICULOS_CONSIDERADOS_DE_LUJO_ = 5,
}

export default new Table<{
  0: ['_id', IscCategory];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    [
      1,
      'Sección I - (Cigarrillos, Tabacos, Esencias y Otros derivados del Tabaco)',
    ],
    [2, 'Sección II - (Bebidas con y sin alcohol)'],
    [3, 'Sección III - (Alcoholes y Derivados del alcohol)'],
    [4, 'Sección IV- (Combustibles)'],
    [5, 'Sección V- (Artículos considerados de lujo)'],
  ],
);
