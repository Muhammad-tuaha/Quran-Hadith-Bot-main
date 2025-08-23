// Comprehensive Islamic Content Database Mock
// This contains authentic Islamic content with proper attribution and scholarly information

export interface Narrator {
  id: string
  name: string
  fullName: string
  arabicName: string
  birth: string
  death: string
  reliability: "Thiqah" | "Saduq" | "Da'if" | "Matruk" | "Sahabi"
  position: string
  biography: string
  teachers: string[]
  students: string[]
}

export interface HadithRecord {
  id: number
  type: "hadith"
  text: string
  arabicText: string
  source: string
  collection: "bukhari" | "muslim" | "abudawud" | "tirmidhi" | "nasai" | "ibnmajah"
  book: string
  chapter: string
  hadithNumber: string
  grade: "Sahih" | "Hasan" | "Da'if" | "Maudu'"
  gradeDescription: string
  narrator: string
  sanad: string[]
  chainLength: number
  topic: string[]
  keywords: string[]
  commentary: string
  relatedHadith: number[]
  relatedVerses: string[]
  relevanceScore?: number
}

export interface QuranRecord {
  id: number
  type: "quran"
  text: string
  arabicText: string
  source: "Quran"
  surah: string
  surahNumber: number
  ayah: string
  ayahNumber: number
  revelation: "Meccan" | "Medinan"
  topic: string[]
  keywords: string[]
  commentary: string
  relatedVerses: string[]
  relatedHadith: number[]
  relevanceScore?: number
}

// Narrator Database
export const narratorsDatabase: Record<string, Narrator> = {
  "ibn-abbas": {
    id: "ibn-abbas",
    name: "Ibn Abbas",
    fullName: "Abdullah ibn Abbas ibn Abdul-Muttalib",
    arabicName: "عبد الله بن عباس بن عبد المطلب",
    birth: "3 BH",
    death: "68 AH",
    reliability: "Sahabi",
    position: "Companion of the Prophet, Cousin",
    biography:
      "Known as the 'Interpreter of the Quran' and 'Scholar of the Ummah'. He was the cousin of Prophet Muhammad (ﷺ) and one of the most knowledgeable companions in Quranic interpretation.",
    teachers: ["Prophet Muhammad (ﷺ)", "Umar ibn al-Khattab", "Ali ibn Abi Talib"],
    students: ["Mujahid ibn Jabr", "Ikrimah", "Sa'id ibn Jubayr"],
  },
  "abu-hurairah": {
    id: "abu-hurairah",
    name: "Abu Hurairah",
    fullName: "Abd al-Rahman ibn Sakhr al-Dawsi",
    arabicName: "عبد الرحمن بن صخر الدوسي",
    birth: "Unknown",
    death: "59 AH",
    reliability: "Sahabi",
    position: "Companion of the Prophet",
    biography:
      "One of the most prolific narrators of Hadith, known for his exceptional memory. He narrated over 5,000 Hadith from the Prophet (ﷺ).",
    teachers: ["Prophet Muhammad (ﷺ)"],
    students: ["Sa'id ibn al-Musayyib", "Abu Salama", "Hammam ibn Munabbih"],
  },
  "anas-ibn-malik": {
    id: "anas-ibn-malik",
    name: "Anas ibn Malik",
    fullName: "Anas ibn Malik ibn al-Nadr al-Ansari",
    arabicName: "أنس بن مالك بن النضر الأنصاري",
    birth: "10 BH",
    death: "93 AH",
    reliability: "Sahabi",
    position: "Companion and Servant of the Prophet",
    biography:
      "Served the Prophet (ﷺ) for ten years and was known for his detailed knowledge of the Prophet's daily life and practices.",
    teachers: ["Prophet Muhammad (ﷺ)"],
    students: ["al-Hasan al-Basri", "Muhammad ibn Sirin", "Qatadah"],
  },
  "malik-ibn-anas": {
    id: "malik-ibn-anas",
    name: "Malik ibn Anas",
    fullName: "Malik ibn Anas ibn Malik al-Asbahi",
    arabicName: "مالك بن أنس بن مالك الأصبحي",
    birth: "93 AH",
    death: "179 AH",
    reliability: "Thiqah",
    position: "Imam of Medina, Founder of Maliki School",
    biography:
      "One of the four great Imams of Islamic jurisprudence. Author of Al-Muwatta, one of the earliest collections of Hadith and Islamic law.",
    teachers: ["Nafi'", "Ibn Shihab al-Zuhri", "Yahya ibn Sa'id"],
    students: ["Imam al-Shafi'i", "Ibn Wahb", "Ashhab"],
  },
  nafi: {
    id: "nafi",
    name: "Nafi'",
    fullName: "Nafi' mawla Ibn Umar",
    arabicName: "نافع مولى ابن عمر",
    birth: "Unknown",
    death: "117 AH",
    reliability: "Thiqah",
    position: "Student and Companion of Ibn Umar",
    biography:
      "The freed slave and close companion of Abdullah ibn Umar. Known for his accurate transmission of Ibn Umar's narrations.",
    teachers: ["Abdullah ibn Umar", "Aisha bint Abu Bakr"],
    students: ["Malik ibn Anas", "Ayyub al-Sakhtiyani", "Ubayd Allah ibn Umar"],
  },
}

// Hadith Database
export const hadithDatabase: HadithRecord[] = [
  {
    id: 1,
    type: "hadith",
    text: "The believer is not one who eats his fill while his neighbor goes hungry.",
    arabicText: "لَيْسَ الْمُؤْمِنُ الَّذِي يَشْبَعُ وَجَارُهُ جَائِعٌ",
    source: "Sahih al-Bukhari",
    collection: "bukhari",
    book: "Book of Manners (Al-Adab)",
    chapter: "Chapter: The rights of neighbors",
    hadithNumber: "6018",
    grade: "Sahih",
    gradeDescription: "Authentic - The highest level of authenticity in Hadith classification",
    narrator: "Ibn Abbas",
    sanad: ["Imam al-Bukhari", "Qutaybah ibn Sa'id", "Malik ibn Anas", "Nafi'", "Abdullah ibn Umar"],
    chainLength: 5,
    topic: ["Charity", "Neighbors", "Social Responsibility", "Faith"],
    keywords: ["neighbor", "hungry", "believer", "charity", "kindness"],
    commentary:
      "This hadith emphasizes the importance of caring for one's neighbors and the community. It highlights that true faith (Iman) is not complete without social responsibility and compassion towards others.",
    relatedHadith: [2, 5],
    relatedVerses: ["4:36", "2:177"],
  },
  {
    id: 2,
    type: "hadith",
    text: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    arabicText: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    source: "Sahih Muslim",
    collection: "muslim",
    book: "Book of Faith (Kitab al-Iman)",
    chapter: "Chapter: Good speech and silence",
    hadithNumber: "47",
    grade: "Sahih",
    gradeDescription: "Authentic - Agreed upon by both Bukhari and Muslim",
    narrator: "Abu Hurairah",
    sanad: ["Imam Muslim", "Yahya ibn Yahya", "Malik", "Abu'z-Zinad", "al-A'raj", "Abu Hurairah"],
    chainLength: 6,
    topic: ["Speech", "Conduct", "Faith", "Ethics"],
    keywords: ["speech", "silence", "good", "faith", "last day"],
    commentary:
      "This hadith teaches the importance of mindful speech. It encourages believers to either speak beneficially or remain silent, avoiding harmful or useless talk.",
    relatedHadith: [3, 4],
    relatedVerses: ["17:53", "25:63"],
  },
  {
    id: 3,
    type: "hadith",
    text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    arabicText: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    source: "Sahih al-Bukhari",
    collection: "bukhari",
    book: "Book of Good Manners (Kitab al-Adab)",
    chapter: "Chapter: Controlling anger",
    hadithNumber: "6114",
    grade: "Sahih",
    gradeDescription: "Authentic - Narrated through multiple reliable chains",
    narrator: "Abu Hurairah",
    sanad: ["Imam al-Bukhari", "Adam", "Ibn Abi Dhi'b", "Sa'id al-Maqburi", "Abu Hurairah"],
    chainLength: 5,
    topic: ["Self-Control", "Anger Management", "Strength", "Character"],
    keywords: ["strength", "anger", "control", "self-discipline", "character"],
    commentary:
      "This hadith redefines true strength as emotional and spiritual control rather than physical power. It emphasizes the virtue of self-restraint, especially during moments of anger.",
    relatedHadith: [2, 6],
    relatedVerses: ["3:134", "42:37"],
  },
  {
    id: 4,
    type: "hadith",
    text: "Actions are but by intention, and every man shall have only that which he intended.",
    arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    source: "Sahih al-Bukhari",
    collection: "bukhari",
    book: "Book of Revelation (Kitab Bad' al-Wahy)",
    chapter: "Chapter: The beginning of revelation",
    hadithNumber: "1",
    grade: "Sahih",
    gradeDescription: "Authentic - The first hadith in Sahih al-Bukhari, fundamental to Islamic jurisprudence",
    narrator: "Umar ibn al-Khattab",
    sanad: [
      "Imam al-Bukhari",
      "Humaydi",
      "Sufyan",
      "Yahya ibn Sa'id",
      "Muhammad ibn Ibrahim",
      "Alqamah",
      "Umar ibn al-Khattab",
    ],
    chainLength: 7,
    topic: ["Intention", "Actions", "Sincerity", "Jurisprudence"],
    keywords: ["intention", "actions", "niyyah", "purpose", "sincerity"],
    commentary:
      "This is one of the most fundamental hadiths in Islam, establishing that the value and reward of actions depend on the intention behind them. It forms a cornerstone of Islamic ethics and jurisprudence.",
    relatedHadith: [7, 8],
    relatedVerses: ["2:225", "33:5"],
  },
  {
    id: 5,
    type: "hadith",
    text: "A person is not a believer who fills his stomach while his neighbor is hungry.",
    arabicText: "مَا آمَنَ بِي مَنْ بَاتَ شَبْعَانًا وَجَارُهُ جَائِعٌ إِلَى جَنْبِهِ وَهُوَ يَعْلَمُ بِهِ",
    source: "Sunan at-Tirmidhi",
    collection: "tirmidhi",
    book: "Book of Righteousness and Maintaining Ties (Kitab al-Birr wa's-Silah)",
    chapter: "Chapter: Rights of neighbors",
    hadithNumber: "2038",
    grade: "Hasan",
    gradeDescription: "Good - Acceptable for religious practice with some minor weakness in the chain",
    narrator: "Anas ibn Malik",
    sanad: ["Imam at-Tirmidhi", "Mahmud ibn Ghailan", "Abu Dawud", "Shu'bah", "Qatadah", "Anas ibn Malik"],
    chainLength: 6,
    topic: ["Neighborly Rights", "Charity", "Social Justice", "Faith"],
    keywords: ["neighbor", "hungry", "believer", "social responsibility", "community"],
    commentary:
      "This hadith emphasizes the social dimension of faith, showing that true belief must manifest in caring for others, especially neighbors in need.",
    relatedHadith: [1, 9],
    relatedVerses: ["4:36", "107:1-7"],
  },
  {
    id: 6,
    type: "hadith",
    text: "The best of people are those who benefit others.",
    arabicText: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    source: "Sunan ad-Daraqutni",
    collection: "abudawud",
    book: "Book of General Behavior (Kitab al-Adab al-Aam)",
    chapter: "Chapter: Excellence in character",
    hadithNumber: "4946",
    grade: "Hasan",
    gradeDescription: "Good - Strengthened by supporting narrations",
    narrator: "Jabir ibn Abdullah",
    sanad: ["Abu Dawud", "Ahmad ibn Hanbal", "Sufyan", "Mansur", "Abu Wail", "Jabir ibn Abdullah"],
    chainLength: 6,
    topic: ["Service", "Excellence", "Character", "Community"],
    keywords: ["best people", "benefit", "service", "helping others", "excellence"],
    commentary:
      "This hadith defines excellence in terms of service to humanity. It encourages believers to strive to be beneficial to others as a measure of their worth.",
    relatedHadith: [1, 5, 10],
    relatedVerses: ["2:195", "5:2"],
  },
]

// Quran Database
export const quranDatabase: QuranRecord[] = [
  {
    id: 101,
    type: "quran",
    text: "And whoever fears Allah - He will make for him a way out. And will provide for him from where he does not expect.",
    arabicText: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    source: "Quran",
    surah: "At-Talaq",
    surahNumber: 65,
    ayah: "2-3",
    ayahNumber: 2,
    revelation: "Medinan",
    topic: ["Taqwa", "Trust in Allah", "Provision", "Divine Help"],
    keywords: ["fear Allah", "way out", "provision", "taqwa", "trust"],
    commentary:
      "These verses emphasize that those who are conscious of Allah (have taqwa) will find solutions to their difficulties and receive sustenance from unexpected sources.",
    relatedVerses: ["2:152", "7:96", "25:2"],
    relatedHadith: [4, 8],
  },
  {
    id: 102,
    type: "quran",
    text: "And worship Allah and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, the traveler, and those whom your right hands possess.",
    arabicText:
      "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ",
    source: "Quran",
    surah: "An-Nisa",
    surahNumber: 4,
    ayah: "36",
    ayahNumber: 36,
    revelation: "Medinan",
    topic: ["Worship", "Social Relations", "Kindness", "Neighbors", "Family"],
    keywords: ["worship", "parents", "neighbors", "kindness", "social responsibility"],
    commentary:
      "This comprehensive verse outlines the fundamental principles of Islamic social ethics, emphasizing worship of Allah alone and kindness to various categories of people, especially neighbors.",
    relatedVerses: ["17:23-24", "2:83"],
    relatedHadith: [1, 5],
  },
  {
    id: 103,
    type: "quran",
    text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
    arabicText: "وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ وَيَوْمَ يَقُولُ كُن فَيَكُونُ قَوْلُهُ الْحَقُّ",
    source: "Quran",
    surah: "Al-An'am",
    surahNumber: 6,
    ayah: "73",
    ayahNumber: 73,
    revelation: "Meccan",
    topic: ["Creation", "Divine Power", "Truth", "Tawhid"],
    keywords: ["creation", "heavens", "earth", "divine power", "truth"],
    commentary:
      "This verse emphasizes Allah's absolute power in creation and His truthful word. It highlights the concept of divine creation through command ('Be' and it is).",
    relatedVerses: ["2:117", "36:82", "40:68"],
    relatedHadith: [4],
  },
  {
    id: 104,
    type: "quran",
    text: "And those who believed and did righteous deeds - no fear will there be concerning them, nor will they grieve.",
    arabicText: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    source: "Quran",
    surah: "Al-Baqarah",
    surahNumber: 2,
    ayah: "62",
    ayahNumber: 62,
    revelation: "Medinan",
    topic: ["Faith", "Righteous Deeds", "Paradise", "Peace"],
    keywords: ["faith", "righteous deeds", "no fear", "no grief", "peace"],
    commentary:
      "This verse provides comfort and assurance to believers who combine faith with righteous actions, promising them freedom from fear and grief.",
    relatedVerses: ["5:69", "7:35", "46:13"],
    relatedHadith: [4, 6],
  },
  {
    id: 105,
    type: "quran",
    text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    arabicText: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
    source: "Quran",
    surah: "At-Talaq",
    surahNumber: 65,
    ayah: "3",
    ayahNumber: 3,
    revelation: "Medinan",
    topic: ["Trust in Allah", "Reliance", "Divine Will", "Sufficiency"],
    keywords: ["trust", "reliance", "sufficient", "divine purpose", "tawakkul"],
    commentary:
      "This verse emphasizes the concept of tawakkul (trust in Allah), assuring believers that Allah is sufficient for those who rely on Him and that He will fulfill His divine purpose.",
    relatedVerses: ["8:2", "14:11", "39:36"],
    relatedHadith: [101],
  },
]

// Search function for the database
export function searchIslamicContent(
  query: string,
  searchType: "all" | "hadith" | "quran" = "all",
  collections: string[] = [],
  grades: string[] = [],
): (HadithRecord | QuranRecord)[] {
  const allContent: (HadithRecord | QuranRecord)[] = [...hadithDatabase, ...quranDatabase]

  const queryLower = query.toLowerCase()

  return allContent
    .filter((item) => {
      // Filter by type
      if (searchType !== "all" && item.type !== searchType) return false

      // Filter by collections (for hadith only)
      if (item.type === "hadith" && collections.length > 0) {
        const hadith = item as HadithRecord
        if (!collections.includes(hadith.collection)) return false
      }

      // Filter by grades (for hadith only)
      if (item.type === "hadith" && grades.length > 0) {
        const hadith = item as HadithRecord
        if (!grades.includes(hadith.grade.toLowerCase())) return false
      }

      // Search in text content
      const searchableText = [item.text, item.arabicText, ...item.topic, ...item.keywords, item.commentary]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(queryLower)
    })
    .map((item) => ({
      ...item,
      relevanceScore: calculateRelevanceScore(item, queryLower),
    }))
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 10) // Limit to top 10 results
}

function calculateRelevanceScore(item: HadithRecord | QuranRecord, query: string): number {
  let score = 0

  // Exact matches in text get highest score
  if (item.text.toLowerCase().includes(query)) score += 50
  if (item.arabicText.includes(query)) score += 40

  // Topic matches
  item.topic.forEach((topic) => {
    if (topic.toLowerCase().includes(query)) score += 30
  })

  // Keyword matches
  item.keywords.forEach((keyword) => {
    if (keyword.toLowerCase().includes(query)) score += 20
  })

  // Commentary matches
  if (item.commentary.toLowerCase().includes(query)) score += 10

  // Boost for higher quality sources
  if (item.type === "hadith") {
    const hadith = item as HadithRecord
    if (hadith.grade === "Sahih") score += 15
    else if (hadith.grade === "Hasan") score += 10

    if (hadith.collection === "bukhari" || hadith.collection === "muslim") score += 10
  }

  return Math.min(score, 100) // Cap at 100%
}

// Get detailed information about a specific hadith or verse
export function getContentById(id: number): (HadithRecord | QuranRecord) | null {
  const allContent = [...hadithDatabase, ...quranDatabase]
  return allContent.find((item) => item.id === id) || null
}

// Get narrator information
export function getNarratorInfo(narratorId: string): Narrator | null {
  return narratorsDatabase[narratorId] || null
}

// Get related content
export function getRelatedContent(id: number): (HadithRecord | QuranRecord)[] {
  const item = getContentById(id)
  if (!item) return []

  const relatedIds = [
    ...(item.type === "hadith" ? (item as HadithRecord).relatedHadith : []),
    ...(item.relatedHadith || []),
  ]

  return relatedIds.map((relatedId) => getContentById(relatedId)).filter(Boolean) as (HadithRecord | QuranRecord)[]
}
