// src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUsSection from "../components/home/ContactUsSection";
import StatsSection from "../components/AboutUs/StatsSection";
import TeamSection from "../components/AboutUs/TeamSection";
import CTASection from "../components/AboutUs/CTASection";
import Testimonials from "../components/AboutUs/Testimonials";
import AboutUs from "../components/AboutUs/AboutUs";

const About = () => {
  return (
    <>
      <Navbar />
      <AboutUs/>
      <TeamSection/>
      <StatsSection/>
      <Testimonials/>
      <CTASection/>

      <Footer/>
    </>
  );
};

export default About;
