// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BloodDonationBanner from "../components/BloodDonationBanner";
import { PartnersSection } from "../components/PartnersSection";
import { FAQSection } from "../components/FAQSection";

const Home = () => {
  return (
    <div>
      {/* navbar section */}
      <Navbar />

      {/* Banner section */}
      <BloodDonationBanner />

      {/* partners Section */}
      <PartnersSection />

      {/* Why Donate Blood */}
      <section className="py-10 container mx-auto text-center">
        <h2 className="text-3xl text-red-500 font-bold mb-6">
          Why Donate Blood?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">Save Lives</h3>
            <p>Blood donation can save up to three lives at a time.</p>
          </div>
          <div className="card p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">Community Support</h3>
            <p>Be part of a community that helps others in need.</p>
          </div>
          <div className="card p-6 shadow rounded-lg">
            <h3 className="font-bold text-xl mb-2">Health Benefits</h3>
            <p>Regular donation improves blood circulation and health.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      <FAQSection />

      {/* Contact Us */}
      <section className="py-10 container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-red-500">Contact Us</h2>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Message"
            className="textarea textarea-bordered w-full"
          ></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </section>

      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Home;
