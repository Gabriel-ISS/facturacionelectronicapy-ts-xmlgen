import Table from '../helpers/Table';

export enum Country {
  MACEDONIA_DEL_NORTE = 'MKD',
  TAIWAN__PROVINCIA_DE_CHINA_ = 'TWN',
  ARGELIA = 'DZA',
  EGIPTO = 'EGY',
  LIBIA = 'LBY',
  MARRUECOS = 'MAR',
  SUDAN = 'SDN',
  TUNEZ = 'TUN',
  SAHARA_OCCIDENTAL = 'ESH',
  TERRITORIO_BRITANICO_DEL_OCEANO_INDICO = 'IOT',
  BURUNDI = 'BDI',
  COMORAS = 'COM',
  DJIBOUTI = 'DJI',
  ERITREA = 'ERI',
  ETIOPIA = 'ETH',
  TERRITORIO_DE_LAS_TIERRAS_AUSTRALES_FRANCESAS = 'ATF',
  KENYA = 'KEN',
  MADAGASCAR = 'MDG',
  MALAWI = 'MWI',
  MAURICIO = 'MUS',
  MAYOTTE = 'MYT',
  MOZAMBIQUE = 'MOZ',
  REUNION = 'REU',
  RWANDA = 'RWA',
  SEYCHELLES = 'SYC',
  SOMALIA = 'SOM',
  SUDAN_DEL_SUR = 'SSD',
  UGANDA = 'UGA',
  REPUBLICA_UNIDA_DE_TANZANIA = 'TZA',
  ZAMBIA = 'ZMB',
  ZIMBABWE = 'ZWE',
  ANGOLA = 'AGO',
  CAMERUN = 'CMR',
  REPUBLICA_CENTROAFRICANA = 'CAF',
  CHAD = 'TCD',
  CONGO = 'COG',
  REPUBLICA_DEMOCRATICA_DEL_CONGO = 'COD',
  GUINEA_ECUATORIAL = 'GNQ',
  GABON = 'GAB',
  SANTO_TOME_Y_PRINCIPE = 'STP',
  BOTSWANA = 'BWA',
  LESOTHO = 'LSO',
  NAMIBIA = 'NAM',
  SUDAFRICA = 'ZAF',
  SWAZILANDIA = 'SWZ',
  BENIN = 'BEN',
  BURKINA_FASO = 'BFA',
  CABO_VERDE = 'CPV',
  C_TE_D_IVOIRE = 'CIV',
  GAMBIA = 'GMB',
  GHANA = 'GHA',
  GUINEA = 'GIN',
  GUINEA_BISSAU = 'GNB',
  LIBERIA = 'LBR',
  MALI = 'MLI',
  MAURITANIA = 'MRT',
  NIGER = 'NER',
  NIGERIA = 'NGA',
  SANTA_ELENA = 'SHN',
  SENEGAL = 'SEN',
  SIERRA_LEONA = 'SLE',
  TOGO = 'TGO',
  ANGUILA = 'AIA',
  ANTIGUA_Y_BARBUDA = 'ATG',
  ARUBA = 'ABW',
  BAHAMAS = 'BHS',
  BARBADOS = 'BRB',
  BONAIRE__SAN_EUSTAQUIO_Y_SABA = 'BES',
  ISLAS_VIRGENES_BRITANICAS = 'VGB',
  ISLAS_CAIMAN = 'CYM',
  CUBA = 'CUB',
  CURA_AO = 'CUW',
  DOMINICA = 'DMA',
  REPUBLICA_DOMINICANA = 'DOM',
  GRANADA = 'GRD',
  GUADALUPE = 'GLP',
  HAITI = 'HTI',
  JAMAICA = 'JAM',
  MARTINICA = 'MTQ',
  MONTSERRAT = 'MSR',
  PUERTO_RICO = 'PRI',
  SAN_BARTOLOME = 'BLM',
  SAINT_KITTS_Y_NEVIS = 'KNA',
  SANTA_LUCIA = 'LCA',
  SAN_MARTIN__PARTE_FRANCESA_ = 'MAF',
  SAN_VICENTE_Y_LAS_GRANADINAS = 'VCT',
  SAN_MARTIN__PARTE_HOLANDES_ = 'SXM',
  TRINIDAD_Y_TABAGO = 'TTO',
  ISLAS_TURCAS_Y_CAICOS = 'TCA',
  ISLAS_VIRGENES_DE_LOS_ESTADOS_UNIDOS = 'VIR',
  BELICE = 'BLZ',
  COSTA_RICA = 'CRI',
  EL_SALVADOR = 'SLV',
  GUATEMALA = 'GTM',
  HONDURAS = 'HND',
  MEXICO = 'MEX',
  NICARAGUA = 'NIC',
  PANAMA = 'PAN',
  ARGENTINA = 'ARG',
  BOLIVIA__ESTADO_PLURINACIONAL_DE_ = 'BOL',
  BRASIL = 'BRA',
  CHILE = 'CHL',
  COLOMBIA = 'COL',
  ECUADOR = 'ECU',
  ISLAS_MALVINAS__FALKLAND_ = 'FLK',
  GUAYANA_FRANCESA = 'GUF',
  GUYANA = 'GUY',
  PARAGUAY = 'PRY',
  PERU = 'PER',
  GEORGIA_DEL_SUR_Y_LAS_ISLAS_SANDWICH_DEL_SUR = 'SGS',
  SURINAME = 'SUR',
  URUGUAY = 'URY',
  VENEZUELA__REPUBLICA_BOLIVARIANA_DE_ = 'VEN',
  BERMUDA = 'BMU',
  CANADA = 'CAN',
  GROENLANDIA = 'GRL',
  SAINT_PIERRE_Y_MIQUELON = 'SPM',
  ESTADOS_UNIDOS_DE_AMERICA = 'USA',
  ANTARTIDA = 'ATA',
  KAZAJSTAN = 'KAZ',
  KIRGUISTAN = 'KGZ',
  TAYIKISTAN = 'TJK',
  TURKMENISTAN = 'TKM',
  UZBEKISTAN = 'UZB',
  CHINA = 'CHN',
  CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_HONG_KONG = 'HKG',
  CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_MACAO = 'MAC',
  REPUBLICA_POPULAR_DEMOCRATICA_DE_COREA = 'PRK',
  JAPON = 'JPN',
  MONGOLIA = 'MNG',
  REPUBLICA_DE_COREA = 'KOR',
  BRUNEI_DARUSSALAM = 'BRN',
  CAMBOYA = 'KHM',
  INDONESIA = 'IDN',
  REPUBLICA_DEMOCRATICA_POPULAR_LAO = 'LAO',
  MALASIA = 'MYS',
  MYANMAR = 'MMR',
  FILIPINAS = 'PHL',
  SINGAPUR = 'SGP',
  TAILANDIA = 'THA',
  TIMOR_LESTE = 'TLS',
  VIET_NAM = 'VNM',
  AFGANISTAN = 'AFG',
  BANGLADESH = 'BGD',
  BHUTAN = 'BTN',
  INDIA = 'IND',
  IRAN__REPUBLICA_ISLAMICA_DE_ = 'IRN',
  MALDIVAS = 'MDV',
  NEPAL = 'NPL',
  PAKISTAN = 'PAK',
  SRI_LANKA = 'LKA',
  ARMENIA = 'ARM',
  AZERBAIYAN = 'AZE',
  BAHREIN = 'BHR',
  CHIPRE = 'CYP',
  GEORGIA = 'GEO',
  IRAQ = 'IRQ',
  ISRAEL = 'ISR',
  JORDANIA = 'JOR',
  KUWAIT = 'KWT',
  LIBANO = 'LBN',
  OMAN = 'OMN',
  QATAR = 'QAT',
  ARABIA_SAUDITA = 'SAU',
  ESTADO_DE_PALESTINA = 'PSE',
  REPUBLICA_ARABE_SIRIA = 'SYR',
  TURQUIA = 'TUR',
  EMIRATOS_ARABES_UNIDOS = 'ARE',
  YEMEN = 'YEM',
  BELARUS = 'BLR',
  BULGARIA = 'BGR',
  CHEQUIA = 'CZE',
  HUNGRIA = 'HUN',
  POLONIA = 'POL',
  REPUBLICA_DE_MOLDOVA = 'MDA',
  RUMANIA = 'ROU',
  FEDERACION_DE_RUSIA = 'RUS',
  ESLOVAQUIA = 'SVK',
  UCRANIA = 'UKR',
  ISLAS__LAND = 'ALA',
  GUERNSEY = 'GGY',
  JERSEY = 'JEY',
  DINAMARCA = 'DNK',
  ESTONIA = 'EST',
  ISLAS_FEROE = 'FRO',
  FINLANDIA = 'FIN',
  ISLANDIA = 'ISL',
  IRLANDA = 'IRL',
  ISLA_DE_MAN = 'IMN',
  LETONIA = 'LVA',
  LITUANIA = 'LTU',
  NORUEGA = 'NOR',
  ISLAS_SVALBARD_Y_JAN_MAYEN = 'SJM',
  SUECIA = 'SWE',
  REINO_UNIDO_DE_GRAN_BRETANA_E_IRLANDA_DEL_NORTE = 'GBR',
  ALBANIA = 'ALB',
  ANDORRA = 'AND',
  BOSNIA_Y_HERZEGOVINA = 'BIH',
  CROACIA = 'HRV',
  GIBRALTAR = 'GIB',
  GRECIA = 'GRC',
  SANTA_SEDE = 'VAT',
  ITALIA = 'ITA',
  MALTA = 'MLT',
  MONTENEGRO = 'MNE',
  PORTUGAL = 'PRT',
  SAN_MARINO = 'SMR',
  SERBIA = 'SRB',
  ESLOVENIA = 'SVN',
  ESPANA = 'ESP',
  EX_REPUBLICA_YUGOSLAVA_DE_MACEDONIA = 'MKD',
  AUSTRIA = 'AUT',
  BELGICA = 'BEL',
  FRANCIA = 'FRA',
  ALEMANIA = 'DEU',
  LIECHTENSTEIN = 'LIE',
  LUXEMBURGO = 'LUX',
  MONACO = 'MCO',
  PAISES_BAJOS = 'NLD',
  SUIZA = 'CHE',
  AUSTRALIA = 'AUS',
  ISLA_DE_NAVIDAD = 'CXR',
  ISLAS_COCOS__KEELING_ = 'CCK',
  ISLAS_HEARD_Y_MCDONALD = 'HMD',
  NUEVA_ZELANDIA = 'NZL',
  ISLAS_NORFOLK = 'NFK',
  FIJI = 'FJI',
  NUEVA_CALEDONIA = 'NCL',
  PAPUA_NUEVA_GUINEA = 'PNG',
  ISLAS_SALOMON = 'SLB',
  VANUATU = 'VUT',
  GUAM = 'GUM',
  KIRIBATI = 'KIR',
  ISLAS_MARSHALL = 'MHL',
  MICRONESIA__ESTADOS_FEDERADOS_DE_ = 'FSM',
  NAURU = 'NRU',
  ISLAS_MARIANAS_SEPTENTRIONALES = 'MNP',
  PALAU = 'PLW',
  ISLAS_MENORES_ALEJADAS_DE_ESTADOS_UNIDOS = 'UMI',
  SAMOA_AMERICANA = 'ASM',
  ISLAS_COOK = 'COK',
  POLINESIA_FRANCESA = 'PYF',
  NIUE = 'NIU',
  PITCAIRN = 'PCN',
  SAMOA = 'WSM',
  TOKELAU = 'TKL',
  TONGA = 'TON',
  TUVALU = 'TUV',
  ISLAS_WALLIS_Y_FUTUNA = 'WLF',
  NO_EXISTE = 'NN',
}

export default new Table<{
  0: ['_id', `${Country}`];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    ['MKD', 'Macedonia del Norte'],
    ['TWN', 'Taiwán (Provincia de China)'],
    ['DZA', 'Argelia'],
    ['EGY', 'Egipto'],
    ['LBY', 'Libia'],
    ['MAR', 'Marruecos'],
    ['SDN', 'Sudán'],
    ['TUN', 'Túnez'],
    ['ESH', 'Sáhara Occidental'],
    ['IOT', 'Territorio Británico del Océano Índico'],
    ['BDI', 'Burundi'],
    ['COM', 'Comoras'],
    ['DJI', 'Djibouti'],
    ['ERI', 'Eritrea'],
    ['ETH', 'Etiopía'],
    ['ATF', 'Territorio de las Tierras Australes Francesas'],
    ['KEN', 'Kenya'],
    ['MDG', 'Madagascar'],
    ['MWI', 'Malawi'],
    ['MUS', 'Mauricio'],
    ['MYT', 'Mayotte'],
    ['MOZ', 'Mozambique'],
    ['REU', 'Reunión'],
    ['RWA', 'Rwanda'],
    ['SYC', 'Seychelles'],
    ['SOM', 'Somalia'],
    ['SSD', 'Sudán del Sur'],
    ['UGA', 'Uganda'],
    ['TZA', 'República Unida de Tanzanía'],
    ['ZMB', 'Zambia'],
    ['ZWE', 'Zimbabwe'],
    ['AGO', 'Angola'],
    ['CMR', 'Camerún'],
    ['CAF', 'República Centroafricana'],
    ['TCD', 'Chad'],
    ['COG', 'Congo'],
    ['COD', 'República Democrática del Congo'],
    ['GNQ', 'Guinea Ecuatorial'],
    ['GAB', 'Gabón'],
    ['STP', 'Santo Tomé y Príncipe'],
    ['BWA', 'Botswana'],
    ['LSO', 'Lesotho'],
    ['NAM', 'Namibia'],
    ['ZAF', 'Sudáfrica'],
    ['SWZ', 'Swazilandia'],
    ['BEN', 'Benin'],
    ['BFA', 'Burkina Faso'],
    ['CPV', 'Cabo Verde'],
    ['CIV', "Côte d'Ivoire"],
    ['GMB', 'Gambia'],
    ['GHA', 'Ghana'],
    ['GIN', 'Guinea'],
    ['GNB', 'Guinea-Bissau'],
    ['LBR', 'Liberia'],
    ['MLI', 'Malí'],
    ['MRT', 'Mauritania'],
    ['NER', 'Níger'],
    ['NGA', 'Nigeria'],
    ['SHN', 'Santa Elena'],
    ['SEN', 'Senegal'],
    ['SLE', 'Sierra Leona'],
    ['TGO', 'Togo'],
    ['AIA', 'Anguila'],
    ['ATG', 'Antigua y Barbuda'],
    ['ABW', 'Aruba'],
    ['BHS', 'Bahamas'],
    ['BRB', 'Barbados'],
    ['BES', 'Bonaire, San Eustaquio y Saba'],
    ['VGB', 'Islas Vírgenes Británicas'],
    ['CYM', 'Islas Caimán'],
    ['CUB', 'CUBA'],
    ['CUW', 'Curaçao'],
    ['DMA', 'Dominica'],
    ['DOM', 'República Dominicana'],
    ['GRD', 'Granada'],
    ['GLP', 'Guadalupe'],
    ['HTI', 'Haití'],
    ['JAM', 'Jamaica'],
    ['MTQ', 'Martinica'],
    ['MSR', 'Montserrat'],
    ['PRI', 'Puerto Rico'],
    ['BLM', 'San Bartolomé'],
    ['KNA', 'Saint Kitts y Nevis'],
    ['LCA', 'Santa Lucía'],
    ['MAF', 'San Martín (parte francesa)'],
    ['VCT', 'San Vicente y las Granadinas'],
    ['SXM', 'San Martín (parte holandés)'],
    ['TTO', 'Trinidad y Tabago'],
    ['TCA', 'Islas Turcas y Caicos'],
    ['VIR', 'Islas Vírgenes de los Estados Unidos'],
    ['BLZ', 'Belice'],
    ['CRI', 'Costa Rica'],
    ['SLV', 'El Salvador'],
    ['GTM', 'Guatemala'],
    ['HND', 'Honduras'],
    ['MEX', 'México'],
    ['NIC', 'Nicaragua'],
    ['PAN', 'Panamá'],
    ['ARG', 'Argentina'],
    ['BOL', 'Bolivia (Estado Plurinacional de)'],
    ['BRA', 'Brasil'],
    ['CHL', 'Chile'],
    ['COL', 'Colombia'],
    ['ECU', 'Ecuador'],
    ['FLK', 'Islas Malvinas (Falkland)'],
    ['GUF', 'Guayana Francesa'],
    ['GUY', 'Guyana'],
    ['PRY', 'Paraguay'],
    ['PER', 'Perú'],
    ['SGS', 'Georgia del Sur y las Islas Sandwich del Sur'],
    ['SUR', 'Suriname'],
    ['URY', 'Uruguay'],
    ['VEN', 'Venezuela (República Bolivariana de)'],
    ['BMU', 'Bermuda'],
    ['CAN', 'Canadá'],
    ['GRL', 'Groenlandia'],
    ['SPM', 'Saint Pierre y Miquelon'],
    ['USA', 'Estados Unidos de América'],
    ['ATA', 'Antártida'],
    ['KAZ', 'Kazajstán'],
    ['KGZ', 'Kirguistán'],
    ['TJK', 'Tayikistán'],
    ['TKM', 'Turkmenistán'],
    ['UZB', 'Uzbekistán'],
    ['CHN', 'China'],
    ['HKG', 'China, región administrativa especial de Hong Kong'],
    ['MAC', 'China, región administrativa especial de Macao'],
    ['PRK', 'República Popular Democrática de Corea'],
    ['JPN', 'Japón'],
    ['MNG', 'Mongolia'],
    ['KOR', 'República de Corea'],
    ['BRN', 'Brunei Darussalam'],
    ['KHM', 'Camboya'],
    ['IDN', 'Indonesia'],
    ['LAO', 'República Democrática Popular Lao'],
    ['MYS', 'Malasia'],
    ['MMR', 'Myanmar'],
    ['PHL', 'Filipinas'],
    ['SGP', 'Singapur'],
    ['THA', 'Tailandia'],
    ['TLS', 'Timor-Leste'],
    ['VNM', 'Viet Nam'],
    ['AFG', 'Afganistán'],
    ['BGD', 'Bangladesh'],
    ['BTN', 'Bhután'],
    ['IND', 'India'],
    ['IRN', 'Irán (República Islámica de)'],
    ['MDV', 'Maldivas'],
    ['NPL', 'Nepal'],
    ['PAK', 'Pakistán'],
    ['LKA', 'Sri Lanka'],
    ['ARM', 'Armenia'],
    ['AZE', 'Azerbaiyán'],
    ['BHR', 'Bahrein'],
    ['CYP', 'Chipre'],
    ['GEO', 'Georgia'],
    ['IRQ', 'Iraq'],
    ['ISR', 'Israel'],
    ['JOR', 'Jordania'],
    ['KWT', 'Kuwait'],
    ['LBN', 'Líbano'],
    ['OMN', 'Omán'],
    ['QAT', 'Qatar'],
    ['SAU', 'Arabia Saudita'],
    ['PSE', 'Estado de Palestina'],
    ['SYR', 'República Árabe Siria'],
    ['TUR', 'Turquía'],
    ['ARE', 'Emiratos Árabes Unidos'],
    ['YEM', 'Yemen'],
    ['BLR', 'Belarús'],
    ['BGR', 'Bulgaria'],
    ['CZE', 'Chequia'],
    ['HUN', 'Hungría'],
    ['POL', 'Polonia'],
    ['MDA', 'República de Moldova'],
    ['ROU', 'Rumania'],
    ['RUS', 'Federación de Rusia'],
    ['SVK', 'Eslovaquia'],
    ['UKR', 'Ucrania'],
    ['ALA', 'Islas Åland'],
    ['GGY', 'Guernsey'],
    ['JEY', 'Jersey'],
    ['DNK', 'Dinamarca'],
    ['EST', 'Estonia'],
    ['FRO', 'Islas Feroe'],
    ['FIN', 'Finlandia'],
    ['ISL', 'Islandia'],
    ['IRL', 'Irlanda'],
    ['IMN', 'Isla de Man'],
    ['LVA', 'Letonia'],
    ['LTU', 'Lituania'],
    ['NOR', 'Noruega'],
    ['SJM', 'Islas Svalbard y Jan Mayen'],
    ['SWE', 'Suecia'],
    ['GBR', 'Reino Unido de Gran Bretaña e Irlanda del Norte'],
    ['ALB', 'Albania'],
    ['AND', 'Andorra'],
    ['BIH', 'Bosnia y Herzegovina'],
    ['HRV', 'Croacia'],
    ['GIB', 'Gibraltar'],
    ['GRC', 'Grecia'],
    ['VAT', 'Santa Sede'],
    ['ITA', 'Italia'],
    ['MLT', 'Malta'],
    ['MNE', 'Montenegro'],
    ['PRT', 'Portugal'],
    ['SMR', 'San Marino'],
    ['SRB', 'Serbia'],
    ['SVN', 'Eslovenia'],
    ['ESP', 'España'],
    ['MKD', 'ex República Yugoslava de Macedonia'],
    ['AUT', 'Austria'],
    ['BEL', 'Bélgica'],
    ['FRA', 'Francia'],
    ['DEU', 'Alemania'],
    ['LIE', 'Liechtenstein'],
    ['LUX', 'Luxemburgo'],
    ['MCO', 'Mónaco'],
    ['NLD', 'Países Bajos'],
    ['CHE', 'Suiza'],
    ['AUS', 'Australia'],
    ['CXR', 'Isla de Navidad'],
    ['CCK', 'Islas Cocos (Keeling)'],
    ['HMD', 'Islas Heard y McDonald'],
    ['NZL', 'Nueva Zelandia'],
    ['NFK', 'Islas Norfolk'],
    ['FJI', 'Fiji'],
    ['NCL', 'Nueva Caledonia'],
    ['PNG', 'Papua Nueva Guinea'],
    ['SLB', 'Islas Salomón'],
    ['VUT', 'Vanuatu'],
    ['GUM', 'Guam'],
    ['KIR', 'Kiribati'],
    ['MHL', 'Islas Marshall'],
    ['FSM', 'Micronesia (Estados Federados de)'],
    ['NRU', 'Nauru'],
    ['MNP', 'Islas Marianas Septentrionales'],
    ['PLW', 'Palau'],
    ['UMI', 'Islas menores alejadas de Estados Unidos'],
    ['ASM', 'Samoa Americana'],
    ['COK', 'Islas Cook'],
    ['PYF', 'Polinesia Francesa'],
    ['NIU', 'Niue'],
    ['PCN', 'Pitcairn'],
    ['WSM', 'Samoa'],
    ['TKL', 'Tokelau'],
    ['TON', 'Tonga'],
    ['TUV', 'Tuvalu'],
    ['WLF', 'Islas Wallis y Futuna'],
    ['NN', 'NO EXISTE'],
  ],
);
