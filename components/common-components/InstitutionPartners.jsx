"use client";

import Image from "next/image";
import { useState } from "react";

const partners = [
  { id: 1, logo: "/assets/images/group.png" },
  { id: 2, logo: "/assets/images/group.png" },
  { id: 3, logo: "/assets/images/group.png" },
  { id: 4, logo: "/assets/images/group.png" },
  { id: 5, logo: "/assets/images/group.png" },
  { id: 6, logo: "/assets/images/group.png" },
  { id: 7, logo: "/assets/images/group.png" },
  { id: 8, logo: "/assets/images/group.png", dark: true },
];

const PARTNERS = [
  {
    id: "1", // Purple Hex Arrow
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <defs>
          <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#c084fc", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#9333ea", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z"
          fill="url(#gradPurple)"
        />
        <path
          d="M40 55 L50 45 L60 55 L50 65 Z"
          fill="white"
          transform="rotate(-45 50 50) translate(0, -5)"
        />
        <path
          d="M48 45 L48 70 L52 70 L52 45 Z"
          fill="white"
          transform="rotate(-45 50 50) translate(0, -5)"
        />
      </svg>
    ),
  },
  {
    id: "2", // Saturn
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <defs>
          <linearGradient id="gradSaturn" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#fbbf24", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ef4444", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="25" fill="url(#gradSaturn)" />
        <path
          d="M15 55 Q50 85 85 55"
          fill="none"
          stroke="#fb923c"
          strokeWidth="6"
          strokeLinecap="round"
          transform="rotate(-20 50 50)"
        />
        <path
          d="M15 45 Q50 15 85 45"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          strokeLinecap="round"
          transform="rotate(-20 50 50)"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    id: "3", // Blue Plane
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
        />
        <path d="M40 50 L55 42 L52 50 L55 58 Z" fill="#1d4ed8" />
        <path
          d="M50 50 L75 50"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      </svg>
    ),
  },
  {
    id: "4", // Orange Hex
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <path
          d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z"
          fill="none"
          stroke="#f97316"
          strokeWidth="8"
        />
        <path d="M50 25 L70 37 L70 63 L50 75 L30 63 L30 37 Z" fill="#fdba74" />
      </svg>
    ),
  },
  {
    id: "5", // Dark Card / Lightning
    name: "Karpagam College Of Engineering",
    isDark: true,
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <circle cx="50" cy="50" r="35" fill="#4b5563" />
        <path d="M45 75 L65 40 L50 40 L55 25 L35 60 L50 60 Z" fill="#9333ea" />
      </svg>
    ),
  },
  {
    id: "6", // Blue Swirl
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <path
          d="M30 50 A20 20 0 0 1 70 50"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="4"
        />
        <path
          d="M30 55 A20 20 0 0 0 70 55"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        <path
          d="M35 50 A15 15 0 0 1 65 50"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "7", // Green Segmented
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <circle
          cx="60"
          cy="60"
          r="30"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="8"
        />
        <path
          d="M60 30 A30 30 0 0 1 90 60"
          fill="none"
          stroke="#4ade80"
          strokeWidth="8"
        />
        <rect x="25" y="25" width="8" height="8" fill="#4ade80" />
        <rect x="35" y="25" width="4" height="4" fill="#86efac" />
        <rect x="25" y="35" width="4" height="4" fill="#bbf7d0" />
      </svg>
    ),
  },
  {
    id: "8", // Blue Tech Nodes
    name: "Karpagam College Of Engineering",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="6"
        />
        <circle cx="50" cy="50" r="5" fill="#0ea5e9" />
        <line
          x1="50"
          y1="50"
          x2="70"
          y2="70"
          stroke="#0ea5e9"
          strokeWidth="3"
        />
        <line
          x1="50"
          y1="50"
          x2="30"
          y2="30"
          stroke="#0ea5e9"
          strokeWidth="3"
        />
        <line
          x1="50"
          y1="50"
          x2="75"
          y2="40"
          stroke="#0ea5e9"
          strokeWidth="3"
        />
        <circle cx="70" cy="70" r="4" fill="#0ea5e9" />
        <circle cx="30" cy="30" r="4" fill="#0ea5e9" />
        <circle cx="75" cy="40" r="4" fill="#0ea5e9" />
      </svg>
    ),
  },
];

export default function InstitutionPartners() {
  const [active, setActive] = useState(null);

  const leftPartners = [PARTNERS[2], PARTNERS[3], PARTNERS[6], PARTNERS[7]];
  // Right side: id 1, 2, 5, 6
  const rightPartners = [PARTNERS[0], PARTNERS[1], PARTNERS[4], PARTNERS[5]];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4 sm:px-8">
      <div className="max-w-[1240px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SECTION: Header + 4 Cards */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 pl-2">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[#F2B31D] to-transparent text-black px-6 py-2 rounded-full text-base font-medium">
                Finding Job
              </span>
            </div>

            {/* <h1 className="text-4xl lg:text-[48px] font-bold text-black leading-[1.1]"> */}
            <h2 className="text-4xl font-bold text-gray-900 ">
              Institution Partners
            </h2>

            <p className="text-gray-600 text-lg">
              Classical Latin Literature From 45 BC, Making It Over 2000 Years
              Old. Richard McClintock, A Latin Professor At Hampden Sydney
              College In Virginia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {leftPartners.map((p) => (
              <PartnerCard p={p} key={p.id} />
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: 4 Cards (Aligned with Title) */}
        <div className="pt-0 lg:pt-8">
          <div className="grid grid-cols-2 gap-6">
            {rightPartners.map((p) => (
              <PartnerCard p={p} key={p.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PartnerCard = (props) => {
  const { p } = props;
  return (
    <div
      key={p.id}
      className={`
        flex flex-col items-center justify-center p-6 rounded-[24px] transition-all duration-300
        min-h-[220px] border cursor-pointer group relative overflow-hidden
        border border-gray-200
        ${
          p.isDark
            ? "bg-[#1e1e1e] border-gray-700 text-white  hover:scale-[1.02] border "
            : "bg-white border-gray-100 text-[#1a1a1a] hover:border-gray-300 hover:shadow-lg hover:scale-[1.02]"
        }
      `}
    >
      <div className="mb-4 transform transition-transform duration-500 group-hover:scale-110">
        {p.logo}
      </div>
      <h3 className="text-center font-semibold text-[14px] px-1 leading-tight">
        {p.name}
      </h3>
    </div>
  );
};
