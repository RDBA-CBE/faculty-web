import Models from "@/imports/models.import";
import {
  capitalizeFLetter,
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
  };
  onClick?: () => void;
  updateList?: () => void;
}

export const NewJobCard: React.FC<JobCardProps> = ({
  job,
  onClick,
  updateList,
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
      className=" border-b  border-[#E4E4E4] py-5 px-3  transition-all duration-200 cursor-pointer group flex flex-col md:flex-row "
      onClick={onClick}
    >
      <div className=" w-full md:w-4/5 flex flex-row gap-5">
        {/* Company Logo/Initials on Right */}
        <div className="flex-shrink-0 ml-3 order-1 md:order-0">
          {job?.college?.college_logo ? (
            <img
              src={job?.college?.college_logo}
              alt="company logo"
              style={{ objectFit: "contain" }}
              className="w-10 h-10 rounded-3xl object-cover border border-gray-100"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-3xl ${getAvatarColor(
                job?.college?.name
              )} flex items-center justify-center text-black bg-gray-400 font-semibold text-sm`}
            >
              {job?.college?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div className="order-0 md:order-1">
          {/* Header with Title and Company Logo on Right */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-[#313131] text-[21px]  ">
                {capitalizeFLetter(job?.job_title)}
              </h3>
              <p className="font-medium font-normal text-[#848282] text-md ">
                {capitalizeFLetter(job?.college?.name)}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <p className="text-[#515151] text-sm mb-3 line-clamp-2 w-[80%]">
            {job?.job_description ||
              "Looking for a skilled professional to join our team. Great opportunity for career growth and development in a dynamic work environment."}
          </p>

          {/* Experience and Location */}
          <div className="flex items-center gap-5 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-[#ffb400]" />
              <span className="text-sm text-[#6D6C6C]">
                {job?.experiences?.name}
              </span>
            </div>
            {/* <span className="text-gray-400">|</span> */}
            {job?.college?.address && (
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#ffb400]" />
                <span className="text-sm text-[#6D6C6C]">
                  {" "}
                  {job?.locations?.map((item) => item.city).join(", ")}
                  {/* {job?.college?.address} */}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/5  flex flex-row md:flex-col justify-between">
        <div className="flex items-center justifyfy-end gap-2 pt-2 order-1 md:order-0 mb-3">
          <div className="flex font-normal items-center gap-1 text-sm text-[#565656] ">
            {/* <Clock className="w-3.5 h-3.5" /> */}
            {moment(job?.created_at).isValid() &&
            moment(job?.created_at).year() > 1900
              ? moment(job?.created_at).fromNow()
              : "Just now"}
          </div>

          <button
            disabled={isSaving === job.id}
            onClick={(e) => handleSaveToggle(e)}
            className=" flex  gap-1 items-center text-sm  font-medium hover:text-blue-700 transition-colors disabled:opacity-50"
          >
            {job?.is_saved ? (
              <div className="flex items-center ">
                <BookmarkCheck className="w-7 h-7 fill-[#1d1d57] text-white" />
              </div>
            ) : (
              <>
                <Bookmark className="w-5 h-5 " />
              </>
            )}
          </button>
        </div>

        <button className=" order-0 md:order-1 bg-[#1d1d57] w-fit mb-3 text-sm border border-xl border-[#1d1d57] rounded rounded-3xl  px-6 py-1  hover:bg-[#1d1d57] transition-colors text-white hover:text-white">
          View Job
        </button>
      </div>
    </div>
  );
};
