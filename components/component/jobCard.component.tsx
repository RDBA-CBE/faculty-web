import Models from "@/imports/models.import";
import {
  capitalizeFLetter,
  CharSlice,
  Failure,
  getAvatarColor,
  Success,
} from "@/utils/function.utils";
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  Share2,
  DollarSign,
  IndianRupee,
  BookmarkCheck,
  Building2,
} from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
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
    is_saved: boolean;
    department?: any;
  };
  onClick?: () => void;
  updateList?: () => void;
  onCollegeClick?: (e: React.MouseEvent, id: number) => void;
  onDepartmentClick?: (e: React.MouseEvent, id: number) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onClick,
  updateList,
  onCollegeClick,
  onDepartmentClick,
}) => {
  const [isSaving, setIsSaving] = useState<number | null>(null);

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    const profile = JSON.parse(localStorage.getItem("user") || "null");
    if (!profile?.id) {
      Failure("Please log in to save jobs.");
      return;
    }

    setIsSaving(job.id);
    try {
      // if (isSaved) {
      //   if (!saveId) {
      //     console.error("Cannot unsave job without a save_id.");
      //     Failure("Could not unsave job. Please refresh and try again.");
      //     setIsSaving(null);
      //     return;
      //   }
      //   await Models.save.delete(saveId);
      //   Success("Job removed from saved list.");
      // }
      // else {

      const body = {
        job_id: job?.id,
        user_id: profile.id,
      };
      if (job?.is_saved) {
        await Models.save.delete(profile.id, job.id);
        Success("Job removed from saved list.");
      } else {
        await Models.save.create(body);
        Success("Job saved successfully.");
      }
      updateList();
      // }

      // Refetch job list to get the latest saved status and save_id
    } catch (error) {
      console.error("Failed to save/unsave job", error);
      Failure("An error occurred. Please try again.");
    } finally {
      setIsSaving(null);
    }
  };

  return (
    <div
      className="border border-[#c7c7c787] bg-white  p-5 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header with Title and Company Logo on Right */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base text-lg" title={job?.job_title}>
            {capitalizeFLetter(CharSlice(job?.job_title, 35))}
          </h3>
          <p
            className="font-medium font-normal text-[#848282] text-md hover:underline w-fit"
            title={job?.college?.name}
            onClick={(e) => onCollegeClick(e, job?.college?.id)}
          >
            {capitalizeFLetter(CharSlice(job?.college?.name,43))}
          </p>
        </div>

        {/* Company Logo/Initials on Right */}
        <div
          className="flex-shrink-0 ml-3"
          onClick={(e) => onCollegeClick(e, job?.college?.id)}
        >
          {job?.college?.college_logo ? (
            <img
              src={job?.college?.college_logo}
              alt="company logo"
              style={{ objectFit: "contain" }}
              className="w-10 h-10 rounded-lg object-cover border border-gray-100"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-lg bg-gray-500 flex items-center justify-center text-white font-semibold text-sm`}
            >
              {job?.college?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Experience and Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 ">
        <div className="flex items-center gap-3">
          <Briefcase className="w-4 h-4 text-[#ffb400]" />
          <span className="text-sm text-[#6D6C6C]">
            {job?.experiences?.name}
          </span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-[#ffb400]" />
          <span className="text-sm text-[#6D6C6C]">
            {" "}
            {job?.locations?.map((item) => item.city).join(", ")}
            {/* {job?.college?.address} */}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 mt-2">
        <Building2 className="w-4 h-4 text-[#ffb400]" />

        <span className="flex items-center gap-3 text-sm text-[#6D6C6C]">
          {job?.department?.slice(0, 1).map((item, index) => (
            <span
              key={index}
              className="cursor-pointer  text-sm text-[#6D6C6C]"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   onDepartmentClick && onDepartmentClick(e, item.id);
              // }}
            >
              {item.name}
            </span>
          ))}

          {/* If more than 2 departments */}
          {job?.department?.length > 2 && (
            <div className="w-6 h-6 px-3 flex items-center justify-center rounded-full bg-[#1E3786] text-white text-[12px] font-medium">
              +{job.department.length - 2}
            </div>
          )}
        </span>
      </div>
      {/* Job Description */}
      {job?.job_description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {job?.job_description}
          {/* {job?.job_description ||
          "Looking for a skilled professional to join our team. Great opportunity for career growth and development in a dynamic work environment."} */}
        </p>
      )}
      {/* Footer with Posted Date and Save Button */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          {/* <Clock className="w-3.5 h-3.5" /> */}
          {moment(job?.created_at).isValid() &&
          moment(job?.created_at).year() > 1900
            ? moment(job?.created_at).fromNow()
            : "Just now"}
        </div>

        <button
          disabled={isSaving === job?.id}
          onClick={(e) => handleSaveToggle(e)}
          className=" flex  gap-1 items-center text-sm  font-medium hover:text-blue-700 transition-colors disabled:opacity-50"
        >
          {job?.is_saved ? (
            <div className="flex items-center ">
              <BookmarkCheck className="w-7 h-7 fill-[#1E3786] text-white" />
              <div className="text-[#1E3786] font-medium text-sm">Saved</div>
            </div>
          ) : (
            <>
              <Bookmark className="w-5 h-5 " />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
};
