import { BasicData } from '../services/constants.service';

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
  METROS_REPRESENTACION_MT = 108,
  METROS_CUADRADOS = 109,
  METROS_CUBICOS = 110,
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

type Data = BasicData<MeasurementUnit> & { representation: string };

// TODO: TRIM PARA TODO ESO
export const measurementUnits: Data[] = [
  {
    _id: MeasurementUnit.UNIDAD,
    description: 'Unidad                      ',
    representation: 'UNI   ',
  },
  {
    _id: MeasurementUnit.KILOGRAMOS_S__METRO_CUADRADO,
    description: 'Kilogramos s/ metro cuadrado',
    representation: 'kg/m2 ',
  },
  {
    _id: MeasurementUnit.KILOGRAMOS,
    description: 'Kilogramos                  ',
    representation: 'kg    ',
  },
  {
    _id: MeasurementUnit.GRAMOS,
    description: 'Gramos                      ',
    representation: 'g     ',
  },
  {
    _id: MeasurementUnit.METROS,
    description: 'Metros                      ',
    representation: 'm     ',
  },
  {
    _id: MeasurementUnit.MILILITROS,
    description: 'Mililitros                  ',
    representation: 'ML    ',
  },
  {
    _id: MeasurementUnit.LITROS,
    description: 'Litros                      ',
    representation: 'LT    ',
  },
  {
    _id: MeasurementUnit.MILIGRAMOS,
    description: 'Miligramos                  ',
    representation: 'MG    ',
  },
  {
    _id: MeasurementUnit.CENTIMETROS,
    description: 'Centimetros                 ',
    representation: 'CM    ',
  },
  {
    _id: MeasurementUnit.CENTIMETROS_CUADRADOS,
    description: 'Centimetros cuadrados       ',
    representation: 'CM2   ',
  },
  {
    _id: MeasurementUnit.CENTIMETROS_CUBICOS,
    description: 'Centimetros cubicos         ',
    representation: 'CM3   ',
  },
  {
    _id: MeasurementUnit.PULGADAS,
    description: 'Pulgadas                    ',
    representation: 'PUL   ',
  },
  {
    _id: MeasurementUnit.MILIMETROS,
    description: 'Milímetros                  ',
    representation: 'MM    ',
  },
  {
    _id: MeasurementUnit.MILIMETROS_CUADRADOS,
    description: 'Milímetros cuadrados        ',
    representation: 'MM2   ',
  },
  {
    _id: MeasurementUnit.ANO,
    description: 'Año                         ',
    representation: 'AA    ',
  },
  {
    _id: MeasurementUnit.MES,
    description: 'Mes                         ',
    representation: 'ME    ',
  },
  {
    _id: MeasurementUnit.TONELADA,
    description: 'Tonelada                    ',
    representation: 'TN    ',
  },
  {
    _id: MeasurementUnit.HORA,
    description: 'Hora                        ',
    representation: 'Hs    ',
  },
  {
    _id: MeasurementUnit.MINUTO,
    description: 'Minuto                      ',
    representation: 'Mi    ',
  },
  {
    _id: MeasurementUnit.DIA,
    description: 'Día                         ',
    representation: 'Di    ',
  },
  {
    _id: MeasurementUnit.YARDAS,
    description: 'Yardas                      ',
    representation: 'Ya    ',
  },
  {
    _id: MeasurementUnit.DETERMINACION,
    description: 'Determinación               ',
    representation: 'DET   ',
  },
  {
    _id: MeasurementUnit.METROS_REPRESENTACION_MT,
    description: 'Metros                      ',
    representation: 'MT    ',
  },
  {
    _id: MeasurementUnit.METROS_CUADRADOS,
    description: 'Metros cuadrados            ',
    representation: 'M2    ',
  },
  {
    _id: MeasurementUnit.METROS_CUBICOS,
    description: 'Metros cúbicos              ',
    representation: 'M3    ',
  },
  {
    _id: MeasurementUnit.RACION,
    description: 'Ración                      ',
    representation: 'ración',
  },
  {
    _id: MeasurementUnit.KILOMETROS,
    description: 'Kilómetros                  ',
    representation: 'Km    ',
  },
  {
    _id: MeasurementUnit.METRO_LINEAL,
    description: 'Metro lineal                ',
    representation: 'ml    ',
  },
  {
    _id: MeasurementUnit.SEGUNDO,
    description: 'Segundo                     ',
    representation: 'Se    ',
  },
  {
    _id: MeasurementUnit.UNIDAD_MEDIDA_GLOBAL,
    description: 'Unidad Medida Global        ',
    representation: 'GL    ',
  },
  {
    _id: MeasurementUnit.HECTAREAS,
    description: 'Hectáreas                   ',
    representation: 'ha    ',
  },
  {
    _id: MeasurementUnit.POR_MILAJE,
    description: 'Por Milaje                  ',
    representation: 'pm    ',
  },
  {
    _id: MeasurementUnit.COSTO_POR_MIL,
    description: 'Costo por Mil               ',
    representation: 'CPM   ',
  },
  {
    _id: MeasurementUnit.UNIDAD_INTERNACIONAL,
    description: 'Unidad Internacional        ',
    representation: 'UI    ',
  },
];
