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
    code: Country.MACEDONIA_DEL_NORTE,
    description: 'Macedonia del Norte',
  },
  {
    code: Country.TAIWAN__PROVINCIA_DE_CHINA_,
    description: 'Taiwán (Provincia de China)',
  },
  {
    code: Country.ARGELIA,
    description: 'Argelia',
  },
  {
    code: Country.EGIPTO,
    description: 'Egipto',
  },
  {
    code: Country.LIBIA,
    description: 'Libia',
  },
  {
    code: Country.MARRUECOS,
    description: 'Marruecos',
  },
  {
    code: Country.SUDAN,
    description: 'Sudán',
  },
  {
    code: Country.TUNEZ,
    description: 'Túnez',
  },
  {
    code: Country.SAHARA_OCCIDENTAL,
    description: 'Sáhara Occidental',
  },
  {
    code: Country.TERRITORIO_BRITANICO_DEL_OCEANO_INDICO,
    description: 'Territorio Británico del Océano Índico',
  },
  {
    code: Country.BURUNDI,
    description: 'Burundi',
  },
  {
    code: Country.COMORAS,
    description: 'Comoras',
  },
  {
    code: Country.DJIBOUTI,
    description: 'Djibouti',
  },
  {
    code: Country.ERITREA,
    description: 'Eritrea',
  },
  {
    code: Country.ETIOPIA,
    description: 'Etiopía',
  },
  {
    code: Country.TERRITORIO_DE_LAS_TIERRAS_AUSTRALES_FRANCESAS,
    description: 'Territorio de las Tierras Australes Francesas',
  },
  {
    code: Country.KENYA,
    description: 'Kenya',
  },
  {
    code: Country.MADAGASCAR,
    description: 'Madagascar',
  },
  {
    code: Country.MALAWI,
    description: 'Malawi',
  },
  {
    code: Country.MAURICIO,
    description: 'Mauricio',
  },
  {
    code: Country.MAYOTTE,
    description: 'Mayotte',
  },
  {
    code: Country.MOZAMBIQUE,
    description: 'Mozambique',
  },
  {
    code: Country.REUNION,
    description: 'Reunión',
  },
  {
    code: Country.RWANDA,
    description: 'Rwanda',
  },
  {
    code: Country.SEYCHELLES,
    description: 'Seychelles',
  },
  {
    code: Country.SOMALIA,
    description: 'Somalia',
  },
  {
    code: Country.SUDAN_DEL_SUR,
    description: 'Sudán del Sur',
  },
  {
    code: Country.UGANDA,
    description: 'Uganda',
  },
  {
    code: Country.REPUBLICA_UNIDA_DE_TANZANIA,
    description: 'República Unida de Tanzanía',
  },
  {
    code: Country.ZAMBIA,
    description: 'Zambia',
  },
  {
    code: Country.ZIMBABWE,
    description: 'Zimbabwe',
  },
  {
    code: Country.ANGOLA,
    description: 'Angola',
  },
  {
    code: Country.CAMERUN,
    description: 'Camerún',
  },
  {
    code: Country.REPUBLICA_CENTROAFRICANA,
    description: 'República Centroafricana',
  },
  {
    code: Country.CHAD,
    description: 'Chad',
  },
  {
    code: Country.CONGO,
    description: 'Congo',
  },
  {
    code: Country.REPUBLICA_DEMOCRATICA_DEL_CONGO,
    description: 'República Democrática del Congo',
  },
  {
    code: Country.GUINEA_ECUATORIAL,
    description: 'Guinea Ecuatorial',
  },
  {
    code: Country.GABON,
    description: 'Gabón',
  },
  {
    code: Country.SANTO_TOME_Y_PRINCIPE,
    description: 'Santo Tomé y Príncipe',
  },
  {
    code: Country.BOTSWANA,
    description: 'Botswana',
  },
  {
    code: Country.LESOTHO,
    description: 'Lesotho',
  },
  {
    code: Country.NAMIBIA,
    description: 'Namibia',
  },
  {
    code: Country.SUDAFRICA,
    description: 'Sudáfrica',
  },
  {
    code: Country.SWAZILANDIA,
    description: 'Swazilandia',
  },
  {
    code: Country.BENIN,
    description: 'Benin',
  },
  {
    code: Country.BURKINA_FASO,
    description: 'Burkina Faso',
  },
  {
    code: Country.CABO_VERDE,
    description: 'Cabo Verde',
  },
  {
    code: Country.C_TE_D_IVOIRE,
    description: "Côte d'Ivoire",
  },
  {
    code: Country.GAMBIA,
    description: 'Gambia',
  },
  {
    code: Country.GHANA,
    description: 'Ghana',
  },
  {
    code: Country.GUINEA,
    description: 'Guinea',
  },
  {
    code: Country.GUINEA_BISSAU,
    description: 'Guinea-Bissau',
  },
  {
    code: Country.LIBERIA,
    description: 'Liberia',
  },
  {
    code: Country.MALI,
    description: 'Malí',
  },
  {
    code: Country.MAURITANIA,
    description: 'Mauritania',
  },
  {
    code: Country.NIGER,
    description: 'Níger',
  },
  {
    code: Country.NIGERIA,
    description: 'Nigeria',
  },
  {
    code: Country.SANTA_ELENA,
    description: 'Santa Elena',
  },
  {
    code: Country.SENEGAL,
    description: 'Senegal',
  },
  {
    code: Country.SIERRA_LEONA,
    description: 'Sierra Leona',
  },
  {
    code: Country.TOGO,
    description: 'Togo',
  },
  {
    code: Country.ANGUILA,
    description: 'Anguila',
  },
  {
    code: Country.ANTIGUA_Y_BARBUDA,
    description: 'Antigua y Barbuda',
  },
  {
    code: Country.ARUBA,
    description: 'Aruba',
  },
  {
    code: Country.BAHAMAS,
    description: 'Bahamas',
  },
  {
    code: Country.BARBADOS,
    description: 'Barbados',
  },
  {
    code: Country.BONAIRE__SAN_EUSTAQUIO_Y_SABA,
    description: 'Bonaire, San Eustaquio y Saba',
  },
  {
    code: Country.ISLAS_VIRGENES_BRITANICAS,
    description: 'Islas Vírgenes Británicas',
  },
  {
    code: Country.ISLAS_CAIMAN,
    description: 'Islas Caimán',
  },
  {
    code: Country.CUBA,
    description: 'CUBA',
  },
  {
    code: Country.CURA_AO,
    description: 'Curaçao',
  },
  {
    code: Country.DOMINICA,
    description: 'Dominica',
  },
  {
    code: Country.REPUBLICA_DOMINICANA,
    description: 'República Dominicana',
  },
  {
    code: Country.GRANADA,
    description: 'Granada',
  },
  {
    code: Country.GUADALUPE,
    description: 'Guadalupe',
  },
  {
    code: Country.HAITI,
    description: 'Haití',
  },
  {
    code: Country.JAMAICA,
    description: 'Jamaica',
  },
  {
    code: Country.MARTINICA,
    description: 'Martinica',
  },
  {
    code: Country.MONTSERRAT,
    description: 'Montserrat',
  },
  {
    code: Country.PUERTO_RICO,
    description: 'Puerto Rico',
  },
  {
    code: Country.SAN_BARTOLOME,
    description: 'San Bartolomé',
  },
  {
    code: Country.SAINT_KITTS_Y_NEVIS,
    description: 'Saint Kitts y Nevis',
  },
  {
    code: Country.SANTA_LUCIA,
    description: 'Santa Lucía',
  },
  {
    code: Country.SAN_MARTIN__PARTE_FRANCESA_,
    description: 'San Martín (parte francesa)',
  },
  {
    code: Country.SAN_VICENTE_Y_LAS_GRANADINAS,
    description: 'San Vicente y las Granadinas',
  },
  {
    code: Country.SAN_MARTIN__PARTE_HOLANDES_,
    description: 'San Martín (parte holandés)',
  },
  {
    code: Country.TRINIDAD_Y_TABAGO,
    description: 'Trinidad y Tabago',
  },
  {
    code: Country.ISLAS_TURCAS_Y_CAICOS,
    description: 'Islas Turcas y Caicos',
  },
  {
    code: Country.ISLAS_VIRGENES_DE_LOS_ESTADOS_UNIDOS,
    description: 'Islas Vírgenes de los Estados Unidos',
  },
  {
    code: Country.BELICE,
    description: 'Belice',
  },
  {
    code: Country.COSTA_RICA,
    description: 'Costa Rica',
  },
  {
    code: Country.EL_SALVADOR,
    description: 'El Salvador',
  },
  {
    code: Country.GUATEMALA,
    description: 'Guatemala',
  },
  {
    code: Country.HONDURAS,
    description: 'Honduras',
  },
  {
    code: Country.MEXICO,
    description: 'México',
  },
  {
    code: Country.NICARAGUA,
    description: 'Nicaragua',
  },
  {
    code: Country.PANAMA,
    description: 'Panamá',
  },
  {
    code: Country.ARGENTINA,
    description: 'Argentina',
  },
  {
    code: Country.BOLIVIA__ESTADO_PLURINACIONAL_DE_,
    description: 'Bolivia (Estado Plurinacional de)',
  },
  {
    code: Country.BRASIL,
    description: 'Brasil',
  },
  {
    code: Country.CHILE,
    description: 'Chile',
  },
  {
    code: Country.COLOMBIA,
    description: 'Colombia',
  },
  {
    code: Country.ECUADOR,
    description: 'Ecuador',
  },
  {
    code: Country.ISLAS_MALVINAS__FALKLAND_,
    description: 'Islas Malvinas (Falkland)',
  },
  {
    code: Country.GUAYANA_FRANCESA,
    description: 'Guayana Francesa',
  },
  {
    code: Country.GUYANA,
    description: 'Guyana',
  },
  {
    code: Country.PARAGUAY,
    description: 'Paraguay',
  },
  {
    code: Country.PERU,
    description: 'Perú',
  },
  {
    code: Country.GEORGIA_DEL_SUR_Y_LAS_ISLAS_SANDWICH_DEL_SUR,
    description: 'Georgia del Sur y las Islas Sandwich del Sur',
  },
  {
    code: Country.SURINAME,
    description: 'Suriname',
  },
  {
    code: Country.URUGUAY,
    description: 'Uruguay',
  },
  {
    code: Country.VENEZUELA__REPUBLICA_BOLIVARIANA_DE_,
    description: 'Venezuela (República Bolivariana de)',
  },
  {
    code: Country.BERMUDA,
    description: 'Bermuda',
  },
  {
    code: Country.CANADA,
    description: 'Canadá',
  },
  {
    code: Country.GROENLANDIA,
    description: 'Groenlandia',
  },
  {
    code: Country.SAINT_PIERRE_Y_MIQUELON,
    description: 'Saint Pierre y Miquelon',
  },
  {
    code: Country.ESTADOS_UNIDOS_DE_AMERICA,
    description: 'Estados Unidos de América',
  },
  {
    code: Country.ANTARTIDA,
    description: 'Antártida',
  },
  {
    code: Country.KAZAJSTAN,
    description: 'Kazajstán',
  },
  {
    code: Country.KIRGUISTAN,
    description: 'Kirguistán',
  },
  {
    code: Country.TAYIKISTAN,
    description: 'Tayikistán',
  },
  {
    code: Country.TURKMENISTAN,
    description: 'Turkmenistán',
  },
  {
    code: Country.UZBEKISTAN,
    description: 'Uzbekistán',
  },
  {
    code: Country.CHINA,
    description: 'China',
  },
  {
    code: Country.CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_HONG_KONG,
    description: 'China, región administrativa especial de Hong Kong',
  },
  {
    code: Country.CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_MACAO,
    description: 'China, región administrativa especial de Macao',
  },
  {
    code: Country.REPUBLICA_POPULAR_DEMOCRATICA_DE_COREA,
    description: 'República Popular Democrática de Corea',
  },
  {
    code: Country.JAPON,
    description: 'Japón',
  },
  {
    code: Country.MONGOLIA,
    description: 'Mongolia',
  },
  {
    code: Country.REPUBLICA_DE_COREA,
    description: 'República de Corea',
  },
  {
    code: Country.BRUNEI_DARUSSALAM,
    description: 'Brunei Darussalam',
  },
  {
    code: Country.CAMBOYA,
    description: 'Camboya',
  },
  {
    code: Country.INDONESIA,
    description: 'Indonesia',
  },
  {
    code: Country.REPUBLICA_DEMOCRATICA_POPULAR_LAO,
    description: 'República Democrática Popular Lao',
  },
  {
    code: Country.MALASIA,
    description: 'Malasia',
  },
  {
    code: Country.MYANMAR,
    description: 'Myanmar',
  },
  {
    code: Country.FILIPINAS,
    description: 'Filipinas',
  },
  {
    code: Country.SINGAPUR,
    description: 'Singapur',
  },
  {
    code: Country.TAILANDIA,
    description: 'Tailandia',
  },
  {
    code: Country.TIMOR_LESTE,
    description: 'Timor-Leste',
  },
  {
    code: Country.VIET_NAM,
    description: 'Viet Nam',
  },
  {
    code: Country.AFGANISTAN,
    description: 'Afganistán',
  },
  {
    code: Country.BANGLADESH,
    description: 'Bangladesh',
  },
  {
    code: Country.BHUTAN,
    description: 'Bhután',
  },
  {
    code: Country.INDIA,
    description: 'India',
  },
  {
    code: Country.IRAN__REPUBLICA_ISLAMICA_DE_,
    description: 'Irán (República Islámica de)',
  },
  {
    code: Country.MALDIVAS,
    description: 'Maldivas',
  },
  {
    code: Country.NEPAL,
    description: 'Nepal',
  },
  {
    code: Country.PAKISTAN,
    description: 'Pakistán',
  },
  {
    code: Country.SRI_LANKA,
    description: 'Sri Lanka',
  },
  {
    code: Country.ARMENIA,
    description: 'Armenia',
  },
  {
    code: Country.AZERBAIYAN,
    description: 'Azerbaiyán',
  },
  {
    code: Country.BAHREIN,
    description: 'Bahrein',
  },
  {
    code: Country.CHIPRE,
    description: 'Chipre',
  },
  {
    code: Country.GEORGIA,
    description: 'Georgia',
  },
  {
    code: Country.IRAQ,
    description: 'Iraq',
  },
  {
    code: Country.ISRAEL,
    description: 'Israel',
  },
  {
    code: Country.JORDANIA,
    description: 'Jordania',
  },
  {
    code: Country.KUWAIT,
    description: 'Kuwait',
  },
  {
    code: Country.LIBANO,
    description: 'Líbano',
  },
  {
    code: Country.OMAN,
    description: 'Omán',
  },
  {
    code: Country.QATAR,
    description: 'Qatar',
  },
  {
    code: Country.ARABIA_SAUDITA,
    description: 'Arabia Saudita',
  },
  {
    code: Country.ESTADO_DE_PALESTINA,
    description: 'Estado de Palestina',
  },
  {
    code: Country.REPUBLICA_ARABE_SIRIA,
    description: 'República Árabe Siria',
  },
  {
    code: Country.TURQUIA,
    description: 'Turquía',
  },
  {
    code: Country.EMIRATOS_ARABES_UNIDOS,
    description: 'Emiratos Árabes Unidos',
  },
  {
    code: Country.YEMEN,
    description: 'Yemen',
  },
  {
    code: Country.BELARUS,
    description: 'Belarús',
  },
  {
    code: Country.BULGARIA,
    description: 'Bulgaria',
  },
  {
    code: Country.CHEQUIA,
    description: 'Chequia',
  },
  {
    code: Country.HUNGRIA,
    description: 'Hungría',
  },
  {
    code: Country.POLONIA,
    description: 'Polonia',
  },
  {
    code: Country.REPUBLICA_DE_MOLDOVA,
    description: 'República de Moldova',
  },
  {
    code: Country.RUMANIA,
    description: 'Rumania',
  },
  {
    code: Country.FEDERACION_DE_RUSIA,
    description: 'Federación de Rusia',
  },
  {
    code: Country.ESLOVAQUIA,
    description: 'Eslovaquia',
  },
  {
    code: Country.UCRANIA,
    description: 'Ucrania',
  },
  {
    code: Country.ISLAS__LAND,
    description: 'Islas Åland',
  },
  {
    code: Country.GUERNSEY,
    description: 'Guernsey',
  },
  {
    code: Country.JERSEY,
    description: 'Jersey',
  },
  {
    code: Country.DINAMARCA,
    description: 'Dinamarca',
  },
  {
    code: Country.ESTONIA,
    description: 'Estonia',
  },
  {
    code: Country.ISLAS_FEROE,
    description: 'Islas Feroe',
  },
  {
    code: Country.FINLANDIA,
    description: 'Finlandia',
  },
  {
    code: Country.ISLANDIA,
    description: 'Islandia',
  },
  {
    code: Country.IRLANDA,
    description: 'Irlanda',
  },
  {
    code: Country.ISLA_DE_MAN,
    description: 'Isla de Man',
  },
  {
    code: Country.LETONIA,
    description: 'Letonia',
  },
  {
    code: Country.LITUANIA,
    description: 'Lituania',
  },
  {
    code: Country.NORUEGA,
    description: 'Noruega',
  },
  {
    code: Country.ISLAS_SVALBARD_Y_JAN_MAYEN,
    description: 'Islas Svalbard y Jan Mayen',
  },
  {
    code: Country.SUECIA,
    description: 'Suecia',
  },
  {
    code: Country.REINO_UNIDO_DE_GRAN_BRETANA_E_IRLANDA_DEL_NORTE,
    description: 'Reino Unido de Gran Bretaña e Irlanda del Norte',
  },
  {
    code: Country.ALBANIA,
    description: 'Albania',
  },
  {
    code: Country.ANDORRA,
    description: 'Andorra',
  },
  {
    code: Country.BOSNIA_Y_HERZEGOVINA,
    description: 'Bosnia y Herzegovina',
  },
  {
    code: Country.CROACIA,
    description: 'Croacia',
  },
  {
    code: Country.GIBRALTAR,
    description: 'Gibraltar',
  },
  {
    code: Country.GRECIA,
    description: 'Grecia',
  },
  {
    code: Country.SANTA_SEDE,
    description: 'Santa Sede',
  },
  {
    code: Country.ITALIA,
    description: 'Italia',
  },
  {
    code: Country.MALTA,
    description: 'Malta',
  },
  {
    code: Country.MONTENEGRO,
    description: 'Montenegro',
  },
  {
    code: Country.PORTUGAL,
    description: 'Portugal',
  },
  {
    code: Country.SAN_MARINO,
    description: 'San Marino',
  },
  {
    code: Country.SERBIA,
    description: 'Serbia',
  },
  {
    code: Country.ESLOVENIA,
    description: 'Eslovenia',
  },
  {
    code: Country.ESPANA,
    description: 'España',
  },
  {
    code: Country.EX_REPUBLICA_YUGOSLAVA_DE_MACEDONIA,
    description: 'ex República Yugoslava de Macedonia',
  },
  {
    code: Country.AUSTRIA,
    description: 'Austria',
  },
  {
    code: Country.BELGICA,
    description: 'Bélgica',
  },
  {
    code: Country.FRANCIA,
    description: 'Francia',
  },
  {
    code: Country.ALEMANIA,
    description: 'Alemania',
  },
  {
    code: Country.LIECHTENSTEIN,
    description: 'Liechtenstein',
  },
  {
    code: Country.LUXEMBURGO,
    description: 'Luxemburgo',
  },
  {
    code: Country.MONACO,
    description: 'Mónaco',
  },
  {
    code: Country.PAISES_BAJOS,
    description: 'Países Bajos',
  },
  {
    code: Country.SUIZA,
    description: 'Suiza',
  },
  {
    code: Country.AUSTRALIA,
    description: 'Australia',
  },
  {
    code: Country.ISLA_DE_NAVIDAD,
    description: 'Isla de Navidad',
  },
  {
    code: Country.ISLAS_COCOS__KEELING_,
    description: 'Islas Cocos (Keeling)',
  },
  {
    code: Country.ISLAS_HEARD_Y_MCDONALD,
    description: 'Islas Heard y McDonald',
  },
  {
    code: Country.NUEVA_ZELANDIA,
    description: 'Nueva Zelandia',
  },
  {
    code: Country.ISLAS_NORFOLK,
    description: 'Islas Norfolk',
  },
  {
    code: Country.FIJI,
    description: 'Fiji',
  },
  {
    code: Country.NUEVA_CALEDONIA,
    description: 'Nueva Caledonia',
  },
  {
    code: Country.PAPUA_NUEVA_GUINEA,
    description: 'Papua Nueva Guinea',
  },
  {
    code: Country.ISLAS_SALOMON,
    description: 'Islas Salomón',
  },
  {
    code: Country.VANUATU,
    description: 'Vanuatu',
  },
  {
    code: Country.GUAM,
    description: 'Guam',
  },
  {
    code: Country.KIRIBATI,
    description: 'Kiribati',
  },
  {
    code: Country.ISLAS_MARSHALL,
    description: 'Islas Marshall',
  },
  {
    code: Country.MICRONESIA__ESTADOS_FEDERADOS_DE_,
    description: 'Micronesia (Estados Federados de)',
  },
  {
    code: Country.NAURU,
    description: 'Nauru',
  },
  {
    code: Country.ISLAS_MARIANAS_SEPTENTRIONALES,
    description: 'Islas Marianas Septentrionales',
  },
  {
    code: Country.PALAU,
    description: 'Palau',
  },
  {
    code: Country.ISLAS_MENORES_ALEJADAS_DE_ESTADOS_UNIDOS,
    description: 'Islas menores alejadas de Estados Unidos',
  },
  {
    code: Country.SAMOA_AMERICANA,
    description: 'Samoa Americana',
  },
  {
    code: Country.ISLAS_COOK,
    description: 'Islas Cook',
  },
  {
    code: Country.POLINESIA_FRANCESA,
    description: 'Polinesia Francesa',
  },
  {
    code: Country.NIUE,
    description: 'Niue',
  },
  {
    code: Country.PITCAIRN,
    description: 'Pitcairn',
  },
  {
    code: Country.SAMOA,
    description: 'Samoa',
  },
  {
    code: Country.TOKELAU,
    description: 'Tokelau',
  },
  {
    code: Country.TONGA,
    description: 'Tonga',
  },
  {
    code: Country.TUVALU,
    description: 'Tuvalu',
  },
  {
    code: Country.ISLAS_WALLIS_Y_FUTUNA,
    description: 'Islas Wallis y Futuna',
  },
  {
    code: Country.NO_EXISTE,
    description: 'NO EXISTE',
  },
];
