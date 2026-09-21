import { Map, Compass } from 'lucide-react'

export default function Trips() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-[#6B1E2B]">
          My Trips
        </h1>

        <p className="text-[#6B5A55] mt-2 mb-8">
          Your planned heritage journeys will appear here.
        </p>

        <div className="bg-white rounded-3xl border border-[#C9972B]/30 shadow-lg p-10 text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#6B1E2B]/10 flex items-center justify-center mb-5">
            <Map className="w-8 h-8 text-[#6B1E2B]" />
          </div>

          <h2 className="text-xl font-bold text-[#3D2925]">
            No trips yet
          </h2>

          <p className="text-sm text-[#6B5A55] mt-2">
            Start exploring destinations and create your first
            heritage journey.
          </p>

          <button
            onClick={() => {
              window.location.href = '/'
            }}
            className="mt-6 px-5 py-3 rounded-xl bg-[#6B1E2B] text-[#FFF8E7] font-semibold hover:bg-[#A44A3F] transition"
          >
            <Compass className="inline w-4 h-4 mr-2" />
            Start Exploring
          </button>

        </div>
      </div>
    </div>
  )
}