import { capitalizeFLetter, getAvatarColor } from "@/utils/function.utils";
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Share2,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import moment from "moment";
import React from "react";
import { RWebShare } from "react-web-share";

interface JobCardProps {
  job: {
    id: number;
    job_title: string;
    job_type_obj: any;
    salary_range_obj: any;
    company: string;
    locations: any;
    experiences: any;
    created_at: string;
    company_logo: string | null;
    college: any;
    job_description: any;
  };
  onClick?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const getSalaryIcon = (salary_range_obj_name: string) => {
    if (salary_range_obj_name?.includes("$")) {
      return <DollarSign className="w-3.5 h-3.5" />;
    }
    return <IndianRupee className="w-3.5 h-3.5" />;
  };

  const handleSaveList = async (e) => {
    e.stopPropagation(); // Prevent card click event
    try {
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  return (
    <div
      className="shadow bg-white rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header with Title and Company Logo on Right */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base text-lg ">
            {capitalizeFLetter(job.job_title)}
          </h3>
          <p className="font-medium text-gray-900 text-md ">
            {capitalizeFLetter(job?.college?.name)}
          </p>
        </div>

        {/* Company Logo/Initials on Right */}
        <div className="flex-shrink-0 ml-3">
          {job?.college?.college_logo ? (
            <img
              src={job?.college?.college_logo}
              alt="company logo"
              style={{ objectFit: "contain" }}
              className="w-10 h-10 rounded-lg object-cover border border-gray-100"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-lg ${getAvatarColor(
                job?.college?.name
              )} flex items-center justify-center text-white font-semibold text-sm`}
            >
              {job?.college?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Experience and Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span className="text-sm">{job.experiences?.name}</span>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm">
            {" "}
            {job.locations?.map((item) => item.city).join(", ")}
          </span>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {job?.job_description ||
          "Looking for a skilled professional to join our team. Great opportunity for career growth and development in a dynamic work environment."}
      </p>

      {/* Footer with Posted Date and Save Button */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          {/* <Clock className="w-3.5 h-3.5" /> */}
          {moment(job.created_at).isValid() &&
          moment(job.created_at).year() > 1900
            ? moment(job.created_at).fromNow()
            : "Just now"}
        </div>

        <button
          onClick={handleSaveList}
          className=" flex  gap-1 items-center text-sm  font-medium hover:text-blue-700 transition-colors"
        >
          <Bookmark className="w-5 h-5" />
          Save
        </button>
      </div>
    </div>
  );
};
