import React from 'react';
import { Search, MapPin, SlidersHorizontal, Heart, Briefcase } from 'lucide-react';

const Discover = () => {
  const jobs = [
    {
      id: 1,
      company: "Kumaraguru College of Technology",
      position: "Assistant Professor",
      description: "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
      experience: "2 years Experience",
      timePosted: "5 days ago",
      type: "Full time",
      logo: "/assets/images/company_logo.png"

    },
    {
      id: 2,
      company: "Kumaraguru College of Technology",
      position: "Assistant Professor",
      description: "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
      experience: "2 years Experience",
      timePosted: "5 days ago",
      type: "Full time",
      logo: "/assets/images/company_logo.png"
    },
    {
      id: 3,
      company: "Kumaraguru College of Technology",
      position: "Assistant Professor",
      description: "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
      experience: "2 years Experience",
      timePosted: "5 days ago",
      type: "Full time",
      logo: "/assets/images/company_logo.png"

    },
    {
      id: 4,
      company: "Kumaraguru College of Technology",
      position: "Assistant Professor",
      description: "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
      experience: "2 years Experience",
      timePosted: "5 days ago",
      type: "Full time",
      logo: "/assets/images/company_logo.png"

    },
    {
      id: 5,
      company: "Kumaraguru College of Technology",
      position: "Assistant Professor",
      description: "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
      experience: "2 years Experience",
      timePosted: "5 days ago",
      type: "Full time",
      logo: "/assets/images/company_logo.png"

    },
    {
      id: 6,
      company: "Kumaraguru College of Technology",
      position: "Assistant Professor",
      description: "As a design team that is responsible for delivering final design for our end-users, you will be assigned to a team...",
      experience: "2 years Experience",
      timePosted: "5 days ago",
      type: "Full time",
      logo: "/assets/images/company_logo.png"

    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className=" mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#F2B31D] to-transparent text-black px-6 py-2 rounded-full text-base font-medium">
              Finding Job
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover The Best Job
          </h2>
          <p className="text-gray-600 text-lg">
            There Are Many Variations Of Passages Of Lorem Ipsum Available
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by: Job title, Position, Keyword..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F2B31D]"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="City, state or zip code"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F2B31D]"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-300">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
            <button className="bg-[#F2B31D] text-black px-8 py-3 rounded-lg hover:bg-[#E5A519] transition-colors">
              Find Job
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-6 border">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{job.company}</h3>
                    <p className="text-gray-500 text-xs">{job.timePosted}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded rounded-xl text-xs font-medium">
                    {job.type}
                  </span>
                  <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer" />
                </div>
              </div>
<hr  className='py-2'/>
              {/* Job Title */}
              <h4 className="text-xl font-bold text-gray-900 mb-3">{job.position}</h4>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

              {/* Experience */}
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">{job.experience}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button className="hover-bg-[#F2B31D]  text-md border border-xl border-[#F2B31D] rounded rounded-3xl text-black px-6 py-1  hover:bg-[#E5A519] transition-colors">
                  Apply Now
                </button>
                <button className="flex items-center gap-2  text-gray-500 hover:text-gray-700">
                  <MapPin className="w-4 h-4" />
                  Coimbatore
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-end">
          <button className="text-gray-600 hover:text-[#F2B31D] font-medium">
            View More Job →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Discover;