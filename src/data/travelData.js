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
        "place": "Karim’s & Moti Mahal, Chandni Chowk",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nalli_Nihari_India.jpg/1280px-Nalli_Nihari_India.jpg"
      },
      {
        "name": "Stuffed Paranthas",
        "desc": "Crispy pan-fried breads stuffed with paneer, potato, and rabri served with sweet pumpkin chutney.",
        "place": "Pt. Kanhaiyalal Durgaprasad, Paranthe Wali Gali",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/1280px-Triangle_paratha_%28cropped%29.JPG"
      },
      {
        "name": "Chole Bhature",
        "desc": "Fluffy fried leavened bread served with tangy Punjabi chickpeas and pickled amla.",
        "place": "Sita Ram Diwan Chand, Paharganj",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chole_Bhature_from_Nagpur.JPG/1280px-Chole_Bhature_from_Nagpur.JPG"
      }
    ],
    "places": [
      {
        "id": "delhi-qutub-minar",
        "name": "Qutub Minar & Iron Pillar",
        "city": "New Delhi",
        "state": "Delhi",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          28.5244,
          77.1855
        ],
        "coordObj": {
          "lat": 28.5244,
          "lng": 77.1855
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/1280px-Qutb_Minar_2022.jpg",
        "timing": "7:00 AM - 7:00 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "asiFee": 40,
        "historicalEra": "1192 CE Delhi Sultanate",
        "description": "72.5-meter red sandstone victory tower built in 1192 CE, surrounded by 4th-century rustless iron pillar.",
        "shortDesc": "72.5-meter red sandstone victory tower built in 1192 CE, surrounded by 4th-century rustless iron pillar.",
        "tip": "Walk through the Mehrauli Archaeological Park right behind Qutub Minar for ancient stepwells."
      },
      {
        "id": "delhi-india-gate",
        "name": "India Gate & Kartavya Path",
        "city": "New Delhi",
        "state": "Delhi",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          28.6129,
          77.2295
        ],
        "coordObj": {
          "lat": 28.6129,
          "lng": 77.2295
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/5/5b/India_Gate_in_the_Evening.jpg",
        "timing": "Open 24/7 (Illuminated 7:00 PM - 11:00 PM)",
        "fee": "Free",
        "asiFee": 0,
        "historicalEra": "1921 CE Edwin Lutyens",
        "description": "42-meter triumphal arch war memorial honoring 84,000 soldiers, fronted by illuminated boulevards and the National War Memorial.",
        "shortDesc": "42-meter triumphal arch war memorial honoring 84,000 soldiers, fronted by illuminated boulevards.",
        "tip": "Best visited at twilight; grab roasted spicy corn (bhutta) and stroll through the National War Memorial."
      },
      {
        "id": "delhi-red-fort",
        "name": "Red Fort (Lal Qila)",
        "city": "Old Delhi",
        "state": "Delhi",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          28.6562,
          77.241
        ],
        "coordObj": {
          "lat": 28.6562,
          "lng": 77.241
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Red_Fort_Delhi_India.jpg/1280px-Red_Fort_Delhi_India.jpg",
        "timing": "9:30 AM - 4:30 PM (Mondays Closed)",
        "fee": "₹50 (Indians) / ₹600 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1638 CE Mughal Emperor Shah Jahan",
        "description": "Historic red sandstone fortress of Mughal power featuring the Diwan-i-Aam, Diwan-i-Khas, and the Chhatta Chowk vaulted bazaar.",
        "shortDesc": "Historic red sandstone fortress of Mughal power featuring the Diwan-i-Aam and royal pavilions.",
        "tip": "Enter through Lahori Gate and walk through the covered Chhatta Chowk bazaar for antique souvenirs."
      },
      {
        "id": "delhi-humayun-tomb",
        "name": "Humayun's Tomb",
        "city": "New Delhi",
        "state": "Delhi",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          28.5933,
          77.2507
        ],
        "coordObj": {
          "lat": 28.5933,
          "lng": 77.2507
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Humayun%27s_Tomb_Delhi.jpg/1280px-Humayun%27s_Tomb_Delhi.jpg",
        "timing": "6:00 AM - 6:00 PM Daily",
        "fee": "₹50 (Indians) / ₹600 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1570 CE Empress Bega Begum",
        "description": "First garden-tomb on the Indian subcontinent, an architectural precursor to the Taj Mahal with symmetrical charbagh water channels.",
        "shortDesc": "UNESCO garden-tomb built in 1570 that served as the architectural inspiration for the Taj Mahal.",
        "tip": "Visit in the late afternoon when sunlight illuminates the red sandstone and Persian white marble dome."
      },
      {
        "id": "delhi-akshardham",
        "name": "Swaminarayan Akshardham",
        "city": "New Delhi",
        "state": "Delhi",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          28.6127,
          77.2773
        ],
        "coordObj": {
          "lat": 28.6127,
          "lng": 77.2773
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/New_Delhi_Temple.jpg",
        "timing": "10:00 AM - 8:00 PM (Mondays Closed)",
        "fee": "Free Temple entry (Exhibitions ₹250)",
        "asiFee": 0,
        "historicalEra": "2005 CE BAPS Swaminarayan Sanstha",
        "description": "Colossal modern sandstone and Italian Carrara marble temple with 234 carved pillars and water fountain show.",
        "shortDesc": "Colossal modern sandstone and Italian Carrara marble temple with 234 carved pillars and water fountain show.",
        "tip": "No electronic devices or smartwatches allowed inside; utilize the free secure baggage deposit."
      },
      {
        "id": "delhi-lotus-temple",
        "name": "Lotus Temple (Bahá'í House of Worship)",
        "city": "New Delhi",
        "state": "Delhi",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          28.5535,
          77.2588
        ],
        "coordObj": {
          "lat": 28.5535,
          "lng": 77.2588
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Lotus_Temple_in_New_Delhi_03-2016.jpg/1280px-Lotus_Temple_in_New_Delhi_03-2016.jpg",
        "timing": "8:30 AM - 5:00 PM (Mondays Closed)",
        "fee": "Free Entry",
        "asiFee": 0,
        "historicalEra": "1986 CE Architect Fariborz Sahba",
        "description": "Lotus-shaped Bahá'í temple made of Greek white marble petals surrounded by nine ponds, welcoming all faiths for meditation.",
        "shortDesc": "Lotus-flower architectural marvel composed of 27 marble petals surrounded by tranquil ponds.",
        "tip": "Silence is strictly observed inside the central prayer hall; ideal for peaceful meditation."
      },
      {
        "id": "delhi-national-museum",
        "name": "National Museum of India",
        "city": "New Delhi",
        "state": "Delhi",
        "category": "museums",
        "categoryType": "Monument",
        "coordinates": [
          28.6118,
          77.2193
        ],
        "coordObj": {
          "lat": 28.6118,
          "lng": 77.2193
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/India_national_museum_01.jpg/1280px-India_national_museum_01.jpg",
        "timing": "10:00 AM - 6:00 PM (Mondays Closed)",
        "fee": "₹20 (Indians) / ₹650 (Foreigners)",
        "asiFee": 20,
        "historicalEra": "1949 CE National Heritage Institution",
        "description": "Premier museum housing 200,000 artifacts from the Indus Valley Civilization (Dancing Girl) and sacred Buddhist relics.",
        "shortDesc": "Premier museum housing 200,000 artifacts from the Indus Valley Civilization and sacred Buddhist relics.",
        "tip": "Don’t miss the Harappan Gallery and the gilded miniature paintings collection."
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
        "place": "Panchi Petha, Sadar Bazaar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Petha_kesari.JPG/1280px-Petha_kesari.JPG"
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
        "city": "Agra",
        "state": "Uttar Pradesh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          27.1751,
          78.0421
        ],
        "coordObj": {
          "lat": 27.1751,
          "lng": 78.0421
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg",
        "timing": "Sunrise to Sunset (Closed on Fridays)",
        "fee": "₹50 (Indians) / ₹1,100 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1632 CE Mughal Emperor Shah Jahan",
        "description": "UNESCO World Heritage ivory-white marble mausoleum commissioned in 1632 by Shah Jahan for Mumtaz Mahal.",
        "shortDesc": "UNESCO World Heritage ivory-white marble mausoleum commissioned in 1632 by Shah Jahan for Mumtaz Mahal.",
        "tip": "Visit at dawn via the East Gate for golden light reflection and minimal crowds."
      },
      {
        "id": "agra-fort",
        "name": "Agra Fort (Lal Qila)",
        "city": "Agra",
        "state": "Uttar Pradesh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          27.1795,
          78.0211
        ],
        "coordObj": {
          "lat": 27.1795,
          "lng": 78.0211
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Agra_03-2016_16_Agra_Fort.jpg/1280px-Agra_03-2016_16_Agra_Fort.jpg",
        "timing": "6:00 AM - 6:00 PM Daily",
        "fee": "₹50 (Indians) / ₹650 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1565 CE Mughal Emperor Akbar",
        "description": "Vast 16th-century red sandstone fortress residence where Shah Jahan spent his final years gazing at the Taj.",
        "shortDesc": "Vast 16th-century red sandstone fortress residence where Shah Jahan spent his final years gazing at the Taj.",
        "tip": "Look through the marble jali screen at the Musamman Burj tower for a framed Taj view."
      },
      {
        "id": "agra-fatehpur",
        "name": "Fatehpur Sikri & Buland Darwaza",
        "city": "Fatehpur Sikri",
        "state": "Uttar Pradesh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          27.0945,
          77.6679
        ],
        "coordObj": {
          "lat": 27.0945,
          "lng": 77.6679
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/1280px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg",
        "timing": "6:00 AM - 6:30 PM",
        "fee": "₹50 (Indians) / ₹610 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1571 CE Mughal Emperor Akbar",
        "description": "Preserved red sandstone Mughal capital built by Akbar, featuring the towering 54-meter Buland Darwaza and Salim Chishti tomb.",
        "shortDesc": "Preserved red sandstone Mughal capital built by Akbar, featuring the towering 54-meter Buland Darwaza.",
        "tip": "Hire an official ASI licensed guide at the gate to decode Akbar’s interfaith hall of discussions."
      },
      {
        "id": "agra-itimad-ud-daulah",
        "name": "Tomb of I'timād-ud-Daulah (Baby Taj)",
        "city": "Agra",
        "state": "Uttar Pradesh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          27.1929,
          78.031
        ],
        "coordObj": {
          "lat": 27.1929,
          "lng": 78.031
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/I%27tim%C4%81d-ud-Daulah%2C_Agra.jpg/1280px-I%27tim%C4%81d-ud-Daulah%2C_Agra.jpg",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹30 (Indians) / ₹310 (Foreigners)",
        "asiFee": 30,
        "historicalEra": "1628 CE Empress Nur Jahan",
        "description": "Often called the 'Jewel Box' or 'Baby Taj', this exquisite white marble mausoleum with pietra dura inlay was the architectural draft for the Taj Mahal.",
        "shortDesc": "Intricate white marble riverfront mausoleum featuring delicate pietra dura inlay work that inspired the Taj Mahal.",
        "tip": "Notice how the light filters through the carved lattice screens inside the inner burial chamber."
      },
      {
        "id": "agra-mehtab-bagh",
        "name": "Mehtab Bagh (Moonlight Garden)",
        "city": "Agra",
        "state": "Uttar Pradesh",
        "category": "scenic",
        "categoryType": "Scenic",
        "coordinates": [
          27.18,
          78.0425
        ],
        "coordObj": {
          "lat": 27.18,
          "lng": 78.0425
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mehtab_Bagh_facing_Taj_Mahal.JPG/1280px-Mehtab_Bagh_facing_Taj_Mahal.JPG",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "asiFee": 25,
        "historicalEra": "16th Century Mughal Garden",
        "description": "Charbagh garden complex situated on the opposite bank of the Yamuna River perfectly aligned with the Taj Mahal.",
        "shortDesc": "Charbagh garden on the opposite bank of the Yamuna River providing the quintessential sunset viewpoint of the Taj.",
        "tip": "Arrive 45 minutes before sunset for the golden-hour glow reflecting on the white marble dome."
      },
      {
        "id": "agra-taj-museum",
        "name": "Taj Museum & Western Gumbad",
        "city": "Agra",
        "state": "Uttar Pradesh",
        "category": "museums",
        "categoryType": "Monument",
        "coordinates": [
          27.1748,
          78.041
        ],
        "coordObj": {
          "lat": 27.1748,
          "lng": 78.041
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/IAshishTripathi_Mankameshwar_Temple_Agra.jpg/1280px-IAshishTripathi_Mankameshwar_Temple_Agra.jpg",
        "timing": "10:00 AM - 5:00 PM (Fridays Closed)",
        "fee": "Included with Taj ticket",
        "asiFee": 0,
        "historicalEra": "17th Century Mughal Royal Quarters",
        "description": "Exhibits original 17th-century Mughal coins, architectural blue-prints, and celadon dishes that cracked if touched by poison.",
        "shortDesc": "Exhibits 17th-century Mughal coins, architectural blue-prints, and celadon dishes that cracked if touched by poison.",
        "tip": "Great air-conditioned historical refuge during sunny afternoons."
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
        "place": "Laxmi Mishthan Bhandar (LMB), Johari Bazaar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/0b/DalBati.jpg"
      },
      {
        "name": "Pyaaz Kachori & Lassi",
        "desc": "Crisp layered pastry filled with spiced onion mixture, paired with thick clay-pot sweet lassi.",
        "place": "Rawat Mishthan Bhandar, Station Road",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg"
      },
      {
        "name": "Laal Maas",
        "desc": "Fiery smoked mutton curry prepared with Rajasthani Mathania red chilies and garlic.",
        "place": "1135 AD, Amer Fort",
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/97/Laal-Maans.jpg"
      }
    ],
    "places": [
      {
        "id": "jaipur-hawa-mahal",
        "name": "Hawa Mahal (Palace of Winds)",
        "city": "Jaipur",
        "state": "Rajasthan",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          26.9239,
          75.8267
        ],
        "coordObj": {
          "lat": 26.9239,
          "lng": 75.8267
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
        "timing": "9:00 AM - 5:00 PM Daily",
        "fee": "₹50 (Indians) / ₹200 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1799 CE Maharaja Sawai Pratap Singh",
        "description": "Iconic five-story pink sandstone honeycomb palace with 953 jharokhas (casements) designed for royal ladies to observe street life.",
        "shortDesc": "Iconic 1799 five-story honeycomb pink sandstone palace with 953 jharokhas (casements).",
        "tip": "Visit the Wind View Cafe right across the street on the rooftop for the quintessential front-facade photo."
      },
      {
        "id": "jaipur-amer-fort",
        "name": "Amer (Amber) Fort & Palace",
        "city": "Amer",
        "state": "Rajasthan",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          26.9855,
          75.8513
        ],
        "coordObj": {
          "lat": 26.9855,
          "lng": 75.8513
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg",
        "timing": "8:00 AM - 5:30 PM, 6:30 PM - 9:15 PM (Night Tour)",
        "fee": "₹100 (Indians) / ₹500 (Foreigners)",
        "asiFee": 100,
        "historicalEra": "1592 CE Raja Man Singh I",
        "description": "Majestic hilltop fortress overlooking Maota Lake, famous for the glittering Sheesh Mahal (Hall of Mirrors) and grand courtyards.",
        "shortDesc": "Majestic hilltop fortress overlooking Maota Lake, famous for the glittering Sheesh Mahal mirror mosaics.",
        "tip": "A single candle in the Sheesh Mahal illuminates the entire hall through thousands of convex Belgian mirrors."
      },
      {
        "id": "jaipur-jantar-mantar",
        "name": "Jantar Mantar Observatory",
        "city": "Jaipur",
        "state": "Rajasthan",
        "category": "museums",
        "categoryType": "Monument",
        "coordinates": [
          26.9248,
          75.8246
        ],
        "coordObj": {
          "lat": 26.9248,
          "lng": 75.8246
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jantar_Mantar_at_Jaipur.jpg/1280px-Jantar_Mantar_at_Jaipur.jpg",
        "timing": "9:00 AM - 5:00 PM Daily",
        "fee": "₹50 (Indians) / ₹200 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1734 CE Maharaja Sawai Jai Singh II",
        "description": "UNESCO World Heritage astronomical observatory featuring 19 architectural instruments, including the world's largest stone sundial (Samrat Yantra).",
        "shortDesc": "UNESCO astronomical monument featuring the world's largest stone sundial measuring time to two-second accuracy.",
        "tip": "Visit at midday when the sun is directly overhead to observe the shadow needles in action."
      },
      {
        "id": "jaipur-chand-baori",
        "name": "Chand Baori (Abhaneri Stepwell)",
        "city": "Abhaneri",
        "state": "Rajasthan",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          27.0073,
          76.6064
        ],
        "coordObj": {
          "lat": 27.0073,
          "lng": 76.6064
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Chand_Baori_perspective_panorama_%28July_2022%29.jpg/1280px-Chand_Baori_perspective_panorama_%28July_2022%29.jpg",
        "timing": "7:00 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "asiFee": 25,
        "historicalEra": "8th–9th Century Nikumbha Dynasty",
        "description": "One of the deepest and largest stepwells in the world, descending 13 stories with 3,500 precisely arranged geometric steps.",
        "shortDesc": "Architectural marvel descending 13 stories with 3,500 symmetrical geometric steps creating hypnotic patterns.",
        "tip": "Visit on a day-trip between Jaipur and Agra; morning light casts sharp geometric shadows across the steps."
      },
      {
        "id": "jaipur-city-palace",
        "name": "City Palace Jaipur",
        "city": "Jaipur",
        "state": "Rajasthan",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          26.9258,
          75.8236
        ],
        "coordObj": {
          "lat": 26.9258,
          "lng": 75.8236
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/City_Palace_Jaipur_Pritam_Niwas_Chowk.jpg/1280px-City_Palace_Jaipur_Pritam_Niwas_Chowk.jpg",
        "timing": "9:30 AM - 5:00 PM",
        "fee": "₹75 (Indians) / ₹300 (Foreigners)",
        "asiFee": 75,
        "historicalEra": "1727 CE Maharaja Sawai Jai Singh II",
        "description": "Palatial complex featuring Pritam Niwas Chowk with four peacock doors representing the four seasons, armor collections, and royal textiles.",
        "shortDesc": "Royal residence of the Jaipur royal family featuring the celebrated Peacock Courtyard and royal armor galleries.",
        "tip": "Check out the two colossal silver urns in the Diwan-i-Khas, registered in Guinness World Records as the world's largest silver objects."
      },
      {
        "id": "jaipur-govind-devji",
        "name": "Govind Dev Ji Temple",
        "city": "Jaipur",
        "state": "Rajasthan",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          26.9282,
          75.8248
        ],
        "coordObj": {
          "lat": 26.9282,
          "lng": 75.8248
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/74/Govind_dev_ji.jpg",
        "timing": "4:30 AM - 12:00 PM, 5:30 PM - 9:00 PM",
        "fee": "Free",
        "asiFee": 0,
        "historicalEra": "1735 CE Maharaja Sawai Jai Singh II",
        "description": "Historic Krishna temple with an enormous pillarless flat-roofed satsang hall holding up to 5,000 devotees for aarti.",
        "shortDesc": "Vibrant Krishna temple with an enormous pillarless hall holding 5,000 devotees during daily aarti.",
        "tip": "The evening aarti (around 7:00 PM) has vibrant collective singing and bell ringing."
      },
      {
        "id": "jaipur-nahargarh",
        "name": "Nahargarh Fort Sunset Point",
        "city": "Jaipur",
        "state": "Rajasthan",
        "category": "scenic",
        "categoryType": "Scenic",
        "coordinates": [
          26.9372,
          75.8155
        ],
        "coordObj": {
          "lat": 26.9372,
          "lng": 75.8155
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/4/47/Nahargarh_13.jpg",
        "timing": "10:00 AM - 10:00 PM",
        "fee": "₹50 (Indians) / ₹200 (Foreigners)",
        "asiFee": 50,
        "historicalEra": "1734 CE Maharaja Sawai Jai Singh II",
        "description": "Perched on the edge of the Aravalli Hills, providing panoramic views of the entire Pink City and Madhavendra Bhawan palace suites.",
        "shortDesc": "Perched on the edge of the Aravalli Hills, providing panoramic views of the entire Pink City.",
        "tip": "The open-air rooftop restaurant (Padao) has the premier view of Jaipur twinkling after dark."
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
        "place": "Krishna Dal Bati Restro, Jal Borg",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/0b/DalBati.jpg"
      },
      {
        "name": "Kachori & Mirchi Vada",
        "desc": "Spicy chili fritter stuffed with seasoned potato and crunchy green chilies.",
        "place": "Shastri Circle Food Stalls",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Udaipur_City_Palace.jpg/1280px-Udaipur_City_Palace.jpg",
        "timing": "9:00 AM - 5:30 PM",
        "fee": "₹300 (Adults) / ₹100 (Children)",
        "shortDesc": "Rajasthan’s largest palace complex, blending Rajasthani and Mughal architectural splendors on Lake Pichola’s eastern bank.",
        "tip": "Take an audio guide to discover the Mor Chowk peacock glass mosaics and the Zenana Mahal queen quarters.",
        "city": "Udaipur",
        "state": "Rajasthan",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 300,
        "coordObj": {
          "lat": 24.5764,
          "lng": 73.6835
        },
        "description": "Rajasthan’s largest palace complex, blending Rajasthani and Mughal architectural splendors on Lake Pichola’s eastern bank."
      },
      {
        "id": "udaipur-lake-pichola",
        "name": "Lake Pichola Boat Cruise & Jag Mandir",
        "category": "scenic",
        "coordinates": [
          24.575,
          73.678
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Udaipur_Lake_India.JPG/1280px-Udaipur_Lake_India.JPG",
        "timing": "9:00 AM - 6:00 PM",
        "fee": "₹400 - ₹700 (includes Jag Mandir island stop)",
        "shortDesc": "Centuries-old artificial freshwater lake flanked by bathing ghats, whitewashed havelis, and palace pavilions.",
        "tip": "Book the 5:00 PM sunset boat trip to witness the marble palaces turn glowing orange and amber.",
        "city": "Udaipur",
        "state": "Rajasthan",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 400,
        "coordObj": {
          "lat": 24.575,
          "lng": 73.678
        },
        "description": "Centuries-old artificial freshwater lake flanked by bathing ghats, whitewashed havelis, and palace pavilions."
      },
      {
        "id": "udaipur-jagdish-temple",
        "name": "Jagdish Temple",
        "category": "temples",
        "coordinates": [
          24.579,
          73.684
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jagdish_Temple_Udaipur.jpg/1280px-Jagdish_Temple_Udaipur.jpg",
        "timing": "5:00 AM - 2:30 PM & 4:00 PM - 10:00 PM",
        "fee": "Free",
        "shortDesc": "Three-story Indo-Aryan temple built in 1651 by Maharana Jagat Singh, dedicated to Lord Vishnu with carved stone elephant friezes.",
        "tip": "Climb the steep 32 marble stairs right outside City Palace gate during the evening Aarti for choral bells.",
        "city": "Udaipur",
        "state": "Rajasthan",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 24.579,
          "lng": 73.684
        },
        "description": "Three-story Indo-Aryan temple built in 1651 by Maharana Jagat Singh, dedicated to Lord Vishnu with carved stone elephant friezes."
      },
      {
        "id": "udaipur-bagore-ki-haveli",
        "name": "Bagore Ki Haveli & Folk Dance Museum",
        "category": "museums",
        "coordinates": [
          24.5798,
          73.6806
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/96/Bagore_ki_Haveli%2C_Rajasthan.jpg",
        "timing": "10:00 AM - 5:30 PM (Dharohar Folk Dance at 7:00 PM)",
        "fee": "₹100 Museum / ₹150 Dharohar Dance Show",
        "shortDesc": "Historic 18th-century waterfront haveli at Gangaur Ghat exhibiting traditional costumes, royal puppets, and live Rajasthani folk dances.",
        "tip": "Arrive at 6:15 PM to get front-row cushion seats for the Dharohar puppet and Chari fire dance show.",
        "city": "Udaipur",
        "state": "Rajasthan",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 100,
        "coordObj": {
          "lat": 24.5798,
          "lng": 73.6806
        },
        "description": "Historic 18th-century waterfront haveli at Gangaur Ghat exhibiting traditional costumes, royal puppets, and live Rajasthani folk dances."
      },
      {
        "id": "udaipur-saheliyon",
        "name": "Saheliyon Ki Bari (Garden of the Maids)",
        "category": "scenic",
        "coordinates": [
          24.6042,
          73.6883
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Saheliyon-ki-Bari_Fountain.JPG/1280px-Saheliyon-ki-Bari_Fountain.JPG",
        "timing": "8:00 AM - 7:00 PM",
        "fee": "₹20 (Indians) / ₹100 (Foreigners)",
        "shortDesc": "Royal gardens landscaped with marble pavilions, lotus pools, and gravity-fed fountains designed for royal maidens.",
        "tip": "Notice how the fountain water creates an acoustic illusion resembling gentle natural rainfall.",
        "city": "Udaipur",
        "state": "Rajasthan",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 20,
        "coordObj": {
          "lat": 24.6042,
          "lng": 73.6883
        },
        "description": "Royal gardens landscaped with marble pavilions, lotus pools, and gravity-fed fountains designed for royal maidens."
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
        "place": "Ram Bhandar, Thatheri Bazaar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/1280px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg"
      },
      {
        "name": "Banarasi Paan & Malaiyo",
        "desc": "Winter cloud-like saffron milk foam froth sprinkled with pistachios, followed by royal Meetha Paan.",
        "place": "Keshav Tambool Bhandar, Assi Ghat",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Betel_1.jpg/1280px-Betel_1.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg",
        "timing": "3:00 AM - 11:00 PM",
        "fee": "Free (VIP Darshan ₹300 optional)",
        "shortDesc": "One of the twelve sacred Jyotirlingas, crowned by a gold-plated spire donated by Maharaja Ranjit Singh.",
        "tip": "Book Mangla Aarti online in advance or walk through the grand newly inaugurated Vishwanath Corridor.",
        "city": "Varanasi (Kashi)",
        "state": "Uttar Pradesh",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 300,
        "coordObj": {
          "lat": 25.3109,
          "lng": 83.0107
        },
        "description": "One of the twelve sacred Jyotirlingas, crowned by a gold-plated spire donated by Maharaja Ranjit Singh."
      },
      {
        "id": "varanasi-dashashwamedh",
        "name": "Dashashwamedh Ghat & Evening Ganga Aarti",
        "category": "heritage",
        "coordinates": [
          25.3073,
          83.0103
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/1280px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg",
        "timing": "Aarti begins at 6:45 PM daily",
        "fee": "Free from steps",
        "shortDesc": "The primary and oldest ghat where young Vedic priests perform synchronized brass lamp ceremonies to venerate River Ganga.",
        "tip": "Hire a wooden hand-rowed boat from the opposite riverbank for the most immersive view of the lamp flames.",
        "city": "Varanasi (Kashi)",
        "state": "Uttar Pradesh",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 25.3073,
          "lng": 83.0103
        },
        "description": "The primary and oldest ghat where young Vedic priests perform synchronized brass lamp ceremonies to venerate River Ganga."
      },
      {
        "id": "varanasi-sarnath",
        "name": "Sarnath Deer Park & Dhamek Stupa",
        "category": "heritage",
        "coordinates": [
          25.3811,
          83.0214
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Dhamek_Stupa%2C_Sarnath.jpg/1280px-Dhamek_Stupa%2C_Sarnath.jpg",
        "timing": "Sunrise to Sunset",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Sacred Buddhist sanctuary where Lord Buddha gave his first sermon after attaining enlightenment.",
        "tip": "Visit the adjacent Archaeological Museum housing the original 3rd-century BCE Ashoka Lion Capital.",
        "city": "Varanasi (Kashi)",
        "state": "Uttar Pradesh",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 25.3811,
          "lng": 83.0214
        },
        "description": "Sacred Buddhist sanctuary where Lord Buddha gave his first sermon after attaining enlightenment."
      },
      {
        "id": "varanasi-chaat",
        "name": "Kashi Chaat Bhandar Street Hub",
        "category": "food",
        "coordinates": [
          25.309,
          83.0065
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/1280px-Dahi_puri%2C_Doi_phuchka.jpg",
        "timing": "4:00 PM - 10:30 PM",
        "fee": "₹40 - ₹80 per plate",
        "shortDesc": "Iconic streetside chaat destination celebrated for piping-hot Tamatar Chaat in terracotta bowls.",
        "tip": "Order the Tamatar Chaat and Gulab Jamun fresh out of boiling ghee.",
        "city": "Varanasi (Kashi)",
        "state": "Uttar Pradesh",
        "categoryType": "Food",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 40,
        "coordObj": {
          "lat": 25.309,
          "lng": 83.0065
        },
        "description": "Iconic streetside chaat destination celebrated for piping-hot Tamatar Chaat in terracotta bowls."
      },
      {
        "id": "varanasi-assi-ghat",
        "name": "Assi Ghat Sunrise & Subah-e-Banaras",
        "category": "scenic",
        "coordinates": [
          25.289,
          83.006
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Assi_Ghat_Varanasi_morning_Aarti.jpg",
        "timing": "5:00 AM - 7:30 AM",
        "fee": "Free",
        "shortDesc": "Southernmost ghat where the river Assi meets Ganga; famous for dawn yoga, classical music recitals, and morning aarti.",
        "tip": "Arrive at 5:15 AM to experience Subah-e-Banaras morning aarti and classical flute recitals.",
        "city": "Varanasi (Kashi)",
        "state": "Uttar Pradesh",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 25.289,
          "lng": 83.006
        },
        "description": "Southernmost ghat where the river Assi meets Ganga; famous for dawn yoga, classical music recitals, and morning aarti."
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
        "place": "Kulcha Land & Bhai Kulwant Singh Kulchian Wale",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Chole_Kulcha_Meal_-_Order_Food_Online_in_Mumbai_%2831013272937%29.jpg/1280px-Chole_Kulcha_Meal_-_Order_Food_Online_in_Mumbai_%2831013272937%29.jpg"
      },
      {
        "name": "Maa Ki Dal & Lachha Paratha",
        "desc": "Slow-cooked black lentils simmered for 12 hours with fresh country butter.",
        "place": "Kesar Da Dhaba, Chowk Passian",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/1280px-Triangle_paratha_%28cropped%29.JPG"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg",
        "timing": "Open 24 Hours Daily",
        "fee": "Free (All are welcome)",
        "shortDesc": "Central spiritual sanctuary of Sikhism, plated with 500 kg of pure gold leaf and surrounded by the sacred Amrit Sarovar lake.",
        "tip": "Head to the Guru Ram Das Langar Hall to volunteer or dine alongside 100,000 pilgrims served daily.",
        "city": "Amritsar",
        "state": "Punjab",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 31.62,
          "lng": 74.8765
        },
        "description": "Central spiritual sanctuary of Sikhism, plated with 500 kg of pure gold leaf and surrounded by the sacred Amrit Sarovar lake."
      },
      {
        "id": "amritsar-wagah-border",
        "name": "Wagah Border Beating Retreat Ceremony",
        "category": "heritage",
        "coordinates": [
          31.6047,
          74.5731
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/The_SAARC_Car_Rally_2007_being_welcomed_by_traditional_Drummers_at_the_Wagah_Border_on_March_28%2C_2007.jpg/1280px-The_SAARC_Car_Rally_2007_being_welcomed_by_traditional_Drummers_at_the_Wagah_Border_on_March_28%2C_2007.jpg",
        "timing": "4:30 PM - 5:30 PM (Arrive by 3:00 PM for seating)",
        "fee": "Free entry",
        "shortDesc": "Electrifying daily military parade with coordinated high kicks and flag lowering by Indian BSF and Pakistani Rangers.",
        "tip": "Carry your official ID; leave large backpacks in your taxi as only cell phones and wallets are permitted.",
        "city": "Amritsar",
        "state": "Punjab",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 31.6047,
          "lng": 74.5731
        },
        "description": "Electrifying daily military parade with coordinated high kicks and flag lowering by Indian BSF and Pakistani Rangers."
      },
      {
        "id": "amritsar-jallianwala-bagh",
        "name": "Jallianwala Bagh Memorial",
        "category": "heritage",
        "coordinates": [
          31.6205,
          74.8801
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jallianwala_Bagh%2C_Amritsar_01.jpg/1280px-Jallianwala_Bagh%2C_Amritsar_01.jpg",
        "timing": "6:30 AM - 7:30 PM",
        "fee": "Free",
        "shortDesc": "Sacred national memorial garden preserving the bullet marks and historic well from the tragic 1919 British massacre.",
        "tip": "Walk through the narrow brick alleyway to view the preserved red brick bullet impacts.",
        "city": "Amritsar",
        "state": "Punjab",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 31.6205,
          "lng": 74.8801
        },
        "description": "Sacred national memorial garden preserving the bullet marks and historic well from the tragic 1919 British massacre."
      },
      {
        "id": "amritsar-partition-museum",
        "name": "The Partition Museum (Town Hall)",
        "category": "museums",
        "coordinates": [
          31.6247,
          74.877
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Amritsar_9125.jpg/1280px-Amritsar_9125.jpg",
        "timing": "10:00 AM - 6:00 PM (Mondays Closed)",
        "fee": "₹10 (Indians) / ₹250 (Foreigners)",
        "shortDesc": "World’s first museum dedicated to the 1947 Partition of India, featuring oral histories, refugee letters, and historic relics.",
        "tip": "Plan at least 90 minutes to experience the poignant audio recordings in the Gallery of Hope.",
        "city": "Amritsar",
        "state": "Punjab",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 10,
        "coordObj": {
          "lat": 31.6247,
          "lng": 74.877
        },
        "description": "World’s first museum dedicated to the 1947 Partition of India, featuring oral histories, refugee letters, and historic relics."
      },
      {
        "id": "amritsar-kesar-dhaba",
        "name": "Kesar Da Dhaba Food Heritage Hub",
        "category": "food",
        "coordinates": [
          31.6212,
          74.8741
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pranjal_Dhaba_-_National_Highway_76_-_Shivrajpur_-_Shankargarh_-_Allahabad_2014-07-04_5674.JPG/1280px-Pranjal_Dhaba_-_National_Highway_76_-_Shivrajpur_-_Shankargarh_-_Allahabad_2014-07-04_5674.JPG",
        "timing": "11:00 AM - 11:00 PM",
        "fee": "₹200 - ₹450 per meal",
        "shortDesc": "Legendary 100-year-old vegetarian culinary destination that migrated from Sheikhupura in 1947, famous for slow-simmered Maa Ki Dal.",
        "tip": "Order the thali with their signature layered Lachha Paratha and gulab jamuns.",
        "city": "Amritsar",
        "state": "Punjab",
        "categoryType": "Food",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 200,
        "coordObj": {
          "lat": 31.6212,
          "lng": 74.8741
        },
        "description": "Legendary 100-year-old vegetarian culinary destination that migrated from Sheikhupura in 1947, famous for slow-simmered Maa Ki Dal."
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/1280px-The_Ridge_Shimla_5.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Spacious open esplanade offering unobstructed views of snow-clad Himalayan peaks, centered around northern India’s second-oldest church.",
        "tip": "Stroll during sunset when Christ Church’s stained-glass windows are illuminated against twilight mountain skies.",
        "city": "Shimla",
        "state": "Himachal Pradesh",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 31.1042,
          "lng": 77.175
        },
        "description": "Spacious open esplanade offering unobstructed views of snow-clad Himalayan peaks, centered around northern India’s second-oldest church."
      },
      {
        "id": "shimla-jakhoo",
        "name": "Jakhoo Temple & Giant Hanuman Statue",
        "category": "temples",
        "coordinates": [
          31.1011,
          77.185
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jakhoo_temple.jpg/1280px-Jakhoo_temple.jpg",
        "timing": "7:00 AM - 8:00 PM",
        "fee": "Free (Ropeway ₹500 roundtrip)",
        "shortDesc": "Ancient hilltop shrine on Shimla’s highest peak (2,455 m), crowned by a colossal 108-foot orange Hanuman statue.",
        "tip": "Take the scenic Jakhoo Ropeway from The Ridge; keep eyeglasses and snacks inside bags as monkeys roam the path.",
        "city": "Shimla",
        "state": "Himachal Pradesh",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 500,
        "coordObj": {
          "lat": 31.1011,
          "lng": 77.185
        },
        "description": "Ancient hilltop shrine on Shimla’s highest peak (2,455 m), crowned by a colossal 108-foot orange Hanuman statue."
      },
      {
        "id": "shimla-viceregal-lodge",
        "name": "Viceregal Lodge (Rashtrapati Niwas)",
        "category": "museums",
        "coordinates": [
          31.1031,
          77.1408
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Viceregal_Lodge%2C_Simla%2C_India.jpg/1280px-Viceregal_Lodge%2C_Simla%2C_India.jpg",
        "timing": "10:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹40 (Indians) / ₹85 (Foreigners)",
        "shortDesc": "Majestic Jacobethan-style stone estate designed by Henry Irwin that served as the summer headquarters of British viceroys.",
        "tip": "Explore the manicured botanical gardens featuring rare Himalayan cedar and botanical plantings.",
        "city": "Shimla",
        "state": "Himachal Pradesh",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 40,
        "coordObj": {
          "lat": 31.1031,
          "lng": 77.1408
        },
        "description": "Majestic Jacobethan-style stone estate designed by Henry Irwin that served as the summer headquarters of British viceroys."
      },
      {
        "id": "shimla-kalka-toy-train",
        "name": "Kalka-Shimla UNESCO Mountain Railway",
        "category": "scenic",
        "coordinates": [
          31.103,
          77.168
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d9/KSR_Steam_special_at_Taradevi_05-02-13_56.jpeg",
        "timing": "Multiple departures daily",
        "fee": "₹70 - ₹500 depending on train class",
        "shortDesc": "Historic narrow-gauge railway opened in 1903 traversing 102 tunnels, 864 bridges, and deep pine valleys.",
        "tip": "Book tickets well in advance on IRCTC to secure window seats for breathtaking ravine photography.",
        "city": "Shimla",
        "state": "Himachal Pradesh",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 70,
        "coordObj": {
          "lat": 31.103,
          "lng": 77.168
        },
        "description": "Historic narrow-gauge railway opened in 1903 traversing 102 tunnels, 864 bridges, and deep pine valleys."
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg/1280px-Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Iconic 450-foot iron suspension bridge spanning the emerald Ganges, connecting ashrams and temple spires.",
        "tip": "Cross over to the Ram Jhula and Janaki Jhula side during late afternoon for breathtaking river reflections.",
        "city": "Rishikesh",
        "state": "Uttarakhand",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 30.1245,
          "lng": 78.3292
        },
        "description": "Iconic 450-foot iron suspension bridge spanning the emerald Ganges, connecting ashrams and temple spires."
      },
      {
        "id": "rishikesh-triveni-ghat",
        "name": "Triveni Ghat Evening Maha Aarti",
        "category": "temples",
        "coordinates": [
          30.103,
          78.2975
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/08/Triveni_Ghat_Krishna_Arjun_Rath.jpg",
        "timing": "6:00 PM - 7:00 PM Daily",
        "fee": "Free",
        "shortDesc": "Confluence point of Ganga, Yamuna, and Saraswati rivers, renowned for synchronized conch shells and floating leaf lamps.",
        "tip": "Release a floating flower diya onto the current to make a traditional river prayer.",
        "city": "Rishikesh",
        "state": "Uttarakhand",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 30.103,
          "lng": 78.2975
        },
        "description": "Confluence point of Ganga, Yamuna, and Saraswati rivers, renowned for synchronized conch shells and floating leaf lamps."
      },
      {
        "id": "rishikesh-beatles-ashram",
        "name": "The Beatles Ashram (Chaurasi Kutia)",
        "category": "museums",
        "coordinates": [
          30.113,
          78.314
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Beatles_Ashram_01.jpg/1280px-Beatles_Ashram_01.jpg",
        "timing": "9:00 AM - 4:00 PM",
        "fee": "₹150 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "Former Maharishi Mahesh Yogi ashram where the Beatles composed the White Album in 1968, filled with vibrant graffiti art.",
        "tip": "Wander inside the stone meditation domes (kutiyas) and the graffiti cathedral hall.",
        "city": "Rishikesh",
        "state": "Uttarakhand",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 150,
        "coordObj": {
          "lat": 30.113,
          "lng": 78.314
        },
        "description": "Former Maharishi Mahesh Yogi ashram where the Beatles composed the White Album in 1968, filled with vibrant graffiti art."
      },
      {
        "id": "rishikesh-neer-garh",
        "name": "Neer Garh Waterfalls",
        "category": "scenic",
        "coordinates": [
          30.145,
          78.342
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/1280px-Trayambakeshwar_Temple_VK.jpg",
        "timing": "8:00 AM - 6:00 PM",
        "fee": "₹30 entry",
        "shortDesc": "Multi-tiered natural limestone waterfall tumbling into turquoise natural plunge pools hidden within tropical forest.",
        "tip": "Hike 20 minutes past the lower pool to reach the quieter, crystalline upper swimming pool.",
        "city": "Rishikesh",
        "state": "Uttarakhand",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 30,
        "coordObj": {
          "lat": 30.145,
          "lng": 78.342
        },
        "description": "Multi-tiered natural limestone waterfall tumbling into turquoise natural plunge pools hidden within tropical forest."
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
        "place": "Ahdoos Restaurant & Mughal Darbar, Residency Road",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rogan_Josh_Kashmiri.jpg/1280px-Rogan_Josh_Kashmiri.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/1280px-Dal_Lake_Hazratbal_Srinagar.jpg",
        "timing": "5:00 AM - 9:00 PM",
        "fee": "₹700 - ₹1,200 per hour for private shikara",
        "shortDesc": "18-sq-km crystalline mirror lake surrounded by snow-capped Pir Panjal peaks, lotus gardens, and cedar wood houseboats.",
        "tip": "Take a dawn 5:30 AM shikara ride to the floating vegetable market where trade takes place entirely boat-to-boat.",
        "city": "Srinagar",
        "state": "Jammu & Kashmir",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 700,
        "coordObj": {
          "lat": 34.09,
          "lng": 74.845
        },
        "description": "18-sq-km crystalline mirror lake surrounded by snow-capped Pir Panjal peaks, lotus gardens, and cedar wood houseboats."
      },
      {
        "id": "srinagar-shalimar-bagh",
        "name": "Shalimar Bagh Mughal Gardens",
        "category": "heritage",
        "coordinates": [
          34.148,
          74.872
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Shalimar_Bagh_1.jpg/1280px-Shalimar_Bagh_1.jpg",
        "timing": "9:00 AM - 7:00 PM",
        "fee": "₹24 (Indians) / ₹100 (Foreigners)",
        "shortDesc": "Finest terraced royal garden built in 1619 by Emperor Jahangir for his queen Nur Jahan, featuring black marble pavilions and water canals.",
        "tip": "Stroll under the towering 400-year-old Chinar trees; in autumn (October-November) their leaves glow ruby red.",
        "city": "Srinagar",
        "state": "Jammu & Kashmir",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 24,
        "coordObj": {
          "lat": 34.148,
          "lng": 74.872
        },
        "description": "Finest terraced royal garden built in 1619 by Emperor Jahangir for his queen Nur Jahan, featuring black marble pavilions and water canals."
      },
      {
        "id": "srinagar-shankaracharya",
        "name": "Shankaracharya Shiva Temple",
        "category": "temples",
        "coordinates": [
          34.072,
          74.848
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/The_Ancient_Shankaracharya_Temple_%28Srinagar%2C_Jammu_and_Kashmir%29_%28cropped%29.jpg/1280px-The_Ancient_Shankaracharya_Temple_%28Srinagar%2C_Jammu_and_Kashmir%29_%28cropped%29.jpg",
        "timing": "7:00 AM - 8:00 PM",
        "fee": "Free",
        "shortDesc": "Ancient 9th-century stone temple perched 1,000 feet above the valley floor on Gopadri Hill, visited by Adi Shankara.",
        "tip": "Climb the 243 stone steps for the most spectacular 360-degree aerial view of Srinagar city and Dal Lake.",
        "city": "Srinagar",
        "state": "Jammu & Kashmir",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 34.072,
          "lng": 74.848
        },
        "description": "Ancient 9th-century stone temple perched 1,000 feet above the valley floor on Gopadri Hill, visited by Adi Shankara."
      },
      {
        "id": "srinagar-sps-museum",
        "name": "Sri Pratap Singh (SPS) Museum",
        "category": "museums",
        "coordinates": [
          34.0665,
          74.821
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sri_Pratap_Singh_Museum_Bowels_4th_Century_AD.jpg/1280px-Sri_Pratap_Singh_Museum_Bowels_4th_Century_AD.jpg",
        "timing": "10:00 AM - 4:30 PM (Mondays Closed)",
        "fee": "₹20 (Indians) / ₹100 (Foreigners)",
        "shortDesc": "Museum exhibiting 2nd-century Harwan terracotta tiles, antique papier-mâché, and rare Mughal copperware.",
        "tip": "Don’t miss the medieval Buddhist sculpture gallery from the Ladakh and Kashmir borderlands.",
        "city": "Srinagar",
        "state": "Jammu & Kashmir",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 20,
        "coordObj": {
          "lat": 34.0665,
          "lng": 74.821
        },
        "description": "Museum exhibiting 2nd-century Harwan terracotta tiles, antique papier-mâché, and rare Mughal copperware."
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
        "place": "Oceanos Restaurant, Elphinstone Road",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg"
      },
      {
        "name": "Kochi Parotta & Roast",
        "desc": "Flaky layered Kerala parotta served with caramelized onion and black pepper roast.",
        "place": "Kayees Rahmathulla Hotel, Mattancherry",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Malabar_Porotta_%28cropped%29.jpg/1280px-Malabar_Porotta_%28cropped%29.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg/1280px-Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg",
        "timing": "Sunrise to Sunset",
        "fee": "Free to observe",
        "shortDesc": "Iconic 14th-century cantilevered sea nets introduced by Chinese trader Zheng He, operated with teak counterweights.",
        "tip": "Best silhouette photography is during golden hour sunset around 5:45 PM from Vasco da Gama Square.",
        "city": "Kochi (Cochin)",
        "state": "Kerala",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 9.9692,
          "lng": 76.2411
        },
        "description": "Iconic 14th-century cantilevered sea nets introduced by Chinese trader Zheng He, operated with teak counterweights."
      },
      {
        "id": "kochi-mattancherry",
        "name": "Mattancherry Palace (Dutch Palace)",
        "category": "heritage",
        "coordinates": [
          9.9583,
          76.2592
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mattancherry_Palace_DSC_0899.JPG/1280px-Mattancherry_Palace_DSC_0899.JPG",
        "timing": "9:45 AM - 4:45 PM (Fridays Closed)",
        "fee": "₹5 entry",
        "shortDesc": "Portuguese-built palace gifted to the Raja of Kochi in 1555, featuring intricate tempera murals illustrating the Ramayana.",
        "tip": "Examine the royal bedroom ceiling with carved lotus wood reliefs and natural herbal pigment paintings.",
        "city": "Kochi (Cochin)",
        "state": "Kerala",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 5,
        "coordObj": {
          "lat": 9.9583,
          "lng": 76.2592
        },
        "description": "Portuguese-built palace gifted to the Raja of Kochi in 1555, featuring intricate tempera murals illustrating the Ramayana."
      },
      {
        "id": "kochi-st-francis",
        "name": "St. Francis Church & Vasco Tomb",
        "category": "heritage",
        "coordinates": [
          9.9658,
          76.2413
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/St_Francis_Church_Fort_Kochi_DSC_1048.JPG/1280px-St_Francis_Church_Fort_Kochi_DSC_1048.JPG",
        "timing": "7:00 AM - 6:30 PM",
        "fee": "Free",
        "shortDesc": "Oldest European church in India built in 1503 by Portuguese Franciscan friars, original burial site of explorer Vasco da Gama.",
        "tip": "Observe the original rope-operated cloth fans (punkahs) suspended from the church nave.",
        "city": "Kochi (Cochin)",
        "state": "Kerala",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 9.9658,
          "lng": 76.2413
        },
        "description": "Oldest European church in India built in 1503 by Portuguese Franciscan friars, original burial site of explorer Vasco da Gama."
      },
      {
        "id": "kochi-synagogue",
        "name": "Paradesi Jewish Synagogue & Jew Town",
        "category": "heritage",
        "coordinates": [
          9.9575,
          76.2597
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Jewish_synagouge_kochi_india.jpg",
        "timing": "10:00 AM - 5:00 PM (Fridays & Saturdays restricted)",
        "fee": "₹10 entry",
        "shortDesc": "Constructed in 1568, containing hand-painted blue Cantonese willow porcelain floor tiles and Belgian glass chandeliers.",
        "tip": "Explore Jew Town Road immediately outside for antique spice grinders, brass lamps, and teak furniture.",
        "city": "Kochi (Cochin)",
        "state": "Kerala",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 10,
        "coordObj": {
          "lat": 9.9575,
          "lng": 76.2597
        },
        "description": "Constructed in 1568, containing hand-painted blue Cantonese willow porcelain floor tiles and Belgian glass chandeliers."
      },
      {
        "id": "kochi-kathakali",
        "name": "Kerala Kathakali Centre",
        "category": "museums",
        "coordinates": [
          9.966,
          76.244
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kathakali_-Play_with_Kaurava.jpg/1280px-Kathakali_-Play_with_Kaurava.jpg",
        "timing": "5:00 PM Makeup / 6:00 PM - 7:30 PM Performance Daily",
        "fee": "₹400 - ₹500",
        "shortDesc": "Intimate theater dedicated to the classical dance-drama of Kerala, featuring intricate face makeup and martial art demonstrations.",
        "tip": "Arrive at 5:00 PM to watch the master performers transform using herbal ground mineral face paints.",
        "city": "Kochi (Cochin)",
        "state": "Kerala",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 400,
        "coordObj": {
          "lat": 9.966,
          "lng": 76.244
        },
        "description": "Intimate theater dedicated to the classical dance-drama of Kerala, featuring intricate face makeup and martial art demonstrations."
      }
    ]
  },
  {
    "id": "madurai",
    "name": "Madurai & Tanjore",
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
        "place": "Famous Jigarthanda, East Marret Street",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jigarthanda.JPG/1280px-Jigarthanda.JPG"
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
        "name": "Meenakshi Amman Temple",
        "city": "Madurai",
        "state": "Tamil Nadu",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          9.9195,
          78.1193
        ],
        "coordObj": {
          "lat": 9.9195,
          "lng": 78.1193
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg",
        "timing": "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM",
        "fee": "Free Entry (Hall of Thousand Pillars ₹50)",
        "asiFee": 0,
        "historicalEra": "6th Century BCE / 16th Century Nayaka Dynasty",
        "description": "Historic Dravidian masterpiece with 14 colorful gopurams reaching up to 52 meters, covered in thousands of painted mythological figures.",
        "shortDesc": "Legendary temple city heart with 14 towering gopurams and the celebrated Hall of Thousand Pillars.",
        "tip": "Witness the nightly 9:00 PM procession when Lord Sundareswarar's icon is carried to Meenakshi's silver bedchamber."
      },
      {
        "id": "madurai-brihadeeswarar",
        "name": "Brihadeeswarar Temple (Thanjavur)",
        "city": "Thanjavur",
        "state": "Tamil Nadu",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          10.7828,
          79.1318
        ],
        "coordObj": {
          "lat": 10.7828,
          "lng": 79.1318
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg",
        "timing": "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
        "fee": "Free Entry (ASI Protected)",
        "asiFee": 0,
        "historicalEra": "1010 CE Emperor Raja Raja Chola I",
        "description": "UNESCO Great Living Chola Temple built entirely of granite, crowned by an 80-tonne monolithic cupola carved from a single block of stone.",
        "shortDesc": "UNESCO 1,000-year-old Chola architectural wonder built entirely of granite with an 80-tonne monolithic dome.",
        "tip": "Walk around the outer moat at twilight when the massive granite vimana is illuminated with warm golden lights."
      },
      {
        "id": "madurai-nayakkar-palace",
        "name": "Thirumalai Nayakkar Mahal",
        "city": "Madurai",
        "state": "Tamil Nadu",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          9.9151,
          78.1243
        ],
        "coordObj": {
          "lat": 9.9151,
          "lng": 78.1243
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Thirumalai_Nayakkar_Mahal_Madurai.jpg/1280px-Thirumalai_Nayakkar_Mahal_Madurai.jpg",
        "timing": "9:00 AM - 5:00 PM (Light Show 6:45 PM)",
        "fee": "₹10 (Entry) / ₹50 (Light Show)",
        "asiFee": 10,
        "historicalEra": "1636 CE Nayaka Dynasty",
        "description": "Grand palace blending Dravidian and Rajput-Italianate styles, supported by colossal 20-meter high circular masonry pillars.",
        "shortDesc": "17th-century royal palace boasting towering 20-meter stucco pillars and an open-air central courtyard.",
        "tip": "Stand in the central Natakasala (drama hall) to test the impressive acoustic resonance."
      },
      {
        "id": "madurai-alagar-kovil",
        "name": "Alagar Kovil & Pazhamudircholai",
        "city": "Alagar Hills",
        "state": "Tamil Nadu",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          10.0747,
          78.2144
        ],
        "coordObj": {
          "lat": 10.0747,
          "lng": 78.2144
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Alagar_Koil_Gopuram.jpg/1280px-Alagar_Koil_Gopuram.jpg",
        "timing": "6:00 AM - 8:00 PM",
        "fee": "Free Entry",
        "asiFee": 0,
        "historicalEra": "Early Pandyan / Nayaka Dynasty",
        "description": "Forested hillside Vishnu temple nestled at the foot of Alagar Hills, famous for its life-size wood carvings and sacred spring.",
        "shortDesc": "Serene hillside temple nestled among dense woodlands, known for exquisite wooden carvings and monkeys.",
        "tip": "Try the famous ghee-dripping Alagar Kovil Dosa sold as prasadam at the temple counter."
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
        "place": "Mylari Restaurant, Nazarbad",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Masala_Dosa_2023.jpg/1280px-Masala_Dosa_2023.jpg"
      },
      {
        "name": "Authentic Mysore Pak",
        "desc": "Warm fudge sweet crafted from chickpea flour, sugar, and generous pure desi ghee that melts on the tongue.",
        "place": "Guru Sweets, Sayyaji Rao Road",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mysore_pak.jpg/1280px-Mysore_pak.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/1280px-Mysore_Palace_Morning.jpg",
        "timing": "10:00 AM - 5:30 PM (Illumination Sundays 7:00 PM - 7:45 PM)",
        "fee": "₹100 (Indians) / ₹200 (Foreigners)",
        "shortDesc": "Indo-Saracenic palace designed by Henry Irwin, illuminated by 97,000 golden incandescent bulbs every Sunday evening.",
        "tip": "Stand in front of the main gate at exactly 7:00 PM on Sunday to watch all 97,000 bulbs switch on simultaneously.",
        "city": "Mysuru (Mysore)",
        "state": "Karnataka",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 100,
        "coordObj": {
          "lat": 12.3052,
          "lng": 76.6552
        },
        "description": "Indo-Saracenic palace designed by Henry Irwin, illuminated by 97,000 golden incandescent bulbs every Sunday evening."
      },
      {
        "id": "mysore-chamundeshwari",
        "name": "Chamundeshwari Temple & Nandi Bull",
        "category": "temples",
        "coordinates": [
          12.2725,
          76.671
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Chamundeshwari_Temple_Mysore.jpg/1280px-Chamundeshwari_Temple_Mysore.jpg",
        "timing": "7:30 AM - 2:00 PM & 3:30 PM - 6:00 PM",
        "fee": "Free (Special Darshan ₹100)",
        "shortDesc": "Ancient hill temple dedicated to Goddess Durga perched atop Chamundi Hills (1,062 m), featuring a 16-foot monolithic Nandi bull.",
        "tip": "Climb or drive halfway down the hill to admire the 350-year-old single-rock Nandi monolith.",
        "city": "Mysuru (Mysore)",
        "state": "Karnataka",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 100,
        "coordObj": {
          "lat": 12.2725,
          "lng": 76.671
        },
        "description": "Ancient hill temple dedicated to Goddess Durga perched atop Chamundi Hills (1,062 m), featuring a 16-foot monolithic Nandi bull."
      },
      {
        "id": "mysore-brindavan",
        "name": "Brindavan Gardens & KRS Dam",
        "category": "scenic",
        "coordinates": [
          12.423,
          76.572
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Brindavan_Gardens.JPG/1280px-Brindavan_Gardens.JPG",
        "timing": "6:30 AM - 9:00 PM (Musical Fountain 6:30 PM - 8:00 PM)",
        "fee": "₹50 entry",
        "shortDesc": "Terraced formal gardens below Krishna Raja Sagara dam modeled after the Shalimar Gardens of Kashmir, famous for musical water fountain.",
        "tip": "Arrive around 5:30 PM to explore the rose gardens before the musical synchronized water fountain begins.",
        "city": "Mysuru (Mysore)",
        "state": "Karnataka",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 12.423,
          "lng": 76.572
        },
        "description": "Terraced formal gardens below Krishna Raja Sagara dam modeled after the Shalimar Gardens of Kashmir, famous for musical water fountain."
      },
      {
        "id": "mysore-jaganmohan",
        "name": "Jaganmohan Palace Art Gallery",
        "category": "museums",
        "coordinates": [
          12.3075,
          76.6495
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/A_view_of_Jaganmohan_Palace.jpg/1280px-A_view_of_Jaganmohan_Palace.jpg",
        "timing": "8:30 AM - 5:30 PM",
        "fee": "₹50 (Adults) / ₹25 (Children)",
        "shortDesc": "Original royal residence housing one of the largest art collections in South India, including master oil paintings by Raja Ravi Varma.",
        "tip": "Seek out the iconic painting \"Glow of Hope\" (Lady with the Lamp) by S.L. Haldankar displayed in a dark chamber.",
        "city": "Mysuru (Mysore)",
        "state": "Karnataka",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 12.3075,
          "lng": 76.6495
        },
        "description": "Original royal residence housing one of the largest art collections in South India, including master oil paintings by Raja Ravi Varma."
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
        "place": "Paradise Food Court & Cafe Bahar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/1280px-Hyderabadi_Chicken_Biryani.jpg"
      },
      {
        "name": "Haleem & Irani Chai",
        "desc": "Velvety wheat and meat stew slow-cooked for 8 hours, followed by sweet condensed milk Irani tea with Osmania biscuits.",
        "place": "Pista House & Nimrah Cafe, Charminar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pakistani_Haleem_served_with_garnish.jpg/1280px-Pakistani_Haleem_served_with_garnish.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/1280px-Charminar_Hyderabad_1.jpg",
        "timing": "9:30 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "1591 CE monumental arch with four 56-meter minarets, built to commemorate the eradication of plague in the city.",
        "tip": "Walk through Laad Bazaar right next door to shop for traditional lacquer bangles and pearls.",
        "city": "Hyderabad",
        "state": "Telangana",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 17.3616,
          "lng": 78.4747
        },
        "description": "1591 CE monumental arch with four 56-meter minarets, built to commemorate the eradication of plague in the city."
      },
      {
        "id": "hyderabad-golconda",
        "name": "Golconda Fort & Acoustic Chambers",
        "category": "heritage",
        "coordinates": [
          17.3833,
          78.4011
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/1280px-Golconda_Fort_005.jpg",
        "timing": "9:00 AM - 5:30 PM (Sound & Light Show 6:30 PM)",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Impregnable granite fortress once controlling the world’s only diamond trade (producing Koh-i-Noor and Hope diamonds).",
        "tip": "Clap your hands beneath the dome of the Fateh Darwaza entry port; the sound travels 1 km up to the hilltop Bala Hissar pavilion.",
        "city": "Hyderabad",
        "state": "Telangana",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 17.3833,
          "lng": 78.4011
        },
        "description": "Impregnable granite fortress once controlling the world’s only diamond trade (producing Koh-i-Noor and Hope diamonds)."
      },
      {
        "id": "hyderabad-salar-jung",
        "name": "Salar Jung Museum",
        "category": "museums",
        "coordinates": [
          17.3713,
          78.4804
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg/1280px-Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg",
        "timing": "10:00 AM - 5:00 PM (Fridays Closed)",
        "fee": "₹50 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "One of the world’s largest one-man art collections, featuring the famous double-sided wooden sculpture of Mephistopheles and Margaretta.",
        "tip": "Gather in the main courtyard five minutes before any hour to watch the mechanical musical 19th-century clock chime.",
        "city": "Hyderabad",
        "state": "Telangana",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 17.3713,
          "lng": 78.4804
        },
        "description": "One of the world’s largest one-man art collections, featuring the famous double-sided wooden sculpture of Mephistopheles and Margaretta."
      },
      {
        "id": "hyderabad-birla-mandir",
        "name": "Birla Mandir (Venkateswara Temple)",
        "category": "temples",
        "coordinates": [
          17.4062,
          78.4691
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Birla_Mandir%2C_Hyderabad.png/1280px-Birla_Mandir%2C_Hyderabad.png",
        "timing": "7:00 AM - 12:00 PM & 3:00 PM - 9:00 PM",
        "fee": "Free",
        "shortDesc": "Built entirely from 2,000 tons of pure white Rajasthani marble atop the 280-foot Naubat Pahad hill overlooking Hussain Sagar.",
        "tip": "No mobile phones or bags allowed inside; enjoy the serene twilight panoramic views of the illuminated city below.",
        "city": "Hyderabad",
        "state": "Telangana",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 17.4062,
          "lng": 78.4691
        },
        "description": "Built entirely from 2,000 tons of pure white Rajasthani marble atop the 280-foot Naubat Pahad hill overlooking Hussain Sagar."
      },
      {
        "id": "hyderabad-hussain-sagar",
        "name": "Hussain Sagar Lake & Buddha Monolith",
        "category": "scenic",
        "coordinates": [
          17.4239,
          78.4738
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Aerial_view_of_Hussain_Sagar_from_Bansalipet.jpg/1280px-Aerial_view_of_Hussain_Sagar_from_Bansalipet.jpg",
        "timing": "8:00 AM - 10:00 PM",
        "fee": "Free (Boat to Buddha statue ₹100)",
        "shortDesc": "Heart-shaped 16th-century lake centered around the world’s tallest single-rock monolithic Buddha statue (18 meters tall).",
        "tip": "Take an evening speedboat ride from Lumbini Park to the central island for illuminated night photography.",
        "city": "Hyderabad",
        "state": "Telangana",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 100,
        "coordObj": {
          "lat": 17.4239,
          "lng": 78.4738
        },
        "description": "Heart-shaped 16th-century lake centered around the world’s tallest single-rock monolithic Buddha statue (18 meters tall)."
      }
    ]
  },
  {
    "id": "hampi",
    "name": "Hampi & Badami",
    "state": "Karnataka",
    "zone": "South",
    "coordinates": [
      15.335,
      76.46
    ],
    "tagline": "Bouldered capital of the Vijayanagara Empire and rock-cut Chalukya cave shrines.",
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
        "name": "Virupaksha Temple",
        "city": "Hampi",
        "state": "Karnataka",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          15.3353,
          76.4604
        ],
        "coordObj": {
          "lat": 15.3353,
          "lng": 76.4604
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Complex_of_Virupaksha_Temple%2C_Hampi_%2804%29.jpg/1280px-Complex_of_Virupaksha_Temple%2C_Hampi_%2804%29.jpg",
        "timing": "6:00 AM - 6:00 PM Daily",
        "fee": "₹50 (Entry)",
        "asiFee": 50,
        "historicalEra": "7th Century Chalukya / 14th Century Vijayanagara",
        "description": "Active pilgrimage shrine dedicated to Lord Shiva with an imposing 50-meter eastern gopuram and ancient inverted pinhole shadow mechanism.",
        "shortDesc": "Active 7th-century sacred shrine dedicated to Lord Shiva with an imposing 50-meter gopuram.",
        "tip": "Check out the pinhole camera effect in the rear chamber that projects an inverted shadow of the main tower."
      },
      {
        "id": "hampi-stone-chariot",
        "name": "Stone Chariot (Vittala Complex)",
        "city": "Hampi",
        "state": "Karnataka",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          15.3402,
          76.4789
        ],
        "coordObj": {
          "lat": 15.3402,
          "lng": 76.4789
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Stone_chariot%2C_Vittala_temple%2C_Hampi.jpg/1280px-Stone_chariot%2C_Vittala_temple%2C_Hampi.jpg",
        "timing": "8:30 AM - 5:30 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "asiFee": 40,
        "historicalEra": "16th Century Vijayanagara Empire",
        "description": "Iconic monolithic granite shrine dedicated to Garuda, designed in the form of a ceremonial chariot with carved wheels.",
        "shortDesc": "Iconic monolithic granite chariot dedicated to Garuda, featured on the Indian ₹50 currency note.",
        "tip": "Electric buggy transit is available from the main parking lot for ₹20 each way."
      },
      {
        "id": "hampi-vittala-temple",
        "name": "Vijaya Vittala Temple & Musical Pillars",
        "city": "Hampi",
        "state": "Karnataka",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          15.3407,
          76.4794
        ],
        "coordObj": {
          "lat": 15.3407,
          "lng": 76.4794
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vittala_Temple_Complex_Hampi.jpg/1280px-Vittala_Temple_Complex_Hampi.jpg",
        "timing": "8:30 AM - 5:30 PM",
        "fee": "Included with Stone Chariot ticket",
        "asiFee": 40,
        "historicalEra": "15th Century King Devaraya II",
        "description": "Sprawling temple complex renowned for its Ranga Mandapa with 56 sa-re-ga-ma musical pillars that resonate musical notes when struck.",
        "shortDesc": "Sprawling temple complex renowned for its 56 musical pillars that produce melodic resonance.",
        "tip": "Visit in late afternoon to enjoy the golden glow on the carved Dravidian colonnades."
      },
      {
        "id": "hampi-badami-caves",
        "name": "Badami Cave Temples",
        "city": "Badami",
        "state": "Karnataka",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          15.9189,
          75.6766
        ],
        "coordObj": {
          "lat": 15.9189,
          "lng": 75.6766
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Vishnu_image_inside_cave_number_3_in_Badami.jpg/1280px-Vishnu_image_inside_cave_number_3_in_Badami.jpg",
        "timing": "9:00 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "asiFee": 25,
        "historicalEra": "6th Century Chalukya Dynasty",
        "description": "Four magnificent rock-cut cave temples carved into red sandstone cliffs overlooking Agastya Lake, displaying Shiva Nataraja, Vishnu Trivikrama, and Jain tirthankaras.",
        "shortDesc": "Four magnificent rock-cut cave temples carved into dramatic red sandstone cliffs overlooking Agastya Lake.",
        "tip": "Cave 3 dedicated to Lord Vishnu has the most elaborate bracket figures and ceiling relief carvings."
      },
      {
        "id": "hampi-lotus-mahal",
        "name": "Lotus Mahal & Elephant Stables",
        "city": "Hampi",
        "state": "Karnataka",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          15.3315,
          76.4716
        ],
        "coordObj": {
          "lat": 15.3315,
          "lng": 76.4716
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Lotus_Mahal_Hampi.jpg/1280px-Lotus_Mahal_Hampi.jpg",
        "timing": "8:30 AM - 5:30 PM",
        "fee": "Included with Vittala ticket",
        "asiFee": 40,
        "historicalEra": "16th Century Vijayanagara Empire",
        "description": "Indo-Islamic secular palace with lotus-bud cusped arches and an adjacent eleven-domed grand stable that once housed royal ceremonial elephants.",
        "shortDesc": "Elegant two-story pleasure pavilion with Islamic cusped arches and adjacent eleven-domed elephant stables.",
        "tip": "The open lawns here are great for a quiet rest between temple explorations."
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/1280px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "Structural granite temple built in 700-728 CE directly overlooking the breaking waves of the Bay of Bengal.",
        "tip": "Visit right at dawn to see the sunrise cast golden reflections across the stone Shiva spires.",
        "city": "Mahabalipuram (Mamallapuram)",
        "state": "Tamil Nadu",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 40,
        "coordObj": {
          "lat": 12.6163,
          "lng": 80.1983
        },
        "description": "Structural granite temple built in 700-728 CE directly overlooking the breaking waves of the Bay of Bengal."
      },
      {
        "id": "mahabalipuram-pancha-rathas",
        "name": "Pancha Rathas (Five Chariots)",
        "category": "heritage",
        "coordinates": [
          12.6094,
          80.1945
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Five_Rathas_at_Mahaballipuram%2CTamil_Nadu.jpg/1280px-Five_Rathas_at_Mahaballipuram%2CTamil_Nadu.jpg",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "Included with Shore Temple ticket",
        "shortDesc": "Five monolithic rock shrines carved from a single outcropping of granite, each styled as a chariot named after the Pandavas.",
        "tip": "Look closely at the life-sized monolithic elephant carved out of the same rock bedrock.",
        "city": "Mahabalipuram (Mamallapuram)",
        "state": "Tamil Nadu",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 12.6094,
          "lng": 80.1945
        },
        "description": "Five monolithic rock shrines carved from a single outcropping of granite, each styled as a chariot named after the Pandavas."
      },
      {
        "id": "mahabalipuram-arjuna-penance",
        "name": "Arjuna’s Penance (Descent of the Ganges)",
        "category": "heritage",
        "coordinates": [
          12.6178,
          80.1925
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Descent_of_the_Ganges_01.jpg/1280px-Descent_of_the_Ganges_01.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "World’s largest open-air rock relief measuring 96 by 43 feet, depicting celestial beings, elephants, and monkeys.",
        "tip": "Notice the natural cleft down the center of the rock that was engineered to channel water like the descent of the Ganga.",
        "city": "Mahabalipuram (Mamallapuram)",
        "state": "Tamil Nadu",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 12.6178,
          "lng": 80.1925
        },
        "description": "World’s largest open-air rock relief measuring 96 by 43 feet, depicting celestial beings, elephants, and monkeys."
      },
      {
        "id": "mahabalipuram-butterball",
        "name": "Krishna’s Butterball",
        "category": "scenic",
        "coordinates": [
          12.6186,
          80.192
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Krishna_Butterball_Below_Mahabalipuram_Sep22_A7C_02490.jpg/1280px-Krishna_Butterball_Below_Mahabalipuram_Sep22_A7C_02490.jpg",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "Free",
        "shortDesc": "Gigantic 250-ton granite boulder balancing precariously on a 45-degree smooth rock slope for over 1,200 years.",
        "tip": "Try taking the classic perspective photo pretending to hold up or push the massive balancing boulder.",
        "city": "Mahabalipuram (Mamallapuram)",
        "state": "Tamil Nadu",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 12.6186,
          "lng": 80.192
        },
        "description": "Gigantic 250-ton granite boulder balancing precariously on a 45-degree smooth rock slope for over 1,200 years."
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
        "place": "Vidyarthi Bhavan, Gandhi Bazaar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Masala_Dosa_2023.jpg/1280px-Masala_Dosa_2023.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bangalore_Mysore_Maharaja_Palace.jpg/1280px-Bangalore_Mysore_Maharaja_Palace.jpg",
        "timing": "10:00 AM - 5:30 PM",
        "fee": "₹250 (Indians) / ₹450 (Foreigners)",
        "shortDesc": "19th-century Tudor-style royal palace featuring fortified towers, battlements, and Spanish stained-glass windows.",
        "tip": "Listen to the audio guide to hear about the royal family’s Maharaja Chamarajendra Wadiyar X.",
        "city": "Bengaluru (Bangalore)",
        "state": "Karnataka",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 250,
        "coordObj": {
          "lat": 12.9988,
          "lng": 77.5921
        },
        "description": "19th-century Tudor-style royal palace featuring fortified towers, battlements, and Spanish stained-glass windows."
      },
      {
        "id": "bengaluru-lalbagh",
        "name": "Lalbagh Botanical Garden & Glass House",
        "category": "scenic",
        "coordinates": [
          12.9507,
          77.5848
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Glasshouse_and_fountain_at_lalbagh.jpg/1280px-Glasshouse_and_fountain_at_lalbagh.jpg",
        "timing": "6:00 AM - 7:00 PM",
        "fee": "₹30 entry",
        "shortDesc": "240-acre botanical haven commissioned by Hyder Ali in 1760, home to centuries-old trees and a London Crystal Palace replica.",
        "tip": "Visit the 3-billion-year-old Lalbagh rock outcropping for sunset skyline views over Bengaluru.",
        "city": "Bengaluru (Bangalore)",
        "state": "Karnataka",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 30,
        "coordObj": {
          "lat": 12.9507,
          "lng": 77.5848
        },
        "description": "240-acre botanical haven commissioned by Hyder Ali in 1760, home to centuries-old trees and a London Crystal Palace replica."
      },
      {
        "id": "bengaluru-bull-temple",
        "name": "Dodda Basavana Gudi (Bull Temple)",
        "category": "temples",
        "coordinates": [
          12.9424,
          77.5681
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/86/Dodda_Ganeshana_Gudi_Hindu_temple%2C_Basavanagudi%2C_Karnataka%2C_India.jpg",
        "timing": "6:00 AM - 8:00 PM",
        "fee": "Free",
        "shortDesc": "16th-century Vijayanagara shrine housing a colossal 4.5-meter monolithic Nandi bull carved from single granite.",
        "tip": "Every November, the famous Kadalekai Parishe (Groundnut Fair) surrounds the temple with festive farmer stalls.",
        "city": "Bengaluru (Bangalore)",
        "state": "Karnataka",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 12.9424,
          "lng": 77.5681
        },
        "description": "16th-century Vijayanagara shrine housing a colossal 4.5-meter monolithic Nandi bull carved from single granite."
      },
      {
        "id": "bengaluru-cubbon-park",
        "name": "Cubbon Park & Vidhana Soudha",
        "category": "scenic",
        "coordinates": [
          12.9763,
          77.5929
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Cubbon_Park_W.jpg/1280px-Cubbon_Park_W.jpg",
        "timing": "6:00 AM - 7:00 PM",
        "fee": "Free",
        "shortDesc": "300-acre green lung in central Bengaluru adjacent to the majestic neo-Dravidian state legislature Vidhana Soudha.",
        "tip": "Visit on Sunday morning when traffic is prohibited and the park transforms into a community haven for dog lovers and cyclists.",
        "city": "Bengaluru (Bangalore)",
        "state": "Karnataka",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 12.9763,
          "lng": 77.5929
        },
        "description": "300-acre green lung in central Bengaluru adjacent to the majestic neo-Dravidian state legislature Vidhana Soudha."
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
        "place": "Rapsy Restaurant, Main Bazaar",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Etroplus_suratensis.jpg/1280px-Etroplus_suratensis.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Eravikulam_National_Park_%2849444006652%29.jpg/1280px-Eravikulam_National_Park_%2849444006652%29.jpg",
        "timing": "7:30 AM - 4:00 PM",
        "fee": "₹200 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Sanctuary for the rare endangered Nilgiri Tahr mountain goat, featuring rolling shola grasslands and views of Anamudi peak.",
        "tip": "Book safari bus tickets online in advance; the park closes for two months during calving season (Feb-March).",
        "city": "Munnar",
        "state": "Kerala",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 200,
        "coordObj": {
          "lat": 10.15,
          "lng": 77.06
        },
        "description": "Sanctuary for the rare endangered Nilgiri Tahr mountain goat, featuring rolling shola grasslands and views of Anamudi peak."
      },
      {
        "id": "munnar-tea-museum",
        "name": "KDHP Tata Tea Museum",
        "category": "museums",
        "coordinates": [
          10.093,
          77.052
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Le_mus%C3%A9e_du_th%C3%A9_%28Munnar%2C_Inde%29_%2813694719014%29.jpg/1280px-Le_mus%C3%A9e_du_th%C3%A9_%28Munnar%2C_Inde%29_%2813694719014%29.jpg",
        "timing": "9:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹125 entry (includes tea tasting session)",
        "shortDesc": "Historic tea factory tracing the evolution of tea plantations in Munnar since 1876 with live tea processing demos.",
        "tip": "Attend the tea tasting room session to distinguish subtle nuances between white, green, and orthodox black teas.",
        "city": "Munnar",
        "state": "Kerala",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 125,
        "coordObj": {
          "lat": 10.093,
          "lng": 77.052
        },
        "description": "Historic tea factory tracing the evolution of tea plantations in Munnar since 1876 with live tea processing demos."
      },
      {
        "id": "munnar-mattupetty",
        "name": "Mattupetty Dam & Echo Point",
        "category": "scenic",
        "coordinates": [
          10.106,
          77.124
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Mattupetty_Dam.jpg/1280px-Mattupetty_Dam.jpg",
        "timing": "9:00 AM - 5:00 PM",
        "fee": "₹10 entry (Speedboats ₹500 - ₹1,000)",
        "shortDesc": "Masonry gravity dam nestled within verdant tea hills, famous for still water boating and natural acoustic echo point.",
        "tip": "Shout your name at Echo Point across the misty reservoir to hear your voice rebound three times.",
        "city": "Munnar",
        "state": "Kerala",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 10,
        "coordObj": {
          "lat": 10.106,
          "lng": 77.124
        },
        "description": "Masonry gravity dam nestled within verdant tea hills, famous for still water boating and natural acoustic echo point."
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
        "place": "Nizam’s, New Market",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/1280px-Triangle_paratha_%28cropped%29.JPG"
      },
      {
        "name": "Rosogolla & Sandesh",
        "desc": "Spongy cottage cheese balls simmered in light sugar syrup, and Nolen Gur date palm sandesh.",
        "place": "K.C. Das & Balaram Mullick",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/1280px-Rasgulla.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/1280px-Victoria_Memorial_situated_in_Kolkata.jpg",
        "timing": "10:00 AM - 5:00 PM (Gardens open 5:30 AM - 6:30 PM)",
        "fee": "₹50 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Grand white Makrana marble monument built between 1906 and 1921, surrounded by 64 acres of landscaped gardens.",
        "tip": "Visit in the late afternoon and sit by the reflection pond as the sunset turns the marble pale gold.",
        "city": "Kolkata (Calcutta)",
        "state": "West Bengal",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 22.5448,
          "lng": 88.3426
        },
        "description": "Grand white Makrana marble monument built between 1906 and 1921, surrounded by 64 acres of landscaped gardens."
      },
      {
        "id": "kolkata-howrah-bridge",
        "name": "Howrah Bridge (Rabindra Setu)",
        "category": "heritage",
        "coordinates": [
          22.5851,
          88.3468
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Howrah_bridge_at_night.jpg/1280px-Howrah_bridge_at_night.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Engineering marvel balanced cantilever bridge spanning the Hooghly River without a single pillar in the riverbed.",
        "tip": "Walk across on foot during sunrise from Howrah station side to witness the vibrant riverside flower market.",
        "city": "Kolkata (Calcutta)",
        "state": "West Bengal",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 22.5851,
          "lng": 88.3468
        },
        "description": "Engineering marvel balanced cantilever bridge spanning the Hooghly River without a single pillar in the riverbed."
      },
      {
        "id": "kolkata-dakshineswar",
        "name": "Dakshineswar Kali Temple",
        "category": "temples",
        "coordinates": [
          22.653,
          88.357
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/1280px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG",
        "timing": "6:00 AM - 12:30 PM & 3:00 PM - 8:30 PM",
        "fee": "Free",
        "shortDesc": "Navaratna-style 19th-century temple complex built by Rani Rashmoni where mystic Ramakrishna Paramahamsa served as priest.",
        "tip": "Take a ferry across the Hooghly River to Belur Math, headquarters of the Ramakrishna Mission.",
        "city": "Kolkata (Calcutta)",
        "state": "West Bengal",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 22.653,
          "lng": 88.357
        },
        "description": "Navaratna-style 19th-century temple complex built by Rani Rashmoni where mystic Ramakrishna Paramahamsa served as priest."
      },
      {
        "id": "kolkata-indian-museum",
        "name": "The Indian Museum (Jadu Ghar)",
        "category": "museums",
        "coordinates": [
          22.5579,
          88.3511
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg/1280px-Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg",
        "timing": "10:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹50 (Indians) / ₹500 (Foreigners)",
        "shortDesc": "Oldest and largest multipurpose museum in the Asia-Pacific region (founded 1814), housing rare fossils and Egyptian mummies.",
        "tip": "Don’t miss the Gandhara Buddhist sculpture gallery and the genuine 4,000-year-old Egyptian mummy.",
        "city": "Kolkata (Calcutta)",
        "state": "West Bengal",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 22.5579,
          "lng": 88.3511
        },
        "description": "Oldest and largest multipurpose museum in the Asia-Pacific region (founded 1814), housing rare fossils and Egyptian mummies."
      },
      {
        "id": "kolkata-prinsep-ghat",
        "name": "Prinsep Ghat & Hooghly Promenade",
        "category": "scenic",
        "coordinates": [
          22.556,
          88.332
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/PrincepGhat.jpg/1280px-PrincepGhat.jpg",
        "timing": "Open all day",
        "fee": "Free (Wooden boat ride ₹300 - ₹500)",
        "shortDesc": "Palladian Greek-style columned pavilion on the riverbanks, overlooking the towering Vidyasagar Setu cable-stayed bridge.",
        "tip": "Hire a traditional wooden country boat at sunset for a serene 30-minute cruise under the suspension bridge.",
        "city": "Kolkata (Calcutta)",
        "state": "West Bengal",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 300,
        "coordObj": {
          "lat": 22.556,
          "lng": 88.332
        },
        "description": "Palladian Greek-style columned pavilion on the riverbanks, overlooking the towering Vidyasagar Setu cable-stayed bridge."
      }
    ]
  },
  {
    "id": "puri",
    "name": "Konark & Puri",
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
        "id": "puri-konark-sun-temple",
        "name": "Konark Sun Temple (The Black Pagoda)",
        "city": "Konark",
        "state": "Odisha",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          19.8876,
          86.0945
        ],
        "coordObj": {
          "lat": 19.8876,
          "lng": 86.0945
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg",
        "timing": "6:00 AM - 8:00 PM Daily",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "asiFee": 40,
        "historicalEra": "13th Century Eastern Ganga Dynasty",
        "description": "UNESCO World Heritage monumental 24-wheeled chariot of Surya the Sun God, pulled by seven stone horses, famous for its sundial wheels.",
        "shortDesc": "13th-century monumental sun god chariot with 24 carved stone wheels that function as precise sundials.",
        "tip": "Hire an authorized ASI guide to demonstrate how the spokes on the chariot wheels tell the exact time."
      },
      {
        "id": "puri-jagannath-temple",
        "name": "Shree Jagannath Temple",
        "city": "Puri",
        "state": "Odisha",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          19.8049,
          85.8179
        ],
        "coordObj": {
          "lat": 19.8049,
          "lng": 85.8179
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Shri_Jagannath_temple.jpg/1280px-Shri_Jagannath_temple.jpg",
        "timing": "5:00 AM - 11:00 PM Daily",
        "fee": "Free Entry",
        "asiFee": 0,
        "historicalEra": "12th Century King Anantavarman Chodaganga",
        "description": "One of the sacred Char Dham pilgrimage sites, dedicated to Lord Jagannath, Balabhadra, and Subhadra, home to the world's largest traditional wood-fired kitchen.",
        "shortDesc": "Sacred Char Dham shrine famous for its annual Ratha Yatra and the world's largest earthen-pot community kitchen.",
        "tip": "Experience the Mahaprasad (Ananda Bazaar) served fresh in clay pots between 1:00 PM and 3:00 PM."
      },
      {
        "id": "puri-chilika-lake",
        "name": "Chilika Lake & Bird Sanctuary",
        "city": "Satapada",
        "state": "Odisha",
        "category": "scenic",
        "categoryType": "Scenic",
        "coordinates": [
          19.7042,
          85.3195
        ],
        "coordObj": {
          "lat": 19.7042,
          "lng": 85.3195
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/94/Birds_eyeview_of_Chilika_Lake.jpg",
        "timing": "6:00 AM - 5:00 PM",
        "fee": "Boat hire ₹1,200 - ₹2,500 per boat",
        "asiFee": 0,
        "historicalEra": "Ancient Brackish Coastal Lagoon",
        "description": "Asia's largest brackish water lagoon, winter habitat for over 160 species of migratory birds and endangered Irrawaddy dolphins.",
        "shortDesc": "Asia's largest brackish lagoon, home to rare Irrawaddy dolphins and migratory flamingo flocks.",
        "tip": "Take the morning boat ride from Satapada to the Sea Mouth for the best chances of dolphin sightings."
      },
      {
        "id": "puri-chandrabhaga-beach",
        "name": "Chandrabhaga Beach",
        "city": "Konark",
        "state": "Odisha",
        "category": "scenic",
        "categoryType": "Scenic",
        "coordinates": [
          19.8654,
          86.1132
        ],
        "coordObj": {
          "lat": 19.8654,
          "lng": 86.1132
        },
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "timing": "Open 24/7",
        "fee": "Free",
        "asiFee": 0,
        "historicalEra": "Historic Vedic Coastal Strand",
        "description": "Golden sandy beach located 3 km east of the Sun Temple, famous as the site where Lord Krishna's son Samba prayed to Surya.",
        "shortDesc": "Pristine Blue Flag certified beach renowned for dramatic sunrise views over the Bay of Bengal.",
        "tip": "Visit at dawn right before heading into the Konark Sun Temple for uncrowded coastal photographs."
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
        "place": "Kunga Restaurant, Gandhi Road",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/1280px-Momo_nepal.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tiger_Hill_Darjeeling_West_Bengal_India_%283%29.JPG/1280px-Tiger_Hill_Darjeeling_West_Bengal_India_%283%29.JPG",
        "timing": "4:00 AM - 6:30 AM (Depart hotel at 3:30 AM)",
        "fee": "₹50 - ₹100 for observatory tower",
        "shortDesc": "Famous 2,590-meter viewpoint where dawn sunbeams illuminate the towering peak of Mt. Kanchenjunga in hues of gold.",
        "tip": "Dress warmly in heavy woolens; pre-book your shared taxi the previous evening.",
        "city": "Darjeeling",
        "state": "West Bengal",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 27.001,
          "lng": 88.283
        },
        "description": "Famous 2,590-meter viewpoint where dawn sunbeams illuminate the towering peak of Mt. Kanchenjunga in hues of gold."
      },
      {
        "id": "darjeeling-batasia-loop",
        "name": "Batasia Loop & War Memorial",
        "category": "heritage",
        "coordinates": [
          27.0165,
          88.2485
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Batasia_Loop_War_Memorial_with_Kanchanjunga.jpg/1280px-Batasia_Loop_War_Memorial_with_Kanchanjunga.jpg",
        "timing": "5:00 AM - 6:00 PM",
        "fee": "₹20 entry",
        "shortDesc": "A spiral railway loop where the Toy Train negotiates a steep 1,000-foot descent around manicured flower gardens.",
        "tip": "Time your visit with the morning Toy Train steam engine chugging through the circular loop.",
        "city": "Darjeeling",
        "state": "West Bengal",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 20,
        "coordObj": {
          "lat": 27.0165,
          "lng": 88.2485
        },
        "description": "A spiral railway loop where the Toy Train negotiates a steep 1,000-foot descent around manicured flower gardens."
      },
      {
        "id": "darjeeling-peace-pagoda",
        "name": "Japanese Peace Pagoda & Temple",
        "category": "temples",
        "coordinates": [
          27.028,
          88.261
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Peace_Pagoda%2C_Darjeeling_-_Dec_2006-2.jpg",
        "timing": "4:30 AM - 7:00 PM",
        "fee": "Free",
        "shortDesc": "White domed Buddhist sanctuary built under Nichidatsu Fujii, enshrining four gold-polished avatars of Lord Buddha.",
        "tip": "Join the rhythmic drum chanting session inside the wooden Japanese temple at 4:30 PM.",
        "city": "Darjeeling",
        "state": "West Bengal",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 27.028,
          "lng": 88.261
        },
        "description": "White domed Buddhist sanctuary built under Nichidatsu Fujii, enshrining four gold-polished avatars of Lord Buddha."
      },
      {
        "id": "darjeeling-tea-estate",
        "name": "Happy Valley Tea Estate",
        "category": "museums",
        "coordinates": [
          27.052,
          88.261
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Happy_Valley_Tea_Estate%2C_Darjeeling.jpg",
        "timing": "9:30 AM - 4:30 PM (Closed Mondays)",
        "fee": "₹100 guided factory tour",
        "shortDesc": "Established in 1854, one of the oldest tea gardens in Darjeeling producing organic black, green, and white teas.",
        "tip": "Tour during the plucking season (March-October) to witness factory rolling, withering, and sorting machines active.",
        "city": "Darjeeling",
        "state": "West Bengal",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 100,
        "coordObj": {
          "lat": 27.052,
          "lng": 88.261
        },
        "description": "Established in 1854, one of the oldest tea gardens in Darjeeling producing organic black, green, and white teas."
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
        "place": "The Taste of Tibet, MG Marg",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Thukpa%2C_Tibetan_noodle_in_Osaka%2C_Japan.jpg/1280px-Thukpa%2C_Tibetan_noodle_in_Osaka%2C_Japan.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rumtek_Monastery_alias_Dharma_Chakra_Centre_near_Gangtok%2C_East_Sikkim_09.jpg/1280px-Rumtek_Monastery_alias_Dharma_Chakra_Centre_near_Gangtok%2C_East_Sikkim_09.jpg",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹10 entry",
        "shortDesc": "Seat of the Karmapa Lama and Kagyu lineage, housing priceless Tibetan religious artwork and sacred golden stupas.",
        "tip": "Listen to the deep Tibetan horn and bell prayers during morning puja around 6:30 AM.",
        "city": "Gangtok",
        "state": "Sikkim",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 10,
        "coordObj": {
          "lat": 27.3,
          "lng": 88.56
        },
        "description": "Seat of the Karmapa Lama and Kagyu lineage, housing priceless Tibetan religious artwork and sacred golden stupas."
      },
      {
        "id": "gangtok-tsomgo-lake",
        "name": "Tsomgo (Changu) Glacial Lake",
        "category": "scenic",
        "coordinates": [
          27.3742,
          88.7619
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tsongmo_Lake_or_Changu_Lake_-_East_Sikkim.jpg/1280px-Tsongmo_Lake_or_Changu_Lake_-_East_Sikkim.jpg",
        "timing": "Permits required (Day visit only)",
        "fee": "Permit approx ₹200 (Vehicle extra)",
        "shortDesc": "Sacred high-altitude glacial lake at 3,753 meters altitude that freezes solid in winter and reflects prayer flags in summer.",
        "tip": "Inner Line Permits are required; submit your passport/ID copy to your hotel travel desk one day prior.",
        "city": "Gangtok",
        "state": "Sikkim",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 200,
        "coordObj": {
          "lat": 27.3742,
          "lng": 88.7619
        },
        "description": "Sacred high-altitude glacial lake at 3,753 meters altitude that freezes solid in winter and reflects prayer flags in summer."
      },
      {
        "id": "gangtok-tibetology",
        "name": "Namgyal Institute of Tibetology",
        "category": "museums",
        "coordinates": [
          27.316,
          88.604
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Namgyal_Institute_of_Tibetology_Front_Panorama.jpg/1280px-Namgyal_Institute_of_Tibetology_Front_Panorama.jpg",
        "timing": "10:00 AM - 4:00 PM (Sundays Closed)",
        "fee": "₹10 entry",
        "shortDesc": "Autonomous research institute housed in traditional Tibetan architecture, featuring rare Sanskrit and Tibetan palm-leaf manuscripts.",
        "tip": "Wander into the surrounding forest park to view the sacred Do-Drul Chorten stupa.",
        "city": "Gangtok",
        "state": "Sikkim",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 10,
        "coordObj": {
          "lat": 27.316,
          "lng": 88.604
        },
        "description": "Autonomous research institute housed in traditional Tibetan architecture, featuring rare Sanskrit and Tibetan palm-leaf manuscripts."
      },
      {
        "id": "gangtok-mg-marg",
        "name": "MG Marg Pedestrian Boulevard",
        "category": "scenic",
        "coordinates": [
          27.329,
          88.613
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kangch-Goechala.jpg/1280px-Kangch-Goechala.jpg",
        "timing": "Open all day (Shops open 10:00 AM - 8:00 PM)",
        "fee": "Free",
        "shortDesc": "Pristine, vehicle-free stone-paved promenade lined with Victorian lampposts, cafes, and mountain souvenir boutiques.",
        "tip": "Grab a bench near the central fountain to people-watch while enjoying local roasted corn.",
        "city": "Gangtok",
        "state": "Sikkim",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 27.329,
          "lng": 88.613
        },
        "description": "Pristine, vehicle-free stone-paved promenade lined with Victorian lampposts, cafes, and mountain souvenir boutiques."
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Umiam_Lake_-_by_Vikramjit_Kakati.png",
        "timing": "Sunrise to Sunset",
        "fee": "Free (Water sports ₹200 - ₹500)",
        "shortDesc": "Vast reservoir surrounded by pine-clad Khasi hills, offering kayaking, water-skiing, and panoramic sunset viewpoints.",
        "tip": "Stop at the Umiam viewpoint cafe on the Guwahati-Shillong highway for pine tree lake vistas.",
        "city": "Shillong",
        "state": "Meghalaya",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 200,
        "coordObj": {
          "lat": 25.66,
          "lng": 91.89
        },
        "description": "Vast reservoir surrounded by pine-clad Khasi hills, offering kayaking, water-skiing, and panoramic sunset viewpoints."
      },
      {
        "id": "shillong-elephant-falls",
        "name": "Elephant Falls",
        "category": "scenic",
        "coordinates": [
          25.536,
          91.823
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/3/36/Elephant_Falls_Meghalaya.jpg",
        "timing": "9:00 AM - 5:00 PM",
        "fee": "₹20 entry",
        "shortDesc": "Three-tiered mountain waterfall tumbling over fern-carpeted black rocks, named after an elephant-shaped rock.",
        "tip": "Walk down all three levels using the well-paved stone stairs to reach the most dramatic bottom pool.",
        "city": "Shillong",
        "state": "Meghalaya",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 20,
        "coordObj": {
          "lat": 25.536,
          "lng": 91.823
        },
        "description": "Three-tiered mountain waterfall tumbling over fern-carpeted black rocks, named after an elephant-shaped rock."
      },
      {
        "id": "shillong-don-bosco",
        "name": "Don Bosco Museum of Indigenous Cultures",
        "category": "museums",
        "coordinates": [
          25.599,
          91.905
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Don_Bosco_Museum%2C_Shillong.jpg/1280px-Don_Bosco_Museum%2C_Shillong.jpg",
        "timing": "9:00 AM - 5:30 PM (Sundays Closed)",
        "fee": "₹100 (Indians) / ₹250 (Foreigners)",
        "shortDesc": "Seven-story hexagonal museum housing seventeen galleries showcasing the tribal dress, weapons, and customs of all eight North-East states.",
        "tip": "Head to the skywalk terrace on the top floor for an aerial view across Shillong city.",
        "city": "Shillong",
        "state": "Meghalaya",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 100,
        "coordObj": {
          "lat": 25.599,
          "lng": 91.905
        },
        "description": "Seven-story hexagonal museum housing seventeen galleries showcasing the tribal dress, weapons, and customs of all eight North-East states."
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/1280px-Kamakhya_Temple_-_DEV_8829.jpg",
        "timing": "5:30 AM - 1:00 PM & 2:30 PM - 5:30 PM",
        "fee": "Free (VIP entry ₹500)",
        "shortDesc": "One of the oldest and most revered 51 Shaktipeeths atop Nilachal Hill, dedicated to the mother goddess of tantric worship.",
        "tip": "Dress conservatively in traditional Indian attire; purchase VIP entry pass online to avoid 4-hour queues.",
        "city": "Guwahati",
        "state": "Assam",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 500,
        "coordObj": {
          "lat": 26.166,
          "lng": 91.705
        },
        "description": "One of the oldest and most revered 51 Shaktipeeths atop Nilachal Hill, dedicated to the mother goddess of tantric worship."
      },
      {
        "id": "guwahati-brahmaputra-cruise",
        "name": "Brahmaputra River Cruise & Sunset",
        "category": "scenic",
        "coordinates": [
          26.185,
          91.745
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ganges-Brahmaputra-Meghna_basins.jpg/1280px-Ganges-Brahmaputra-Meghna_basins.jpg",
        "timing": "Evening departures (4:30 PM - 6:30 PM)",
        "fee": "₹400 - ₹1,500 with dinner",
        "shortDesc": "Cruising along one of the widest rivers in the world, with opportunities to spot endangered Gangetic river dolphins.",
        "tip": "Choose the sunset cruise for traditional Bihu folk music and panoramic golden water vistas.",
        "city": "Guwahati",
        "state": "Assam",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 400,
        "coordObj": {
          "lat": 26.185,
          "lng": 91.745
        },
        "description": "Cruising along one of the widest rivers in the world, with opportunities to spot endangered Gangetic river dolphins."
      },
      {
        "id": "guwahati-assam-museum",
        "name": "Assam State Museum",
        "category": "museums",
        "coordinates": [
          26.184,
          91.751
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/19/Assam_State_Museum.jpg",
        "timing": "10:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹20 entry",
        "shortDesc": "Extensive museum near Dighalipukhuri displaying medieval Ahom dynasty swords, royal armor, and village bamboo crafts.",
        "tip": "Check out the natural history section exhibiting reconstructed prehistoric fossils.",
        "city": "Guwahati",
        "state": "Assam",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 20,
        "coordObj": {
          "lat": 26.184,
          "lng": 91.751
        },
        "description": "Extensive museum near Dighalipukhuri displaying medieval Ahom dynasty swords, royal armor, and village bamboo crafts."
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
        "place": "Cannon Pav Bhaji & Ashok Vada Pav",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/1280px-Vada_Pav-Indian_street_food.JPG"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "26-meter basalt arch monument built in 1924 facing Mumbai Harbour, symbol of British entry and departure.",
        "tip": "Board an hourly scenic ferry to the rock-cut Elephanta Caves directly from the jetty behind the arch.",
        "city": "Mumbai (Bombay)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 18.922,
          "lng": 72.8347
        },
        "description": "26-meter basalt arch monument built in 1924 facing Mumbai Harbour, symbol of British entry and departure."
      },
      {
        "id": "mumbai-cst",
        "name": "Chhatrapati Shivaji Maharaj Terminus (CST)",
        "category": "heritage",
        "coordinates": [
          18.94,
          72.8353
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chhatrapati_shivaji_terminus%2C_esterno_01.jpg/1280px-Chhatrapati_shivaji_terminus%2C_esterno_01.jpg",
        "timing": "Open 24 Hours",
        "fee": "Free",
        "shortDesc": "UNESCO World Heritage Italian Gothic railway palace designed by F. W. Stevens, featuring stone gargoyles and stained glass.",
        "tip": "View from across the street at 8:00 PM when vibrant architectural illumination lights up the stone turrets.",
        "city": "Mumbai (Bombay)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 18.94,
          "lng": 72.8353
        },
        "description": "UNESCO World Heritage Italian Gothic railway palace designed by F. W. Stevens, featuring stone gargoyles and stained glass."
      },
      {
        "id": "mumbai-marine-drive",
        "name": "Marine Drive & Queen’s Necklace",
        "category": "scenic",
        "coordinates": [
          18.9432,
          72.823
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg/1280px-Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "3.6-kilometer C-shaped coastal promenade along Netaji Subhash Chandra Bose Road lined with Art Deco residences.",
        "tip": "Sit on the sea-facing tetrapods around 6:00 PM for the sunset over the Arabian Sea.",
        "city": "Mumbai (Bombay)",
        "state": "Maharashtra",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 18.9432,
          "lng": 72.823
        },
        "description": "3.6-kilometer C-shaped coastal promenade along Netaji Subhash Chandra Bose Road lined with Art Deco residences."
      },
      {
        "id": "mumbai-siddhivinayak",
        "name": "Siddhivinayak Ganpati Temple",
        "category": "temples",
        "coordinates": [
          19.0169,
          72.8304
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Shree_Siddhivinayak_Temple_Mumbai.jpg/1280px-Shree_Siddhivinayak_Temple_Mumbai.jpg",
        "timing": "5:30 AM - 9:50 PM",
        "fee": "Free",
        "shortDesc": "Revered temple dedicated to Lord Ganesha, featuring a gold-plated inner sanctum dome and black stone deity.",
        "tip": "Tuesdays are the most auspicious and crowded; visit early morning on weekdays for peaceful darshan.",
        "city": "Mumbai (Bombay)",
        "state": "Maharashtra",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 19.0169,
          "lng": 72.8304
        },
        "description": "Revered temple dedicated to Lord Ganesha, featuring a gold-plated inner sanctum dome and black stone deity."
      },
      {
        "id": "mumbai-csmvs",
        "name": "CSMVS (Prince of Wales Museum)",
        "category": "museums",
        "coordinates": [
          18.9269,
          72.8327
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Chhatrapati_Shivaji_Maharaj_Vastu_Sangrahalaya.jpg/1280px-Chhatrapati_Shivaji_Maharaj_Vastu_Sangrahalaya.jpg",
        "timing": "10:15 AM - 6:00 PM",
        "fee": "₹150 (Indians) / ₹650 (Foreigners)",
        "shortDesc": "Indo-Saracenic museum surrounded by palm gardens, housing priceless collections of ancient sculptures, miniature art, and weaponry.",
        "tip": "The audio guide narrated by actor Amitabh Bachchan is outstanding.",
        "city": "Mumbai (Bombay)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 150,
        "coordObj": {
          "lat": 18.9269,
          "lng": 72.8327
        },
        "description": "Indo-Saracenic museum surrounded by palm gardens, housing priceless collections of ancient sculptures, miniature art, and weaponry."
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
        "place": "Fisherman’s Wharf & Ritz Classic, Panaji",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Beef_Vindaloo_-_Chilli_Mama%2C_Chadstone_%283014236693%29.jpg/1280px-Beef_Vindaloo_-_Chilli_Mama%2C_Chadstone_%283014236693%29.jpg"
      },
      {
        "name": "Pork Vindaloo & Poi Bread",
        "desc": "Fiery garlic, vinegar, and chili braised pork paired with crusty Goan poi bread.",
        "place": "Viva Panjim, Fontainhas",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Beef_Vindaloo_-_Chilli_Mama%2C_Chadstone_%283014236693%29.jpg/1280px-Beef_Vindaloo_-_Chilli_Mama%2C_Chadstone_%283014236693%29.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg",
        "timing": "9:00 AM - 6:30 PM",
        "fee": "Free",
        "shortDesc": "UNESCO World Heritage baroque church built in 1605, holding the sacred relic mortal remains of St. Francis Xavier.",
        "tip": "Notice the basalt facade without plaster, revealing centuries-old laterite craftsmanship.",
        "city": "Goa",
        "state": "Goa",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 15.5009,
          "lng": 73.9116
        },
        "description": "UNESCO World Heritage baroque church built in 1605, holding the sacred relic mortal remains of St. Francis Xavier."
      },
      {
        "id": "goa-aguada-fort",
        "name": "Fort Aguada & 1864 Lighthouse",
        "category": "heritage",
        "coordinates": [
          15.4925,
          73.7736
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fort_aguada.jpg",
        "timing": "9:30 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "17th-century Portuguese coastal fortress on Sinquerim beach with a freshwater cistern that supplied passing ships.",
        "tip": "Stand on the ocean-facing bastion for a panoramic view where the Mandovi River meets the Arabian Sea.",
        "city": "Goa",
        "state": "Goa",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 15.4925,
          "lng": 73.7736
        },
        "description": "17th-century Portuguese coastal fortress on Sinquerim beach with a freshwater cistern that supplied passing ships."
      },
      {
        "id": "goa-palolem-beach",
        "name": "Palolem Crescent Beach",
        "category": "scenic",
        "coordinates": [
          15.01,
          74.023
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Palolem_Beach%2C_South_Goa.jpg/1280px-Palolem_Beach%2C_South_Goa.jpg",
        "timing": "Open 24/7",
        "fee": "Free",
        "shortDesc": "Picturesque crescent-shaped bay with calm turquoise waters, coconut palms, and colorful beachfront wooden shacks.",
        "tip": "Rent a sea kayak in the morning to paddle around Canacona Island located right at the northern end.",
        "city": "Goa",
        "state": "Goa",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 15.01,
          "lng": 74.023
        },
        "description": "Picturesque crescent-shaped bay with calm turquoise waters, coconut palms, and colorful beachfront wooden shacks."
      },
      {
        "id": "goa-mangeshi",
        "name": "Shree Mangeshi Temple (Ponda)",
        "category": "temples",
        "coordinates": [
          15.443,
          73.968
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Shri-Mangesh-Temple%2CGoa.JPG",
        "timing": "6:00 AM - 10:00 PM",
        "fee": "Free",
        "shortDesc": "Famous 450-year-old Hindu temple dedicated to Lord Shiva, featuring a striking seven-story white Deepastambha lamp tower.",
        "tip": "Dress modestly; no beach shorts permitted within temple grounds.",
        "city": "Goa",
        "state": "Goa",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 15.443,
          "lng": 73.968
        },
        "description": "Famous 450-year-old Hindu temple dedicated to Lord Shiva, featuring a striking seven-story white Deepastambha lamp tower."
      },
      {
        "id": "goa-dudhsagar",
        "name": "Dudhsagar Waterfalls",
        "category": "scenic",
        "coordinates": [
          15.314,
          74.314
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Doodhsagar_Fall.jpg/1280px-Doodhsagar_Fall.jpg",
        "timing": "Safari departs 8:30 AM - 3:30 PM",
        "fee": "Jeep safari approx ₹500 - ₹800",
        "shortDesc": "One of India’s tallest four-tiered waterfalls (310 meters), resembling a cascading \"Sea of Milk\" amidst Western Ghats jungle.",
        "tip": "Watch for the railway bridge passing directly across the face of the rushing waterfall.",
        "city": "Goa",
        "state": "Goa",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 500,
        "coordObj": {
          "lat": 15.314,
          "lng": 74.314
        },
        "description": "One of India’s tallest four-tiered waterfalls (310 meters), resembling a cascading \"Sea of Milk\" amidst Western Ghats jungle."
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
        "place": "Das Khaman & Chandravilas",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/65/Dhokla_on_Gujrart.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GANDHI_ASHRAM_03.jpg/1280px-GANDHI_ASHRAM_03.jpg",
        "timing": "8:30 AM - 6:30 PM",
        "fee": "Free",
        "shortDesc": "Headquarters of Mahatma Gandhi from 1917 to 1930 from where the historic Salt March to Dandi was launched.",
        "tip": "Visit Gandhi’s modest cottage Hriday Kunj to view his original spinning wheel (charkha) and spectacles.",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 23.0605,
          "lng": 72.58
        },
        "description": "Headquarters of Mahatma Gandhi from 1917 to 1930 from where the historic Salt March to Dandi was launched."
      },
      {
        "id": "ahmedabad-adalaj-stepwell",
        "name": "Adalaj Stepwell (Rudabai Stepwell)",
        "category": "heritage",
        "coordinates": [
          23.1667,
          72.5833
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Adalaj_ki_Vav_Gujarat_240A1370_72.jpg/1280px-Adalaj_ki_Vav_Gujarat_240A1370_72.jpg",
        "timing": "8:00 AM - 6:00 PM",
        "fee": "Free",
        "shortDesc": "Five-story deep underground architectural marvel built in 1498 with Solanki carvings and subterranean temperature cooling.",
        "tip": "Walk all the way down to the water level to feel the temperature drop by up to 6 degrees Celsius.",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 23.1667,
          "lng": 72.5833
        },
        "description": "Five-story deep underground architectural marvel built in 1498 with Solanki carvings and subterranean temperature cooling."
      },
      {
        "id": "ahmedabad-sidi-saiyyed",
        "name": "Sidi Saiyyed Mosque (Tree of Life)",
        "category": "heritage",
        "coordinates": [
          23.028,
          72.582
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sidi_Saiyyed_Mosque%2C_Ahmedabad.jpg/1280px-Sidi_Saiyyed_Mosque%2C_Ahmedabad.jpg",
        "timing": "6:00 AM - 7:00 PM",
        "fee": "Free",
        "shortDesc": "1573 CE mosque celebrated globally for its ten semi-circular marble screens carved into delicate intertwined tree branches.",
        "tip": "The \"Tree of Life\" jali design is the official design emblem of the Indian Institute of Management Ahmedabad.",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 23.028,
          "lng": 72.582
        },
        "description": "1573 CE mosque celebrated globally for its ten semi-circular marble screens carved into delicate intertwined tree branches."
      },
      {
        "id": "ahmedabad-calico-museum",
        "name": "The Calico Museum of Textiles",
        "category": "museums",
        "coordinates": [
          23.056,
          72.593
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Calico_Museum_of_Textiles_Ahmedabad.jpg/1280px-Calico_Museum_of_Textiles_Ahmedabad.jpg",
        "timing": "Guided tours only (10:30 AM - 1:00 PM, Prior booking required)",
        "fee": "Free (Strict pre-registration online)",
        "shortDesc": "Premier textile museum in India showcasing 500 years of handwoven textiles, royal court costumes, and Kashmiri pashminas.",
        "tip": "Book your slot online weeks in advance as visitors are limited to 30 people per day.",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 23.056,
          "lng": 72.593
        },
        "description": "Premier textile museum in India showcasing 500 years of handwoven textiles, royal court costumes, and Kashmiri pashminas."
      },
      {
        "id": "ahmedabad-kankaria",
        "name": "Kankaria Lake & Promenade",
        "category": "scenic",
        "coordinates": [
          23.006,
          72.603
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Kankaria_Carnival_2_Ahmedabad.JPG/1280px-Kankaria_Carnival_2_Ahmedabad.JPG",
        "timing": "4:00 AM - 10:00 PM (Closed Mondays)",
        "fee": "₹25 entry",
        "shortDesc": "Circular lake commissioned in 1451 with a central Nagina Wadi garden island, light shows, and tree-lined jogging paths.",
        "tip": "Visit in the evening to ride the toy train around the 2.5 km perimeter of the illuminated lake.",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 23.006,
          "lng": 72.603
        },
        "description": "Circular lake commissioned in 1451 with a central Nagina Wadi garden island, light shows, and tree-lined jogging paths."
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
        "id": "khajuraho-kandariya",
        "name": "Kandariya Mahadeva Temple",
        "city": "Khajuraho",
        "state": "Madhya Pradesh",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          24.8532,
          79.9197
        ],
        "coordObj": {
          "lat": 24.8532,
          "lng": 79.9197
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Khajuraho.KandariyaMahadeva.jpg/1280px-Khajuraho.KandariyaMahadeva.jpg",
        "timing": "6:00 AM - 6:00 PM Daily",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "asiFee": 40,
        "historicalEra": "10th Century Chandela Dynasty",
        "description": "The largest and most ornate temple in Khajuraho with an 84-spire shikhara replicating Mount Kailash, decorated with 800+ sandstone sculptures.",
        "shortDesc": "Largest and most ornate Chandela temple with an 84-spire tower representing sacred Mount Kailash.",
        "tip": "Examine the south wall friezes with binoculars to appreciate the microscopic jewelry details carved in sandstone."
      },
      {
        "id": "khajuraho-lakshmana",
        "name": "Lakshmana Temple",
        "city": "Khajuraho",
        "state": "Madhya Pradesh",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          24.8535,
          79.9202
        ],
        "coordObj": {
          "lat": 24.8535,
          "lng": 79.9202
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Khajuraho-Lakshmana_temple.JPG",
        "timing": "6:00 AM - 6:00 PM Daily",
        "fee": "Included with Western Group ticket",
        "asiFee": 40,
        "historicalEra": "954 CE King Yashovarman Chandela",
        "description": "Immaculately preserved Panchayatana temple dedicated to Vaikuntha Vishnu, featuring exquisite battle processions, musicians, and celestial apsaras.",
        "shortDesc": "Exquisitely preserved 10th-century temple featuring elaborate friezes of royal hunts, cavalry, and celestial maidens.",
        "tip": "Look at the base platform frieze depicting a grand royal procession with elephants and horses."
      },
      {
        "id": "khajuraho-western-group",
        "name": "Western Group of Temples & Light Show",
        "city": "Khajuraho",
        "state": "Madhya Pradesh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          24.8525,
          79.9215
        ],
        "coordObj": {
          "lat": 24.8525,
          "lng": 79.9215
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Khajuraho_Western_Group.jpg/1280px-Khajuraho_Western_Group.jpg",
        "timing": "Sound & Light Show: 6:30 PM (English) / 7:30 PM (Hindi)",
        "fee": "₹250 (Light Show)",
        "asiFee": 40,
        "historicalEra": "10th–12th Century Chandela Dynasty",
        "description": "Lush manicured park containing the highest concentration of UNESCO-inscribed Chandela temples, narrated nightly via an Amitabh Bachchan audio light show.",
        "shortDesc": "UNESCO landscaped enclosure housing the premier Chandela temples, featuring an evening sound and light show.",
        "tip": "Carry insect repellent for the open-air evening sound and light performance."
      },
      {
        "id": "khajuraho-museum",
        "name": "Archaeological Museum Khajuraho",
        "city": "Khajuraho",
        "state": "Madhya Pradesh",
        "category": "museums",
        "categoryType": "Monument",
        "coordinates": [
          24.8512,
          79.9248
        ],
        "coordObj": {
          "lat": 24.8512,
          "lng": 79.9248
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Archaeological_Museum%2C_Khajuraho.jpg/1280px-Archaeological_Museum%2C_Khajuraho.jpg",
        "timing": "9:00 AM - 5:00 PM (Fridays Closed)",
        "fee": "₹5 (Indians) / ₹100 (Foreigners)",
        "asiFee": 5,
        "historicalEra": "1910 CE ASI Heritage Collection",
        "description": "Houses recovered 10th-century Chandela stone sculptures, Jain tirthankara idols, and the famous dancing Ganesha found during excavations.",
        "shortDesc": "Curated repository of salvaged 10th-century stone masterpieces, Jain sculptures, and colossal Ganesha statues.",
        "tip": "Great air-conditioned refuge right across from the Western group ticket gate."
      },
      {
        "id": "khajuraho-raneh-falls",
        "name": "Raneh Falls & Ken River Canyon",
        "city": "Khajuraho",
        "state": "Madhya Pradesh",
        "category": "scenic",
        "categoryType": "Scenic",
        "coordinates": [
          24.9126,
          79.8872
        ],
        "coordObj": {
          "lat": 24.9126,
          "lng": 79.8872
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Raneh_Falls_Canyon.jpg/1280px-Raneh_Falls_Canyon.jpg",
        "timing": "8:00 AM - 5:00 PM",
        "fee": "₹100 per vehicle + ₹50 guide fee",
        "asiFee": 0,
        "historicalEra": "Natural Volcanic Crystalline Gorge",
        "description": "Spectacular 30-meter deep canyon carved into multi-colored pure crystalline granite rocks including pink, red, and grey shades.",
        "shortDesc": "Vibrant 30-meter deep gorge of multi-colored crystalline granite with cascading seasonal waterfalls.",
        "tip": "Hire a local taxi for the 20 km drive; best visited immediately post-monsoon when the waterfalls are roaring."
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
        "place": "Katakirr Misal & Bedekar Tea Stall",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Kolhapuri_Misal_Pav.jpg/1280px-Kolhapuri_Misal_Pav.jpg"
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
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Front_view_of_Shaniwar_Wada_illuminated.jpg/1280px-Front_view_of_Shaniwar_Wada_illuminated.jpg",
        "timing": "9:30 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Historic 18th-century seven-story palace fort built in 1732 by Peshwa Baji Rao I, with massive teak spike-studded Dilli Darwaza.",
        "tip": "Stand before the Dilli Darwaza gate to admire the giant elephant-deterrent steel spikes.",
        "city": "Pune",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 18.5196,
          "lng": 73.8553
        },
        "description": "Historic 18th-century seven-story palace fort built in 1732 by Peshwa Baji Rao I, with massive teak spike-studded Dilli Darwaza."
      },
      {
        "id": "pune-aga-khan",
        "name": "Aga Khan Palace & Gandhi Memorial",
        "category": "heritage",
        "coordinates": [
          18.5524,
          73.9015
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pune_Palace.jpg/1280px-Pune_Palace.jpg",
        "timing": "9:00 AM - 5:30 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "Italianate palace built in 1892 where Mahatma Gandhi and Kasturba Gandhi were interned following the 1942 Quit India Resolution.",
        "tip": "Visit the peaceful marble samadhis of Kasturba Gandhi and Mahadev Desai in the shaded rose gardens.",
        "city": "Pune",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 18.5524,
          "lng": 73.9015
        },
        "description": "Italianate palace built in 1892 where Mahatma Gandhi and Kasturba Gandhi were interned following the 1942 Quit India Resolution."
      },
      {
        "id": "pune-dagdusheth",
        "name": "Shrimant Dagdusheth Halwai Ganpati",
        "category": "temples",
        "coordinates": [
          18.5165,
          73.8561
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG/1280px-Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG",
        "timing": "6:00 AM - 11:00 PM",
        "fee": "Free",
        "shortDesc": "One of the most revered and lavish Ganesha temples in Maharashtra, adorned with 40 kg of pure gold ornaments.",
        "tip": "Visit during early morning Kakad Aarti (around 6:00 AM) to experience the divine brass bells and mantras.",
        "city": "Pune",
        "state": "Maharashtra",
        "categoryType": "Temple",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 0,
        "coordObj": {
          "lat": 18.5165,
          "lng": 73.8561
        },
        "description": "One of the most revered and lavish Ganesha temples in Maharashtra, adorned with 40 kg of pure gold ornaments."
      },
      {
        "id": "pune-sinhagad",
        "name": "Sinhagad Fort (Lion Fort)",
        "category": "scenic",
        "coordinates": [
          18.3663,
          73.7558
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sinhagad.jpg/1280px-Sinhagad.jpg",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹50 entry per vehicle",
        "shortDesc": "Hilltop fortress perched 1,312 meters atop the Sahyadris, site of Tanaji Malusare’s heroic 1670 battle.",
        "tip": "Taste hot Pithla Bhakri and fresh matka curd prepared by local village stalls on the fort ramparts.",
        "city": "Pune",
        "state": "Maharashtra",
        "categoryType": "Scenic",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 18.3663,
          "lng": 73.7558
        },
        "description": "Hilltop fortress perched 1,312 meters atop the Sahyadris, site of Tanaji Malusare’s heroic 1670 battle."
      },
      {
        "id": "pune-raja-kelkar",
        "name": "Raja Dinkar Kelkar Museum",
        "category": "museums",
        "coordinates": [
          18.511,
          73.854
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Building_of_Raja_Dinkar_Kelkar_Museum%2C_Pune.jpg/1280px-Building_of_Raja_Dinkar_Kelkar_Museum%2C_Pune.jpg",
        "timing": "10:00 AM - 5:30 PM",
        "fee": "₹50 (Adults) / ₹20 (Children)",
        "shortDesc": "Fascinating collection of 20,000 medieval Indian everyday artifacts, carved wooden doors, and musical instruments.",
        "tip": "Admire the reconstructed Mastani Mahal palace courtyard inside the museum.",
        "city": "Pune",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 50,
        "coordObj": {
          "lat": 18.511,
          "lng": 73.854
        },
        "description": "Fascinating collection of 20,000 medieval Indian everyday artifacts, carved wooden doors, and musical instruments."
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
        "image": "https://upload.wikimedia.org/wikipedia/en/f/fc/Kailash_temple_%28Ellora_cave_no_15%29_at_Verul.png",
        "timing": "Sunrise to Sunset (Tuesdays Closed)",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "World’s largest monolithic rock excavation, carved top-to-bottom from a single basalt cliff by Rashtrakuta King Krishna I.",
        "tip": "Walk up the upper perimeter trail on the cliff edge to look down upon the colossal Kailasa temple complex.",
        "city": "Aurangabad (Chhatrapati Sambhajinagar)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 40,
        "coordObj": {
          "lat": 20.0268,
          "lng": 75.178
        },
        "description": "World’s largest monolithic rock excavation, carved top-to-bottom from a single basalt cliff by Rashtrakuta King Krishna I."
      },
      {
        "id": "aurangabad-ajanta-caves",
        "name": "Ajanta Caves (UNESCO World Heritage)",
        "category": "heritage",
        "coordinates": [
          20.5519,
          75.7033
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Ajanta_%2863%29.jpg",
        "timing": "9:00 AM - 5:00 PM (Mondays Closed)",
        "fee": "₹40 (Indians) / ₹600 (Foreigners)",
        "shortDesc": "30 rock-cut Buddhist cave monuments dating from 2nd century BCE, containing master frescoes of the Jataka tales.",
        "tip": "Hire an official ASI flashlight guide; flash photography is strictly banned to preserve the 2,000-year-old organic pigments.",
        "city": "Aurangabad (Chhatrapati Sambhajinagar)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 40,
        "coordObj": {
          "lat": 20.5519,
          "lng": 75.7033
        },
        "description": "30 rock-cut Buddhist cave monuments dating from 2nd century BCE, containing master frescoes of the Jataka tales."
      },
      {
        "id": "aurangabad-bibi-ka-maqbara",
        "name": "Bibi Ka Maqbara (Dakkhani Taj)",
        "category": "heritage",
        "coordinates": [
          19.9014,
          75.3203
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/The_Tomb_of_Dilras_Banu_Begum.jpg/1280px-The_Tomb_of_Dilras_Banu_Begum.jpg",
        "timing": "6:00 AM - 10:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "1660 CE marble mausoleum commissioned by Prince Azam Shah for his mother Dilras Banu Begum, closely resembling the Taj Mahal.",
        "tip": "Visit in the evening when the gardens are cool and the white dome is lit against the starry Deccan sky.",
        "city": "Aurangabad (Chhatrapati Sambhajinagar)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 19.9014,
          "lng": 75.3203
        },
        "description": "1660 CE marble mausoleum commissioned by Prince Azam Shah for his mother Dilras Banu Begum, closely resembling the Taj Mahal."
      },
      {
        "id": "aurangabad-daulatabad",
        "name": "Daulatabad (Devagiri) Hill Fort",
        "category": "heritage",
        "coordinates": [
          19.943,
          75.213
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Daulatabad_Fort_a_view.JPG/1280px-Daulatabad_Fort_a_view.JPG",
        "timing": "6:00 AM - 6:00 PM",
        "fee": "₹25 (Indians) / ₹300 (Foreigners)",
        "shortDesc": "12th-century conical hilltop citadel with ingenious defense mechanisms including pitch-dark mazes (Andhari) and moats.",
        "tip": "Carry a torch to navigate through the pitch-black Andhari subterranean maze.",
        "city": "Aurangabad (Chhatrapati Sambhajinagar)",
        "state": "Maharashtra",
        "categoryType": "Monument",
        "historicalEra": "Historic Cultural Period",
        "asiFee": 25,
        "coordObj": {
          "lat": 19.943,
          "lng": 75.213
        },
        "description": "12th-century conical hilltop citadel with ingenious defense mechanisms including pitch-dark mazes (Andhari) and moats."
      }
    ]
  },
  {
    "id": "ladakh",
    "name": "Ladakh & Kargil",
    "state": "Ladakh",
    "zone": "North",
    "coordinates": [
      34.1526,
      77.5771
    ],
    "tagline": "Land of high mountain passes, ancient gompas, and azure glacial lakes.",
    "heroImage": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    "bestTimeToVisit": "May to September (15°C - 25°C)",
    "bestDuration": "5-7 Days",
    "climate": "High-altitude desert with crisp cool sunshine and dramatic starry night skies",
    "overview": "Cradled between the Karakoram and Great Himalaya ranges, Ladakh is a spiritual sanctuary of 1,000-year-old Tibetan Buddhist monasteries perched on cliff faces, dramatic mountain passes, and tranquil glacial lakes.",
    "localFoodSpecialties": [
      {
        "name": "Ladakhi Thukpa & Momos",
        "desc": "Hand-rolled wheat noodle soup in aromatic broth served with steaming yak-cheese or veg dumplings.",
        "place": "Gesmo Restaurant, Fort Road, Leh",
        "image": "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80"
      },
      {
        "name": "Butter Tea (Gur Gur Chai) & Tingmo",
        "desc": "Traditional churned salted butter tea served with fluffy steamed flower bread and walnut chutney.",
        "place": "Alchi Kitchen, Chubi, Leh",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
      },
      {
        "name": "Chhurpi & Wild Apricot Jam",
        "desc": "Sun-dried organic yak cheese paired with sweet wild Ladakhi apricot preserves.",
        "place": "Leh Main Bazaar Organic Co-op",
        "image": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "places": [
      {
        "id": "ladakh-hemis-monastery",
        "name": "Hemis Monastery",
        "city": "Leh",
        "state": "Ladakh",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          33.9126,
          77.7064
        ],
        "coordObj": {
          "lat": 33.9126,
          "lng": 77.7064
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Hemis_Monastery_02.jpg/1280px-Hemis_Monastery_02.jpg",
        "timing": "8:00 AM - 6:00 PM Daily",
        "fee": "₹50 (Entry)",
        "asiFee": 50,
        "historicalEra": "11th Century / 1672 CE Drukpa Lineage",
        "description": "The largest and wealthiest monastery in Ladakh, home to the sacred golden statue of Guru Padmasambhava and priceless Tibetan thangkas.",
        "shortDesc": "Largest and wealthiest monastery in Ladakh, home to the sacred golden statue of Guru Padmasambhava.",
        "tip": "Visit during the annual Hemis Tsechu festival in June/July to witness the sacred Cham masked dances."
      },
      {
        "id": "ladakh-pangong-tso",
        "name": "Pangong Tso Lake",
        "city": "Changthang",
        "state": "Ladakh",
        "category": "scenic",
        "categoryType": "Scenic",
        "coordinates": [
          33.7595,
          78.6674
        ],
        "coordObj": {
          "lat": 33.7595,
          "lng": 78.6674
        },
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "timing": "Open 24/7 (Inner Line Permit required)",
        "fee": "Free (ILP Environment Fee ₹400)",
        "asiFee": 0,
        "historicalEra": "Ancient Endorheic Himalayan Lake",
        "description": "High-altitude endorheic lake situated at 4,350 meters that dynamically changes color from turquoise to deep indigo throughout the day.",
        "shortDesc": "Breathtaking high-altitude saltwater lake at 4,350m spanning from India to Tibet, known for shifting shades of blue.",
        "tip": "Wake up early for tranquil dawn reflections before morning breezes ripple the glass-like water surface."
      },
      {
        "id": "ladakh-thiksey-monastery",
        "name": "Thiksey Monastery",
        "city": "Thiksey",
        "state": "Ladakh",
        "category": "temples",
        "categoryType": "Temple",
        "coordinates": [
          34.0567,
          77.6667
        ],
        "coordObj": {
          "lat": 34.0567,
          "lng": 77.6667
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Thikse_Monastery_.jpg/1280px-Thikse_Monastery_.jpg",
        "timing": "7:00 AM - 7:00 PM Daily",
        "fee": "₹50 (Entry)",
        "asiFee": 50,
        "historicalEra": "15th Century Gelugpa Order",
        "description": "Twelve-story whitewashed complex resembling Tibet's Potala Palace, housing a 15-meter statue of Maitreya (Future Buddha).",
        "shortDesc": "Twelve-story cliffside complex resembling Lhasa's Potala Palace, housing the majestic 15-meter Maitreya Buddha.",
        "tip": "Arrive at 7:00 AM for the morning prayer congregation featuring monk chants and conch shells."
      },
      {
        "id": "ladakh-shanti-stupa",
        "name": "Shanti Stupa",
        "city": "Leh",
        "state": "Ladakh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          34.1678,
          77.5752
        ],
        "coordObj": {
          "lat": 34.1678,
          "lng": 77.5752
        },
        "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Leh%2C_Shanti_Stupa%2C_Ladakh%2C_India.jpg/1280px-Leh%2C_Shanti_Stupa%2C_Ladakh%2C_India.jpg",
        "timing": "5:00 AM - 9:00 PM Daily",
        "fee": "Free",
        "asiFee": 0,
        "historicalEra": "1991 CE Japanese-Ladakhi Buddhist Stupa",
        "description": "White-domed peace stupa perched on Changspa hill offering panoramic 360-degree vistas of Leh town and the snowcapped Stok Kangri range.",
        "shortDesc": "White-domed Buddhist monument perched on a steep hill overlooking Leh, illuminated at twilight.",
        "tip": "Climb up 30 minutes before sunset for golden-hour illumination of the Indus valley."
      },
      {
        "id": "ladakh-kargil-memorial",
        "name": "Kargil War Memorial & Dras",
        "city": "Dras",
        "state": "Ladakh",
        "category": "heritage",
        "categoryType": "Monument",
        "coordinates": [
          34.4326,
          75.7602
        ],
        "coordObj": {
          "lat": 34.4326,
          "lng": 75.7602
        },
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Kargil_War_Memorial%2C_Dras.jpg/1280px-Kargil_War_Memorial%2C_Dras.jpg",
        "timing": "9:00 AM - 6:00 PM",
        "fee": "₹25 (Entry)",
        "asiFee": 25,
        "historicalEra": "Modern Indian Military Memorial",
        "description": "Pink sandstone memorial at the foothills of Tololing Hill honoring the soldiers of Operation Vijay, featuring the Amar Jawan Jyoti.",
        "shortDesc": "Historic military memorial situated in Dras commemorating the brave soldiers of the 1999 Kargil conflict.",
        "tip": "Visit the Manoj Pandey War Gallery inside for captured memorabilia and battle documentary screenings."
      }
    ]
  }
];

export const COMMUNITY_GEMS = [
  {
    "id": "gem-1",
    "city": "Varanasi",
    "title": "Secret Dawn Boat Ride to Scindia Ghat Leaning Temple",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Matri-rin_Temple_in_Varanasi.jpg/1280px-Matri-rin_Temple_in_Varanasi.jpg",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Panna_Meena_ka_Kund_01.jpg/1280px-Panna_Meena_ka_Kund_01.jpg",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rajon_Ki_Baoli_-_Delhi_-_01.jpg/1280px-Rajon_Ki_Baoli_-_Delhi_-_01.jpg",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mehtab_Bagh_facing_Taj_Mahal.JPG/1280px-Mehtab_Bagh_facing_Taj_Mahal.JPG",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Fried_Fish_and_French_Fries.jpg",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/1280px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/211_at_Esplanade.jpg/1280px-211_at_Esplanade.jpg",
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
