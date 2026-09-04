// ExplorerIQ Destination Travel Data Engine
// Covers 8 premier tourist destinations with 5 category filters

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Highlights', icon: 'Sparkles', color: '#0EA5E9' },
  { id: 'heritage', label: 'History & Heritage', icon: 'Landmark', color: '#8B5CF6' },
  { id: 'temples', label: 'Temples & Spiritual Sites', icon: 'Flame', color: '#F59E0B' },
  { id: 'food', label: 'Local Food & Famous Eateries', icon: 'Utensils', color: '#EF4444' },
  { id: 'museums', label: 'Museums & Cultural Galleries', icon: 'Image', color: '#EC4899' },
  { id: 'scenic', label: 'Parks & Scenic Spots', icon: 'Trees', color: '#10B981' }
];

export const CITIES_DATA = [
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    coordinates: [27.1767, 78.0081],
    tagline: 'Imperial Mughal capital home to the eternal jewel of white marble.',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to March (12°C - 24°C)',
    climate: 'Semi-arid with cool pleasant winters and hot summers',
    overview: 'Perched on the banks of the sacred Yamuna River, Agra was the golden seat of the Mughal Empire under Emperors Akbar, Jahangir, and Shah Jahan. Renowned globally for the sublime Taj Mahal, the imposing red sandstone ramparts of Agra Fort, and the deserted utopian ghost city of Fatehpur Sikri.',
    localFoodSpecialties: [
      { name: 'Agra Petha', desc: 'Candied ash gourd translucent sweet in flavors like Angoori, Kesar, and Paan.', place: 'Panchi Petha, Sadar Bazaar' },
      { name: 'Bedai & Jalebi', desc: 'Crispy lentil-stuffed fried bread with spicy potato curry and piping hot jalebi.', place: 'Deviram Sweets, Pratap Pura' },
      { name: 'Mughlai Gosht & Paratha', desc: 'Aromatic saffron slow-simmered rich curries with layered tandoori bread.', place: 'Pinch of Spice, Fatehabad Road' }
    ],
    places: [
      {
        id: 'agra-taj',
        name: 'The Taj Mahal',
        category: 'heritage',
        coordinates: [27.1751, 78.0421],
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
        timing: 'Sunrise to Sunset (Closed on Fridays)',
        fee: '₹50 (Indians) / ₹1,100 (Foreigners)',
        shortDesc: 'UNESCO World Heritage ivory-white marble mausoleum commissioned in 1632 by Shah Jahan for Mumtaz Mahal.',
        tip: 'Visit at dawn via the East Gate for golden light reflection and minimal crowds.'
      },
      {
        id: 'agra-fort',
        name: 'Agra Fort (Lal Qila)',
        category: 'heritage',
        coordinates: [27.1795, 78.0211],
        image: 'https://images.unsplash.com/photo-1592635196078-9ffc7f113782?auto=format&fit=crop&w=800&q=80',
        timing: '6:00 AM - 6:00 PM Daily',
        fee: '₹50 (Indians) / ₹650 (Foreigners)',
        shortDesc: 'Vast 16th-century red sandstone fortress residence where Shah Jahan spent his final years gazing at the Taj.',
        tip: 'Look through the marble jali screen at the Musamman Burj tower for a framed Taj view.'
      },
      {
        id: 'agra-fatehpur',
        name: 'Fatehpur Sikri',
        category: 'heritage',
        coordinates: [27.0945, 77.6679],
        image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80',
        timing: '6:00 AM - 6:30 PM',
        fee: '₹50 (Indians) / ₹610 (Foreigners)',
        shortDesc: 'Preserved red sandstone Mughal capital built by Akbar, featuring the towering 54-meter Buland Darwaza.',
        tip: 'Hire an official ASI licensed guide at the gate to decode Akbar’s interfaith hall of discussions.'
      },
      {
        id: 'agra-mankameshwar',
        name: 'Mankameshwar Shiva Temple',
        category: 'temples',
        coordinates: [27.1852, 78.0146],
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        timing: '5:00 AM - 10:00 PM',
        fee: 'Free Entry',
        shortDesc: 'Ancient Shiva temple nestled near Rawatpara, where Lord Shiva is believed to have rested in the Dvapara Yuga.',
        tip: 'No leather items or belts permitted inside sanctum.'
      },
      {
        id: 'agra-taj-museum',
        name: 'Taj Museum & Western Gumbad',
        category: 'museums',
        coordinates: [27.1748, 78.0410],
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        timing: '10:00 AM - 5:00 PM (Fridays Closed)',
        fee: 'Included with Taj ticket',
        shortDesc: 'Exhibits 17th-century Mughal coins, architectural blue-prints, and celadon dishes that cracked if touched by poison.',
        tip: 'Great air-conditioned historical refuge during sunny afternoons.'
      },
      {
        id: 'agra-panchi-petha',
        name: 'Panchi Petha Street Bazaar',
        category: 'food',
        coordinates: [27.1830, 78.0120],
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        timing: '9:00 AM - 11:00 PM',
        fee: '₹150 - ₹400 per kg',
        shortDesc: 'Historic confectioners preparing fresh translucent ash-gourd petha cooked in copper vats since 1950.',
        tip: 'Buy Angoori Petha (juicy cubes) and Kesar Petha for authentic local taste.'
      },
      {
        id: 'agra-mehtab-bagh',
        name: 'Mehtab Bagh (Moonlight Garden)',
        category: 'scenic',
        coordinates: [27.1800, 78.0425],
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
        timing: '6:00 AM - 6:00 PM',
        fee: '₹25 (Indians) / ₹300 (Foreigners)',
        shortDesc: 'Charbagh complex across the river offering the quintessential mirror reflection of the Taj Mahal at sunset.',
        tip: 'Best spot for photographers avoiding Taj Mahal tripod restrictions.'
      }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    coordinates: [26.9124, 75.7873],
    tagline: 'The vibrant Pink City of royal Rajput palaces, astronomical sundials, and hilltop ramparts.',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to March (10°C - 26°C)',
    climate: 'Desert climate with sunny winters and energetic festivals',
    overview: 'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India’s first planned city designed along Vastu Shastra principles. Terracotta pink facades, imperial amber hilltop bastions, celestial stone instruments, and bustling handicraft bazaars make it a crown jewel of world tourism.',
    localFoodSpecialties: [
      { name: 'Pyaaz Kachori', desc: 'Flaky deep-fried pastry bursting with spiced caramelized onion and garlic chutney.', place: 'Rawat Mishthan Bhandar, Station Road' },
      { name: 'Dal Baati Churma', desc: 'Baked wheat balls dipped in pure desi ghee served with spicy five-lentil curry and sweet jaggery crumbs.', place: 'Laxmi Mishthan Bhandar (LMB), Johari Bazaar' },
      { name: 'Ghewar', desc: 'Disc-shaped honeycomb sweet soaked in saffron sugar syrup topped with thick rabdi and silver vark.', place: 'Sambhar Fini, Ghewar Gully' }
    ],
    places: [
      {
        id: 'jaipur-hawa-mahal',
        name: 'Hawa Mahal (Palace of Winds)',
        category: 'heritage',
        coordinates: [26.9239, 75.8267],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        timing: '9:00 AM - 5:00 PM',
        fee: '₹50 (Indians) / ₹200 (Foreigners)',
        shortDesc: 'Crown-shaped 5-story pink sandstone honeycomb with 953 jharokhas built for royal ladies to view street processions.',
        tip: 'Head to Wind View Cafe directly across the street on the second floor for the iconic postcard photo.'
      },
      {
        id: 'jaipur-amber-fort',
        name: 'Amer (Amber) Fort & Palace',
        category: 'heritage',
        coordinates: [26.9855, 75.8513],
        image: 'https://images.unsplash.com/photo-1603819003835-346ba544577f?auto=format&fit=crop&w=800&q=80',
        timing: '8:00 AM - 5:30 PM & Night Sound & Light Show',
        fee: '₹100 (Indians) / ₹550 (Foreigners)',
        shortDesc: 'Majestic hilltop fort with the Sheesh Mahal (Mirror Palace) where a single candle reflects thousands of stars.',
        tip: 'Walk or take a jeep up; early mornings provide cooler temperatures and golden sandstone lighting.'
      },
      {
        id: 'jaipur-jantar-mantar',
        name: 'Jantar Mantar Astronomical Observatory',
        category: 'museums',
        coordinates: [26.9248, 75.8246],
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
        timing: '9:00 AM - 5:00 PM',
        fee: '₹50 (Indians) / ₹200 (Foreigners)',
        shortDesc: 'UNESCO World Heritage collection of 19 architectural astronomical instruments with the world’s largest stone sundial.',
        tip: 'Hire an astronomy guide who can demonstrate time calculation to 2 seconds accuracy using sunlight shadows.'
      },
      {
        id: 'jaipur-govind-devji',
        name: 'Govind Dev Ji Temple',
        category: 'temples',
        coordinates: [26.9270, 75.8239],
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        timing: '4:30 AM - 12:00 PM & 5:00 PM - 9:00 PM (Aarti timings)',
        fee: 'Free Entry',
        shortDesc: 'Revered Krishna idol brought from Vrindavan by Raja Man Singh I; holds the Guinness record for largest flat span roof.',
        tip: 'Attend the 7:00 PM Sandhya Aarti to experience devotional chanting with thousands of devotees.'
      },
      {
        id: 'jaipur-rawat',
        name: 'Rawat Mishthan Bhandar',
        category: 'food',
        coordinates: [26.9200, 75.7980],
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        timing: '6:30 AM - 10:30 PM',
        fee: '₹50 - ₹250',
        shortDesc: 'Legendary culinary institution selling over 10,000 fresh Pyaaz Kachoris daily along with Mawa Kachori.',
        tip: 'Pair your warm kachori with sweet lassi in a terracotta kulhad cup.'
      },
      {
        id: 'jaipur-nahargarh',
        name: 'Nahargarh Fort Sunset Point',
        category: 'scenic',
        coordinates: [26.9377, 75.8156],
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
        timing: '10:00 AM - 6:00 PM (Sunset terrace accessible till 10 PM)',
        fee: '₹50 (Indians) / ₹200 (Foreigners)',
        shortDesc: 'Fort atop the rugged Aravalli ridge providing panoramic sunset views of the entire illuminated Pink City below.',
        tip: 'Arrive 45 minutes before sunset; order cold coffee at the open-air rampart cafe.'
      }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    coordinates: [25.3176, 82.9739],
    tagline: 'The sacred eternal city of light, spiritual ghats, and evening Ganga Aarti.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'November to February (9°C - 22°C)',
    climate: 'Cool riverine mist in winter; auspicious dawn boat rides',
    overview: 'Mark Twain wrote that Varanasi is older than history, older than tradition, older even than legend. One of the oldest continuously inhabited cities on earth, Kashi draws pilgrims to its 84 ghats along the sacred Ganges River, ancient labyrinthine alleyways, and the resonant brass bells of evening prayer.',
    localFoodSpecialties: [
      { name: 'Kashi Malaiyo', desc: 'Winter cloud dessert made from whipped morning dew-frothed milk infused with saffron and pistachios.', place: 'Neelkanth Sweets, Thatheri Bazaar' },
      { name: 'Banarasi Tamatar Chaat', desc: 'Sizzling clay bowl chaat of crushed tomatoes, cumin ghee, cashews, and sweet hing syrup.', place: 'Kashi Chaat Bhandar, Godowlia' },
      { name: 'Blue Lassi & Paan', desc: 'Thick hand-churned fruit curd lassi and world-famous Meetha Magahi Banarasi Paan.', place: 'Blue Lassi Shop & Keshav Tambool' }
    ],
    places: [
      {
        id: 'varanasi-kashi-vishwanath',
        name: 'Kashi Vishwanath Jyotirlinga Temple',
        category: 'temples',
        coordinates: [25.3109, 83.0107],
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        timing: '3:00 AM - 11:00 PM',
        fee: 'Free (Sugam Darshan VIP ₹300)',
        shortDesc: 'One of the 12 sacred Jyotirlingas crowned with an 800-kg gold spire donated by Maharaja Ranjit Singh.',
        tip: 'Lockers available for mobile phones and wallets at the corridor entry gate.'
      },
      {
        id: 'varanasi-dashashwamedh',
        name: 'Dashashwamedh Ghat & Evening Aarti',
        category: 'scenic',
        coordinates: [25.3075, 83.0105],
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        timing: 'Aarti commences at 6:45 PM Daily',
        fee: 'Free viewing on steps; Boat seat ₹150 - ₹300',
        shortDesc: 'The grandest river ghat where 7 young priests perform choreographed multi-tiered brass lamp rituals.',
        tip: 'Hire a wooden hand-rowed boat 30 minutes before sunset for the best view from the river.'
      },
      {
        id: 'varanasi-sarnath',
        name: 'Sarnath & Dhamek Stupa',
        category: 'heritage',
        coordinates: [25.3811, 83.0214],
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        timing: '6:00 AM - 5:30 PM',
        fee: '₹25 (Indians) / ₹300 (Foreigners)',
        shortDesc: 'The sacred deer park where Gautama Buddha preached his first sermon setting the Wheel of Dharma in motion.',
        tip: 'Visit the adjacent Archaeological Museum to view the original Ashoka Lion Capital (National Emblem of India).'
      },
      {
        id: 'varanasi-bharat-kala',
        name: 'Bharat Kala Bhavan Museum (BHU)',
        category: 'museums',
        coordinates: [25.2677, 82.9913],
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
        timing: '10:30 AM - 4:30 PM (Sundays Closed)',
        fee: '₹20 (Indians) / ₹150 (Foreigners)',
        shortDesc: 'Treasury of over 100,000 antiquities including Mughal miniature paintings, ancient coins, and terracotta statues.',
        tip: 'Walk through the leafy, tree-canopied Banaras Hindu University campus after visiting.'
      },
      {
        id: 'varanasi-kashi-chaat',
        name: 'Kashi Chaat Bhandar',
        category: 'food',
        coordinates: [25.3100, 83.0080],
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        timing: '3:00 PM - 11:00 PM',
        fee: '₹50 - ₹120',
        shortDesc: 'The quintessential street food experience of Kashi, famed for hot Tamatar Chaat and crisp Palak Chaat.',
        tip: 'Try the Gulab Jamun served directly with thick rabdi after your spicy chaat.'
      }
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'National Capital Territory',
    coordinates: [28.6139, 77.2090],
    tagline: 'A mosaic of ancient empires, soaring minarets, and sizzling street food lanes.',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to March (11°C - 25°C)',
    climate: 'Crisp pleasant winter months perfect for outdoor monument tours',
    overview: 'Delhi has been the battlefield and capital of seven successive great empires. From the towering brick minaret of the Delhi Sultanate to Mughal red sandstone citadels and broad tree-lined avenues of Lutyens, Delhi blends ancient antiquity with modern metropolis vibrancy.',
    localFoodSpecialties: [
      { name: 'Chandni Chowk Paranthas', desc: 'Deep-fried stuffed breads with rabdi, banana, or spicy paneer.', place: 'Paranthe Wali Gali, Old Delhi' },
      { name: 'Butter Chicken & Naan', desc: 'Tandoori chicken simmered in silky tomato, butter, and fenugreek gravy, invented in Daryaganj in 1947.', place: 'Moti Mahal, Daryaganj' },
      { name: 'Chole Bhature', desc: 'Fluffy fried leavened bread paired with dark chickpea curry and tangy pickled raw mango.', place: 'Sita Ram Diwan Chand, Paharganj' }
    ],
    places: [
      {
        id: 'delhi-qutub-minar',
        name: 'Qutub Minar & Iron Pillar',
        category: 'heritage',
        coordinates: [28.5245, 77.1855],
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
        timing: '7:00 AM - 7:00 PM',
        fee: '₹40 (Indians) / ₹600 (Foreigners)',
        shortDesc: '72.5-meter fluted red sandstone victory minaret begun in 1192 CE, alongside a 1,600-year rust-resistant iron pillar.',
        tip: 'Look closely at the kufic calligraphy bands inscribed in red sandstone on each balcony.'
      },
      {
        id: 'delhi-india-gate',
        name: 'India Gate & Kartavya Path',
        category: 'scenic',
        coordinates: [28.6129, 77.2295],
        image: 'https://images.unsplash.com/photo-1597040663342-45b6af3d91a3?auto=format&fit=crop&w=800&q=80',
        timing: 'Open 24 Hours',
        fee: 'Free Entry',
        shortDesc: '42-meter triumphal arch war memorial illuminated gloriously each evening with fountains and lawns.',
        tip: 'Evening is magical for strolls with ice cream and boating in adjacent canals.'
      },
      {
        id: 'delhi-national-museum',
        name: 'National Museum of India',
        category: 'museums',
        coordinates: [28.6118, 77.2193],
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
        timing: '10:00 AM - 6:00 PM (Mondays Closed)',
        fee: '₹20 (Indians) / ₹650 (Foreigners)',
        shortDesc: 'Houses the 4,500-year-old bronze Harappan Dancing Girl, Buddhist relics of Piprahwa, and Tanjore paintings.',
        tip: 'Allocate at least 2.5 hours; audio guides available in 5 languages.'
      },
      {
        id: 'delhi-akshardham',
        name: 'Swaminarayan Akshardham Temple',
        category: 'temples',
        coordinates: [28.6127, 77.2773],
        image: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80',
        timing: '9:30 AM - 6:30 PM (Mondays Closed)',
        fee: 'Free entry; Exhibition & Sahaj Anand Water Show ₹250',
        shortDesc: 'Monumental modern pink sandstone and Carrara marble temple with 234 intricately carved pillars and 20,000 murtis.',
        tip: 'Electronic devices must be stored in secure cloakrooms before entering.'
      },
      {
        id: 'delhi-paranthe-wali-gali',
        name: 'Paranthe Wali Gali',
        category: 'food',
        coordinates: [28.6560, 77.2310],
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
        timing: '9:00 AM - 11:00 PM',
        fee: '₹80 - ₹180 per parantha',
        shortDesc: 'Historic cul-de-sac where royal halwais have served deep-fried stuffed flatbreads since 1872.',
        tip: 'Try the Khoya (sweet condensed milk) and Bitter Gourd (Karela) paranthas.'
      }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    coordinates: [18.9220, 72.8347],
    tagline: 'The Maximum City of Arabian Sea horizons, Victorian gothic spires, and Bollywood glamour.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'November to February (18°C - 30°C)',
    climate: 'Pleasant sea breezes with mild winter humidity',
    overview: 'Forged from seven marshy islands, Mumbai is India’s financial and creative powerhouse. Stroll the Queen’s Necklace curve along Marine Drive, marvel at the Indo-Saracenic Gateway of India, and sample street-side cutting chai and vada pav.',
    localFoodSpecialties: [
      { name: 'Mumbai Vada Pav', desc: 'Spicy potato fritter stuffed in bun with garlic-coconut dry chutney and fried green chillies.', place: 'Ashok Vada Pav, Kirti College' },
      { name: 'Pav Bhaji', desc: 'Buttery mashed vegetable gravy griddled on iron tawa served with golden butter-toasted rolls.', place: 'Sardar Refreshments, Tardeo' },
      { name: 'Bombay Duck & Prawn Curry', desc: 'Crispy fried bombil fish and coconut-kokum coastal Malvani seafood curry.', place: 'Gajalee & Trishna, Fort' }
    ],
    places: [
      {
        id: 'mumbai-gateway',
        name: 'Gateway of India & Taj Mahal Palace',
        category: 'heritage',
        coordinates: [18.9220, 72.8347],
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
        timing: 'Open 24 Hours',
        fee: 'Free Entry',
        shortDesc: '26-meter basalt arch facing Mumbai Harbour built to commemorate the 1911 royal landing of King George V.',
        tip: 'Ferries to Elephanta Caves depart directly from the rear jetties.'
      },
      {
        id: 'mumbai-cst',
        name: 'Chhatrapati Shivaji Maharaj Terminus (CST)',
        category: 'heritage',
        coordinates: [18.9398, 72.8354],
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
        timing: 'Functional station 24/7; Heritage wing tours 3 PM - 5 PM',
        fee: 'Free station entry',
        shortDesc: 'UNESCO World Heritage Victorian Italianate Gothic rail headquarters with gargoyles, stone peacock domes, and stained glass.',
        tip: 'View from across the street at 8:00 PM when the facade is illuminated in multi-colored floodlights.'
      },
      {
        id: 'mumbai-marine-drive',
        name: 'Marine Drive (Queen’s Necklace)',
        category: 'scenic',
        coordinates: [18.9432, 72.8230],
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
        timing: 'Open 24 Hours',
        fee: 'Free Entry',
        shortDesc: '3.6-kilometer C-shaped coastal promenade bordered by concrete tetrapods and art-deco seaside buildings.',
        tip: 'Sit on the sea promenade near Nariman Point at dusk with roasted corn on the cob (Bhutta).'
      },
      {
        id: 'mumbai-siddhivinayak',
        name: 'Shri Siddhivinayak Ganapati Temple',
        category: 'temples',
        coordinates: [19.0169, 72.8304],
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        timing: '5:30 AM - 10:00 PM (Tuesdays special darshan till 12 AM)',
        fee: 'Free Entry (Paid VIP Darshan passes available online)',
        shortDesc: 'Famed temple with a gold-plated sanctum housing an idol of Lord Ganesha with a right-curved trunk.',
        tip: 'Tuesdays are auspicious and see long devotional queues; weekdays mornings are swift.'
      },
      {
        id: 'mumbai-csmvs',
        name: 'CSMVS Museum (Prince of Wales Museum)',
        category: 'museums',
        coordinates: [18.9269, 72.8327],
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        timing: '10:15 AM - 6:00 PM',
        fee: '₹150 (Indians) / ₹700 (Foreigners)',
        shortDesc: 'Surrounded by tranquil palm gardens, exhibiting Indus Valley seals, Tibetan thangkas, and Himalayan bronzes.',
        tip: 'The museum cafe under the banyan tree serves organic teas and pastries.'
      }
    ]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    coordinates: [15.3350, 76.4600],
    tagline: 'Surreal granite boulder landscape and ruins of the medieval Vijayanagara Empire.',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'November to February (16°C - 30°C)',
    climate: 'Dry sunny days ideal for renting a bicycle and exploring sprawling stone ruins',
    overview: 'A UNESCO World Heritage marvel, Hampi was the second-largest city in the medieval world after Beijing. Nestled amidst towering ochre granite boulders and the sparkling Tungabhadra River, its monolithic temples and musical pillars leave travellers spellbound.',
    localFoodSpecialties: [
      { name: 'South Indian Banana Leaf Thali', desc: 'Unlimited rice, piping hot sambar, rasam, kootu, and crispy papad with ghee.', place: 'Mango Tree Restaurant, Hampi Bazaar' },
      { name: 'Filter Coffee & Thatte Idli', desc: 'Steaming plate-sized spongy idlis with coconut chutney and fresh chicory filter coffee.', place: 'Udupi Sri Krishna Bhavan' }
    ],
    places: [
      {
        id: 'hampi-virupaksha',
        name: 'Virupaksha Temple Complex',
        category: 'temples',
        coordinates: [15.3358, 76.4602],
        image: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80',
        timing: '6:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
        fee: '₹25 entry',
        shortDesc: 'The oldest functioning Shiva temple in Hampi with a 50-meter gopuram tower, active since the 7th century CE.',
        tip: 'Check out the pinhole camera effect inside the dark chamber where the gopuram shadow reflects inverted on the wall.'
      },
      {
        id: 'hampi-stone-chariot',
        name: 'Vittala Temple & Stone Chariot',
        category: 'heritage',
        coordinates: [15.3392, 76.4746],
        image: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80',
        timing: '8:30 AM - 5:30 PM',
        fee: '₹40 (Indians) / ₹600 (Foreigners)',
        shortDesc: 'Iconic stone chariot dedicated to Garuda (depicted on the Indian ₹50 note) and 56 musical pillars.',
        tip: 'Take an electric cart from the parking zone or walk the 1.2 km riverside trail along ancient stone bazaars.'
      },
      {
        id: 'hampi-matanga',
        name: 'Matanga Hill Sunrise Viewpoint',
        category: 'scenic',
        coordinates: [15.3325, 76.4670],
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
        timing: 'Open 24/7 (Climb before 5:45 AM)',
        fee: 'Free',
        shortDesc: 'Highest point in central Hampi offering a 360-degree panorama of boulder fields and river bend.',
        tip: 'Wear sturdy sports shoes; the 25-minute rocky step hike requires good footing in the dark.'
      }
    ]
  },
  {
    id: 'kochi',
    name: 'Kochi (Cochin)',
    state: 'Kerala',
    coordinates: [9.9674, 76.2429],
    tagline: 'Queen of the Arabian Sea with Portuguese colonial alleys and tranquil backwaters.',
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    bestTimeToVisit: 'October to March (23°C - 31°C)',
    climate: 'Tropical coastal breeze with gentle humidity and golden sunsets over the sea',
    overview: 'A historic spice trade harbor where Arab, Chinese, Portuguese, Dutch, and British merchants converged for over six centuries. Today, Fort Kochi charms travelers with giant cantilevered Chinese fishing nets, colonial bungalow cafes, spice warehouses, and Kathakali cultural theatres.',
    localFoodSpecialties: [
      { name: 'Kerala Seafood Moilee & Appam', desc: 'Mild coconut milk fish curry with spongy fermented rice hoppers.', place: 'Oceanos Restaurant, Elphinstone Road' },
      { name: 'Kochi Parotta & Beef/Mushroom Roast', desc: 'Flaky layered Kerala parotta served with caramelized onion and black pepper roast.', place: 'Kayees Rahmathulla Hotel, Mattancherry' },
      { name: 'Artisan Cold Brew & Carrot Cake', desc: 'Organic South Indian plantation roast with homemade fresh pastries in an art gallery courtyard.', place: 'Kashi Art Cafe, Burgher Street' }
    ],
    places: [
      {
        id: 'kochi-fishing-nets',
        name: 'Chinese Cantilevered Fishing Nets (Cheena Vala)',
        category: 'scenic',
        coordinates: [9.9692, 76.2411],
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
        timing: 'Sunrise to Sunset (Active hauls 6:00 AM - 9:00 AM & 4:30 PM - 6:30 PM)',
        fee: 'Free to observe (nominal tip to pull nets with fishermen)',
        shortDesc: 'Iconic 14th-century cantilevered sea nets introduced by Chinese trader Zheng He, operated with teak counterweights.',
        tip: 'Best silhouette photography is during golden hour sunset around 5:45 PM from Vasco da Gama Square.'
      },
      {
        id: 'kochi-mattancherry-palace',
        name: 'Mattancherry Dutch Palace',
        category: 'museums',
        coordinates: [9.9583, 76.2594],
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        timing: '9:45 AM - 4:45 PM (Closed on Fridays)',
        fee: '₹10 entry',
        shortDesc: 'Portuguese palace gifted to Raja of Kochi in 1555, famed for mural frescoes depicting Hindu epics and royal coronation robes.',
        tip: 'Check out the carved wooden ceiling in the coronation hall and the traditional black polished floor.'
      },
      {
        id: 'kochi-santa-cruz',
        name: 'Santa Cruz Cathedral Basilica',
        category: 'temples',
        coordinates: [9.9648, 76.2414],
        image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
        timing: '6:00 AM - 6:30 PM Daily',
        fee: 'Free',
        shortDesc: 'One of the eight Basilicas in India, featuring Gothic white towers, pastel columns, and fresco paintings of the Last Supper.',
        tip: 'Dress modestly with shoulders covered; photography during ongoing Sunday mass is prohibited.'
      },
      {
        id: 'kochi-jew-town',
        name: 'Paradesi Synagogue & Jew Town',
        category: 'heritage',
        coordinates: [9.9575, 76.2599],
        image: 'https://images.unsplash.com/photo-1590077428573-683c301a08d6?auto=format&fit=crop&w=800&q=80',
        timing: '10:00 AM - 1:00 PM & 2:00 PM - 5:00 PM (Closed Saturdays)',
        fee: '₹10',
        shortDesc: 'Constructed in 1568, famous for hundreds of 18th-century hand-painted Cantonese porcelain tiles and Belgian crystal chandeliers.',
        tip: 'Stroll through the adjoining antique alley lined with vintage brass clocks, spices, and Kashmiri embroidered tapestries.'
      },
      {
        id: 'kochi-kashi-cafe',
        name: 'Kashi Art Cafe & Cultural Space',
        category: 'food',
        coordinates: [9.9670, 76.2435],
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        timing: '8:30 AM - 9:30 PM Daily',
        fee: '₹200 - ₹500 avg meal',
        shortDesc: 'Pioneering bohemian arts cafe serving organic coffee, fresh salads, roast chicken, and chocolate pie in an open-sky courtyard.',
        tip: 'Walk through to the back garden to view rotating contemporary art installations by local Kerala artists.'
      }
    ]
  }
];

export const COMMUNITY_GEMS = [
  {
    id: 'gem-1',
    city: 'Agra',
    title: 'Secret Taj Sunset Spot at Mehtab Bagh Riverbank',
    author: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    category: 'Secret Photo Angle',
    likes: 142,
    date: '2 days ago',
    description: 'Avoid the high entry queue inside the monument! Walk 200m past the Mehtab Bagh ticket gate down toward the sandy Yamuna riverbank. Local boatmen offer quiet 15-minute sunset rows that align right with the Taj dome reflection.',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-200'
  },
  {
    id: 'gem-2',
    city: 'Jaipur',
    title: 'Wind View Cafe Rooftop Facing Hawa Mahal',
    author: 'Priya Mehra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    category: 'Secret Photo Angle',
    likes: 219,
    date: 'Yesterday',
    description: 'Cross the street directly opposite Hawa Mahal and take the stairs up to Wind View Cafe. Order a ₹60 iced cardamom chai and get the most insane eye-level panoramic photo of all 953 pink casements with zero crowds.',
    badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-200'
  },
  {
    id: 'gem-3',
    city: 'Varanasi',
    title: 'Subah-e-Banaras Dawn Ganga Aarti at Assi Ghat',
    author: 'Devendra Nath',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    category: 'Cultural Custom',
    likes: 310,
    date: '3 days ago',
    description: 'Everyone goes to the evening Dashashwamedh Aarti, but the 5:00 AM dawn Vedic chants, Shehnai recital, and classical Kathak recital at Assi Ghat are ten times more soulful and serene.',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-200'
  },
  {
    id: 'gem-4',
    city: 'Delhi',
    title: 'Hidden Rooftop Viewpoint at Jama Masjid Southern Minaret',
    author: 'Rohit Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    category: 'Hidden Lane',
    likes: 184,
    date: '5 days ago',
    description: 'Pay ₹100 at the gate to climb the 130 spiral stairs of the South Minaret. You get an uninterrupted view straight along Old Delhi bazaar alleyways toward the Red Fort.',
    badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-200'
  },
  {
    id: 'gem-5',
    city: 'Kochi',
    title: 'Fresh Catch Grilling at Fort Kochi Beachfront Stalls',
    author: 'Anjali Menon',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    category: 'Budget Street Food',
    likes: 167,
    date: 'Just now',
    description: 'Buy freshly netted red snapper or tiger prawns straight from the Chinese net fishermen for ₹250, then walk 20 meters to the beachside shacks who will pan-fry it in hot Kerala masala paste for ₹100 with hot parotta.',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
  },
  {
    id: 'gem-6',
    city: 'Hampi',
    title: 'Sanapur Lake Cliff Jumping & Coracle Boat Rides',
    author: 'Vikram Seth',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    category: 'Secret Photo Angle',
    likes: 198,
    date: '1 week ago',
    description: 'Cross over to the Hippie Island side by ferry and rent a scooter. Sanapur Lake is surrounded by tranquil granite boulders with virtually no tour buses. Watch for the designated safe jump spots and take a spinning circular coracle ride.',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
  }
];

// All places enriched with destination city & state context for universal search
export const ALL_PLACES = CITIES_DATA.flatMap((city) =>
  city.places.map((place) => ({
    ...place,
    cityId: city.id,
    cityName: city.name,
    state: city.state,
    localFoodSpecialties: city.localFoodSpecialties,
    cityOverview: city.overview
  }))
);
