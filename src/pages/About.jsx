import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import AboutUs from "../components/AboutUs/AboutUs";
import TeamSection from "../components/AboutUs/TeamSection";
import StatsSection from "../components/AboutUs/StatsSection";
import Testimonials from "../components/AboutUs/Testimonials";
import CTASection from "../components/AboutUs/CTASection";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load (API / heavy components)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading text="Loading About Us..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        
        {/* About section */}
        <AboutUs />

        {/* Team section */}
        <TeamSection />

        {/* Stats section */}
        <StatsSection />

        {/* Testimonials section */}
        <Testimonials />

        {/* Call to action section */}
        <CTASection />

      </main>

      <Footer />
    </div>
  );
};

export default About;
