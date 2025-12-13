export const PartnersSection = () => {
  const partners = [
    {
      name: "Bangladesh Red Crescent Society",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Bangladesh_Red_Crescent_Society_Logo.svg",
      description: "Humanitarian assistance provider"
    },
    {
      name: "WHO Bangladesh",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/World_Health_Organization_Logo.svg",
      description: "World Health Organization"
    },
    {
      name: "UNICEF Bangladesh",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/UNICEF_Logo_%28cropped%29.png?20230218124453",
      description: "Children's welfare organization"
    },
    {
      name: "BRAC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/BRAC_logo.png",
      description: "Development organization"
    },
    {
      name: "Save the Children",
      logo: "https://upload.wikimedia.org/wikipedia/de/5/59/Save_the_Children_logo.svg",
      description: "Child rights organization"
    },
    {
      name: "Doctors Without Borders",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/M%C3%A9decins_Sans_Fronti%C3%A8res_%28logo%29.svg",
      description: "Medical humanitarian aid"
    },
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-10 bg-gray-50 overflow-hidden container mx-auto text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-center text-gray-600 mb-10">
          We collaborate with hospitals and NGOs to save lives together
        </p>

        {/* Marquee Container */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Scrolling Content */}
          <div className="flex animate-scroll">
            {duplicatedPartners.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 flex items-center justify-center w-40 h-32"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};