// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BloodDonationBanner from "../components/home/BloodDonationBanner";
import { PartnersSection } from "../components/home/PartnersSection";
import { FAQSection } from "../components/home/FAQSection";
import WhyDonateBloodSection from "../components/home/WhyDonateBloodSection";
import ContactUsSection from "../components/home/ContactUsSection";

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
      <WhyDonateBloodSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Us */}
      <ContactUsSection />

      {/* footer section */}
      <Footer />
    </div>
  );
};

export default Home;
