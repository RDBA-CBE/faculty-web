import React from "react";
import { CheckCircle } from "lucide-react";

const DownloadAppSection = () => {
  return (
    <section className="w-full  py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Mobile Image */}
        <div className="flex justify-center lg:justify-start">
          <img
            src="/assets/images/Faculty/mobile.png"
            alt="Mobile App"
            className="w-[550px] lg:w-[550px] drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Download Our Mobile App!
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-[#0a1551] w-6 h-6 mt-1 text-bold" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Download Faculty Pro App
                </h4>
                <p className="text-gray-600">
                  Apply and hire faculty anytime, anywhere.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="text-[#0a1551] w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Get Started on Mobile
                </h4>
                <p className="text-gray-600">
                  Manage applications and job postings with ease.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="text-[#0a1551] w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Smart Hiring at Your Fingertips
                </h4>
                <p className="text-gray-600">
                  Connect institutions and educators instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Store Buttons */}
          <div className="flex flex-wrap gap-6 mt-10">
            <img
              src="/assets/images/Faculty/app_store.png"
              alt="App Store"
              className="h-14 cursor-pointer hover:scale-105 transition"
            />
            <img
              src="/assets/images/Faculty/play_store.png"
              alt="Google Play"
              className="h-14 cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
