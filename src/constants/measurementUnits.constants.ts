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
    code: MeasurementUnit.UNIDAD,
    description: 'Unidad                      ',
    representation: 'UNI   ',
  },
  {
    code: MeasurementUnit.KILOGRAMOS_S__METRO_CUADRADO,
    description: 'Kilogramos s/ metro cuadrado',
    representation: 'kg/m2 ',
  },
  {
    code: MeasurementUnit.KILOGRAMOS,
    description: 'Kilogramos                  ',
    representation: 'kg    ',
  },
  {
    code: MeasurementUnit.GRAMOS,
    description: 'Gramos                      ',
    representation: 'g     ',
  },
  {
    code: MeasurementUnit.METROS,
    description: 'Metros                      ',
    representation: 'm     ',
  },
  {
    code: MeasurementUnit.MILILITROS,
    description: 'Mililitros                  ',
    representation: 'ML    ',
  },
  {
    code: MeasurementUnit.LITROS,
    description: 'Litros                      ',
    representation: 'LT    ',
  },
  {
    code: MeasurementUnit.MILIGRAMOS,
    description: 'Miligramos                  ',
    representation: 'MG    ',
  },
  {
    code: MeasurementUnit.CENTIMETROS,
    description: 'Centimetros                 ',
    representation: 'CM    ',
  },
  {
    code: MeasurementUnit.CENTIMETROS_CUADRADOS,
    description: 'Centimetros cuadrados       ',
    representation: 'CM2   ',
  },
  {
    code: MeasurementUnit.CENTIMETROS_CUBICOS,
    description: 'Centimetros cubicos         ',
    representation: 'CM3   ',
  },
  {
    code: MeasurementUnit.PULGADAS,
    description: 'Pulgadas                    ',
    representation: 'PUL   ',
  },
  {
    code: MeasurementUnit.MILIMETROS,
    description: 'Milímetros                  ',
    representation: 'MM    ',
  },
  {
    code: MeasurementUnit.MILIMETROS_CUADRADOS,
    description: 'Milímetros cuadrados        ',
    representation: 'MM2   ',
  },
  {
    code: MeasurementUnit.ANO,
    description: 'Año                         ',
    representation: 'AA    ',
  },
  {
    code: MeasurementUnit.MES,
    description: 'Mes                         ',
    representation: 'ME    ',
  },
  {
    code: MeasurementUnit.TONELADA,
    description: 'Tonelada                    ',
    representation: 'TN    ',
  },
  {
    code: MeasurementUnit.HORA,
    description: 'Hora                        ',
    representation: 'Hs    ',
  },
  {
    code: MeasurementUnit.MINUTO,
    description: 'Minuto                      ',
    representation: 'Mi    ',
  },
  {
    code: MeasurementUnit.DIA,
    description: 'Día                         ',
    representation: 'Di    ',
  },
  {
    code: MeasurementUnit.YARDAS,
    description: 'Yardas                      ',
    representation: 'Ya    ',
  },
  {
    code: MeasurementUnit.DETERMINACION,
    description: 'Determinación               ',
    representation: 'DET   ',
  },
  {
    code: MeasurementUnit.METROS_REPRESENTACION_MT,
    description: 'Metros                      ',
    representation: 'MT    ',
  },
  {
    code: MeasurementUnit.METROS_CUADRADOS,
    description: 'Metros cuadrados            ',
    representation: 'M2    ',
  },
  {
    code: MeasurementUnit.METROS_CUBICOS,
    description: 'Metros cúbicos              ',
    representation: 'M3    ',
  },
  {
    code: MeasurementUnit.RACION,
    description: 'Ración                      ',
    representation: 'ración',
  },
  {
    code: MeasurementUnit.KILOMETROS,
    description: 'Kilómetros                  ',
    representation: 'Km    ',
  },
  {
    code: MeasurementUnit.METRO_LINEAL,
    description: 'Metro lineal                ',
    representation: 'ml    ',
  },
  {
    code: MeasurementUnit.SEGUNDO,
    description: 'Segundo                     ',
    representation: 'Se    ',
  },
  {
    code: MeasurementUnit.UNIDAD_MEDIDA_GLOBAL,
    description: 'Unidad Medida Global        ',
    representation: 'GL    ',
  },
  {
    code: MeasurementUnit.HECTAREAS,
    description: 'Hectáreas                   ',
    representation: 'ha    ',
  },
  {
    code: MeasurementUnit.POR_MILAJE,
    description: 'Por Milaje                  ',
    representation: 'pm    ',
  },
  {
    code: MeasurementUnit.COSTO_POR_MIL,
    description: 'Costo por Mil               ',
    representation: 'CPM   ',
  },
  {
    code: MeasurementUnit.UNIDAD_INTERNACIONAL,
    description: 'Unidad Internacional        ',
    representation: 'UI    ',
  },
];
