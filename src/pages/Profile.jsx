import { UserProfile } from '@clerk/clerk-react'

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-[#6B1E2B] mb-6">
          My Profile
        </h1>

        <div className="bg-white rounded-3xl border border-[#C9972B]/30 shadow-xl p-4">

          <UserProfile
            routing="path"
            path="/profile"
            appearance={{
              variables: {
                colorPrimary: '#6B1E2B',
                colorBackground: '#FFF8E7',
                colorText: '#3D2925',
                colorTextSecondary: '#6B5A55',
                borderRadius: '12px',
              },
            }}
          />

        </div>

      </div>

    </div>
  )
}