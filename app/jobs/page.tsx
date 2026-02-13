"use client";

import Filterbar from "@/components/component/filterbar.component";
import ChipFilters from "@/components/component/chipFilters.component";
import useDebounce from "@/components/common-components/useDebounce";

import { MOCK_JOBS } from "@/utils/constant.utils";
import {
  capitalizeFLetter,
  Dropdown,
  Failure,
  generateMockJobs,
  getAvatarColor,
  useSetState,
} from "@/utils/function.utils";
import {
  MapPin,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  DollarSign,
  Briefcase,
  GraduationCap,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  X,
  Check,
  BriefcaseBusinessIcon,
  Upload,
  Bookmark,
  Share2,
  IndianRupee,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Modal from "@/components/common-components/modal";
import { Input } from "@/components/ui/input";
import TextArea from "@/components/common-components/textArea";
import CustomPhoneInput from "@/components/common-components/phoneInput";
import FileUpload from "@/components/common-components/fileUpload";
import { jobApplicationSchema } from "@/utils/validation.utils";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Models from "@/imports/models.import";
import { JobCard } from "@/components/component/jobCard.component";
import PaginationCom from "@/components/component/PaginationCom";
import page from "../(real-estate)/test/page";
import CustomSelect from "@/components/common-components/dropdown";
import moment from "moment";
import { Success } from "@/components/common-components/toast";

export default function JobsPage() {
  const [state, setState] = useSetState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
    congratsOpen: false,
    loading: false,
    page: 1,
    count: 0,
    jobList: [],
    next: null,
    prev: null,
    search: "",
    sortBy: "",
    sortOrder: "",
    errors: {},
    jobID: null,
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isTabScreen, setIsTabScreen] = useState(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    location: "",
    categories: [],
    jobTypes: [],
    experienceLevels: null,
    datePosted: "All",
    salaryRange: [],
    tags: [],
    experience: "",
    jobID: null,
  });

  const debouncedSearch = useDebounce(state.search, 500);

  useEffect(() => {
    if (selectedJob && isTabScreen) {
      setTimeout(() => setIsAnimating(true), 100);
    }
  }, [selectedJob, isTabScreen]);

  useEffect(() => {
    jobList(1);
    categoryList();
    jobTypeList();
    locationList();
    experienceList();
    DatePosted();
    salaryRangeList();
    tagsList();
  }, []);

  useEffect(() => {
    jobList(1);
  }, [
    debouncedSearch,
    filters?.categories,
    filters.location,
    filters.jobTypes,
    filters.experienceLevels,
    filters?.datePosted,
    filters.salaryRange,
    filters?.tags,
  ]);

  const categoryList = async () => {
    try {
      const res: any = await Models.category.list();
      const dropdown = Dropdown(res?.results, "name");
      setState({
        categoryList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const locationList = async () => {
    try {
      const res: any = await Models.location.list();
      const dropdown = Dropdown(res?.results, "city");
      setState({
        locationList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const jobTypeList = async () => {
    try {
      const res: any = await Models.jobtype.list();
      const dropdown = Dropdown(res?.results, "name");
      setState({
        jobTypeList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const experienceList = async () => {
    try {
      const experienceList = [
        { value: "fresher", label: "Fresher" },
        { value: "0 – 1 Year", label: "0 – 1 Year" },
        { value: "1 – 3 Years", label: "1 – 3 Years" },
        { value: "3 – 5 Years", label: "3 – 5 Years" },
        { value: "5 – 10 Years", label: "5 – 10 Years" },
        { value: "10+ Years", label: "10+ Years" },
      ];

      setState({
        experienceList: experienceList,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const DatePosted = async () => {
    try {
      const datePosted = [
        { value: "24h", label: "Last 24 hours" },
        { value: "7d", label: "Last 7 days" },
        { value: "15d", label: "Last 15 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "last-mon", label: "Last Month" },
        // { value: "all", label: "All" },
      ];

      setState({
        datePostedList: datePosted,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const salaryRangeList = async () => {
    try {
      const res: any = await Models.salaryRange.list();
      const dropdown = Dropdown(res?.results, "name");
      setState({
        salaryRangeList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  console.log("salaryRangeList", state?.salaryRangeList);
  console.log("salaryRange", filters?.salaryRange);

  const tagsList = async () => {
    try {
      const res: any = await Models.jobtags.list();
      const dropdown = Dropdown(res?.results, "name");
      setState({
        tagsList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const jobList = async (page = 1) => {
    try {
      setState({ loading: true });

      const body = bodyData();

      const res: any = await Models.job.list(page, body);
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

  const jobDetail = async (jobId) => {
    try {
      setState({ loading: true });
      const res: any = await Models.job.details(jobId);
      const responsibilities =
        res?.responsibility?.blocks
          ?.filter((block) => block.type === "list")
          ?.flatMap((block) => block.data.items) || [];
      setState({
        loading: false,
        jobDetail: res,
        responsibilities: responsibilities,
      });
    } catch (error) {
      setState({ loading: false });
      Failure("Failed to fetch jobs");
    }
  };

  const handleApply = () => {
    const profile = JSON.parse(localStorage.getItem("user") || "null");

    if (profile) {
      handleFormSubmit();
    } else {
      setShowApplicationModal(true);
    }
  };

  const handleFormSubmit = async () => {
    try {
      //  never overwrite state
      setState({ btnLoading: true, errors: {} });

      const profile = JSON.parse(localStorage.getItem("user") || "null");
      console.log("profile", profile);

      //  LOGGED-IN USER (NO RESUME)

      if (profile?.id) {
        const formData = new FormData();

        formData.append("job_id", state?.jobDetail?.id);
        formData.append("applicant", profile.id);
        formData.append("status", "Applied");

        console.log("logged-in formData", [...formData.entries()]);

        const res = await Models.applications.create(formData);
        console.log("job apply res", res);
      }

      //  GUEST USER (WITH RESUME)
      else {
        const validateBody = {
          first_name: state.firstName,
          last_name: state.lastName,
          phone: state.phone,
          resume: state.resume,
          email: state.email?.trim(),
          experience: state.experience,
        };

        await jobApplicationSchema.validate(validateBody, {
          abortEarly: false,
        });

        //  FormData
        const formData = new FormData();

        formData.append("job_id", state.jobID);
        formData.append("first_name", state.firstName);
        formData.append("last_name", state.lastName);
        formData.append("email", state.email?.trim());
        formData.append("phone", state.phone);
        formData.append("experience", state.experience);
        formData.append("message", state.message || "");
        formData.append("status", "Applied");

        if (state.resume) {
          formData.append("resume", state.resume); // FILE OBJECT
        }

        //  Debug FormData
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        const res = await Models.applications.create(formData);
        console.log("job apply res", res);
      }

      //  COMMON SUCCESS STATE

      setShowApplicationModal(false);
      Success("Application submitted successfully");

      setState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        experience: "",
        resume: null,
        congratsOpen: true,
        btnLoading: false,
      });
    } catch (error) {
      //  YUP VALIDATION ERROR

      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });

        console.log("validationErrors", validationErrors);

        setState((prev) => ({
          ...prev,
          errors: validationErrors,
          btnLoading: false,
        }));
      }

      // API ERROR
      else {
        console.log(error);

        const apiError = error?.data?.error || "Something went wrong";

        Failure(apiError);

        setState((prev) => ({
          ...prev,
          btnLoading: false,
        }));
      }
    }
  };

  const bodyData = () => {
    const body: any = {};
    if (debouncedSearch) {
      body.search = debouncedSearch;
    }
    if (state.sortBy) {
      body.ordering =
        state.sortOrder === "desc" ? `-${state.sortBy}` : state.sortBy;
    }

    if (filters?.categories?.length > 0) {
      body.category = filters.categories;
    }

    if (filters?.location) {
      body.location = filters.location;
    }

    if (filters?.jobTypes?.length > 0) {
      body.jobTypes = filters.jobTypes;
    }

    if (filters?.experienceLevels) {
      body.experience = filters.experienceLevels;
    }

    if (filters?.salaryRange?.length > 0) {
      body.salary_range = filters.salaryRange;
    }

    if (filters?.tags?.length > 0) {
      body.tags = filters.tags?.map((tag) => tag.value).join(",");
    }

    if (filters?.datePosted == "24h") {
      body.date_posted_after = moment()
        .subtract(24, "hours")
        .format("YYYY-MM-DD");
    }

    if (filters?.datePosted == "7d") {
      body.date_posted_after = moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD");
      body.date_posted_before = moment().format("YYYY-MM-DD");
    }

    if (filters?.datePosted == "15d") {
      body.date_posted_after = moment()
        .subtract(15, "days")
        .format("YYYY-MM-DD");
      body.date_posted_before = moment().format("YYYY-MM-DD");
    }

    if (filters?.datePosted == "30d") {
      body.date_posted_after = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
      body.date_posted_before = moment().format("YYYY-MM-DD");
    }

    return body;
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileScreen(width < 768);
      setIsTabScreen(width >= 768 && width < 1024);
      setIsDesktopScreen(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (!state.next) return;
    setState({ page: state.page + 1 });
    jobList(state.page + 1);
  };

  console.log("state.page", state.page);

  const handlePrev = () => {
    if (!state.prev) return;
    setState({ page: state.page - 1 });
    jobList(state.page);
  };

  const handleFormChange = (field, value) => {
    setState({
      [field]: value,
      errors: {
        ...state.errors,
        [field]: "",
      },
    });
  };

  return (
    <div className=" bg-clr1">
      <div className="bg-black py-4 px-4 ">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="sub-ti !text-white ">Jobs</h1>
        </div>
      </div>

      <main className="section-wid py-8 lg:py-12">
        {isTabScreen && selectedJob ? (
          <div
            className={`space-y-6 transition-all duration-500 ease-in-out transform ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {/* Back Button */}
            <button
              onClick={() => {
                setIsAnimating(false);
                setTimeout(() => {
                  setSelectedJob(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 300);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Jobs</span>
            </button>

            {/* Job Header */}
            {/* Job Header Card */}
            <div className="bg-clr2 rounded-lg   p-6 ">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-4">
                  {state?.jobDetail?.company_logo ? (
                    <img
                      src={state?.jobDetail?.company_logo}
                      alt={state?.jobDetail?.company}
                      className="w-14 h-14  object-cover"
                    />
                  ) : (
                    <div
                      className={`w-14 h-14 rounded-lg ${getAvatarColor(state?.jobDetail?.company)} flex items-center justify-center text-white font-semibold text-lg`}
                    >
                      {state?.jobDetail?.company?.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                      {state?.jobDetail?.job_title}
                    </h1>
                    <p className="text-md text-gray-700 mb-2">
                      {state?.jobDetail?.company}
                    </p>
                  </div>
                </div>
                <button className="p-1" onClick={() => setSelectedJob(null)}>
                  <X size={25} className=" hover:text-gray-600" />
                </button>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-3">
                  {capitalizeFLetter(
                    state?.jobDetail?.locations
                      ?.map((item) => item.city)
                      .join(", "),
                  )}{" "}
                  • Posted {state?.jobDetail?.postedDate || "2 days ago"}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {state?.jobDetail?.experiences}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {state?.jobDetail?.job_type_obj?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    {selectedJob.salary_range?.includes("$") ? (
                      <DollarSign className="w-4 h-4" />
                    ) : (
                      <IndianRupee className="w-4 h-4" />
                    )}
                    {state?.jobDetail?.salary_range_obj?.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setState({ jobID: state?.jobDetail?.id });
                    handleApply();
                  }}
                  className="hover-bg-[#F2B31D]  text-md border border-xl border-[#F2B31D] rounded rounded-3xl  px-6 py-1  hover:bg-[#E5A519] transition-colors text-black hover:text-white"
                >
                  Apply Now
                </button>

                <div className="flex items-center gap-2">
                  {/* <Bookmark className="w-5 h-5  hover:text-gray-600 cursor-pointer" /> */}
                  <Share2 className="w-5 h-5  hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="bg-clr2 rounded-lg   p-6 ">
              {/* Job Description */}
              <div className="border-b  px-2 py-2 pb-5">
                <h2 className="text-lg font-semibold text-black mb-4">
                  About the job
                </h2>
                <div className="leading-relaxed space-y-4">
                  <p>
                    {state?.jobDetail?.job_description}
                    {/* We are looking for a talented professional to join our
                        dynamic team. This role offers an excellent opportunity
                        to work with cutting-edge technologies and contribute to
                        meaningful projects that impact thousands of users. */}
                  </p>
                  {/* <p>
                        The ideal candidate will have strong technical skills,
                        excellent communication abilities, and a passion for
                        innovation. You'll be working in a collaborative
                        environment where your ideas and contributions are
                        valued.
                      </p> */}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="border-b  px-2 py-2 pb-5">
                <h2 className="text-lg font-semibold text-black mb-4">
                  Key responsibilities
                </h2>
                <ul className="space-y-3">
                  {state?.responsibilities?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />

                      <span className="">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              {state?.jobDetail?.requirements && <div className="border-b  px-2 py-2 pb-5">
                <h2 className="text-lg font-semibold text-black mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {state?.jobDetail?.requirements?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />
                      <span className="">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>}

              {/* Skills */}
              {state?.jobDetail?.skills && (
                <div className="  px-2 py-2 pb-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {state?.jobDetail?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-clr1 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {skill?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Job Details */}

            <div className="bg-clr2 rounded-lg   p-6">
              <h3 className="text-lg font-semibold text-black mb-4">
                Job details
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-md font-medium  pb-1">Job type</p>
                  <p className="text-md text-black">
                    {state?.jobDetail?.job_type_obj?.name}
                  </p>
                </div>
                <div>
                  <p className="text-md font-medium  pb-1">Experience level</p>
                  <p className="text-md text-black">
                    {state?.jobDetail?.experiences}
                  </p>
                </div>
                <div>
                  <p className="text-md font-medium  pb-1">Salary</p>
                  <p className="text-md text-black">
                    {state?.jobDetail?.salary_range_obj?.name}
                  </p>
                </div>
                <div>
                  <p className="text-md font-medium  pb-1">Location</p>
                  <p className="text-md text-black">
                    {state?.jobDetail?.locations
                      ?.map((item) => item.city)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-clr2 rounded-lg  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About {state?.jobDetail?.company}
              </h3>
              <div className="flex items-start gap-3 mb-4">
                {selectedJob.company_logo ? (
                  <img
                    src={selectedJob.company_logo}
                    alt={selectedJob.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedJob.company)} flex items-center justify-center text-white font-semibold`}
                  >
                    {state?.jobDetail?.company?.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-gray-900">
                    {state?.jobDetail?.company}
                  </h4>
                  <p className="text-sm text-gray-500">Technology Company</p>
                </div>
              </div>
              <p className="leading-relaxed">
                {state?.jobDetail?.company_detail}
              </p>
            </div>
          </div>
        ) : isDesktopScreen && selectedJob && showJobDetail ? (
          <div className="flex gap-6 ">
            {/* Left Sidebar - Jobs List */}
            <div className="w-80 flex-shrink-0">
              <div className="mb-4 flex flex-col lg:flex-row items-center w-full bg-clr2  rounded-sm  overflow-hidden p-1">
                <div className="flex-grow flex items-center px-6 py-4 lg:py-0 w-full lg:w-auto">
                  <Search color="#F2B31D" size={22} />
                  <input
                    type="text"
                    placeholder="Search by: Job tittle, Position, Keyword..."
                    className="w-full pl-4 py-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                    value={state.search}
                    onChange={(e) => setState({ search: e.target.value })}
                  />
                </div>

                {/* <div className="hidden lg:block w-px h-10 bg-slate-100"></div> */}
              </div>
              <div className="sticky top-16 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2">
                {state.jobList?.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`cursor-pointer p-4 rounded-lg  transition-all hover:shadow-lg ${
                      selectedJob?.id === job.id
                        ? "border border-amber-400 bg-clr1 shadow-md"
                        : "hover:border hover:border-gray-300 bg-clr2"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        {job?.company_logo ? (
                          <img
                            src={job?.company_logo}
                            alt="company image"
                            className="w-10 h-10  object-cover"
                          />
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-lg ${getAvatarColor(job.company)} flex items-center justify-center text-white font-semibold flex-shrink-0`}
                          >
                            {job.company?.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 leading-tight mb-1">
                            {job.job_title}
                          </h3>
                          <p className="text-gray-600 text-sm font-medium">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Bookmark className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" /> */}
                        <Share2 className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Experience and Salary */}
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>{job.experiences}</span>
                      </div>
                      <div className="w-px h-3 bg-gray-300"></div>
                      <div className="flex items-center gap-1">
                        {job.salary_range_obj?.name?.includes("$") ? (
                          <DollarSign className="w-3 h-3" />
                        ) : (
                          <IndianRupee className="w-3 h-3" />
                        )}
                        <span className="font-semibold text-gray-900">
                          {job?.salary_range_obj?.name}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {job.locations?.map((item) => item.city).join(", ")}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {job?.job_type_obj?.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
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
                ))}
              </div>
            </div>

            <div className="flex-1 ">
              <div className="flex gap-6 flex-col xl:flex-row">
                {/* Main Content */}
                <div className="flex-1 space-y-1  bg-clr2 rounded-lg p-6">
                  {/* Job Header Card */}
                  <div className=" border-b  px-2 py-2 pb-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-4">
                        {state?.jobDetail?.company_logo ? (
                          <img
                            src={state?.jobDetail?.company_logo}
                            alt={state?.jobDetail?.company}
                            className="w-14 h-14  object-cover"
                          />
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-lg ${getAvatarColor(state?.jobDetail?.company)} flex items-center justify-center text-white font-semibold text-lg`}
                          >
                            {state?.jobDetail?.company
                              ?.slice(0, 1)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1">
                          <h1 className="text-xl font-semibold text-gray-900 mb-1">
                            {state?.jobDetail?.job_title}
                          </h1>
                          <p className="text-md text-gray-700 mb-2">
                            {state?.jobDetail?.company}
                          </p>
                        </div>
                      </div>
                      <button
                        className="p-1"
                        onClick={() => setSelectedJob(null)}
                      >
                        <X size={25} className=" hover:text-gray-600" />
                      </button>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-3">
                        {capitalizeFLetter(
                          state?.jobDetail?.locations
                            ?.map((item) => item.city)
                            .join(", "),
                        )}{" "}
                        • Posted {state?.jobDetail?.postedDate || "2 days ago"}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {state?.jobDetail?.experiences}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {state?.jobDetail?.job_type_obj?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          {selectedJob.salary_range?.includes("$") ? (
                            <DollarSign className="w-4 h-4" />
                          ) : (
                            <IndianRupee className="w-4 h-4" />
                          )}
                          {state?.jobDetail?.salary_range_obj?.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setState({ jobID: state?.jobDetail?.id });
                          handleApply();
                        }}
                        className="hover-bg-[#F2B31D]  text-md border border-xl border-[#F2B31D] rounded rounded-3xl  px-6 py-1  hover:bg-[#E5A519] transition-colors text-black hover:text-white"
                      >
                        Apply Now
                      </button>

                      <div className="flex items-center gap-2">
                        {/* <Bookmark className="w-5 h-5  hover:text-gray-600 cursor-pointer" /> */}
                        <Share2 className="w-5 h-5  hover:text-gray-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="border-b  px-2 py-2 pb-5">
                    <h2 className="text-lg font-semibold text-black mb-4">
                      About the job
                    </h2>
                    <div className="leading-relaxed space-y-4">
                      <p>
                        {state?.jobDetail?.job_description}
                        {/* We are looking for a talented professional to join our
                        dynamic team. This role offers an excellent opportunity
                        to work with cutting-edge technologies and contribute to
                        meaningful projects that impact thousands of users. */}
                      </p>
                      {/* <p>
                        The ideal candidate will have strong technical skills,
                        excellent communication abilities, and a passion for
                        innovation. You'll be working in a collaborative
                        environment where your ideas and contributions are
                        valued.
                      </p> */}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="border-b  px-2 py-2 pb-5">
                    <h2 className="text-lg font-semibold text-black mb-4">
                      Key responsibilities
                    </h2>
                    <ul className="space-y-3">
                      {state?.responsibilities?.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />

                          <span className="">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  {state?.jobDetail?.requirements && <div className="border-b  px-2 py-2 pb-5">
                    <h2 className="text-lg font-semibold text-black mb-4">
                      Requirements
                    </h2>
                    <ul className="space-y-3">
                      {state?.jobDetail?.requirements?.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />
                          <span className="">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>}

                  {/* Skills */}
                  {state?.jobDetail?.skills && (
                    <div className="  px-2 py-2 pb-5">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {state?.jobDetail?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-clr1 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {skill?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Sidebar */}
                <div className="w-full xl:w-80 flex-shrink-0">
                  <div className="sticky top-20 space-y-4">
                    {/* Job Details */}
                    <div className="bg-clr2 rounded-lg   p-6">
                      <h3 className="text-lg font-semibold text-black mb-4">
                        Job details
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-md font-medium  pb-1">Job type</p>
                          <p className="text-md text-black">
                            {state?.jobDetail?.job_type_obj?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-medium  pb-1">
                            Experience level
                          </p>
                          <p className="text-md text-black">
                            {state?.jobDetail?.experiences}
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-medium  pb-1">Salary</p>
                          <p className="text-md text-black">
                            {state?.jobDetail?.salary_range_obj?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-medium  pb-1">Location</p>
                          <p className="text-md text-black">
                            {state?.jobDetail?.locations
                              ?.map((item) => item.city)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="bg-clr2 rounded-lg  p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        About {state?.jobDetail?.company}
                      </h3>
                      <div className="flex items-start gap-3 mb-4">
                        {selectedJob.company_logo ? (
                          <img
                            src={selectedJob.company_logo}
                            alt={selectedJob.company}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div
                            className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedJob.company)} flex items-center justify-center text-white font-semibold`}
                          >
                            {state?.jobDetail?.company
                              ?.slice(0, 1)
                              .toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {state?.jobDetail?.company}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Technology Company
                          </p>
                        </div>
                      </div>
                      <p className="leading-relaxed">
                        {state?.jobDetail?.company_detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col lg:flex-row gap-8">
            <div
              className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Mobile STICKY SIDEBAR */}
            <div
              className={`fixed lg:hidden z-50 left-0 top-0 h-full w-80 bg-clr1 transition-transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Filterbar
                filters={filters}
                onFilterChange={setFilters}
                categoryList={state?.categoryList}
                locationList={state?.locationList}
                jobTypeList={state?.jobTypeList}
                experienceList={state?.experienceList}
                datePostedList={state?.datePostedList}
                salaryRangeList={state?.salaryRangeList}
                tagsList={state?.tagsList}
              />
            </div>

            {/* DESKTOP STICKY SIDEBAR */}
            <div className="hidden lg:block shrink-0  bg-clr2 rounded-xl self-start">
              <div className="h-fit w-72 ">
                <Filterbar
                  filters={filters}
                  onFilterChange={setFilters}
                  categoryList={state?.categoryList}
                  locationList={state?.locationList}
                  jobTypeList={state?.jobTypeList}
                  experienceList={state?.experienceList}
                  datePostedList={state?.datePostedList}
                  salaryRangeList={state?.salaryRangeList}
                  tagsList={state?.tagsList}
                />
              </div>
            </div>

            <div className="flex-grow">
              {/* content input header start */}
              <div className="z-30 bg-white lg:pb-5 self-start">
                <div className="flex flex-col md:flex-row items-center w-full bg-clr2  rounded-xl  p-1">
                  <div className="flex-grow flex items-center px-6 py-4 lg:py-0 w-full lg:w-auto">
                    <Search color="#F2B31D" size={22} />
                    <input
                      type="text"
                      placeholder="Search by: Job tittle, Position, Keyword..."
                      className="w-full pl-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                      value={state.search}
                      onChange={(e) => setState({ search: e.target.value })}
                    />
                  </div>

                  <div className="hidden lg:block w-px h-10 bg-slate-100"></div>

                  <div className="flex items-center w-full lg:w-auto p-2 lg:p-1 gap-2 border-t lg:border-t-0 border-slate-100">
                    <div className="flex items-center px-4 flex-grow lg:w-64">
                      <MapPin color="#F2B31D" size={22} />

                      <CustomSelect
                        options={state.locationList}
                        value={filters?.location || ""}
                        onChange={(selected) =>
                          setFilters({
                            ...filters,
                            location: selected ? selected.value : "",
                          })
                        }
                        placeholder="Location"
                      />
                      {/* <input
                        type="text"
                        placeholder="City, state or zip code"
                        className="w-full pl-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                        value={filters.location}
                        onChange={(e) =>
                          setFilters({ ...filters, location: e.target.value })
                        }
                      /> */}
                      <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors"></button>
                    </div>

                    {/* <button
                      className="hover-bg-[#F2B31D]  text-md border border-xl border-[#F2B31D] rounded rounded-3xl  px-6 py-1  hover:bg-[#E5A519] transition-colors text-black hover:text-white"
                      onClick={() => jobList(state?.page)}
                    >
                      Find Job
                    </button> */}
                  </div>
                </div>

                <div className="py-4 lg:hidden flex items-center justify-between">
                  <div className="hidden md:block lg:hidden flex-1">
                    <ChipFilters
                      filters={filters}
                      onFilterChange={setFilters}
                      categoryList={state?.categoryList}
                      jobTypeList={state?.jobTypeList}
                      experienceList={state?.experienceList}
                      datePostedList={state?.datePostedList}
                      salaryRangeList={state?.salaryRangeList}
                      tagsList={state?.tagsList}
                    />
                  </div>

                  <div className="md:hidden">
                    <Sheet
                      open={isMobileFilterOpen}
                      onOpenChange={setIsMobileFilterOpen}
                    >
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-auto">
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="bottom"
                        className="h-[80vh] overflow-y-scroll scrollbar-hide rounded-t-3xl [&>button]:hidden"
                      >
                        <div className="flex items-center justify-between px-4 pb-3 border-b">
                          <SheetTitle className="text-lg font-semibold">
                            Filter Jobs
                          </SheetTitle>
                          <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="p-1 hover:bg-clr2 rounded-full"
                          >
                            <X size={20} className="text-gray-500" />
                          </button>
                        </div>
                        <div className="px-4 overflow-y-scroll scrollbar-hide max-h-[calc(80vh-100px)]">
                          <Filterbar
                            filters={filters}
                            onFilterChange={setFilters}
                            categoryList={state?.categoryList}
                            locationList={state?.locationList}
                            jobTypeList={state?.jobTypeList}
                            experienceList={state?.experienceList}
                            datePostedList={state?.datePostedList}
                            salaryRangeList={state?.salaryRangeList}
                            tagsList={state?.tagsList}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
              {/* content input header end */}

              {/* content body job list */}

              {state.jobList?.length > 0 ? (
                <>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2  "
                    style={{
                      gap: "20px",
                    }}
                  >
                    {/* {filteredJobs.map((job) => ( */}
                    {state.jobList?.map((job: any) => (
                      <div
                        key={job.id}
                        onClick={() => {
                          if (isTabScreen) {
                            setIsAnimating(false);
                            setTimeout(() => {
                              setSelectedJob(job);
                              setState({ jobID: job.id });
                              setIsAnimating(true);
                              jobDetail(job.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }, 100);
                          } else {
                            setSelectedJob(job);
                            setState({ jobID: job.id });
                            jobDetail(job.id);
                            if (isDesktopScreen) setShowJobDetail(true);
                          }
                        }}
                        className="cursor-pointer transition-transform hover:scale-10"
                      >
                        <JobCard job={job} />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center mt-10">
                    <PaginationCom
                      page={state.page}
                      next={state.next}
                      prev={state.prev}
                      onNext={handleNext}
                      onPrev={handlePrev}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-clr1 rounded-2xl border border-slate-100">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    No jobs found
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Try adjusting your filters to find more results.
                  </p>
                  <button
                    // onClick={() =>
                    //   setFilters({
                    //     searchQuery: "",
                    //     location: "",
                    //     categories: [],
                    //     jobTypes: [],
                    //     experienceLevels: [],
                    //     datePosted: "All",
                    //     salaryRange: [0, 9999],
                    //     tags: [],
                    //     experience: "",
                    //   })
                    // }
                    className="mt-6 text-amber-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Job Detail Sheet */}
        {isMobileScreen && (
          <Sheet open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
            <SheetContent
              side="bottom"
              className="h-[90vh] rounded-t-3xl flex flex-col"
            >
              {selectedJob && (
                <>
                  <div className="flex-1 overflow-y-auto space-y-6 pb-20">
                    <SheetHeader>
                      <div className="flex items-start gap-4">
                        {state.jobDetail?.company_logo ? (
                          <img
                            src={state.jobDetail.company_logo}
                            alt={state.jobDetail.company}
                            className="w-10 h-10 rounded-lg"
                          />
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-lg ${getAvatarColor(state.jobDetail?.company)} flex items-center justify-center text-white font-semibold text-sm`}
                          >
                            {state.jobDetail?.company
                              ?.slice(0, 1)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 text-left">
                          <SheetTitle className="text-xl font-bold text-gray-900 text-left">
                            {state.jobDetail?.job_title}
                          </SheetTitle>
                          <p className="text-gray-600 text-left">
                            {state.jobDetail?.company}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {moment(state.jobDetail?.created_at).isValid()
                                ? moment(state.jobDetail?.created_at).fromNow()
                                : "Just now"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SheetHeader>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1 bg-clr2 px-2 py-1 rounded text-xs">
                        <Briefcase className="w-3 h-3" />
                        <span>{state.jobDetail?.experiences} </span>
                      </div>
                      <div className="flex items-center gap-1 bg-clr2 px-2 py-1 rounded text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{state.jobDetail?.job_type_obj?.name}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-clr2 px-2 py-1 rounded text-xs">
                        <DollarSign className="w-3 h-3" />
                        <span>{state.jobDetail?.salary_range_obj?.name}</span>
                      </div>
                      {/* <div className="flex items-center gap-1 bg-clr2 px-2 py-1 rounded text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {state.jobDetail?.locations
                            ?.map((item) => item.city)
                            .join(", ")}
                        </span>
                      </div> */}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Job Description
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {state.jobDetail?.job_description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Key Responsibilities
                      </h3>
                      <div className="space-y-2">
                        {state.responsibilities?.map(
                          (responsibility, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-600 text-sm">
                                {responsibility}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {state?.jobDetail?.requirements && <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Requirements
                      </h3>
                      <div className="space-y-2">
                        {state?.jobDetail?.requirements?.map((requirements, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 text-sm">
                              {requirements}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>}

                    {state?.jobDetail?.skills && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {state?.jobDetail?.skills?.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-clr2 text-gray-700 rounded-full text-sm font-medium"
                            >
                              {skill?.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Job details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Job type
                          </p>
                          <p className="text-sm text-gray-900">
                            {state.jobDetail?.job_type_obj?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Experience level
                          </p>
                          <p className="text-sm text-gray-900">
                            {state.jobDetail?.experiences}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Salary
                          </p>
                          <p className="text-sm text-gray-900">
                            {state.jobDetail?.salary_range_obj?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Location
                          </p>
                          <p className="text-sm text-gray-900">
                            {state.jobDetail?.locations
                              ?.map((item) => item.city)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        About {state.jobDetail?.company}
                      </h3>
                      <div className="flex items-start gap-3 mb-4">
                        {state.jobDetail?.company_logo ? (
                          <img
                            src={state.jobDetail?.company_logo}
                            alt={state.jobDetail?.company}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div
                            className={`w-12 h-12 rounded-lg ${getAvatarColor(state.jobDetail?.company)} flex items-center justify-center text-white font-semibold`}
                          >
                            {state.jobDetail?.company
                              ?.slice(0, 1)
                              .toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {state.jobDetail?.company}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Technology Company
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {state.jobDetail?.company_detail}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-clr1 border-t">
                    <button
                      onClick={() => {
                        setState({ jobID: state.jobDetail?.id });
                        handleFormSubmit();
                      }}
                      className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg"
                    >
                      Apply Job
                    </button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        )}

        <Modal
          isOpen={showApplicationModal}
          setIsOpen={() => {
            setState({ errors: {} });
            setShowApplicationModal(false);
          }}
          title={selectedJob?.job_title}
          width="700px"
          renderComponent={() => (
            <div className="space-y-6 bg-[#FFFCF3] overflow-y-auto py-2 px-2 max-h-[85vh]">
              <div className="flex items-center justify-center w-full mb-6">
                <img
                  src="/assets/images/Illustration.png"
                  height={200}
                  width={200}
                  alt="Job Application"
                  className="object-contain"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <Input
                  placeholder="First Name*"
                  value={state.firstName}
                  bg="ffffff"
                  onChange={(e) =>
                    handleFormChange("firstName", e.target.value)
                  }
                  required
                  error={state.errors?.firstName}
                />
                <Input
                  placeholder="Last Name*"
                  value={state.lastName}
                  onChange={(e) => handleFormChange("lastName", e.target.value)}
                  required
                  bg="ffffff"
                  error={state.errors?.lastName}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  placeholder="Email*"
                  value={state.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                  bg="ffffff"
                  error={state.errors?.email}
                />
                {/* <Input
                  type="tel"
                  placeholder="Phone Number*"
                  value={state.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  required
                  bg="ffffff"

                /> */}

                <CustomPhoneInput
                  // title="Phone Number"
                  value={state.phone}
                  onChange={(value) => handleFormChange("phone", value)}
                  error={state.errors?.phone}
                  required
                />
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <Select
                    value={state.experience}
                    onValueChange={(value) =>
                      handleFormChange("experience", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-clr1 ${
                        state.errors?.experience ? "border-red-500" : ""
                      } `}
                    >
                      <SelectValue placeholder="Experience*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1 Years">0-1 Years</SelectItem>
                      <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                      <SelectItem value="5-10 Years">5-10 Years</SelectItem>
                      <SelectItem value="10+ Years">10+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {state.errors?.experience && (
                  <p className="mt-2 text-sm text-red-600">
                    {state.errors?.experience}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextArea
                  placeholder="Your message..."
                  value={state.message}
                  onChange={(e) => handleFormChange("message", e.target.value)}
                  className="min-h-[150px]"
                />

                {/* <TextArea
                  type="email"
                  placeholder="Email*"
                  value={state.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                  bg="ffffff"
                /> */}

                <FileUpload
                  value={state.resume || null}
                  onChange={(file) => handleFormChange("resume", file)}
                  error={state.errors?.resume}
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="button"
                  onClick={handleFormSubmit}
                  className="px-12 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        />

        <Modal
          isOpen={state.congratsOpen}
          // isOpen={showApplicationModal}

          setIsOpen={() => {
            setState({ errors: {}, congratsOpen: false });
          }}
          title="Job Application Success"
          width="750px"
          hideHeader={true}
          renderComponent={() => (
            <div className="relative min-h-[500px] bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex flex-col items-center justify-center text-center p-12 overflow-hidden">
              {/* Large background circles */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-30"></div>
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-amber-200 to-orange-200 rounded-full opacity-25"></div>

              {/* Small decorative circles */}
              <div className="absolute top-12 left-16 w-6 h-6 bg-amber-400 rounded-full opacity-80"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-amber-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-24 left-24 w-12 h-12 bg-yellow-200 rounded-full opacity-70"></div>

              {/* Success star badge */}
              <div className="relative mb-8 z-10">
                <div className="w-40 h-40 relative">
                  {/* Vector star background */}
                  <img
                    src="/assets/images/Vector.png"
                    alt="Success Star"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white z-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6 z-10">
                Congrats, your job applied!
              </h2>
              <p className="text-gray-600 mb-12 max-w-lg text-lg leading-relaxed z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur dignissim rutrum dui quis malesuada.
              </p>
              {/* <button
                onClick={() => setState({ congratsOpen: false })}
                className="w-full max-w-md py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full text-lg transition-colors z-10 shadow-lg"
              >
                Let's Discover
              </button> */}
            </div>
          )}
        />
      </main>
    </div>
  );
}