import { capitalizeFLetter, getAvatarColor } from "@/utils/function.utils";
import { MapPin, Briefcase, Clock, Bookmark, Share2, DollarSign, IndianRupee } from "lucide-react";
import React from "react";

interface JobCardProps {
  job: {
    id: number;
    job_title: string;
    job_type: string;
    salary_range: string;
    company: string;
    location: string;
    experiences: string;
  };
  onClick?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const getSalaryIcon = (salaryRange: string) => {
    if (salaryRange.includes('$')) {
      return <DollarSign className="w-3.5 h-3.5" />;
    }
    return <IndianRupee className="w-3.5 h-3.5" />;
  };

  return (
    <div
      className="bg-clr2 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-lg ${getAvatarColor(job.company)} flex items-center justify-center text-white font-semibold flex-shrink-0`}
          >
            {job.company?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-[#000] transition-colors">
              {job.job_title}
            </h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
          <Share2 className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Experience and Salary */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
        <div className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span className="text-sm">{job.experiences}</span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          {getSalaryIcon(job.salary_range)}
          <span className="text-sm">{job.salary_range}</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <MapPin className="w-3.5 h-3.5" />
        <span className="text-sm">{job.location}</span>
      </div>

      {/* Description */}
      <p className=" text-gray-600 mb-4 line-clamp-2">
        Looking for a skilled professional to join our team. Great opportunity for career growth and development in a dynamic work environment.
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between  border-t border-gray-100">
        <span className="bg-green-50 text-green-700 px-3  rounded-full text-xs font-medium">
          {capitalizeFLetter(job.job_type)}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>2 days ago</span>
        </div>
      </div>
    </div>
  )
}
