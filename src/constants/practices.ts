import { SlangItem } from '@/components/SlangDeepDive';

export interface PracticeLesson {
  id: string;
  title: string;
  languageCode: string;
  languageName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  transcript: string;
  phoneticTranscript?: string;
  translation?: string;
  slang: SlangItem[];
}

export const PREDEFINED_PRACTICES: PracticeLesson[] = [
  // ================= ENGLISH (5) =================
  {
    id: 'en-1',
    title: 'Tired After Work',
    languageCode: 'en-US',
    languageName: 'English',
    difficulty: 'Intermediate',
    transcript: "To be honest, I am feeling a bit under the weather today, so I think I will just chill at home and binge-watch my favorite show.",
    translation: "Sejujurnya, saya merasa kurang enak badan hari ini, jadi saya pikir saya akan bersantai di rumah dan menonton serial TV favorit saya maraton.",
    slang: [
      { word: "under the weather", context: "Merasa kurang enak badan.", genZ: "lagi nggak enak body" },
      { word: "chill", context: "Bersantai.", genZ: "santuy" },
      { word: "binge-watch", context: "Menonton TV tanpa henti.", genZ: "maraton drakor" }
    ]
  },
  {
    id: 'en-2',
    title: 'Weekend Plans',
    languageCode: 'en-US',
    languageName: 'English',
    difficulty: 'Beginner',
    transcript: "I am totally burned out. Let's hang out this weekend and grab a bite.",
    translation: "Aku benar-benar lelah habis-habisan. Ayo kita nongkrong akhir pekan ini dan cari makan.",
    slang: [
      { word: "burned out", context: "Kehabisan tenaga secara mental/fisik.", genZ: "burn out / tepar" },
      { word: "hang out", context: "Menghabiskan waktu bersama.", genZ: "nongki" },
      { word: "grab a bite", context: "Mencari makanan ringan.", genZ: "nyemil" }
    ]
  },
  {
    id: 'en-3',
    title: 'Broke and Shopping',
    languageCode: 'en-US',
    languageName: 'English',
    difficulty: 'Intermediate',
    transcript: "I am totally broke right now. I spent all my cash on these new kicks yesterday.",
    translation: "Aku benar-benar bokek sekarang. Aku menghabiskan semua uangku untuk sepatu baru ini kemarin.",
    slang: [
      { word: "broke", context: "Tidak punya uang.", genZ: "bokek" },
      { word: "kicks", context: "Sepatu keren (sneakers).", genZ: "sneakers" }
    ]
  },
  {
    id: 'en-4',
    title: 'Awesome Party',
    languageCode: 'en-US',
    languageName: 'English',
    difficulty: 'Beginner',
    transcript: "That party last night was lit! I had a blast hanging out with everyone.",
    translation: "Pesta tadi malam benar-benar seru! Aku sangat menikmati waktu dengan semuanya.",
    slang: [
      { word: "lit", context: "Sangat luar biasa/seru.", genZ: "pecah abis" },
      { word: "had a blast", context: "Sangat bersenang-senang.", genZ: "seru banget" }
    ]
  },
  {
    id: 'en-5',
    title: 'Good Food',
    languageCode: 'en-US',
    languageName: 'English',
    difficulty: 'Intermediate',
    transcript: "No cap, this new cafe is the bomb. The food here is out of this world.",
    translation: "Serius tanpa bohong, kafe baru ini luar biasa. Makanannya benar-benar sangat enak.",
    slang: [
      { word: "no cap", context: "Tidak berbohong / jujur.", genZ: "seriusan / no kecot" },
      { word: "the bomb", context: "Sesuatu yang sangat bagus.", genZ: "mantul" },
      { word: "out of this world", context: "Luar biasa lezat.", genZ: "enak gila" }
    ]
  },

  // ================= JAPANESE (5) =================
  {
    id: 'ja-1',
    title: 'Exhausted in Tokyo',
    languageCode: 'ja-JP',
    languageName: 'Japanese',
    difficulty: 'Advanced',
    transcript: "まじで疲れた。 今日はもう帰って ゴロゴロするわ。 明日の会議の 準備は 後回しだ。",
    phoneticTranscript: "Majide tsukareta. Kyou wa mou kaette gorogoro suru wa. Ashita no kaigi no junbi wa atomawashi da.",
    translation: "Sumpah lelah banget. Hari ini mau pulang dan rebahan aja. Persiapan rapat besok aku tunda.",
    slang: [
      { word: "まじで (Majide)", context: "Sangat / benar-benar.", genZ: "sumpah / beneran dah" },
      { word: "ゴロゴロする (Gorogoro suru)", context: "Bermalas-malasan.", genZ: "rebahan time" }
    ]
  },
  {
    id: 'ja-2',
    title: 'Hungry at Night',
    languageCode: 'ja-JP',
    languageName: 'Japanese',
    difficulty: 'Intermediate',
    transcript: "お腹ペコペコだわ。 コンビニ行って 夜食でも 買ってくる。",
    phoneticTranscript: "Onaka pekopeko da wa. Konbini itte yashoku demo katte kuru.",
    translation: "Perutku keroncongan. Aku mau ke minimarket buat beli camilan malam.",
    slang: [
      { word: "ペコペコ (Pekopeko)", context: "Sangat lapar.", genZ: "laper gila" },
      { word: "コンビニ (Konbini)", context: "Minimarket.", genZ: "sevel / indomaret" }
    ]
  },
  {
    id: 'ja-3',
    title: 'All Nighter',
    languageCode: 'ja-JP',
    languageName: 'Japanese',
    difficulty: 'Advanced',
    transcript: "昨日オールしたから、 今日はもう 死にそう。 マジで眠い。",
    phoneticTranscript: "Kinou ooru shita kara, kyou wa mou shinisou. Majide nemui.",
    translation: "Karena kemarin begadang semalaman, hari ini rasanya mau mati. Ngantuk banget.",
    slang: [
      { word: "オール (Ooru)", context: "Begadang / bermain semalaman.", genZ: "begadang full" },
      { word: "死にそう (Shinisou)", context: "Sangat kelelahan (seperti mau mati).", genZ: "sekarat / tepar" }
    ]
  },
  {
    id: 'ja-4',
    title: 'Delicious Ramen',
    languageCode: 'ja-JP',
    languageName: 'Japanese',
    difficulty: 'Intermediate',
    transcript: "あの店のラーメン、 ガチで 美味しかった。 また行きたいな。",
    phoneticTranscript: "Ano mise no raamen, gachi de oishikatta. Mata ikitai na.",
    translation: "Ramen di toko itu bener-bener enak banget. Pengen ke sana lagi.",
    slang: [
      { word: "ガチで (Gachi de)", context: "Sungguh-sungguh / serius.", genZ: "asli / beneran dah" }
    ]
  },
  {
    id: 'ja-5',
    title: 'Hectic Week',
    languageCode: 'ja-JP',
    languageName: 'Japanese',
    difficulty: 'Advanced',
    transcript: "最近バタバタしてて、 全然遊んでない。 今週末 どっか行こうよ。",
    phoneticTranscript: "Saikin batabata shitete, zenzen asondenai. Konshuumatsu dokka ikou yo.",
    translation: "Belakangan ini sibuk banget, nggak pernah main. Akhir pekan ini ayo pergi.",
    slang: [
      { word: "バタバタ (Batabata)", context: "Sangat sibuk / terburu-buru.", genZ: "hectic parah" }
    ]
  },

  // ================= INDONESIAN (5) =================
  {
    id: 'id-1',
    title: 'Tugas Numpuk',
    languageCode: 'id-ID',
    languageName: 'Indonesian',
    difficulty: 'Beginner',
    transcript: "Aduh, kerjaan hari ini numpuk banget, bikin pusing tujuh keliling. Mending kita ngopi dulu biar gak suntuk.",
    slang: [
      { word: "numpuk", context: "Pekerjaan yang sangat banyak.", genZ: "overload / numpuk parah" },
      { word: "pusing tujuh keliling", context: "Sangat pusing/bingung.", genZ: "pusing pala barbie" },
      { word: "suntuk", context: "Perasaan bosan/jenuh.", genZ: "bete / burn out" }
    ]
  },
  {
    id: 'id-2',
    title: 'Weekend Gabut',
    languageCode: 'id-ID',
    languageName: 'Indonesian',
    difficulty: 'Beginner',
    transcript: "Hari ini gue gabut parah sih. Gak ada kerjaan sama sekali. Mending kita jalan-jalan nyari angin aja yuk.",
    slang: [
      { word: "gabut", context: "Gaji buta (tidak ada kerjaan/bosan).", genZ: "gabut" },
      { word: "nyari angin", context: "Jalan-jalan santai keluar rumah.", genZ: "healing tipis-tipis" }
    ]
  },
  {
    id: 'id-3',
    title: 'Bokek di Tanggal Tua',
    languageCode: 'id-ID',
    languageName: 'Indonesian',
    difficulty: 'Intermediate',
    transcript: "Lagi tanggal tua nih, kantong gue jebol gara-gara sering jajan di luar. Fix bulan depan harus hemat.",
    slang: [
      { word: "kantong jebol", context: "Kehabisan banyak uang.", genZ: "bokek brutal" },
      { word: "Fix", context: "Pasti / sudah diputuskan.", genZ: "fix banget" }
    ]
  },
  {
    id: 'id-4',
    title: 'Macet Jakarta',
    languageCode: 'id-ID',
    languageName: 'Indonesian',
    difficulty: 'Advanced',
    transcript: "Gila ya macetnya Jakarta hari ini, beneran bikin emosi jiwa. Gue nyampe rumah pasti udah tepar.",
    slang: [
      { word: "emosi jiwa", context: "Sangat marah atau frustrasi.", genZ: "emosi parah" },
      { word: "tepar", context: "Tertidur pulas karena sangat kelelahan.", genZ: "tumbang" }
    ]
  },
  {
    id: 'id-5',
    title: 'Kopi Senja',
    languageCode: 'id-ID',
    languageName: 'Indonesian',
    difficulty: 'Beginner',
    transcript: "Cuacanya enak banget buat nongkrong sambil nunggu senja. Boleh lah kita pesen kopi susu gula aren.",
    slang: [
      { word: "nongkrong", context: "Duduk bersantai bersama teman.", genZ: "nongki" },
      { word: "anak senja", context: "Sebutan untuk orang yang suka musik indie dan kopi di sore hari.", genZ: "aesthetic" }
    ]
  },

  // ================= KOREAN (5) =================
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
      { word: "대박 (Daebak)", context: "Luar biasa / gila.", genZ: "gila sih" },
      { word: "뒹굴뒹굴 (Dwinggul-dwinggul)", context: "Berguling santai di rumah.", genZ: "rebahan terus" }
    ]
  },
  {
    id: 'ko-2',
    title: 'Spicy Food Cravings',
    languageCode: 'ko-KR',
    languageName: 'Korean',
    difficulty: 'Intermediate',
    transcript: "스트레스 받아서 매운 거 땡겨. 우리 떡볶이 먹으러 갈래? 내가 쏠게!",
    phoneticTranscript: "Seuteureseu badaseo maeun geo ttaenggyeo. Uri tteokbokki meogeureo gallae? Naega ssolge!",
    translation: "Aku stres jadi pengen makan yang pedas-pedas. Kita pergi makan tteokbokki yuk? Aku yang traktir!",
    slang: [
      { word: "땡겨 (Ttaenggyeo)", context: "Sangat menginginkan sesuatu (biasanya makanan).", genZ: "ngidam parah" },
      { word: "내가 쏠게 (Naega ssolge)", context: "Aku yang akan mentraktir/membayar.", genZ: "gue yang traktir" }
    ]
  },
  {
    id: 'ko-3',
    title: 'Friendship',
    languageCode: 'ko-KR',
    languageName: 'Korean',
    difficulty: 'Beginner',
    transcript: "야, 우리 베프잖아. 비밀은 절대 안 새나가게 할게. 믿어봐.",
    phoneticTranscript: "Ya, uri bepeujana. Bimir-eun jeoldae an saenagage halge. Mideobwa.",
    translation: "Hei, kita kan sahabat. Rahasiamu pasti nggak bakal bocor. Percayalah.",
    slang: [
      { word: "베프 (Bepeu)", context: "Singkatan dari Best Friend.", genZ: "bestie" }
    ]
  },
  {
    id: 'ko-4',
    title: 'Annoying Situation',
    languageCode: 'ko-KR',
    languageName: 'Korean',
    difficulty: 'Advanced',
    transcript: "아 진짜 어이없어. 내 말 씹고 그냥 가버렸어. 킹받네.",
    phoneticTranscript: "A jinjja eoieobseo. Nae mal ssipgo geunyang gabeoryeosseo. Kingbanne.",
    translation: "Ah bener-bener nggak masuk akal. Dia ngacangin aku dan pergi gitu aja. Bikin emosi.",
    slang: [
      { word: "씹고 (Ssipgo)", context: "Mengunyah (tapi dalam konteks ini berarti mengabaikan/ngacangin).", genZ: "di-read doang / dikacangin" },
      { word: "킹받네 (Kingbanne)", context: "Slang gabungan dari 'King' dan 'Menerima', artinya sangat membuat marah/kesal.", genZ: "emosi jiwa" }
    ]
  },
  {
    id: 'ko-5',
    title: 'Diet Fails',
    languageCode: 'ko-KR',
    languageName: 'Korean',
    difficulty: 'Intermediate',
    transcript: "다이어트 중인데 치킨 냄새 맡고 멘붕 왔어. 오늘까지만 먹을까?",
    phoneticTranscript: "Daieoteu junginde chikin naemsae matgo menbung wasseo. Oneulkkajiman meogeulkka?",
    translation: "Aku lagi diet tapi nyium bau ayam goreng langsung hancur mentalku. Boleh nggak makannya sampai hari ini aja?",
    slang: [
      { word: "멘붕 (Menbung)", context: "Singkatan dari 'Mental Breakdown'.", genZ: "kena mental" }
    ]
  },

  // ================= SPANISH (5) =================
  {
    id: 'es-1',
    title: 'Busy Spanish Day',
    languageCode: 'es-ES',
    languageName: 'Spanish',
    difficulty: 'Intermediate',
    transcript: "Estoy a tope de trabajo hoy, no doy abasto. Vamos a tomar algo luego para desconectar un poco.",
    translation: "Hari ini kerjaku menumpuk. Ayo minum nanti untuk melepas penat.",
    slang: [
      { word: "a tope", context: "Sangat sibuk.", genZ: "sibuk gila" },
      { word: "desconectar", context: "Bersantai / melupakan kerjaan.", genZ: "healing" }
    ]
  },
  {
    id: 'es-2',
    title: 'Cool Party',
    languageCode: 'es-ES',
    languageName: 'Spanish',
    difficulty: 'Beginner',
    transcript: "¡Qué guay estuvo la fiesta de ayer! Me lo pasé genial con todos vosotros.",
    translation: "Pesta kemarin keren banget! Aku sangat bersenang-senang dengan kalian semua.",
    slang: [
      { word: "guay", context: "Kata slang Spanyol untuk keren atau bagus.", genZ: "keren abis / kece" }
    ]
  },
  {
    id: 'es-3',
    title: 'Too Expensive',
    languageCode: 'es-ES',
    languageName: 'Spanish',
    difficulty: 'Intermediate',
    transcript: "No voy a comprar ese móvil, cuesta un ojo de la cara. Prefiero ahorrar la pasta.",
    translation: "Aku tidak akan membeli HP itu, harganya mahal banget. Aku lebih milih nabung.",
    slang: [
      { word: "cuesta un ojo de la cara", context: "Harganya seharga sebelah mata (sangat mahal).", genZ: "mahal mampus" },
      { word: "pasta", context: "Bahasa gaul Spanyol untuk uang (money).", genZ: "cuan / duit" }
    ]
  },
  {
    id: 'es-4',
    title: 'Lazy Sunday',
    languageCode: 'es-ES',
    languageName: 'Spanish',
    difficulty: 'Beginner',
    transcript: "Hoy no tengo ganas de hacer nada. Me voy a quedar en la cama todo el día, tirado a la bartola.",
    translation: "Hari ini aku nggak pengen ngapa-ngapain. Aku mau rebahan aja seharian di kasur.",
    slang: [
      { word: "tirado a la bartola", context: "Bermalas-malasan tanpa melakukan apa-apa.", genZ: "kaum rebahan" }
    ]
  },
  {
    id: 'es-5',
    title: 'Crazy Story',
    languageCode: 'es-ES',
    languageName: 'Spanish',
    difficulty: 'Advanced',
    transcript: "Tío, me ha pasado una cosa loquísima hoy. Tienes que flipar con lo que te voy a contar.",
    translation: "Bro, ada kejadian gila banget yang nimpah aku hari ini. Kamu pasti syok dengernya.",
    slang: [
      { word: "Tío", context: "Panggilan akrab untuk teman (Paman).", genZ: "Bro" },
      { word: "flipar", context: "Terkejut, syok, atau sangat takjub.", genZ: "syok berat" }
    ]
  },

  // ================= CHINESE (MANDARIN) (5) =================
  {
    id: 'zh-CN-1',
    title: 'Busy Day in Beijing',
    languageCode: 'zh-CN',
    languageName: 'Chinese (Mandarin)',
    difficulty: 'Intermediate',
    transcript: "今天 真是 累成狗 了。 我 现在 只想 躺平， 什么 都 不想 干。",
    phoneticTranscript: "Jīntiān zhēnshì lèi chéng gǒu le. Wǒ xiànzài zhǐ xiǎng tǎngpíng, shénme dōu bùxiǎng gàn.",
    translation: "Hari ini lelah gila. Aku sekarang cuma pengen rebahan.",
    slang: [
      { word: "累成狗 (Lèi chéng gǒu)", context: "Lelah seperti anjing.", genZ: "capek gila" },
      { word: "躺平 (Tǎngpíng)", context: "Berbaring / menolak kerja keras.", genZ: "rebahan aja" }
    ]
  },
  {
    id: 'zh-CN-2',
    title: 'Awesome Bro',
    languageCode: 'zh-CN',
    languageName: 'Chinese (Mandarin)',
    difficulty: 'Beginner',
    transcript: "哥们儿，你太牛了！ 这次 考试 你 竟然 拿 了 满分。",
    phoneticTranscript: "Gēmenr, nǐ tài niú le! Zhècì kǎoshì nǐ jìngrán ná le mǎnfēn.",
    translation: "Bro, kamu hebat banget! Ujian kali ini kamu malah dapat nilai sempurna.",
    slang: [
      { word: "哥们儿 (Gēmenr)", context: "Panggilan untuk teman dekat laki-laki.", genZ: "bro / cuy" },
      { word: "牛 (Niú)", context: "Berasal dari kata sapi, digunakan untuk bilang 'keren/hebat'.", genZ: "OP / mantul" }
    ]
  },
  {
    id: 'zh-CN-3',
    title: 'Eating Dirt',
    languageCode: 'zh-CN',
    languageName: 'Chinese (Mandarin)',
    difficulty: 'Intermediate',
    transcript: "我 这个 月 花 钱 太 多 了， 接下来 只能 吃土 了。",
    phoneticTranscript: "Wǒ zhège yuè huā qián tài duō le, jiēxiàlái zhǐnéng chītǔ le.",
    translation: "Bulan ini aku terlalu banyak menghabiskan uang, selanjutnya cuma bisa makan tanah (miskin).",
    slang: [
      { word: "吃土 (Chītǔ)", context: "Makan tanah (saking bokeknya tidak bisa beli makan).", genZ: "kere brutal / bokek" }
    ]
  },
  {
    id: 'zh-CN-4',
    title: 'Spill the Tea',
    languageCode: 'zh-CN',
    languageName: 'Chinese (Mandarin)',
    difficulty: 'Advanced',
    transcript: "快 跟我 说说， 昨天 那个 瓜 到底 是 怎么 回事？",
    phoneticTranscript: "Kuài gēn wǒ shuōshuo, zuótiān nàge guā dàodǐ shì zěnme huíshì?",
    translation: "Cepat kasih tahu aku, gosip kemarin itu sebenarnya gimana ceritanya?",
    slang: [
      { word: "瓜 (Guā)", context: "Secara harfiah berarti melon, tapi slang ini berarti gosip atau drama.", genZ: "drama / teh" },
      { word: "吃瓜 (Chīguā)", context: "Makan melon (mengamati drama orang lain).", genZ: "nyimak / gibah" }
    ]
  },
  {
    id: 'zh-CN-5',
    title: 'Feeling Good',
    languageCode: 'zh-CN',
    languageName: 'Chinese (Mandarin)',
    difficulty: 'Beginner',
    transcript: "今天 天气 绝了！ 我们 去 逛街 吧， 顺便 喝杯 奶茶。",
    phoneticTranscript: "Jīntiān tiānqì jué le! Wǒmen qù guàngjiē ba, shùnbiàn hē bēi nǎichá.",
    translation: "Cuaca hari ini sempurna! Ayo kita pergi jalan-jalan, sekalian minum boba.",
    slang: [
      { word: "绝了 (Jué le)", context: "Sangat luar biasa, tiada tara.", genZ: "keren parah / perfect" }
    ]
  },

  // ================= 16 OTHER LANGUAGES (1 Each for fallback) =================
  {
    id: 'fr-1',
    title: 'Parisian Coffee Break',
    languageCode: 'fr-FR',
    languageName: 'French',
    difficulty: 'Intermediate',
    transcript: "Je suis au bout du rouleau aujourd'hui. On se fait un café pour papoter un peu ?",
    translation: "Aku kehabisan tenaga hari ini. Ngopi yuk sambil ngobrol santai?",
    slang: [
      { word: "au bout du rouleau", context: "Di ujung gulungan (sangat lelah).", genZ: "udah tepar" },
      { word: "papoter", context: "Mengobrol santai.", genZ: "gibah tipis-tipis" }
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
      { word: "kaputt", context: "Rusak / sangat lelah.", genZ: "capek mampus" },
      { word: "Feierabend", context: "Waktu bebas setelah jam kerja.", genZ: "waktunya log out" }
    ]
  },
  {
    id: 'it-1',
    title: 'Italian Relax',
    languageCode: 'it-IT',
    languageName: 'Italian',
    difficulty: 'Beginner',
    transcript: "Sono a pezzi oggi. Non vedo l'ora di fare il dolce far niente stasera.",
    translation: "Aku hancur berkeping-keping hari ini. Nggak sabar buat bersantai nggak ngapa-ngapain.",
    slang: [
      { word: "a pezzi", context: "Sangat lelah (berkeping-keping).", genZ: "remuk" }
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
      { word: "Cara", context: "Panggilan santai ke teman.", genZ: "Bro" },
      { word: "Bora", context: "Ayo pergi.", genZ: "Gas!" }
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
    translation: "Aku benar-benar kehabisan tenaga. Ayo lupakan semuanya dan nongkrong.",
    slang: [
      { word: "тусить (tusit')", context: "Berpesta / nongkrong santai.", genZ: "hangout" }
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
    translation: "Aku kelelahan hari ini. Ayo keluar minum kopi dan bersantai.",
    slang: [
      { word: "نروق (Nerawwiq)", context: "Membersihkan pikiran / bersantai.", genZ: "healing" }
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
    translation: "Hari ini otakku rasanya mau meledak. Di akhir pekan kita bakal bersenang-senang.",
    slang: [
      { word: "दिमाग खराब (Dimaag kharaab)", context: "Otak rusak / frustrasi.", genZ: "pusing pala barbie" }
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
    translation: "Hari ini kerjaku banyak sekali sampai pusing. Ayo pergi cari makan santai.",
    slang: [
      { word: "หัวหมุน (Hua mun)", context: "Kepala berputar / sangat sibuk.", genZ: "mumet" }
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
    translation: "Hari ini aku lemas banget rasanya. Mau ngopi sambil ngobrol nggak?",
    slang: [
      { word: "chém gió (chem gio)", context: "Ngobrol santai / ngegosip.", genZ: "gibah" }
    ]
  },
  {
    id: 'nl-1',
    title: 'Dutch gezellig',
    languageCode: 'nl-NL',
    languageName: 'Dutch',
    difficulty: 'Beginner',
    transcript: "Ik ben echt helemaal kapot. Laten we het vanavond gewoon gezellig thuis maken.",
    translation: "Aku lelah hancur. Ayo malam ini kita bikin suasana nyaman di rumah.",
    slang: [
      { word: "gezellig", context: "Nyaman / santai bersama.", genZ: "cozy" }
    ]
  },
  {
    id: 'pl-1',
    title: 'Polish Exhausation',
    languageCode: 'pl-PL',
    languageName: 'Polish',
    difficulty: 'Intermediate',
    transcript: "Padam na twarz dzisiaj. Chodźmy na piwo, żeby trochę wyluzować.",
    translation: "Aku jatuh tengkurap saking lelahnya. Ayo minum bir biar rileks.",
    slang: [
      { word: "wyluzować", context: "Bersantai.", genZ: "chill" }
    ]
  },
  {
    id: 'tr-1',
    title: 'Turkish Coffee Chat',
    languageCode: 'tr-TR',
    languageName: 'Turkish',
    difficulty: 'Beginner',
    transcript: "Bugün işten başımı kaşıyacak vaktim olmadı. Gidip bir kahve içelim mi?",
    translation: "Hari ini saking sibuknya nggak sempat garuk kepala. Ngopi yuk?",
    slang: [
      { word: "başımı kaşıyacak vaktim olmadı", context: "Terlalu sibuk sampai tak bisa menggaruk kepala.", genZ: "sibuk brutal" }
    ]
  },
  {
    id: 'sv-1',
    title: 'Swedish Fika',
    languageCode: 'sv-SE',
    languageName: 'Swedish',
    difficulty: 'Intermediate',
    transcript: "Jag är helt slut efter jobbet. Vi tar en fika och snackar lite strunt.",
    translation: "Aku habis tenaga setelah kerja. Ayo ngopi kue dan ngobrol sepele.",
    slang: [
      { word: "fika", context: "Istirahat kopi dan kue ala Swedia.", genZ: "ngopi santuy" }
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
    translation: "Aku benar-benar hilang akal karena kerjaan. Ayo ngopi biar rileks?",
    slang: [
      { word: "χαλαρώσουμε (chalarosoume)", context: "Bersantai.", genZ: "chill aja" }
    ]
  },
  {
    id: 'ms-1',
    title: 'Malay Lepak',
    languageCode: 'ms-MY',
    languageName: 'Malay',
    difficulty: 'Beginner',
    transcript: "Fuh, kerja hari ni memang mencabar gila. Jom kita pergi lepak mamak kejap.",
    translation: "Wah, kerjaan hari ini menantang gila. Ayo nongkrong di warkop mamak sebentar.",
    slang: [
      { word: "lepak", context: "Nongkrong.", genZ: "nongki" }
    ]
  },
  {
    id: 'tl-1',
    title: 'Filipino Chika',
    languageCode: 'fil-PH',
    languageName: 'Filipino (Tagalog)',
    difficulty: 'Intermediate',
    transcript: "Grabe, nakakapagod ang trabaho ngayon. Tara kape tayo, may chika ako sayo.",
    translation: "Parah capeknya hari ini. Ayo ngopi, aku punya gosip buat kamu.",
    slang: [
      { word: "chika", context: "Gosip / berita hangat.", genZ: "spill tea" }
    ]
  }
];
