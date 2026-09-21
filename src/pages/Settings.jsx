import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react'

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-[#6B1E2B] mb-2">
          Settings
        </h1>

        <p className="text-[#6B5A55] mb-8">
          Manage your ExplorerIQ preferences.
        </p>

        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-[#C9972B]/30 p-5 flex items-center gap-4">
            <SettingsIcon className="w-6 h-6 text-[#6B1E2B]" />
            <div>
              <h2 className="font-semibold text-[#3D2925]">
                General Settings
              </h2>
              <p className="text-sm text-[#6B5A55]">
                Manage your application preferences.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C9972B]/30 p-5 flex items-center gap-4">
            <Bell className="w-6 h-6 text-[#D88924]" />
            <div>
              <h2 className="font-semibold text-[#3D2925]">
                Notifications
              </h2>
              <p className="text-sm text-[#6B5A55]">
                Manage notification preferences.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C9972B]/30 p-5 flex items-center gap-4">
            <Shield className="w-6 h-6 text-[#6B1E2B]" />
            <div>
              <h2 className="font-semibold text-[#3D2925]">
                Privacy & Security
              </h2>
              <p className="text-sm text-[#6B5A55]">
                Manage your privacy and security preferences.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C9972B]/30 p-5 flex items-center gap-4">
            <Palette className="w-6 h-6 text-[#A44A3F]" />
            <div>
              <h2 className="font-semibold text-[#3D2925]">
                Appearance
              </h2>
              <p className="text-sm text-[#6B5A55]">
                Customize your ExplorerIQ experience.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}