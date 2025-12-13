import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/Blood logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 mt-20">
      <div className="container mx-auto px-6 py-14">
        {/* Top Grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            {/* Logo + Brand */}
                   <Link to="/" className="flex items-center gap-2">
                     <img
                       src={Logo}   
                       alt="BloodDonate Logo"
                       className="w-9 h-9"
                     />
                     <span className="text-2xl font-bold text-red-600">
                       BloodDonate
                     </span>
                   </Link>
            <p className="text-sm leading-relaxed">
              BloodDonate is a community-driven platform connecting donors with
              patients to save lives faster and safer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-red-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/search" className="hover:text-red-400 transition">
                  Find Donors
                </Link>
              </li>
              
              <li>
                <Link
                  to="/donation-requests"
                  className="hover:text-red-400 transition"
                >
                  Blood Requests
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@blooddonation.org
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +880 1XXX-XXXXXX
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Bangladesh
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-500 transition"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-500 transition"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-500 transition"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} BloodDonate. Made with ❤️ to save
            lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
