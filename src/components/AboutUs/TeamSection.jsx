// src/components/TeamMarquee.jsx
import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Bob Smith",
    role: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Clara Lee",
    role: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Kim",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Eva Green",
    role: "Marketing",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Frank White",
    role: "QA Engineer",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    linkedin: "#",
    twitter: "#",
  },
];

const TeamMarquee = () => {
  return (
    <section className="py-12 bg-red-50 container mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Our Team
      </h2>

      {/* Marquee Wrapper */}
      <div className="overflow-x-hidden container mx-auto">
        <div className="flex animate-marquee gap-8">
          {teamMembers.concat(teamMembers).map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center min-w-[200px] transform transition hover:-translate-y-2 hover:shadow-lg"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 border-2 border-red-500 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-red-600 mb-2">{member.role}</p>
              <div className="flex space-x-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:text-red-800"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMarquee;
