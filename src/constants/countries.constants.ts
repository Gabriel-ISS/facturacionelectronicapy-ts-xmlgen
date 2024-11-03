import { BasicData } from '../services/constants.service';

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

export const countries: BasicData<Country>[] = [
  {
    _id: Country.MACEDONIA_DEL_NORTE,
    description: 'Macedonia del Norte',
  },
  {
    _id: Country.TAIWAN__PROVINCIA_DE_CHINA_,
    description: 'Taiwán (Provincia de China)',
  },
  {
    _id: Country.ARGELIA,
    description: 'Argelia',
  },
  {
    _id: Country.EGIPTO,
    description: 'Egipto',
  },
  {
    _id: Country.LIBIA,
    description: 'Libia',
  },
  {
    _id: Country.MARRUECOS,
    description: 'Marruecos',
  },
  {
    _id: Country.SUDAN,
    description: 'Sudán',
  },
  {
    _id: Country.TUNEZ,
    description: 'Túnez',
  },
  {
    _id: Country.SAHARA_OCCIDENTAL,
    description: 'Sáhara Occidental',
  },
  {
    _id: Country.TERRITORIO_BRITANICO_DEL_OCEANO_INDICO,
    description: 'Territorio Británico del Océano Índico',
  },
  {
    _id: Country.BURUNDI,
    description: 'Burundi',
  },
  {
    _id: Country.COMORAS,
    description: 'Comoras',
  },
  {
    _id: Country.DJIBOUTI,
    description: 'Djibouti',
  },
  {
    _id: Country.ERITREA,
    description: 'Eritrea',
  },
  {
    _id: Country.ETIOPIA,
    description: 'Etiopía',
  },
  {
    _id: Country.TERRITORIO_DE_LAS_TIERRAS_AUSTRALES_FRANCESAS,
    description: 'Territorio de las Tierras Australes Francesas',
  },
  {
    _id: Country.KENYA,
    description: 'Kenya',
  },
  {
    _id: Country.MADAGASCAR,
    description: 'Madagascar',
  },
  {
    _id: Country.MALAWI,
    description: 'Malawi',
  },
  {
    _id: Country.MAURICIO,
    description: 'Mauricio',
  },
  {
    _id: Country.MAYOTTE,
    description: 'Mayotte',
  },
  {
    _id: Country.MOZAMBIQUE,
    description: 'Mozambique',
  },
  {
    _id: Country.REUNION,
    description: 'Reunión',
  },
  {
    _id: Country.RWANDA,
    description: 'Rwanda',
  },
  {
    _id: Country.SEYCHELLES,
    description: 'Seychelles',
  },
  {
    _id: Country.SOMALIA,
    description: 'Somalia',
  },
  {
    _id: Country.SUDAN_DEL_SUR,
    description: 'Sudán del Sur',
  },
  {
    _id: Country.UGANDA,
    description: 'Uganda',
  },
  {
    _id: Country.REPUBLICA_UNIDA_DE_TANZANIA,
    description: 'República Unida de Tanzanía',
  },
  {
    _id: Country.ZAMBIA,
    description: 'Zambia',
  },
  {
    _id: Country.ZIMBABWE,
    description: 'Zimbabwe',
  },
  {
    _id: Country.ANGOLA,
    description: 'Angola',
  },
  {
    _id: Country.CAMERUN,
    description: 'Camerún',
  },
  {
    _id: Country.REPUBLICA_CENTROAFRICANA,
    description: 'República Centroafricana',
  },
  {
    _id: Country.CHAD,
    description: 'Chad',
  },
  {
    _id: Country.CONGO,
    description: 'Congo',
  },
  {
    _id: Country.REPUBLICA_DEMOCRATICA_DEL_CONGO,
    description: 'República Democrática del Congo',
  },
  {
    _id: Country.GUINEA_ECUATORIAL,
    description: 'Guinea Ecuatorial',
  },
  {
    _id: Country.GABON,
    description: 'Gabón',
  },
  {
    _id: Country.SANTO_TOME_Y_PRINCIPE,
    description: 'Santo Tomé y Príncipe',
  },
  {
    _id: Country.BOTSWANA,
    description: 'Botswana',
  },
  {
    _id: Country.LESOTHO,
    description: 'Lesotho',
  },
  {
    _id: Country.NAMIBIA,
    description: 'Namibia',
  },
  {
    _id: Country.SUDAFRICA,
    description: 'Sudáfrica',
  },
  {
    _id: Country.SWAZILANDIA,
    description: 'Swazilandia',
  },
  {
    _id: Country.BENIN,
    description: 'Benin',
  },
  {
    _id: Country.BURKINA_FASO,
    description: 'Burkina Faso',
  },
  {
    _id: Country.CABO_VERDE,
    description: 'Cabo Verde',
  },
  {
    _id: Country.C_TE_D_IVOIRE,
    description: "Côte d'Ivoire",
  },
  {
    _id: Country.GAMBIA,
    description: 'Gambia',
  },
  {
    _id: Country.GHANA,
    description: 'Ghana',
  },
  {
    _id: Country.GUINEA,
    description: 'Guinea',
  },
  {
    _id: Country.GUINEA_BISSAU,
    description: 'Guinea-Bissau',
  },
  {
    _id: Country.LIBERIA,
    description: 'Liberia',
  },
  {
    _id: Country.MALI,
    description: 'Malí',
  },
  {
    _id: Country.MAURITANIA,
    description: 'Mauritania',
  },
  {
    _id: Country.NIGER,
    description: 'Níger',
  },
  {
    _id: Country.NIGERIA,
    description: 'Nigeria',
  },
  {
    _id: Country.SANTA_ELENA,
    description: 'Santa Elena',
  },
  {
    _id: Country.SENEGAL,
    description: 'Senegal',
  },
  {
    _id: Country.SIERRA_LEONA,
    description: 'Sierra Leona',
  },
  {
    _id: Country.TOGO,
    description: 'Togo',
  },
  {
    _id: Country.ANGUILA,
    description: 'Anguila',
  },
  {
    _id: Country.ANTIGUA_Y_BARBUDA,
    description: 'Antigua y Barbuda',
  },
  {
    _id: Country.ARUBA,
    description: 'Aruba',
  },
  {
    _id: Country.BAHAMAS,
    description: 'Bahamas',
  },
  {
    _id: Country.BARBADOS,
    description: 'Barbados',
  },
  {
    _id: Country.BONAIRE__SAN_EUSTAQUIO_Y_SABA,
    description: 'Bonaire, San Eustaquio y Saba',
  },
  {
    _id: Country.ISLAS_VIRGENES_BRITANICAS,
    description: 'Islas Vírgenes Británicas',
  },
  {
    _id: Country.ISLAS_CAIMAN,
    description: 'Islas Caimán',
  },
  {
    _id: Country.CUBA,
    description: 'CUBA',
  },
  {
    _id: Country.CURA_AO,
    description: 'Curaçao',
  },
  {
    _id: Country.DOMINICA,
    description: 'Dominica',
  },
  {
    _id: Country.REPUBLICA_DOMINICANA,
    description: 'República Dominicana',
  },
  {
    _id: Country.GRANADA,
    description: 'Granada',
  },
  {
    _id: Country.GUADALUPE,
    description: 'Guadalupe',
  },
  {
    _id: Country.HAITI,
    description: 'Haití',
  },
  {
    _id: Country.JAMAICA,
    description: 'Jamaica',
  },
  {
    _id: Country.MARTINICA,
    description: 'Martinica',
  },
  {
    _id: Country.MONTSERRAT,
    description: 'Montserrat',
  },
  {
    _id: Country.PUERTO_RICO,
    description: 'Puerto Rico',
  },
  {
    _id: Country.SAN_BARTOLOME,
    description: 'San Bartolomé',
  },
  {
    _id: Country.SAINT_KITTS_Y_NEVIS,
    description: 'Saint Kitts y Nevis',
  },
  {
    _id: Country.SANTA_LUCIA,
    description: 'Santa Lucía',
  },
  {
    _id: Country.SAN_MARTIN__PARTE_FRANCESA_,
    description: 'San Martín (parte francesa)',
  },
  {
    _id: Country.SAN_VICENTE_Y_LAS_GRANADINAS,
    description: 'San Vicente y las Granadinas',
  },
  {
    _id: Country.SAN_MARTIN__PARTE_HOLANDES_,
    description: 'San Martín (parte holandés)',
  },
  {
    _id: Country.TRINIDAD_Y_TABAGO,
    description: 'Trinidad y Tabago',
  },
  {
    _id: Country.ISLAS_TURCAS_Y_CAICOS,
    description: 'Islas Turcas y Caicos',
  },
  {
    _id: Country.ISLAS_VIRGENES_DE_LOS_ESTADOS_UNIDOS,
    description: 'Islas Vírgenes de los Estados Unidos',
  },
  {
    _id: Country.BELICE,
    description: 'Belice',
  },
  {
    _id: Country.COSTA_RICA,
    description: 'Costa Rica',
  },
  {
    _id: Country.EL_SALVADOR,
    description: 'El Salvador',
  },
  {
    _id: Country.GUATEMALA,
    description: 'Guatemala',
  },
  {
    _id: Country.HONDURAS,
    description: 'Honduras',
  },
  {
    _id: Country.MEXICO,
    description: 'México',
  },
  {
    _id: Country.NICARAGUA,
    description: 'Nicaragua',
  },
  {
    _id: Country.PANAMA,
    description: 'Panamá',
  },
  {
    _id: Country.ARGENTINA,
    description: 'Argentina',
  },
  {
    _id: Country.BOLIVIA__ESTADO_PLURINACIONAL_DE_,
    description: 'Bolivia (Estado Plurinacional de)',
  },
  {
    _id: Country.BRASIL,
    description: 'Brasil',
  },
  {
    _id: Country.CHILE,
    description: 'Chile',
  },
  {
    _id: Country.COLOMBIA,
    description: 'Colombia',
  },
  {
    _id: Country.ECUADOR,
    description: 'Ecuador',
  },
  {
    _id: Country.ISLAS_MALVINAS__FALKLAND_,
    description: 'Islas Malvinas (Falkland)',
  },
  {
    _id: Country.GUAYANA_FRANCESA,
    description: 'Guayana Francesa',
  },
  {
    _id: Country.GUYANA,
    description: 'Guyana',
  },
  {
    _id: Country.PARAGUAY,
    description: 'Paraguay',
  },
  {
    _id: Country.PERU,
    description: 'Perú',
  },
  {
    _id: Country.GEORGIA_DEL_SUR_Y_LAS_ISLAS_SANDWICH_DEL_SUR,
    description: 'Georgia del Sur y las Islas Sandwich del Sur',
  },
  {
    _id: Country.SURINAME,
    description: 'Suriname',
  },
  {
    _id: Country.URUGUAY,
    description: 'Uruguay',
  },
  {
    _id: Country.VENEZUELA__REPUBLICA_BOLIVARIANA_DE_,
    description: 'Venezuela (República Bolivariana de)',
  },
  {
    _id: Country.BERMUDA,
    description: 'Bermuda',
  },
  {
    _id: Country.CANADA,
    description: 'Canadá',
  },
  {
    _id: Country.GROENLANDIA,
    description: 'Groenlandia',
  },
  {
    _id: Country.SAINT_PIERRE_Y_MIQUELON,
    description: 'Saint Pierre y Miquelon',
  },
  {
    _id: Country.ESTADOS_UNIDOS_DE_AMERICA,
    description: 'Estados Unidos de América',
  },
  {
    _id: Country.ANTARTIDA,
    description: 'Antártida',
  },
  {
    _id: Country.KAZAJSTAN,
    description: 'Kazajstán',
  },
  {
    _id: Country.KIRGUISTAN,
    description: 'Kirguistán',
  },
  {
    _id: Country.TAYIKISTAN,
    description: 'Tayikistán',
  },
  {
    _id: Country.TURKMENISTAN,
    description: 'Turkmenistán',
  },
  {
    _id: Country.UZBEKISTAN,
    description: 'Uzbekistán',
  },
  {
    _id: Country.CHINA,
    description: 'China',
  },
  {
    _id: Country.CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_HONG_KONG,
    description: 'China, región administrativa especial de Hong Kong',
  },
  {
    _id: Country.CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_MACAO,
    description: 'China, región administrativa especial de Macao',
  },
  {
    _id: Country.REPUBLICA_POPULAR_DEMOCRATICA_DE_COREA,
    description: 'República Popular Democrática de Corea',
  },
  {
    _id: Country.JAPON,
    description: 'Japón',
  },
  {
    _id: Country.MONGOLIA,
    description: 'Mongolia',
  },
  {
    _id: Country.REPUBLICA_DE_COREA,
    description: 'República de Corea',
  },
  {
    _id: Country.BRUNEI_DARUSSALAM,
    description: 'Brunei Darussalam',
  },
  {
    _id: Country.CAMBOYA,
    description: 'Camboya',
  },
  {
    _id: Country.INDONESIA,
    description: 'Indonesia',
  },
  {
    _id: Country.REPUBLICA_DEMOCRATICA_POPULAR_LAO,
    description: 'República Democrática Popular Lao',
  },
  {
    _id: Country.MALASIA,
    description: 'Malasia',
  },
  {
    _id: Country.MYANMAR,
    description: 'Myanmar',
  },
  {
    _id: Country.FILIPINAS,
    description: 'Filipinas',
  },
  {
    _id: Country.SINGAPUR,
    description: 'Singapur',
  },
  {
    _id: Country.TAILANDIA,
    description: 'Tailandia',
  },
  {
    _id: Country.TIMOR_LESTE,
    description: 'Timor-Leste',
  },
  {
    _id: Country.VIET_NAM,
    description: 'Viet Nam',
  },
  {
    _id: Country.AFGANISTAN,
    description: 'Afganistán',
  },
  {
    _id: Country.BANGLADESH,
    description: 'Bangladesh',
  },
  {
    _id: Country.BHUTAN,
    description: 'Bhután',
  },
  {
    _id: Country.INDIA,
    description: 'India',
  },
  {
    _id: Country.IRAN__REPUBLICA_ISLAMICA_DE_,
    description: 'Irán (República Islámica de)',
  },
  {
    _id: Country.MALDIVAS,
    description: 'Maldivas',
  },
  {
    _id: Country.NEPAL,
    description: 'Nepal',
  },
  {
    _id: Country.PAKISTAN,
    description: 'Pakistán',
  },
  {
    _id: Country.SRI_LANKA,
    description: 'Sri Lanka',
  },
  {
    _id: Country.ARMENIA,
    description: 'Armenia',
  },
  {
    _id: Country.AZERBAIYAN,
    description: 'Azerbaiyán',
  },
  {
    _id: Country.BAHREIN,
    description: 'Bahrein',
  },
  {
    _id: Country.CHIPRE,
    description: 'Chipre',
  },
  {
    _id: Country.GEORGIA,
    description: 'Georgia',
  },
  {
    _id: Country.IRAQ,
    description: 'Iraq',
  },
  {
    _id: Country.ISRAEL,
    description: 'Israel',
  },
  {
    _id: Country.JORDANIA,
    description: 'Jordania',
  },
  {
    _id: Country.KUWAIT,
    description: 'Kuwait',
  },
  {
    _id: Country.LIBANO,
    description: 'Líbano',
  },
  {
    _id: Country.OMAN,
    description: 'Omán',
  },
  {
    _id: Country.QATAR,
    description: 'Qatar',
  },
  {
    _id: Country.ARABIA_SAUDITA,
    description: 'Arabia Saudita',
  },
  {
    _id: Country.ESTADO_DE_PALESTINA,
    description: 'Estado de Palestina',
  },
  {
    _id: Country.REPUBLICA_ARABE_SIRIA,
    description: 'República Árabe Siria',
  },
  {
    _id: Country.TURQUIA,
    description: 'Turquía',
  },
  {
    _id: Country.EMIRATOS_ARABES_UNIDOS,
    description: 'Emiratos Árabes Unidos',
  },
  {
    _id: Country.YEMEN,
    description: 'Yemen',
  },
  {
    _id: Country.BELARUS,
    description: 'Belarús',
  },
  {
    _id: Country.BULGARIA,
    description: 'Bulgaria',
  },
  {
    _id: Country.CHEQUIA,
    description: 'Chequia',
  },
  {
    _id: Country.HUNGRIA,
    description: 'Hungría',
  },
  {
    _id: Country.POLONIA,
    description: 'Polonia',
  },
  {
    _id: Country.REPUBLICA_DE_MOLDOVA,
    description: 'República de Moldova',
  },
  {
    _id: Country.RUMANIA,
    description: 'Rumania',
  },
  {
    _id: Country.FEDERACION_DE_RUSIA,
    description: 'Federación de Rusia',
  },
  {
    _id: Country.ESLOVAQUIA,
    description: 'Eslovaquia',
  },
  {
    _id: Country.UCRANIA,
    description: 'Ucrania',
  },
  {
    _id: Country.ISLAS__LAND,
    description: 'Islas Åland',
  },
  {
    _id: Country.GUERNSEY,
    description: 'Guernsey',
  },
  {
    _id: Country.JERSEY,
    description: 'Jersey',
  },
  {
    _id: Country.DINAMARCA,
    description: 'Dinamarca',
  },
  {
    _id: Country.ESTONIA,
    description: 'Estonia',
  },
  {
    _id: Country.ISLAS_FEROE,
    description: 'Islas Feroe',
  },
  {
    _id: Country.FINLANDIA,
    description: 'Finlandia',
  },
  {
    _id: Country.ISLANDIA,
    description: 'Islandia',
  },
  {
    _id: Country.IRLANDA,
    description: 'Irlanda',
  },
  {
    _id: Country.ISLA_DE_MAN,
    description: 'Isla de Man',
  },
  {
    _id: Country.LETONIA,
    description: 'Letonia',
  },
  {
    _id: Country.LITUANIA,
    description: 'Lituania',
  },
  {
    _id: Country.NORUEGA,
    description: 'Noruega',
  },
  {
    _id: Country.ISLAS_SVALBARD_Y_JAN_MAYEN,
    description: 'Islas Svalbard y Jan Mayen',
  },
  {
    _id: Country.SUECIA,
    description: 'Suecia',
  },
  {
    _id: Country.REINO_UNIDO_DE_GRAN_BRETANA_E_IRLANDA_DEL_NORTE,
    description: 'Reino Unido de Gran Bretaña e Irlanda del Norte',
  },
  {
    _id: Country.ALBANIA,
    description: 'Albania',
  },
  {
    _id: Country.ANDORRA,
    description: 'Andorra',
  },
  {
    _id: Country.BOSNIA_Y_HERZEGOVINA,
    description: 'Bosnia y Herzegovina',
  },
  {
    _id: Country.CROACIA,
    description: 'Croacia',
  },
  {
    _id: Country.GIBRALTAR,
    description: 'Gibraltar',
  },
  {
    _id: Country.GRECIA,
    description: 'Grecia',
  },
  {
    _id: Country.SANTA_SEDE,
    description: 'Santa Sede',
  },
  {
    _id: Country.ITALIA,
    description: 'Italia',
  },
  {
    _id: Country.MALTA,
    description: 'Malta',
  },
  {
    _id: Country.MONTENEGRO,
    description: 'Montenegro',
  },
  {
    _id: Country.PORTUGAL,
    description: 'Portugal',
  },
  {
    _id: Country.SAN_MARINO,
    description: 'San Marino',
  },
  {
    _id: Country.SERBIA,
    description: 'Serbia',
  },
  {
    _id: Country.ESLOVENIA,
    description: 'Eslovenia',
  },
  {
    _id: Country.ESPANA,
    description: 'España',
  },
  {
    _id: Country.EX_REPUBLICA_YUGOSLAVA_DE_MACEDONIA,
    description: 'ex República Yugoslava de Macedonia',
  },
  {
    _id: Country.AUSTRIA,
    description: 'Austria',
  },
  {
    _id: Country.BELGICA,
    description: 'Bélgica',
  },
  {
    _id: Country.FRANCIA,
    description: 'Francia',
  },
  {
    _id: Country.ALEMANIA,
    description: 'Alemania',
  },
  {
    _id: Country.LIECHTENSTEIN,
    description: 'Liechtenstein',
  },
  {
    _id: Country.LUXEMBURGO,
    description: 'Luxemburgo',
  },
  {
    _id: Country.MONACO,
    description: 'Mónaco',
  },
  {
    _id: Country.PAISES_BAJOS,
    description: 'Países Bajos',
  },
  {
    _id: Country.SUIZA,
    description: 'Suiza',
  },
  {
    _id: Country.AUSTRALIA,
    description: 'Australia',
  },
  {
    _id: Country.ISLA_DE_NAVIDAD,
    description: 'Isla de Navidad',
  },
  {
    _id: Country.ISLAS_COCOS__KEELING_,
    description: 'Islas Cocos (Keeling)',
  },
  {
    _id: Country.ISLAS_HEARD_Y_MCDONALD,
    description: 'Islas Heard y McDonald',
  },
  {
    _id: Country.NUEVA_ZELANDIA,
    description: 'Nueva Zelandia',
  },
  {
    _id: Country.ISLAS_NORFOLK,
    description: 'Islas Norfolk',
  },
  {
    _id: Country.FIJI,
    description: 'Fiji',
  },
  {
    _id: Country.NUEVA_CALEDONIA,
    description: 'Nueva Caledonia',
  },
  {
    _id: Country.PAPUA_NUEVA_GUINEA,
    description: 'Papua Nueva Guinea',
  },
  {
    _id: Country.ISLAS_SALOMON,
    description: 'Islas Salomón',
  },
  {
    _id: Country.VANUATU,
    description: 'Vanuatu',
  },
  {
    _id: Country.GUAM,
    description: 'Guam',
  },
  {
    _id: Country.KIRIBATI,
    description: 'Kiribati',
  },
  {
    _id: Country.ISLAS_MARSHALL,
    description: 'Islas Marshall',
  },
  {
    _id: Country.MICRONESIA__ESTADOS_FEDERADOS_DE_,
    description: 'Micronesia (Estados Federados de)',
  },
  {
    _id: Country.NAURU,
    description: 'Nauru',
  },
  {
    _id: Country.ISLAS_MARIANAS_SEPTENTRIONALES,
    description: 'Islas Marianas Septentrionales',
  },
  {
    _id: Country.PALAU,
    description: 'Palau',
  },
  {
    _id: Country.ISLAS_MENORES_ALEJADAS_DE_ESTADOS_UNIDOS,
    description: 'Islas menores alejadas de Estados Unidos',
  },
  {
    _id: Country.SAMOA_AMERICANA,
    description: 'Samoa Americana',
  },
  {
    _id: Country.ISLAS_COOK,
    description: 'Islas Cook',
  },
  {
    _id: Country.POLINESIA_FRANCESA,
    description: 'Polinesia Francesa',
  },
  {
    _id: Country.NIUE,
    description: 'Niue',
  },
  {
    _id: Country.PITCAIRN,
    description: 'Pitcairn',
  },
  {
    _id: Country.SAMOA,
    description: 'Samoa',
  },
  {
    _id: Country.TOKELAU,
    description: 'Tokelau',
  },
  {
    _id: Country.TONGA,
    description: 'Tonga',
  },
  {
    _id: Country.TUVALU,
    description: 'Tuvalu',
  },
  {
    _id: Country.ISLAS_WALLIS_Y_FUTUNA,
    description: 'Islas Wallis y Futuna',
  },
  {
    _id: Country.NO_EXISTE,
    description: 'NO EXISTE',
  },
];
