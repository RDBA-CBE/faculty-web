"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Heart,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Plus,
  Check,
  Loader2,
  Share,
  Share2,
  Clock,
  Building2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  capitalizeFLetter,
  Dropdown,
  Failure,
  getAvatarColor,
  useSetState,
} from "@/utils/function.utils";
import Models from "@/imports/models.import";
import moment from "moment";
import CustomSelect from "../dropdown";
import useDebounce from "../useDebounce";
import { RWebShare } from "react-web-share";

const categories = [
  { name: "Assistant Professor", count: 20 },
  { name: "Research Associate", count: 14 },
  { name: "Academic Coordinator", count: 52 },
  { name: "Lab Instructor", count: 33 },
  { name: "Associate Professor", count: 14 },
  { name: "Academic Coordinator", count: 52 },
  { name: "Lab Instructor", count: 33 },
];

const FindYourJob = () => {
  const router = useRouter();
  const [state, setState] = useSetState({
    count: 0,
    jobList: [],
    next: null,
    prev: null,
    search: "",
    location: "",
    locationList: [],
    collegesList: [],
  });

  const debouncedSearch = useDebounce(state.search, 500);

  useEffect(() => {
    locationList();
    jobList(1);
  }, [debouncedSearch, state.location]);

  useEffect(() => {
    jobList(state.page);
  }, [state.page]);

  const locationList = async () => {
    try {
      const res: any = await Models.location.list();
      const dropdown: any = Dropdown(res?.results, "city");
      setState({
        locationList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const jobList: any = async (page = 1) => {
    try {
      setState({ loading: true });
      console.log("hello");
      const body = bodyData();

      const res: any = await Models.job.list(page, body);
      console.log(res);

      setState({
        loading: false,
        // page: state.page,
        count: res?.count,
        jobList: res?.results,
        next: res?.next,
        prev: res?.previous,
      });
    } catch (error) {
      setState({ loading: false });
      Failure("Failed to fetch jobs");
    }
  };

  const bodyData = () => {
    const body: any = {};
    if (debouncedSearch) {
      body.search = debouncedSearch;
    }

    if (state?.location) {
      body.location = state.location;
    }

    // if (filters?.location) {
    //   body.location = filters.location;
    // }

    // body.date_posted_after = moment()
    //   .subtract(7, "days")
    //   .format("YYYY-MM-DD");
    // body.date_posted_before = moment().format("YYYY-MM-DD");

    return body;
  };

  const totalPages = Math.ceil(state.count / state.pageSize);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const start = Math.max(1, state.page - 3);
    const end = Math.min(totalPages, state.page + 3);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="py-12 lg:py-16 bg-[#0000ff0a]">
      <div className="section-wid w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Content - Job Listings */}
          <div className="lg:col-span-9">
            {/* Header with Search in Single Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <h2 className="text-3xl font-semibold text-[#151515]">
                Find Your Job
              </h2>

              {/* Search Bar */}
              <div className="bg-white   rounded-full shadow-md border border-gray-200 p-1.5 flex items-center gap-1 max-w-2xl">
                <div className="flex items-center flex-1 px-3 py-1.5">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Job title, Position, Keyword..."
                    className="w-full focus:outline-none text-sm placeholder:bg-none placeholder:text-[#313131]"
                    value={state.search}
                    onChange={(e) => setState({ search: e.target.value })}
                  />
                </div>
                <div className="w-px h-6 bg-gray-200"></div>
                <div className="flex items-center px-3 py-1.5 min-w-[120px]">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />

                  <CustomSelect
                    placeholder="City, state"
                    options={state.locationList}
                    className="p-0 border-none focus:outline-none"
                    value={state?.location || ""}
                    onChange={(selected) =>
                      setState({
                        ...state,
                        location: selected ? selected.value : "",
                      })
                    }
                  />
                </div>
                <div className="w-px h-6 bg-gray-200"></div>
                {/* <button className="flex items-center px-3 py-1.5 text-gray-600 hover:text-gray-800">
                  <SlidersHorizontal className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Filters</span>
                </button> */}
                <button className="bg-[#0a1551] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#080f3d] transition">
                  Find Job
                </button>
              </div>
            </div>

            {/* Job Cards Grid */}
            {state.loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-[#0a1551]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 !gap-4 mb-6">
                {state?.jobList.slice(0, 6)?.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 md:p-5 border border-gray-200 
             transition-all duration-300 bg-white shadow-xl
             hover:bg-white
             hover:border-none
             hover:-translate-y-1
             hover:shadow-2xl hover:shadow-gray-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-3 h-full">
                      <div className="flex  items-start gap-3 w-full h-full">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
                          {job?.college?.college_logo ? (
                            <Image
                              src={job?.college?.college_logo}
                              alt={job?.college?.name}
                              width={50}
                              height={50}
                              className="object-contain"
                            />
                          ) : (
                            <div
                              className={`w-full h-full rounded-lg ${getAvatarColor(
                                job?.college?.name
                              )} flex items-center justify-center text-white bg-gray-400 font-medium  flex-shrink-0`}
                            >
                              {job?.college?.name?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className="w-full">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="sub-ti !text-[#313131] !font-medium  mb-0.5 ">
                                {capitalizeFLetter(job.job_title)}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {job.college?.name}
                              </p>
                            </div>
                            <RWebShare
                              data={{
                                title: "Faculty Plus",
                                text: "Check this out!",
                                url: window.location.href,
                              }}
                              onClick={() =>
                                console.log("shared successfully!")
                              }
                            >
                              <button className="text-gray-800 hover:text-black transition h-fit">
                                <Share2 className="w-5 h-5" />
                              </button>
                            </RWebShare>
                          </div>
                          <div>
                            <div className="flex items-center gap-4  text-xs text-gray-600 mt-4 mb-2">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4 text-[#ffb400]" />
                                <span>{job.experiences?.name}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-[#ffb400]" />
                                <span>
                                  {job.locations
                                    ?.map((item) => item.city)
                                    .join(", ")}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 mb-4 ">
                              <Building2 className="w-4 h-4 text-[#ffb400]" />
                              <span>
                                {job.department
                                  ?.map((item) => item.name)
                                  .join(", ")}
                              </span>
                            </div>
                            <div className="flex items-center justify-between w-100 pt-3">
                              <button
                                onClick={() =>
                                  router.push(`/jobs?id=${job.id}`)
                                }
                                className="border border-[#0a1551] text-[#fff] px-5 py-1.5 rounded-full text-sm font-medium bg-[#0a1551]  hover:bg-[#0a1551]/90 hover:text-white transition"
                              >
                                View Job
                              </button>

                              <div className="flex items-center justify-end text-end gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {moment(job.created_at).isValid() &&
                                  moment(job.created_at).year() > 1900
                                    ? moment(job.created_at).fromNow()
                                    : "Just now"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex flex-col items-end justify-between h-full">
                        
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Job Spotlight */}
            <div className=" border ">
              <div className="bg-[#0a1551] flex items-center justify-between py-3 px-4">
                <h3 className="text-2xl font-medium text-white">
                  Job spotlight
                </h3>
                <div className="flex gap-2">
                  <button className="swiper-spotlight-prev w-8 h-8 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button className="swiper-spotlight-next w-8 h-8 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: ".swiper-spotlight-prev",
                  nextEl: ".swiper-spotlight-next",
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="job-spotlight-swiper bg-white"
              >
                {state.jobList?.slice(0, 6)?.map((job: any) => (
                  <SwiperSlide key={job.id}>
                    <div className=" px-6 pb-6 pt-5 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                      <div className="mb-4 rounded-lg overflow-hidden h-16 w-full  flex items-center justify-center  ">
                        {job?.college?.college_logo ? (
                          <img
                            src={job?.college?.college_logo}
                            alt={job?.college?.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div
                            className={`w-full h-full ${getAvatarColor(
                              job?.college?.name
                            )} flex items-center justify-center text-white font-bold text-4xl`}
                          >
                            {job?.college?.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <h4 className="sub-ti !font-semibold !text-[#313131] mb-2 line-clamp-1">
                        {job.job_title}
                      </h4>
                      <p className="text-base text-gray-600 mb-4 line-clamp-1">
                        {job.college?.name}
                      </p>

                      <div className="space-y-2 ">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Briefcase className="w-4 h-4 text-yellow-500" />
                          <span>{job.experiences?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4  text-yellow-500" />
                          <span>
                            {job.locations
                              ?.map((item: any) => item.city)
                              .join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4 mt-1 ">
                        <Building2 className="w-4 h-4 text-[#ffb400]" />
                        <span>
                          {job.department?.map((item) => item.name).join(", ")}
                        </span>
                      </div>

                      <div className="relative flex items-center justify-end">
                        <button
                          onClick={() => router.push(`/jobs?id=${job.id}`)}
                          className="relative z-10 border border-black text-[#595959] px-5 py-1 rounded-full text-base font-small hover:bg-[#0a1551] hover:text-white transition flex items-center gap-2"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Jobs By Category */}
            <div className="bg-[#0a1551] border ">
              <div className="py-3 px-4">
                <h3 className="text-2xl font-medium text-white">
                  Jobs By Category
                </h3>
              </div>

              <div className="bg-white px-6 pb-6 pt-5 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                <div className="space-y-3 mb-6">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        router.push(
                          `/jobs?search=${encodeURIComponent(category.name)}`
                        )
                      }
                      className="flex items-center gap-2 text-gray-800 hover:text-[#0a1551] cursor-pointer transition"
                    >
                      <ChevronRight className="w-4 h-4 text-[#1F1F1F]" />
                      <span className="text-[#1F1F1F]">{category.name}</span>
                    </div>
                  ))}
                </div>

                {/* <button className="flex items-center gap-2 text-gray-800 font-semibold hover:text-[#0a1551] transition">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-md">View All Category</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourJob;
