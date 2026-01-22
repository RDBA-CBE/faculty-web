import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-50 min-h-[500px] md:min-h-[650px] flex items-center py-8 md:py-0">
      <div className="w-full  mx-auto ">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 flex flex-col justify-center order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-gradient-to-r from-[#F2B31D] to-transparent text-[#111111] px-6 py-2 rounded-full text-base font-medium">
                Finding Job
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Find Your Dream Job
                <br />
                Today!
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
                Ultrices purus dolor viverra mi laoreet at cursus justo.
                Ultrices purus diam egestas amet faucibus tempor blandit. Elit
                velit mauris aliquam est diam. Leo
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-lg p-3 max-w-2xl">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <input
                  type="text"
                  placeholder="Job Title or College"
                  className="flex-1 px-4 py-3 border-0 focus:outline-none text-gray-700 text-sm md:text-base rounded-lg md:rounded-none"
                />
                <div className="hidden md:block w-px h-10 bg-gray-200"></div>
                <select className="px-4 py-3 border-0 focus:outline-none text-gray-700 bg-transparent text-sm md:text-base min-w-[140px] rounded-lg md:rounded-none">
                  <option>Select Location</option>
                </select>
                <div className="hidden md:block w-px h-10 bg-gray-200"></div>
                {/* <select className="px-4 py-3 border-0 focus:outline-none text-gray-700 bg-transparent text-sm md:text-base min-w-[140px] rounded-lg md:rounded-none">
                  <option>Select Category</option>
                </select> */}
                <button className="bg-gray-800 text-white px-4 md:px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors text-sm md:text-base font-medium">
                  <Search className="w-4 h-4" />
                  <span className=" sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-4 md:pt-6">
              {/* Mobile Layout */}
              <div className="flex flex-col items-center gap-4 sm:hidden">
                <div className="flex justify-center items-center gap-8">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">125K+</div>
                    <div className="text-gray-600 text-xs mt-1">People joined</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">9,99%</div>
                    <div className="text-gray-600 text-xs mt-1">Success Probability</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-xl font-bold text-gray-900">5.0</div>
                  <div className="flex text-[#F2B31D] text-base">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="flex -space-x-1 ml-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/assets/images/image_1.png"
                        alt="User 1"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/assets/images/image_2.png"
                        alt="User 2"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/assets/images/image_3.png"
                        alt="User 3"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-6 h-6 bg-gray-800 text-white rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                      +
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop Layout */}
              <div className="hidden sm:flex flex-wrap items-center gap-6 lg:gap-8">
                <div className="text-left">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">125K+</div>
                  <div className="text-gray-600 text-sm mt-1">People joined</div>
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">9,99%</div>
                  <div className="text-gray-600 text-sm mt-1">
                    Success Probability
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">5.0</div>
                  <div className="flex text-[#F2B31D] text-base md:text-lg">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="flex -space-x-2 ml-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/assets/images/image_1.png"
                        alt="User 1"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-400 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/assets/images/image_2.png"
                        alt="User 2"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-500 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src="/assets/images/image_3.png"
                        alt="User 3"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 text-white rounded-full border-2 border-white flex items-center justify-center text-sm md:text-base font-bold">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end items-center order-1 lg:order-2">
            <Image
              src="/assets/images/home_banner.png"
              alt="Professional woman with book"
              width={960}
              height={860}
              className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
