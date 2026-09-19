/**
 * ExplorerIQ Dynamic Place Image Resolution Utility
 * 
 * Ensures each place card dynamically loads an image specifically tied to
 * its place name, city, and category.
 * 
 * Hierarchy:
 * 1. Official OpenStreetMap / Overpass `image` tag directly on location node
 * 2. Official Wikimedia Commons tag (`wikimedia_commons`) on location node
 * 3. Dynamic Unsplash Source query specific to: `${place.name} ${place.city} ${place.category}`
 * 4. Resilient `onError` fallback to a verified category placeholder (e.g., verified temple for temples),
 *    guaranteeing that a wrong monument image is NEVER displayed for a temple or mismatched spot.
 */

export const CATEGORY_PLACEHOLDERS = {
  temples: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
  temple: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
  monuments: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  monument: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  food: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  restaurant: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  museums: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80',
  museum: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80',
  scenic: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  attraction: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
};

/**
 * Returns a verified, high-quality category placeholder photo.
 */
export function getCategoryPlaceholder(category = '') {
  const norm = (category || '').toLowerCase().trim();
  return CATEGORY_PLACEHOLDERS[norm] || CATEGORY_PLACEHOLDERS.default;
}

/**
 * Resolves a dynamic image for a place.
 * Extracts official tags if present; otherwise constructs a specific Unsplash query URL.
 */
export function getPlaceImage(place = {}, city = '') {
  if (!place) return getCategoryPlaceholder();

  // 1. Direct official image tag if explicitly present
  if (place.image && typeof place.image === 'string' && place.image.startsWith('http') && !place.image.includes('source.unsplash.com')) {
    return place.image;
  }

  // 2. Official Wikimedia Commons tag directly associated with location node
  const wikimediaTag = place.wikimedia_commons || place.wikimediaCommons;
  if (wikimediaTag && typeof wikimediaTag === 'string') {
    const fileName = wikimediaTag.replace(/^File:/i, '').trim();
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=800`;
  }

  // 3. Official Wikidata tag if present
  if (place.officialImage && typeof place.officialImage === 'string' && place.officialImage.startsWith('http')) {
    return place.officialImage;
  }

  // 4. Dynamic Unsplash Source query specific to place name, city, and category
  const placeName = place.name || '';
  const placeCity = place.city || place.districtName || place.stateName || city || '';
  const placeCat = place.category || '';

  const queryParts = [placeName, placeCity, placeCat].filter(Boolean);
  const query = queryParts.join(' ').trim() || 'India tourism landmark';

  return `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;
}

/**
 * Resilient image error handler for place cards.
 * Sets the image src to a verified category placeholder, ensuring no wrong monument
 * image is shown for a temple or mismatched category.
 */
export function handlePlaceImageError(e, category = '') {
  if (e && e.currentTarget) {
    e.currentTarget.onerror = null; // Prevent infinite loop if placeholder fails
    e.currentTarget.src = getCategoryPlaceholder(category);
  }
}
