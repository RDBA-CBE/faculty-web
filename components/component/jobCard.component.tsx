import { Briefcase, Heart, MapPin } from "lucide-react";
import React from "react";

const JobCard = ({ job }) => {
  return (
    <div key={job.id} className="bg-white rounded-2xl p-6 border">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={job.logo}
            alt={job.company}
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {job.company}
            </h3>
            <p className="text-gray-500 text-xs">{job.timePosted}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded rounded-xl text-xs font-medium">
            {job.type}
          </span>
          {/* <Heart className="w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer" /> */}
        </div>
      </div>
      <hr className="py-2" />
      {/* Job Title */}
      <h4 className="text-xl font-bold text-gray-900 mb-3">{job.position}</h4>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

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
  );
};

export default JobCard;
