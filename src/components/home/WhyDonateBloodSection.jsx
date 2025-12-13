import { HeartPulse, Users, Activity } from "lucide-react";

export default function WhyDonateBloodSection() {
  const reasons = [
    {
      title: "Save Lives",
      desc: "A single blood donation can save up to three lives and give someone a second chance at life.",
      icon: HeartPulse,
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Community Support",
      desc: "Become part of a compassionate community that stands together in times of medical emergencies.",
      icon: Users,
      gradient: "from-rose-500 to-red-600",
    },
    {
      title: "Health Benefits",
      desc: "Regular blood donation helps improve circulation and keeps your heart healthier.",
      icon: Activity,
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <section className="py-16 container mx-auto bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-red-600 mb-4">
          Why Donate Blood?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Your small act of kindness can create a big impact. Here’s why blood
          donation truly matters.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-2xl p-8 bg-white shadow-md hover:shadow-xl transition"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r ${item.gradient} text-white shadow-lg group-hover:scale-110 transition`}
              >
                <item.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-red-300 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
