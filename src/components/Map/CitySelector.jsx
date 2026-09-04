import { MapPin, Sparkles } from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { CITIES_DATA } from '../../data/travelData';

export default function CitySelector() {
  const { currentCityId, setCurrentCityId } = useTravel();

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
            Select Destination Hub
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {CITIES_DATA.length} Curated Cultural Regions
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
        {CITIES_DATA.map((city) => {
          const isSelected = city.id === currentCityId;
          return (
            <button
              key={city.id}
              onClick={() => setCurrentCityId(city.id)}
              className={`flex-shrink-0 group relative w-48 sm:w-56 h-28 rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 snap-start shadow-sm ${
                isSelected
                  ? 'border-sky-500 ring-4 ring-sky-500/20 scale-[1.02] shadow-md'
                  : 'border-white hover:border-slate-300 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Background Image with Gradient Overlay */}
              <img
                src={city.heroImage}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Badges */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                {isSelected && (
                  <span className="px-2 py-0.5 bg-sky-500 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                    Active
                  </span>
                )}
              </div>

              {/* City Info */}
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <div className="flex items-center gap-1 text-[11px] text-sky-300 font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>{city.state}</span>
                </div>
                <h3 className="font-display font-extrabold text-base leading-tight text-white drop-shadow">
                  {city.name}
                </h3>
                <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                  {city.places.length} Featured Points of Interest
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
