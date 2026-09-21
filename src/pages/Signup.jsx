import { SignUp } from '@clerk/clerk-react'

const explorerIQAppearance = {
  variables: {
    colorPrimary: '#6B1E2B',
    colorPrimaryForeground: '#FFF8E7',
    colorBackground: '#FFF8E7',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#3D2925',
    colorText: '#3D2925',
    colorTextSecondary: '#6B5A55',
    borderRadius: '12px',
  },

  elements: {
    rootBox: 'w-full',
    card: 'shadow-none border-0 bg-transparent w-full',
    headerTitle: 'text-[#6B1E2B] font-bold text-2xl',
    headerSubtitle: 'text-[#6B5A55] text-sm',
    formFieldLabel: 'text-[#3D2925] font-semibold text-sm',
    formFieldInput:
      'border-[#C9972B]/40 bg-white focus:border-[#6B1E2B] focus:ring-[#6B1E2B] h-10',
    formButtonPrimary:
      'bg-[#6B1E2B] hover:bg-[#A44A3F] text-[#FFF8E7] font-semibold h-10',
    footerActionLink:
      'text-[#6B1E2B] hover:text-[#D88924] font-semibold',
    socialButtonsBlockButton:
      'border-[#C9972B]/40 hover:bg-[#F4E7D0] h-10',
    dividerLine: 'bg-[#C9972B]/30',
    dividerText: 'text-[#6B5A55]',
    formFieldRow: 'mb-3',
  },
}

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex">

      {/* LEFT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-6">
        <div className="w-full max-w-md">

          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#6B1E2B] shadow-lg mb-3">
              <span className="text-[#D88924] text-xl font-bold">
                IQ
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[#6B1E2B]">
              Explorer<span className="text-[#D88924]">IQ</span>
            </h1>

            <p className="mt-1 text-sm text-[#6B5A55]">
              Explore India's heritage. Discover its stories.
            </p>
          </div>

          {/* SIGNUP CARD */}
          <div className="bg-white/70 rounded-3xl p-4 sm:p-5 border border-[#C9972B]/25 shadow-xl">

            <SignUp
              routing="path"
              path="/signup"
              signInUrl="/login"
               signInFallbackRedirectUrl="/login"
  signUpFallbackRedirectUrl="/"
              appearance={explorerIQAppearance}
            />

          </div>

          <p className="text-center text-xs text-[#6B5A55]/70 mt-4">
            Discover • Explore • Preserve
          </p>

        </div>
      </div>

      {/* RIGHT - SAME AS LOGIN */}
      <div className="hidden lg:flex lg:w-1/2 relative min-h-screen overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=85"
          alt="Taj Mahal"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#6B1E2B]/80 via-[#6B1E2B]/45 to-[#3D2925]/80" />

        <div className="absolute inset-8 border border-[#D88924]/50 rounded-[2rem]" />

        <div className="relative z-10 flex flex-col justify-end p-16 text-[#FFF8E7]">

          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-[#D88924]/90 text-[#3D2925] text-xs font-bold uppercase tracking-wider">
              India's Heritage
            </span>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Discover the
            <span className="block text-[#D88924]">
              Timeless India
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-[#FFF8E7]/85 text-lg leading-relaxed">
            From magnificent monuments to ancient traditions,
            explore the stories that shaped India's incredible
            cultural heritage.
          </p>

          <div className="flex items-center gap-3 mt-8">
            <div className="w-12 h-[2px] bg-[#D88924]" />

            <span className="text-sm text-[#FFF8E7]/70">
              ExplorerIQ
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}