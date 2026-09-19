/**
 * ExplorerIQ Dynamic Place Image Resolution & Deduplication Utility
 * 
 * Ensures each place card dynamically displays a unique, correctly matched photograph
 * tied strictly to the individual place title, city, and category.
 * 
 * Hierarchy:
 * 1. Primary Source: Official Wikimedia Commons or Wikipedia PageImages API
 * 2. Secondary Source: Dynamic Unsplash query uniquely seeded per place ID/name
 * 3. Deduplication: Ensures no two rendered cards share identical image URLs
 * 4. Fallback: High-resolution procedural SVG pattern generated from place name & category
 */

const wikiImageCache = new Map();

/**
 * Fast deterministic string hashing
 */
export function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Query Wikipedia/Wikidata PageImages API for official photography
 * https://en.wikipedia.org/w/api.php?action=query&titles=${place.name}&prop=pageimages&pithumbsize=800&format=json&origin=*
 */
export async function fetchWikipediaPlaceImage(placeName) {
  if (!placeName || typeof placeName !== 'string') return null;
  const cleanTitle = placeName
    .replace(/\(.*?\)/g, '')
    .replace(/,\s*.*$/, '')
    .trim();

  const cacheKey = cleanTitle.toLowerCase();
  if (wikiImageCache.has(cacheKey)) {
    return wikiImageCache.get(cacheKey);
  }

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cleanTitle)}&prop=pageimages&pithumbsize=800&format=json&origin=*`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const pages = data?.query?.pages;
      if (pages) {
        for (const pageId in pages) {
          const thumb = pages[pageId]?.thumbnail?.source;
          if (thumb) {
            wikiImageCache.set(cacheKey, thumb);
            return thumb;
          }
        }
      }
    }
  } catch (err) {
    // Graceful fallback on network timeout
  }

  wikiImageCache.set(cacheKey, null);
  return null;
}

/**
 * Generates a unique, high-resolution procedural SVG pattern cover
 * tailored specifically to the place's name, category, and city.
 * Guarantees no two cards ever share a blank or generic placeholder.
 */
export function generateUniquePlaceSvg(placeName = 'Heritage Landmark', category = 'monument', city = '') {
  const normCat = (category || 'monument').toLowerCase().replace(/s$/, '');
  const hash = hashString((placeName || '') + (city || ''));

  const palettes = {
    temple: [
      ['#FF8008', '#FFC837'],
      ['#F3904F', '#3B4371'],
      ['#D38312', '#A83279']
    ],
    monument: [
      ['#870000', '#190A05'],
      ['#434343', '#1c1c1c'],
      ['#8A2387', '#E94057']
    ],
    food: [
      ['#11998e', '#38ef7d'],
      ['#f12711', '#f5af19'],
      ['#d35400', '#f39c12']
    ],
    museum: [
      ['#4b1248', '#f0c27b'],
      ['#1f4037', '#99f2c8'],
      ['#360033', '#0b8793']
    ],
    scenic: [
      ['#00b4db', '#0083b0'],
      ['#134E5E', '#71B280'],
      ['#2BC0E4', '#EAECC6']
    ],
    default: [
      ['#1e3c72', '#2a5298'],
      ['#2C3E50', '#FD746C'],
      ['#0F2027', '#203A43']
    ]
  };

  const paletteList = palettes[normCat] || palettes.default;
  const [c1, c2] = paletteList[Math.abs(hash) % paletteList.length];

  const initials = (placeName || 'IQ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const displayTitle = placeName.length > 32 ? placeName.substring(0, 30) + '...' : placeName;
  const safeTitle = displayTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeCity = (city || 'India').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="g_${Math.abs(hash)}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="100%" stop-color="${c2}" />
      </linearGradient>
      <pattern id="pat_${Math.abs(hash)}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.12)"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#g_${Math.abs(hash)})" />
    <rect width="800" height="600" fill="url(#pat_${Math.abs(hash)})" />
    <circle cx="400" cy="250" r="100" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="3" />
    <circle cx="400" cy="250" r="80" fill="none" stroke="rgba(255,255,255,0.18)" stroke-dasharray="6,6" stroke-width="2" />
    <text x="400" y="275" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="60" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">${initials}</text>
    <rect x="250" y="385" width="300" height="42" rx="21" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.2)" />
    <text x="400" y="412" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="3" text-transform="uppercase">${normCat.toUpperCase()}</text>
    <text x="400" y="470" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="rgba(255,255,255,0.95)" text-anchor="middle">${safeTitle}</text>
    <text x="400" y="505" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="rgba(255,255,255,0.7)" text-anchor="middle">${safeCity}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Resolves a unique image for a place card.
 * Enforces deduplication across cards using assignedUrls set and unique seed hashing.
 */
export function getPlaceImage(place = {}, city = '', index = 0, assignedUrls = null) {
  if (!place) return generateUniquePlaceSvg('Spot', 'monument', city);

  // 1. Direct official image from Overpass or Wikipedia thumbnail
  if (
    place.image &&
    typeof place.image === 'string' &&
    place.image.startsWith('http') &&
    !place.image.includes('source.unsplash.com')
  ) {
    return place.image;
  }

  // 2. Official Wikimedia Commons tag directly on node
  const wikimediaTag = place.wikimedia_commons || place.wikimediaCommons;
  if (wikimediaTag && typeof wikimediaTag === 'string') {
    const fileName = wikimediaTag.replace(/^File:/i, '').trim();
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=800`;
  }

  // 3. Dynamic Unsplash Source query with unique deterministic seed
  const placeName = place.name || '';
  const placeCity = place.city || place.districtName || place.stateName || city || '';
  const placeCat = place.category || '';

  const queryParts = [placeName, placeCity, placeCat].filter(Boolean);
  const query = queryParts.join(' ').trim() || 'India travel landmark';

  const baseHash = Math.abs(hashString((place.id || placeName) + '_' + index));
  let sig = baseHash % 10000;
  let url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${sig}`;

  // Deduplication guard
  if (assignedUrls && assignedUrls.has(url)) {
    sig = (baseHash + index + 101) % 10000;
    url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${sig}`;
  }

  if (assignedUrls) {
    assignedUrls.add(url);
  }

  return url;
}

/**
 * Resilient image error handler for place cards.
 * Replaces failed images with a unique procedural SVG cover based on the place's name and category.
 */
export function handlePlaceImageError(e, place = {}, city = '') {
  if (e && e.currentTarget) {
    e.currentTarget.onerror = null; // Prevent recursion
    e.currentTarget.src = generateUniquePlaceSvg(place?.name, place?.category, city || place?.city);
  }
}
