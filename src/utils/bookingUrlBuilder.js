/**
 * Dynamic Booking.com URL Builder Utility
 * Constructs verified Booking.com search and referral URLs with live check-in/check-out dates,
 * guest counts, room allocation, and optional specific property targeting.
 * Supports both ISO (YYYY-MM-DD) and Indian/UK (DD-MM-YYYY) date formats.
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
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
    const parts = str.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  // DD/MM/YYYY format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    const parts = str.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
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
 * @param {string} options.destination - Destination city or country
 * @param {string|Date} options.checkIn - Check-in date string or Date
 * @param {string|Date} options.checkOut - Check-out date string or Date
 * @param {number} [options.guestsCount=2] - Number of guests
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
  guests = 2,
  hotelName = ''
} = {}) => {
  const rawCheckIn = checkIn || checkInDate;
  const rawCheckOut = checkOut || checkOutDate;
  const numGuests = Math.max(1, parseInt(guestsCount || guests, 10) || 2);
  const rooms = Math.max(1, Math.ceil(numGuests / 2));

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

  const queryLocation = hotelName ? `${hotelName}, ${destination}` : destination;
  const baseUrl = 'https://www.booking.com/searchresults.html';

  // Parse components for additional Booking.com legacy parameter compatibility
  const [ciYear, ciMonth, ciDay] = formattedCheckIn.split('-').map(Number);
  const [coYear, coMonth, coDay] = formattedCheckOut.split('-').map(Number);

  const params = new URLSearchParams({
    ss: queryLocation.trim(),
    checkin: formattedCheckIn,
    checkout: formattedCheckOut,
    group_adults: numGuests.toString(),
    no_rooms: rooms.toString(),
    checkin_year: ciYear.toString(),
    checkin_month: ciMonth.toString(),
    checkin_monthday: ciDay.toString(),
    checkout_year: coYear.toString(),
    checkout_month: coMonth.toString(),
    checkout_monthday: coDay.toString()
  });

  return `${baseUrl}?${params.toString()}`;
};

export const getBookingUrl = buildBookingUrl;
export default buildBookingUrl;
