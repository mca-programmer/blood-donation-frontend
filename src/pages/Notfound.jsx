import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTint,
  FaHome,
  FaArrowLeft,
  FaHandHoldingHeart,
  FaInfoCircle,
} from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const bloodDropVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <motion.div
        className="max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Blood Icon Animation */}
        <motion.div
          className="flex justify-center mb-8 text-red-500"
          variants={bloodDropVariants}
          animate="animate"
        >
          <FaTint size={120} />
        </motion.div>

        {/* 404 */}
        <motion.div variants={itemVariants}>
          <h1 className="text-9xl font-bold text-red-600 mb-4">
            4<span className="animate-pulse text-red-500">0</span>4
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Oops! This page does not exist.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            The page you are looking for may have been removed or is temporarily
            unavailable. You can still help save lives by donating blood.
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          variants={itemVariants}
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 max-w-2xl mx-auto rounded-r-lg flex gap-3 items-center justify-center"
        >
          <FaInfoCircle className="text-red-600 text-xl" />
          <p className="text-red-700 font-medium">
            One blood donation can save up to three lives.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Home */}
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold shadow-lg hover:bg-red-700 flex items-center gap-2"
            >
              <FaHome /> Go to Home
            </motion.button>
          </Link>

          {/* Back */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-white text-red-600 border-2 border-red-600 rounded-lg font-semibold shadow-lg hover:bg-red-50 flex items-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </motion.button>

          {/* Donate */}
          <Link to="/donation-requests">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2"
            >
              <FaHandHoldingHeart /> Blood Requests
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
