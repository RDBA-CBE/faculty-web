import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const HeroSection = () => {
  
  return (
    <section className="relative bg-gray-50 min-h-[650px] flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-24 items-stretch h-full">
          {/* Left Content */}
          <div className="space-y-6 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-gradient-to-r from-[#F2B31D] to-transparent text-[#111111] px-6 py-2 rounded-full text-base font-medium">
                Finding Job
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-[50px] font-bold text-gray-900 leading-[60px]">
                Find Your Dream Job
                <br />
                Today!
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Ultrices purus dolor viverra mi laoreet at cursus justo.
                Ultrices purus diam egestas amet faucibus tempor blandit. Elit
                velit mauris aliquam est diam. Leo
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 max-w-2xl">
              <input
                type="text"
                placeholder="Job Title or College"
                className="flex-1 px-4 py-3 border-0 focus:outline-none text-gray-700 text-base"
              />
              <div className="w-px h-10 bg-gray-200"></div>
              <select className="px-4 py-3 border-0 focus:outline-none text-gray-700 bg-transparent text-base min-w-[140px]">
                <option>Select Location</option>
              </select>
              <div className="w-px h-10 bg-gray-200"></div>
              <select className="px-4 py-3 border-0 focus:outline-none text-gray-700 bg-transparent text-base min-w-[140px]">
                <option>Select Category</option>
              </select>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-700 transition-colors text-base font-medium">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 pt-6">
              <div>
                <div className="text-3xl font-bold text-gray-900">125K+</div>
                <div className="text-gray-600 text-sm mt-1">People joined</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">9,99%</div>
                <div className="text-gray-600 text-sm mt-1">
                  Success Probability
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-gray-900">5.0</div>
                <div className="flex text-[#F2B31D] text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className="flex -space-x-2 ml-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white">
                    <Image
                      src="/assets/images/image_1.png"
                      alt="Professional woman with book"
                      width={100}
                      height={100}
                      className="w-full h-auto max-w-lg"
                    />
                  </div>
                  <div className="w-10 h-10 bg-gray-400 rounded-full border-2 border-white">
                  <Image
                      src="/assets/images/image_2.png"
                      alt="Professional woman with book"
                      width={100}
                      height={100}
                      className="w-full h-auto max-w-lg"
                    />
                  </div>
                  <div className="w-10 h-10 bg-gray-500 rounded-full border-2 border-white">
                  <Image
                      src="/assets/images/image_3.png"
                      alt="Professional woman with book"
                      width={100}
                      height={100}
                      className="w-full h-auto max-w-lg"
                    />
                  </div>
                  <div className="w-10 h-10 bg-gray-800 text-white rounded-full border-2 border-white flex items-center justify-center text-base font-bold">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-end items-center h-full">
            <Image
              src="/assets/images/home_banner.png"
              alt="Professional woman with book"
              width={960}
              height={860}
              className="w-full h-auto max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
