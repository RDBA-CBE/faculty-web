"use client";

import React from "react";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const WhatCanIDo = () => {

  const router = useRouter();
  return (
    <section className="pb-12 pt-8 lg:pb-16 pt-12 ">
      <div className="section-wid w-full px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Content - Job Listings */}
          <div className="lg:col-span-9 ">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3">
              What can I do With Faculty Pro?
            </h2>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet consectetur. Quam sit nullam ac
              scelerisque mi varius tellus feugiat.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {/* Image */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/assets/images/Faculty/group.png"
                  alt="Faculty Team"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Features */}
              <div className="space-y-10">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center">
                      <Check className="w-5 h-5 text-black" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h3 className="sub-ti font-bold text-black mb-1">
                      Find and Apply for Faculty Jobs
                    </h3>
                    <p className="text-gray-600 text-md">
                      Explore verified academic openings across institutions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center">
                      <Check className="w-5 h-5 text-black" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h3 className="sub-ti font-bold text-black mb-1">
                      Hire Qualified Teaching Professionals Easily
                    </h3>
                    <p className="text-gray-600 text-md">
                      Post vacancies and shortlist candidates effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center">
                      <Check className="w-5 h-5 text-black" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h3 className="sub-ti font-bold text-black mb-1">
                      Manage Applications in One Platform
                    </h3>
                    <p className="text-gray-600 text-md">
                      Track, review, and communicate with applicants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Jobs By Location */}
            <div className="bg-[#0a1551] border ">
              <div className="py-3 px-4">
                <h3 className="text-2xl font-bold text-white">
                  Jobs By Colleges
                </h3>
              </div>

              <div className="bg-white px-6 pb-6 pt-4 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                <div className=" mb-6">
                  {[
                    { name: "Kumaraguru College of Technology", jobs: 20 },
                    { name: "karpagam College of Engineering", jobs: 22 },
                    { name: "PSG College of Technology", jobs: 18 },
                    { name: "Sri Kirishna Institutions", jobs: 34 },
                  ].map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded cursor-pointer transition"
                      onClick={() => router.push(`/jobs`)}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex-shrink-0" ></div>
                      <div className="flex-1">
                        <h4 className="text-md font-semibold text-gray-800">
                          {location.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {location.jobs} Jobs
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-gray-800 font-semibold hover:text-[#0a1551] transition" onClick={() => router.push(`/jobs`)}>
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center" >
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-md">View All Job</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatCanIDo;
