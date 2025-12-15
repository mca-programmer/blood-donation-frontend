// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BloodDonationBanner from "../components/home/BloodDonationBanner";
import { PartnersSection } from "../components/home/PartnersSection";
import { FAQSection } from "../components/home/FAQSection";
import WhyDonateBloodSection from "../components/home/WhyDonateBloodSection";
import ContactUsSection from "../components/home/ContactUsSection";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake loading (UI smooth feel)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2s

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading text="Welcome to BloodDonate..." />;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <BloodDonationBanner />

      {/* Partners */}
      <PartnersSection />

      {/* Why Donate */}
      <WhyDonateBloodSection />

      {/* FAQ */}
      <FAQSection />

      {/* Contact */}
      <ContactUsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
