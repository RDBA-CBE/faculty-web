"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const colleges = [
  {
    id: 1,
    name: "Kumaraguru College of Technology",
    location: "Coimbatore",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Kumaraguru_College_of_Technology_logo.png/220px-Kumaraguru_College_of_Technology_logo.png",
    openings: 10,
  },
  {
    id: 2,
    name: "karpagam College of Engineering",
    location: "Coimbatore",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVLqGz8vYqKqZ8fQqYqKqZ8fQqYqKqZ8fQqYqKqZ8fQ",
    openings: 10,
  },
  {
    id: 3,
    name: "PSG College of Technology",
    location: "Coimbatore",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png",
    openings: 10,
  },
  {
    id: 4,
    name: "Sri Kirishna Institutions",
    location: "Coimbatore",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVLqGz8vYqKqZ8fQqYqKqZ8fQqYqKqZ8fQqYqKqZ8fQ",
    openings: 10,
  },
];

const TopHiringColleges = () => {
  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="section-wid w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="lg:col-span-9">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl lg:text-4xl xl:text-4xl font-bold text-black">
                Top Hiring Colleges
              </h2>

              {/* Navigation Buttons - Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <button className="swiper-button-prev-custom w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button className="swiper-button-next-custom w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={false}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              // pagination={{ clickable: false }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="colleges-swiper"
            >
              {colleges.map((college) => (
                <SwiperSlide key={college.id}>
                  <div
                    className="group py-6 px-3 flex flex-col items-center text-center h-[300px] justify-between border border-gray-200 bg-white hover:bg-[#0a1551] transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-3 border border-gray-100">
                      <img
                        src={college.logo}
                        alt={college.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center px-2">
                      <h3
                        className="sub-ti font-semibold mb-1 leading-tight line-clamp-2 text-black group-hover:text-white transition-colors"
                      >
                        {college.name}
                      </h3>
                      <p
                        className="text-sm mb-5 mt-3 text-gray-500 group-hover:text-white/70 transition-colors"
                      >
                        {college.location}
                      </p>
                    </div>

                    <button
                      className="px-6 py-2 rounded-full text-sm font-medium transition-colors bg-[#0a1551] text-white group-hover:bg-[#F2B31D] group-hover:text-black"
                    >
                      {college.openings} Openings
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right CTA Card */}
          <div className="lg:col-span-3 relative h-[320px] ">
            <div className="absolute inset-0 z-0  overflow-hidden">
              <Image
                src="/assets/images/Faculty/faculty_pro_bg.png"
                alt="Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative z-10 rounded-xl p-6 text-center text-white overflow-hidden h-full flex flex-col ">
              <div className="relative z-10 ">
                <div className="mb-4 flex items-center justify-center gap-2 py-1 pt-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src="/assets/images/Faculty/logo.png"
                      alt="Logo"
                      className="object-contain"
                      priority
                      height={40}
                      width={40}
                    />
                  </div>
                  <h3 className="text-2xl  font-bold text-white">
                    Faculty Pro
                  </h3>
                </div>

                <h4 className="text-lg  font-bold text-white ">
                  Get Best Matches Jobs
                  <br />
                  On Your Email.
                </h4>
                <p className="text-sm mb-4 py-4 text-white">Add Resume Now!</p>

                <button className="bg-[#F2B31D] text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#e0a519] transition">
                  Add your Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .colleges-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        .colleges-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
        }
        .colleges-swiper .swiper-pagination-bullet-active {
          background: #1a1f5c;
        }
      `}</style>
    </section>
  );
};

export default TopHiringColleges;
