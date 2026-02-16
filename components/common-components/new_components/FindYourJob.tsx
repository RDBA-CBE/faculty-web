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
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Dropdown, Failure, getAvatarColor, useSetState } from "@/utils/function.utils";
import Models from "@/imports/models.import";
import moment from "moment";
import CustomSelect from "../dropdown";
import useDebounce from "../useDebounce";



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

  })

  const debouncedSearch = useDebounce(state.search, 500);


  useEffect(() => {
    locationList()
    jobList(1)
  }, [
    debouncedSearch,
    state.location,
  ])

  useEffect(() => {
    jobList(state.page)
  }, [state.page])

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
    <section className="py-12 lg:py-16 ">
      <div className="section-wid w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Content - Job Listings */}
          <div className="lg:col-span-9">
            {/* Header with Search in Single Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-black">
                Find Your Job
              </h2>

              {/* Search Bar */}
              <div className=" rounded-full shadow-md border border-gray-200 p-1.5 flex items-center gap-1 max-w-2xl">
                <div className="flex items-center flex-1 px-3 py-1.5">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Job title, Position, Keyword..."
                    className="w-full focus:outline-none text-sm bg-trasparent"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {state?.jobList.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 border border-gray-200 
             transition-all duration-300
             hover:bg-white
             hover:border-none
             hover:-translate-y-1
             hover:shadow-2xl hover:shadow-gray-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
                          {job?.college?.college_logo ? <Image
                            src={job?.college?.college_logo}
                            alt={job?.college?.name}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                            : <div
                              className={`w-10 h-10 rounded-lg ${getAvatarColor(job?.college?.name)} flex items-center justify-center text-white font-semibold flex-shrink-0`}
                            >
                              {job?.college?.name?.charAt(0).toUpperCase()}
                            </div>}
                        </div>
                        <div>
                          <h3 className="sub-ti font-semibold text-black mb-0.5">
                            {job.job_title}
                          </h3>
                          <p className="text-sm text-gray-600">{job.college?.name}</p>

                          <div className="flex items-center gap-4 mb-4 text-xs text-gray-600 mt-4">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                              <span>{job.experiences?.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gray-500" />
                              <span>{job.locations?.map((item) => item.city).join(", ")}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => router.push(`/jobs?id=${job.id}`)}
                              className="border border-[#0a1551] text-[#0a1551] px-5 py-1.5 rounded-full text-sm font-medium hover:bg-[#0a1551] hover:text-white transition"
                            >
                              View Job
                            </button>
                            <span className="text-xs text-gray-400">
                              {job.postedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <button className="text-gray-300 hover:text-red-500 transition">
                      <Heart className="w-5 h-5" />
                    </button> */}
                    </div>




                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}

           {state.next && <div className="flex items-center justify-center gap-2 py-8">

              {/* Left Arrow */}
              <button
                disabled={!state.prev}
                onClick={() =>
                  setState((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 
      ${!state.prev ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"} 
      transition`}
              >
                ‹
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm border border-gray-200">
                {getVisiblePages().map((page) => (
                  <button
                    key={page}
                    onClick={() =>
                      setState((prev) => ({ ...prev, page }))
                    }
                    className={`h-8 w-8 rounded-full text-sm transition
          ${state.page === page
                        ? "bg-[#050A4E] text-white font-medium"
                        : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                disabled={!state.next}
                onClick={() =>
                  setState((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 
      ${!state.next ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"} 
      transition`}
              >
                ›
              </button>
            </div>}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Job Spotlight */}
            <div className=" border ">
              <div className="bg-[#0a1551] flex items-center justify-between py-3 px-4">
                <h3 className="text-2xl font-bold text-white">Job spotlight</h3>
                <div className="flex gap-2">
                  <button className="swiper-spotlight-prev w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button className="swiper-spotlight-next w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition">
                    <ChevronRight className="w-5 h-5 text-white" />
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
                className="job-spotlight-swiper"
              >
                {state.jobList?.map((job: any) => (
                  <SwiperSlide key={job.id}>
                    <div className=" px-6 pb-6 pt-5 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                      <div className="mb-4 rounded-lg overflow-hidden h-16 w-full bg-gray-50 flex items-center justify-center  ">
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

                      <h4 className="sub-ti font-bold text-black mb-2 line-clamp-1">
                        {job.job_title}
                      </h4>
                      <p className="text-base text-gray-600 mb-4 line-clamp-1">
                        {job.college?.name}
                      </p>

                      <div className="space-y-2 mb-4">
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

                      <div className="relative flex items-center justify-end">
                        <button
                          onClick={() => router.push(`/jobs?id=${job.id}`)}
                          className="relative z-10 border border-black text-black px-2 py-1 rounded-full text-base font-small hover:bg-black hover:text-white transition flex items-center gap-2"
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
                <h3 className="text-2xl font-bold text-white">
                  Jobs By Category
                </h3>
              </div>

              <div className="bg-white px-6 pb-6 pt-5 bg-[url('/assets/images/Faculty/card-bg.png')] bg-cover bg-center bg-no-repeat">
                <div className="space-y-3 mb-6">
                  {[
                    { title: "Hostel Warden", count: 20 },
                    { title: "Placement Officer", count: 14 },
                    { title: "Lab assistant", count: 52 },
                    { title: "Research Associate", count: 33 },
                    { title: "Associate Professor", count: 14 },
                    { title: "Academic Coordinator", count: 52 },
                    { title: "Lab Instructor", count: 33 },
                  ].map((category, index) => (
                    <div
                      key={index}
                      onClick={() => router.push(`/jobs?search=${encodeURIComponent(category.title)}`)}
                      className="flex items-center gap-2 text-gray-800 hover:text-[#0a1551] cursor-pointer transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-base">
                        {category.title} 
                        {/* ({category.count}) */}
                      </span>
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
