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
    id: MeasurementUnit.UNIDAD,
    description: 'Unidad                      ',
    representation: 'UNI   ',
  },
  {
    id: MeasurementUnit.KILOGRAMOS_S__METRO_CUADRADO,
    description: 'Kilogramos s/ metro cuadrado',
    representation: 'kg/m2 ',
  },
  {
    id: MeasurementUnit.KILOGRAMOS,
    description: 'Kilogramos                  ',
    representation: 'kg    ',
  },
  {
    id: MeasurementUnit.GRAMOS,
    description: 'Gramos                      ',
    representation: 'g     ',
  },
  {
    id: MeasurementUnit.METROS,
    description: 'Metros                      ',
    representation: 'm     ',
  },
  {
    id: MeasurementUnit.MILILITROS,
    description: 'Mililitros                  ',
    representation: 'ML    ',
  },
  {
    id: MeasurementUnit.LITROS,
    description: 'Litros                      ',
    representation: 'LT    ',
  },
  {
    id: MeasurementUnit.MILIGRAMOS,
    description: 'Miligramos                  ',
    representation: 'MG    ',
  },
  {
    id: MeasurementUnit.CENTIMETROS,
    description: 'Centimetros                 ',
    representation: 'CM    ',
  },
  {
    id: MeasurementUnit.CENTIMETROS_CUADRADOS,
    description: 'Centimetros cuadrados       ',
    representation: 'CM2   ',
  },
  {
    id: MeasurementUnit.CENTIMETROS_CUBICOS,
    description: 'Centimetros cubicos         ',
    representation: 'CM3   ',
  },
  {
    id: MeasurementUnit.PULGADAS,
    description: 'Pulgadas                    ',
    representation: 'PUL   ',
  },
  {
    id: MeasurementUnit.MILIMETROS,
    description: 'Milímetros                  ',
    representation: 'MM    ',
  },
  {
    id: MeasurementUnit.MILIMETROS_CUADRADOS,
    description: 'Milímetros cuadrados        ',
    representation: 'MM2   ',
  },
  {
    id: MeasurementUnit.ANO,
    description: 'Año                         ',
    representation: 'AA    ',
  },
  {
    id: MeasurementUnit.MES,
    description: 'Mes                         ',
    representation: 'ME    ',
  },
  {
    id: MeasurementUnit.TONELADA,
    description: 'Tonelada                    ',
    representation: 'TN    ',
  },
  {
    id: MeasurementUnit.HORA,
    description: 'Hora                        ',
    representation: 'Hs    ',
  },
  {
    id: MeasurementUnit.MINUTO,
    description: 'Minuto                      ',
    representation: 'Mi    ',
  },
  {
    id: MeasurementUnit.DIA,
    description: 'Día                         ',
    representation: 'Di    ',
  },
  {
    id: MeasurementUnit.YARDAS,
    description: 'Yardas                      ',
    representation: 'Ya    ',
  },
  {
    id: MeasurementUnit.DETERMINACION,
    description: 'Determinación               ',
    representation: 'DET   ',
  },
  {
    id: MeasurementUnit.METROS_REPRESENTACION_MT,
    description: 'Metros                      ',
    representation: 'MT    ',
  },
  {
    id: MeasurementUnit.METROS_CUADRADOS,
    description: 'Metros cuadrados            ',
    representation: 'M2    ',
  },
  {
    id: MeasurementUnit.METROS_CUBICOS,
    description: 'Metros cúbicos              ',
    representation: 'M3    ',
  },
  {
    id: MeasurementUnit.RACION,
    description: 'Ración                      ',
    representation: 'ración',
  },
  {
    id: MeasurementUnit.KILOMETROS,
    description: 'Kilómetros                  ',
    representation: 'Km    ',
  },
  {
    id: MeasurementUnit.METRO_LINEAL,
    description: 'Metro lineal                ',
    representation: 'ml    ',
  },
  {
    id: MeasurementUnit.SEGUNDO,
    description: 'Segundo                     ',
    representation: 'Se    ',
  },
  {
    id: MeasurementUnit.UNIDAD_MEDIDA_GLOBAL,
    description: 'Unidad Medida Global        ',
    representation: 'GL    ',
  },
  {
    id: MeasurementUnit.HECTAREAS,
    description: 'Hectáreas                   ',
    representation: 'ha    ',
  },
  {
    id: MeasurementUnit.POR_MILAJE,
    description: 'Por Milaje                  ',
    representation: 'pm    ',
  },
  {
    id: MeasurementUnit.COSTO_POR_MIL,
    description: 'Costo por Mil               ',
    representation: 'CPM   ',
  },
  {
    id: MeasurementUnit.UNIDAD_INTERNACIONAL,
    description: 'Unidad Internacional        ',
    representation: 'UI    ',
  },
];
