import { CircleHelp, Mail, MessageCircle } from 'lucide-react'

export default function Help() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-[#6B1E2B]">
          Help & Support
        </h1>

        <p className="text-[#6B5A55] mt-2 mb-8">
          Need help using ExplorerIQ?
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-white rounded-2xl border border-[#C9972B]/30 p-6">
            <CircleHelp className="w-8 h-8 text-[#6B1E2B] mb-4" />

            <h2 className="text-lg font-bold text-[#3D2925]">
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-[#6B5A55] mt-2">
              Find answers about monument scanning, destination
              discovery and trip planning.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#C9972B]/30 p-6">
            <MessageCircle className="w-8 h-8 text-[#D88924] mb-4" />

            <h2 className="text-lg font-bold text-[#3D2925]">
              Contact Support
            </h2>

            <p className="text-sm text-[#6B5A55] mt-2">
              Get assistance if you are having problems with
              ExplorerIQ.
            </p>
          </div>

          <div className="md:col-span-2 bg-[#6B1E2B] rounded-2xl p-6 text-[#FFF8E7]">
            <Mail className="w-7 h-7 text-[#D88924] mb-3" />

            <h2 className="text-lg font-bold">
              Email Support
            </h2>

            <p className="text-sm text-[#FFF8E7]/75 mt-2">
              support@exploreriq.com
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}