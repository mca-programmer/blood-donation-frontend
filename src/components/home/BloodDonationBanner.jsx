import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BloodDonationBanner() {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1600&auto=format&fit=crop",
      title: "Donate Blood, Save Lives",
      desc: "Your single donation can save up to three lives",
    },
    {
      img: "https://i.postimg.cc/qvnZRFcF/img-1.webp",
      title: "Be a Real-Life Hero",
      desc: "Join our blood donation community today",
    },
    {
      img: "https://i.postimg.cc/25D9BxTP/img-2.avif",
      title: "Find & Help Patients",
      desc: "Connect donors with patients instantly",
    },
  ];

  return (
    <section className="container mx-auto py-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[420px] flex items-center justify-center text-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-red-500/30"></div>
              <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg mb-6">{slide.desc}</p>
                <div className="space-x-4">
                  <Link to="/register" className="btn btn-primary hover:bg-red-600">
                    Join as Donor
                  </Link>
                  <Link
                    to="/search"
                    className="btn btn-outline btn-primary hover:bg-red-600 text-white"
                  >
                    Search Donors
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
