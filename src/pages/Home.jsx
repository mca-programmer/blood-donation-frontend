// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-indigo-100 text-indigo-500 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Donate Blood, Save Lives</h1>
        <p className="text-lg mb-6">Join our Blood Donation community today!</p>
        <div className="space-x-4">
          <Link to="/register" className="btn btn-primary">Join as Donor</Link>
          <Link to="/search" className="btn btn-outline btn-primary">Search Donors</Link>
        </div>
      </section>

      <section className="py-20 container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Donate Blood?</h2>
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

      <section className="py-20 bg-gray-100 container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="max-w-md mx-auto space-y-4">
          <input type="text" placeholder="Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Email" className="input input-bordered w-full" />
          <textarea placeholder="Message" className="textarea textarea-bordered w-full"></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
