import Table from '../helpers/Table';

export default new Table<{
  0: ['_id', number];
  1: ['description', string];
  2: ['department', number];
}>(
  ['_id', 'description', 'department'],
  [
    [1, 'ASUNCION (DISTRITO)', 1],
    [2, 'CONCEPCION (MUNICIPIO)', 2],
    [3, 'SAN LAZARO', 2],
    [4, 'SAN CARLOS', 2],
    [5, 'BELEN', 2],
    [6, 'LORETO', 2],
    [7, 'HORQUETA', 2],
    [8, 'SAN SALVADOR', 2],
    [9, "YBY YA'U", 2],
    [267, 'SAN CARLOS DEL APA', 2],
    [270, 'SARGENTO JOSE FELIX LOPEZ', 2],
    [280, 'PASO BARRETO (MUNICIPIO)', 2],
    [281, 'SAN ALFREDO (MUNICIPIO)', 2],
    [282, 'AZOTE¿Y (MUNICIPIO)', 2],
    [286, 'ARROYITO', 2],
    [10, 'SAN PEDRO DE YCUAMANDYYU', 3],
    [11, 'ANTEQUERA', 3],
    [12, 'GRAL. E.AQUINO', 3],
    [13, 'ITACURUBI DEL ROSARIO', 3],
    [14, 'SAN ESTANISLAO (SANTANI)', 3],
    [15, 'LIMA', 3],
    [16, 'NUEVA GERMANIA', 3],
    [17, 'TACUATI', 3],
    [18, 'UNION', 3],
    [19, '25 DE DICIEMBRE', 3],
    [20, 'VILLA DEL ROSARIO', 3],
    [21, 'YATAITY DEL NORTE', 3],
    [22, 'ISIDORO RESQUIN', 3],
    [23, 'CHORE', 3],
    [24, 'SAN PABLO', 3],
    [25, 'SAN JOSE DEL ROSARIO', 3],
    [220, 'GUAYAIBI', 3],
    [226, 'CAPIIBARY', 3],
    [245, 'YRYBUCUA', 3],
    [263, 'SANTA ROSA DEL AGUARAY', 3],
    [268, 'LIBERACIÓN', 3],
    [285, 'SAN VICENTE PANCHOLO', 3],
    [26, 'CAACUPE', 4],
    [27, 'ALTOS', 4],
    [28, 'ARROYOS Y ESTEROS', 4],
    [29, 'ATYRA', 4],
    [30, 'CARAGUATAY', 4],
    [31, 'EMBOSCADA', 4],
    [32, 'EUSEBIO AYALA', 4],
    [33, 'ISLA PUCU', 4],
    [34, 'ITACURUBI DE LA CORDILLERA', 4],
    [35, 'JUAN DE MENA', 4],
    [36, 'NUEVA COLOMBIA', 4],
    [37, 'PIRIBEBUY', 4],
    [38, '1RO.DE MARZO', 4],
    [39, 'SAN BERNARDINO', 4],
    [40, 'SANTA ELENA', 4],
    [41, 'TOBATI', 4],
    [42, 'VALENZUELA', 4],
    [43, 'LOMA GRANDE', 4],
    [44, 'SAN JOSE OBRERO', 4],
    [214, 'MBOCAYATY DEL YHAGUY', 4],
    [45, 'VILLARRICA', 5],
    [46, 'SAN SALVADOR', 5],
    [47, 'BORJA', 5],
    [48, 'INDEPENDENCIA (R.D.MELGAREJO)', 5],
    [49, 'GRAL.EUGENIO A. GARAY', 5],
    [50, 'CNEL. MARTINEZ', 5],
    [51, 'JOSE FASSARDI', 5],
    [52, 'FELIX PEREZ CARDOZO', 5],
    [53, 'MAURICIO JOSE TROCHE', 5],
    [54, 'ITAPE', 5],
    [55, 'ITURBE', 5],
    [56, 'MBOCAYATY', 5],
    [57, 'NATALICIO TALAVERA', 5],
    [58, 'ÑUMI', 5],
    [59, 'YATAITY', 5],
    [60, 'DR. BOTREL', 5],
    [225, 'PASO YOBAY', 5],
    [246, 'SIN EQUIVALENCIA', 5],
    [265, 'TEBICUARY', 5],
    [61, 'CNEL. OVIEDO', 6],
    [62, 'CAAGUAZU', 6],
    [63, 'CARAYAO', 6],
    [64, 'CECILIO BAEZ', 6],
    [65, 'NUEVA LONDRES', 6],
    [66, 'SAN JOAQUIN', 6],
    [67, 'SAN JOSE DE LOS ARROYOS', 6],
    [68, 'YHU', 6],
    [69, 'JUAN MANUEL FRUTOS', 6],
    [70, 'REPATRIACION', 6],
    [71, 'SANTA ROSA DEL MBUTUY', 6],
    [72, 'J. EULOGIO ESTIGARRIBIA', 6],
    [73, 'JOSE D. OCAMPOS', 6],
    [74, 'R.I.3 CORRALES', 6],
    [75, 'RAUL A. OVIEDO', 6],
    [76, 'MCAL.F.SOLANO LOPEZ', 6],
    [227, '3 DE FEBRERO', 6],
    [228, 'SIMON BOLIVAR', 6],
    [229, 'LA PASTORA', 6],
    [237, 'VAQUERIA', 6],
    [244, 'ESCULIES', 6],
    [275, 'TEMBIAPORA', 6],
    [276, 'NUEVA TOLEDO', 6],
    [77, 'CAAZAPA', 7],
    [78, 'BUENA VISTA', 7],
    [79, 'GRAL. H. MORINIGO', 7],
    [80, 'MACIEL', 7],
    [81, 'MOISES BERTONI', 7],
    [82, 'SAN JUAN NEPOMUCENO', 7],
    [83, 'ABAI', 7],
    [84, 'TAVAI', 7],
    [85, 'YEGROS', 7],
    [86, 'YUTY', 7],
    [272, '3 DE MAYO', 7],
    [87, 'ENCARNACION', 8],
    [88, 'BELLA VISTA', 8],
    [89, 'CAMBYRETA', 8],
    [90, 'CAPITAN MEZA', 8],
    [91, 'CARMEN DEL PARANA', 8],
    [92, 'CAPITAN MIRANDA', 8],
    [93, 'CORONEL BOGADO', 8],
    [94, 'FRAM', 8],
    [95, 'GRAL. ARTIGAS', 8],
    [96, 'GRAL. DELGADO', 8],
    [97, 'HOHENAU', 8],
    [98, 'JESUS', 8],
    [99, 'OBLIGADO', 8],
    [100, 'SAN COSME Y DAMIAN', 8],
    [101, 'SAN PEDRO DEL PARANA', 8],
    [102, 'NUEVA ALBORADA', 8],
    [103, 'TRINIDAD', 8],
    [104, 'NATALIO', 8],
    [105, 'JOSE LEANDRO OVIEDO', 8],
    [106, 'SAN RAFAEL DEL PARANA', 8],
    [107, 'CARLOS A. LOPEZ', 8],
    [108, 'JULIO D. OTAÑO', 8],
    [109, 'EDELIRA', 8],
    [110, 'SAN JUAN DEL PARANA', 8],
    [111, 'LA PAZ', 8],
    [112, 'TOMAS R. PEREIRA', 8],
    [113, 'YATYTAY', 8],
    [114, 'HERIBERTA S.DE IGLESIAS', 8],
    [221, 'PIRAPO', 8],
    [232, 'ITAPUA POTY', 8],
    [243, 'FEDERICO CHAVEZ', 8],
    [262, 'ALTO VERA', 8],
    [115, 'SAN JUAN BAUTISTA', 9],
    [116, 'AYOLAS', 9],
    [117, 'SAN IGNACIO', 9],
    [118, 'SAN MIGUEL', 9],
    [119, 'SAN PATRICIO', 9],
    [120, 'SANTIAGO', 9],
    [121, 'SANTA MARIA', 9],
    [122, 'SANTA ROSA', 9],
    [123, 'VILLA FLORIDA', 9],
    [124, 'YABEBYRY', 9],
    [125, 'PARAGUARI', 10],
    [126, 'ACAHAY', 10],
    [127, 'CAAPUCU', 10],
    [128, 'CABALLERO', 10],
    [129, 'CARAPEGUA', 10],
    [130, 'LA COLMENA', 10],
    [131, 'ESCOBAR', 10],
    [132, 'MBUYAPEY', 10],
    [133, 'PIRAYU', 10],
    [134, 'QUIINDY', 10],
    [135, 'ROQUE GONZALEZ', 10],
    [136, 'SAPUCAI', 10],
    [137, 'YBYCUI', 10],
    [138, 'QUYQUYHO', 10],
    [139, 'YBYTYMI', 10],
    [140, 'TEBICUARY MI', 10],
    [141, 'YAGUARON', 10],
    [142, 'HERNANDARIAS', 11],
    [143, 'DOMINGO MARTINEZ DE IRALA', 11],
    [144, 'ÑACUNDAY', 11],
    [145, 'CIUDAD DEL ESTE', 11],
    [146, 'JUAN LEON MALLORQUIN', 11],
    [147, 'ITAKYRY', 11],
    [148, "JUAN E.O'LEARY", 11],
    [149, 'PRESIDENTE FRANCO', 11],
    [150, 'YGUAZU', 11],
    [151, 'SAN CRISTOBAL', 11],
    [209, 'SANTA RITA', 11],
    [210, 'MINGA GUAZU', 11],
    [211, 'LOS CEDRALES', 11],
    [212, 'SAN ALBERTO', 11],
    [213, 'MINGA PORA', 11],
    [215, 'NARANJAL', 11],
    [216, 'SANTA ROSA DEL MONDAY', 11],
    [217, 'IRUÑA', 11],
    [219, 'MBARACAYU', 11],
    [239, 'SANTA FE DEL PARANA', 11],
    [240, 'NUEVA ESPERANZA', 11],
    [269, 'TAVAPY', 11],
    [273, 'DR. RAUL PEÑA', 11],
    [152, 'AREGUA', 12],
    [153, 'CAPIATA', 12],
    [154, 'FERNANDO DE LA MORA', 12],
    [155, 'GUARAMBARE', 12],
    [156, 'ITA', 12],
    [157, 'ITAUGUA', 12],
    [158, 'LIMPIO', 12],
    [159, 'LUQUE', 12],
    [160, 'MARIANO ROQUE ALONSO', 12],
    [161, 'ÑEMBY', 12],
    [162, 'NUEVA ITALIA', 12],
    [163, 'SAN ANTONIO', 12],
    [164, 'SAN LORENZO', 12],
    [165, 'VILLA ELISA', 12],
    [166, 'VILLETA', 12],
    [167, 'YPACARAI', 12],
    [168, 'YPANE', 12],
    [169, 'LAMBARE', 12],
    [170, 'J.AUGUSTO SALDIVAR', 12],
    [277, 'LOMA PYTA', 12],
    [171, 'PILAR', 13],
    [172, 'ALBERDI', 13],
    [173, 'CERRITO', 13],
    [174, 'DESMOCHADOS', 13],
    [175, 'GUAZU CUA', 13],
    [176, 'HUMAITA', 13],
    [177, 'ISLA UMBU', 13],
    [178, 'LAURELES', 13],
    [179, 'PASO DE PATRIA', 13],
    [180, 'MAYOR J.D.MARTINEZ', 13],
    [181, 'SAN JUAN DE ÑEEMBUCU', 13],
    [182, 'TACUARAS', 13],
    [183, 'VILLA OLIVA', 13],
    [184, 'VILLALBIN', 13],
    [203, 'GRAL.JOSE EDUVIGIS DIAZ', 13],
    [205, 'VILLA FRANCA', 13],
    [230, 'VILLA FRANCA', 13],
    [231, 'VILLALBIN', 13],
    [185, 'PEDRO JUAN CABALLERO', 14],
    [186, 'BELLA VISTA', 14],
    [187, 'CAPITAN BADO', 14],
    [278, 'KARAPAI', 14],
    [279, 'ZANJA PYTA', 14],
    [188, 'VILLA HAYES', 15],
    [189, 'BENJAMIN ACEVAL(MONTE SOCIEDAD', 15],
    [190, 'PTO.PINAZCO', 15],
    [191, 'NANAWA', 15],
    [206, 'POZO COLORADO', 15],
    [242, 'JOSE FALCON', 15],
    [261, 'TTE. 1RO. IRALA FERNANDEZ', 15],
    [264, 'TENIENTE ESTEBAN MARTINEZ', 15],
    [192, 'MCAL.ESTIGARRIBIA', 16],
    [193, 'BOQUERON', 16],
    [194, 'PEDRO P.PEÑA', 16],
    [234, 'GRAL. EUGENIO A. GARAY', 16],
    [259, 'FILADELFIA', 16],
    [260, 'LOMA PLATA', 16],
    [195, 'FUERTE OLIMPO', 17],
    [196, 'BAHIA NEGRA', 17],
    [218, 'PUERTO CASADO', 17],
    [223, 'PUERTO GUARANI', 17],
    [233, 'MAYOR PABLO LAGERENZA', 17],
    [266, 'CARMELO PERALTA', 17],
    [197, 'SAN ISIDRO DEL CURUGUATY', 18],
    [198, 'VILLA YGATIMI', 18],
    [199, 'YPEJHU', 18],
    [200, 'CORPUS CHRISTI', 18],
    [201, 'ITANARA', 18],
    [202, 'FRANCISCO CABALLERO ALVAREZ', 18],
    [207, 'SALTO DEL GUAIRA', 18],
    [235, 'LA PALOMA', 18],
    [236, 'KATUETE', 18],
    [238, 'NUEVA ESPERANZA', 18],
    [241, 'YASY KAÑY', 18],
    [271, 'YBYRAROBANA', 18],
    [274, 'YBY PYTA', 18],
    [283, 'MARACANA', 18],
    [284, 'PUERTO ADELA', 18],
  ],
);
