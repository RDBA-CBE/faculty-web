"use client";

import React from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Heart,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Plus,
  Check,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const jobs = [
  {
    id: 1,
    title: "Assistant Professor",
    college: "Kumaraguru College of Technology",
    logo: "data:image/jpeg;base64,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",
    experience: "2 years Experience",
    location: "Coimbatore",
    postedTime: "5 days ago",
  },
  {
    id: 2,
    title: "Assistant Professor",
    college: "Kumaraguru College of Technology",
    logo: "https://kcp.edu.in/wp-content/uploads/2019/08/ftr-logo.png",
    experience: "2 years Experience",
    location: "Coimbatore",
    postedTime: "5 days ago",
  },
  {
    id: 3,
    title: "Assistant Professor",
    college: "Kumaraguru College of Technology",
    logo: "data:image/jpeg;base64,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",
    experience: "2 years Experience",
    location: "Coimbatore",
    postedTime: "5 days ago",
  },
  {
    id: 4,
    title: "Assistant Professor",
    college: "Kumaraguru College of Technology",
    logo: "https://kcp.edu.in/wp-content/uploads/2019/08/ftr-logo.png",

    experience: "2 years Experience",
    location: "Coimbatore",
    postedTime: "5 days ago",
  },
  {
    id: 5,
    title: "Assistant Professor",
    college: "Kumaraguru College of Technology",
    logo: "data:image/jpeg;base64,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",

    experience: "2 years Experience",
    location: "Coimbatore",
    postedTime: "5 days ago",
  },
  {
    id: 6,
    title: "Assistant Professor",
    college: "Kumaraguru College of Technology",
    logo: "https://kcp.edu.in/wp-content/uploads/2019/08/ftr-logo.png",

    experience: "2 years Experience",
    location: "Coimbatore",
    postedTime: "5 days ago",
  },
];

const categories = [
  { name: "Assistant Professor", count: 20 },
  { name: "Research Associate", count: 14 },
  { name: "Academic Coordinator", count: 52 },
  { name: "Lab Instructor", count: 33 },
  { name: "Associate Professor", count: 14 },
  { name: "Academic Coordinator", count: 52 },
  { name: "Lab Instructor", count: 33 },
];

const FindYourJob = () => {
  return (
    <section className="py-12 lg:py-16 ">
      <div className="section-wid w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Content - Job Listings */}
          <div className="lg:col-span-9">
            {/* Header with Search in Single Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-black">
                Find Your Job
              </h2>

              {/* Search Bar */}
              <div className=" rounded-full shadow-md border border-gray-200 p-1.5 flex items-center gap-1 max-w-2xl">
                <div className="flex items-center flex-1 px-3 py-1.5">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Job title, Position, Keyword..."
                    className="w-full focus:outline-none text-sm"
                  />
                </div>
                <div className="w-px h-6 bg-gray-200"></div>
                <div className="flex items-center px-3 py-1.5 min-w-[120px]">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="City, state"
                    className="focus:outline-none text-sm w-full"
                  />
                </div>
                <div className="w-px h-6 bg-gray-200"></div>
                <button className="flex items-center px-3 py-1.5 text-gray-600 hover:text-gray-800">
                  <SlidersHorizontal className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Filters</span>
                </button>
                <button className="bg-[#0a1551] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#080f3d] transition">
                  Find Job
                </button>
              </div>
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 border border-gray-200 
             transition-all duration-300
             hover:bg-white
             hover:border-none
             hover:-translate-y-1
             hover:shadow-2xl hover:shadow-gray-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
                        <Image
                          src={job.logo}
                          alt={job.college}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="sub-ti font-semibold text-black mb-0.5">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.college}</p>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-red-500 transition">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="border border-[#0a1551] text-[#0a1551] px-5 py-1.5 rounded-full text-sm font-medium hover:bg-[#0a1551] hover:text-white transition">
                      Apply Now
                    </button>
                    <span className="text-xs text-gray-400">
                      {job.postedTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-8">
              {/* Left Arrow */}
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-100 transition">
                ‹
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm border border-gray-200">
                {["1", "2", "3"].map((page) => (
                  <button
                    key={page}
                    className="h-8 w-8 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition"
                  >
                    {page}
                  </button>
                ))}

                {/* Active Page */}
                <button className="h-8 w-8 rounded-full bg-[#050A4E] text-white text-sm font-medium">
                  4
                </button>

                {["5", "6", "7"].map((page) => (
                  <button
                    key={page}
                    className="h-8 w-8 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition"
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-100 transition">
                ›
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Job Spotlight */}
            <div className=" border ">
              <div className="bg-[#0a1551] flex items-center justify-between py-3 px-4">
                <h3 className="text-2xl font-bold text-white">Job spotlight</h3>
                <div className="flex gap-2">
                  <button className="swiper-spotlight-prev w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button className="swiper-spotlight-next w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: ".swiper-spotlight-prev",
                  nextEl: ".swiper-spotlight-next",
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="job-spotlight-swiper"
              >
                <SwiperSlide>
                  <div className="bg-white px-6 pb-6 pt-5 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <Image
                        src="/assets/images/Faculty/spotlightImage.png"
                        alt="Job Spotlight"
                        width={400}
                        height={200}
                        className="w-full object-cover"
                      />
                    </div>

                    <h4 className="sub-ti font-bold text-black mb-2">
                      Assistant Professor
                    </h4>
                    <p className="text-base text-gray-600 mb-4">
                      Kumaraguru College of Technology
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Briefcase className="w-4 h-4 text-yellow-500" />
                        <span>2 years Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4  text-yellow-500" />
                        <span>Coimbatore</span>
                      </div>
                    </div>

                    <div className="relative flex itemx-center justify-end">
                      {/* <img
                        src="/assets/images/Faculty/location_bg.png"
                        alt="Location"
                        className="absolute bottom-0 left-0 w-55 h-55 object-contain opacity-15"
                      /> */}
                      <button className="relative z-10 border border-black text-black px-2 py-1 rounded-full text-base font-small hover:bg-black hover:text-white transition flex items-center gap-2">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Jobs By Category */}
            <div className="bg-[#0a1551] border ">
              <div className="py-3 px-4">
                <h3 className="text-2xl font-bold text-white">
                  Jobs By Category
                </h3>
              </div>

              <div className="bg-white px-6 pb-6 pt-5 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                <div className="space-y-3 mb-6">
                  {[
                    { title: "Assistant Professor", count: 20 },
                    { title: "Research Associate", count: 14 },
                    { title: "Academic Coordinator", count: 52 },
                    { title: "Lab Instructor", count: 33 },
                    { title: "Associate Professor", count: 14 },
                    { title: "Academic Coordinator", count: 52 },
                    { title: "Lab Instructor", count: 33 },
                  ].map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-800 hover:text-[#0a1551] cursor-pointer transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-base">
                        {category.title} ({category.count})
                      </span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-gray-800 font-semibold hover:text-[#0a1551] transition">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-md">View All Category</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourJob;
