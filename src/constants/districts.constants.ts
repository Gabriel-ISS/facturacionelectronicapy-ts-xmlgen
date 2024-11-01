import { BasicData } from '../services/constants.service';
import { Department } from './departments.constants';

type Data = BasicData<number> & { department: Department };
// TODO: reemplazar numero de departamento por enum del departamento
export const districts: Data[] = [
  { id: 1, description: 'ASUNCION (DISTRITO)', department: 1 },
  { id: 2, description: 'CONCEPCION (MUNICIPIO)', department: 2 },
  { id: 3, description: 'SAN LAZARO', department: 2 },
  { id: 4, description: 'SAN CARLOS', department: 2 },
  { id: 5, description: 'BELEN', department: 2 },
  { id: 6, description: 'LORETO', department: 2 },
  { id: 7, description: 'HORQUETA', department: 2 },
  { id: 8, description: 'SAN SALVADOR', department: 2 },
  { id: 9, description: "YBY YA'U", department: 2 },
  { id: 267, description: 'SAN CARLOS DEL APA', department: 2 },
  { id: 270, description: 'SARGENTO JOSE FELIX LOPEZ', department: 2 },
  { id: 280, description: 'PASO BARRETO (MUNICIPIO)', department: 2 },
  { id: 281, description: 'SAN ALFREDO (MUNICIPIO)', department: 2 },
  { id: 282, description: 'AZOTE¿Y (MUNICIPIO)', department: 2 },
  { id: 286, description: 'ARROYITO', department: 2 },
  { id: 10, description: 'SAN PEDRO DE YCUAMANDYYU', department: 3 },
  { id: 11, description: 'ANTEQUERA', department: 3 },
  { id: 12, description: 'GRAL. E.AQUINO', department: 3 },
  { id: 13, description: 'ITACURUBI DEL ROSARIO', department: 3 },
  { id: 14, description: 'SAN ESTANISLAO (SANTANI)', department: 3 },
  { id: 15, description: 'LIMA', department: 3 },
  { id: 16, description: 'NUEVA GERMANIA', department: 3 },
  { id: 17, description: 'TACUATI', department: 3 },
  { id: 18, description: 'UNION', department: 3 },
  { id: 19, description: '25 DE DICIEMBRE', department: 3 },
  { id: 20, description: 'VILLA DEL ROSARIO', department: 3 },
  { id: 21, description: 'YATAITY DEL NORTE', department: 3 },
  { id: 22, description: 'ISIDORO RESQUIN', department: 3 },
  { id: 23, description: 'CHORE', department: 3 },
  { id: 24, description: 'SAN PABLO', department: 3 },
  { id: 25, description: 'SAN JOSE DEL ROSARIO', department: 3 },
  { id: 220, description: 'GUAYAIBI', department: 3 },
  { id: 226, description: 'CAPIIBARY', department: 3 },
  { id: 245, description: 'YRYBUCUA', department: 3 },
  { id: 263, description: 'SANTA ROSA DEL AGUARAY', department: 3 },
  { id: 268, description: 'LIBERACIÓN', department: 3 },
  { id: 285, description: 'SAN VICENTE PANCHOLO', department: 3 },
  { id: 26, description: 'CAACUPE', department: 4 },
  { id: 27, description: 'ALTOS', department: 4 },
  { id: 28, description: 'ARROYOS Y ESTEROS', department: 4 },
  { id: 29, description: 'ATYRA', department: 4 },
  { id: 30, description: 'CARAGUATAY', department: 4 },
  { id: 31, description: 'EMBOSCADA', department: 4 },
  { id: 32, description: 'EUSEBIO AYALA', department: 4 },
  { id: 33, description: 'ISLA PUCU', department: 4 },
  { id: 34, description: 'ITACURUBI DE LA CORDILLERA', department: 4 },
  { id: 35, description: 'JUAN DE MENA', department: 4 },
  { id: 36, description: 'NUEVA COLOMBIA', department: 4 },
  { id: 37, description: 'PIRIBEBUY', department: 4 },
  { id: 38, description: '1RO.DE MARZO', department: 4 },
  { id: 39, description: 'SAN BERNARDINO', department: 4 },
  { id: 40, description: 'SANTA ELENA', department: 4 },
  { id: 41, description: 'TOBATI', department: 4 },
  { id: 42, description: 'VALENZUELA', department: 4 },
  { id: 43, description: 'LOMA GRANDE', department: 4 },
  { id: 44, description: 'SAN JOSE OBRERO', department: 4 },
  { id: 214, description: 'MBOCAYATY DEL YHAGUY', department: 4 },
  { id: 45, description: 'VILLARRICA', department: 5 },
  { id: 46, description: 'SAN SALVADOR', department: 5 },
  { id: 47, description: 'BORJA', department: 5 },
  { id: 48, description: 'INDEPENDENCIA (R.D.MELGAREJO)', department: 5 },
  { id: 49, description: 'GRAL.EUGENIO A. GARAY', department: 5 },
  { id: 50, description: 'CNEL. MARTINEZ', department: 5 },
  { id: 51, description: 'JOSE FASSARDI', department: 5 },
  { id: 52, description: 'FELIX PEREZ CARDOZO', department: 5 },
  { id: 53, description: 'MAURICIO JOSE TROCHE', department: 5 },
  { id: 54, description: 'ITAPE', department: 5 },
  { id: 55, description: 'ITURBE', department: 5 },
  { id: 56, description: 'MBOCAYATY', department: 5 },
  { id: 57, description: 'NATALICIO TALAVERA', department: 5 },
  { id: 58, description: 'ÑUMI', department: 5 },
  { id: 59, description: 'YATAITY', department: 5 },
  { id: 60, description: 'DR. BOTREL', department: 5 },
  { id: 225, description: 'PASO YOBAY', department: 5 },
  { id: 246, description: 'SIN EQUIVALENCIA', department: 5 },
  { id: 265, description: 'TEBICUARY', department: 5 },
  { id: 61, description: 'CNEL. OVIEDO', department: 6 },
  { id: 62, description: 'CAAGUAZU', department: 6 },
  { id: 63, description: 'CARAYAO', department: 6 },
  { id: 64, description: 'CECILIO BAEZ', department: 6 },
  { id: 65, description: 'NUEVA LONDRES', department: 6 },
  { id: 66, description: 'SAN JOAQUIN', department: 6 },
  { id: 67, description: 'SAN JOSE DE LOS ARROYOS', department: 6 },
  { id: 68, description: 'YHU', department: 6 },
  { id: 69, description: 'JUAN MANUEL FRUTOS', department: 6 },
  { id: 70, description: 'REPATRIACION', department: 6 },
  { id: 71, description: 'SANTA ROSA DEL MBUTUY', department: 6 },
  { id: 72, description: 'J. EULOGIO ESTIGARRIBIA', department: 6 },
  { id: 73, description: 'JOSE D. OCAMPOS', department: 6 },
  { id: 74, description: 'R.I.3 CORRALES', department: 6 },
  { id: 75, description: 'RAUL A. OVIEDO', department: 6 },
  { id: 76, description: 'MCAL.F.SOLANO LOPEZ', department: 6 },
  { id: 227, description: '3 DE FEBRERO', department: 6 },
  { id: 228, description: 'SIMON BOLIVAR', department: 6 },
  { id: 229, description: 'LA PASTORA', department: 6 },
  { id: 237, description: 'VAQUERIA', department: 6 },
  { id: 244, description: 'ESCULIES', department: 6 },
  { id: 275, description: 'TEMBIAPORA', department: 6 },
  { id: 276, description: 'NUEVA TOLEDO', department: 6 },
  { id: 77, description: 'CAAZAPA', department: 7 },
  { id: 78, description: 'BUENA VISTA', department: 7 },
  { id: 79, description: 'GRAL. H. MORINIGO', department: 7 },
  { id: 80, description: 'MACIEL', department: 7 },
  { id: 81, description: 'MOISES BERTONI', department: 7 },
  { id: 82, description: 'SAN JUAN NEPOMUCENO', department: 7 },
  { id: 83, description: 'ABAI', department: 7 },
  { id: 84, description: 'TAVAI', department: 7 },
  { id: 85, description: 'YEGROS', department: 7 },
  { id: 86, description: 'YUTY', department: 7 },
  { id: 272, description: '3 DE MAYO', department: 7 },
  { id: 87, description: 'ENCARNACION', department: 8 },
  { id: 88, description: 'BELLA VISTA', department: 8 },
  { id: 89, description: 'CAMBYRETA', department: 8 },
  { id: 90, description: 'CAPITAN MEZA', department: 8 },
  { id: 91, description: 'CARMEN DEL PARANA', department: 8 },
  { id: 92, description: 'CAPITAN MIRANDA', department: 8 },
  { id: 93, description: 'CORONEL BOGADO', department: 8 },
  { id: 94, description: 'FRAM', department: 8 },
  { id: 95, description: 'GRAL. ARTIGAS', department: 8 },
  { id: 96, description: 'GRAL. DELGADO', department: 8 },
  { id: 97, description: 'HOHENAU', department: 8 },
  { id: 98, description: 'JESUS', department: 8 },
  { id: 99, description: 'OBLIGADO', department: 8 },
  { id: 100, description: 'SAN COSME Y DAMIAN', department: 8 },
  { id: 101, description: 'SAN PEDRO DEL PARANA', department: 8 },
  { id: 102, description: 'NUEVA ALBORADA', department: 8 },
  { id: 103, description: 'TRINIDAD', department: 8 },
  { id: 104, description: 'NATALIO', department: 8 },
  { id: 105, description: 'JOSE LEANDRO OVIEDO', department: 8 },
  { id: 106, description: 'SAN RAFAEL DEL PARANA', department: 8 },
  { id: 107, description: 'CARLOS A. LOPEZ', department: 8 },
  { id: 108, description: 'JULIO D. OTAÑO', department: 8 },
  { id: 109, description: 'EDELIRA', department: 8 },
  { id: 110, description: 'SAN JUAN DEL PARANA', department: 8 },
  { id: 111, description: 'LA PAZ', department: 8 },
  { id: 112, description: 'TOMAS R. PEREIRA', department: 8 },
  { id: 113, description: 'YATYTAY', department: 8 },
  { id: 114, description: 'HERIBERTA S.DE IGLESIAS', department: 8 },
  { id: 221, description: 'PIRAPO', department: 8 },
  { id: 232, description: 'ITAPUA POTY', department: 8 },
  { id: 243, description: 'FEDERICO CHAVEZ', department: 8 },
  { id: 262, description: 'ALTO VERA', department: 8 },
  { id: 115, description: 'SAN JUAN BAUTISTA', department: 9 },
  { id: 116, description: 'AYOLAS', department: 9 },
  { id: 117, description: 'SAN IGNACIO', department: 9 },
  { id: 118, description: 'SAN MIGUEL', department: 9 },
  { id: 119, description: 'SAN PATRICIO', department: 9 },
  { id: 120, description: 'SANTIAGO', department: 9 },
  { id: 121, description: 'SANTA MARIA', department: 9 },
  { id: 122, description: 'SANTA ROSA', department: 9 },
  { id: 123, description: 'VILLA FLORIDA', department: 9 },
  { id: 124, description: 'YABEBYRY', department: 9 },
  { id: 125, description: 'PARAGUARI', department: 10 },
  { id: 126, description: 'ACAHAY', department: 10 },
  { id: 127, description: 'CAAPUCU', department: 10 },
  { id: 128, description: 'CABALLERO', department: 10 },
  { id: 129, description: 'CARAPEGUA', department: 10 },
  { id: 130, description: 'LA COLMENA', department: 10 },
  { id: 131, description: 'ESCOBAR', department: 10 },
  { id: 132, description: 'MBUYAPEY', department: 10 },
  { id: 133, description: 'PIRAYU', department: 10 },
  { id: 134, description: 'QUIINDY', department: 10 },
  { id: 135, description: 'ROQUE GONZALEZ', department: 10 },
  { id: 136, description: 'SAPUCAI', department: 10 },
  { id: 137, description: 'YBYCUI', department: 10 },
  { id: 138, description: 'QUYQUYHO', department: 10 },
  { id: 139, description: 'YBYTYMI', department: 10 },
  { id: 140, description: 'TEBICUARY MI', department: 10 },
  { id: 141, description: 'YAGUARON', department: 10 },
  { id: 142, description: 'HERNANDARIAS', department: 11 },
  { id: 143, description: 'DOMINGO MARTINEZ DE IRALA', department: 11 },
  { id: 144, description: 'ÑACUNDAY', department: 11 },
  { id: 145, description: 'CIUDAD DEL ESTE', department: 11 },
  { id: 146, description: 'JUAN LEON MALLORQUIN', department: 11 },
  { id: 147, description: 'ITAKYRY', department: 11 },
  { id: 148, description: "JUAN E.O'LEARY", department: 11 },
  { id: 149, description: 'PRESIDENTE FRANCO', department: 11 },
  { id: 150, description: 'YGUAZU', department: 11 },
  { id: 151, description: 'SAN CRISTOBAL', department: 11 },
  { id: 209, description: 'SANTA RITA', department: 11 },
  { id: 210, description: 'MINGA GUAZU', department: 11 },
  { id: 211, description: 'LOS CEDRALES', department: 11 },
  { id: 212, description: 'SAN ALBERTO', department: 11 },
  { id: 213, description: 'MINGA PORA', department: 11 },
  { id: 215, description: 'NARANJAL', department: 11 },
  { id: 216, description: 'SANTA ROSA DEL MONDAY', department: 11 },
  { id: 217, description: 'IRUÑA', department: 11 },
  { id: 219, description: 'MBARACAYU', department: 11 },
  { id: 239, description: 'SANTA FE DEL PARANA', department: 11 },
  { id: 240, description: 'NUEVA ESPERANZA', department: 11 },
  { id: 269, description: 'TAVAPY', department: 11 },
  { id: 273, description: 'DR. RAUL PEÑA', department: 11 },
  { id: 152, description: 'AREGUA', department: 12 },
  { id: 153, description: 'CAPIATA', department: 12 },
  { id: 154, description: 'FERNANDO DE LA MORA', department: 12 },
  { id: 155, description: 'GUARAMBARE', department: 12 },
  { id: 156, description: 'ITA', department: 12 },
  { id: 157, description: 'ITAUGUA', department: 12 },
  { id: 158, description: 'LIMPIO', department: 12 },
  { id: 159, description: 'LUQUE', department: 12 },
  { id: 160, description: 'MARIANO ROQUE ALONSO', department: 12 },
  { id: 161, description: 'ÑEMBY', department: 12 },
  { id: 162, description: 'NUEVA ITALIA', department: 12 },
  { id: 163, description: 'SAN ANTONIO', department: 12 },
  { id: 164, description: 'SAN LORENZO', department: 12 },
  { id: 165, description: 'VILLA ELISA', department: 12 },
  { id: 166, description: 'VILLETA', department: 12 },
  { id: 167, description: 'YPACARAI', department: 12 },
  { id: 168, description: 'YPANE', department: 12 },
  { id: 169, description: 'LAMBARE', department: 12 },
  { id: 170, description: 'J.AUGUSTO SALDIVAR', department: 12 },
  { id: 277, description: 'LOMA PYTA', department: 12 },
  { id: 171, description: 'PILAR', department: 13 },
  { id: 172, description: 'ALBERDI', department: 13 },
  { id: 173, description: 'CERRITO', department: 13 },
  { id: 174, description: 'DESMOCHADOS', department: 13 },
  { id: 175, description: 'GUAZU CUA', department: 13 },
  { id: 176, description: 'HUMAITA', department: 13 },
  { id: 177, description: 'ISLA UMBU', department: 13 },
  { id: 178, description: 'LAURELES', department: 13 },
  { id: 179, description: 'PASO DE PATRIA', department: 13 },
  { id: 180, description: 'MAYOR J.D.MARTINEZ', department: 13 },
  { id: 181, description: 'SAN JUAN DE ÑEEMBUCU', department: 13 },
  { id: 182, description: 'TACUARAS', department: 13 },
  { id: 183, description: 'VILLA OLIVA', department: 13 },
  { id: 184, description: 'VILLALBIN', department: 13 },
  { id: 203, description: 'GRAL.JOSE EDUVIGIS DIAZ', department: 13 },
  { id: 205, description: 'VILLA FRANCA', department: 13 },
  { id: 230, description: 'VILLA FRANCA', department: 13 },
  { id: 231, description: 'VILLALBIN', department: 13 },
  { id: 185, description: 'PEDRO JUAN CABALLERO', department: 14 },
  { id: 186, description: 'BELLA VISTA', department: 14 },
  { id: 187, description: 'CAPITAN BADO', department: 14 },
  { id: 278, description: 'KARAPAI', department: 14 },
  { id: 279, description: 'ZANJA PYTA', department: 14 },
  { id: 188, description: 'VILLA HAYES', department: 15 },
  { id: 189, description: 'BENJAMIN ACEVAL(MONTE SOCIEDAD', department: 15 },
  { id: 190, description: 'PTO.PINAZCO', department: 15 },
  { id: 191, description: 'NANAWA', department: 15 },
  { id: 206, description: 'POZO COLORADO', department: 15 },
  { id: 242, description: 'JOSE FALCON', department: 15 },
  { id: 261, description: 'TTE. 1RO. IRALA FERNANDEZ', department: 15 },
  { id: 264, description: 'TENIENTE ESTEBAN MARTINEZ', department: 15 },
  { id: 192, description: 'MCAL.ESTIGARRIBIA', department: 16 },
  { id: 193, description: 'BOQUERON', department: 16 },
  { id: 194, description: 'PEDRO P.PEÑA', department: 16 },
  { id: 234, description: 'GRAL. EUGENIO A. GARAY', department: 16 },
  { id: 259, description: 'FILADELFIA', department: 16 },
  { id: 260, description: 'LOMA PLATA', department: 16 },
  { id: 195, description: 'FUERTE OLIMPO', department: 17 },
  { id: 196, description: 'BAHIA NEGRA', department: 17 },
  { id: 218, description: 'PUERTO CASADO', department: 17 },
  { id: 223, description: 'PUERTO GUARANI', department: 17 },
  { id: 233, description: 'MAYOR PABLO LAGERENZA', department: 17 },
  { id: 266, description: 'CARMELO PERALTA', department: 17 },
  { id: 197, description: 'SAN ISIDRO DEL CURUGUATY', department: 18 },
  { id: 198, description: 'VILLA YGATIMI', department: 18 },
  { id: 199, description: 'YPEJHU', department: 18 },
  { id: 200, description: 'CORPUS CHRISTI', department: 18 },
  { id: 201, description: 'ITANARA', department: 18 },
  { id: 202, description: 'FRANCISCO CABALLERO ALVAREZ', department: 18 },
  { id: 207, description: 'SALTO DEL GUAIRA', department: 18 },
  { id: 235, description: 'LA PALOMA', department: 18 },
  { id: 236, description: 'KATUETE', department: 18 },
  { id: 238, description: 'NUEVA ESPERANZA', department: 18 },
  { id: 241, description: 'YASY KAÑY', department: 18 },
  { id: 271, description: 'YBYRAROBANA', department: 18 },
  { id: 274, description: 'YBY PYTA', department: 18 },
  { id: 283, description: 'MARACANA', department: 18 },
  { id: 284, description: 'PUERTO ADELA', department: 18 },
]