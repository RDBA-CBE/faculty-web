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
    logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "2", // Saturn
    name: "Karpagam College Of Engineering",
    logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "3", // Blue Plane
    name: "Karpagam College Of Engineering",
     logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "4", // Orange Hex
    name: "Karpagam College Of Engineering",
    logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "5", // Dark Card / Lightning
    name: "Karpagam College Of Engineering",
     logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "6", // Blue Swirl
    name: "Karpagam College Of Engineering",
     logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "7", // Green Segmented
    name: "Karpagam College Of Engineering",
    logo: "/assets/images/Faculty/favicon.png",
  },
  {
    id: "8", // Blue Tech Nodes
    name: "Karpagam College Of Engineering",
    logo: "/assets/images/Faculty/favicon.png",
  },
];

export default function InstitutionPartners() {
  const [active, setActive] = useState(null);

  const leftPartners = [PARTNERS[2], PARTNERS[3], PARTNERS[6], PARTNERS[7]];
  // Right side: id 1, 2, 5, 6
  const rightPartners = [PARTNERS[0], PARTNERS[1], PARTNERS[4], PARTNERS[5]];

  return (
    <section className="bg-gray-50 py-16">
      <div className="section-wid">
        <div className="flex items-center justify-center">
          <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SECTION: Header + 4 Cards */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 pl-2">
                {/* <div className="inline-block mb-4">
                  <span className="bg-gradient-to-r from-[#F2B31D] to-transparent text-black px-6 py-2 rounded-full text-base font-medium">
                    Finding Job
                  </span>
                </div> */}

                {/* <h1 className="text-4xl lg:text-[48px] font-bold text-black leading-[1.1]"> */}
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3">
                  Institution Partners
                </h2>

                <p className="text-gray-600">
                  Classical Latin Literature From 45 BC, Making It Over 2000
                  Years Old. Richard McClintock, A Latin Professor At Hampden
                  Sydney College In Virginia.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {leftPartners.map((p) => (
                  <PartnerCard p={p} key={p.id} />
                ))}
              </div>
            </div>

            {/* RIGHT SECTION: 4 Cards (Aligned with Title) */}
            <div className="pt-0">
              <div className="grid grid-cols-2 gap-6">
                {rightPartners.map((p) => (
                  <PartnerCard p={p} key={p.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        border border-gray-200 hover:bg-[#0a1551]
        ${
          p.isDark
            ? "bg-[#1e1e1e] border-gray-800 !text-[#fff]  hover:scale-[1.02] border-1 "
            : " border-gray-100 text-[#1a1a1a] hover:border-gray-300 hover:shadow-lg hover:scale-[1.02]"
        }
      `}
    >
      <div className="mb-4 transform transition-transform duration-500 group-hover:scale-110">
        <img src={p.logo} alt="" className="w-20" />
      </div>
      <h3
        className={`text-center sub-ti px-1 leading-tight group-hover:text-white transition-colors ${
          p.isDark ? "!text-[#fff]" : "text-[#000]"
        }`}
      >{p.name}</h3>
    
    </div>
  );
};
