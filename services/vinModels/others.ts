/**
 * VIN model lookup for all other manufacturers:
 * Renault (VF1/VF2/VF6/VNE), Dacia (UU1/UU3), Peugeot (VF3/VR3),
 * Citroën (VF7/VF8/VR7/VS7), DS (VF9/VR1/VR8), Alpine (VFA),
 * Opel (W0L), Hyundai Czech (TMA), Ford Europe (WF0/WF1/SFA/VS6),
 * Toyota (SB1/JTD/JTE/JTK/JTM/JTN/JT2/JT3/VNK),
 * Lexus (JTJ/JTH/JTL), Honda (JHM/SHH), Nissan (JN1/JN6/JN8/VNV),
 * Infiniti (JNK), Mazda (JM1/JM4/JMZ), Mitsubishi (JMB/JA3/JA4),
 * Suzuki (JS1-JS4), Subaru (JF1/JF2),
 * Hyundai (KMH/KMF/KMJ), Kia (KNA/KND/KNM/U5Y/U6Y), Genesis (KMT),
 * SsangYong (KPT/KLA), Volvo (YV1/YV4), Saab (YS3),
 * Jaguar (SAJ), Land Rover (SAL), Rolls-Royce (SCA), Bentley (SCB),
 * Lotus (SCC), DeLorean (SCE), McLaren (SBM), Aston Martin (SCF),
 * Alfa Romeo (ZAR), Fiat (ZFA), Lancia (ZLA),
 * Ferrari (ZFF), Lamborghini (ZHW), Maserati (ZAM),
 * Tesla (5YJ/SFZ/LRW/XP7)
 *
 * Key = WMI (3) + VIN[3] + VIN[4]  →  positions 4-5 of VIN
 */
export const OTHER_MODELS: Record<string, string> = {

  // ═══════════════════════════════════════════════════════════
  // RENAULT (VF1)
  // ═══════════════════════════════════════════════════════════
  'VF1AA': 'Clio',
  'VF1AB': 'Clio RS',
  'VF1AC': 'Clio E-Tech',
  'VF1BA': 'Megane',
  'VF1BB': 'Megane RS',
  'VF1BC': 'Megane E-Tech',
  'VF1CA': 'Laguna',
  'VF1CB': 'Laguna Coupé',
  'VF1DA': 'Espace',
  'VF1EA': 'Scenic',
  'VF1EB': 'Grand Scenic',
  'VF1EC': 'Scenic E-Tech',
  'VF1FA': 'Trafic',
  'VF1GA': 'Kangoo',
  'VF1GB': 'Kangoo E-Tech',
  'VF1HA': 'Kadjar',
  'VF1JA': 'Koleos',
  'VF1KA': 'Captur',
  'VF1KB': 'Captur E-Tech',
  'VF1LA': 'Twingo',
  'VF1LB': 'Twingo Electric',
  'VF1MA': 'Zoe',
  'VF1NA': 'Arkana',
  'VF1PA': 'Austral',
  'VF1QA': 'Rafale',
  'VF1RA': 'Talisman',
  'VF1SA': 'Safrane',

  // ═══════════════════════════════════════════════════════════
  // DACIA (UU1, UU3)
  // ═══════════════════════════════════════════════════════════
  'UU1AA': 'Duster',
  'UU1AB': 'Duster 4WD',
  'UU1BA': 'Logan',
  'UU1BB': 'Logan MCV',
  'UU1CA': 'Sandero',
  'UU1CB': 'Sandero Stepway',
  'UU1DA': 'Lodgy',
  'UU1EA': 'Dokker',
  'UU1FA': 'Spring',
  'UU1GA': 'Jogger',
  'UU1HA': 'Bigster',
  'UU3AA': 'Duster',
  'UU3BA': 'Logan',
  'UU3CA': 'Sandero',

  // ═══════════════════════════════════════════════════════════
  // PEUGEOT (VF3)
  // ═══════════════════════════════════════════════════════════
  'VF3AA': '108',
  'VF3BA': '208',
  'VF3BB': '208 GT',
  'VF3BC': 'e-208',
  'VF3CA': '308',
  'VF3CB': '308 SW',
  'VF3CC': '308 GT',
  'VF3DA': '408',
  'VF3EA': '508',
  'VF3EB': '508 SW',
  'VF3EC': '508 PSE',
  'VF3FA': '2008',
  'VF3FB': 'e-2008',
  'VF3GA': '3008',
  'VF3GB': '3008 GT',
  'VF3GC': 'e-3008',
  'VF3HA': '5008',
  'VF3HB': 'e-5008',
  'VF3JA': 'Rifter',
  'VF3KA': 'Traveller',
  'VF3LA': 'Partner',
  'VF3MA': 'Expert',

  // ═══════════════════════════════════════════════════════════
  // CITROËN (VF7, VF8, VR7) + DS (VF9, VR1, VR8)
  // VR7 = PSA/Stellantis France WMI (cars may be assembled at Vigo, Spain)
  // VF9 / VR1 = DS Automobiles (VR1 confirmed from PSA 2017 WMI assignment)
  // VR8 = PSA-range WMI, likely DS or related brand (unconfirmed)
  // ═══════════════════════════════════════════════════════════
  'VF7AA': 'C1',
  'VF7BA': 'C3',
  'VF7BB': 'C3 Aircross',
  'VF7BC': 'ë-C3',
  'VF7CA': 'C4',
  'VF7CB': 'ë-C4',
  'VF7CC': 'C4 X',
  'VF7DA': 'C5',
  'VF7DB': 'C5 X',
  'VF7DC': 'C5 Aircross',
  'VF7EA': 'C3 Picasso',
  'VF7EB': 'C4 Picasso',
  'VF7EC': 'Grand C4 Picasso',
  'VF7FA': 'Berlingo',
  'VF7GA': 'SpaceTourer',
  'VF7HA': 'Jumpy',
  'VF8AA': 'C-Elysée',
  'VF9AA': 'DS 3',
  'VF9AB': 'DS 3 Crossback',
  'VF9BA': 'DS 4',
  'VF9BB': 'DS 4 Crossback',
  'VF9CA': 'DS 5',
  'VF9DA': 'DS 7 Crossback',
  'VF9EA': 'DS 9',
  // VR7 = Citroën Vigo (Spain) — Berlingo, SpaceTourer, Jumpy produced here
  'VR7FA': 'Berlingo',
  'VR7GA': 'SpaceTourer',
  'VR7HA': 'Jumpy',
  'VR7BA': 'C3',
  'VR7CA': 'C4',

  // ═══════════════════════════════════════════════════════════
  // OPEL / VAUXHALL (W0L, X0L)
  // TMA = Hyundai Motor Manufacturing Czech (Nošovice), NOT Opel Hungary
  // ═══════════════════════════════════════════════════════════
  'W0LAA': 'Corsa',
  'W0LAB': 'Corsa-e',
  'W0LAC': 'Corsa OPC',
  'W0LBA': 'Astra',
  'W0LBB': 'Astra Sports Tourer',
  'W0LBC': 'Astra GSe',
  'W0LBD': 'Astra Electric',
  'W0LCA': 'Insignia',
  'W0LCB': 'Insignia Sports Tourer',
  'W0LCC': 'Insignia Grand Sport',
  'W0LDA': 'Mokka',
  'W0LDB': 'Mokka-e',
  'W0LEA': 'Crossland',
  'W0LEB': 'Crossland X',
  'W0LFA': 'Grandland',
  'W0LFB': 'Grandland X',
  'W0LFC': 'Grandland GSe',
  'W0LGA': 'Zafira',
  'W0LGB': 'Zafira Tourer',
  'W0LHA': 'Vectra',
  'W0LHB': 'Vectra Caravan',
  'W0LJA': 'Meriva',
  'W0LKA': 'Combo',
  'W0LLA': 'Vivaro',
  'W0LMA': 'Cascada',
  'W0LNA': 'Adam',
  'W0LPA': 'Karl / Viva',
  // TMA = Hyundai Motor Manufacturing Czech s.r.o. (Nošovice plant)
  'TMAAA': 'i20',
  'TMABA': 'i30',
  'TMACA': 'Tucson',

  // ═══════════════════════════════════════════════════════════
  // FORD — European (WF0)
  // ═══════════════════════════════════════════════════════════
  'WF0AA': 'Fiesta',
  'WF0AB': 'Fiesta ST',
  'WF0BA': 'Focus',
  'WF0BB': 'Focus ST',
  'WF0BC': 'Focus RS',
  'WF0CA': 'Mondeo',
  'WF0CB': 'Mondeo Hybrid',
  'WF0DA': 'Kuga',
  'WF0DB': 'Kuga PHEV',
  'WF0EA': 'EcoSport',
  'WF0FA': 'Puma',
  'WF0FB': 'Puma ST',
  'WF0GA': 'Galaxy',
  'WF0HA': 'S-Max',
  'WF0JA': 'Mustang Mach-E',
  'WF0KA': 'Explorer',
  'WF0LA': 'Tourneo Connect',
  'WF0MA': 'Transit Connect',
  'WF0NA': 'Transit Custom',
  'WF0PA': 'Transit',

  // ═══════════════════════════════════════════════════════════
  // TOYOTA — European (SB1, WBA, JT2, JTD, JTE, JTM, JTN, JT3)
  // ═══════════════════════════════════════════════════════════
  'SB1AA': 'Yaris',
  'SB1AB': 'Yaris GR',
  'SB1AC': 'Yaris Cross',
  'SB1BA': 'Corolla',
  'SB1BB': 'Corolla Touring Sports',
  'SB1CA': 'C-HR',
  'SB1CB': 'C-HR PHEV',
  'SB1DA': 'RAV4',
  'SB1DB': 'RAV4 PHEV',
  'SB1EA': 'Camry',
  'SB1FA': 'Highlander',
  'SB1GA': 'Land Cruiser',
  'SB1GB': 'Land Cruiser Prado',
  'SB1HA': 'bZ4X',
  'SB1JA': 'Aygo X',
  'SB1KA': 'Proace',
  'JTDBA': 'Corolla',
  'JTDCA': 'Avensis',
  'JTDDA': 'RAV4',
  'JTDEA': 'Auris',
  'JTDFA': 'Yaris',
  'JTDGA': 'C-HR',
  'JTDHA': 'Hilux',
  'JTDJA': 'Land Cruiser',

  // LEXUS
  'JTJAA': 'UX',
  'JTJBA': 'NX',
  'JTJCA': 'RX',
  'JTJDA': 'GX',
  'JTJEA': 'LX',
  'JTJFA': 'IS',
  'JTJGA': 'ES',
  'JTJHA': 'GS',
  'JTJJA': 'LS',
  'JTJKA': 'RC',
  'JTJLA': 'LC',
  'JTJMA': 'CT',
  'JTJPA': 'RZ',

  // ═══════════════════════════════════════════════════════════
  // HONDA (JHM, 19X)
  // ═══════════════════════════════════════════════════════════
  'JHMAA': 'Jazz',
  'JHMAB': 'Jazz Crosstar',
  'JHMAC': 'Jazz e:HEV',
  'JHMBA': 'Civic',
  'JHMBB': 'Civic Type R',
  'JHMBC': 'Civic e:HEV',
  'JHMCA': 'CR-V',
  'JHMCB': 'CR-V e:PHEV',
  'JHMDA': 'HR-V',
  'JHMEA': 'ZR-V',
  'JHMFA': 'e:Ny1',
  'JHMGA': 'Legend',
  'JHMHA': 'Accord',

  // ═══════════════════════════════════════════════════════════
  // HYUNDAI (KMH, KMF, TMF)
  // ═══════════════════════════════════════════════════════════
  'KMHAA': 'i10',
  'KMHAB': 'i10 N Line',
  'KMHBA': 'i20',
  'KMHBB': 'i20 N',
  'KMHBC': 'i20 N Line',
  'KMHCA': 'i30',
  'KMHCB': 'i30 N',
  'KMHCC': 'i30 Fastback',
  'KMHCD': 'i30 SW',
  'KMHDA': 'i40',
  'KMHDB': 'i40 Tourer',
  'KMHEA': 'Elantra',
  'KMHFA': 'Tucson',
  'KMHFB': 'Tucson PHEV',
  'KMHGA': 'Santa Fe',
  'KMHGB': 'Santa Fe PHEV',
  'KMHHA': 'Kona',
  'KMHHB': 'Kona Electric',
  'KMHJA': 'IONIQ',
  'KMHJB': 'IONIQ 5',
  'KMHJC': 'IONIQ 6',
  'KMHJD': 'IONIQ 9',
  'KMHKA': 'Staria',
  'KMHLA': 'Bayon',
  'KMHMA': 'Nexo',
  'KMFBA': 'i20',
  'KMFCA': 'i30',
  'KMFFA': 'Tucson',

  // ═══════════════════════════════════════════════════════════
  // KIA (KNA, KND, U5Y, U6Y)
  // ═══════════════════════════════════════════════════════════
  'KNAAA': 'Picanto',
  'KNAAB': 'Picanto GT Line',
  'KNABA': 'Rio',
  'KNABB': 'Rio GT Line',
  'KNACA': 'Ceed',
  'KNACB': 'Ceed GT',
  'KNACC': 'ProCeed',
  'KNACD': 'XCeed',
  'KNADA': 'Stonic',
  'KNAEA': 'Soul',
  'KNAEB': 'Soul EV',
  'KNAFA': 'Sportage',
  'KNAFB': 'Sportage PHEV',
  'KNAGA': 'Niro',
  'KNAGB': 'Niro EV',
  'KNAGC': 'Niro PHEV',
  'KNAHA': 'Sorento',
  'KNAHB': 'Sorento PHEV',
  'KNAJA': 'EV6',
  'KNAJB': 'EV6 GT',
  'KNAKA': 'EV9',
  'KNALA': 'Carnival',
  'KNAMA': 'Telluride',
  'KNANA': 'EV3',
  'KNDAA': 'Picanto',
  'KNDCA': 'Ceed',
  'KNDFA': 'Sportage',
  'KNDHA': 'Sorento',

  // ═══════════════════════════════════════════════════════════
  // VOLVO (YV1, YV4)
  // YV1 = older/sedan models, YV4 = newer SUV/EV models (2019+)
  // VSK = Nissan Motor Ibérica S.A., Spain — NOT Volvo
  // ═══════════════════════════════════════════════════════════
  'YV1AA': 'S40',
  'YV1BA': 'S60',
  'YV1BB': 'S60 Recharge',
  'YV1CA': 'S80',
  'YV1DA': 'S90',
  'YV1DB': 'S90 Recharge',
  'YV1EA': 'V40',
  'YV1EB': 'V40 Cross Country',
  'YV1FA': 'V60',
  'YV1FB': 'V60 Cross Country',
  'YV1FC': 'V60 Recharge',
  'YV1GA': 'V70',
  'YV1HA': 'V90',
  'YV1HB': 'V90 Cross Country',
  'YV1HC': 'V90 Recharge',
  'YV1JA': 'XC40',
  'YV1JB': 'XC40 Recharge',
  'YV1KA': 'XC60',
  'YV1KB': 'XC60 Recharge',
  'YV1LA': 'XC90',
  'YV1LB': 'XC90 Recharge',
  'YV1MA': 'C30',
  'YV1NA': 'C40 Recharge',
  'YV1PA': 'EX30',
  'YV1QA': 'EX40',
  'YV1RA': 'EX90',

  // YV4 = newer SUV/electric platform (2019+)
  // Confirmed: XC60 2023 = YV4L12DM8P1... (pos4='L'), XC90 2025 = YV4M12PJ1S... (pos4='M')
  'YV4JA': 'XC40',
  'YV4JB': 'XC40 Recharge',
  'YV4KA': 'XC60',
  'YV4KB': 'XC60 Recharge',
  'YV4LA': 'XC90',
  'YV4LB': 'XC90 Recharge',
  'YV4MA': 'XC90',
  'YV4NA': 'C40 Recharge',
  'YV4PA': 'EX30',
  'YV4RA': 'EX90',
  // 4-char fallback keys for YV4 (when 5-char key doesn't match)
  'YV4J': 'XC40',
  'YV4K': 'XC60',
  'YV4L': 'XC90',
  'YV4M': 'XC90',

  // ═══════════════════════════════════════════════════════════
  // JAGUAR (SAJ) + LAND ROVER (SAL, SALJ, SALV, SALW)
  // ═══════════════════════════════════════════════════════════
  'SAJAA': 'XE',
  'SAJAB': 'XF',
  'SAJAC': 'XF Sportbrake',
  'SAJAD': 'XJ',
  'SAJAE': 'E-Pace',
  'SAJAF': 'F-Pace',
  'SAJAG': 'F-Pace SVR',
  'SAJAH': 'I-Pace',
  'SAJAJ': 'F-Type',
  'SAJAK': 'F-Type R',
  'SAJAL': 'XK',
  'SALAA': 'Defender 90',
  'SALAB': 'Defender 110',
  'SALAC': 'Defender 130',
  'SALAD': 'Discovery',
  'SALAE': 'Discovery Sport',
  'SALAF': 'Freelander',
  'SALAG': 'Range Rover',
  'SALAH': 'Range Rover Sport',
  'SALAJ': 'Range Rover Velar',
  'SALAK': 'Range Rover Evoque',
  'SALAL': 'Range Rover SVAutobiography',

  // ═══════════════════════════════════════════════════════════
  // ALFA ROMEO (ZAR) + FIAT (ZFA) + LANCIA (ZLA)
  // ═══════════════════════════════════════════════════════════
  'ZARAA': 'Giulia',
  'ZARAB': 'Giulia GTA',
  'ZARAC': 'Giulia Quadrifoglio',
  'ZARAD': 'Stelvio',
  'ZARAE': 'Stelvio Quadrifoglio',
  'ZARAF': 'Tonale',
  'ZARAG': 'Tonale PHEV',
  'ZARAH': 'Giulietta',
  'ZARAJ': 'MiTo',
  'ZARAK': '4C',
  'ZARAL': '4C Spider',
  'ZARAM': 'Junior',
  'ZFAAA': '500',
  'ZFAAB': '500e',
  'ZFAAC': '500 Abarth',
  'ZFABA': 'Panda',
  'ZFABB': 'Panda 4x4',
  'ZFABC': 'Panda Cross',
  'ZFACA': 'Tipo',
  'ZFACB': 'Tipo Cross',
  'ZFACC': 'Tipo SW',
  'ZFADA': 'Doblo',
  'ZFAEA': 'Bravo',
  'ZFAFA': '500X',
  'ZFAFB': '500L',
  'ZFAGA': 'Punto',
  'ZFAHA': 'Grande Punto',
  'ZFAJA': '600',
  'ZLABA': 'Ypsilon',
  'ZLABB': 'Ypsilon Hybrid',

  // ═══════════════════════════════════════════════════════════
  // NISSAN (JN1, JN6, JN8)
  // ═══════════════════════════════════════════════════════════
  'JN1AA': 'Micra',
  'JN1BA': 'Juke',
  'JN1BB': 'Juke Hybrid',
  'JN1CA': 'Qashqai',
  'JN1CB': 'Qashqai e-Power',
  'JN1DA': 'X-Trail',
  'JN1DB': 'X-Trail e-Power',
  'JN1EA': 'Leaf',
  'JN1FA': 'Ariya',
  'JN1GA': 'Note',
  'JN1HA': 'Navara',
  'JN1JA': 'Pathfinder',
  'JN1KA': 'Murano',
  'JN1LA': '370Z',
  'JN1MA': 'GT-R',
  'JN6AA': 'Navara',

  // ═══════════════════════════════════════════════════════════
  // MAZDA (JM1, JM4, JMZ — same platform codes, different plants/markets)
  // ═══════════════════════════════════════════════════════════
  'JM1AA': '2',  'JM4AA': '2',
  'JM1AB': '2 Hybrid',  'JM4AB': '2 Hybrid',
  'JM1BA': '3',  'JM4BA': '3',
  'JM1BB': '3 Fastback',  'JM4BB': '3 Fastback',
  'JM1BP': '3',  'JM4BP': '3',  // BP = 4th gen (2019+) platform
  'JM1CA': '6',  'JM4CA': '6',
  'JM1CB': '6 SW',  'JM4CB': '6 SW',
  'JM1DA': 'CX-3',  'JM4DA': 'CX-3',
  'JM1EA': 'CX-30',  'JM4EA': 'CX-30',
  'JM1FA': 'CX-5',  'JM4FA': 'CX-5',
  'JM1FB': 'CX-5 Skyactiv-X',  'JM4FB': 'CX-5 Skyactiv-X',
  'JM1GA': 'CX-60',  'JM4GA': 'CX-60',
  'JM1GB': 'CX-60 PHEV',  'JM4GB': 'CX-60 PHEV',
  'JM1HA': 'CX-80',  'JM4HA': 'CX-80',
  'JM1JA': 'CX-90',  'JM4JA': 'CX-90',
  'JM1KA': 'MX-5',  'JM4KA': 'MX-5',
  'JM1LA': 'MX-30',  'JM4LA': 'MX-30',
  'JM1MA': 'MX-30 R-EV',  'JM4MA': 'MX-30 R-EV',

  // ═══════════════════════════════════════════════════════════
  // SUBARU (JF1, JF2)
  // ═══════════════════════════════════════════════════════════
  'JF1AA': 'Impreza',
  'JF1AB': 'Impreza WRX',
  'JF1AC': 'WRX STI',
  'JF1BA': 'Forester',
  'JF1BB': 'Forester e-Boxer',
  'JF1CA': 'Outback',
  'JF1CB': 'Outback e-Boxer',
  'JF1DA': 'XV / Crosstrek',
  'JF1DB': 'XV e-Boxer',
  'JF1EA': 'Legacy',
  'JF1FA': 'BRZ',
  'JF1GA': 'Solterra',
  'JF2BA': 'Forester',
  'JF2CA': 'Outback',
  'JF2DA': 'XV',

  // ═══════════════════════════════════════════════════════════
  // FERRARI (ZFF) + LAMBORGHINI (ZHW) + MASERATI (ZAM)
  // ═══════════════════════════════════════════════════════════
  'ZFFAA': 'Roma',
  'ZFFAB': 'Roma Spider',
  'ZFFAC': '296 GTB',
  'ZFFAD': '296 GTS',
  'ZFFAE': '296 GT3',
  'ZFFBA': 'Portofino',
  'ZFFBB': 'Portofino M',
  'ZFFCA': 'SF90 Stradale',
  'ZFFCB': 'SF90 Spider',
  'ZFFDA': '812 Superfast',
  'ZFFDB': '812 GTS',
  'ZFFDC': '812 Competizione',
  'ZFFEA': 'F8 Tributo',
  'ZFFEB': 'F8 Spider',
  'ZFFFA': 'Purosangue',
  'ZFFGA': 'GTC4 Lusso',
  'ZFFHA': '488 GTB',
  'ZHWAA': 'Urus',
  'ZHWAB': 'Urus Performante',
  'ZHWAC': 'Urus S',
  'ZHWBA': 'Huracán',
  'ZHWBB': 'Huracán Evo',
  'ZHWBC': 'Huracán STO',
  'ZHWCA': 'Aventador',
  'ZHWCB': 'Aventador S',
  'ZHWCC': 'Revuelto',
  'ZAMAA': 'Ghibli',
  'ZAMAB': 'Ghibli Hybrid',
  'ZAMBA': 'Levante',
  'ZAMBB': 'Levante GT',
  'ZAMCA': 'Quattroporte',
  'ZAMDA': 'Grecale',
  'ZAMDB': 'Grecale GT',
  'ZAMEA': 'GranTurismo',
  'ZAMFA': 'MC20',

  // ═══════════════════════════════════════════════════════════
  // PORSCHE (WP0=sports/luxury/Cayenne, WP1=SUV/Macan)
  // European VINs use ZZZ format (pos 4-6 = 'ZZZ'); lookup key = WMI + pos7 + pos8.
  // Type codes: 911→99x, Panamera→97x, 718/Boxster/Cayman→98x, Cayenne→9Y, Macan→95, Taycan→J1
  // ═══════════════════════════════════════════════════════════
  // WP0 — sports cars, Panamera, Cayenne (EU ZZZ: key = WP0 + pos7 + pos8)
  'WP099': '911',               // 992/991/997/996 type codes all start with 99
  'WP097': 'Panamera',          // 970/971 type codes
  'WP098': 'Boxster / Cayman',  // 986/987/981/982 → all map to pos7+pos8='98'
  'WP09Y': 'Cayenne',           // 9Y0/9YA (Cayenne + Cayenne Coupé)
  'WP0J1': 'Taycan',            // J1 type code (Taycan / Taycan Sport Turismo)
  // WP1 — SUV (EU ZZZ: key = WP1 + pos7 + pos8)
  'WP195': 'Macan',             // 95B type code (WP1ZZZ95ZNLB33489 user-confirmed)
  'WP19J': 'Macan',             // J1 = second-gen electric Macan
  // 4-char fallback keys (WMI + pos4) for non-ZZZ / unrecognised VDS
  'WP09': '911',
  'WP19': 'Macan',

  // ═══════════════════════════════════════════════════════════
  // TESLA (5YJ=US Fremont, SFZ=UK Hethel/Roadster, LRW=Shanghai,
  //         7SA=Cybertruck, XP7=Giga Berlin)
  // Source: NHTSA VIN decoder docs (vpic.nhtsa.dot.gov)
  // YY3 is NOT Tesla Germany — YY = Sweden range; Giga Berlin = XP7
  // Position 4: S=Model S, X=Model X, 3=Model 3, Y=Model Y, C=Cybertruck
  // Using 4-char keys (WMI + pos4) to cover all body-style variants.
  // ═══════════════════════════════════════════════════════════
  // US — Fremont, CA (5YJ)
  '5YJS': 'Model S',
  '5YJSA': 'Model S',        // pos5=A common variant
  '5YJSE': 'Model S',        // pos5=E sedan
  '5YJX': 'Model X',
  '5YJXC': 'Model X',        // pos5=C common variant
  '5YJ3': 'Model 3',
  '5YJ3E': 'Model 3',        // pos5=E sedan LHD
  '5YJY': 'Model Y',
  '5YJYG': 'Model Y',        // pos5=G MPV LHD
  '5YJYC': 'Model Y Performance',
  // UK / EU legacy (SFZ) — same pos4 model letters
  'SFZS': 'Model S',
  'SFZ3': 'Model 3',
  'SFZY': 'Model Y',
  // Shanghai (LRW) — same pos4 model letters
  'LRW3': 'Model 3',
  'LRWY': 'Model Y',
  'LRWS': 'Model S',
  'LRWX': 'Model X',
  // Giga Berlin (XP7) — same pos4 model letters
  'XP7Y': 'Model Y',
  'XP73': 'Model 3',

  // ═══════════════════════════════════════════════════════════
  // GENESIS (KMT, MAL)
  // ═══════════════════════════════════════════════════════════
  'KMTAA': 'G70',
  'KMTAB': 'G70 Shooting Brake',
  'KMTBA': 'G80',
  'KMTCA': 'G90',
  'KMTDA': 'GV70',
  'KMTDB': 'GV70 Electrified',
  'KMTEA': 'GV80',
  'KMTFA': 'GV60',
  'KMTGA': 'Electrified G80',

  // ═══════════════════════════════════════════════════════════
  // DS AUTOMOBILES (VR8 — WMI unconfirmed but PSA-range; kept as best guess)
  // Confirmed DS WMIs: VF9 (main) and VR1 (PSA 2017 reassignment)
  // ═══════════════════════════════════════════════════════════
  'VR8AA': 'DS 3',        'VR8AB': 'DS 3 Crossback',  'VR8AC': 'DS 3 E-Tense',
  'VR8BA': 'DS 4',        'VR8BB': 'DS 4 E-Tense',
  'VR8CA': 'DS 5',
  'VR8DA': 'DS 7',        'VR8DB': 'DS 7 E-Tense',
  'VR8EA': 'DS 9',        'VR8EB': 'DS 9 E-Tense',

  // ═══════════════════════════════════════════════════════════
  // ALPINE (VFA)
  // ═══════════════════════════════════════════════════════════
  'VFAAA': 'A110',
  'VFAAB': 'A110 S',
  'VFAAC': 'A110 R',
  'VFABA': 'A290',
  'VFACA': 'A310',

  // ═══════════════════════════════════════════════════════════
  // TOYOTA FRANCE (VNK) — mirrors SB1 codes
  // ═══════════════════════════════════════════════════════════
  'VNKAA': 'Yaris',       'VNKAB': 'Yaris GR',      'VNKAC': 'Yaris Cross',
  'VNKBA': 'Corolla',     'VNKBB': 'Corolla Touring Sports',
  'VNKCA': 'C-HR',        'VNKCB': 'C-HR PHEV',
  'VNKDA': 'RAV4',        'VNKDB': 'RAV4 PHEV',
  'VNKEA': 'Camry',
  'VNKHA': 'bZ4X',
  'VNKJA': 'Aygo X',
  'VNKKA': 'Proace',      'VNKKB': 'Proace City',

  // ═══════════════════════════════════════════════════════════
  // TOYOTA JAPAN variants (JTE, JTK, JTM, JTN, JT2, JT3)
  // ═══════════════════════════════════════════════════════════
  'JTEBA': 'Corolla',     'JTECA': 'RAV4',      'JTEDA': 'Avensis',
  'JTEFA': 'Yaris',       'JTEGA': 'C-HR',      'JTEHA': 'Land Cruiser',
  'JTKBA': 'Corolla',     'JTKCA': 'Camry',     'JTKFA': 'Yaris',
  'JTMBA': 'RAV4',        'JTMCA': 'Highlander','JTMDA': 'Land Cruiser',
  'JTNBA': 'Corolla',     'JTNCA': 'Camry',     'JTNDA': 'RAV4',
  'JT2BA': 'Corolla',     'JT3BA': 'Land Cruiser',

  // ═══════════════════════════════════════════════════════════
  // LEXUS variants (JTH, JTL)
  // ═══════════════════════════════════════════════════════════
  'JTHAA': 'UX',   'JTHBA': 'IS',   'JTHCA': 'ES',
  'JTHDA': 'GS',   'JTHEA': 'LS',   'JTHFA': 'RC',
  'JTHGA': 'LC',   'JTHHA': 'RZ',
  'JTLAA': 'UX',   'JTLBA': 'NX',   'JTLCA': 'RX',
  'JTLDA': 'GX',   'JTLEA': 'LX',   'JTLFA': 'IS',

  // ═══════════════════════════════════════════════════════════
  // HONDA UK (SHH) — mirrors JHM codes
  // ═══════════════════════════════════════════════════════════
  'SHHAA': 'Jazz',         'SHHAB': 'Jazz Crosstar',   'SHHAC': 'Jazz e:HEV',
  'SHHBA': 'Civic',        'SHHBB': 'Civic Type R',    'SHHBC': 'Civic e:HEV',
  'SHHCA': 'CR-V',         'SHHCB': 'CR-V e:PHEV',
  'SHHDA': 'HR-V',
  'SHHEA': 'ZR-V',
  'SHHFA': 'e:Ny1',
  'SHHHA': 'Accord',

  // ═══════════════════════════════════════════════════════════
  // NISSAN UK/FRANCE (VNV) — mirrors JN1 codes
  // ═══════════════════════════════════════════════════════════
  'VNVAA': 'Micra',        'VNVBA': 'Juke',         'VNVBB': 'Juke Hybrid',
  'VNVCA': 'Qashqai',      'VNVCB': 'Qashqai e-Power',
  'VNVDA': 'X-Trail',      'VNVDB': 'X-Trail e-Power',
  'VNVEA': 'Leaf',         'VNVFA': 'Ariya',

  // ═══════════════════════════════════════════════════════════
  // INFINITI (JNK)
  // ═══════════════════════════════════════════════════════════
  'JNKAA': 'Q30',
  'JNKBA': 'Q50',
  'JNKCA': 'Q60',
  'JNKDA': 'QX30',
  'JNKEA': 'QX50',
  'JNKFA': 'QX55',
  'JNKGA': 'QX60',
  'JNKHA': 'QX70',
  'JNKJA': 'QX80',

  // ═══════════════════════════════════════════════════════════
  // MITSUBISHI comprehensive (JMB, JA3, JA4)
  // ═══════════════════════════════════════════════════════════
  'JMBAA': 'Colt',
  'JMBBA': 'Lancer',       'JMBBB': 'Lancer Evolution',
  'JMBCA': 'Galant',
  'JMBDA': 'Eclipse',      'JMBDB': 'Eclipse Cross',   'JMBDC': 'Eclipse Cross PHEV',
  'JMBEA': 'Outlander',    'JMBEB': 'Outlander PHEV',  'JMBEC': 'Outlander Sport',
  'JMBFA': 'ASX',          'JMBFB': 'ASX PHEV',
  'JMBGA': 'Pajero',       'JMBGB': 'Pajero Sport',
  'JMBHA': 'L200',
  'JMBJA': 'Space Star',
  'JA3AA': 'Colt',         'JA3BA': 'Lancer',          'JA3CA': 'Eclipse',
  'JA4AA': 'Outlander',    'JA4AB': 'Outlander PHEV',  'JA4BA': 'ASX',

  // ═══════════════════════════════════════════════════════════
  // SUZUKI comprehensive (JS1, JS2, JS3, JS4)
  // ═══════════════════════════════════════════════════════════
  'JS1AA': 'Swift',        'JS1AB': 'Swift Sport',
  'JS1BA': 'Baleno',
  'JS1CA': 'Vitara',       'JS1CB': 'Vitara SHVS',
  'JS1DA': 'S-Cross',      'JS1DB': 'S-Cross Hybrid',
  'JS1EA': 'Ignis',
  'JS1FA': 'Jimny',
  'JS1GA': 'Across',
  'JS1HA': 'Swace',
  'JS2AA': 'Swift',        'JS2CA': 'Vitara',          'JS2DA': 'S-Cross',
  'JS3AA': 'Swift',        'JS3CA': 'Vitara',          'JS3FA': 'Jimny',
  'JS4AA': 'Swift',        'JS4CA': 'Vitara',          'JS4FA': 'Jimny',

  // ═══════════════════════════════════════════════════════════
  // KIA Slovakia plants (U5Y, U6Y) — mirrors KNA codes
  // ═══════════════════════════════════════════════════════════
  'U5YAA': 'Picanto',      'U6YAA': 'Picanto',
  'U5YCA': 'Ceed',         'U6YCA': 'Ceed',
  'U5YCB': 'ProCeed',      'U6YCB': 'ProCeed',
  'U5YDA': 'Stonic',       'U6YDA': 'Stonic',
  'U5YFA': 'Sportage',     'U6YFA': 'Sportage',
  'U5YJA': 'EV6',          'U6YJA': 'EV6',
  'U5YKA': 'EV9',          'U6YKA': 'EV9',

  // ═══════════════════════════════════════════════════════════
  // SSANGYONG (KPT, KLA)
  // ═══════════════════════════════════════════════════════════
  'KPTAA': 'Tivoli',       'KPTAB': 'Tivoli Electric',
  'KPTBA': 'Korando',      'KPTBB': 'Korando e-Motion',
  'KPTCA': 'Rexton',       'KPTCB': 'Rexton Sport',
  'KPTDA': 'Musso',
  'KLAAA': 'Tivoli',       'KLABA': 'Korando',         'KLACA': 'Rexton',

  // ═══════════════════════════════════════════════════════════
  // DELOREAN (SCE) + MCLAREN (SBM)
  // SCE = DeLorean Motor Cars Ltd., Northern Ireland (NOT McLaren)
  // SBM = McLaren Automotive Ltd., Woking, Surrey
  // Source: Wikibooks WMI, dot.report
  // ═══════════════════════════════════════════════════════════
  'SCEAA': 'DMC-12',

  'SBMAA': '720S',
  'SBMAB': '720S Spider',
  'SBMBA': '765LT',
  'SBMBB': '765LT Spider',
  'SBMCA': 'GT',
  'SBMDA': 'Artura',
  'SBMDB': 'Artura Spider',
  'SBMEA': '570S',
  'SBMEB': '570GT',
  'SBMFA': '600LT',

  // ═══════════════════════════════════════════════════════════
  // ASTON MARTIN (SCF)
  // ═══════════════════════════════════════════════════════════
  'SCFAA': 'DB11',         'SCFAB': 'DB11 Volante',
  'SCFBA': 'DB12',         'SCFBB': 'DB12 Volante',
  'SCFCA': 'Vantage',      'SCFCB': 'Vantage Roadster',
  'SCFDA': 'DBS',          'SCFDB': 'DBS Superleggera',
  'SCFEA': 'DBX',          'SCFEB': 'DBX707',
  'SCFFA': 'Valkyrie',
  'SCFGA': 'Vanquish',

  // ═══════════════════════════════════════════════════════════
  // ROLLS-ROYCE (SCA) / BENTLEY (SCB) / LOTUS (SCC)
  // ═══════════════════════════════════════════════════════════
  'SCAAA': 'Phantom',      'SCAAB': 'Phantom EWB',
  'SCABA': 'Ghost',        'SCABB': 'Ghost EWB',
  'SCACA': 'Wraith',       'SCACB': 'Wraith Black Badge',
  'SCADA': 'Dawn',
  'SCAEA': 'Cullinan',     'SCAEB': 'Cullinan Black Badge',
  'SCAFA': 'Spectre',
  'SCBAA': 'Continental GT',  'SCBAB': 'Continental GT Convertible',
  'SCBBA': 'Flying Spur',
  'SCBCA': 'Bentayga',     'SCBCB': 'Bentayga EWB',
  'SCBDA': 'Mulsanne',
  'SCCAA': 'Emira',
  'SCCBA': 'Evija',
  'SCCCA': 'Elise',
  'SCCDA': 'Exige',

  // ═══════════════════════════════════════════════════════════
  // FORD additional plants (WF1, SFA, VS6) — WF0 already above
  // ═══════════════════════════════════════════════════════════
  'WF1AA': 'Fiesta',       'WF1BA': 'Focus',          'WF1CA': 'Mondeo',
  'WF1DA': 'Kuga',         'WF1EA': 'EcoSport',       'WF1FA': 'Puma',
  'SFAAA': 'Fiesta',       'SFABA': 'Focus',          'SFACA': 'Mondeo',
  'SFADA': 'Kuga',         'SFAFA': 'Puma',
  'VS6AA': 'Fiesta',       'VS6BA': 'Focus',          'VS6FA': 'Puma',

  // ═══════════════════════════════════════════════════════════
  // RENAULT additional plants (VF2, VF6, VNE)
  // VR1 = DS Automobiles (PSA 2017 reassignment), NOT Renault
  // ═══════════════════════════════════════════════════════════
  'VF2AA': 'Clio',         'VF2BA': 'Megane',          'VF2CA': 'Laguna',
  'VF6AA': 'Clio',         'VF6BA': 'Megane',          'VF6KA': 'Captur',
  'VNEAA': 'Clio',         'VNEBA': 'Megane',          'VNEKA': 'Captur',
  // VR1 = DS Automobiles (confirmed: PSA 2017 WMI assignment; DS VIN example VR1JJEHZRJY032632)
  'VR1AA': 'DS 3',         'VR1AB': 'DS 3 Crossback',  'VR1AC': 'DS 3 E-Tense',
  'VR1BA': 'DS 4',         'VR1BB': 'DS 4 E-Tense',
  'VR1CA': 'DS 5',
  'VR1DA': 'DS 7 Crossback', 'VR1DB': 'DS 7 E-Tense',
  'VR1EA': 'DS 9',
};
