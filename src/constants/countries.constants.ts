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
    id: Country.MACEDONIA_DEL_NORTE,
    description: 'Macedonia del Norte',
  },
  {
    id: Country.TAIWAN__PROVINCIA_DE_CHINA_,
    description: 'Taiwán (Provincia de China)',
  },
  {
    id: Country.ARGELIA,
    description: 'Argelia',
  },
  {
    id: Country.EGIPTO,
    description: 'Egipto',
  },
  {
    id: Country.LIBIA,
    description: 'Libia',
  },
  {
    id: Country.MARRUECOS,
    description: 'Marruecos',
  },
  {
    id: Country.SUDAN,
    description: 'Sudán',
  },
  {
    id: Country.TUNEZ,
    description: 'Túnez',
  },
  {
    id: Country.SAHARA_OCCIDENTAL,
    description: 'Sáhara Occidental',
  },
  {
    id: Country.TERRITORIO_BRITANICO_DEL_OCEANO_INDICO,
    description: 'Territorio Británico del Océano Índico',
  },
  {
    id: Country.BURUNDI,
    description: 'Burundi',
  },
  {
    id: Country.COMORAS,
    description: 'Comoras',
  },
  {
    id: Country.DJIBOUTI,
    description: 'Djibouti',
  },
  {
    id: Country.ERITREA,
    description: 'Eritrea',
  },
  {
    id: Country.ETIOPIA,
    description: 'Etiopía',
  },
  {
    id: Country.TERRITORIO_DE_LAS_TIERRAS_AUSTRALES_FRANCESAS,
    description: 'Territorio de las Tierras Australes Francesas',
  },
  {
    id: Country.KENYA,
    description: 'Kenya',
  },
  {
    id: Country.MADAGASCAR,
    description: 'Madagascar',
  },
  {
    id: Country.MALAWI,
    description: 'Malawi',
  },
  {
    id: Country.MAURICIO,
    description: 'Mauricio',
  },
  {
    id: Country.MAYOTTE,
    description: 'Mayotte',
  },
  {
    id: Country.MOZAMBIQUE,
    description: 'Mozambique',
  },
  {
    id: Country.REUNION,
    description: 'Reunión',
  },
  {
    id: Country.RWANDA,
    description: 'Rwanda',
  },
  {
    id: Country.SEYCHELLES,
    description: 'Seychelles',
  },
  {
    id: Country.SOMALIA,
    description: 'Somalia',
  },
  {
    id: Country.SUDAN_DEL_SUR,
    description: 'Sudán del Sur',
  },
  {
    id: Country.UGANDA,
    description: 'Uganda',
  },
  {
    id: Country.REPUBLICA_UNIDA_DE_TANZANIA,
    description: 'República Unida de Tanzanía',
  },
  {
    id: Country.ZAMBIA,
    description: 'Zambia',
  },
  {
    id: Country.ZIMBABWE,
    description: 'Zimbabwe',
  },
  {
    id: Country.ANGOLA,
    description: 'Angola',
  },
  {
    id: Country.CAMERUN,
    description: 'Camerún',
  },
  {
    id: Country.REPUBLICA_CENTROAFRICANA,
    description: 'República Centroafricana',
  },
  {
    id: Country.CHAD,
    description: 'Chad',
  },
  {
    id: Country.CONGO,
    description: 'Congo',
  },
  {
    id: Country.REPUBLICA_DEMOCRATICA_DEL_CONGO,
    description: 'República Democrática del Congo',
  },
  {
    id: Country.GUINEA_ECUATORIAL,
    description: 'Guinea Ecuatorial',
  },
  {
    id: Country.GABON,
    description: 'Gabón',
  },
  {
    id: Country.SANTO_TOME_Y_PRINCIPE,
    description: 'Santo Tomé y Príncipe',
  },
  {
    id: Country.BOTSWANA,
    description: 'Botswana',
  },
  {
    id: Country.LESOTHO,
    description: 'Lesotho',
  },
  {
    id: Country.NAMIBIA,
    description: 'Namibia',
  },
  {
    id: Country.SUDAFRICA,
    description: 'Sudáfrica',
  },
  {
    id: Country.SWAZILANDIA,
    description: 'Swazilandia',
  },
  {
    id: Country.BENIN,
    description: 'Benin',
  },
  {
    id: Country.BURKINA_FASO,
    description: 'Burkina Faso',
  },
  {
    id: Country.CABO_VERDE,
    description: 'Cabo Verde',
  },
  {
    id: Country.C_TE_D_IVOIRE,
    description: "Côte d'Ivoire",
  },
  {
    id: Country.GAMBIA,
    description: 'Gambia',
  },
  {
    id: Country.GHANA,
    description: 'Ghana',
  },
  {
    id: Country.GUINEA,
    description: 'Guinea',
  },
  {
    id: Country.GUINEA_BISSAU,
    description: 'Guinea-Bissau',
  },
  {
    id: Country.LIBERIA,
    description: 'Liberia',
  },
  {
    id: Country.MALI,
    description: 'Malí',
  },
  {
    id: Country.MAURITANIA,
    description: 'Mauritania',
  },
  {
    id: Country.NIGER,
    description: 'Níger',
  },
  {
    id: Country.NIGERIA,
    description: 'Nigeria',
  },
  {
    id: Country.SANTA_ELENA,
    description: 'Santa Elena',
  },
  {
    id: Country.SENEGAL,
    description: 'Senegal',
  },
  {
    id: Country.SIERRA_LEONA,
    description: 'Sierra Leona',
  },
  {
    id: Country.TOGO,
    description: 'Togo',
  },
  {
    id: Country.ANGUILA,
    description: 'Anguila',
  },
  {
    id: Country.ANTIGUA_Y_BARBUDA,
    description: 'Antigua y Barbuda',
  },
  {
    id: Country.ARUBA,
    description: 'Aruba',
  },
  {
    id: Country.BAHAMAS,
    description: 'Bahamas',
  },
  {
    id: Country.BARBADOS,
    description: 'Barbados',
  },
  {
    id: Country.BONAIRE__SAN_EUSTAQUIO_Y_SABA,
    description: 'Bonaire, San Eustaquio y Saba',
  },
  {
    id: Country.ISLAS_VIRGENES_BRITANICAS,
    description: 'Islas Vírgenes Británicas',
  },
  {
    id: Country.ISLAS_CAIMAN,
    description: 'Islas Caimán',
  },
  {
    id: Country.CUBA,
    description: 'CUBA',
  },
  {
    id: Country.CURA_AO,
    description: 'Curaçao',
  },
  {
    id: Country.DOMINICA,
    description: 'Dominica',
  },
  {
    id: Country.REPUBLICA_DOMINICANA,
    description: 'República Dominicana',
  },
  {
    id: Country.GRANADA,
    description: 'Granada',
  },
  {
    id: Country.GUADALUPE,
    description: 'Guadalupe',
  },
  {
    id: Country.HAITI,
    description: 'Haití',
  },
  {
    id: Country.JAMAICA,
    description: 'Jamaica',
  },
  {
    id: Country.MARTINICA,
    description: 'Martinica',
  },
  {
    id: Country.MONTSERRAT,
    description: 'Montserrat',
  },
  {
    id: Country.PUERTO_RICO,
    description: 'Puerto Rico',
  },
  {
    id: Country.SAN_BARTOLOME,
    description: 'San Bartolomé',
  },
  {
    id: Country.SAINT_KITTS_Y_NEVIS,
    description: 'Saint Kitts y Nevis',
  },
  {
    id: Country.SANTA_LUCIA,
    description: 'Santa Lucía',
  },
  {
    id: Country.SAN_MARTIN__PARTE_FRANCESA_,
    description: 'San Martín (parte francesa)',
  },
  {
    id: Country.SAN_VICENTE_Y_LAS_GRANADINAS,
    description: 'San Vicente y las Granadinas',
  },
  {
    id: Country.SAN_MARTIN__PARTE_HOLANDES_,
    description: 'San Martín (parte holandés)',
  },
  {
    id: Country.TRINIDAD_Y_TABAGO,
    description: 'Trinidad y Tabago',
  },
  {
    id: Country.ISLAS_TURCAS_Y_CAICOS,
    description: 'Islas Turcas y Caicos',
  },
  {
    id: Country.ISLAS_VIRGENES_DE_LOS_ESTADOS_UNIDOS,
    description: 'Islas Vírgenes de los Estados Unidos',
  },
  {
    id: Country.BELICE,
    description: 'Belice',
  },
  {
    id: Country.COSTA_RICA,
    description: 'Costa Rica',
  },
  {
    id: Country.EL_SALVADOR,
    description: 'El Salvador',
  },
  {
    id: Country.GUATEMALA,
    description: 'Guatemala',
  },
  {
    id: Country.HONDURAS,
    description: 'Honduras',
  },
  {
    id: Country.MEXICO,
    description: 'México',
  },
  {
    id: Country.NICARAGUA,
    description: 'Nicaragua',
  },
  {
    id: Country.PANAMA,
    description: 'Panamá',
  },
  {
    id: Country.ARGENTINA,
    description: 'Argentina',
  },
  {
    id: Country.BOLIVIA__ESTADO_PLURINACIONAL_DE_,
    description: 'Bolivia (Estado Plurinacional de)',
  },
  {
    id: Country.BRASIL,
    description: 'Brasil',
  },
  {
    id: Country.CHILE,
    description: 'Chile',
  },
  {
    id: Country.COLOMBIA,
    description: 'Colombia',
  },
  {
    id: Country.ECUADOR,
    description: 'Ecuador',
  },
  {
    id: Country.ISLAS_MALVINAS__FALKLAND_,
    description: 'Islas Malvinas (Falkland)',
  },
  {
    id: Country.GUAYANA_FRANCESA,
    description: 'Guayana Francesa',
  },
  {
    id: Country.GUYANA,
    description: 'Guyana',
  },
  {
    id: Country.PARAGUAY,
    description: 'Paraguay',
  },
  {
    id: Country.PERU,
    description: 'Perú',
  },
  {
    id: Country.GEORGIA_DEL_SUR_Y_LAS_ISLAS_SANDWICH_DEL_SUR,
    description: 'Georgia del Sur y las Islas Sandwich del Sur',
  },
  {
    id: Country.SURINAME,
    description: 'Suriname',
  },
  {
    id: Country.URUGUAY,
    description: 'Uruguay',
  },
  {
    id: Country.VENEZUELA__REPUBLICA_BOLIVARIANA_DE_,
    description: 'Venezuela (República Bolivariana de)',
  },
  {
    id: Country.BERMUDA,
    description: 'Bermuda',
  },
  {
    id: Country.CANADA,
    description: 'Canadá',
  },
  {
    id: Country.GROENLANDIA,
    description: 'Groenlandia',
  },
  {
    id: Country.SAINT_PIERRE_Y_MIQUELON,
    description: 'Saint Pierre y Miquelon',
  },
  {
    id: Country.ESTADOS_UNIDOS_DE_AMERICA,
    description: 'Estados Unidos de América',
  },
  {
    id: Country.ANTARTIDA,
    description: 'Antártida',
  },
  {
    id: Country.KAZAJSTAN,
    description: 'Kazajstán',
  },
  {
    id: Country.KIRGUISTAN,
    description: 'Kirguistán',
  },
  {
    id: Country.TAYIKISTAN,
    description: 'Tayikistán',
  },
  {
    id: Country.TURKMENISTAN,
    description: 'Turkmenistán',
  },
  {
    id: Country.UZBEKISTAN,
    description: 'Uzbekistán',
  },
  {
    id: Country.CHINA,
    description: 'China',
  },
  {
    id: Country.CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_HONG_KONG,
    description: 'China, región administrativa especial de Hong Kong',
  },
  {
    id: Country.CHINA__REGION_ADMINISTRATIVA_ESPECIAL_DE_MACAO,
    description: 'China, región administrativa especial de Macao',
  },
  {
    id: Country.REPUBLICA_POPULAR_DEMOCRATICA_DE_COREA,
    description: 'República Popular Democrática de Corea',
  },
  {
    id: Country.JAPON,
    description: 'Japón',
  },
  {
    id: Country.MONGOLIA,
    description: 'Mongolia',
  },
  {
    id: Country.REPUBLICA_DE_COREA,
    description: 'República de Corea',
  },
  {
    id: Country.BRUNEI_DARUSSALAM,
    description: 'Brunei Darussalam',
  },
  {
    id: Country.CAMBOYA,
    description: 'Camboya',
  },
  {
    id: Country.INDONESIA,
    description: 'Indonesia',
  },
  {
    id: Country.REPUBLICA_DEMOCRATICA_POPULAR_LAO,
    description: 'República Democrática Popular Lao',
  },
  {
    id: Country.MALASIA,
    description: 'Malasia',
  },
  {
    id: Country.MYANMAR,
    description: 'Myanmar',
  },
  {
    id: Country.FILIPINAS,
    description: 'Filipinas',
  },
  {
    id: Country.SINGAPUR,
    description: 'Singapur',
  },
  {
    id: Country.TAILANDIA,
    description: 'Tailandia',
  },
  {
    id: Country.TIMOR_LESTE,
    description: 'Timor-Leste',
  },
  {
    id: Country.VIET_NAM,
    description: 'Viet Nam',
  },
  {
    id: Country.AFGANISTAN,
    description: 'Afganistán',
  },
  {
    id: Country.BANGLADESH,
    description: 'Bangladesh',
  },
  {
    id: Country.BHUTAN,
    description: 'Bhután',
  },
  {
    id: Country.INDIA,
    description: 'India',
  },
  {
    id: Country.IRAN__REPUBLICA_ISLAMICA_DE_,
    description: 'Irán (República Islámica de)',
  },
  {
    id: Country.MALDIVAS,
    description: 'Maldivas',
  },
  {
    id: Country.NEPAL,
    description: 'Nepal',
  },
  {
    id: Country.PAKISTAN,
    description: 'Pakistán',
  },
  {
    id: Country.SRI_LANKA,
    description: 'Sri Lanka',
  },
  {
    id: Country.ARMENIA,
    description: 'Armenia',
  },
  {
    id: Country.AZERBAIYAN,
    description: 'Azerbaiyán',
  },
  {
    id: Country.BAHREIN,
    description: 'Bahrein',
  },
  {
    id: Country.CHIPRE,
    description: 'Chipre',
  },
  {
    id: Country.GEORGIA,
    description: 'Georgia',
  },
  {
    id: Country.IRAQ,
    description: 'Iraq',
  },
  {
    id: Country.ISRAEL,
    description: 'Israel',
  },
  {
    id: Country.JORDANIA,
    description: 'Jordania',
  },
  {
    id: Country.KUWAIT,
    description: 'Kuwait',
  },
  {
    id: Country.LIBANO,
    description: 'Líbano',
  },
  {
    id: Country.OMAN,
    description: 'Omán',
  },
  {
    id: Country.QATAR,
    description: 'Qatar',
  },
  {
    id: Country.ARABIA_SAUDITA,
    description: 'Arabia Saudita',
  },
  {
    id: Country.ESTADO_DE_PALESTINA,
    description: 'Estado de Palestina',
  },
  {
    id: Country.REPUBLICA_ARABE_SIRIA,
    description: 'República Árabe Siria',
  },
  {
    id: Country.TURQUIA,
    description: 'Turquía',
  },
  {
    id: Country.EMIRATOS_ARABES_UNIDOS,
    description: 'Emiratos Árabes Unidos',
  },
  {
    id: Country.YEMEN,
    description: 'Yemen',
  },
  {
    id: Country.BELARUS,
    description: 'Belarús',
  },
  {
    id: Country.BULGARIA,
    description: 'Bulgaria',
  },
  {
    id: Country.CHEQUIA,
    description: 'Chequia',
  },
  {
    id: Country.HUNGRIA,
    description: 'Hungría',
  },
  {
    id: Country.POLONIA,
    description: 'Polonia',
  },
  {
    id: Country.REPUBLICA_DE_MOLDOVA,
    description: 'República de Moldova',
  },
  {
    id: Country.RUMANIA,
    description: 'Rumania',
  },
  {
    id: Country.FEDERACION_DE_RUSIA,
    description: 'Federación de Rusia',
  },
  {
    id: Country.ESLOVAQUIA,
    description: 'Eslovaquia',
  },
  {
    id: Country.UCRANIA,
    description: 'Ucrania',
  },
  {
    id: Country.ISLAS__LAND,
    description: 'Islas Åland',
  },
  {
    id: Country.GUERNSEY,
    description: 'Guernsey',
  },
  {
    id: Country.JERSEY,
    description: 'Jersey',
  },
  {
    id: Country.DINAMARCA,
    description: 'Dinamarca',
  },
  {
    id: Country.ESTONIA,
    description: 'Estonia',
  },
  {
    id: Country.ISLAS_FEROE,
    description: 'Islas Feroe',
  },
  {
    id: Country.FINLANDIA,
    description: 'Finlandia',
  },
  {
    id: Country.ISLANDIA,
    description: 'Islandia',
  },
  {
    id: Country.IRLANDA,
    description: 'Irlanda',
  },
  {
    id: Country.ISLA_DE_MAN,
    description: 'Isla de Man',
  },
  {
    id: Country.LETONIA,
    description: 'Letonia',
  },
  {
    id: Country.LITUANIA,
    description: 'Lituania',
  },
  {
    id: Country.NORUEGA,
    description: 'Noruega',
  },
  {
    id: Country.ISLAS_SVALBARD_Y_JAN_MAYEN,
    description: 'Islas Svalbard y Jan Mayen',
  },
  {
    id: Country.SUECIA,
    description: 'Suecia',
  },
  {
    id: Country.REINO_UNIDO_DE_GRAN_BRETANA_E_IRLANDA_DEL_NORTE,
    description: 'Reino Unido de Gran Bretaña e Irlanda del Norte',
  },
  {
    id: Country.ALBANIA,
    description: 'Albania',
  },
  {
    id: Country.ANDORRA,
    description: 'Andorra',
  },
  {
    id: Country.BOSNIA_Y_HERZEGOVINA,
    description: 'Bosnia y Herzegovina',
  },
  {
    id: Country.CROACIA,
    description: 'Croacia',
  },
  {
    id: Country.GIBRALTAR,
    description: 'Gibraltar',
  },
  {
    id: Country.GRECIA,
    description: 'Grecia',
  },
  {
    id: Country.SANTA_SEDE,
    description: 'Santa Sede',
  },
  {
    id: Country.ITALIA,
    description: 'Italia',
  },
  {
    id: Country.MALTA,
    description: 'Malta',
  },
  {
    id: Country.MONTENEGRO,
    description: 'Montenegro',
  },
  {
    id: Country.PORTUGAL,
    description: 'Portugal',
  },
  {
    id: Country.SAN_MARINO,
    description: 'San Marino',
  },
  {
    id: Country.SERBIA,
    description: 'Serbia',
  },
  {
    id: Country.ESLOVENIA,
    description: 'Eslovenia',
  },
  {
    id: Country.ESPANA,
    description: 'España',
  },
  {
    id: Country.EX_REPUBLICA_YUGOSLAVA_DE_MACEDONIA,
    description: 'ex República Yugoslava de Macedonia',
  },
  {
    id: Country.AUSTRIA,
    description: 'Austria',
  },
  {
    id: Country.BELGICA,
    description: 'Bélgica',
  },
  {
    id: Country.FRANCIA,
    description: 'Francia',
  },
  {
    id: Country.ALEMANIA,
    description: 'Alemania',
  },
  {
    id: Country.LIECHTENSTEIN,
    description: 'Liechtenstein',
  },
  {
    id: Country.LUXEMBURGO,
    description: 'Luxemburgo',
  },
  {
    id: Country.MONACO,
    description: 'Mónaco',
  },
  {
    id: Country.PAISES_BAJOS,
    description: 'Países Bajos',
  },
  {
    id: Country.SUIZA,
    description: 'Suiza',
  },
  {
    id: Country.AUSTRALIA,
    description: 'Australia',
  },
  {
    id: Country.ISLA_DE_NAVIDAD,
    description: 'Isla de Navidad',
  },
  {
    id: Country.ISLAS_COCOS__KEELING_,
    description: 'Islas Cocos (Keeling)',
  },
  {
    id: Country.ISLAS_HEARD_Y_MCDONALD,
    description: 'Islas Heard y McDonald',
  },
  {
    id: Country.NUEVA_ZELANDIA,
    description: 'Nueva Zelandia',
  },
  {
    id: Country.ISLAS_NORFOLK,
    description: 'Islas Norfolk',
  },
  {
    id: Country.FIJI,
    description: 'Fiji',
  },
  {
    id: Country.NUEVA_CALEDONIA,
    description: 'Nueva Caledonia',
  },
  {
    id: Country.PAPUA_NUEVA_GUINEA,
    description: 'Papua Nueva Guinea',
  },
  {
    id: Country.ISLAS_SALOMON,
    description: 'Islas Salomón',
  },
  {
    id: Country.VANUATU,
    description: 'Vanuatu',
  },
  {
    id: Country.GUAM,
    description: 'Guam',
  },
  {
    id: Country.KIRIBATI,
    description: 'Kiribati',
  },
  {
    id: Country.ISLAS_MARSHALL,
    description: 'Islas Marshall',
  },
  {
    id: Country.MICRONESIA__ESTADOS_FEDERADOS_DE_,
    description: 'Micronesia (Estados Federados de)',
  },
  {
    id: Country.NAURU,
    description: 'Nauru',
  },
  {
    id: Country.ISLAS_MARIANAS_SEPTENTRIONALES,
    description: 'Islas Marianas Septentrionales',
  },
  {
    id: Country.PALAU,
    description: 'Palau',
  },
  {
    id: Country.ISLAS_MENORES_ALEJADAS_DE_ESTADOS_UNIDOS,
    description: 'Islas menores alejadas de Estados Unidos',
  },
  {
    id: Country.SAMOA_AMERICANA,
    description: 'Samoa Americana',
  },
  {
    id: Country.ISLAS_COOK,
    description: 'Islas Cook',
  },
  {
    id: Country.POLINESIA_FRANCESA,
    description: 'Polinesia Francesa',
  },
  {
    id: Country.NIUE,
    description: 'Niue',
  },
  {
    id: Country.PITCAIRN,
    description: 'Pitcairn',
  },
  {
    id: Country.SAMOA,
    description: 'Samoa',
  },
  {
    id: Country.TOKELAU,
    description: 'Tokelau',
  },
  {
    id: Country.TONGA,
    description: 'Tonga',
  },
  {
    id: Country.TUVALU,
    description: 'Tuvalu',
  },
  {
    id: Country.ISLAS_WALLIS_Y_FUTUNA,
    description: 'Islas Wallis y Futuna',
  },
  {
    id: Country.NO_EXISTE,
    description: 'NO EXISTE',
  },
];
