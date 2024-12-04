import Table from '../helpers/Table';

export enum MeasurementUnit {
  UNIDAD = 77,
  KILOGRAMOS_S__METRO_CUADRADO = 79,
  KILOGRAMOS = 83,
  GRAMOS = 86,
  METROS = 87,
  MILILITROS = 88,
  LITROS = 89,
  MILIGRAMOS = 90,
  CENTIMETROS = 91,
  CENTIMETROS_CUADRADOS = 92,
  CENTIMETROS_CUBICOS = 93,
  PULGADAS = 94,
  MILIMETROS = 95,
  MILIMETROS_CUADRADOS = 96,
  ANO = 97,
  MES = 98,
  TONELADA = 99,
  HORA = 100,
  MINUTO = 101,
  DIA = 102,
  YARDAS = 103,
  DETERMINACION = 104,
  METROS_representation_MT = 108,
  METROS_CUADRADOS = 109,
  METROS_CUBICOS = 110,

  // VER: https://www.dnit.gov.py/documents/20123/420595/NT_E_KUATIA_023_MT_V150.pdf/9580922b-5dd5-60f9-4857-ae66a757898f?t=1724956850006
  BOVINAS = 111,
  CURIE = 112,
  DOCENA = 113,
  GALONES_US = 114,
  GRUESAS = 115,
  KILOGRAMO_BRUTO = 116,
  KITS = 117,
  MICROCURIE = 118,
  MILLICURIE = 119,
  MILLIAR = 120,
  PAR = 121,
  PIES = 122,
  PIES_CUADRADOS = 123,
  PIEZAS = 124,
  QUILATE = 125,
  RESMAS = 126,
  ROLLOS = 127,
  KILOWATT_HORA = 128,
  MAZOS = 129,
  TAMBORES = 130,
  CAJA = 131,
  JUEGO = 132,
  PAQUETE = 133,
  BOLSA = 134,
  DOCENA_PAR = 135,
  POTE = 136,
  FARDOS = 137,
  BULTO = 138,
  CESTA = 139,
  PESO_BASE = 140,

  RACION = 569,
  KILOMETROS = 625,
  METRO_LINEAL = 660,
  SEGUNDO = 666,
  UNIDAD_MEDIDA_GLOBAL = 885,
  HECTAREAS = 869,
  POR_MILAJE = 891,
  COSTO_POR_MIL = 2366,
  UNIDAD_INTERNACIONAL = 2329,
}

export default new Table<{
  0: ['_id', MeasurementUnit];
  1: ['description', string];
  2: ['representation', string];
}>(
  ['_id', 'description', 'representation'],
  [
    [77, 'Unidad', 'UNI'],
    [79, 'Kilogramos s/ metro cuadrado', 'kg/m2'],
    [83, 'Kilogramos', 'kg'],
    [86, 'Gramos', 'g'],
    [87, 'Metros', 'm'],
    [88, 'Mililitros', 'ML'],
    [89, 'Litros', 'LT'],
    [90, 'Miligramos', 'MG'],
    [91, 'Centimetros', 'CM'],
    [92, 'Centimetros cuadrados', 'CM2'],
    [93, 'Centimetros cubicos', 'CM3'],
    [94, 'Pulgadas', 'PUL'],
    [95, 'Milímetros', 'MM'],
    [96, 'Milímetros cuadrados', 'MM2'],
    [97, 'Año', 'AA'],
    [98, 'Mes', 'ME'],
    [99, 'Tonelada', 'TN'],
    [100, 'Hora', 'Hs'],
    [101, 'Minuto', 'Mi'],
    [102, 'Día', 'Di'],
    [103, 'Yardas', 'Ya'],
    [104, 'Determinación', 'DET'],
    [108, 'Metros', 'MT'],
    [109, 'Metros cuadrados', 'M2'],
    [110, 'Metros cúbicos', 'M3'],
    [111, '4A', 'Bovinas'],
    [112, 'Ci', 'Curie'],
    [113, 'DOC', 'Docena'],
    [114, 'GLL', 'Galones (US) (3,7843 LT)'],
    [115, 'GRO', 'Gruesas'],
    [116, 'E4', 'Kilogramo Bruto'],
    [117, 'KT', 'Kits'],
    [118, 'M5', 'Microcurie'],
    [119, 'MCU', 'Milicurie'],
    [120, 'MIL', 'Millar'],
    [121, 'PAR', 'Par'],
    [122, 'FOT', 'Pies'],
    [123, 'FTK', 'Pies Cuadradas'],
    [124, 'PCE', 'Piezas'],
    [125, 'KLT', 'Quilate'],
    [126, 'RM', 'Resmas'],
    [127, 'RO', 'Rollos'],
    [128, 'kWh', '1000 Kilowatt Hora'],
    [129, 'U(JGO)', 'Mazos'],
    [130, 'DR', 'Tambores'],
    [131, 'BX', 'Caja'],
    [132, 'SET', 'Juego'],
    [133, 'PK', 'Paquete'],
    [134, 'BG', 'Bolsa'],
    [135, 'DPC', 'Docena Par'],
    [136, 'JR', 'Pote'],
    [137, 'BL', 'Fardos'],
    [138, 'AB', 'Bulto'],
    [139, 'BK', 'Cesta'],
    [140, 'BW', 'Peso Base'],
    [569, 'Ración', 'ración'],
    [625, 'Kilómetros', 'Km'],
    [660, 'Metro lineal', 'ml'],
    [666, 'Segundo', 'Se'],
    [885, 'Unidad Medida Global', 'GL'],
    [869, 'Hectáreas', 'ha'],
    [891, 'Por Milaje', 'pm'],
    [2366, 'Costo por Mil', 'CPM'],
    [2329, 'Unidad Internacional', 'UI'],
  ],
);