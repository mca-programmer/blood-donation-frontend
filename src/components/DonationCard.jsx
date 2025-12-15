// src/components/DonationCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DonationCard = ({ donation, showActions = true, onDelete, onEdit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if current user is the requester
  const isOwner = user?.email === donation.requesterEmail;
  const isAdmin = user?.role === "admin";
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not Set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
    } catch {
      return dateString;
    }
  };

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return "badge-warning";
      case "inprogress": return "badge-info";
      case "done": return "badge-success";
      case "canceled": return "badge-error";
      default: return "badge-ghost";
    }
  };

  // Blood group badge color
  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      "A+": "bg-red-100 text-red-800",
      "A-": "bg-red-200 text-red-900",
      "B+": "bg-blue-100 text-blue-800",
      "B-": "bg-blue-200 text-blue-900",
      "AB+": "bg-purple-100 text-purple-800",
      "AB-": "bg-purple-200 text-purple-900",
      "O+": "bg-green-100 text-green-800",
      "O-": "bg-green-200 text-green-900",
    };
    return colors[bloodGroup] || "bg-gray-100 text-gray-800";
  };

  //  Handle View Details - Navigate to details page
  const handleViewDetails = () => {
    navigate(`/donation/${donation._id}`);
  };

  return (
    <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl mb-1">{donation.recipientName}</h3>
            <p className="text-sm opacity-90">
               {donation.recipientDistrict}, {donation.recipientUpazila}
            </p>
          </div>
          <div className={`badge ${getStatusBadge(donation.status)} badge-lg`}>
            {donation.status?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Blood Group - Prominent Display */}
        <div className="flex items-center justify-center">
          <div className={`${getBloodGroupColor(donation.bloodGroup)} px-6 py-3 rounded-lg font-bold text-2xl`}>
            🩸 {donation.bloodGroup}
          </div>
        </div>

        {/* Hospital Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold">🏥 Hospital</p>
          <p className="font-medium text-gray-900">{donation.hospitalName || "Not Specified"}</p>
          {donation.fullAddress && (
            <p className="text-xs text-gray-600 mt-1 truncate">{donation.fullAddress}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold">📅 Date</p>
            <p className="font-medium text-gray-900 text-sm">
              {formatDate(donation.date)}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold">⏰ Time</p>
            <p className="font-medium text-gray-900 text-sm">
              {donation.time || "Not Set"}
            </p>
          </div>
        </div>

        {/* Request Message Preview */}
        {donation.requestMessage && (
          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p className="text-xs text-gray-600 font-semibold mb-1">💬 Message</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {donation.requestMessage}
            </p>
          </div>
        )}

        {/* Requester Info */}
        <div className="border-t pt-3">
          <p className="text-xs text-gray-500">Requested by</p>
          <p className="text-sm font-medium text-gray-900">{donation.requesterName}</p>
        </div>

        {/* Donor Info (if status is inprogress or done) */}
        {(donation.status === "inprogress" || donation.status === "done") && donation.donorName && (
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p className="text-xs text-gray-600 font-semibold">✅ Donor</p>
            <p className="text-sm font-medium text-gray-900">{donation.donorName}</p>
            <p className="text-xs text-gray-600">{donation.donorEmail}</p>
          </div>
        )}
      </div>

      {/* Card Footer - Actions */}
      {showActions && (
        <div className="p-4 bg-gray-50 border-t flex gap-2 justify-between items-center">
          {/* View Details Button - Always visible */}
          <button
            onClick={handleViewDetails}
            className="btn btn-sm btn-primary flex-1"
          >
            View Details
          </button>

          {/* Owner/Admin Actions */}
          {(isOwner || isAdmin) && donation.status === "pending" && (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(donation)}
                  className="btn btn-sm btn-outline btn-info"
                  title="Edit Request"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(donation._id)}
                  className="btn btn-sm btn-outline btn-error"
                  title="Delete Request"
                >
                  🗑️
                </button>
              )}
            </>
          )}

          {/* Donate Button for non-owners */}
          {!isOwner && donation.status === "pending" && user && (
            <button
              onClick={handleViewDetails}
              className="btn btn-sm btn-success"
            >
              🩸 Donate
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationCard;