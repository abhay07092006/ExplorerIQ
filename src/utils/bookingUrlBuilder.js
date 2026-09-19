/**
 * Dynamic Booking.com URL Builder Utility
 * Constructs verified Booking.com search and referral URLs with live check-in/check-out dates,
 * guest counts, room allocation, and optional specific property targeting.
 * Supports ISO (YYYY-MM-DD), Indian/UK (DD-MM-YYYY), slash-delimited (DD/MM/YYYY), and JS Date objects.
 */

/**
 * Convert any date (Date object, DD-MM-YYYY, DD/MM/YYYY, or YYYY-MM-DD) into ISO YYYY-MM-DD string
 * @param {Date|string} dateStr
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export const formatToIso = (dateStr) => {
  if (!dateStr) return '';
  if (dateStr instanceof Date) {
    if (isNaN(dateStr.getTime())) return '';
    const y = dateStr.getFullYear();
    const m = String(dateStr.getMonth() + 1).padStart(2, '0');
    const d = String(dateStr.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const str = String(dateStr).trim();

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(str)) {
    const parts = str.split('-');
    return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
  }

  // DD-MM-YYYY format
  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(str)) {
    const parts = str.split('-');
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }

  // DD/MM/YYYY format
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
    const parts = str.split('/');
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }

  // Fallback to JS Date parsing
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return str;
};

export const formatDate = formatToIso;

/**
 * Standard buildBookingUrl function
 * @param {Object} options
 * @param {string} [options.destination="India"] - Destination city or country
 * @param {string|Date} [options.checkIn] - Check-in date string or Date
 * @param {string|Date} [options.checkOut] - Check-out date string or Date
 * @param {string|Date} [options.checkInDate] - Alias for checkIn
 * @param {string|Date} [options.checkOutDate] - Alias for checkOut
 * @param {number} [options.guestsCount] - Number of guests
 * @param {number} [options.guests] - Alias for guestsCount
 * @param {string} [options.hotelName=""] - Optional hotel property name
 * @returns {string} Official Booking.com search URL
 */
export const buildBookingUrl = ({
  destination = 'India',
  checkIn,
  checkOut,
  checkInDate,
  checkOutDate,
  guestsCount,
  guests,
  hotelName = ''
} = {}) => {
  const rawCheckIn = checkIn || checkInDate;
  const rawCheckOut = checkOut || checkOutDate;
  const guestParam = guestsCount !== undefined ? guestsCount : (guests !== undefined ? guests : 2);
  const numGuests = Math.max(1, parseInt(guestParam, 10) || 2);

  let formattedCheckIn = formatToIso(rawCheckIn);
  let formattedCheckOut = formatToIso(rawCheckOut);

  // Fallback to sensible defaults if missing
  if (!formattedCheckIn) {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    formattedCheckIn = formatToIso(now);
  }

  if (!formattedCheckOut) {
    const d = new Date(formattedCheckIn);
    d.setDate(d.getDate() + 3);
    formattedCheckOut = formatToIso(d);
  }

  // Enforce checkout strictly after checkin
  if (formattedCheckOut <= formattedCheckIn) {
    const d = new Date(formattedCheckIn);
    d.setDate(d.getDate() + 1);
    formattedCheckOut = formatToIso(d);
  }

  // Clean hotelName: strip mock catalog slashes and keep recognizable hotel branding
  const cleanHotel = hotelName ? hotelName.split('/')[0].trim() : '';
  let queryLocation = destination || 'India';

  if (cleanHotel && destination) {
    queryLocation = cleanHotel.toLowerCase().includes(destination.toLowerCase())
      ? cleanHotel
      : `${cleanHotel}, ${destination}`;
  } else if (cleanHotel) {
    queryLocation = cleanHotel;
  }

  const baseUrl = 'https://www.booking.com/searchresults.html';
  const params = new URLSearchParams({
    ss: queryLocation.trim(),
    checkin: formattedCheckIn,
    checkout: formattedCheckOut,
    group_adults: numGuests.toString(),
    no_rooms: '1'
  });

  return `${baseUrl}?${params.toString()}`;
};

export const getBookingUrl = buildBookingUrl;
export default buildBookingUrl;
