// src/components/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <section className="container mx-auto bg-red-50 px-6 py-14">
      <h1 className="text-4xl font-bold text-red-600 mb-6 text-center md:text-left">
        About BloodDonate
      </h1>

      <p className="text-gray-700 leading-relaxed mb-5">
        <strong>BloodDonate</strong> is a community-driven platform designed to
        connect voluntary blood donors with people in urgent need of blood.
        Our goal is to make the blood donation process faster, safer, and more
        accessible for everyone.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        In critical moments, finding the right blood group can save lives.
        BloodDonate works as a bridge between donors and recipients, ensuring
        that no one has to suffer due to a lack of timely blood support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Mission */}
        <div className="bg-red-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700">
            To build a reliable and transparent blood donation network that
            helps save lives through quick and efficient connections.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-red-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-700">
            A future where no life is lost due to the unavailability of blood
            and where donating blood becomes a shared social responsibility.
          </p>
        </div>

        {/* Values */}
        <div className="bg-red-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            Our Values
          </h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Humanity & compassion</li>
            <li>Trust & transparency</li>
            <li>Community-driven support</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
