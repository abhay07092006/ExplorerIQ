import { useState } from 'react';
import {
  User,
  MapPin,
  Calendar,
  Bookmark,
  CalendarDays,
  Sparkles,
  Scan,
  Trash2,
  ExternalLink,
  Edit3,
  LogOut,
  Navigation,
  Check,
  X,
  Star,
  ShieldCheck,
  Clock,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTravel } from '../../context/useTravel';
import { handleImageError } from '../../utils/imageUtils';

export default function UserProfile() {
  const { user, currentUser, logout, updateProfile, deleteTrip, toggleBookmark } = useAuth();
  const { setActiveTab, setPlannerParams } = useTravel();

  const activeUser = currentUser || user;
  const [activeTab, setActiveProfileTab] = useState('trips'); // 'trips' | 'bookmarks' | 'scans_reviews'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(activeUser?.name || '');
  const [editBio, setEditBio] = useState(activeUser?.bio || '');
  const [editHomeCity, setEditHomeCity] = useState(activeUser?.homeCity || '');
  const [editAvatarUrl, setEditAvatarUrl] = useState(activeUser?.avatarUrl || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!activeUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <User className="w-16 h-16 text-slate-300 mx-auto animate-bounce" />
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Sign in to view your travel dashboard, saved itineraries, and bookmarks.
        </p>
      </div>
    );
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name: editName,
        bio: editBio,
        homeCity: editHomeCity,
        avatarUrl: editAvatarUrl
      });
      setIsEditingProfile(false);
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadTripIntoPlanner = (trip) => {
    if (setPlannerParams) {
      setPlannerParams((prev) => ({
        ...prev,
        destinationId: trip.destination?.toLowerCase() || prev.destinationId,
        guests: trip.guests || 2,
        totalBudget: trip.totalBudget || 25000,
        currency: trip.currency || 'INR'
      }));
    }
    setActiveTab('planner');
  };

  const savedTrips = activeUser.savedTrips || [];
  const bookmarkedPlaces = activeUser.bookmarkedPlaces || [];
  const contributedReviews = activeUser.contributedReviews || [];
  const scannedMonuments = activeUser.scannedMonuments || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Profile Header Banner */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-sky-600 via-indigo-600 to-slate-900" />

        <div className="relative pt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={activeUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={activeUser.name}
                onError={handleImageError}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-slate-100"
              />
              <span className="absolute bottom-1 right-1 p-1 bg-emerald-500 text-white rounded-full ring-2 ring-white" title="Active Explorer">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{activeUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 text-[10px] font-bold border border-sky-500/20">
                  Verified Traveler
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {activeUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {activeUser.homeCity || 'India'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Member Since {new Date(activeUser.joinedDate || activeUser.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </p>
              <p className="text-xs text-slate-600 max-w-xl pt-1">
                {activeUser.bio || 'Passionate explorer uncovering the architectural wonders and rich cultural tapestries of India.'}
              </p>
            </div>
          </div>

          {/* Account Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => {
                setEditName(activeUser.name);
                setEditBio(activeUser.bio || '');
                setEditHomeCity(activeUser.homeCity || '');
                setEditAvatarUrl(activeUser.avatarUrl || '');
                setIsEditingProfile(true);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 3 Main Stat Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setActiveProfileTab('trips')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              activeTab === 'trips'
                ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-500/20'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <CalendarDays className="w-5 h-5 text-sky-500" />
              <span className="text-xl font-extrabold text-slate-800">{savedTrips.length}</span>
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-2">
              My Saved Trips & Itineraries
            </p>
          </div>

          <div
            onClick={() => setActiveProfileTab('bookmarks')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <span className="text-xl font-extrabold text-slate-800">{bookmarkedPlaces.length}</span>
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-2">
              Bookmarked Places
            </p>
          </div>

          <div
            onClick={() => setActiveProfileTab('scans_reviews')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              activeTab === 'scans_reviews'
                ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-500/20'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Scan className="w-5 h-5 text-emerald-500" />
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-xl font-extrabold text-slate-800">
                {scannedMonuments.length + contributedReviews.length}
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-2">
              My Scanned Monuments & Reviews
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons for the 3 Core Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveProfileTab('trips')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'trips'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Tab 1: My Saved Trips & Itineraries ({savedTrips.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('bookmarks')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'bookmarks'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Tab 2: Bookmarked Places ({bookmarkedPlaces.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('scans_reviews')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'scans_reviews'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Scan className="w-4 h-4" />
          <span>Tab 3: My Scanned Monuments & Reviews ({scannedMonuments.length + contributedReviews.length})</span>
        </button>
      </div>

      {/* TAB 1: MY SAVED TRIPS & ITINERARIES */}
      {activeTab === 'trips' && (
        <div className="space-y-4">
          {savedTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTrips.map((trip) => (
                <div
                  key={trip.tripId || trip._id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                          {trip.durationDays} Days • {trip.guests} Guests
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                          {trip.cityName || trip.destinationCity || trip.destination} Trip Plan
                        </h3>
                      </div>
                      <button
                        onClick={() => deleteTrip(trip.tripId || trip._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Total Budget:</span>
                        <span className="font-bold text-slate-900">
                          {trip.currencySymbol || '₹'}
                          {(trip.totalBudget || trip.budget?.totalBudget || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Grand Total:</span>
                        <span className="font-bold text-sky-600">
                          {trip.currencySymbol || '₹'}
                          {(trip.grandTotal || trip.budget?.grandTotal || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                      {trip.hotel && (
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                          <span className="text-slate-400">Hotel:</span>
                          <span className="font-medium truncate max-w-[160px]">{trip.hotel.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      Saved {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleLoadTripIntoPlanner(trip)}
                      className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <span>Open in Planner</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <CalendarDays className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Saved Itineraries Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Generate a smart travel plan using live hotel rates and monument fees, then click "Save to Profile" to store it here.
              </p>
              <button
                onClick={() => setActiveTab('planner')}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Go to Smart Planner
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BOOKMARKED PLACES */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedPlaces.map((place) => (
                <div
                  key={place.placeId || place._id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 bg-slate-100">
                      <img
                        src={place.image}
                        alt={place.name || place.placeName}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-900/80 text-white border border-slate-700">
                        {place.category}
                      </span>
                      <button
                        onClick={() => toggleBookmark(place)}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-amber-500 text-slate-950 shadow-md"
                        title="Remove Bookmark"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{place.name || place.placeName}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span>{place.city || place.state || 'India'}</span>
                      </p>
                      {place.openingHours && (
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{place.openingHours}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat || place.coordinates?.lat},${place.lon || place.coordinates?.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Bookmarked Places</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore destinations across India using the open location search bar and bookmark spots to visit.
              </p>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Search & Discover Places
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY SCANNED MONUMENTS & REVIEWS */}
      {activeTab === 'scans_reviews' && (
        <div className="space-y-6">
          {/* Sub-section: Scanned Monuments */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Scan className="w-4 h-4 text-emerald-600" />
              <span>AI Monument Scanner History ({scannedMonuments.length})</span>
            </h3>

            {scannedMonuments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scannedMonuments.map((scan, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex items-center gap-4 p-4"
                  >
                    <img
                      src={scan.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=300&q=80'}
                      alt={scan.name}
                      onError={handleImageError}
                      className="w-20 h-20 rounded-2xl object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {Math.round((scan.confidence || 0.95) * 100)}% Confidence
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{scan.name}</h4>
                      <p className="text-[11px] text-slate-500">{scan.location || 'India'}</p>
                      <p className="text-[10px] text-slate-400">
                        Scanned {new Date(scan.scannedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-50 rounded-2xl text-xs text-slate-500">
                No scanned monuments in history yet. Upload photos in the AI Monument Scanner to identify landmarks.
              </div>
            )}
          </div>

          {/* Sub-section: Community Reviews */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Contributed Reviews & Hidden Gems ({contributedReviews.length})</span>
            </h3>

            {contributedReviews.length > 0 ? (
              <div className="space-y-3">
                {contributedReviews.map((rev, idx) => (
                  <div
                    key={rev.reviewId || idx}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{rev.gemTitle || 'Hidden Gem Review'}</h4>
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-50 rounded-2xl text-xs text-slate-500">
                No community reviews posted yet. Share your experiences on the Hidden Gems feed.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Edit Traveler Profile</h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Home City
                </label>
                <input
                  type="text"
                  value={editHomeCity}
                  onChange={(e) => setEditHomeCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={editAvatarUrl}
                  onChange={(e) => setEditAvatarUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-sm transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
