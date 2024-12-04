import Table from '../helpers/Table';

export enum Currency {
  DIRHAM = 'AED',
  AFGHANI = 'AFN',
  LEK = 'ALL',
  DRAM = 'AMD',
  NETHERLANDS_ANTILLIAN_GUILDER = 'ANG',
  KWANZA = 'AOA',
  ARGENTINE_PESO = 'ARS',
  AUSTRALIAN_DOLLAR = 'AUD',
  ARUBAN_GUILDER = 'AWG',
  AZERBAIJANIAN_MANAT = 'AZM',
  CONVERTIBLE_MARK = 'BAM',
  BARBADOS_DOLLAR = 'BBD',
  BELARUSIAN_RUBLE = 'BYN',
  TAKA = 'BDT',
  BULGARIAN_LEV = 'BGN',
  BAHRAINI_DINAR = 'BHD',
  BURUNDI_FRANC = 'BIF',
  BERMUDIAN_DOLLAR__CUSTOMARILY__BERMUDA_DOLLAR_ = 'BMD',
  BRUNEI_DOLLAR = 'BND',
  BOLIVIANO = 'BOB',
  MVDOL = 'BOV',
  BRAZILIAN_REAL = 'BRL',
  BAHAMIAN_DOLLAR = 'BSD',
  NGULTRUM = 'BTN',
  PULA = 'BWP',
  BELARUSSIAN_RUBLE = 'BYR',
  BELIZE_DOLLAR = 'BZD',
  CANADIAN_DOLLAR = 'CAD',
  FRANC_CONGOLAIS = 'CDF',
  SWISS_FRANC = 'CHF',
  WIR_EURO = 'CHE',
  WIR_FRANC = 'CHW',
  CHILEAN_PESO = 'CLP',
  UNIDAD_DE_FOMENTO = 'CLF',
  YUAN_RENMINBI = 'CNY',
  COLOMBIAN_PESO = 'COP',
  UNIDAD_DE_VALOR_REAL = 'COU',
  COSTA_RICAN_COLON = 'CRC',
  CUBAN_PESO = 'CUP',
  PESO_CONVERTIBLE = 'CUC',
  CAPE_VERDE_ESCUDO = 'CVE',
  CYPRUS_POUND = 'CYP',
  CZECH_KORUNA = 'CZK',
  DJIBOUTI_FRANC = 'DJF',
  DANISH_KRONE = 'DKK',
  DOMINICAN_PESO = 'DOP',
  ALGERIAN_DINAR = 'DZD',
  KROON = 'EEK',
  EGYPTIAN_POUND = 'EGP',
  NAKFA = 'ERN',
  ETHOPIAN_BIRR = 'ETB',
  EURO = 'EUR',
  FIJI_DOLLAR = 'FJD',
  FALKLAND_ISLANDS_POUND = 'FKP',
  POUND_STERLING = 'GBP',
  LARI = 'GEL',
  GHANA_CEDI = 'GHS',
  CEDI = 'GHC',
  GIBRALTAR_POUND = 'GIP',
  DALASI = 'GMD',
  GUINEA_FRANC = 'GNF',
  QUETZAL = 'GTQ',
  GUYANA_DOLLAR = 'GYD',
  HONK_KONG_DOLLAR = 'HKD',
  LEMPIRA = 'HNL',
  KUNA = 'HRK',
  GOURDE = 'HTG',
  FORINT = 'HUF',
  RUPIAH = 'IDR',
  NEW_ISRAELI_SHEQEL = 'ILS',
  INDIAN_RUPEE = 'INR',
  IRAQI_DINAR = 'IQD',
  IRANIAN_RIAL = 'IRR',
  ICELAND_KRONA = 'ISK',
  JAMAICAN_DOLLAR = 'JMD',
  JORDANIAN_DINAR = 'JOD',
  YEN = 'JPY',
  KENYAN_SHILLING = 'KES',
  SOM = 'KGS',
  RIEL = 'KHR',
  COMORO_FRANC = 'KMF',
  NORTH_KOREAN_WON = 'KPW',
  WON = 'KRW',
  KUWAITI_DINAR = 'KWD',
  CAYMAN_ISLANDS_DOLLAR = 'KYD',
  TENGE = 'KZT',
  KIP = 'LAK',
  LEBANESE_POUND = 'LBP',
  SRI_LANKA_RUPEE = 'LKR',
  LIBERIAN_DOLLAR = 'LRD',
  LOTI = 'LSL',
  LITHUANIAN_LITAS = 'LTL',
  LATVIAN_LATS = 'LVL',
  LIBYAN_DINAR = 'LYD',
  MORROCAN_DIRHAM = 'MAD',
  MOZAMBIQUE_METICAL = 'MZN',
  MOLDOVAN_LEU = 'MDL',
  MALAGASY_FRANC = 'MGF',
  DENAR = 'MKD',
  MALAGASY_ARIARY = 'MGA',
  KYAT = 'MMK',
  TUGRIK = 'MNT',
  PATACA = 'MOP',
  /**@deprecated Codigo antiguo */
  OUGUIYA_OLD = 'MRO',
  MALTESE_LIRA = 'MTL',
  MAURITIUS_RUPEE = 'MUR',
  ADB_UNIT_OF_ACCOUNT = 'XUA',
  RUFIYAA = 'MVR',
  OUGUIYA = 'MRU',
  KWACHA_ZAMBIA = 'MMW',
  MEXICAN_PESO = 'MXN',
  MEXICAN_UNIDAD_DE_INVERSION = 'MXV',
  MALAYSIAN_RINGGIT = 'MYR',
  METICAL = 'MZM',
  NAMIBIA_DOLLAR = 'NAD',
  NAIRA = 'NGN',
  CORDOBA_ORO = 'NIO',
  NORWEGIAN_KRONE = 'NOK',
  NEPALESE_RUPEE = 'NPR',
  NEW_ZEALAND_DOLLAR = 'NZD',
  RIAL_OMANI = 'OMR',
  BALBOA = 'PAB',
  NUEVO_SOL = 'PEN',
  KINA = 'PGK',
  PHILIPPINE_PESO = 'PHP',
  PAKISTAN_RUPEE = 'PKR',
  ZLOTY = 'PLN',
  GUARANI = 'PYG',
  QATARI_RIAL = 'QAR',
  ROMANIAN_LEU = 'RON',
  LEU = 'ROL',
  RUSSIAN_RUBLE = 'RUB',
  RWANDA_FRANC = 'RWF',
  SAUDI_RIYAL = 'SAR',
  SERBIAN_DINAR = 'RSD',
  SOLOMON_ISLANDS_DOLLAR = 'SBD',
  SEYCHELLES_RUPEE = 'SCR',
  SUDANESE_DINAR = 'SDD',
  SUDANESE_POUND = 'SDG',
  SURINAM_DOLLAR = 'SRD',
  SWEDISH_KRONA = 'SEK',
  SINGAPORE_DOLLAR = 'SGD',
  ST__HELENA_POUND = 'SHP',
  TOLAR = 'SIT',
  SLOVAK_KORUNA = 'SKK',
  LEONE = 'SLL',
  SOMALI_SHILLING = 'SOS',
  SURINAME_GUILDER = 'SRG',
  SOUTH_SUDANESE_POUND = 'SSP',
  /**@deprecated Codigo antiguo */
  DOBRA_OLD = 'STD',
  EL_SALVADOR_COLON = 'SVC',
  SYRIAN_POUND = 'SYP',
  LILANGENI = 'SZL',
  BAHT = 'THB',
  SOMONI = 'TJS',
  MANAT = 'TMM',
  TUNISIAN_DINAR = 'TND',
  TURKISH_LIRA = 'TRY',
  TURKMENISTAN_NEW_MANAT = 'TMT',
  PA_APOS_ANGA = 'TOP',
  /**@deprecated Codigo antiguo */
  TURKISH_LIRA_OLD = 'TRL',
  TRINIDAD_AND_TOBAGO_DOLLAR = 'TTD',
  NEW_TAIWAN_DOLLAR = 'TWD',
  TANZANIAN_SHILLING = 'TZS',
  HRYVNIA = 'UAH',
  UGANDA_SHILLING = 'UGX',
  US_DOLLAR = 'USD',
  US_DOLLAR_NEXT_DAY_ = 'USN',
  PESO_URUGUAYO = 'UYU',
  URUGUAY_PESO_EN_UNIDADES_INDEXADAS_UI_ = 'UYI',
  UNIDAD_PREVISIONAL = 'UYW',
  UZBEKISTAN_SUM = 'UZS',
  BOLIVAR = 'VEB',
  DONG = 'VND',
  VATU = 'VUV',
  BOLIVAR_SOBERANO = 'VES',
  TALA = 'WST',
  DOBRA = 'STN',
  CFA_FRANC_CENTRAL = 'XAF',
  SILVER = 'XAG',
  GOLD = 'XAU',
  EAST_CARRIBEAN_DOLLAR = 'XCD',
  SDR = 'XDR',
  CFA_FRANC_OCCIDENTAL = 'XOF',
  PALLADIUM = 'XPD',
  CFP_FRANC = 'XPF',
  PLATINUM = 'XPT',
  SUCRE = 'XSU',
  BOND_MARKETS_UNIT_EUROPEAN_COMPOSITE_UNIT_EURCO_ = 'XBA',
  BOND_MARKETS_UNIT_EUROPEAN_MONETARY_UNIT_E_M_U__6_ = 'XBB',
  BOND_MARKETS_UNIT_EUROPEAN_UNIT_OF_ACCOUNT_17__E_U_A__17_ = 'XBC',
  CODES_SPECIFICALLY_RESERVED_FOR_TESTING_PURPOSES = 'XTS',
  THE_CODES_ASSIGNED_FOR_TRANSACTIONS_WHERE_NO_CURRENCY_IS_INVOLVED = 'XXX',
  YEMENI_RIAL = 'YER',
  NEW_DINAR = 'YUM',
  ZAMBIAN_KWACHA = 'ZMW',
  ZIMBABWE_DOLLAR = 'ZWL',
  RAND = 'ZAR',
  KWACHA_MALAWI = 'ZMK',
  /**@deprecated denominación del 2006 */
  ZIMBABWE_DOLLAR_2006 = 'ZWD',
}

export default new Table<{
  0: ['_id', `${Currency}`];
  1: ['description', string];
}>(
  ['_id', 'description'],
  [
    ['AED', 'Dirham'],
    ['AFN', 'Afghani'],
    ['ALL', 'Lek'],
    ['AMD', 'Dram'],
    ['ANG', 'Netherlands Antillian Guilder'],
    ['AOA', 'Kwanza'],
    ['ARS', 'Argentine Peso'],
    ['AUD', 'Australian Dollar'],
    ['AWG', 'Aruban Guilder'],
    ['AZM', 'Azerbaijanian Manat'],
    ['BAM', 'Convertible Mark'],
    ['BBD', 'Barbados Dollar'],
    ['BYN', 'Belarusian Ruble'],
    ['BDT', 'Taka'],
    ['BGN', 'Bulgarian Lev'],
    ['BHD', 'Bahraini Dinar'],
    ['BIF', 'Burundi Franc'],
    ['BMD', 'Bermudian Dollar (customarily: Bermuda Dollar)'],
    ['BND', 'Brunei Dollar'],
    ['BOB', 'Boliviano'],
    ['BOV', 'Mvdol'],
    ['BRL', 'Brazilian Real'],
    ['BSD', 'Bahamian Dollar'],
    ['BTN', 'Ngultrum'],
    ['BWP', 'Pula'],
    ['BYR', 'Belarussian Ruble'],
    ['BZD', 'Belize Dollar'],
    ['CAD', 'Canadian Dollar'],
    ['CDF', 'Franc Congolais'],
    ['CHF', 'Swiss Franc'],
    ['CHE', 'WIR Euro'],
    ['CHW', 'WIR Franc'],
    ['CLP', 'Chilean Peso'],
    ['CLF', 'Unidad de Fomento'],
    ['CNY', 'Yuan Renminbi'],
    ['COP', 'Colombian Peso'],
    ['COU', 'Unidad de Valor Real'],
    ['CRC', 'Costa Rican Colon'],
    ['CUP', 'Cuban Peso'],
    ['CUC', 'Peso Convertible'],
    ['CVE', 'Cape Verde Escudo'],
    ['CYP', 'Cyprus Pound'],
    ['CZK', 'Czech Koruna'],
    ['DJF', 'Djibouti Franc'],
    ['DKK', 'Danish Krone'],
    ['DOP', 'Dominican Peso'],
    ['DZD', 'Algerian Dinar'],
    ['EEK', 'Kroon'],
    ['EGP', 'Egyptian Pound'],
    ['ERN', 'Nakfa'],
    ['ETB', 'Ethopian Birr'],
    ['EUR', 'Euro'],
    ['FJD', 'Fiji Dollar'],
    ['FKP', 'Falkland Islands Pound'],
    ['GBP', 'Pound Sterling'],
    ['GEL', 'Lari'],
    ['GHS', 'Ghana Cedi'],
    ['GHC', 'Cedi'],
    ['GIP', 'Gibraltar Pound'],
    ['GMD', 'Dalasi'],
    ['GNF', 'Guinea Franc'],
    ['GTQ', 'Quetzal'],
    ['GYD', 'Guyana Dollar'],
    ['HKD', 'Honk Kong Dollar'],
    ['HNL', 'Lempira'],
    ['HRK', 'Kuna'],
    ['HTG', 'Gourde'],
    ['HUF', 'Forint'],
    ['IDR', 'Rupiah'],
    ['ILS', 'New Israeli Sheqel'],
    ['INR', 'Indian Rupee'],
    ['IQD', 'Iraqi Dinar'],
    ['IRR', 'Iranian Rial'],
    ['ISK', 'Iceland Krona'],
    ['JMD', 'Jamaican Dollar'],
    ['JOD', 'Jordanian Dinar'],
    ['JPY', 'Yen'],
    ['KES', 'Kenyan Shilling'],
    ['KGS', 'Som'],
    ['KHR', 'Riel'],
    ['KMF', 'Comoro Franc'],
    ['KPW', 'North Korean Won'],
    ['KRW', 'Won'],
    ['KWD', 'Kuwaiti Dinar'],
    ['KYD', 'Cayman Islands Dollar'],
    ['KZT', 'Tenge'],
    ['LAK', 'Kip'],
    ['LBP', 'Lebanese Pound'],
    ['LKR', 'Sri Lanka Rupee'],
    ['LRD', 'Liberian Dollar'],
    ['LSL', 'Loti'],
    ['LTL', 'Lithuanian Litas'],
    ['LVL', 'Latvian Lats'],
    ['LYD', 'Libyan Dinar'],
    ['MAD', 'Morrocan Dirham'],
    ['MZN', 'Mozambique Metical'],
    ['MDL', 'Moldovan Leu'],
    ['MGF', 'Malagasy Franc'],
    ['MKD', 'Denar'],
    ['MGA', 'Malagasy Ariary'],
    ['MMK', 'Kyat'],
    ['MNT', 'Tugrik'],
    ['MOP', 'Pataca'],
    ['MRU', 'Ouguiya'],
    ['MTL', 'Maltese Lira'],
    ['MUR', 'Mauritius Rupee'],
    ['XUA', 'ADB Unit of Account'],
    ['MVR', 'Rufiyaa'],
    ['MRU', 'Ouguiya'],
    ['ZMK', 'Kwacha'],
    ['MXN', 'Mexican Peso'],
    ['MXV', 'Mexican Unidad de Inversion'],
    ['MYR', 'Malaysian Ringgit'],
    ['MZM', 'Metical'],
    ['NAD', 'Namibia Dollar'],
    ['NGN', 'Naira'],
    ['NIO', 'Cordoba Oro'],
    ['NOK', 'Norwegian Krone'],
    ['NPR', 'Nepalese Rupee'],
    ['NZD', 'New Zealand Dollar'],
    ['OMR', 'Rial Omani'],
    ['PAB', 'Balboa'],
    ['PEN', 'Nuevo Sol'],
    ['PGK', 'Kina'],
    ['PHP', 'Philippine Peso'],
    ['PKR', 'Pakistan Rupee'],
    ['PLN', 'Zloty'],
    ['PYG', 'Guarani'],
    ['QAR', 'Qatari Rial'],
    ['RON', 'Romanian Leu'],
    ['ROL', 'Leu'],
    ['RUB', 'Russian Ruble'],
    ['RWF', 'Rwanda Franc'],
    ['SAR', 'Saudi Riyal'],
    ['RSD', 'Serbian Dinar'],
    ['SBD', 'Solomon Islands Dollar'],
    ['SCR', 'Seychelles Rupee'],
    ['SDD', 'Sudanese Dinar'],
    ['SDG', 'Sudanese Pound'],
    ['SRD', 'Surinam Dollar'],
    ['SEK', 'Swedish Krona'],
    ['SGD', 'Singapore Dollar'],
    ['SHP', 'St. Helena Pound'],
    ['SIT', 'Tolar'],
    ['SKK', 'Slovak Koruna'],
    ['SLL', 'Leone'],
    ['SOS', 'Somali Shilling'],
    ['SRG', 'Suriname Guilder'],
    ['SSP', 'South Sudanese Pound'],
    ['STN', 'Dobra'],
    ['SVC', 'El Salvador Colon'],
    ['SYP', 'Syrian Pound'],
    ['SZL', 'Lilangeni'],
    ['THB', 'Baht'],
    ['TJS', 'Somoni'],
    ['TMM', 'Manat'],
    ['TND', 'Tunisian Dinar'],
    ['TRY', 'Turkish Lira'],
    ['TMT', 'Turkmenistan New Manat'],
    ['TOP', 'Pa&apos;anga'],
    ['TRY', 'Turkish Lira'],
    ['TTD', 'Trinidad and Tobago Dollar'],
    ['TWD', 'New Taiwan Dollar'],
    ['TZS', 'Tanzanian Shilling'],
    ['UAH', 'Hryvnia'],
    ['UGX', 'Uganda Shilling'],
    ['USD', 'US Dollar'],
    ['USN', 'US Dollar(Next day)'],
    ['UYU', 'Peso Uruguayo'],
    ['UYI', 'Uruguay Peso en Unidades Indexadas(UI)'],
    ['UYW', 'Unidad Previsional'],
    ['UZS', 'Uzbekistan Sum'],
    ['VEB', 'Bolivar'],
    ['VND', 'Dong'],
    ['VUV', 'Vatu'],
    ['VES', 'Bolivar Soberano'],
    ['WST', 'Tala'],
    ['STN', 'Dobra'],
    ['XAF', 'CFA Franc'],
    ['XAG', 'Silver'],
    ['XAU', 'Gold'],
    ['XCD', 'East Carribean Dollar'],
    ['XDR', 'SDR'],
    ['XOF', 'CFA Franc'],
    ['XPD', 'Palladium'],
    ['XPF', 'CFP Franc'],
    ['XPT', 'Platinum'],
    ['XSU', 'Sucre'],
    ['XBA', 'Bond Markets Unit European Composite Unit(EURCO)'],
    ['XBB', 'Bond Markets Unit European Monetary Unit(E.M.U.-6)'],
    ['XBC', 'Bond Markets Unit European Unit of Account 17 (E.U.A.-17)'],
    ['XTS', 'Codes specifically reserved for testing purposes'],
    [
      'XXX',
      'The codes assigned for transactions where no currency is involved',
    ],
    ['YER', 'Yemeni Rial'],
    ['YUM', 'New Dinar'],
    ['ZMW', 'Zambian Kwacha'],
    ['ZWL', 'Zimbabwe Dollar'],
    ['ZAR', 'Rand'],
    ['MMW', 'Kwacha'],
    ['ZWL', 'Zimbabwe Dollar'],
  ],
);