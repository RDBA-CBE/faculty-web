"use client";

import React from "react";

const StatsSection = () => {
  return (
    <section 
      className="py-20 bg-cover bg-center bg-no-repeat relative my-5"
      style={{ backgroundImage: "url('/assets/images/Faculty/count_bg.png')" }}
    >
      <div className="absolute "></div>
      
      <div className="section-wid w-full px-4 sm:px-6 lg:px-8 xl:px-0 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center gap-2 flex flex-col">
            <h3 className="text-5xl lg:text-8xl font-bold text-white mb-2" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>
              500+
            </h3>
            <p className="text-white text-lg lg:text-2xl font-medium">Jobs Available</p>
          </div>

          <div className="hidden lg:block absolute left-1/4 top-1/2 -translate-y-1/2 w-px h-24 bg-white/30"></div>

          <div className="text-center gap-2 flex flex-col">

            <h3 className="text-5xl lg:text-8xl font-bold text-white mb-2" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>
              50+
            </h3>
            <p className="text-white text-lg lg:text-2xl lg:text-2xl font-medium">Institutions</p>
          </div>

          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-24 bg-white/30"></div>

          <div className="text-center gap-2 flex flex-col">

            <h3 className="text-5xl lg:text-8xl font-bold text-white mb-2" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>
              25k
            </h3>
            <p className="text-white text-lg lg:text-2xl font-medium">Resumes</p>
          </div>

          <div className="hidden lg:block absolute left-3/4 top-1/2 -translate-y-1/2 w-px h-24 bg-white/30"></div>

          <div className="text-center gap-2 flex flex-col">

            <h3 className="text-5xl lg:text-8xl font-bold text-white mb-2" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>
              30k
            </h3>
            <p className="text-white text-lg lg:text-2xl font-medium">Members</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
