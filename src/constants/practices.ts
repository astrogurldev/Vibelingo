import { SlangItem } from '@/components/SlangDeepDive';

export interface PracticeLesson {
  id: string;
  title: string;
  languageCode: string; // ISO code for speech synthesis (e.g., en-US, id-ID)
  languageName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  transcript: string;
  phoneticTranscript?: string; // Optional field for Romaji/Pinyin/etc
  translation?: string; // Indonesian translation
  slang: SlangItem[];
}

export const PREDEFINED_PRACTICES: PracticeLesson[] = [
  {
    id: 'id-1',
    title: 'Tugas Numpuk',
    languageCode: 'id-ID',
    languageName: 'Indonesian',
    difficulty: 'Beginner',
    transcript: "Aduh, kerjaan hari ini numpuk banget, bikin pusing tujuh keliling. Mending kita ngopi dulu biar gak suntuk.",
    slang: [
      {
        word: "numpuk",
        context: "Bahasa sehari-hari dari 'menumpuk', biasanya merujuk pada pekerjaan yang sangat banyak.",
        genZ: "overload / numpuk parah"
      },
      {
        word: "pusing tujuh keliling",
        context: "Idiom yang menggambarkan rasa sangat bingung atau sangat pusing memikirkan sesuatu.",
        genZ: "pusing pala barbie"
      },
      {
        word: "suntuk",
        context: "Perasaan bosan, jenuh, atau lelah pikiran.",
        genZ: "bete / burn out"
      }
    ]
  },
  {
    id: 'ja-1',
    title: 'Exhausted in Tokyo',
    languageCode: 'ja-JP',
    languageName: 'Japanese',
    difficulty: 'Advanced',
    transcript: "まじで疲れた。 今日はもう帰って ゴロゴロするわ。 明日の会議の 準備は 後回しだ。",
    phoneticTranscript: "Majide tsukareta. Kyou wa mou kaette gorogoro suru wa. Ashita no kaigi no junbi wa atomawashi da.",
    translation: "Sumpah aku lelah banget. Hari ini aku mau pulang dan rebahan aja. Persiapan rapat besok aku tunda dulu.",
    slang: [
      {
        word: "まじで (Majide)",
        context: "Kata slang yang sangat umum digunakan untuk mengatakan 'serius' atau 'benar-benar'.",
        genZ: "sumpah / beneran dah"
      },
      {
        word: "ゴロゴロする (Gorogoro suru)",
        context: "Onomatope yang berarti bermalas-malasan, rebahan, atau berguling-guling santai di rumah.",
        genZ: "rebahan time"
      }
    ]
  },
  {
    id: 'ko-1',
    title: 'Korean Weekend',
    languageCode: 'ko-KR',
    languageName: 'Korean',
    difficulty: 'Beginner',
    transcript: "오늘 진짜 대박 피곤해. 그냥 집에서 뒹굴뒹굴 할래. 넌 주말에 뭐해?",
    phoneticTranscript: "Oneul jinjja daebak pigonhae. Geunyang jib-eseo dwinggul-dwinggul hallae. Neon jumal-e mwohae?",
    translation: "Hari ini gila capek banget. Aku cuma pengen rebahan di rumah. Kamu akhir pekan ini mau ngapain?",
    slang: [
      {
        word: "대박 (Daebak)",
        context: "Kata slang yang berarti luar biasa, gila, atau sangat (bisa untuk positif maupun negatif).",
        genZ: "daebak / gila sih"
      },
      {
        word: "뒹굴뒹굴 (Dwinggul-dwinggul)",
        context: "Mirip dengan gorogoro di Jepang, ini adalah kata yang menggambarkan berguling-guling santai tanpa melakukan apa-apa.",
        genZ: "rebahan terus"
      }
    ]
  },
  {
    id: 'zh-CN-1',
    title: 'Busy Day in Beijing',
    languageCode: 'zh-CN',
    languageName: 'Chinese (Mandarin)',
    difficulty: 'Intermediate',
    transcript: "今天 真是 累成狗 了。 我 现在 只想 躺平， 什么 都 不想 干。",
    phoneticTranscript: "Jīntiān zhēnshì lèi chéng gǒu le. Wǒ xiànzài zhǐ xiǎng tǎngpíng, shénme dōu bùxiǎng gàn.",
    translation: "Hari ini benar-benar capek gila. Aku sekarang cuma pengen rebahan, nggak mau ngapa-ngapain.",
    slang: [
      {
        word: "累成狗 (Lèi chéng gǒu)",
        context: "Bahasa gaul internet Tiongkok yang secara harfiah berarti 'lelah seperti anjing', artinya sangat kelelahan.",
        genZ: "capek gila / tepar"
      },
      {
        word: "躺平 (Tǎngpíng)",
        context: "Istilah modern Tiongkok yang berarti 'berbaring datar', sebuah gerakan budaya menolak kerja keras berlebihan dan memilih gaya hidup santai.",
        genZ: "rebahan aja"
      }
    ]
  },
  {
    id: 'en-1',
    title: 'Tired After Work',
    languageCode: 'en-US',
    languageName: 'English',
    difficulty: 'Intermediate',
    transcript: "To be honest, I am feeling a bit under the weather today, so I think I will just chill at home and binge-watch my favorite show.",
    translation: "Sejujurnya, saya merasa kurang enak badan hari ini, jadi saya pikir saya akan bersantai di rumah dan menonton serial TV favorit saya maraton.",
    slang: [
      {
        word: "under the weather",
        context: "Idiom yang berarti sedang merasa kurang enak badan atau agak sakit.",
        genZ: "lagi nggak enak body"
      },
      {
        word: "chill",
        context: "Bahasa gaul untuk bersantai atau menenangkan diri.",
        genZ: "santuy"
      },
      {
        word: "binge-watch",
        context: "Menonton beberapa episode acara TV berturut-turut tanpa henti.",
        genZ: "maraton drakor / series"
      }
    ]
  },
  {
    id: 'es-1',
    title: 'Busy Spanish Day',
    languageCode: 'es-ES',
    languageName: 'Spanish',
    difficulty: 'Intermediate',
    transcript: "Estoy a tope de trabajo hoy, no doy abasto. Vamos a tomar algo luego para desconectar un poco.",
    translation: "Hari ini kerjaku benar-benar menumpuk, aku kewalahan. Ayo kita minum-minum nanti untuk melepas penat sejenak.",
    slang: [
      {
        word: "a tope",
        context: "Ekspresi Spanyol yang berarti sangat sibuk atau penuh.",
        genZ: "sibuk gila / full senyum"
      },
      {
        word: "no doy abasto",
        context: "Idiom yang berarti tidak sanggup menangani semuanya karena terlalu banyak tugas.",
        genZ: "udah nggak sanggup / overwhelmed"
      },
      {
        word: "desconectar",
        context: "Berarti 'disconnect', digunakan saat seseorang ingin melupakan pekerjaan dan bersantai.",
        genZ: "healing"
      }
    ]
  },
  {
    id: 'fr-1',
    title: 'Parisian Coffee Break',
    languageCode: 'fr-FR',
    languageName: 'French',
    difficulty: 'Intermediate',
    transcript: "Je suis au bout du rouleau aujourd'hui. On se fait un café pour papoter un peu ?",
    translation: "Aku benar-benar kehabisan tenaga hari ini. Ngopi yuk sambil ngobrol santai?",
    slang: [
      {
        word: "au bout du rouleau",
        context: "Idiom Prancis yang secara harfiah berarti 'di ujung gulungan', maknanya sudah sangat kelelahan secara fisik atau mental.",
        genZ: "udah di ujung tanduk / tepar"
      },
      {
        word: "papoter",
        context: "Kata gaul santai untuk mengobrol atau ngegosip santai.",
        genZ: "nge-teh / gibah tipis-tipis"
      }
    ]
  },
  {
    id: 'de-1',
    title: 'German Feierabend',
    languageCode: 'de-DE',
    languageName: 'German',
    difficulty: 'Beginner',
    transcript: "Ich bin total kaputt. Lass uns einfach chillen und Feierabend machen.",
    translation: "Aku capek parah. Ayo kita santai aja dan selesai kerja untuk hari ini.",
    slang: [
      {
        word: "kaputt",
        context: "Bukan hanya berarti 'rusak', tapi dalam konteks harian sering digunakan untuk bilang 'sangat lelah'.",
        genZ: "capek mampus"
      },
      {
        word: "Feierabend",
        context: "Istilah ikonik Jerman untuk waktu bebas setelah jam kerja selesai.",
        genZ: "waktunya log out / me-time"
      }
    ]
  },
  {
    id: 'it-1',
    title: 'Italian Relax',
    languageCode: 'it-IT',
    languageName: 'Italian',
    difficulty: 'Beginner',
    transcript: "Sono a pezzi oggi. Non vedo l'ora di fare il dolce far niente stasera.",
    translation: "Aku hancur berkeping-keping (sangat lelah) hari ini. Nggak sabar buat bersantai nggak ngapa-ngapain malam ini.",
    slang: [
      {
        word: "a pezzi",
        context: "Secara harfiah 'berkeping-keping', idiom yang umum untuk menggambarkan rasa sangat lelah atau hancur.",
        genZ: "remuk / rontok"
      },
      {
        word: "il dolce far niente",
        context: "Ungkapan terkenal Italia: manisnya tidak melakukan apa-apa. Seni bersantai secara total.",
        genZ: "rebahan aesthetic"
      }
    ]
  },
  {
    id: 'pt-1',
    title: 'Brazilian Hangout',
    languageCode: 'pt-BR',
    languageName: 'Portuguese',
    difficulty: 'Intermediate',
    transcript: "Cara, tô morto de cansaço. Bora tomar uma cerveja pra relaxar?",
    translation: "Bro, aku capek mati rasanya. Ayo minum bir sebentar buat rileks?",
    slang: [
      {
        word: "Cara",
        context: "Panggilan santai ke teman, mirip dengan 'dude' atau 'bro'.",
        genZ: "Bro / Cuy"
      },
      {
        word: "morto de cansaço",
        context: "Idiom hiperbolik yang berarti 'mati karena kelelahan'.",
        genZ: "capek mampus"
      },
      {
        word: "Bora",
        context: "Singkatan gaul dari 'vamos embora' yang berarti 'ayo pergi' atau 'let's go'.",
        genZ: "Gas!"
      }
    ]
  },
  {
    id: 'ru-1',
    title: 'Russian Chill',
    languageCode: 'ru-RU',
    languageName: 'Russian',
    difficulty: 'Advanced',
    transcript: "Я просто без сил. Давай забьём на всё и пойдём тусить.",
    phoneticTranscript: "Ya prosto bez sil. Davay zabyom na vsyo i poydyom tusit'.",
    translation: "Aku benar-benar kehabisan tenaga. Ayo kita lupakan semuanya dan pergi nongkrong.",
    slang: [
      {
        word: "без сил (bez sil)",
        context: "Tanpa tenaga, ungkapan umum untuk sangat lelah.",
        genZ: "lowbat"
      },
      {
        word: "забить (zabit')",
        context: "Kata slang yang berarti mengabaikan sesuatu, tidak peduli lagi, atau melupakannya.",
        genZ: "bodo amat"
      },
      {
        word: "тусить (tusit')",
        context: "Kata kerja gaul untuk berpesta, nongkrong santai bersama teman.",
        genZ: "nongkrong / hangout"
      }
    ]
  },
  {
    id: 'ar-1',
    title: 'Arabic Coffee',
    languageCode: 'ar-SA',
    languageName: 'Arabic',
    difficulty: 'Intermediate',
    transcript: "أنا هلكان اليوم. خلينا نطلع نشرب قهوة ونروق.",
    phoneticTranscript: "Ana halkan al-yawm. Khallina nitla' neshrab gahwa w nerawwiq.",
    translation: "Aku hancur kelelahan hari ini. Ayo kita keluar minum kopi dan bersantai.",
    slang: [
      {
        word: "هلكان (Halkan)",
        context: "Kata gaul (Ammiyah) yang berarti sangat kelelahan sampai hampir hancur.",
        genZ: "tepar parah"
      },
      {
        word: "نروق (Nerawwiq)",
        context: "Kata santai yang berarti membersihkan pikiran, bersantai, mengambil waktu jeda.",
        genZ: "healing / chill"
      }
    ]
  },
  {
    id: 'hi-1',
    title: 'Hindi Weekend Plans',
    languageCode: 'hi-IN',
    languageName: 'Hindi',
    difficulty: 'Beginner',
    transcript: "आज तो मेरा दिमाग खराब हो गया है काम से। वीकेंड पर तो फुल मस्ती करेंगे।",
    phoneticTranscript: "Aaj toh mera dimaag kharaab ho gaya hai kaam se. Weekend par toh full masti karenge.",
    translation: "Hari ini otakku rasanya mau meledak karena kerjaan. Di akhir pekan nanti kita bakal bersenang-senang habis-habisan.",
    slang: [
      {
        word: "दिमाग खराब (Dimaag kharaab)",
        context: "Idiom yang berarti 'otak rusak', sering digunakan untuk mengungkapkan rasa stres, pusing, atau frustrasi berlebih.",
        genZ: "pusing pala barbie / nge-lag"
      },
      {
        word: "फुल मस्ती (Full masti)",
        context: "Bahasa gaul sehari-hari di India untuk bersenang-senang secara maksimal tanpa beban.",
        genZ: "party hard / seru-seruan"
      }
    ]
  },
  {
    id: 'th-1',
    title: 'Thai Relax',
    languageCode: 'th-TH',
    languageName: 'Thai',
    difficulty: 'Intermediate',
    transcript: "วันนี้ งาน เยอะ มาก จน หัว หมุน เลย ไป หา อะไร กิน ชิลๆ กัน เถอะ",
    phoneticTranscript: "Wan-nii ngaan ye mak jon hua mun loei. Pai ha a-rai kin chill chill gan thoe.",
    translation: "Hari ini kerjaku banyak sekali sampai kepalaku berputar. Ayo pergi cari makan santai aja.",
    slang: [
      {
        word: "หัวหมุน (Hua mun)",
        context: "Idiom yang berarti 'kepala berputar', sangat sibuk dan pusing dengan banyak urusan.",
        genZ: "pusing muter / mumet"
      },
      {
        word: "ชิลๆ (Chill chill)",
        context: "Pinjaman dari bahasa Inggris 'chill' yang dilipatgandakan khas bahasa Thai untuk menyatakan sesuatu yang sangat santai.",
        genZ: "santuy maksimal"
      }
    ]
  },
  {
    id: 'vi-1',
    title: 'Vietnamese Hangout',
    languageCode: 'vi-VN',
    languageName: 'Vietnamese',
    difficulty: 'Advanced',
    transcript: "Hôm nay mình đuối quá rồi. Đi trà chanh chém gió không?",
    phoneticTranscript: "Hom nay minh duoi qua roi. Di tra chanh chem gio khong?",
    translation: "Hari ini aku lemas banget rasanya. Mau pergi minum es teh jeruk sambil ngobrol ngidul nggak?",
    slang: [
      {
        word: "đuối (duoi)",
        context: "Kata gaul yang berarti sangat lelah, secara harfiah berarti tenggelam atau kehabisan napas.",
        genZ: "tumbang / tepar"
      },
      {
        word: "chém gió (chem gio)",
        context: "Idiom yang secara harfiah berarti 'memotong angin', tetapi slang ini berarti ngobrol santai, ngegosip, atau membual.",
        genZ: "gibah / nongki"
      }
    ]
  },
  {
    id: 'nl-1',
    title: 'Dutch gezellig',
    languageCode: 'nl-NL',
    languageName: 'Dutch',
    difficulty: 'Beginner',
    transcript: "Ik ben echt helemaal kapot. Laten we het vanavond gewoon gezellig thuis maken.",
    translation: "Aku bener-bener hancur (lelah). Ayo malam ini kita bikin suasana nyaman dan santai aja di rumah.",
    slang: [
      {
        word: "helemaal kapot",
        context: "Sangat lelah (literally 'completely broken').",
        genZ: "capek mampus"
      },
      {
        word: "gezellig",
        context: "Kata unik bahasa Belanda yang sangat sulit diterjemahkan. Berarti nyaman, menyenangkan, ramah, dan santai bersama.",
        genZ: "cozy / aesthetic"
      }
    ]
  },
  {
    id: 'pl-1',
    title: 'Polish Exhausation',
    languageCode: 'pl-PL',
    languageName: 'Polish',
    difficulty: 'Intermediate',
    transcript: "Padam na twarz dzisiaj. Chodźmy na piwo, żeby trochę wyluzować.",
    translation: "Aku jatuh tengkurap (sangat lelah) hari ini. Ayo pergi minum bir biar sedikit rileks.",
    slang: [
      {
        word: "Padam na twarz",
        context: "Idiom yang berarti 'aku jatuh dengan wajah di bawah', sangat kelelahan.",
        genZ: "tepar parah"
      },
      {
        word: "wyluzować",
        context: "Kata gaul untuk bersantai atau 'loose up'.",
        genZ: "santuy / chill"
      }
    ]
  },
  {
    id: 'tr-1',
    title: 'Turkish Coffee Chat',
    languageCode: 'tr-TR',
    languageName: 'Turkish',
    difficulty: 'Beginner',
    transcript: "Bugün işten başımı kaşıyacak vaktim olmadı. Gidip bir kahve içelim mi?",
    translation: "Hari ini aku bahkan nggak punya waktu buat menggaruk kepala saking sibuknya kerja. Mau pergi minum kopi bareng?",
    slang: [
      {
        word: "başımı kaşıyacak vaktim olmadı",
        context: "Idiom klasik Turki yang berarti terlalu sibuk sampai tak punya waktu untuk hal sepele seperti menggaruk kepala.",
        genZ: "sibuk brutal"
      }
    ]
  },
  {
    id: 'sv-1',
    title: 'Swedish Fika',
    languageCode: 'sv-SE',
    languageName: 'Swedish',
    difficulty: 'Intermediate',
    transcript: "Jag är helt slut efter jobbet. Vi tar en fika och snackar lite strunt.",
    translation: "Aku benar-benar habis setelah kerja. Ayo ngopi sambil makan kue dan ngobrol hal-hal sepele.",
    slang: [
      {
        word: "helt slut",
        context: "Benar-benar habis/selesai. Artinya sangat lelah secara fisik dan mental.",
        genZ: "lowbat / capek pol"
      },
      {
        word: "fika",
        context: "Tradisi sakral Swedia untuk istirahat sejenak minum kopi sambil makan kue dan bersosialisasi.",
        genZ: "ngopi santuy"
      },
      {
        word: "snacka strunt",
        context: "Mengobrol tentang hal-hal yang tidak penting/sepele (nonsense talk).",
        genZ: "ngobrol ngidul"
      }
    ]
  },
  {
    id: 'el-1',
    title: 'Greek Break',
    languageCode: 'el-GR',
    languageName: 'Greek',
    difficulty: 'Advanced',
    transcript: "Τα έχω παίξει σήμερα με τη δουλειά. Πάμε για έναν καφέ να χαλαρώσουμε;",
    phoneticTranscript: "Ta echo paixi simera me ti douleia. Pame gia enan kafe na chalarosoume?",
    translation: "Aku benar-benar hilang akal hari ini karena pekerjaan. Ayo pergi ngopi biar rileks?",
    slang: [
      {
        word: "Τα έχω παίξει (Ta echo paixi)",
        context: "Idiom yang berarti 'aku sudah memainkannya', tetapi digunakan untuk mengungkapkan kelelahan ekstrim atau hilangnya kesabaran.",
        genZ: "udah gila / mental breakdown"
      },
      {
        word: "χαλαρώσουμε (chalarosoume)",
        context: "Dari kata 'chalaro' yang berarti bersantai, sangat umum dipakai anak muda Yunani.",
        genZ: "chill aja"
      }
    ]
  },
  {
    id: 'ms-1',
    title: 'Malay Lepak',
    languageCode: 'ms-MY',
    languageName: 'Malay',
    difficulty: 'Beginner',
    transcript: "Fuh, kerja hari ni memang mencabar gila. Jom kita pergi lepak mamak kejap.",
    translation: "Wah, kerjaan hari ini memang gila tantangannya. Ayo kita pergi nongkrong di warung mamak sebentar.",
    slang: [
      {
        word: "gila",
        context: "Sering ditambahkan di akhir kalimat sebagai penegas, seperti 'sangat' atau 'parah'.",
        genZ: "parah / brutal"
      },
      {
        word: "lepak",
        context: "Bahasa gaul paling populer di Malaysia untuk bersantai, nongkrong tanpa tujuan jelas bersama teman.",
        genZ: "nongki"
      },
      {
        word: "mamak",
        context: "Merujuk pada warung makan India Muslim yang buka 24 jam, tempat nongkrong wajib di Malaysia.",
        genZ: "warkop"
      }
    ]
  },
  {
    id: 'tl-1',
    title: 'Filipino Chika',
    languageCode: 'fil-PH',
    languageName: 'Filipino (Tagalog)',
    difficulty: 'Intermediate',
    transcript: "Grabe, nakakapagod ang trabaho ngayon. Tara kape tayo, may chika ako sayo.",
    translation: "Parah, kerjaan hari ini sangat melelahkan. Ayo ngopi, aku punya gosip buat kamu.",
    slang: [
      {
        word: "Grabe",
        context: "Kata seru yang berasal dari bahasa Spanyol 'grave', digunakan untuk menekankan sesuatu yang ekstrem.",
        genZ: "gila / parah"
      },
      {
        word: "chika",
        context: "Bahasa gaul Filipina untuk berita baru, gosip, atau cerita ringan yang ingin dibagikan.",
        genZ: "gibah / spill tea"
      }
    ]
  }
];
