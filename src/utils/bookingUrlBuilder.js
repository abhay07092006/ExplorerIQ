/**
 * Dynamic Booking.com URL Builder Utility
 * Constructs verified Booking.com search and referral URLs with live check-in/check-out dates,
 * guest counts, room allocation, and optional specific property targeting.
 */

/**
 * Format a Date object or date string into YYYY-MM-DD
 * @param {Date|string} date 
 * @returns {string|null}
 */
export const formatDate = (date) => {
  if (!date) return null;
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
    return date.trim();
  }
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Generate a dynamic Booking.com search URL with dates, guests, and destination/hotel
 * @param {Object} options
 * @param {string} options.destination - City or destination name (e.g. 'Jaipur')
 * @param {string|Date} [options.checkInDate] - Check-in date (YYYY-MM-DD or Date)
 * @param {string|Date} [options.checkOutDate] - Check-out date (YYYY-MM-DD or Date)
 * @param {number} [options.guests=1] - Number of guests
 * @param {string} [options.hotelName] - Optional property name to search directly
 * @returns {string} Fully qualified Booking.com search URL
 */
export const getBookingUrl = ({
  destination = 'India',
  checkInDate,
  checkOutDate,
  guests = 1,
  hotelName = ''
} = {}) => {
  const now = new Date();
  const defaultCheckIn = formatDate(now);
  const defaultCheckOut = formatDate(new Date(now.getTime() + 86400000)); // +1 day

  let formattedCheckIn = formatDate(checkInDate) || defaultCheckIn;
  let formattedCheckOut = formatDate(checkOutDate) || defaultCheckOut;

  // Ensure checkOut is strictly after checkIn
  if (formattedCheckOut <= formattedCheckIn) {
    const ci = new Date(formattedCheckIn);
    ci.setDate(ci.getDate() + 1);
    formattedCheckOut = formatDate(ci) || defaultCheckOut;
  }

  // Parse year, month, day components
  const [ciYear, ciMonth, ciDay] = formattedCheckIn.split('-').map(Number);
  const [coYear, coMonth, coDay] = formattedCheckOut.split('-').map(Number);

  const guestCount = Math.max(1, parseInt(guests, 10) || 1);
  const rooms = Math.max(1, Math.ceil(guestCount / 2));

  // Destination search query string
  let queryTarget = destination;
  if (hotelName && destination) {
    queryTarget = `${hotelName}, ${destination}`;
  } else if (hotelName) {
    queryTarget = hotelName;
  }

  const encodedSS = encodeURIComponent(queryTarget.trim());

  return `https://www.booking.com/searchresults.html?ss=${encodedSS}&checkin=${formattedCheckIn}&checkout=${formattedCheckOut}&group_adults=${guestCount}&no_rooms=${rooms}&checkin_year=${ciYear}&checkin_month=${ciMonth}&checkin_monthday=${ciDay}&checkout_year=${coYear}&checkout_month=${coMonth}&checkout_monthday=${coDay}`;
};

export default getBookingUrl;
