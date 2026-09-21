// ExplorerIQ Image Fallback Utility
// Provides high-reliability default placeholder images & error handling

export const DEFAULT_TRAVEL_FALLBACK = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80';
export const DEFAULT_AVATAR_FALLBACK = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';

/**
 * Standard error fallback for image tags across the app.
 * Replaces broken or failed images with a clean, high-resolution aesthetic travel photograph.
 */
export function handleImageError(e, fallback = DEFAULT_TRAVEL_FALLBACK) {
  if (e && e.currentTarget) {
    e.currentTarget.onerror = null; // Prevent recursion if fallback fails
    e.currentTarget.src = fallback;
  }
}
