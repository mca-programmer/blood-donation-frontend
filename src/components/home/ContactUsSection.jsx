import { Mail, User, MessageSquare, Send } from "lucide-react";

export default function ContactUsSection() {
  return (
    <section className="container mx-auto py-10 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Info */}
          <div>
            <h2 className="text-4xl font-extrabold text-red-600 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions about blood donation or need help finding a donor?
              Reach out to us — we’re here to help save lives together.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Mail />
                </div>
                <span className="text-gray-700">support@blooddonation.org</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <MessageSquare />
                </div>
                <span className="text-gray-700">24/7 Emergency Support</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form className="space-y-5">
              <div className="relative">
                <User className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <div className="relative">
                <Mail className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute top-3 left-3 text-gray-400" />
                <textarea
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full pl-10 min-h-[120px]"
                ></textarea>
              </div>

              <button className="btn btn-primary w-full flex items-center gap-2">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
