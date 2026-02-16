import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-60">
      {/* 1. Subscribe Section (The Overlapping Card) */}
      <div className="container mx-auto px-4 absolute z-10 mb-10">
        <div className="bg-[#f2a900] rounded-sm flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[200px] relative overflow-visible -translate-y-1/2">
          
          {/* Text Content */}
          <div className="max-w-md text-black z-10">
            <h2 className="text-3xl font-bold mb-2">Subscribe Newsletter</h2>
            <p className="text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur. Ultricies ac pellentesque euismod dapibus.
            </p>
            
            {/* Input Group */}
            <div className="mt-6 flex bg-white rounded-full p-1 shadow-md w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Enter Your Email Address..." 
                className="flex-grow px-4 py-2 rounded-full outline-none text-gray-700 text-sm"
              />
              <button className="bg-[#f2a900] hover:bg-black hover:text-white transition-colors text-black font-semibold px-6 py-2 rounded-full text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Group Image - Absolute Positioned to overlap */}
          <div className="hidden md:block absolute bottom-0 right-0 w-[45%] h-[130%]">
            <Image 
              src="/assets/images/group.png" 
              alt="Faculty Group" 
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links Section */}
      <div 
        className="bg-[#000040] text-white -mt-24 pt-32 pb-12"
        style={{ 
          backgroundImage: `url('/assets/images/Faculty/footer_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            
            {/* Logo & About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded">
                   <Image src="/assets/images/Faculty/logo.png" alt="Logo" width={30} height={30} /> 
                </div>
                <span className="text-2xl font-bold">Faculty Pro</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Ultricies ac pellentesque euismod 
                dapibus ullamcorper nec. Velit porttitor proin tincidunt.
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 border-l-2 border-[#f2a900] pl-3">Useful links</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#f2a900]">About Us</a></li>
                <li><a href="#" className="hover:text-[#f2a900]">Jobs</a></li>
                <li><a href="#" className="hover:text-[#f2a900]">Contact Us</a></li>
              </ul>
            </div>

            {/* Job Categories */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-6 border-l-2 border-[#f2a900] pl-3">Job Categories</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-300">
                <a href="#" className="hover:text-[#f2a900]">Assistant Professor</a>
                <a href="#" className="hover:text-[#f2a900]">Assistant Professor</a>
                <a href="#" className="hover:text-[#f2a900]">Assistant Professor</a>
                <a href="#" className="hover:text-[#f2a900]">Assistant Professor</a>
                <a href="#" className="hover:text-[#f2a900]">Assistant Professor</a>
                <a href="#" className="hover:text-[#f2a900]">Assistant Professor</a>
              </div>
            </div>

            {/* Official Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 border-l-2 border-[#f2a900] pl-3">Official links</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#f2a900]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#f2a900]">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* 3. Bottom Bar */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full border border-white/20 hover:bg-[#f2a900] hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Copyright 2026 © Faculty Plus. Concept By Repute
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;