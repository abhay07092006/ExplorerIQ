// ExplorerIQ Destination Travel Data Engine
// Expanded to 29 premier Indian destinations across North, South, East, West & Central
// Each destination includes categorized highlights, local cuisine, and travel duration

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
    "id": "delhi",
    "name": "Delhi (NCR)",
    "state": "National Capital Territory",
    "zone": "North",
    "coordinates": [
      28.6139,
      77.209
    ],
    "tagline": "A mosaic of ancient empires, triumphal arches, and legendary street food.",
    "heroImage": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (10°C - 25°C)",
    "bestDuration": "3-4 Days",
    "climate": "Crisp winter sunshine ideal for visiting heritage monuments and outdoor gardens",
    "overview": "Capital of India spanning nine historical eras. Filled with monumental Mughal red sandstone forts, the towering Qutub Minar, colonial Kartavya Path, and the aromatic spice lanes of Old Delhi.",
    "localFoodSpecialties": [
      {
        "name": "Old Delhi Nihari & Butter Chicken",
        "desc": "Slow-cooked overnight spiced lamb stew and original 1947 tandoori butter chicken.",
        "place": "Karim’s & Moti Mahal, Chandni Chowk"
      },
      {
        "name": "Stuffed Paranthas",
        "desc": "Crispy pan-fried breads stuffed with paneer, potato, and rabri served with sweet pumpkin chutney.",
        "place": "Pt. Kanhaiyalal Durgaprasad, Paranthe Wali Gali"
      },
      {
        "name": "Chole Bhature",
        "desc": "Fluffy fried leavened bread served with tangy Punjabi chickpeas and pickled amla.",
        "place": "Sita Ram Diwan Chand, Paharganj"
      }
    ],
    "places": [
      {
        "id": "delhi-qutub-minar",
        "name": "Qutub Minar & Iron Pillar",
        "category": "heritage",
        "coordinates": [
          28.5244,
          77.1855
        ],
        "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        "timing": "7:00 AM - 7:00 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "72.5-meter red sandstone victory tower built in 1192 CE, surrounded by 4th-century rustless iron pillar.",
        "tip": "Walk through the Mehrauli Archaeological Park right behind Qutub Minar for ancient stepwells."
      },
      {
        "id": "delhi-india-gate",
        "name": "India Gate & Kartavya Path",
        "category": "heritage",
        "coordinates": [
          28.6129,
          77.2295
        ],
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7 (Illuminated 7:00 PM - 11:00 PM)",
        "fee": "Free",
        "shortDesc": "42-meter triumphal arch war memorial honoring 84,000 soldiers, fronted by illuminated boulevards.",
        "tip": "Best visited at twilight; grab roasted spicy corn (bhutta) and stroll through the National War Memorial."
      },
      {
        "id": "delhi-akshardham",
        "name": "Swaminarayan Akshardham",
        "category": "temples",
        "coordinates": [
          28.6127,
          77.2773
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 8:00 PM (Mondays Closed)",
        "fee": "Free Temple entry (Exhibitions ₹250)",
        "shortDesc": "Colossal modern sandstone and Italian Carrara marble temple with 234 carved pillars and water fountain show.",
        "tip": "No electronic devices or smartwatches allowed inside; utilize the free secure baggage deposit."
      },
      {
        "id": "delhi-national-museum",
        "name": "National Museum of India",
        "category": "museums",
        "coordinates": [
          28.6118,
          77.2193
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 6:00 PM (Mondays Closed)",
        "fee": "₹20 (Indians) / ₹650 (Foreigners)",
        "shortDesc": "Premier museum housing 200,000 artifacts from the Indus Valley Civilization (Dancing Girl) and sacred Buddhist relics.",
        "tip": "Don’t miss the Harappan Gallery and the gilded miniature paintings collection."
      },
      {
        "id": "delhi-paranthe-gali",
        "name": "Paranthe Wali Gali, Chandni Chowk",
        "category": "food",
        "coordinates": [
          28.6558,
          77.2315
        ],
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 11:00 PM",
        "fee": "₹80 - ₹150 per parantha",
        "shortDesc": "Narrow culinary lane serving pure vegetarian deep-fried stuffed paranthas since the 1870s.",
        "tip": "Try the unusual Khoya Parantha or Papad Parantha paired with sweet banana-tamarind chutney."
      },
      {
        "id": "delhi-lodhi-garden",
        "name": "Lodhi Gardens",
        "category": "scenic",
        "coordinates": [
          28.5933,
          77.2197
        ],
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 8:00 PM",
        "fee": "Free",
        "shortDesc": "90-acre lush heritage park dotted with 15th-century Sayyid and Lodhi dynasty domed mausoleums.",
        "tip": "Great spot for a tranquil morning stroll or heritage photography among blossoming flowers."
      }
    ]
  },
  {
    "id": "agra",
    "name": "Agra",
    "state": "Uttar Pradesh",
    "zone": "North",
    "coordinates": [
      27.1767,
      78.0081
    ],
    "tagline": "Imperial Mughal capital home to the eternal jewel of white marble.",
    "heroImage": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (12°C - 24°C)",
    "bestDuration": "1-2 Days",
    "climate": "Semi-arid with cool pleasant winters and hot summers",
    "overview": "Perched on the banks of the sacred Yamuna River, Agra was the golden seat of the Mughal Empire under Akbar, Jahangir, and Shah Jahan. Home to three UNESCO World Heritage wonders.",
    "localFoodSpecialties": [
      {
        "name": "Agra Petha",
        "desc": "Candied ash gourd translucent sweet in flavors like Angoori, Kesar, and Paan.",
        "place": "Panchi Petha, Sadar Bazaar"
      },
      {
        "name": "Bedai & Jalebi",
        "desc": "Crispy lentil-stuffed fried bread with spicy potato curry and piping hot jalebi.",
        "place": "Deviram Sweets, Pratap Pura"
      },
      {
        "name": "Mughlai Gosht & Paratha",
        "desc": "Aromatic saffron slow-simmered rich curries with layered tandoori bread.",
        "place": "Pinch of Spice, Fatehabad Road"
      }
    ],
    "places": [
      {
        "id": "agra-taj",
        "name": "The Taj Mahal",
        "category": "heritage",
        "coordinates": [
          27.1751,
          78.0421
        ],
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        "timing": "Sunrise to Sunset (Closed on Fridays)",
        "fee": "₹50 (Indians) / ₹1,100 (Foreigners)",
        "shortDesc": "UNESCO World Heritage ivory-white marble mausoleum commissioned in 1632 by Shah Jahan for Mumtaz Mahal.",
        "tip": "Visit at dawn via the East Gate for golden light reflection and minimal crowds."
      },
      {
        "id": "agra-fort",
        "name": "Agra Fort (Lal Qila)",
        "category": "heritage",
        "coordinates": [
          27.1795,
          78.0211
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM Daily",
        "fee": "₹50 (Indians) / ₹650 (Foreigners)",
        "shortDesc": "Vast 16th-century red sandstone fortress residence where Shah Jahan spent his final years gazing at the Taj.",
        "tip": "Look through the marble jali screen at the Musamman Burj tower for a framed Taj view."
      },
      {
        "id": "agra-fatehpur",
        "name": "Fatehpur Sikri",
        "category": "heritage",
        "coordinates": [
          27.0945,
          77.6679
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:30 PM",
        "fee": "₹50 (Indians) / ₹610 (Foreigners)",
        "shortDesc": "Preserved red sandstone Mughal capital built by Akbar, featuring the towering 54-meter Buland Darwaza.",
        "tip": "Hire an official ASI licensed guide at the gate to decode Akbar’s interfaith hall of discussions."
      },
      {
        "id": "agra-mankameshwar",
        "name": "Mankameshwar Shiva Temple",
        "category": "temples",
        "coordinates": [
          27.1852,
          78.0146
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 AM - 10:00 PM",
        "fee": "Free Entry",
        "shortDesc": "Ancient Shiva temple nestled near Rawatpara, where Lord Shiva is believed to have rested in the Dvapara Yuga.",
        "tip": "No leather items or belts permitted inside sanctum."
      },
      {
        "id": "agra-taj-museum",
        "name": "Taj Museum & Western Gumbad",
        "category": "museums",
        "coordinates": [
          27.1748,
          78.041
        ],
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Fridays Closed)",
        "fee": "Included with Taj ticket",
        "shortDesc": "Exhibits 17th-century Mughal coins, architectural blue-prints, and celadon dishes that cracked if touched by poison.",
        "tip": "Great air-conditioned historical refuge during sunny afternoons."
      },
      {
        "id": "agra-mehtab-bagh",
        "name": "Mehtab Bagh (Moonlight Garden)",
        "category": "scenic",
        "coordinates": [
          27.18,
          78.0425
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Charbagh botanical garden across the Yamuna perfectly aligned with the Taj Mahal for mirror reflections.",
        "tip": "Arrive 45 minutes before sunset for the golden silhouette of the Taj without crowds."
      }
    ]
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "state": "Rajasthan",
    "zone": "North",
    "coordinates": [
      26.9124,
      75.7873
    ],
    "tagline": "The fabled Pink City of Rajput warriors, astronomical courtyards, and hilltop forts.",
    "heroImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "November to February (10°C - 26°C)",
    "bestDuration": "2-3 Days",
    "climate": "Sunny, dry, and cool desert breeze during winter months",
    "overview": "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India’s first planned city laid out in accordance with Vastu Shastra principles. Terracotta pink walls, bustling jewel bazaars, and royal palaces make it a crown jewel of Rajasthan.",
    "localFoodSpecialties": [
      {
        "name": "Dal Baati Churma",
        "desc": "Baked wheat balls dipped in pure desi ghee, served with spicy lentil curry and sweet crumbled jaggery.",
        "place": "Laxmi Mishthan Bhandar (LMB), Johari Bazaar"
      },
      {
        "name": "Pyaaz Kachori & Lassi",
        "desc": "Crisp layered pastry filled with spiced onion mixture, paired with thick clay-pot sweet lassi.",
        "place": "Rawat Mishthan Bhandar, Station Road"
      },
      {
        "name": "Laal Maas",
        "desc": "Fiery smoked mutton curry prepared with Rajasthani Mathania red chilies and garlic.",
        "place": "1135 AD, Amer Fort"
      }
    ],
    "places": [
      {
        "id": "jaipur-hawa-mahal",
        "name": "Hawa Mahal (Palace of Winds)",
        "category": "heritage",
        "coordinates": [
          26.9239,
          75.8267
        ],
        "image": "https://images.unsplash.com/photo-1676444490527-cf8f7894e9f0?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM Daily",
        "fee": "₹50 (Indians) / ₹200 (Foreigners)",
        "shortDesc": "Five-story pink sandstone facade with 953 carved jharokha casements designed for royal purdah ladies.",
        "tip": "Head across the street to Wind View Cafe or Tattoo Cafe for a front terrace panoramic coffee shot."
      },
      {
        "id": "jaipur-amber-fort",
        "name": "Amer (Amber) Fort & Palace",
        "category": "heritage",
        "coordinates": [
          26.9855,
          75.8513
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "8:00 AM - 5:30 PM & Night Tour 6:30 PM - 9:00 PM",
        "fee": "₹100 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Hilltop fortress with yellow and pink sandstone ramparts overlooking Maota Lake, famous for the Sheesh Mahal mirror palace.",
        "tip": "Visit Sheesh Mahal; when a single candle is lit, its thousands of convex mirrors recreate a starry night sky."
      },
      {
        "id": "jaipur-jantar-mantar",
        "name": "Jantar Mantar Observatory",
        "category": "museums",
        "coordinates": [
          26.9248,
          75.8246
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM",
        "fee": "₹50 (Indians) / ₹200 (Foreigners)",
        "shortDesc": "UNESCO World Heritage astronomical complex featuring nineteen architectural stone instruments, including the world’s largest stone sundial.",
        "tip": "Hire an official audio guide to understand the Samrat Yantra sundial accurate to within two seconds."
      },
      {
        "id": "jaipur-govind-devji",
        "name": "Govind Dev Ji Temple",
        "category": "temples",
        "coordinates": [
          26.9276,
          75.8242
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "4:30 AM - 12:00 PM & 5:00 PM - 9:00 PM",
        "fee": "Free",
        "shortDesc": "Located inside the City Palace complex, housing the sacred Govind Devji Krishna deity that Maharaja Sawai Jai Singh brought from Vrindavan.",
        "tip": "Attend the morning Mangala Aarti (around 5:00 AM) for divine musical devotional singing."
      },
      {
        "id": "jaipur-nahargarh",
        "name": "Nahargarh Fort Sunset Point",
        "category": "scenic",
        "coordinates": [
          26.9372,
          75.8156
        ],
        "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 10:00 PM",
        "fee": "₹50 (Indians) / ₹200 (Foreigners)",
        "shortDesc": "Perched high on the Aravalli Ridge offering breathtaking sunset views of the entire illuminated pink city below.",
        "tip": "Drive up via the winding hillside road before 5:15 PM and secure a spot on the rooftop ramparts."
      }
    ]
  },
  {
    "id": "udaipur",
    "name": "Udaipur",
    "state": "Rajasthan",
    "zone": "North",
    "coordinates": [
      24.5854,
      73.7125
    ],
    "tagline": "The romantic Venice of the East adorned with shimmering lakes and marble palaces.",
    "heroImage": "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "September to March (12°C - 28°C)",
    "bestDuration": "2-3 Days",
    "climate": "Lakeside pleasant climate with golden sunny afternoons and cool evenings",
    "overview": "Surrounded by the azure waters of Lake Pichola and the rolling Aravalli mountains, Udaipur is celebrated as one of the most romantic cities on Earth. Home to the towering City Palace complex and floating Taj Lake Palace.",
    "localFoodSpecialties": [
      {
        "name": "Dal Baati & Gatte Ki Sabzi",
        "desc": "Gram flour dumplings cooked in rich yoghurt gravy paired with ghee-topped baatis.",
        "place": "Krishna Dal Bati Restro, Jal Borg"
      },
      {
        "name": "Kachori & Mirchi Vada",
        "desc": "Spicy chili fritter stuffed with seasoned potato and crunchy green chilies.",
        "place": "Shastri Circle Food Stalls"
      },
      {
        "name": "Boiled Egg Bhurji & Kulcha",
        "desc": "Udaipur-style spicy shredded egg gravy tossed with butter and garam masala.",
        "place": "Chetek Circle Egg Hub"
      }
    ],
    "places": [
      {
        "id": "udaipur-city-palace",
        "name": "Udaipur City Palace Complex",
        "category": "heritage",
        "coordinates": [
          24.5764,
          73.6835
        ],
        "image": "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:30 PM",
        "fee": "₹300 (Adults) / ₹100 (Children)",
        "shortDesc": "Rajasthan’s largest palace complex, blending Rajasthani and Mughal architectural splendors on Lake Pichola’s eastern bank.",
        "tip": "Take an audio guide to discover the Mor Chowk peacock glass mosaics and the Zenana Mahal queen quarters."
      },
      {
        "id": "udaipur-lake-pichola",
        "name": "Lake Pichola Boat Cruise & Jag Mandir",
        "category": "scenic",
        "coordinates": [
          24.575,
          73.678
        ],
        "image": "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 6:00 PM",
        "fee": "₹400 - ₹700 (includes Jag Mandir island stop)",
        "shortDesc": "Centuries-old artificial freshwater lake flanked by bathing ghats, whitewashed havelis, and palace pavilions.",
        "tip": "Book the 5:00 PM sunset boat trip to witness the marble palaces turn glowing orange and amber."
      },
      {
        "id": "udaipur-jagdish-temple",
        "name": "Jagdish Temple",
        "category": "temples",
        "coordinates": [
          24.579,
          73.684
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 AM - 2:30 PM & 4:00 PM - 10:00 PM",
        "fee": "Free",
        "shortDesc": "Three-story Indo-Aryan temple built in 1651 by Maharana Jagat Singh, dedicated to Lord Vishnu with carved stone elephant friezes.",
        "tip": "Climb the steep 32 marble stairs right outside City Palace gate during the evening Aarti for choral bells."
      },
      {
        "id": "udaipur-bagore-ki-haveli",
        "name": "Bagore Ki Haveli & Folk Dance Museum",
        "category": "museums",
        "coordinates": [
          24.5798,
          73.6806
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:30 PM (Dharohar Folk Dance at 7:00 PM)",
        "fee": "₹100 Museum / ₹150 Dharohar Dance Show",
        "shortDesc": "Historic 18th-century waterfront haveli at Gangaur Ghat exhibiting traditional costumes, royal puppets, and live Rajasthani folk dances.",
        "tip": "Arrive at 6:15 PM to get front-row cushion seats for the Dharohar puppet and Chari fire dance show."
      },
      {
        "id": "udaipur-saheliyon",
        "name": "Saheliyon Ki Bari (Garden of the Maids)",
        "category": "scenic",
        "coordinates": [
          24.6042,
          73.6883
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "8:00 AM - 7:00 PM",
        "fee": "₹20 (Indians) / ₹100 (Foreigners)",
        "shortDesc": "Royal gardens landscaped with marble pavilions, lotus pools, and gravity-fed fountains designed for royal maidens.",
        "tip": "Notice how the fountain water creates an acoustic illusion resembling gentle natural rainfall."
      }
    ]
  },
  {
    "id": "varanasi",
    "name": "Varanasi (Kashi)",
    "state": "Uttar Pradesh",
    "zone": "North",
    "coordinates": [
      25.3176,
      82.9739
    ],
    "tagline": "The eternal spiritual capital of India on the banks of Mother Ganga.",
    "heroImage": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (14°C - 28°C)",
    "bestDuration": "2-3 Days",
    "climate": "Cool gentle breezes off the Ganges with misty spiritual dawns",
    "overview": "One of the oldest continuously inhabited cities on Earth, Mark Twain wrote that Varanasi is \"older than history, older than tradition, older even than legend.\" Eighty-four stone ghats slope gently into the river, alive with sacred mantras and evening aartis.",
    "localFoodSpecialties": [
      {
        "name": "Banarasi Tamatar Chaat",
        "desc": "Hot spicy mashed tomatoes cooked in clarified butter with crispy sev and sweet sugar syrup drizzle.",
        "place": "Kashi Chaat Bhandar, Godowlia"
      },
      {
        "name": "Kachori Sabzi & Jalebi",
        "desc": "Fried crisp bread with spicy hing (asafoetida) potato-chana curry and saffron jalebis.",
        "place": "Ram Bhandar, Thatheri Bazaar"
      },
      {
        "name": "Banarasi Paan & Malaiyo",
        "desc": "Winter cloud-like saffron milk foam froth sprinkled with pistachios, followed by royal Meetha Paan.",
        "place": "Keshav Tambool Bhandar, Assi Ghat"
      }
    ],
    "places": [
      {
        "id": "varanasi-kashi-vishwanath",
        "name": "Kashi Vishwanath Jyotirlinga Temple",
        "category": "temples",
        "coordinates": [
          25.3109,
          83.0107
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "3:00 AM - 11:00 PM",
        "fee": "Free (VIP Darshan ₹300 optional)",
        "shortDesc": "One of the twelve sacred Jyotirlingas, crowned by a gold-plated spire donated by Maharaja Ranjit Singh.",
        "tip": "Book Mangla Aarti online in advance or walk through the grand newly inaugurated Vishwanath Corridor."
      },
      {
        "id": "varanasi-dashashwamedh",
        "name": "Dashashwamedh Ghat & Evening Ganga Aarti",
        "category": "heritage",
        "coordinates": [
          25.3073,
          83.0103
        ],
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        "timing": "Aarti begins at 6:45 PM daily",
        "fee": "Free from steps",
        "shortDesc": "The primary and oldest ghat where young Vedic priests perform synchronized brass lamp ceremonies to venerate River Ganga.",
        "tip": "Hire a wooden hand-rowed boat from the opposite riverbank for the most immersive view of the lamp flames."
      },
      {
        "id": "varanasi-sarnath",
        "name": "Sarnath Deer Park & Dhamek Stupa",
        "category": "heritage",
        "coordinates": [
          25.3811,
          83.0214
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "Sunrise to Sunset",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Sacred Buddhist sanctuary where Lord Buddha gave his first sermon after attaining enlightenment.",
        "tip": "Visit the adjacent Archaeological Museum housing the original 3rd-century BCE Ashoka Lion Capital."
      },
      {
        "id": "varanasi-chaat",
        "name": "Kashi Chaat Bhandar Street Hub",
        "category": "food",
        "coordinates": [
          25.309,
          83.0065
        ],
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        "timing": "4:00 PM - 10:30 PM",
        "fee": "₹40 - ₹80 per plate",
        "shortDesc": "Iconic streetside chaat destination celebrated for piping-hot Tamatar Chaat in terracotta bowls.",
        "tip": "Order the Tamatar Chaat and Gulab Jamun fresh out of boiling ghee."
      },
      {
        "id": "varanasi-assi-ghat",
        "name": "Assi Ghat Sunrise & Subah-e-Banaras",
        "category": "scenic",
        "coordinates": [
          25.289,
          83.006
        ],
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 AM - 7:30 AM",
        "fee": "Free",
        "shortDesc": "Southernmost ghat where the river Assi meets Ganga; famous for dawn yoga, classical music recitals, and morning aarti.",
        "tip": "Arrive at 5:15 AM to experience Subah-e-Banaras morning aarti and classical flute recitals."
      }
    ]
  },
  {
    "id": "amritsar",
    "name": "Amritsar",
    "state": "Punjab",
    "zone": "North",
    "coordinates": [
      31.634,
      74.8723
    ],
    "tagline": "The sacred spiritual heart of Sikhism and culinary capital of Punjab.",
    "heroImage": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (10°C - 24°C)",
    "bestDuration": "2-3 Days",
    "climate": "Crisp pleasant winter sunshine, ideal for strolling heritage walkways and food bazaars",
    "overview": "Home to Sri Harmandir Sahib (The Golden Temple), Amritsar radiates profound spirituality, boundless community hospitality through the world’s largest free community kitchen (langar), and fiery patriotic pride at the Wagah Border.",
    "localFoodSpecialties": [
      {
        "name": "Amritsari Kulcha & Chole",
        "desc": "Crisp layered tandoori bread stuffed with spiced potato and onion, drenched in butter.",
        "place": "Kulcha Land & Bhai Kulwant Singh Kulchian Wale"
      },
      {
        "name": "Maa Ki Dal & Lachha Paratha",
        "desc": "Slow-cooked black lentils simmered for 12 hours with fresh country butter.",
        "place": "Kesar Da Dhaba, Chowk Passian"
      },
      {
        "name": "Creamy Amritsari Lassi",
        "desc": "Thick churned sweet yoghurt served in giant brass glasses topped with a thick dollop of clotted cream (malai).",
        "place": "Gian Chand Lassi, Ghee Mandi"
      }
    ],
    "places": [
      {
        "id": "amritsar-golden-temple",
        "name": "Sri Harmandir Sahib (Golden Temple)",
        "category": "temples",
        "coordinates": [
          31.62,
          74.8765
        ],
        "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24 Hours Daily",
        "fee": "Free (All are welcome)",
        "shortDesc": "Central spiritual sanctuary of Sikhism, plated with 500 kg of pure gold leaf and surrounded by the sacred Amrit Sarovar lake.",
        "tip": "Head to the Guru Ram Das Langar Hall to volunteer or dine alongside 100,000 pilgrims served daily."
      },
      {
        "id": "amritsar-wagah-border",
        "name": "Wagah Border Beating Retreat Ceremony",
        "category": "heritage",
        "coordinates": [
          31.6047,
          74.5731
        ],
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "timing": "4:30 PM - 5:30 PM (Arrive by 3:00 PM for seating)",
        "fee": "Free entry",
        "shortDesc": "Electrifying daily military parade with coordinated high kicks and flag lowering by Indian BSF and Pakistani Rangers.",
        "tip": "Carry your official ID; leave large backpacks in your taxi as only cell phones and wallets are permitted."
      },
      {
        "id": "amritsar-jallianwala-bagh",
        "name": "Jallianwala Bagh Memorial",
        "category": "heritage",
        "coordinates": [
          31.6205,
          74.8801
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "6:30 AM - 7:30 PM",
        "fee": "Free",
        "shortDesc": "Sacred national memorial garden preserving the bullet marks and historic well from the tragic 1919 British massacre.",
        "tip": "Walk through the narrow brick alleyway to view the preserved red brick bullet impacts."
      },
      {
        "id": "amritsar-partition-museum",
        "name": "The Partition Museum (Town Hall)",
        "category": "museums",
        "coordinates": [
          31.6247,
          74.877
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 6:00 PM (Mondays Closed)",
        "fee": "₹10 (Indians) / ₹250 (Foreigners)",
        "shortDesc": "World’s first museum dedicated to the 1947 Partition of India, featuring oral histories, refugee letters, and historic relics.",
        "tip": "Plan at least 90 minutes to experience the poignant audio recordings in the Gallery of Hope."
      },
      {
        "id": "amritsar-kesar-dhaba",
        "name": "Kesar Da Dhaba Food Heritage Hub",
        "category": "food",
        "coordinates": [
          31.6212,
          74.8741
        ],
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
        "timing": "11:00 AM - 11:00 PM",
        "fee": "₹200 - ₹450 per meal",
        "shortDesc": "Legendary 100-year-old vegetarian culinary destination that migrated from Sheikhupura in 1947, famous for slow-simmered Maa Ki Dal.",
        "tip": "Order the thali with their signature layered Lachha Paratha and gulab jamuns."
      }
    ]
  },
  {
    "id": "shimla",
    "name": "Shimla",
    "state": "Himachal Pradesh",
    "zone": "North",
    "coordinates": [
      31.1048,
      77.1734
    ],
    "tagline": "The Queen of Hills and historic summer capital of the British Raj.",
    "heroImage": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "March to June (Pleasant) & Dec to Feb (Snow)",
    "bestDuration": "2-3 Days",
    "climate": "Crisp alpine mountain air with snow-dusted pine forests in winter",
    "overview": "Nestled in the southwestern ranges of the Himalayas at 2,200 meters altitude, Shimla boasts neo-Gothic colonial architecture, pedestrianized promenades, and panoramic Himalayan vistas.",
    "localFoodSpecialties": [
      {
        "name": "Himachali Dham Thali",
        "desc": "Traditional festive meal of Madra (chickpeas in spiced yoghurt), Khatta, and Meetha Chawal.",
        "place": "Himachali Rasoi, Middle Bazaar"
      },
      {
        "name": "Steaming Momos & Thukpa",
        "desc": "Tibetan hand-wrapped dumplings served with fiery garlic chili dip in the mountain cold.",
        "place": "Aunty’s Kitchen, The Mall"
      },
      {
        "name": "Apple Crumble & Cinnamon Pie",
        "desc": "Freshly baked pies made with locally harvested Kinnaur apples.",
        "place": "Wake & Bake Cafe, The Ridge"
      }
    ],
    "places": [
      {
        "id": "shimla-ridge",
        "name": "The Ridge & Christ Church",
        "category": "heritage",
        "coordinates": [
          31.1042,
          77.175
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Spacious open esplanade offering unobstructed views of snow-clad Himalayan peaks, centered around northern India’s second-oldest church.",
        "tip": "Stroll during sunset when Christ Church’s stained-glass windows are illuminated against twilight mountain skies."
      },
      {
        "id": "shimla-jakhoo",
        "name": "Jakhoo Temple & Giant Hanuman Statue",
        "category": "temples",
        "coordinates": [
          31.1011,
          77.185
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "7:00 AM - 8:00 PM",
        "fee": "Free (Ropeway ₹500 roundtrip)",
        "shortDesc": "Ancient hilltop shrine on Shimla’s highest peak (2,455 m), crowned by a colossal 108-foot orange Hanuman statue.",
        "tip": "Take the scenic Jakhoo Ropeway from The Ridge; keep eyeglasses and snacks inside bags as monkeys roam the path."
      },
      {
        "id": "shimla-viceregal-lodge",
        "name": "Viceregal Lodge (Rashtrapati Niwas)",
        "category": "museums",
        "coordinates": [
          31.1031,
          77.1408
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹40 (Indians) / ₹85 (Foreigners)",
        "shortDesc": "Majestic Jacobethan-style stone estate designed by Henry Irwin that served as the summer headquarters of British viceroys.",
        "tip": "Explore the manicured botanical gardens featuring rare Himalayan cedar and botanical plantings."
      },
      {
        "id": "shimla-kalka-toy-train",
        "name": "Kalka-Shimla UNESCO Mountain Railway",
        "category": "scenic",
        "coordinates": [
          31.103,
          77.168
        ],
        "image": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
        "timing": "Multiple departures daily",
        "fee": "₹70 - ₹500 depending on train class",
        "shortDesc": "Historic narrow-gauge railway opened in 1903 traversing 102 tunnels, 864 bridges, and deep pine valleys.",
        "tip": "Book tickets well in advance on IRCTC to secure window seats for breathtaking ravine photography."
      }
    ]
  },
  {
    "id": "rishikesh",
    "name": "Rishikesh",
    "state": "Uttarakhand",
    "zone": "North",
    "coordinates": [
      30.0869,
      78.2676
    ],
    "tagline": "Yoga capital of the world where the emerald Ganges tumbles from the Himalayas.",
    "heroImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "September to November & March to May",
    "bestDuration": "2-3 Days",
    "climate": "Fresh Himalayan breeze with rushing turquoise waters and serene ashram courtyards",
    "overview": "Famed globally as the gateway to the Garhwal Himalayas and the birthplace of yoga. Where sadhus meditate by the emerald river, adventure seekers brave class IV river rapids, and evening aartis light up riverbanks.",
    "localFoodSpecialties": [
      {
        "name": "Ayurvedic Thali & Herbal Teas",
        "desc": "Wholesome organic sattvic food with freshly pressed sesame oil and turmeric ginger tea.",
        "place": "Ayurpak & Little Buddha Cafe"
      },
      {
        "name": "Aloo Poori & Chotiwala Thali",
        "desc": "Fluffy golden fried pooris with spiced Garhwali potato curry.",
        "place": "Chotiwala, Swarg Ashram"
      },
      {
        "name": "Wood-Fired Neapolitan Pizza",
        "desc": "Fresh mozzarella and Himalayan basil thin-crust pizza overlooking the river.",
        "place": "Beatles Cafe & Bistro Nirvana"
      }
    ],
    "places": [
      {
        "id": "rishikesh-lakshman-jhula",
        "name": "Lakshman Jhula & Suspension Bridges",
        "category": "heritage",
        "coordinates": [
          30.1245,
          78.3292
        ],
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Iconic 450-foot iron suspension bridge spanning the emerald Ganges, connecting ashrams and temple spires.",
        "tip": "Cross over to the Ram Jhula and Janaki Jhula side during late afternoon for breathtaking river reflections."
      },
      {
        "id": "rishikesh-triveni-ghat",
        "name": "Triveni Ghat Evening Maha Aarti",
        "category": "temples",
        "coordinates": [
          30.103,
          78.2975
        ],
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 PM - 7:00 PM Daily",
        "fee": "Free",
        "shortDesc": "Confluence point of Ganga, Yamuna, and Saraswati rivers, renowned for synchronized conch shells and floating leaf lamps.",
        "tip": "Release a floating flower diya onto the current to make a traditional river prayer."
      },
      {
        "id": "rishikesh-beatles-ashram",
        "name": "The Beatles Ashram (Chaurasi Kutia)",
        "category": "museums",
        "coordinates": [
          30.113,
          78.314
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 4:00 PM",
        "fee": "₹150 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "Former Maharishi Mahesh Yogi ashram where the Beatles composed the White Album in 1968, filled with vibrant graffiti art.",
        "tip": "Wander inside the stone meditation domes (kutiyas) and the graffiti cathedral hall."
      },
      {
        "id": "rishikesh-neer-garh",
        "name": "Neer Garh Waterfalls",
        "category": "scenic",
        "coordinates": [
          30.145,
          78.342
        ],
        "image": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
        "timing": "8:00 AM - 6:00 PM",
        "fee": "₹30 entry",
        "shortDesc": "Multi-tiered natural limestone waterfall tumbling into turquoise natural plunge pools hidden within tropical forest.",
        "tip": "Hike 20 minutes past the lower pool to reach the quieter, crystalline upper swimming pool."
      }
    ]
  },
  {
    "id": "srinagar",
    "name": "Srinagar",
    "state": "Jammu & Kashmir",
    "zone": "North",
    "coordinates": [
      34.0837,
      74.7973
    ],
    "tagline": "Paradise on Earth with ornate cedar houseboats and Mughal terraced gardens.",
    "heroImage": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "April to October (Pleasant) & Dec to Feb (Snow)",
    "bestDuration": "3-4 Days",
    "climate": "Cool alpine mountain paradise with crisp mornings and blooming tulip meadows",
    "overview": "Set along the banks of the Jhelum River in the Kashmir Valley. World-famous for carved pinewood houseboats on Dal Lake, floating vegetable markets, terraced Mughal gardens, and delicate pashmina shawls.",
    "localFoodSpecialties": [
      {
        "name": "Kashmiri Wazwan Feast",
        "desc": "Royally crafted multi-course banquet of Rogan Josh, Rista, and yogurt-based Gushtaba.",
        "place": "Ahdoos Restaurant & Mughal Darbar, Residency Road"
      },
      {
        "name": "Kahwa & Bakarkhani",
        "desc": "Aromatic green tea brewed with saffron strands, whole cinnamon, and crushed almonds.",
        "place": "Chai Jaai, The Bund"
      },
      {
        "name": "Tujji (Charcoal Seekh Kebabs)",
        "desc": "Skewered barbecue meat served with five vibrant walnut and mint chutneys and fresh lavasa bread.",
        "place": "Khayam Chowk Barbecue Lane"
      }
    ],
    "places": [
      {
        "id": "srinagar-dal-lake",
        "name": "Dal Lake & Shikara Wooden Ride",
        "category": "scenic",
        "coordinates": [
          34.09,
          74.845
        ],
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 AM - 9:00 PM",
        "fee": "₹700 - ₹1,200 per hour for private shikara",
        "shortDesc": "18-sq-km crystalline mirror lake surrounded by snow-capped Pir Panjal peaks, lotus gardens, and cedar wood houseboats.",
        "tip": "Take a dawn 5:30 AM shikara ride to the floating vegetable market where trade takes place entirely boat-to-boat."
      },
      {
        "id": "srinagar-shalimar-bagh",
        "name": "Shalimar Bagh Mughal Gardens",
        "category": "heritage",
        "coordinates": [
          34.148,
          74.872
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 7:00 PM",
        "fee": "₹24 (Indians) / ₹100 (Foreigners)",
        "shortDesc": "Finest terraced royal garden built in 1619 by Emperor Jahangir for his queen Nur Jahan, featuring black marble pavilions and water canals.",
        "tip": "Stroll under the towering 400-year-old Chinar trees; in autumn (October-November) their leaves glow ruby red."
      },
      {
        "id": "srinagar-shankaracharya",
        "name": "Shankaracharya Shiva Temple",
        "category": "temples",
        "coordinates": [
          34.072,
          74.848
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "7:00 AM - 8:00 PM",
        "fee": "Free",
        "shortDesc": "Ancient 9th-century stone temple perched 1,000 feet above the valley floor on Gopadri Hill, visited by Adi Shankara.",
        "tip": "Climb the 243 stone steps for the most spectacular 360-degree aerial view of Srinagar city and Dal Lake."
      },
      {
        "id": "srinagar-sps-museum",
        "name": "Sri Pratap Singh (SPS) Museum",
        "category": "museums",
        "coordinates": [
          34.0665,
          74.821
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 4:30 PM (Mondays Closed)",
        "fee": "₹20 (Indians) / ₹100 (Foreigners)",
        "shortDesc": "Museum exhibiting 2nd-century Harwan terracotta tiles, antique papier-mâché, and rare Mughal copperware.",
        "tip": "Don’t miss the medieval Buddhist sculpture gallery from the Ladakh and Kashmir borderlands."
      }
    ]
  },
  {
    "id": "kochi",
    "name": "Kochi (Cochin)",
    "state": "Kerala",
    "zone": "South",
    "coordinates": [
      9.9674,
      76.2429
    ],
    "tagline": "Queen of the Arabian Sea with Portuguese colonial alleys and tranquil backwaters.",
    "heroImage": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (23°C - 31°C)",
    "bestDuration": "2-3 Days",
    "climate": "Tropical coastal breeze with gentle humidity and golden sunsets over the sea",
    "overview": "A historic spice trade harbor where Arab, Chinese, Portuguese, Dutch, and British merchants converged for over six centuries. Today, Fort Kochi charms travelers with giant cantilevered Chinese fishing nets, colonial bungalow cafes, spice warehouses, and Kathakali theatres.",
    "localFoodSpecialties": [
      {
        "name": "Kerala Seafood Moilee & Appam",
        "desc": "Mild coconut milk fish curry with spongy fermented rice hoppers.",
        "place": "Oceanos Restaurant, Elphinstone Road"
      },
      {
        "name": "Kochi Parotta & Roast",
        "desc": "Flaky layered Kerala parotta served with caramelized onion and black pepper roast.",
        "place": "Kayees Rahmathulla Hotel, Mattancherry"
      },
      {
        "name": "Artisan Cold Brew & Carrot Cake",
        "desc": "Organic South Indian plantation roast with homemade fresh pastries in an art gallery courtyard.",
        "place": "Kashi Art Cafe, Burgher Street"
      }
    ],
    "places": [
      {
        "id": "kochi-fishing-nets",
        "name": "Chinese Cantilevered Fishing Nets (Cheena Vala)",
        "category": "scenic",
        "coordinates": [
          9.9692,
          76.2411
        ],
        "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        "timing": "Sunrise to Sunset",
        "fee": "Free to observe",
        "shortDesc": "Iconic 14th-century cantilevered sea nets introduced by Chinese trader Zheng He, operated with teak counterweights.",
        "tip": "Best silhouette photography is during golden hour sunset around 5:45 PM from Vasco da Gama Square."
      },
      {
        "id": "kochi-mattancherry",
        "name": "Mattancherry Palace (Dutch Palace)",
        "category": "heritage",
        "coordinates": [
          9.9583,
          76.2592
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:45 AM - 4:45 PM (Fridays Closed)",
        "fee": "₹5 entry",
        "shortDesc": "Portuguese-built palace gifted to the Raja of Kochi in 1555, featuring intricate tempera murals illustrating the Ramayana.",
        "tip": "Examine the royal bedroom ceiling with carved lotus wood reliefs and natural herbal pigment paintings."
      },
      {
        "id": "kochi-st-francis",
        "name": "St. Francis Church & Vasco Tomb",
        "category": "heritage",
        "coordinates": [
          9.9658,
          76.2413
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "7:00 AM - 6:30 PM",
        "fee": "Free",
        "shortDesc": "Oldest European church in India built in 1503 by Portuguese Franciscan friars, original burial site of explorer Vasco da Gama.",
        "tip": "Observe the original rope-operated cloth fans (punkahs) suspended from the church nave."
      },
      {
        "id": "kochi-synagogue",
        "name": "Paradesi Jewish Synagogue & Jew Town",
        "category": "heritage",
        "coordinates": [
          9.9575,
          76.2597
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Fridays & Saturdays restricted)",
        "fee": "₹10 entry",
        "shortDesc": "Constructed in 1568, containing hand-painted blue Cantonese willow porcelain floor tiles and Belgian glass chandeliers.",
        "tip": "Explore Jew Town Road immediately outside for antique spice grinders, brass lamps, and teak furniture."
      },
      {
        "id": "kochi-kathakali",
        "name": "Kerala Kathakali Centre",
        "category": "museums",
        "coordinates": [
          9.966,
          76.244
        ],
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 PM Makeup / 6:00 PM - 7:30 PM Performance Daily",
        "fee": "₹400 - ₹500",
        "shortDesc": "Intimate theater dedicated to the classical dance-drama of Kerala, featuring intricate face makeup and martial art demonstrations.",
        "tip": "Arrive at 5:00 PM to watch the master performers transform using herbal ground mineral face paints."
      }
    ]
  },
  {
    "id": "madurai",
    "name": "Madurai",
    "state": "Tamil Nadu",
    "zone": "South",
    "coordinates": [
      9.9252,
      78.1198
    ],
    "tagline": "The Athens of the East centered around the towering gopurams of Meenakshi Temple.",
    "heroImage": "https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (20°C - 30°C)",
    "bestDuration": "1-2 Days",
    "climate": "Warm tropical climate with fragrant jasmine breeze and temple chimes",
    "overview": "Continuously inhabited for over 2,500 years as the ancient seat of the Pandya kings. Planned in concentric squares around the magnificent Meenakshi Sundareswarar Temple.",
    "localFoodSpecialties": [
      {
        "name": "Madurai Kari Dosa",
        "desc": "Thick three-layered dosa topped with omelette and spicy minced mutton gravy.",
        "place": "Simmakkal Konar Mess"
      },
      {
        "name": "Jigarthanda",
        "desc": "Iconic iced dessert drink made with condensed milk, almond tree gum, and nannari syrup.",
        "place": "Famous Jigarthanda, East Marret Street"
      },
      {
        "name": "Bun Parotta",
        "desc": "Fluffy layered bun-shaped parotta fried in ghee with fiery chicken salna.",
        "place": "Madurai Bun Parotta Stalls"
      }
    ],
    "places": [
      {
        "id": "madurai-meenakshi",
        "name": "Arulmigu Meenakshi Sundareswarar Temple",
        "category": "temples",
        "coordinates": [
          9.9195,
          78.1193
        ],
        "image": "https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 AM - 12:30 PM & 4:00 PM - 10:00 PM",
        "fee": "Free (Hall of Thousand Pillars ₹50)",
        "shortDesc": "Architectural masterpiece with 14 towering gateway gopurams encrusted with 33,000 brightly painted mythological sculptures.",
        "tip": "Attend the 9:00 PM Palliarai Pooja procession where Lord Sundareswarar is carried to Goddess Meenakshi’s chamber."
      },
      {
        "id": "madurai-thirumalai-nayak",
        "name": "Thirumalai Nayakkar Mahal",
        "category": "heritage",
        "coordinates": [
          9.915,
          78.1235
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM (Light & Sound Show 6:45 PM)",
        "fee": "₹10 (Indians) / ₹50 (Foreigners)",
        "shortDesc": "17th-century palace built by King Thirumalai Nayak, famous for giant circular white stucco pillars over 80 feet high.",
        "tip": "Look up at the painted celestial dome in the main Swarga Vilasam audience hall."
      },
      {
        "id": "madurai-gandhi-museum",
        "name": "Gandhi Memorial Museum",
        "category": "museums",
        "coordinates": [
          9.932,
          78.141
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 1:00 PM & 2:00 PM - 5:45 PM",
        "fee": "Free",
        "shortDesc": "Housed in the historic Rani Mangammal Palace, preserving Mahatma Gandhi’s bloodstained dhoti worn during his 1948 assassination.",
        "tip": "Madurai is where Gandhi adopted the simple loincloth in 1921 to identify with the poor."
      },
      {
        "id": "madurai-teppakulam",
        "name": "Vandiyur Mariamman Teppakulam",
        "category": "scenic",
        "coordinates": [
          9.912,
          78.156
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "Open all day",
        "fee": "Free",
        "shortDesc": "Colossal rectangular temple tank fed by underground channels from Vaigai River, centered around a mandapam island.",
        "tip": "Visit in January-February during the Float Festival (Teppam) when the entire tank is illuminated with thousands of oil lamps."
      }
    ]
  },
  {
    "id": "mysuru",
    "name": "Mysuru (Mysore)",
    "state": "Karnataka",
    "zone": "South",
    "coordinates": [
      12.2958,
      76.6394
    ],
    "tagline": "The royal heritage city of sandalwood, silk, and illuminated palaces.",
    "heroImage": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (18°C - 28°C)",
    "bestDuration": "2 Days",
    "climate": "Moderate, breezy, and pleasant year-round thanks to Chamundi Hill topography",
    "overview": "Former capital of the Wodeyar dynasty for over five centuries. Renowned for grand Indo-Saracenic palace architecture, fragrant sandalwood incense markets, Mysore silk sarees, and royal Dasara celebrations.",
    "localFoodSpecialties": [
      {
        "name": "Mysore Masala Dosa",
        "desc": "Crisp buttery red rice crepe spread with spicy red garlic chili chutney, stuffed with potato mash.",
        "place": "Mylari Restaurant, Nazarbad"
      },
      {
        "name": "Authentic Mysore Pak",
        "desc": "Warm fudge sweet crafted from chickpea flour, sugar, and generous pure desi ghee that melts on the tongue.",
        "place": "Guru Sweets, Sayyaji Rao Road"
      },
      {
        "name": "Mysore Filter Coffee",
        "desc": "Strong chicory decoction foamed with hot buffalo milk in traditional steel tumbler and dabarah.",
        "place": "Hotel Nalpak, Vani Vilas Road"
      }
    ],
    "places": [
      {
        "id": "mysore-palace",
        "name": "Mysore Palace (Amba Vilas)",
        "category": "heritage",
        "coordinates": [
          12.3052,
          76.6552
        ],
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:30 PM (Illumination Sundays 7:00 PM - 7:45 PM)",
        "fee": "₹100 (Indians) / ₹200 (Foreigners)",
        "shortDesc": "Indo-Saracenic palace designed by Henry Irwin, illuminated by 97,000 golden incandescent bulbs every Sunday evening.",
        "tip": "Stand in front of the main gate at exactly 7:00 PM on Sunday to watch all 97,000 bulbs switch on simultaneously."
      },
      {
        "id": "mysore-chamundeshwari",
        "name": "Chamundeshwari Temple & Nandi Bull",
        "category": "temples",
        "coordinates": [
          12.2725,
          76.671
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "7:30 AM - 2:00 PM & 3:30 PM - 6:00 PM",
        "fee": "Free (Special Darshan ₹100)",
        "shortDesc": "Ancient hill temple dedicated to Goddess Durga perched atop Chamundi Hills (1,062 m), featuring a 16-foot monolithic Nandi bull.",
        "tip": "Climb or drive halfway down the hill to admire the 350-year-old single-rock Nandi monolith."
      },
      {
        "id": "mysore-brindavan",
        "name": "Brindavan Gardens & KRS Dam",
        "category": "scenic",
        "coordinates": [
          12.423,
          76.572
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "6:30 AM - 9:00 PM (Musical Fountain 6:30 PM - 8:00 PM)",
        "fee": "₹50 entry",
        "shortDesc": "Terraced formal gardens below Krishna Raja Sagara dam modeled after the Shalimar Gardens of Kashmir, famous for musical water fountain.",
        "tip": "Arrive around 5:30 PM to explore the rose gardens before the musical synchronized water fountain begins."
      },
      {
        "id": "mysore-jaganmohan",
        "name": "Jaganmohan Palace Art Gallery",
        "category": "museums",
        "coordinates": [
          12.3075,
          76.6495
        ],
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "timing": "8:30 AM - 5:30 PM",
        "fee": "₹50 (Adults) / ₹25 (Children)",
        "shortDesc": "Original royal residence housing one of the largest art collections in South India, including master oil paintings by Raja Ravi Varma.",
        "tip": "Seek out the iconic painting \"Glow of Hope\" (Lady with the Lamp) by S.L. Haldankar displayed in a dark chamber."
      }
    ]
  },
  {
    "id": "hyderabad",
    "name": "Hyderabad",
    "state": "Telangana",
    "zone": "South",
    "coordinates": [
      17.385,
      78.4867
    ],
    "tagline": "City of Pearls and Nizams, where cyber towers meet medieval granite citadels.",
    "heroImage": "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to February (15°C - 28°C)",
    "bestDuration": "2-3 Days",
    "climate": "Pleasant winter weather ideal for exploring sprawling fortresses and culinary bazaars",
    "overview": "Founded in 1591 by Muhammad Quli Qutb Shah. Hyderabad merges 400 years of Qutb Shahi and Asaf Jahi architectural glory with modern technological innovation. Renowned worldwide for Dum Biryani, natural pearls, and the Golconda diamond mines.",
    "localFoodSpecialties": [
      {
        "name": "Hyderabadi Dum Biryani",
        "desc": "Fragrant basmati rice slow-cooked on dum with marinated mutton, saffron, and fried onions.",
        "place": "Paradise Food Court & Cafe Bahar"
      },
      {
        "name": "Haleem & Irani Chai",
        "desc": "Velvety wheat and meat stew slow-cooked for 8 hours, followed by sweet condensed milk Irani tea with Osmania biscuits.",
        "place": "Pista House & Nimrah Cafe, Charminar"
      },
      {
        "name": "Double Ka Meetha & Qubani Ka Meetha",
        "desc": "Royal bread pudding with saffron cream, and slow-stewed dried apricots with clotted cream.",
        "place": "Shah Ghouse, Gachibowli"
      }
    ],
    "places": [
      {
        "id": "hyderabad-charminar",
        "name": "The Charminar & Laad Bazaar",
        "category": "heritage",
        "coordinates": [
          17.3616,
          78.4747
        ],
        "image": "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=800&q=80",
        "timing": "9:30 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "1591 CE monumental arch with four 56-meter minarets, built to commemorate the eradication of plague in the city.",
        "tip": "Walk through Laad Bazaar right next door to shop for traditional lacquer bangles and pearls."
      },
      {
        "id": "hyderabad-golconda",
        "name": "Golconda Fort & Acoustic Chambers",
        "category": "heritage",
        "coordinates": [
          17.3833,
          78.4011
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:30 PM (Sound & Light Show 6:30 PM)",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Impregnable granite fortress once controlling the world’s only diamond trade (producing Koh-i-Noor and Hope diamonds).",
        "tip": "Clap your hands beneath the dome of the Fateh Darwaza entry port; the sound travels 1 km up to the hilltop Bala Hissar pavilion."
      },
      {
        "id": "hyderabad-salar-jung",
        "name": "Salar Jung Museum",
        "category": "museums",
        "coordinates": [
          17.3713,
          78.4804
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Fridays Closed)",
        "fee": "₹50 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "One of the world’s largest one-man art collections, featuring the famous double-sided wooden sculpture of Mephistopheles and Margaretta.",
        "tip": "Gather in the main courtyard five minutes before any hour to watch the mechanical musical 19th-century clock chime."
      },
      {
        "id": "hyderabad-birla-mandir",
        "name": "Birla Mandir (Venkateswara Temple)",
        "category": "temples",
        "coordinates": [
          17.4062,
          78.4691
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "7:00 AM - 12:00 PM & 3:00 PM - 9:00 PM",
        "fee": "Free",
        "shortDesc": "Built entirely from 2,000 tons of pure white Rajasthani marble atop the 280-foot Naubat Pahad hill overlooking Hussain Sagar.",
        "tip": "No mobile phones or bags allowed inside; enjoy the serene twilight panoramic views of the illuminated city below."
      },
      {
        "id": "hyderabad-hussain-sagar",
        "name": "Hussain Sagar Lake & Buddha Monolith",
        "category": "scenic",
        "coordinates": [
          17.4239,
          78.4738
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "8:00 AM - 10:00 PM",
        "fee": "Free (Boat to Buddha statue ₹100)",
        "shortDesc": "Heart-shaped 16th-century lake centered around the world’s tallest single-rock monolithic Buddha statue (18 meters tall).",
        "tip": "Take an evening speedboat ride from Lumbini Park to the central island for illuminated night photography."
      }
    ]
  },
  {
    "id": "hampi",
    "name": "Hampi",
    "state": "Karnataka",
    "zone": "South",
    "coordinates": [
      15.335,
      76.46
    ],
    "tagline": "Surreal granite boulder landscape and ruins of the medieval Vijayanagara Empire.",
    "heroImage": "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "November to February (16°C - 30°C)",
    "bestDuration": "2-3 Days",
    "climate": "Dry sunny days ideal for renting a bicycle and exploring sprawling stone ruins",
    "overview": "A UNESCO World Heritage marvel, Hampi was the second-largest city in the medieval world after Beijing. Nestled amidst towering ochre granite boulders and the sparkling Tungabhadra River, its monolithic temples and musical pillars leave travellers spellbound.",
    "localFoodSpecialties": [
      {
        "name": "South Indian Banana Leaf Thali",
        "desc": "Unlimited rice, piping hot sambar, rasam, kootu, and crispy papad with ghee.",
        "place": "Mango Tree Restaurant, Hampi Bazaar"
      },
      {
        "name": "Filter Coffee & Thatte Idli",
        "desc": "Steaming plate-sized spongy idlis with coconut chutney and fresh chicory filter coffee.",
        "place": "Udupi Sri Krishna Bhavan"
      }
    ],
    "places": [
      {
        "id": "hampi-virupaksha",
        "name": "Virupaksha Temple Complex",
        "category": "temples",
        "coordinates": [
          15.3358,
          76.4602
        ],
        "image": "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 1:00 PM & 5:00 PM - 9:00 PM",
        "fee": "₹25 entry",
        "shortDesc": "The oldest functioning Shiva temple in Hampi with a 50-meter gopuram tower, active since the 7th century CE.",
        "tip": "Check out the pinhole camera effect inside the dark chamber where the gopuram shadow reflects inverted on the wall."
      },
      {
        "id": "hampi-stone-chariot",
        "name": "Vittala Temple & Stone Chariot",
        "category": "heritage",
        "coordinates": [
          15.3392,
          76.4746
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "8:30 AM - 5:30 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "Iconic stone chariot dedicated to Garuda (depicted on the Indian ₹50 note) and 56 musical pillars.",
        "tip": "Take an electric cart from the parking zone or walk the 1.2 km riverside trail along ancient stone bazaars."
      },
      {
        "id": "hampi-matanga",
        "name": "Matanga Hill Sunrise Viewpoint",
        "category": "scenic",
        "coordinates": [
          15.3325,
          76.467
        ],
        "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7 (Climb before 5:45 AM)",
        "fee": "Free",
        "shortDesc": "Highest point in central Hampi offering a 360-degree panorama of boulder fields and river bend.",
        "tip": "Wear sturdy sports shoes; the 25-minute rocky step hike requires good footing in the dark."
      },
      {
        "id": "hampi-sanapur",
        "name": "Sanapur Lake & Coracle Rides",
        "category": "scenic",
        "coordinates": [
          15.362,
          76.442
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "timing": "7:00 AM - 6:00 PM",
        "fee": "Free (Coracle ride ₹300 - ₹500)",
        "shortDesc": "Tranquil reservoir surrounded by gigantic granite boulders on the Hippie Island side of the Tungabhadra.",
        "tip": "Experience a circular bamboo coracle boat ride that spins smoothly on the lake water."
      }
    ]
  },
  {
    "id": "mahabalipuram",
    "name": "Mahabalipuram (Mamallapuram)",
    "state": "Tamil Nadu",
    "zone": "South",
    "coordinates": [
      12.6269,
      80.1927
    ],
    "tagline": "UNESCO monolithic rock-cut cave sanctuaries and oceanfront shore temples.",
    "heroImage": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "November to February (21°C - 30°C)",
    "bestDuration": "1-2 Days",
    "climate": "Coastal sea breeze with gentle winter sunshine and rhythmic ocean waves",
    "overview": "7th-century port city of the Pallava dynasty on the Coromandel Coast of the Bay of Bengal. Famous for seaside monolithic rock-cut cave temples, open-air bas-reliefs, and sculptors carving granite by hand.",
    "localFoodSpecialties": [
      {
        "name": "Coromandel Grilled Sea Prawns & Crab",
        "desc": "Fresh seafood marinated in crushed curry leaves, black pepper, and lime.",
        "place": "Moonrakers & Seashore Restaurant"
      },
      {
        "name": "Crispy Ghee Podi Dosa",
        "desc": "Golden crepe sprinkled with spicy gunpowder lentil powder and clarified butter.",
        "place": "Mamalla Bhavan, South Mada Street"
      }
    ],
    "places": [
      {
        "id": "mahabalipuram-shore-temple",
        "name": "The Shore Temple",
        "category": "heritage",
        "coordinates": [
          12.6163,
          80.1983
        ],
        "image": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "Structural granite temple built in 700-728 CE directly overlooking the breaking waves of the Bay of Bengal.",
        "tip": "Visit right at dawn to see the sunrise cast golden reflections across the stone Shiva spires."
      },
      {
        "id": "mahabalipuram-pancha-rathas",
        "name": "Pancha Rathas (Five Chariots)",
        "category": "heritage",
        "coordinates": [
          12.6094,
          80.1945
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "Included with Shore Temple ticket",
        "shortDesc": "Five monolithic rock shrines carved from a single outcropping of granite, each styled as a chariot named after the Pandavas.",
        "tip": "Look closely at the life-sized monolithic elephant carved out of the same rock bedrock."
      },
      {
        "id": "mahabalipuram-arjuna-penance",
        "name": "Arjuna’s Penance (Descent of the Ganges)",
        "category": "heritage",
        "coordinates": [
          12.6178,
          80.1925
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "World’s largest open-air rock relief measuring 96 by 43 feet, depicting celestial beings, elephants, and monkeys.",
        "tip": "Notice the natural cleft down the center of the rock that was engineered to channel water like the descent of the Ganga."
      },
      {
        "id": "mahabalipuram-butterball",
        "name": "Krishna’s Butterball",
        "category": "scenic",
        "coordinates": [
          12.6186,
          80.192
        ],
        "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "Free",
        "shortDesc": "Gigantic 250-ton granite boulder balancing precariously on a 45-degree smooth rock slope for over 1,200 years.",
        "tip": "Try taking the classic perspective photo pretending to hold up or push the massive balancing boulder."
      }
    ]
  },
  {
    "id": "bengaluru",
    "name": "Bengaluru (Bangalore)",
    "state": "Karnataka",
    "zone": "South",
    "coordinates": [
      12.9716,
      77.5946
    ],
    "tagline": "The Garden City and dynamic Silicon Valley of India.",
    "heroImage": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "September to March (16°C - 28°C)",
    "bestDuration": "2 Days",
    "climate": "Temperate and pleasant year-round with cool breezes and green tree-canopied avenues",
    "overview": "From the summer fortress of Tipu Sultan and Tudor-style royal palaces to sprawling botanical gardens and vibrant microbrewery streets, Bengaluru seamlessly blends classical Karnataka heritage with modern innovation.",
    "localFoodSpecialties": [
      {
        "name": "Benne Masala Dosa",
        "desc": "Crispy butter-infused fermented rice crepe with spiced potato filling and fresh coconut chutney.",
        "place": "Vidyarthi Bhavan, Gandhi Bazaar"
      },
      {
        "name": "Rava Idli & Filter Kaapi",
        "desc": "Semolina steamed cakes with mustard seeds, served with pure chicory filter coffee.",
        "place": "Mavalli Tiffin Room (MTR), Lalbagh"
      },
      {
        "name": "Craft Brews & Pub Grub",
        "desc": "Fresh seasonal mango wheat beer and woodfired sourdough pizzas.",
        "place": "Toit, Indiranagar"
      }
    ],
    "places": [
      {
        "id": "bengaluru-palace",
        "name": "Bangalore Palace",
        "category": "heritage",
        "coordinates": [
          12.9988,
          77.5921
        ],
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:30 PM",
        "fee": "₹250 (Indians) / ₹450 (Foreigners)",
        "shortDesc": "19th-century Tudor-style royal palace featuring fortified towers, battlements, and Spanish stained-glass windows.",
        "tip": "Listen to the audio guide to hear about the royal family’s Maharaja Chamarajendra Wadiyar X."
      },
      {
        "id": "bengaluru-lalbagh",
        "name": "Lalbagh Botanical Garden & Glass House",
        "category": "scenic",
        "coordinates": [
          12.9507,
          77.5848
        ],
        "image": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 7:00 PM",
        "fee": "₹30 entry",
        "shortDesc": "240-acre botanical haven commissioned by Hyder Ali in 1760, home to centuries-old trees and a London Crystal Palace replica.",
        "tip": "Visit the 3-billion-year-old Lalbagh rock outcropping for sunset skyline views over Bengaluru."
      },
      {
        "id": "bengaluru-bull-temple",
        "name": "Dodda Basavana Gudi (Bull Temple)",
        "category": "temples",
        "coordinates": [
          12.9424,
          77.5681
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 8:00 PM",
        "fee": "Free",
        "shortDesc": "16th-century Vijayanagara shrine housing a colossal 4.5-meter monolithic Nandi bull carved from single granite.",
        "tip": "Every November, the famous Kadalekai Parishe (Groundnut Fair) surrounds the temple with festive farmer stalls."
      },
      {
        "id": "bengaluru-cubbon-park",
        "name": "Cubbon Park & Vidhana Soudha",
        "category": "scenic",
        "coordinates": [
          12.9763,
          77.5929
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 7:00 PM",
        "fee": "Free",
        "shortDesc": "300-acre green lung in central Bengaluru adjacent to the majestic neo-Dravidian state legislature Vidhana Soudha.",
        "tip": "Visit on Sunday morning when traffic is prohibited and the park transforms into a community haven for dog lovers and cyclists."
      }
    ]
  },
  {
    "id": "munnar",
    "name": "Munnar",
    "state": "Kerala",
    "zone": "South",
    "coordinates": [
      10.0889,
      77.0595
    ],
    "tagline": "Rolling emerald tea plantations and misty Western Ghats mountain summits.",
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "September to March (10°C - 22°C)",
    "bestDuration": "2-3 Days",
    "climate": "Cool, crisp mountain air with blanket mists, gushing waterfalls, and tea scents",
    "overview": "Perched at 1,600 meters at the confluence of three mountain streams (Mudhirapuzha, Nallathanni, and Kundaly). Famous for sprawling carpet-like tea estates, endangered Nilgiri Tahr mountain goats, and colonial hill stations.",
    "localFoodSpecialties": [
      {
        "name": "Kerala Spiced Fish Fry & Kappa",
        "desc": "Fresh mountain catch rubbed with crushed red chilies and served with boiled tapioca.",
        "place": "Rapsy Restaurant, Main Bazaar"
      },
      {
        "name": "Fresh Cardamom Tea & Banana Fritters",
        "desc": "Piping hot tea made with plantation-fresh green cardamom, served with sweet Pazham Pori.",
        "place": "Tea Valley Shacks"
      }
    ],
    "places": [
      {
        "id": "munnar-tea-gardens",
        "name": "Eravikulam National Park (Rajamalai)",
        "category": "scenic",
        "coordinates": [
          10.15,
          77.06
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "timing": "7:30 AM - 4:00 PM",
        "fee": "₹200 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Sanctuary for the rare endangered Nilgiri Tahr mountain goat, featuring rolling shola grasslands and views of Anamudi peak.",
        "tip": "Book safari bus tickets online in advance; the park closes for two months during calving season (Feb-March)."
      },
      {
        "id": "munnar-tea-museum",
        "name": "KDHP Tata Tea Museum",
        "category": "museums",
        "coordinates": [
          10.093,
          77.052
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹125 entry (includes tea tasting session)",
        "shortDesc": "Historic tea factory tracing the evolution of tea plantations in Munnar since 1876 with live tea processing demos.",
        "tip": "Attend the tea tasting room session to distinguish subtle nuances between white, green, and orthodox black teas."
      },
      {
        "id": "munnar-mattupetty",
        "name": "Mattupetty Dam & Echo Point",
        "category": "scenic",
        "coordinates": [
          10.106,
          77.124
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM",
        "fee": "₹10 entry (Speedboats ₹500 - ₹1,000)",
        "shortDesc": "Masonry gravity dam nestled within verdant tea hills, famous for still water boating and natural acoustic echo point.",
        "tip": "Shout your name at Echo Point across the misty reservoir to hear your voice rebound three times."
      }
    ]
  },
  {
    "id": "kolkata",
    "name": "Kolkata (Calcutta)",
    "state": "West Bengal",
    "zone": "East",
    "coordinates": [
      22.5726,
      88.3639
    ],
    "tagline": "The Cultural Capital of India, city of colonial grand marble and passionate arts.",
    "heroImage": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (15°C - 26°C)",
    "bestDuration": "3-4 Days",
    "climate": "Pleasant winter breeze with warm golden sunshine and festive spirit",
    "overview": "For 140 years the capital of the British Raj. Kolkata pulses with intellectual heritage, grand Victorian palaces, historic tramcars, Nobel laureates, vibrant coffee houses, and legendary Durga Puja celebrations.",
    "localFoodSpecialties": [
      {
        "name": "Kolkata Kathi Roll",
        "desc": "Flaky paratha layered with egg, tender marinated chicken, onions, and lime.",
        "place": "Nizam’s, New Market"
      },
      {
        "name": "Rosogolla & Sandesh",
        "desc": "Spongy cottage cheese balls simmered in light sugar syrup, and Nolen Gur date palm sandesh.",
        "place": "K.C. Das & Balaram Mullick"
      },
      {
        "name": "Kolkata Mutton Biryani",
        "desc": "Delicate saffron rice cooked with tender meat, soft boiled egg, and melt-in-mouth spiced potato.",
        "place": "Arsalan & Shiraz Golden Restaurant"
      }
    ],
    "places": [
      {
        "id": "kolkata-victoria-memorial",
        "name": "Victoria Memorial Hall",
        "category": "heritage",
        "coordinates": [
          22.5448,
          88.3426
        ],
        "image": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Gardens open 5:30 AM - 6:30 PM)",
        "fee": "₹50 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Grand white Makrana marble monument built between 1906 and 1921, surrounded by 64 acres of landscaped gardens.",
        "tip": "Visit in the late afternoon and sit by the reflection pond as the sunset turns the marble pale gold."
      },
      {
        "id": "kolkata-howrah-bridge",
        "name": "Howrah Bridge (Rabindra Setu)",
        "category": "heritage",
        "coordinates": [
          22.5851,
          88.3468
        ],
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Engineering marvel balanced cantilever bridge spanning the Hooghly River without a single pillar in the riverbed.",
        "tip": "Walk across on foot during sunrise from Howrah station side to witness the vibrant riverside flower market."
      },
      {
        "id": "kolkata-dakshineswar",
        "name": "Dakshineswar Kali Temple",
        "category": "temples",
        "coordinates": [
          22.653,
          88.357
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 12:30 PM & 3:00 PM - 8:30 PM",
        "fee": "Free",
        "shortDesc": "Navaratna-style 19th-century temple complex built by Rani Rashmoni where mystic Ramakrishna Paramahamsa served as priest.",
        "tip": "Take a ferry across the Hooghly River to Belur Math, headquarters of the Ramakrishna Mission."
      },
      {
        "id": "kolkata-indian-museum",
        "name": "The Indian Museum (Jadu Ghar)",
        "category": "museums",
        "coordinates": [
          22.5579,
          88.3511
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹50 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Oldest and largest multipurpose museum in the Asia-Pacific region (founded 1814), housing rare fossils and Egyptian mummies.",
        "tip": "Don’t miss the Gandhara Buddhist sculpture gallery and the genuine 4,000-year-old Egyptian mummy."
      },
      {
        "id": "kolkata-prinsep-ghat",
        "name": "Prinsep Ghat & Hooghly Promenade",
        "category": "scenic",
        "coordinates": [
          22.556,
          88.332
        ],
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        "timing": "Open all day",
        "fee": "Free (Wooden boat ride ₹300 - ₹500)",
        "shortDesc": "Palladian Greek-style columned pavilion on the riverbanks, overlooking the towering Vidyasagar Setu cable-stayed bridge.",
        "tip": "Hire a traditional wooden country boat at sunset for a serene 30-minute cruise under the suspension bridge."
      }
    ]
  },
  {
    "id": "puri",
    "name": "Puri & Konark",
    "state": "Odisha",
    "zone": "East",
    "coordinates": [
      19.8135,
      85.8312
    ],
    "tagline": "Sacred coastal realm of Lord Jagannath and the cosmic Konark Sun Temple chariot.",
    "heroImage": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (18°C - 28°C)",
    "bestDuration": "2-3 Days",
    "climate": "Pleasant oceanic breeze with golden sunrise shores along the Bay of Bengal",
    "overview": "One of the four original Char Dham pilgrimage sanctuaries of Hinduism. Famous for the soaring 12th-century Jagannath Temple, the UNESCO Sun Temple at Konark, and golden surf beaches.",
    "localFoodSpecialties": [
      {
        "name": "Jagannath Temple Mahaprasad (Chappan Bhog)",
        "desc": "56 sacred earthen pot vegetarian preparations cooked using only wood fire and clay pots.",
        "place": "Ananda Bazar inside Jagannath Temple"
      },
      {
        "name": "Puri Khaja",
        "desc": "Multi-layered crispy pastry dipped in pure sugar syrup, crispy and flaky.",
        "place": "Brundaban Khaja Shop, Bada Danda"
      }
    ],
    "places": [
      {
        "id": "puri-jagannath-temple",
        "name": "Shree Jagannath Temple",
        "category": "temples",
        "coordinates": [
          19.8048,
          85.8179
        ],
        "image": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
        "timing": "5:30 AM - 10:00 PM",
        "fee": "Free (Only practicing Hindus permitted inside inner sanctum)",
        "shortDesc": "Sprawling 12th-century Kalinga-style temple dedicated to Lord Jagannath, Balabhadra, and Subhadra, home of the annual Ratha Yatra.",
        "tip": "Observe the mystery of the temple flag (Patitapabana) which always flutters in the opposite direction of the wind."
      },
      {
        "id": "puri-konark-sun-temple",
        "name": "Konark Sun Temple (Black Pagoda)",
        "category": "heritage",
        "coordinates": [
          19.8876,
          86.0945
        ],
        "image": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 8:00 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "UNESCO World Heritage 13th-century chariot temple with 24 carved stone wheels that function as accurate astronomical sundials.",
        "tip": "Hire an authorized ASI guide to decode how the sundial wheels calculate exact minutes using shadows."
      },
      {
        "id": "puri-golden-beach",
        "name": "Puri Golden Beach (Blue Flag Beach)",
        "category": "scenic",
        "coordinates": [
          19.798,
          85.828
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free (Clean certified Blue Flag zone ₹20)",
        "shortDesc": "Certified eco-friendly Blue Flag golden sand beach with safe swimming zones, palm promenades, and evening sand art displays.",
        "tip": "Look for world-renowned sand artist Sudarsan Pattnaik’s intricate sand sculptures created on the shore."
      },
      {
        "id": "puri-raghurajpur",
        "name": "Raghurajpur Heritage Craft Village",
        "category": "museums",
        "coordinates": [
          19.87,
          85.83
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 6:00 PM",
        "fee": "Free",
        "shortDesc": "Artisan village where every family creates ancient Pattachitra scroll paintings, palm leaf engravings, and wooden masks.",
        "tip": "Buy authentic Pattachitra artwork directly from master artists sitting on their painted village verandahs."
      }
    ]
  },
  {
    "id": "darjeeling",
    "name": "Darjeeling",
    "state": "West Bengal",
    "zone": "East",
    "coordinates": [
      27.041,
      88.2663
    ],
    "tagline": "Champagne of Teas amidst views of the world’s third-highest peak.",
    "heroImage": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "March to May (Spring blooms) & Oct to Dec (Clear peaks)",
    "bestDuration": "2-3 Days",
    "climate": "Crisp mountain breezes with panoramic views of snow-clad Kanchenjunga",
    "overview": "Perched at 2,050 meters in the Lesser Himalayas. Famous for aromatic Muscatel-flavor orthodox tea estates, the UNESCO Himalayan Toy Train, colonial cafes, and panoramic dawns over Mt. Kanchenjunga.",
    "localFoodSpecialties": [
      {
        "name": "Darjeeling Steamed Momos",
        "desc": "Delicate flour dumplings stuffed with seasoned chicken or seasonal hill vegetables.",
        "place": "Kunga Restaurant, Gandhi Road"
      },
      {
        "name": "First Flush Darjeeling Tea & Pastries",
        "desc": "World’s most prized amber liquor tea paired with fresh cinnamon rolls and apple tarts.",
        "place": "Glenary’s Bakery & Cafe, Nehru Road"
      }
    ],
    "places": [
      {
        "id": "darjeeling-tiger-hill",
        "name": "Tiger Hill Sunrise over Kanchenjunga",
        "category": "scenic",
        "coordinates": [
          27.001,
          88.283
        ],
        "image": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
        "timing": "4:00 AM - 6:30 AM (Depart hotel at 3:30 AM)",
        "fee": "₹50 - ₹100 for observatory tower",
        "shortDesc": "Famous 2,590-meter viewpoint where dawn sunbeams illuminate the towering peak of Mt. Kanchenjunga in hues of gold.",
        "tip": "Dress warmly in heavy woolens; pre-book your shared taxi the previous evening."
      },
      {
        "id": "darjeeling-batasia-loop",
        "name": "Batasia Loop & War Memorial",
        "category": "heritage",
        "coordinates": [
          27.0165,
          88.2485
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "5:00 AM - 6:00 PM",
        "fee": "₹20 entry",
        "shortDesc": "A spiral railway loop where the Toy Train negotiates a steep 1,000-foot descent around manicured flower gardens.",
        "tip": "Time your visit with the morning Toy Train steam engine chugging through the circular loop."
      },
      {
        "id": "darjeeling-peace-pagoda",
        "name": "Japanese Peace Pagoda & Temple",
        "category": "temples",
        "coordinates": [
          27.028,
          88.261
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "4:30 AM - 7:00 PM",
        "fee": "Free",
        "shortDesc": "White domed Buddhist sanctuary built under Nichidatsu Fujii, enshrining four gold-polished avatars of Lord Buddha.",
        "tip": "Join the rhythmic drum chanting session inside the wooden Japanese temple at 4:30 PM."
      },
      {
        "id": "darjeeling-tea-estate",
        "name": "Happy Valley Tea Estate",
        "category": "museums",
        "coordinates": [
          27.052,
          88.261
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "timing": "9:30 AM - 4:30 PM (Closed Mondays)",
        "fee": "₹100 guided factory tour",
        "shortDesc": "Established in 1854, one of the oldest tea gardens in Darjeeling producing organic black, green, and white teas.",
        "tip": "Tour during the plucking season (March-October) to witness factory rolling, withering, and sorting machines active."
      }
    ]
  },
  {
    "id": "gangtok",
    "name": "Gangtok",
    "state": "Sikkim",
    "zone": "East",
    "coordinates": [
      27.3389,
      88.6065
    ],
    "tagline": "Clean Himalayan kingdom with Buddhist monasteries and high-altitude glacial lakes.",
    "heroImage": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "March to June & September to November",
    "bestDuration": "3 Days",
    "climate": "Crisp, clean mountain air with blooming rhododendron slopes and crisp horizons",
    "overview": "The sparkling capital of Sikkim perched at 1,650 meters altitude. Known as India’s cleanest and first 100% organic state, rich with Tibetan Buddhist heritage, prayer flags, and dramatic Kanchenjunga panoramas.",
    "localFoodSpecialties": [
      {
        "name": "Sikkimese Steamed Momos & Thukpa",
        "desc": "Hand-crafted dumplings served in piping hot clear bone broth with home-fermented gundruk.",
        "place": "The Taste of Tibet, MG Marg"
      },
      {
        "name": "Shaphalay (Tibetan Meat Pies)",
        "desc": "Crispy deep-fried bread stuffed with spiced minced chicken and spring onions.",
        "place": "Roll House & Mu Kimchi"
      }
    ],
    "places": [
      {
        "id": "gangtok-rumtek",
        "name": "Rumtek Dharma Chakra Centre",
        "category": "temples",
        "coordinates": [
          27.3,
          88.56
        ],
        "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹10 entry",
        "shortDesc": "Seat of the Karmapa Lama and Kagyu lineage, housing priceless Tibetan religious artwork and sacred golden stupas.",
        "tip": "Listen to the deep Tibetan horn and bell prayers during morning puja around 6:30 AM."
      },
      {
        "id": "gangtok-tsomgo-lake",
        "name": "Tsomgo (Changu) Glacial Lake",
        "category": "scenic",
        "coordinates": [
          27.3742,
          88.7619
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "timing": "Permits required (Day visit only)",
        "fee": "Permit approx ₹200 (Vehicle extra)",
        "shortDesc": "Sacred high-altitude glacial lake at 3,753 meters altitude that freezes solid in winter and reflects prayer flags in summer.",
        "tip": "Inner Line Permits are required; submit your passport/ID copy to your hotel travel desk one day prior."
      },
      {
        "id": "gangtok-tibetology",
        "name": "Namgyal Institute of Tibetology",
        "category": "museums",
        "coordinates": [
          27.316,
          88.604
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 4:00 PM (Sundays Closed)",
        "fee": "₹10 entry",
        "shortDesc": "Autonomous research institute housed in traditional Tibetan architecture, featuring rare Sanskrit and Tibetan palm-leaf manuscripts.",
        "tip": "Wander into the surrounding forest park to view the sacred Do-Drul Chorten stupa."
      },
      {
        "id": "gangtok-mg-marg",
        "name": "MG Marg Pedestrian Boulevard",
        "category": "scenic",
        "coordinates": [
          27.329,
          88.613
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "Open all day (Shops open 10:00 AM - 8:00 PM)",
        "fee": "Free",
        "shortDesc": "Pristine, vehicle-free stone-paved promenade lined with Victorian lampposts, cafes, and mountain souvenir boutiques.",
        "tip": "Grab a bench near the central fountain to people-watch while enjoying local roasted corn."
      }
    ]
  },
  {
    "id": "shillong",
    "name": "Shillong",
    "state": "Meghalaya",
    "zone": "East",
    "coordinates": [
      25.5788,
      91.8933
    ],
    "tagline": "The Scotland of the East with pine-scented waterfalls and indigenous music culture.",
    "heroImage": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "September to May (12°C - 23°C)",
    "bestDuration": "2-3 Days",
    "climate": "Cool highland pine weather with rolling morning fog and crystalline streams",
    "overview": "Capital of Meghalaya set on rolling plateau hills at 1,500 meters altitude. Famed for roaring three-tiered waterfalls, living root bridges, rock music culture, and matrilineal Khasi tribal traditions.",
    "localFoodSpecialties": [
      {
        "name": "Khasi Jadoh & Dohkhleh",
        "desc": "Traditional red hill rice cooked with aromatic pork stock, ginger, and turmeric, with pork salad.",
        "place": "Trattoria & Jadoh Stall, Police Bazar"
      },
      {
        "name": "Tungrymbai & Bamboo Shoot Curry",
        "desc": "Fermented soybean delicacy cooked with ginger, garlic, and wild coriander.",
        "place": "Dylan’s Cafe & City Stalls"
      }
    ],
    "places": [
      {
        "id": "shillong-umiam-lake",
        "name": "Umiam Lake (Barapani)",
        "category": "scenic",
        "coordinates": [
          25.66,
          91.89
        ],
        "image": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
        "timing": "Sunrise to Sunset",
        "fee": "Free (Water sports ₹200 - ₹500)",
        "shortDesc": "Vast reservoir surrounded by pine-clad Khasi hills, offering kayaking, water-skiing, and panoramic sunset viewpoints.",
        "tip": "Stop at the Umiam viewpoint cafe on the Guwahati-Shillong highway for pine tree lake vistas."
      },
      {
        "id": "shillong-elephant-falls",
        "name": "Elephant Falls",
        "category": "scenic",
        "coordinates": [
          25.536,
          91.823
        ],
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM",
        "fee": "₹20 entry",
        "shortDesc": "Three-tiered mountain waterfall tumbling over fern-carpeted black rocks, named after an elephant-shaped rock.",
        "tip": "Walk down all three levels using the well-paved stone stairs to reach the most dramatic bottom pool."
      },
      {
        "id": "shillong-don-bosco",
        "name": "Don Bosco Museum of Indigenous Cultures",
        "category": "museums",
        "coordinates": [
          25.599,
          91.905
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:30 PM (Sundays Closed)",
        "fee": "₹100 (Indians) / ₹250 (Foreigners)",
        "shortDesc": "Seven-story hexagonal museum housing seventeen galleries showcasing the tribal dress, weapons, and customs of all eight North-East states.",
        "tip": "Head to the skywalk terrace on the top floor for an aerial view across Shillong city."
      }
    ]
  },
  {
    "id": "guwahati",
    "name": "Guwahati",
    "state": "Assam",
    "zone": "East",
    "coordinates": [
      26.1445,
      91.7362
    ],
    "tagline": "Gateway to the North-East on the mighty red banks of the Brahmaputra.",
    "heroImage": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to April (15°C - 28°C)",
    "bestDuration": "2 Days",
    "climate": "Tropical river valley breeze with pleasant winter sunshine",
    "overview": "Major commercial and cultural hub of Assam spanning the mighty Brahmaputra River. Famous for the tantric Shaktipeeth of Kamakhya Temple, river dolphin cruises, and rich Assamese silk weaving.",
    "localFoodSpecialties": [
      {
        "name": "Assamese Thali with Masor Tenga",
        "desc": "Refreshing tangy sour fish curry simmered with elephant apple and served with steamed Joha rice.",
        "place": "Paradise Restaurant & Kasturi, G.S. Road"
      },
      {
        "name": "Kaji Nemu Duck Curry & Pitha",
        "desc": "Duck meat cooked with ash gourd and indigenous Assam lemon, followed by roasted sweet rice rolls.",
        "place": "Heritage Khorikaa"
      }
    ],
    "places": [
      {
        "id": "guwahati-kamakhya",
        "name": "Maa Kamakhya Devalaya",
        "category": "temples",
        "coordinates": [
          26.166,
          91.705
        ],
        "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        "timing": "5:30 AM - 1:00 PM & 2:30 PM - 5:30 PM",
        "fee": "Free (VIP entry ₹500)",
        "shortDesc": "One of the oldest and most revered 51 Shaktipeeths atop Nilachal Hill, dedicated to the mother goddess of tantric worship.",
        "tip": "Dress conservatively in traditional Indian attire; purchase VIP entry pass online to avoid 4-hour queues."
      },
      {
        "id": "guwahati-brahmaputra-cruise",
        "name": "Brahmaputra River Cruise & Sunset",
        "category": "scenic",
        "coordinates": [
          26.185,
          91.745
        ],
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        "timing": "Evening departures (4:30 PM - 6:30 PM)",
        "fee": "₹400 - ₹1,500 with dinner",
        "shortDesc": "Cruising along one of the widest rivers in the world, with opportunities to spot endangered Gangetic river dolphins.",
        "tip": "Choose the sunset cruise for traditional Bihu folk music and panoramic golden water vistas."
      },
      {
        "id": "guwahati-assam-museum",
        "name": "Assam State Museum",
        "category": "museums",
        "coordinates": [
          26.184,
          91.751
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹20 entry",
        "shortDesc": "Extensive museum near Dighalipukhuri displaying medieval Ahom dynasty swords, royal armor, and village bamboo crafts.",
        "tip": "Check out the natural history section exhibiting reconstructed prehistoric fossils."
      }
    ]
  },
  {
    "id": "mumbai",
    "name": "Mumbai (Bombay)",
    "state": "Maharashtra",
    "zone": "West",
    "coordinates": [
      18.922,
      72.8347
    ],
    "tagline": "City of Dreams on the Arabian Sea, colonial Victorian Gothic architecture, and Bollywood glamour.",
    "heroImage": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "November to February (20°C - 30°C)",
    "bestDuration": "3-4 Days",
    "climate": "Pleasant sea breeze with lower humidity in winter",
    "overview": "A bustling metropolis of 20 million people built across seven original islands. Mumbai blends colonial Victorian Gothic architecture, Art Deco promenades, Bollywood glamour, and dynamic coastal street culture.",
    "localFoodSpecialties": [
      {
        "name": "Vada Pav & Pav Bhaji",
        "desc": "Spicy potato fritter in bun with garlic chutney, and buttery mashed vegetable curry with toasted pav.",
        "place": "Cannon Pav Bhaji & Ashok Vada Pav"
      },
      {
        "name": "Bombay Duck Fry & Koli Prawns",
        "desc": "Crispy rava-crusted fresh seafood prepared in authentic coastal Koli fisherman spices.",
        "place": "Gajalee & Trishna, Fort"
      },
      {
        "name": "Irani Chai & Bun Maska",
        "desc": "Piping hot sweet cardamom brew with crusty butter-slathered bakery buns.",
        "place": "Kyani & Co., Marine Lines"
      }
    ],
    "places": [
      {
        "id": "mumbai-gateway",
        "name": "The Gateway of India",
        "category": "heritage",
        "coordinates": [
          18.922,
          72.8347
        ],
        "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "26-meter basalt arch monument built in 1924 facing Mumbai Harbour, symbol of British entry and departure.",
        "tip": "Board an hourly scenic ferry to the rock-cut Elephanta Caves directly from the jetty behind the arch."
      },
      {
        "id": "mumbai-cst",
        "name": "Chhatrapati Shivaji Maharaj Terminus (CST)",
        "category": "heritage",
        "coordinates": [
          18.94,
          72.8353
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24 Hours",
        "fee": "Free",
        "shortDesc": "UNESCO World Heritage Italian Gothic railway palace designed by F. W. Stevens, featuring stone gargoyles and stained glass.",
        "tip": "View from across the street at 8:00 PM when vibrant architectural illumination lights up the stone turrets."
      },
      {
        "id": "mumbai-marine-drive",
        "name": "Marine Drive & Queen’s Necklace",
        "category": "scenic",
        "coordinates": [
          18.9432,
          72.823
        ],
        "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "3.6-kilometer C-shaped coastal promenade along Netaji Subhash Chandra Bose Road lined with Art Deco residences.",
        "tip": "Sit on the sea-facing tetrapods around 6:00 PM for the sunset over the Arabian Sea."
      },
      {
        "id": "mumbai-siddhivinayak",
        "name": "Siddhivinayak Ganpati Temple",
        "category": "temples",
        "coordinates": [
          19.0169,
          72.8304
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "5:30 AM - 9:50 PM",
        "fee": "Free",
        "shortDesc": "Revered temple dedicated to Lord Ganesha, featuring a gold-plated inner sanctum dome and black stone deity.",
        "tip": "Tuesdays are the most auspicious and crowded; visit early morning on weekdays for peaceful darshan."
      },
      {
        "id": "mumbai-csmvs",
        "name": "CSMVS (Prince of Wales Museum)",
        "category": "museums",
        "coordinates": [
          18.9269,
          72.8327
        ],
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "timing": "10:15 AM - 6:00 PM",
        "fee": "₹150 (Indians) / ₹650 (Foreigners)",
        "shortDesc": "Indo-Saracenic museum surrounded by palm gardens, housing priceless collections of ancient sculptures, miniature art, and weaponry.",
        "tip": "The audio guide narrated by actor Amitabh Bachchan is outstanding."
      }
    ]
  },
  {
    "id": "goa",
    "name": "Goa",
    "state": "Goa",
    "zone": "West",
    "coordinates": [
      15.2993,
      74.124
    ],
    "tagline": "Sun-kissed Arabian beaches, Portuguese baroque churches, and vibrant susegad life.",
    "heroImage": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "November to March (21°C - 31°C)",
    "bestDuration": "3-5 Days",
    "climate": "Tropical coastal paradise with golden sunshine and rhythmic waves",
    "overview": "Ruled by Portugal for 451 years until 1961. Goa captivates travelers with golden palm-fringed beaches, UNESCO baroque whitewashed churches in Old Goa, spice plantations, beachside shacks, and seafood.",
    "localFoodSpecialties": [
      {
        "name": "Goan Fish Curry & Rice",
        "desc": "Fresh Kingfish cooked in coconut milk, dried Kashmiri chilies, and sour kokum.",
        "place": "Fisherman’s Wharf & Ritz Classic, Panaji"
      },
      {
        "name": "Pork Vindaloo & Poi Bread",
        "desc": "Fiery garlic, vinegar, and chili braised pork paired with crusty Goan poi bread.",
        "place": "Viva Panjim, Fontainhas"
      },
      {
        "name": "Bebinca Layered Cake",
        "desc": "Seven-layered traditional coconut milk and egg yolk baked pudding.",
        "place": "Confeitaria 31 De Janeiro, Latin Quarter"
      }
    ],
    "places": [
      {
        "id": "goa-bom-jesus",
        "name": "Basilica of Bom Jesus",
        "category": "heritage",
        "coordinates": [
          15.5009,
          73.9116
        ],
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 6:30 PM",
        "fee": "Free",
        "shortDesc": "UNESCO World Heritage baroque church built in 1605, holding the sacred relic mortal remains of St. Francis Xavier.",
        "tip": "Notice the basalt facade without plaster, revealing centuries-old laterite craftsmanship."
      },
      {
        "id": "goa-aguada-fort",
        "name": "Fort Aguada & 1864 Lighthouse",
        "category": "heritage",
        "coordinates": [
          15.4925,
          73.7736
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "9:30 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "17th-century Portuguese coastal fortress on Sinquerim beach with a freshwater cistern that supplied passing ships.",
        "tip": "Stand on the ocean-facing bastion for a panoramic view where the Mandovi River meets the Arabian Sea."
      },
      {
        "id": "goa-palolem-beach",
        "name": "Palolem Crescent Beach",
        "category": "scenic",
        "coordinates": [
          15.01,
          74.023
        ],
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Picturesque crescent-shaped bay with calm turquoise waters, coconut palms, and colorful beachfront wooden shacks.",
        "tip": "Rent a sea kayak in the morning to paddle around Canacona Island located right at the northern end."
      },
      {
        "id": "goa-mangeshi",
        "name": "Shree Mangeshi Temple (Ponda)",
        "category": "temples",
        "coordinates": [
          15.443,
          73.968
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 10:00 PM",
        "fee": "Free",
        "shortDesc": "Famous 450-year-old Hindu temple dedicated to Lord Shiva, featuring a striking seven-story white Deepastambha lamp tower.",
        "tip": "Dress modestly; no beach shorts permitted within temple grounds."
      },
      {
        "id": "goa-dudhsagar",
        "name": "Dudhsagar Waterfalls",
        "category": "scenic",
        "coordinates": [
          15.314,
          74.314
        ],
        "image": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
        "timing": "Safari departs 8:30 AM - 3:30 PM",
        "fee": "Jeep safari approx ₹500 - ₹800",
        "shortDesc": "One of India’s tallest four-tiered waterfalls (310 meters), resembling a cascading \"Sea of Milk\" amidst Western Ghats jungle.",
        "tip": "Watch for the railway bridge passing directly across the face of the rushing waterfall."
      }
    ]
  },
  {
    "id": "ahmedabad",
    "name": "Ahmedabad",
    "state": "Gujarat",
    "zone": "West",
    "coordinates": [
      23.0225,
      72.5714
    ],
    "tagline": "India’s first UNESCO World Heritage City, textile capital, and cradle of freedom.",
    "heroImage": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "November to February (14°C - 28°C)",
    "bestDuration": "2 Days",
    "climate": "Dry, sunny winter with pleasant breezy evenings along the Sabarmati",
    "overview": "Founded in 1411 by Sultan Ahmed Shah on the Sabarmati River. World-famous for traditional pol neighborhoods, delicate stone lattice work, Mahatma Gandhi’s freedom struggle headquarters, and night food markets.",
    "localFoodSpecialties": [
      {
        "name": "Gujarati Thali (Farsan & Kadhi)",
        "desc": "Unlimited feast of sweet-savory kadhi, undhiyu vegetable medley, dhokla, and hot rotlis with ghee.",
        "place": "Agashiye & Gordhan Thal"
      },
      {
        "name": "Khaman Dhokla & Fafda Jalebi",
        "desc": "Spongy steamed gram flour snacks with crisp gram flour strips and hot papaya sambharo.",
        "place": "Das Khaman & Chandravilas"
      },
      {
        "name": "Manek Chowk Midnight Kulfi & Sandwiches",
        "desc": "Night jewelry market converting into a bustling food street with Gwalior dosa and rabri kulfi.",
        "place": "Manek Chowk Old City"
      }
    ],
    "places": [
      {
        "id": "ahmedabad-sabarmati-ashram",
        "name": "Sabarmati Gandhi Ashram (Hriday Kunj)",
        "category": "heritage",
        "coordinates": [
          23.0605,
          72.58
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "8:30 AM - 6:30 PM",
        "fee": "Free",
        "shortDesc": "Headquarters of Mahatma Gandhi from 1917 to 1930 from where the historic Salt March to Dandi was launched.",
        "tip": "Visit Gandhi’s modest cottage Hriday Kunj to view his original spinning wheel (charkha) and spectacles."
      },
      {
        "id": "ahmedabad-adalaj-stepwell",
        "name": "Adalaj Stepwell (Rudabai Stepwell)",
        "category": "heritage",
        "coordinates": [
          23.1667,
          72.5833
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "8:00 AM - 6:00 PM",
        "fee": "Free",
        "shortDesc": "Five-story deep underground architectural marvel built in 1498 with Solanki carvings and subterranean temperature cooling.",
        "tip": "Walk all the way down to the water level to feel the temperature drop by up to 6 degrees Celsius."
      },
      {
        "id": "ahmedabad-sidi-saiyyed",
        "name": "Sidi Saiyyed Mosque (Tree of Life)",
        "category": "heritage",
        "coordinates": [
          23.028,
          72.582
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 7:00 PM",
        "fee": "Free",
        "shortDesc": "1573 CE mosque celebrated globally for its ten semi-circular marble screens carved into delicate intertwined tree branches.",
        "tip": "The \"Tree of Life\" jali design is the official design emblem of the Indian Institute of Management Ahmedabad."
      },
      {
        "id": "ahmedabad-calico-museum",
        "name": "The Calico Museum of Textiles",
        "category": "museums",
        "coordinates": [
          23.056,
          72.593
        ],
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "timing": "Guided tours only (10:30 AM - 1:00 PM, Prior booking required)",
        "fee": "Free (Strict pre-registration online)",
        "shortDesc": "Premier textile museum in India showcasing 500 years of handwoven textiles, royal court costumes, and Kashmiri pashminas.",
        "tip": "Book your slot online weeks in advance as visitors are limited to 30 people per day."
      },
      {
        "id": "ahmedabad-kankaria",
        "name": "Kankaria Lake & Promenade",
        "category": "scenic",
        "coordinates": [
          23.006,
          72.603
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "4:00 AM - 10:00 PM (Closed Mondays)",
        "fee": "₹25 entry",
        "shortDesc": "Circular lake commissioned in 1451 with a central Nagina Wadi garden island, light shows, and tree-lined jogging paths.",
        "tip": "Visit in the evening to ride the toy train around the 2.5 km perimeter of the illuminated lake."
      }
    ]
  },
  {
    "id": "khajuraho",
    "name": "Khajuraho",
    "state": "Madhya Pradesh",
    "zone": "Central",
    "coordinates": [
      24.8318,
      79.9199
    ],
    "tagline": "UNESCO temple art capital celebrating medieval Chandela sculpture and grace.",
    "heroImage": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (12°C - 26°C)",
    "bestDuration": "2 Days",
    "climate": "Dry, crisp winter weather ideal for exploring open-air stone temples",
    "overview": "Built between 950 and 1050 CE by the Chandela dynasty. Famed worldwide for Nagara architectural spires and sandstone sculptures depicting celebration of spiritual life, dance, war, and love.",
    "localFoodSpecialties": [
      {
        "name": "Bundelkhandi Thali & Bafla",
        "desc": "Hard baked wheat dough balls cooked in ghee, served with spicy arhar dal and garlic chutney.",
        "place": "Raja Cafe & Badri Seth Restaurant"
      },
      {
        "name": "Kaju Barfi & Masala Chai",
        "desc": "Fresh cashew fudge paired with steaming cardamom tea while admiring temple spires.",
        "place": "Temple View Rooftop Cafes"
      }
    ],
    "places": [
      {
        "id": "khajuraho-kandariya-mahadeva",
        "name": "Kandariya Mahadeva Temple",
        "category": "heritage",
        "coordinates": [
          24.853,
          79.9195
        ],
        "image": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "The largest and most magnificent temple in Khajuraho with 84 miniature spires recreating Mt. Meru, covered in 800 sculptures.",
        "tip": "Hire an official ASI licensed guide to decode the allegorical layers of the friezes."
      },
      {
        "id": "khajuraho-western-group",
        "name": "Western Group of Temples Complex",
        "category": "temples",
        "coordinates": [
          24.8535,
          79.9205
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM (Light & Sound Show 6:30 PM)",
        "fee": "Included with ticket",
        "shortDesc": "Pristinely landscaped UNESCO garden complex housing Lakshmana Temple, Matangeshwar Temple, and Chitragupta Temple.",
        "tip": "Attend the evening Sound and Light show narrated in the deep voice of Amitabh Bachchan."
      },
      {
        "id": "khajuraho-raneh-falls",
        "name": "Raneh Falls & Ken River Canyon",
        "category": "scenic",
        "coordinates": [
          24.91,
          79.98
        ],
        "image": "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
        "timing": "8:00 AM - 5:00 PM",
        "fee": "₹50 entry + vehicle permit",
        "shortDesc": "Breathtaking 5-km-long natural canyon carved through crystalline multi-colored granite rocks by Ken River.",
        "tip": "Look out for freshwater crocodiles and Indian vultures nesting on the volcanic canyon cliffs."
      },
      {
        "id": "khajuraho-museum",
        "name": "Archaeological Museum Khajuraho",
        "category": "museums",
        "coordinates": [
          24.851,
          79.924
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM (Fridays Closed)",
        "fee": "₹5 entry",
        "shortDesc": "Housing rare 10th-century Chandela stone statues including the colossal seated Nandi bull and dancing Ganesha.",
        "tip": "Located right opposite the circuit house; an air-conditioned quiet sanctuary."
      }
    ]
  },
  {
    "id": "pune",
    "name": "Pune",
    "state": "Maharashtra",
    "zone": "West",
    "coordinates": [
      18.5204,
      73.8567
    ],
    "tagline": "The Cultural Capital of Maharashtra and historical seat of the Maratha Peshwas.",
    "heroImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (14°C - 29°C)",
    "bestDuration": "2 Days",
    "climate": "Cool Sahyadri mountain breeze with pleasant sunny winters and green monsoons",
    "overview": "Nestled on the Deccan Plateau. Once the seat of the Peshwa prime ministers of the Maratha Empire under Chhatrapati Shivaji Maharaj. Famed for historic forts, classical music festivals, and historic bakeries.",
    "localFoodSpecialties": [
      {
        "name": "Puneri Misal Pav",
        "desc": "Spicy sprouted lentil curry topped with crispy farsan, fresh onions, and buttered pav.",
        "place": "Katakirr Misal & Bedekar Tea Stall"
      },
      {
        "name": "Bun Maska & Irani Chai",
        "desc": "Warm crusty sweet bun spread with homemade white butter, dipped in hot sweet tea.",
        "place": "Cafe Goodluck, Deccan Gymkhana"
      },
      {
        "name": "Bakarwadi & Mango Mastani",
        "desc": "Spiced pinwheel crunchy savoury rolls followed by a rich thick mango ice-cream milkshake.",
        "place": "Chitale Bandhu Mithaiwale & Sujata Mastani"
      }
    ],
    "places": [
      {
        "id": "pune-shaniwar-wada",
        "name": "Shaniwar Wada Palace Fortress",
        "category": "heritage",
        "coordinates": [
          18.5196,
          73.8553
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "9:30 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Historic 18th-century seven-story palace fort built in 1732 by Peshwa Baji Rao I, with massive teak spike-studded Dilli Darwaza.",
        "tip": "Stand before the Dilli Darwaza gate to admire the giant elephant-deterrent steel spikes."
      },
      {
        "id": "pune-aga-khan",
        "name": "Aga Khan Palace & Gandhi Memorial",
        "category": "heritage",
        "coordinates": [
          18.5524,
          73.9015
        ],
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Italianate palace built in 1892 where Mahatma Gandhi and Kasturba Gandhi were interned following the 1942 Quit India Resolution.",
        "tip": "Visit the peaceful marble samadhis of Kasturba Gandhi and Mahadev Desai in the shaded rose gardens."
      },
      {
        "id": "pune-dagdusheth",
        "name": "Shrimant Dagdusheth Halwai Ganpati",
        "category": "temples",
        "coordinates": [
          18.5165,
          73.8561
        ],
        "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 11:00 PM",
        "fee": "Free",
        "shortDesc": "One of the most revered and lavish Ganesha temples in Maharashtra, adorned with 40 kg of pure gold ornaments.",
        "tip": "Visit during early morning Kakad Aarti (around 6:00 AM) to experience the divine brass bells and mantras."
      },
      {
        "id": "pune-sinhagad",
        "name": "Sinhagad Fort (Lion Fort)",
        "category": "scenic",
        "coordinates": [
          18.3663,
          73.7558
        ],
        "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹50 entry per vehicle",
        "shortDesc": "Hilltop fortress perched 1,312 meters atop the Sahyadris, site of Tanaji Malusare’s heroic 1670 battle.",
        "tip": "Taste hot Pithla Bhakri and fresh matka curd prepared by local village stalls on the fort ramparts."
      },
      {
        "id": "pune-raja-kelkar",
        "name": "Raja Dinkar Kelkar Museum",
        "category": "museums",
        "coordinates": [
          18.511,
          73.854
        ],
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        "timing": "10:00 AM - 5:30 PM",
        "fee": "₹50 (Adults) / ₹20 (Children)",
        "shortDesc": "Fascinating collection of 20,000 medieval Indian everyday artifacts, carved wooden doors, and musical instruments.",
        "tip": "Admire the reconstructed Mastani Mahal palace courtyard inside the museum."
      }
    ]
  },
  {
    "id": "aurangabad",
    "name": "Aurangabad (Chhatrapati Sambhajinagar)",
    "state": "Maharashtra",
    "zone": "West",
    "coordinates": [
      19.8762,
      75.3433
    ],
    "tagline": "City of Gates and gateway to the UNESCO rock-cut wonders of Ajanta & Ellora.",
    "heroImage": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "October to March (14°C - 28°C)",
    "bestDuration": "2-3 Days",
    "climate": "Dry, pleasant Deccan plateau climate with cool winter breezes",
    "overview": "Historical crossroads of ancient Indian rock architecture. Home to the monumental Ellora monolithic Kailasa temple, ancient Ajanta Buddhist fresco caves, the Taj-like Bibi Ka Maqbara, and Himroo silk weaving.",
    "localFoodSpecialties": [
      {
        "name": "Aurangabadi Naan Qalia",
        "desc": "Slow-simmered rich mutton gravy infused with garam masala, eaten with crisp tandoori naan.",
        "place": "Old City Naan Qalia Stalls"
      },
      {
        "name": "Tahri & Sheermal",
        "desc": "Spiced fragrant rice cooked with tender mutton chunks and saffron-sweet milk flatbread.",
        "place": "Hotel Great Punjab & Gulzar Cafe"
      }
    ],
    "places": [
      {
        "id": "aurangabad-ellora-caves",
        "name": "Ellora Caves & Kailasa Temple (Cave 16)",
        "category": "heritage",
        "coordinates": [
          20.0268,
          75.178
        ],
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "timing": "Sunrise to Sunset (Tuesdays Closed)",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "World’s largest monolithic rock excavation, carved top-to-bottom from a single basalt cliff by Rashtrakuta King Krishna I.",
        "tip": "Walk up the upper perimeter trail on the cliff edge to look down upon the colossal Kailasa temple complex."
      },
      {
        "id": "aurangabad-ajanta-caves",
        "name": "Ajanta Caves (UNESCO World Heritage)",
        "category": "heritage",
        "coordinates": [
          20.5519,
          75.7033
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "9:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "30 rock-cut Buddhist cave monuments dating from 2nd century BCE, containing master frescoes of the Jataka tales.",
        "tip": "Hire an official ASI flashlight guide; flash photography is strictly banned to preserve the 2,000-year-old organic pigments."
      },
      {
        "id": "aurangabad-bibi-ka-maqbara",
        "name": "Bibi Ka Maqbara (Dakkhani Taj)",
        "category": "heritage",
        "coordinates": [
          19.9014,
          75.3203
        ],
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 10:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "1660 CE marble mausoleum commissioned by Prince Azam Shah for his mother Dilras Banu Begum, closely resembling the Taj Mahal.",
        "tip": "Visit in the evening when the gardens are cool and the white dome is lit against the starry Deccan sky."
      },
      {
        "id": "aurangabad-daulatabad",
        "name": "Daulatabad (Devagiri) Hill Fort",
        "category": "heritage",
        "coordinates": [
          19.943,
          75.213
        ],
        "image": "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "12th-century conical hilltop citadel with ingenious defense mechanisms including pitch-dark mazes (Andhari) and moats.",
        "tip": "Carry a torch to navigate through the pitch-black Andhari subterranean maze."
      }
    ]
  }
];

export const COMMUNITY_GEMS = [
  {
    "id": "gem-1",
    "city": "Varanasi",
    "title": "Secret Dawn Boat Ride to Scindia Ghat Leaning Temple",
    "author": "Aarav Sharma",
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    "category": "Secret Photo Angle",
    "likes": 142,
    "date": "2 days ago",
    "description": "Ask the boatman at Manikarnika Ghat to row directly opposite Ratneshwar Mahadev Temple at 5:45 AM. The temple leans 9 degrees into the Ganga (more than the Leaning Tower of Pisa!) and dawn reflections are magical.",
    "badgeColor": "bg-amber-500/10 text-amber-600 border-amber-200"
  },
  {
    "id": "gem-2",
    "city": "Jaipur",
    "title": "Hidden Stairwell inside Panna Meena Ka Kund",
    "author": "Priya Rathore",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    "category": "Hidden Heritage",
    "likes": 219,
    "date": "3 days ago",
    "description": "Located right next to Anokhi Museum near Amer Fort. This 16th-century symmetrical geometric stepwell has virtually no crowds in the early morning before 8:30 AM. Perfect for striking architectural geometry photos.",
    "badgeColor": "bg-purple-500/10 text-purple-600 border-purple-200"
  },
  {
    "id": "gem-3",
    "city": "Delhi",
    "title": "Mehrauli Baoli Stepwell at Sunset",
    "author": "Rohan Mehra",
    "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    "category": "Architectural Gem",
    "likes": 98,
    "date": "5 days ago",
    "description": "Rajon Ki Baoli in Mehrauli Archaeological Park is completely free to enter and overlooked by tourists visiting Qutub Minar. The deep multi-tiered arches are stunning at 4:30 PM with golden sun rays filtering down.",
    "badgeColor": "bg-sky-500/10 text-sky-600 border-sky-200"
  },
  {
    "id": "gem-4",
    "city": "Agra",
    "title": "Secret Mehtab Bagh Silhouette Spot across River",
    "author": "Kavita Joshi",
    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    "category": "Secret Photo Angle",
    "likes": 312,
    "date": "1 week ago",
    "description": "Walk 100 meters east of the official Mehtab Bagh ticket counter along the sandy Yamuna riverbank at sunset. You can photograph the Taj reflection in the river water without paying entry or having fences in your frame.",
    "badgeColor": "bg-rose-500/10 text-rose-600 border-rose-200"
  },
  {
    "id": "gem-5",
    "city": "Kochi",
    "title": "Pan-Fried Fish from Local Chinese Net Catch",
    "author": "Anjali Menon",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    "category": "Budget Street Food",
    "likes": 167,
    "date": "Just now",
    "description": "Buy freshly netted red snapper or tiger prawns straight from the Chinese net fishermen for ₹250, then walk 20 meters to the beachside shacks who will pan-fry it in hot Kerala masala paste for ₹100 with hot parotta.",
    "badgeColor": "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  },
  {
    "id": "gem-6",
    "city": "Hampi",
    "title": "Sanapur Lake Cliff Jumping & Coracle Boat Rides",
    "author": "Vikram Seth",
    "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    "category": "Secret Photo Angle",
    "likes": 198,
    "date": "1 week ago",
    "description": "Cross over to the Hippie Island side by ferry and rent a scooter. Sanapur Lake is surrounded by tranquil granite boulders with virtually no tour buses. Watch for the designated safe jump spots and take a spinning circular coracle ride.",
    "badgeColor": "bg-indigo-500/10 text-indigo-600 border-indigo-200"
  },
  {
    "id": "gem-7",
    "city": "Amritsar",
    "title": "Dawn Sarovar Parikrama & Langar Cooking at 4 AM",
    "author": "Harpreet Singh",
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    "category": "Spiritual Secret",
    "likes": 284,
    "date": "3 days ago",
    "description": "Experience the Golden Temple at 4:00 AM during the Palki Sahib procession when the holy Guru Granth Sahib is carried into the sanctum. The water is completely still with golden reflections and the energy is transcendent.",
    "badgeColor": "bg-amber-500/10 text-amber-600 border-amber-200"
  },
  {
    "id": "gem-8",
    "city": "Kolkata",
    "title": "Old Town Heritage Tram Ride from Esplanade to Gariahat",
    "author": "Debashis Roy",
    "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    "category": "Hidden Heritage",
    "likes": 215,
    "date": "4 days ago",
    "description": "Hop onto Kolkata’s 150-year-old wooden electric tramcars for ₹7. The Route through the Maidan foliage past Victoria Memorial feels like traveling straight back to the 1920s.",
    "badgeColor": "bg-purple-500/10 text-purple-600 border-purple-200"
  }
];

// All places enriched with destination city, state, zone & travel duration for universal search
export const ALL_PLACES = CITIES_DATA.flatMap((city) =>
  city.places.map((place) => ({
    ...place,
    cityId: city.id,
    cityName: city.name,
    state: city.state,
    zone: city.zone,
    bestDuration: city.bestDuration,
    bestTimeToVisit: city.bestTimeToVisit,
    localFoodSpecialties: city.localFoodSpecialties,
    cityOverview: city.overview
  }))
);
