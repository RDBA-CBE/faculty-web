
'use client';

import { motion } from 'framer-motion';
import BannerSection from '@/components/common-components/HeroSection';
import About from '@/components/common-components/about';
import Discover from '@/components/common-components/discover';
import TopCategory from '@/components/common-components/top_category';
import Banner from '@/components/common-components/home_banner';
import InstitutionPartners from '@/components/common-components/InstitutionPartners';
import Testimonials from '@/components/common-components/Testimonials';
import Footer from '@/components/common-components/Footer';
import NewHeroSection from '@/components/common-components/new_components/NewHeroSection';
import TopHiringColleges from '@/components/common-components/new_components/TopHiringColleges';
import FindYourJob from '@/components/common-components/new_components/FindYourJob';
import WhatCanIDo from '@/components/common-components/new_components/WhatCanIDo';
import StatsSection from '@/components/common-components/new_components/StatsSection';
import DownloadAppSection from '@/components/common-components/new_components/DownloadApp';
import FaqResumeSection from '@/components/common-components/new_components/FaqSection';



// ---------------- PAGE ----------------
export default function Home1Page() {
  
  return (
    <div className='min-h-screen bg-[#f9fafb]'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* <BannerSection /> */}
        <NewHeroSection />
        <TopHiringColleges />
        <FindYourJob />
        <WhatCanIDo />
        <StatsSection />
        <InstitutionPartners />
        <DownloadAppSection />
        <FaqResumeSection />

        <div>
          <Discover />
          <TopCategory />
          <Banner />
          {/* <InstitutionPartners /> */}
          <Testimonials />
        </div>
        
        <Footer />
      </motion.div>
    </div>
  );
}