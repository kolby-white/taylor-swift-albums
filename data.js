const IMG = "https://www.arcgis.com/sharing/rest/content/items/54e18ec7155e4b33b04445be6986c460/resources/";
const W = "https://en.wikipedia.org/wiki/";

const ALBUMS = [
  { id: "debut", title: "Taylor Swift", year: 2006, date: "October 24, 2006", label: "Big Machine", genre: "Country",
    color: "#3f8f7f", covers: [["https://people.com/thmb/nVwo2fLCElGt9d4Mj7tX1kiidac=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/taylor-swift-albums-1-93026ca98408417097660e117a10a6a9.jpg", "Taylor Swift (2006)"]],
    tracks: ["Tim McGraw", "Teardrops on My Guitar", "Our Song"],
    brief: "Released when Swift was 16. It introduced the diary-like, detail-heavy songwriting that every later album builds on, and made her a country radio star.",
    note: "Never re-recorded. Swift bought back the original masters in 2025.",
    quote: "Taylor Swift is the debut studio album by the American singer-songwriter Taylor Swift. It was released in North America on October 24, 2006, and reissued multiple times between 2007 and 2008 by Big Machine Records. Inspired by Swift's teenage perspective on life, the lyrics explore themes of love, friendship, and insecurity.",
    wiki: "Taylor_Swift_(album)" },
  { id: "fearless", title: "Fearless", year: 2008, date: "November 11, 2008", label: "Big Machine", genre: "Country pop",
    color: "#b8901c", covers: [[IMG + "URsDxcZA15LilTMgIa3yY.jpg", "Fearless (2008)"], [IMG + "dc7451c9-43b9-4ae0-a7e5-aa62ea46061b.jpeg", "Fearless (Taylor's Version), 2021"]],
    tracks: ["Love Story", "You Belong with Me", "Fifteen"],
    brief: "The crossover. \"Love Story\" and \"You Belong with Me\" took country storytelling to pop radio, and the album won Album of the Year, making Swift, at 20, the youngest winner at the time.",
    grammy: "Album of the Year, 2010", tv: "April 9, 2021",
    quote: "Fearless is the second studio album by the American singer-songwriter Taylor Swift. It was released in North America on November 11, 2008, by Big Machine Records. Inspired by Swift's teenage perspectives, Fearless explores love and life using fairy tale-inspired lyrical imagery.",
    wiki: "Fearless_(Taylor_Swift_album)" },
  { id: "speaknow", title: "Speak Now", year: 2010, date: "October 25, 2010", label: "Big Machine", genre: "Country pop",
    color: "#7b4ea3", covers: [[IMG + "6oB2snw1Hhy9-iUDJqfnU.png", "Speak Now (2010)"], [IMG + "4ba6cea9-638d-4a70-8400-4fdbabbaf1b5.jpeg", "Speak Now (Taylor's Version), 2023"]],
    tracks: ["Mine", "Back to December", "Mean"],
    brief: "Written with no co-writers at all, an answer to critics who doubted she wrote her own songs. It is a theatrical, guitar-driven record about growing up in public.",
    tv: "July 7, 2023",
    quote: "Speak Now is the third studio album by the American singer-songwriter Taylor Swift. It was released on October 25, 2010, through Big Machine Records. Swift wrote the album entirely herself while touring in 2009–2010 to reflect on her transition from adolescence to adulthood.",
    wiki: "Speak_Now" },
  { id: "red", title: "Red", year: 2012, date: "October 22, 2012", label: "Big Machine", genre: "Pop / country",
    color: "#b3202a", covers: [[IMG + "q9JoayyJaYkARuOLB0LNI.png", "Red (2012)"], [IMG + "fwc9w2cYDPGwr4hpU6z2u.png", "Red (Taylor's Version), 2021"]],
    tracks: ["All Too Well", "I Knew You Were Trouble", "We Are Never Ever Getting Back Together"],
    brief: "A breakup album that puts banjo next to dubstep, pointing toward pop. The re-recording's ten-minute \"All Too Well\" became the longest song ever to reach No. 1 on the Billboard Hot 100.",
    tv: "November 12, 2021",
    quote: "Red is the fourth studio album by the American singer-songwriter Taylor Swift. It was released on October 22, 2012, through Big Machine Records. Inspired by a breakup that left behind emotional tumult, Swift framed Red as a breakup album that chronicles the aftermath of a failed relationship.",
    wiki: "Red_(Taylor_Swift_album)" },
  { id: "1989", title: "1989", year: 2014, date: "October 27, 2014", label: "Big Machine", genre: "Synth-pop",
    color: "#4f93b8", covers: [[IMG + "8riL0GKlIKFGnNULXujsM.png", "1989 (2014)"], [IMG + "u3DiAsZqzL6-cxTfRs1_U.png", "1989 (Taylor's Version), 2023"]],
    tracks: ["Shake It Off", "Blank Space", "Style"],
    brief: "Her first official pop album, named after the year she was born and released the year she moved to New York. It made her a global pop star and won a second Album of the Year.",
    grammy: "Album of the Year, 2016", tv: "October 27, 2023",
    quote: "1989 is the fifth studio album by the American singer-songwriter Taylor Swift. It was released on October 27, 2014, through Big Machine Records. Titled after Swift's birth year as a symbolic rebirth, the album recalibrated her artistic identity from country music to pop.",
    wiki: "1989_(album)" },
  { id: "reputation", title: "Reputation", styled: "reputation", year: 2017, date: "November 10, 2017", label: "Big Machine", genre: "Electropop",
    color: "#555555", covers: [[IMG + "UEZUotVguqZUNJ6ySgqFX.jpg", "Reputation (2017)"]],
    tracks: ["Look What You Made Me Do", "Delicate", "Getaway Car"],
    brief: "A darker, heavier record that answers the media backlash of 2016. Swift gave almost no interviews to promote it and let the album speak for itself.",
    note: "Never re-recorded. Swift bought back the original masters in 2025.",
    quote: "Reputation (stylized in all lowercase) is the sixth studio album by the American singer-songwriter Taylor Swift. It was released on November 10, 2017, through Big Machine Records. She conceived the album during a hiatus in 2016–2017, amidst the controversies that blemished her once-wholesome public image.",
    wiki: "Reputation_(album)" },
  { id: "lover", title: "Lover", year: 2019, date: "August 23, 2019", label: "Republic", genre: "Pop",
    color: "#d9709a", covers: [[IMG + "6d84b543-7747-4488-aa8e-7c646b9342e0.jpeg", "Lover (2019)"]],
    tracks: ["Cruel Summer", "Lover", "The Archer"],
    brief: "Her first album on Republic Records and the first whose masters she owned from day one. \"Cruel Summer\" went to No. 1 in 2023, four years after release, after it became a highlight of the Eras Tour.",
    quote: "Lover is the seventh studio album by the American singer-songwriter Taylor Swift. It was released on August 23, 2019, through Republic Records. The album is her first after she departed from Big Machine Records, which caused a public dispute over the ownership of Swift's past albums.",
    wiki: "Lover_(album)" },
  { id: "folklore", title: "Folklore", styled: "folklore", year: 2020, date: "July 24, 2020", label: "Republic", genre: "Indie folk",
    color: "#8a8a8a", covers: [[IMG + "9de2a7b2-5dae-445c-8182-845b11ac5c46.jpeg", "Folklore (2020)"]],
    tracks: ["cardigan", "exile", "the last great american dynasty"],
    brief: "Made during lockdown with collaborators she worked with over the internet. Fictional characters and storytelling replaced autobiography, and the album won her third Album of the Year.",
    grammy: "Album of the Year, 2021",
    quote: "Folklore (stylized in all lowercase) is the eighth studio album by the American singer-songwriter Taylor Swift. It was surprise-released on July 24, 2020, through Republic Records. Conceived during quarantine in early 2020, amidst the COVID-19 pandemic, the album explores themes of escapism, nostalgia, and romanticism. Swift recorded her vocals in her Los Angeles home studio and worked virtually with the producers Aaron Dessner and Jack Antonoff, who operated from their studios in the Hudson Valley and New York City.",
    wiki: "Folklore_(Taylor_Swift_album)" },
  { id: "evermore", title: "Evermore", styled: "evermore", year: 2020, date: "December 11, 2020", label: "Republic", genre: "Indie folk / alternative",
    color: "#a0613a", covers: [[IMG + "0e466e9b-f8e6-4339-aca4-8f9e0d25230c.jpeg", "Evermore (2020)"]],
    tracks: ["willow", "champagne problems", "'tis the damn season"],
    brief: "The \"sister record\" to folklore, surprise-released less than five months later. It is looser and more experimental, and was mostly recorded with Aaron Dessner in the Hudson Valley.",
    quote: "Evermore (stylized in all lowercase) is the ninth studio album by the American singer-songwriter Taylor Swift. It was surprise-released on December 11, 2020, through Republic Records. Swift conceived Evermore as a \"sister record\" to its predecessor, Folklore, which had been released in July. She recorded Evermore mainly with Aaron Dessner at his Long Pond Studio in the Hudson Valley.",
    wiki: "Evermore_(album)" },
  { id: "midnights", title: "Midnights", year: 2022, date: "October 21, 2022", label: "Republic", genre: "Synth-pop",
    color: "#3a4f8f", covers: [[IMG + "Bk8K1bl9VNccZ3SIhbGEs.jpg", "Midnights (2022)"]],
    tracks: ["Anti-Hero", "Lavender Haze", "Karma"],
    brief: "Thirteen songs about sleepless nights. \"Anti-Hero\" topped the Hot 100, and the album gave Swift a record fourth Album of the Year.",
    grammy: "Album of the Year, 2024",
    quote: "Midnights is the tenth studio album by the American singer-songwriter Taylor Swift. It was released on October 21, 2022, through Republic Records. A concept album about nocturnal ruminations, it contains confessional songs that explore regret, self-criticism, fantasies, heartbreak, and infatuation. The lyrical details allude to Swift's personal life and fame.",
    wiki: "Midnights" },
  { id: "ttpd", title: "The Tortured Poets Department", year: 2024, date: "April 19, 2024", label: "Republic", genre: "Synth-pop",
    color: "#7d7466", covers: [[IMG + "jNtWgACsMNSyRIJ8h3RJJ.jpg", "The Tortured Poets Department (2024)"]],
    tracks: ["Fortnight (feat. Post Malone)", "I Can Do It with a Broken Heart", "So Long, London"],
    brief: "Written largely while the Eras Tour was on the road. Two hours after release, Swift surprise-released a 31-track double album, The Anthology.",
    quote: "The Tortured Poets Department (stylized in all caps) is the eleventh studio album by the American singer-songwriter Taylor Swift. It was released on April 19, 2024, through Republic Records, followed two hours later by the surprise release of a double-album edition subtitled The Anthology. Swift wrote and produced the album with Jack Antonoff and Aaron Dessner over a two-year period, including during the Eras Tour in 2023.",
    wiki: "The_Tortured_Poets_Department" },
  { id: "showgirl", title: "The Life of a Showgirl", year: 2025, date: "October 3, 2025", label: "Republic", genre: "Pop",
    color: "#d2662a", covers: [[IMG + "3acdcfea-2577-420c-b8a1-74a0833470e8.jpeg", "The Life of a Showgirl (2025)"]],
    tracks: ["The Fate of Ophelia"],
    brief: "A bright pop record made with Max Martin and Shellback, recorded in Sweden in breaks between European tour dates. A deluxe edition, The Encore, followed in 2026.",
    quote: "The Life of a Showgirl is the twelfth studio album by the American singer-songwriter Taylor Swift. It was released on October 3, 2025, through Republic Records. Swift wrote and produced the album with Max Martin and Shellback, recording it in Sweden during the European leg of the Eras Tour in 2024. Inspired by the tour and her romantic relationship with the American football player Travis Kelce, she conceived The Life of a Showgirl as a vibrant and lively album reflecting her state of mind at the time.",
    wiki: "The_Life_of_a_Showgirl" }
];

// Places connected to the albums. Coordinates are approximate (town or neighbourhood level).
const PLACES = [
  { name: "West Reading & Berks County, Pennsylvania", ll: [40.336, -75.947], album: "debut",
    text: "Swift was born in West Reading in December 1989 and spent her early childhood on a Christmas tree farm nearby, which she later wrote about in \"Christmas Tree Farm\" (2019)." },
  { name: "Hendersonville, Tennessee", ll: [36.304, -86.620], album: "debut",
    text: "Her family moved here when she was 14 so she could pursue country music. She wrote songs for her debut while at high school here, including \"Our Song\" for a school talent show." },
  { name: "Music Row, Nashville", ll: [36.149, -86.793], album: "debut",
    text: "She signed a songwriting deal on Music Row as a teenager, then signed with Scott Borchetta's new label, Big Machine Records, in 2005. Big Machine released her first six albums." },
  { name: "New York City", ll: [40.731, -74.002], album: "1989",
    text: "Swift moved to Manhattan in 2014, which inspired 1989's opening track \"Welcome to New York\". The West Village street she once rented on gave Lover its song \"Cornelia Street\"." },
  { name: "Watch Hill, Rhode Island", ll: [41.310, -71.857], album: "folklore",
    text: "Swift bought the seaside \"Holiday House\" in 2013. Folklore's \"the last great american dynasty\" tells the story of its earlier owner, Rebekah Harkness." },
  { name: "Los Angeles", ll: [34.073, -118.400], album: "folklore",
    text: "During the 2020 lockdown, Swift recorded her vocals for folklore in her home studio here and sent files back and forth with her producers." },
  { name: "Long Pond Studio, Hudson Valley, New York", ll: [42.25, -73.79], album: "evermore",
    text: "Aaron Dessner's studio, a converted barn, is where most of evermore was recorded and where the Folklore: The Long Pond Studio Sessions film was made. Location approximate." },
  { name: "Kansas City, Missouri", ll: [39.049, -94.484], album: "showgirl",
    text: "Home of the Chiefs and Travis Kelce. Swift's relationship with Kelce was one of the stated inspirations for The Life of a Showgirl. She also played two Eras Tour shows at Arrowhead Stadium." },
  { name: "Sweden", ll: [59.33, 18.07], album: "showgirl",
    text: "Swift recorded The Life of a Showgirl in Sweden with Max Martin and Shellback during the European leg of the Eras Tour in 2024. Pin placed at Stockholm." }
];

// Eras Tour cities in show order: [city, country, lat, lng, shows, leg]
const LEGS = {
  na23: { name: "North America 2023", color: "#d9709a" },
  la23: { name: "Latin America 2023", color: "#b8901c" },
  ap24: { name: "Asia-Pacific 2024", color: "#3f8f7f" },
  eu24: { name: "Europe 2024", color: "#4f93b8" },
  na24: { name: "North America 2024", color: "#7b4ea3" }
};
const TOUR = [
  ["Glendale", "United States", 33.527, -112.263, 2, "na23"],
  ["Las Vegas", "United States", 36.091, -115.184, 2, "na23"],
  ["Arlington", "United States", 32.748, -97.093, 3, "na23"],
  ["Tampa", "United States", 27.976, -82.503, 3, "na23"],
  ["Houston", "United States", 29.685, -95.411, 3, "na23"],
  ["Atlanta", "United States", 33.755, -84.401, 3, "na23"],
  ["Nashville", "United States", 36.166, -86.771, 3, "na23"],
  ["Philadelphia", "United States", 39.901, -75.168, 3, "na23"],
  ["Foxborough", "United States", 42.091, -71.264, 3, "na23"],
  ["East Rutherford", "United States", 40.813, -74.074, 3, "na23"],
  ["Chicago", "United States", 41.862, -87.617, 3, "na23"],
  ["Detroit", "United States", 42.340, -83.046, 2, "na23"],
  ["Pittsburgh", "United States", 40.447, -80.016, 2, "na23"],
  ["Minneapolis", "United States", 44.974, -93.258, 2, "na23"],
  ["Cincinnati", "United States", 39.095, -84.516, 2, "na23"],
  ["Kansas City", "United States", 39.049, -94.484, 2, "na23"],
  ["Denver", "United States", 39.744, -105.020, 2, "na23"],
  ["Seattle", "United States", 47.595, -122.332, 2, "na23"],
  ["Santa Clara", "United States", 37.403, -121.970, 2, "na23"],
  ["Los Angeles", "United States", 33.953, -118.339, 6, "na23"],
  ["Mexico City", "Mexico", 19.404, -99.090, 4, "la23"],
  ["Buenos Aires", "Argentina", -34.545, -58.450, 3, "la23"],
  ["Rio de Janeiro", "Brazil", -22.893, -43.292, 3, "la23"],
  ["São Paulo", "Brazil", -23.527, -46.678, 3, "la23"],
  ["Tokyo", "Japan", 35.706, 139.752, 4, "ap24"],
  ["Melbourne", "Australia", -37.820, 144.983, 3, "ap24"],
  ["Sydney", "Australia", -33.847, 151.063, 4, "ap24"],
  ["Singapore", "Singapore", 1.304, 103.875, 6, "ap24"],
  ["Paris", "France", 48.896, 2.229, 4, "eu24"],
  ["Stockholm", "Sweden", 59.372, 18.000, 3, "eu24"],
  ["Lisbon", "Portugal", 38.753, -9.185, 2, "eu24"],
  ["Madrid", "Spain", 40.453, -3.688, 2, "eu24"],
  ["Lyon", "France", 45.765, 4.982, 2, "eu24"],
  ["Edinburgh", "United Kingdom", 55.942, -3.241, 3, "eu24"],
  ["Liverpool", "United Kingdom", 53.431, -2.961, 3, "eu24"],
  ["Cardiff", "United Kingdom", 51.478, -3.183, 1, "eu24"],
  ["London", "United Kingdom", 51.556, -0.280, 8, "eu24"],
  ["Dublin", "Ireland", 53.335, -6.228, 3, "eu24"],
  ["Amsterdam", "Netherlands", 52.314, 4.942, 3, "eu24"],
  ["Zürich", "Switzerland", 47.411, 8.504, 2, "eu24"],
  ["Milan", "Italy", 45.478, 9.124, 2, "eu24"],
  ["Gelsenkirchen", "Germany", 51.555, 7.068, 3, "eu24"],
  ["Hamburg", "Germany", 53.587, 9.899, 2, "eu24"],
  ["Munich", "Germany", 48.219, 11.625, 2, "eu24"],
  ["Warsaw", "Poland", 52.240, 21.046, 3, "eu24"],
  ["Miami", "United States", 25.958, -80.239, 3, "na24"],
  ["New Orleans", "United States", 29.951, -90.081, 3, "na24"],
  ["Indianapolis", "United States", 39.760, -86.164, 3, "na24"],
  ["Toronto", "Canada", 43.641, -79.389, 6, "na24"],
  ["Vancouver", "Canada", 49.277, -123.112, 3, "na24"]
];
const CANCELLED = [["Vienna", "Austria", 48.207, 16.420, 3]];
const WIKI = W;

/* ---------- Evolution: editorial ratings ----------
   Order of values follows ALBUMS: debut, fearless, speaknow, red, 1989, reputation,
   lover, folklore, evermore, midnights, ttpd, showgirl. */
const GENRES = [
  { name: "Country", v: [3, 3, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    ex: { debut: "Tim McGraw", fearless: "Fifteen", speaknow: "Mean", red: "Begin Again", lover: "Soon You'll Get Better (feat. The Chicks)", evermore: "no body, no crime (feat. Haim)" } },
  { name: "Pop", v: [1, 2, 2, 3, 3, 3, 3, 1, 1, 3, 2, 3],
    ex: { fearless: "You Belong with Me", speaknow: "Mine", red: "22", "1989": "Shake It Off", reputation: "Delicate", lover: "Lover", midnights: "Anti-Hero", ttpd: "Fortnight", showgirl: "The Fate of Ophelia" } },
  { name: "Rock / pop-rock", v: [0, 1, 2, 2, 0, 0, 1, 0, 0, 0, 0, 1],
    ex: { fearless: "Change", speaknow: "Better than Revenge", red: "State of Grace", lover: "Paper Rings" } },
  { name: "Electronic / synth", v: [0, 0, 0, 2, 3, 3, 2, 0, 0, 3, 2, 1],
    ex: { red: "I Knew You Were Trouble", "1989": "Style", reputation: "...Ready for It?", lover: "Cruel Summer", midnights: "Lavender Haze", ttpd: "Down Bad" } },
  { name: "Folk / indie / alternative", v: [0, 0, 0, 1, 0, 0, 0, 3, 3, 1, 2, 0],
    ex: { folklore: "cardigan", evermore: "willow", midnights: "Would've, Could've, Should've", ttpd: "The Tortured Poets Department" } }
];
const LEVELS = ["Absent", "A touch", "Significant", "Primary sound"];

const THEMES = [
  { name: "Romance", v: [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2], ex: { debut: "Our Song", fearless: "Love Story", "1989": "Wildest Dreams", reputation: "Call It What You Want", lover: "Lover", showgirl: "Wood" } },
  { name: "Heartbreak", v: [2, 2, 2, 2, 1, 0, 1, 2, 2, 1, 2, 0], ex: { debut: "Teardrops on My Guitar", red: "All Too Well", folklore: "exile", evermore: "champagne problems", ttpd: "So Long, London" } },
  { name: "Growing up", v: [2, 2, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0], ex: { debut: "The Outside", fearless: "Fifteen", speaknow: "Never Grow Up", folklore: "seven" } },
  { name: "Fame and image", v: [0, 0, 1, 0, 2, 2, 1, 0, 0, 2, 2, 2], ex: { speaknow: "Mean", "1989": "Blank Space", reputation: "Look What You Made Me Do", lover: "The Man", midnights: "Anti-Hero", ttpd: "Who's Afraid of Little Old Me?", showgirl: "The Life of a Showgirl" } },
  { name: "Fiction and characters", v: [0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1], ex: { fearless: "Love Story", folklore: "betty", evermore: "dorothea", showgirl: "The Fate of Ophelia" } },
  { name: "Self-reflection", v: [1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1], ex: { speaknow: "Innocent", midnights: "Anti-Hero", ttpd: "I Can Do It with a Broken Heart" } },
  { name: "Nostalgia and memory", v: [1, 1, 1, 2, 1, 0, 1, 2, 2, 1, 1, 0], ex: { red: "All Too Well", folklore: "seven", evermore: "'tis the damn season" } }
];
const THEME_LEVELS = ["Not a focus", "Present", "Central"];

const PHASES = [
  { years: "2006–2010", name: "The diarist", albums: "Taylor Swift · Fearless · Speak Now",
    pov: "First person, autobiographical, about high school, first love and small-town life.",
    who: "Often co-written with Liz Rose, though Speak Now was written entirely alone. Produced with Nathan Chapman.",
    craft: "Narrative verses that build to a big chorus, named people and places, and fairy-tale imagery such as Romeo and Juliet in \"Love Story\"." },
  { years: "2012–2017", name: "The pop architect", albums: "Red · 1989 · Reputation",
    pov: "Still first person, but more knowing. She writes about her own public image and turns it into satire.",
    who: "Max Martin and Shellback for hooks, and Jack Antonoff, who has worked with her ever since.",
    craft: "Shorter lines, chantable hooks and a sharper sense of humor. \"Blank Space\" plays the tabloid version of herself." },
  { years: "2019–2020", name: "The storyteller", albums: "Lover · Folklore · Evermore",
    pov: "From open-hearted autobiography on Lover to invented characters and third-person narration on Folklore and Evermore.",
    who: "Joel Little and Antonoff on Lover; Aaron Dessner and Antonoff, working remotely, on the sister albums.",
    craft: "Linked songs, like the teenage love triangle told across \"cardigan\", \"august\" and \"betty\". There are fewer choruses and more literary language." },
  { years: "2022–2025", name: "The confessor", albums: "Midnights · The Tortured Poets Department · The Life of a Showgirl",
    pov: "Back to first person, at her most self-critical (\"It's me, hi, I'm the problem, it's me\") and most explicitly about fame.",
    who: "Antonoff and Dessner, then a return to Max Martin and Shellback for Showgirl.",
    craft: "Dense, wordy verses and literary allusion on TTPD, then tighter, theatrical pop on Showgirl." }
];

/* ---------- Album statistics ----------
   Sources: each album's Wikipedia article (length, Metacritic, first week, weeks at No. 1),
   Wikipedia "Taylor Swift albums discography" (chart peaks, US sales, RIAA), and Wikipedia's
   "List of Billboard 200 number-one albums" pages for Lover, Folklore and Evermore first-week units.
   Retrieved November 2026. Order follows ALBUMS. */
const CHARTS = ["US", "AUS", "CAN", "DEN", "IRE", "NZ", "NOR", "SPA", "SWE", "UK"];
const STATS = {
  debut:      { tracks: 11, len: "40:28", mc: 67, fw: 40000,   wk: 0,  sales: 5871000, riaa: 8,  peaks: [5, 33, 14, null, 59, 38, null, null, null, 81] },
  fearless:   { tracks: 13, len: "53:26", mc: 73, fw: 592000,  wk: 11, sales: 7286000, riaa: 11, peaks: [1, 2, 1, 23, 7, 1, 5, 28, 12, 5] },
  speaknow:   { tracks: 14, len: "67:28", mc: 77, fw: 1047000, wk: 6,  sales: 4817000, riaa: 6,  peaks: [1, 1, 1, 26, 6, 1, 4, 10, 18, 6] },
  red:        { tracks: 16, len: "65:09", mc: 77, fw: 1208000, wk: 7,  sales: 4582000, riaa: 8,  peaks: [1, 1, 1, 3, 1, 1, 2, 4, 8, 1] },
  "1989":     { tracks: 13, len: "48:41", mc: 76, fw: 1287000, wk: 11, sales: 6472000, riaa: 14, peaks: [1, 1, 1, 2, 1, 1, 1, 4, 17, 1] },
  reputation: { tracks: 15, len: "55:45", mc: 71, fw: 1238000, wk: 4,  sales: 2478000, riaa: 7,  peaks: [1, 1, 1, 3, 1, 1, 1, 3, 2, 1] },
  lover:      { tracks: 18, len: "61:48", mc: 79, fw: 867000,  wk: 1,  sales: 2317000, riaa: 7,  peaks: [1, 1, 1, 3, 1, 1, 1, 1, 1, 1] },
  folklore:   { tracks: 16, len: "63:29", mc: 88, fw: 846000,  wk: 8,  sales: 2289000, riaa: 6,  peaks: [1, 1, 1, 1, 1, 1, 1, 2, 3, 1] },
  evermore:   { tracks: 15, len: "60:38", mc: 85, fw: 329000,  wk: 4,  sales: 913000,  riaa: 4,  peaks: [1, 1, 1, 2, 2, 1, 3, 11, 3, 1] },
  midnights:  { tracks: 13, len: "44:02", mc: 85, fw: 1578000, wk: 6,  sales: 2814000, riaa: 7,  peaks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  ttpd:       { tracks: 16, len: "65:08", mc: 76, fw: 2610000, wk: 17, sales: 3491000, riaa: 8,  peaks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  showgirl:   { tracks: 12, len: "41:40", mc: 69, fw: 4002000, wk: 15, sales: 3985000, riaa: 5,  peaks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }
};
// derived values
Object.values(STATS).forEach((s) => {
  const [m, sec] = s.len.split(":").map(Number);
  s.mins = m + sec / 60;
  s.n1 = s.peaks.filter((p) => p === 1).length;
  s.perTrack = s.mins / s.tracks;
});
const METRICS = [
  { key: "fw", name: "First-week US units", short: "First week", fmt: "units", hi: true,
    note: "Album-equivalent units in the first tracking week (Billboard). Figures before 2014 are pure sales." },
  { key: "wk", name: "Weeks at No. 1 (Billboard 200)", short: "Weeks at No. 1", fmt: "int", hi: true,
    note: "Total weeks at the top of the US Billboard 200, consecutive or not. The debut album peaked at No. 5." },
  { key: "sales", name: "US pure sales", short: "US sales", fmt: "units", hi: true,
    note: "Copies sold, excluding streams. Older albums have had longer to accumulate; dates of the figures vary." },
  { key: "riaa", name: "RIAA certification", short: "RIAA", fmt: "plat", hi: true,
    note: "Multi-platinum level in the US. 10× is Diamond." },
  { key: "n1", name: "No. 1s across 10 national charts", short: "No. 1 charts", fmt: "of10", hi: true,
    note: "How many of these charts the album topped: US, Australia, Canada, Denmark, Ireland, New Zealand, Norway, Spain, Sweden, UK." },
  { key: "mc", name: "Metacritic score", short: "Metacritic", fmt: "score", hi: true,
    note: "Weighted average of professional reviews, out of 100. Standard edition at release." },
  { key: "mins", name: "Running time", short: "Length", fmt: "time", hi: null,
    note: "Standard edition, in minutes. Deluxe editions and The Anthology are longer." },
  { key: "tracks", name: "Track count", short: "Tracks", fmt: "int", hi: null,
    note: "Standard edition." },
  { key: "perTrack", name: "Average song length", short: "Avg. song", fmt: "time", hi: null,
    note: "Running time divided by track count, standard edition." }
];
