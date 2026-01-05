"use client";

import Filterbar from "@/components/component/filterbar.component";
import ChipFilters from "@/components/component/chipFilters.component";
import JobCard from "@/components/component/jobCard.component";
import { MOCK_JOBS } from "@/utils/constant.utils";
import { generateMockJobs, useSetState } from "@/utils/function.utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobsPage() {
  const [state, setState] = useSetState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
    congratsOpen:false
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  console.log("✌️isMobileScreen --->", isMobileScreen);
  const [isTabScreen, setIsTabScreen] = useState(false);
  console.log("✌️isTabScreen --->", isTabScreen);
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);
  console.log("✌️isDesktopScreen --->", isDesktopScreen);

  useEffect(() => {
    if (selectedJob && isTabScreen) {
      setTimeout(() => setIsAnimating(true), 100);
    }
  }, [selectedJob, isTabScreen]);

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

  const [filters, setFilters] = useState({
    searchQuery: "",
    location: "",
    categories: [],
    jobTypes: [],
    experienceLevels: [],
    datePosted: "All",
    salaryRange: [0, 9999],
    tags: [],
    experience: "",
  });

  const filteredJobs = useMemo(() => {
    return generateMockJobs(MOCK_JOBS, 51).filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchLocation =
        !filters.location || job.location === filters.location;
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(job.category);
      const matchType =
        filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);
      const matchExperience =
        filters.experienceLevels.length === 0 ||
        filters.experienceLevels.includes(job.experience);
      const matchTags =
        filters.tags.length === 0 ||
        job.tags.some((tag) => filters.tags.includes(tag));

      const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ""));
      const matchSalary = jobSalary <= filters.salaryRange[1];

      return (
        matchSearch &&
        matchLocation &&
        matchCategory &&
        matchType &&
        matchExperience &&
        matchTags &&
        matchSalary
      );
    });
  }, [filters]);

  const handleFormChange = (field, value) => {
    setState({
      [field]: value,
      errors: {
        ...state.errors,
        [field]: "",
      },
    });
  };

  const handleFormSubmit = async () => {
    try {
      // await jobApplicationSchema.validate(state, { abortEarly: false });
      console.log("Form submitted:", state);
      setShowApplicationModal(false);
      setState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        experience: "",
        resume: null,
        congratsOpen: true,
      });
    } catch (error) {
      const validationErrors = {};
      error.inner?.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setState({ errors: validationErrors });
    }
  };

  return (
    <div className=" bg-white">
      <div className="bg-black py-12 px-4 ">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white ">Jobs</h1>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
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
            <div className="bg-white rounded-lg px-6 py-1 sticky top-16 ">
              <div className="flex items-start justify-between mb-6">
                <div className="bg-[#FBE6DB] text-[#F34F0E] px-3 py-1 rounded-full text-xs font-medium">
                  {selectedJob.postedDate}
                </div>
                {/* <button className="p-1" onClick={() => setSelectedJob(null)}>
                  <X size={25} className=" hover:text-gray-600" />
                </button> */}
              </div>
              <div className="flex items-start gap-4 mb-6 ">
                <img
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  {/* <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {selectedJob.postedDate}
                    </span>
                  </div> */}
                  <div className="flex items-center gap-2 ">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {selectedJob.title}
                    </h1>
                    <Star className="w-6 h-6 text-gray-300 hover:text-amber-400 cursor-pointer mt-1" />
                  </div>
                  <p className="text-lg text-gray-600 mb-2">
                    {selectedJob.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-[#F2B31D]" />
                      <span>{selectedJob.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#F2B31D]" />
                      <span>{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-[#F2B31D]" />
                      <span>
                        {selectedJob.salary}-
                        {parseInt(selectedJob.salary.replace("$", "")) + 6000}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#F2B31D]" />
                      <span>{selectedJob.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4 ">
                  <div className="flex items-center gap-3 bg-[#F2B31D1A] rounded p-1 rounded-2xl">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Facebook size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Twitter size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Linkedin size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="justify-end flex w-full">
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="px-20 py-3 bg-[#F2B31D] hover:bg-amber-500 text-black font-bold rounded rounded-3xl "
                >
                  Apply Job
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg px-6 ">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique.
                Sit congue non vitae odio sit erat in. Felis eu ultrices e sed
                massa. Commodo fringilla sed tempor risus laoreet ultrices
                ipsum. Habitasse morbi faucibus in iaculis lectus. Nisl enim
                feugiat enim volutpat. Sem quis viverra viverra odio mauris
                nunc.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus
                nisl vitae vitae cras ornare. Cras facilisis dignissim augue
                lorem amet adipiscing cursus fames mauris. Tortor amet porta
                proin in. Orci imperdiet nisl dignissim pellentesque morbi
                vitae. Quisque tincidunt metus lectus porta eget blandit euismod
                sem nunc.
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-lg px-6 ">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Key Responsibilities
              </h2>
              <div className="space-y-3">
                {[
                  "Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisl vitae vitae cras ornare. Cras facilisis dig...",
                  "Cras facilisis dignissim augue lorem amet adipiscing cursus fames mauris. Tortor amet porta proin in",
                  "Ornare varius faucibus nisl vitae vitae cras ornare. Cras facilisis dignissim augue lorem amet adipiscing cur...",
                  "Tortor amet porta proin in. Orci imperdiet nisl dignissim pellentesque morbi vitae. Quisque tincidunt metu...",
                  "Tortor amet porta proin in. Orci imperdiet nisl dignissim pellentesque morbi vitae. Quisque tincidunt metu...",
                ].map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />

                    <p className="text-gray-600">{responsibility}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg px-6  ">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Professional Skills
              </h2>
              <div className="space-y-3">
                {[
                  "Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisi vitae vitae cras ornare.",
                  "Ornare varius faucibus nisi vitae vitae cras ornare",
                  "Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae",
                  "Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae",
                  "Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae",
                ].map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />
                    <p className="text-gray-600">{responsibility}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg px-6 ">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tags:</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Full time",
                  "Commerce",
                  "New - York",
                  "Corporate",
                  "Location",
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#F2B31D1A] text-[#F2B31D] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Job Overview */}
            <div className="bg-[#F9F9F8] rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Job Title</p>
                    <p className="text-sm text-gray-600">
                      Corporate Solutions Executive
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Job Type</p>
                    <p className="text-sm text-gray-600">{selectedJob.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    {/* <div className="w-4 h-4 bg-amber-600 rounded"></div> */}
                    <BriefcaseBusinessIcon className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Category</p>
                    <p className="text-sm text-gray-600">
                      {selectedJob.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Experience</p>
                    <p className="text-sm text-gray-600">5 Years</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Degree</p>
                    <p className="text-sm text-gray-600">Master</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Offered Salary</p>
                    <p className="text-sm text-gray-600">
                      {selectedJob.salary}-
                      {selectedJob.salary.replace(
                        "$",
                        "$" +
                          (parseInt(selectedJob.salary.replace("$", "")) + 6000)
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#F2B31D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">
                      {selectedJob.location}, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isDesktopScreen && selectedJob && showJobDetail ? (
          <div className="flex gap-6">
            {/* Left Sidebar - Jobs List */}
            <div className="w-80 flex-shrink-0">
              <div className="mb-4 flex flex-col lg:flex-row items-center w-full bg-white  rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-1">
                <div className="flex-grow flex items-center px-6 py-4 lg:py-0 w-full lg:w-auto">
                  <Search color="#F2B31D" size={22} />
                  <input
                    type="text"
                    placeholder="Search by: Job tittle, Position, Keyword..."
                    className="w-full pl-4 py-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters({ ...filters, searchQuery: e.target.value })
                    }
                  />
                </div>

                {/* <div className="hidden lg:block w-px h-10 bg-slate-100"></div> */}
              </div>
              <div className="sticky top-16 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`cursor-pointer p-4 bg-white rounded-2xl border transition-all hover:shadow-md ${
                      selectedJob?.id === job.id
                        ? "border-amber-400 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-[#FBE6DB] text-[#F34F0E] px-3 py-1 rounded-full text-xs font-medium">
                        {job.postedDate}
                      </div>
                      <Star className="w-5 h-5 text-gray-300 hover:text-amber-400 cursor-pointer" />
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-amber-500" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-amber-500" />
                        <span>
                          {job.salary}-
                          {parseInt(job.salary.replace("$", "")) + 6000}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span>{job.location}, USA</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className=" p-4 gap-6">
              <div className="space-y-6 sticky top-16">
                {/* Job Header */}
                <div className="bg-white rounded-lg  ">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-[#FBE6DB] text-[#F34F0E] px-3 py-1 rounded-full text-xs font-medium">
                      {selectedJob.postedDate}
                    </div>
                    <button
                      className="p-1"
                      onClick={() => setSelectedJob(null)}
                    >
                      <X size={25} className=" hover:text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-start gap-4 mb-6 pb-4">
                    <img
                      src={selectedJob.logo}
                      alt={selectedJob.company}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {selectedJob.title}
                        </h1>
                        <Star className="w-6 h-6 text-gray-300 hover:text-amber-400 cursor-pointer" />
                      </div>
                      <p className="text-lg text-gray-600 mb-4">
                        {selectedJob.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-[#F2B31D]" />
                          <span>{selectedJob.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#F2B31D]" />
                          <span>{selectedJob.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-[#F2B31D]" />
                          <span>
                            {selectedJob.salary}-
                            {parseInt(selectedJob.salary.replace("$", "")) +
                              6000}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#F2B31D]" />
                          <span>{selectedJob.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4 ">
                      <div className="flex items-center gap-3 bg-[#F2B31D1A] rounded p-1 rounded-2xl">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Facebook size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Twitter size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Linkedin size={20} />
                        </button>
                      </div>
                      <button
                        onClick={() => setShowApplicationModal(true)}
                        className="px-28 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded rounded-3xl"
                      >
                        Apply Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 pt-5 ">
                {/* Center - Job Details */}
                <div className=" flex ">
                  <div className="space-y-6">
                    {/* Job Header */}

                    {/* Job Description */}
                    <div className="bg-white rounded-lg px-4 py-2 ">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Job Description
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Nunc sed a nisl purus. Nibh dis faucibus proin lacus
                        tristique. Sit congue non vitae odio sit erat in. Felis
                        eu ultrices e sed massa. Commodo fringilla sed tempor
                        risus laoreet ultrices ipsum. Habitasse morbi faucibus
                        in iaculis lectus. Nisl enim feugiat enim volutpat. Sem
                        quis viverra viverra odio mauris nunc.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Et nunc ut tempus duis nisl sed massa. Ornare varius
                        faucibus nisl vitae vitae cras ornare. Cras facilisis
                        dignissim augue lorem amet adipiscing cursus fames
                        mauris. Tortor amet porta proin in. Orci imperdiet nisl
                        dignissim pellentesque morbi vitae. Quisque tincidunt
                        metus lectus porta eget blandit euismod sem nunc.
                      </p>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="bg-white rounded-lg px-4  ">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Key Responsibilities
                      </h2>
                      <div className="space-y-3">
                        {[
                          "Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisl vitae vitae cras ornare. Cras facilisis dig...",
                          "Cras facilisis dignissim augue lorem amet adipiscing cursus fames mauris. Tortor amet porta proin in",
                          "Ornare varius faucibus nisl vitae vitae cras ornare. Cras facilisis dignissim augue lorem amet adipiscing cur...",
                          "Tortor amet porta proin in. Orci imperdiet nisl dignissim pellentesque morbi vitae. Quisque tincidunt metu...",
                          "Tortor amet porta proin in. Orci imperdiet nisl dignissim pellentesque morbi vitae. Quisque tincidunt metu...",
                        ].map((responsibility, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />
                            <p className="text-gray-600">{responsibility}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg px-4  ">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Professional Skills
                      </h2>
                      <div className="space-y-3">
                        {[
                          "Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisi vitae vitae cras ornare.",
                          "Ornare varius faucibus nisi vitae vitae cras ornare",
                          "Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae",
                          "Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae",
                          "Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae",
                        ].map((responsibility, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />
                            <p className="text-gray-600">{responsibility}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg px-4 ">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Tags:
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Full time",
                          "Commerce",
                          "New - York",
                          "Corporate",
                          "Location",
                        ].map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#F2B31D1A] text-[#F2B31D] rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar - Job Overview */}
                <div className="w-80  flex-shrink-0 bg-[#F9F9F8] rounded-xl ">
                  <div className="space-y-6">
                    <div className="  p-6 ">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">
                          Job Overview
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Job Title
                            </p>
                            <p className="text-sm text-gray-600">
                              Corporate Solutions Executive
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Job Type
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedJob.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <BriefcaseBusinessIcon className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Category
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedJob.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <Star className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Experience
                            </p>
                            <p className="text-sm text-gray-600">5 Years</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Degree</p>
                            <p className="text-sm text-gray-600">Master</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Offered Salary
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedJob.salary}-
                              {selectedJob.salary.replace(
                                "$",
                                "$" +
                                  (parseInt(
                                    selectedJob.salary.replace("$", "")
                                  ) +
                                    6000)
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-[#F2B31D]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Location
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedJob.location}, USA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div
              className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            />

            <div
              className={`fixed lg:sticky lg:top-16 z-50 lg:z-0 left-0 top-0 h-full lg:h-auto w-80 lg:w-auto transition-transform lg:translate-x-0 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Filterbar filters={filters} onFilterChange={setFilters} />
            </div>

            <div className="flex-grow">
              <div className="sticky top-16 z-10 bg-white lg:pb-5">
                <div className="flex flex-col lg:flex-row items-center w-full bg-white border border-slate-100 rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-1">
                  <div className="flex-grow flex items-center px-6 py-4 lg:py-0 w-full lg:w-auto">
                    <Search color="#F2B31D" size={22} />
                    <input
                      type="text"
                      placeholder="Search by: Job tittle, Position, Keyword..."
                      className="w-full pl-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                      value={filters.searchQuery}
                      onChange={(e) =>
                        setFilters({ ...filters, searchQuery: e.target.value })
                      }
                    />
                  </div>

                  <div className="hidden lg:block w-px h-10 bg-slate-100"></div>

                  <div className="flex items-center w-full lg:w-auto p-2 lg:p-1 gap-2 border-t lg:border-t-0 border-slate-100">
                    <div className="flex items-center px-4 flex-grow lg:w-64">
                      <MapPin color="#F2B31D" size={22} />

                      <input
                        type="text"
                        placeholder="City, state or zip code"
                        className="w-full pl-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                        value={filters.location}
                        onChange={(e) =>
                          setFilters({ ...filters, location: e.target.value })
                        }
                      />
                      <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors"></button>
                    </div>

                    <button className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl text-sm shadow-sm transition-all active:scale-95 whitespace-nowrap">
                      Find Job
                    </button>
                  </div>
                </div>

                <div className="py-4 lg:hidden flex items-center justify-between">
                  <div className="hidden md:block lg:hidden flex-1">
                    <ChipFilters
                      filters={filters}
                      onFilterChange={setFilters}
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
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <X size={20} className="text-gray-500" />
                          </button>
                        </div>
                        <div className="px-4 overflow-y-scroll scrollbar-hide max-h-[calc(80vh-100px)]">
                          <Filterbar
                            filters={filters}
                            onFilterChange={setFilters}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>

              {filteredJobs.length > 0 ? (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  style={{
                    gap: "20px",
                  }}
                >
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        if (isTabScreen) {
                          setIsAnimating(false);
                          setTimeout(() => {
                            setSelectedJob(job);
                            setIsAnimating(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }, 100);
                        } else {
                          setSelectedJob(job);
                          if (isDesktopScreen) setShowJobDetail(true);
                        }
                      }}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
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
                    onClick={() =>
                      setFilters({
                        searchQuery: "",
                        location: "",
                        categories: [],
                        jobTypes: [],
                        experienceLevels: [],
                        datePosted: "All",
                        salaryRange: [0, 9999],
                        tags: [],
                        experience: "",
                      })
                    }
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
                      <div className="flex items-start gap-4 ">
                        <img
                          src={selectedJob.logo}
                          alt={selectedJob.company}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div className="flex-1 text-left">
                          <SheetTitle className="text-xl font-bold text-gray-900 text-left">
                            {selectedJob.title}
                          </SheetTitle>
                          <p className="text-gray-600 text-left">
                            {selectedJob.company}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {selectedJob.postedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SheetHeader>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        <Briefcase className="w-3 h-3" />
                        <span>{selectedJob.experience}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        <DollarSign className="w-3 h-3" />
                        <span>{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{selectedJob.location}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Job Description
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Nunc sed a nisl purus. Nibh dis faucibus proin lacus
                        tristique. Sit congue non vitae odio sit erat in. Felis
                        eu ultrices e sed massa. Commodo fringilla sed tempor
                        risus laoreet ultrices ipsum.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Key Responsibilities
                      </h3>
                      <div className="space-y-2">
                        {[
                          "Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisl vitae vitae cras ornare.",
                          "Cras facilisis dignissim augue lorem amet adipiscing cursus fames mauris.",
                          "Ornare varius faucibus nisl vitae vitae cras ornare. Cras facilisis dignissim augue.",
                        ].map((responsibility, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 text-sm">
                              {responsibility}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Job Overview
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-[#F2B31D]" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Job Title
                            </p>
                            <p className="text-xs text-gray-600">
                              Corporate Solutions Executive
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#F2B31D]" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Job Type
                            </p>
                            <p className="text-xs text-gray-600">
                              {selectedJob.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-amber-600 rounded"></div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Category
                            </p>
                            <p className="text-xs text-gray-600">
                              {selectedJob.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-[#F2B31D]" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Experience
                            </p>
                            <p className="text-xs text-gray-600">5 Years</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-[#F2B31D]" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Degree
                            </p>
                            <p className="text-xs text-gray-600">Master</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-[#F2B31D]" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              Salary
                            </p>
                            <p className="text-xs text-gray-600">
                              {selectedJob.salary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                    <button
                      onClick={() => setShowApplicationModal(true)}
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
          title={selectedJob?.title}
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
                      className={`bg-white ${
                        state.errors?.experience ? "border-red-500" : ""
                      } `}
                    >
                      <SelectValue placeholder="Experience*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1 Years">0-1 Years</SelectItem>
                      <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                      <SelectItem value="3-5 Years">3-5 Years</SelectItem>
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
                    <svg className="w-16 h-16 text-white z-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6 z-10">
                Congrats, your job applied!
              </h2>
              <p className="text-gray-600 mb-12 max-w-lg text-lg leading-relaxed z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim rutrum dui quis malesuada.
              </p>
              <button 
                onClick={() => setState({ congratsOpen: false })}
                className="w-full max-w-md py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full text-lg transition-colors z-10 shadow-lg"
              >
                Let's Discover
              </button>
            </div>
          )}
        />
      </main>
    </div>
  );
}
