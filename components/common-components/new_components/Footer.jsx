import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full"> 
      {/* 1. Subscribe Section - This container centers the narrow yellow card */}
      <div className="container mx-auto  relative z-20">
        <div className="max-w-5xl mx-auto bg-[#F2B31D] flex flex-col md:flex-row items-center justify-between p-6 md:p-10 min-h-[180px] relative shadow-xl translate-y-[30%]">
          
          {/* Text & Input Content */}
          <div className="w-full md:w-1/2 text-black z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Subscribe Newsletter</h2>
            <p className="text-sm opacity-90 mb-6 max-w-xs leading-tight">
              Lorem ipsum dolor sit amet consectetur. Ultricies ac
            </p>
            
            {/* Input Group */}
            <div className="flex bg-white rounded-full p-1 shadow-md w-full max-w-md">
              <input 
                type="email" 
                placeholder="Enter Your Email Address..." 
                className="flex-grow px-4 py-2 rounded-full outline-none text-gray-500 text-sm bg-transparent"
              />
              <button className="bg-[#F2B31D] hover:bg-black hover:text-white transition-all text-black font-bold px-6 py-2 rounded-full text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Group Image - Overlapping the top */}
          <div className="hidden md:block absolute bottom-0 right-4 w-[45%] h-[140%] pointer-events-none">
            <Image 
              src="/assets/images/group.png" 
              alt="Faculty Group" 
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Main Footer Section - This takes the full screen width */}
      <div 
        className="w-full bg-[#000033] text-white pt-[180px] pb-12 mt-[-10px]"
        style={{ 
          backgroundImage: `url('/assets/images/Faculty/footer_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="section-wid ">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">
            
            {/* Logo Column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className=" p-1 rounded">
                   <Image src="/assets/images/Faculty/Logo.png" alt="Logo" width={30} height={30} /> 
                </div>
                <span className="text-2xl font-bold text-[#fff]">Faculty Pro</span>
              </div>
              <p className="text-md text-white leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur. Ultricies ac pellentesque euismod 
                dapibus ullamcorper nec.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold mb-6 border-l-2 border-[#F2B31D] pl-3 uppercase tracking-wider text-[#fff]">Useful links</h3>
              <ul className="space-y-3 text-xs text-gray-400">
                <li><a href="#" className="text-white hover:text-gray-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Jobs</a></li>
                <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-lg text-[#fff] font-bold mb-6 border-l-2 border-[#F2B31D] pl-3 uppercase tracking-wider">Job Categories</h3>
              <div className="grid grid-cols-2 gap-y-3 text-md text-gray-400">
                <a href="#" className="text-white hover:text-gray-400 transition-colors">Assistant Professor</a>
                <a href="#" className="text-white hover:text-gray-400 transition-colors">Assistant Professor</a>
                <a href="#" className="text-white hover:text-gray-400 transition-colors">Assistant Professor</a>
                <a href="#" className="text-white hover:text-gray-400 transition-colors">Assistant Professor</a>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg text-[#fff] font-bold mb-6 border-l-2 border-[#F2B31D] pl-3 uppercase tracking-wider">Official links</h3>
              <ul className="space-y-3 text-md text-gray-400">
                <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white hover:text-gray-400 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Socials and Copyright */}
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-[#000033] transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-[10px] text-gray-400  tracking-widest">
              Copyright 2026 © Faculty Plus. Concept by <a href="http://irepute.in/" target='_blank' className='text-underline'>repute</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;