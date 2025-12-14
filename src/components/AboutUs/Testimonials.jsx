// src/components/Testimonials.jsx
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Ahmed",
    feedback: "Thanks to BloodDonate, I was able to find a donor in just a few hours. Truly lifesaving!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rahim Khan",
    feedback: "I donated blood through this platform and the process was smooth and safe. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Lina Roy",
    feedback: "BloodDonate connected me with the right donor quickly. Excellent platform for emergencies.",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-white container mx-auto">
      <div className=" px-6 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-8">What People Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="bg-red-50 p-6 rounded-xl shadow-md flex flex-col items-center transform transition hover:-translate-y-2 hover:shadow-lg"
            >
              <FaQuoteLeft className="text-red-500 mb-4 text-2xl" />
              <p className="text-gray-700 mb-4">{test.feedback}</p>
              <img
                src={test.avatar}
                alt={test.name}
                className="w-16 h-16 rounded-full border-2 border-red-500 mb-2 object-cover"
              />
              <h4 className="font-semibold text-red-600">{test.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
