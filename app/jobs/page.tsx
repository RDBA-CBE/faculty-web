"use client";

import Filterbar from "@/components/component/filterbar.component";
import useDebounce from "@/components/common-components/useDebounce";
import Breadcrumb from "@/components/common-components/Breadcrumb";

import { MOCK_JOBS } from "@/utils/constant.utils";
import {
  buildResumeFile,
  capitalizeFLetter,
  convertUrlToFile,
  Dropdown,
  Failure,
  generateMockJobs,
  getAvatarColor,
  getFileNameFromUrl,
  Success,
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
  Loader,
  BookmarkCheck,
  Workflow,
  LayoutGrid,
  List,
  Building2,
  Mail,
  MailIcon,
  PhoneCall,
  Award,
  Building,
} from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
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
import { NewJobCard } from "@/components/component/newJobcard.component";
import PaginationCom from "@/components/component/PaginationCom";
import CustomSelect from "@/components/common-components/dropdown";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/common-components/new_components/Footer";

import { RWebShare } from "react-web-share";
import ChipFilters from "@/components/component/chipFilters.component";
import LightboxGallery from "@/components/common-components/Lightbox.component";
import { set } from "date-fns";
import PaginationComTwo from "@/components/component/PaginationComTwo";
import SkeletonLoader from "./SkeletonLoader";

export default function JobsPage() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const jobIdParam = searchParams.get("id");
  const searchParam = searchParams.get("search");
  const locationParam = searchParams.get("location");
  const collegeParam = searchParams.get("college");

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
    // search: "",
    search: searchParam || "",
    location: locationParam || null,
    sortBy: "",
    sortOrder: "",
    errors: {},
    jobID: null,
    collegeDetail: null,
    showCollegeModal: false,
    departmentDetail: null,
    showDepartmentModal: false,
    department_id: null,
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSaving, setIsSaving] = useState<number | null>(null);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isTabScreen, setIsTabScreen] = useState(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    searchQuery: "",
    location: locationParam ? parseInt(locationParam, 10) : null,
    categories: [],
    jobTypes: [],
    experienceLevels: [],
    datePosted: [],
    salaryRange: [],
    tags: [],
    experience: "",
    jobID: null,
    colleges: collegeParam ? [parseInt(collegeParam, 10)] : [],
    department: [],
  });

  const debouncedSearch = useDebounce(state.search, 500);

  const initialFiltersRef = useRef(filters);

  const isFilterApplied = () => {
    return (
      JSON.stringify(filters) !== JSON.stringify(initialFiltersRef.current)
    );
  };

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
    collegeList();
    departmentList();
  }, []);

  useEffect(() => {
    const query = searchParam || "";
    if (query !== state.search) {
      setState({ search: query });
    }
  }, [searchParam]);

  useEffect(() => {
    const locationQuery = locationParam ? parseInt(locationParam, 10) : null;
    if (locationQuery !== filters.location) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: isNaN(locationQuery) ? null : locationQuery,
      }));
    }
  }, [locationParam]);

  useEffect(() => {
    const collegeQuery = collegeParam ? [parseInt(collegeParam, 10)] : [];
    if (
      filters.colleges.length !== collegeQuery.length ||
      (collegeQuery.length > 0 && filters.colleges[0] !== collegeQuery[0])
    ) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        colleges: collegeQuery,
      }));
    }
  }, [collegeParam]);

  useEffect(() => {
    jobList(1);
  }, [
    debouncedSearch,
    filters?.categories,
    filters.location,
    filters.jobTypes,
    filters.experienceLevels,
    filters.datePosted,
    filters.salaryRange,
    filters?.tags,
    filters?.colleges,
    filters?.department,
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
      const res: any = await Models.masterExperience.list();
      const dropdown = res?.results?.map((item: any) => ({
        value: item.name,
        label: item.name,
      }));

      setState({
        experienceList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const collegeList = async () => {
    try {
      const body = {
        pagination: "No",
      };
      const res: any = await Models.colleges.collegeList(body);
      const dropdown = Dropdown(res?.results, "college_name");

      setState({
        collegeList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const departmentList = async () => {
    try {
      const body = {
        pagination: "No",
      };
      const res: any = await Models.department.list(body);
      const dropdown = Dropdown(res?.results, "department_name");

      setState({
        deptList: dropdown,
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
        res?.responsibility?.blocks?.flatMap((block) => {
          if (block.type === "list") {
            return block.data.items; // array
          }

          if (block.type === "paragraph") {
            return [block.data.text]; // convert to array
          }

          return [];
        }) || [];

      setState({
        loading: false,
        jobDetail: res,
        responsibilities: responsibilities || null,
      });

      return res;
    } catch (error) {
      setState({ loading: false });
      Failure("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    if (jobIdParam) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setState({ jobID: jobIdParam });
      jobDetail(jobIdParam).then((res) => {
        if (res) {
          setSelectedJob(res);
          setShowJobDetail(true);
        }
      });
    }
  }, [jobIdParam]);

  const handleApply = () => {
    const profile = JSON.parse(localStorage.getItem("user"));
    const userId = profile?.id;

    if (state.jobDetail?.apply_link) {
      window.open(state.jobDetail.apply_link, "_blank");
      return;
    }

    const newState: { department_id?: number | null } = {};
    if (state.jobDetail?.department?.length === 1) {
      newState.department_id = state.jobDetail.department[0].id;
    } else {
      newState.department_id = null;
    }

    if (profile) {
      setState(newState);
      handleFormSubmitWithprofile(userId);
    } else {
      setState({
        ...newState,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        experience: "",
        resume: null,
        errors: {},
      });
      setShowApplicationModal(true);
    }
  };

  const handleFormSubmitWithprofile = async (userId) => {
    try {
      const res: any = await Models.profile.details(userId);

      setState({
        userDetail: res,
        firstName: res.first_name,
        lastName: res.last_name,
        phone: res.phone,
        resume: await buildResumeFile(res.resume_url, `${res.username} Resume`),
        email: res.email?.trim(),
        experience: res.experience,
      });
      setShowApplicationModal(true);
    } catch (error) {
      console.log("error", error);

      // Failure("Failed to fetch jobs");
    }
  };

  const handleSaveToggle = async (job) => {
    // e.stopPropagation();
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
        user_id: profile?.id,
      };
      if (job?.is_saved) {
        await Models.save.delete(profile.id, job.id);
        Success("Job removed from saved list.");
      } else {
        await Models.save.create(body);
        Success("Job saved successfully.");
      }
      jobList(state?.page);
      jobDetail(job.id);
      // }

      // Refetch job list to get the latest saved status and save_id
    } catch (error) {
      console.error("Failed to save/unsave job", error);
      Failure("An error occurred. Please try again.");
    } finally {
      setIsSaving(null);
    }
  };

  const getCollege = async (e, id) => {
    e.stopPropagation();
    try {
      setState({ loading: true });
      const res: any = await Models.colleges.details(id);
      setState({
        collegeDetail: res,
        showCollegeModal: true,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false });
      Failure("Failed to fetch college details");
    }
  };

  const getDepartment = async (e, id) => {
    e.stopPropagation();
    try {
      setState({ loading: true });
      const res: any = await Models.department.depdetails(id);
      setState({
        departmentDetail: res,
        showDepartmentModal: true,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false });
      Failure("Failed to fetch department details");
    }
  };

  const handleFormSubmit = async () => {
    try {
      //  never overwrite state
      setState({ btnLoading: true, errors: {} });

      // Manual validation for department
      if (state.jobDetail?.department?.length > 1 && !state.department_id) {
        setState({
          errors: {
            ...state.errors,
            department_id: "Please select a department.",
          },
          btnLoading: false,
        });
        return;
      }

      const profile = JSON.parse(localStorage.getItem("user") || "null");

      //  GUEST USER (WITH RESUME)

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

      if (state.department_id) {
        formData.append("department_id", state.department_id);
      }

      if (state.resume) {
        formData.append("resume", state.resume); // FILE OBJECT
      }

      //  LOGGED-IN USER (NO RESUME)

      if (profile?.id) {
        formData.append("applicant", profile.id);
      }

      //  Debug FormData
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await Models.applications.create(formData);

      //  COMMON SUCCESS STATE

      setShowApplicationModal(false);
      // Success("Application submitted successfully");

      setState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        experience: "",
        resume: null,
        department_id: null,
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

        setState({
          errors: validationErrors,
          btnLoading: false,
        });
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
        setShowApplicationModal(false);
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

    if (filters?.department?.length > 0) {
      body.department = filters.department;
    }

    if (filters?.location) {
      body.location = filters.location;
    }

    if (filters?.jobTypes?.length > 0) {
      body.jobTypes = filters.jobTypes;
    }

    if (filters?.experienceLevels?.length > 0) {
      body.experience = filters.experienceLevels;
    }

    if (filters?.salaryRange?.length > 0) {
      body.salary_range = filters.salaryRange;
    }

    if (filters?.colleges?.length > 0) {
      body.colleges = filters.colleges;
    }

    if (filters?.tags?.length > 0) {
      body.tags = filters.tags?.map((tag) => tag.value).join(",");
    }

    if (filters?.datePosted?.length > 0) {
      const durationMap = {
        "24h": 1,
        "7d": 7,
        "15d": 15,
        "30d": 30,
        "last-mon": 30, // Approximation
      };
      const maxDays = Math.max(
        ...filters.datePosted.map((d) => durationMap[d] || 0),
      );

      if (maxDays === 1) {
        body.date_posted_after = moment()
          .subtract(24, "hours")
          .format("YYYY-MM-DD");
      } else if (maxDays > 1) {
        body.date_posted_after = moment()
          .subtract(maxDays, "days")
          .format("YYYY-MM-DD");
        body.date_posted_before = moment().format("YYYY-MM-DD");
      }
    }

    return body;
  };

  const naccData = [
    { label: "A++", highlight: true },
    { label: "NBA Accredited" },
    { label: "Autonomous" },
    { label: "UGC Approved" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileScreen(width < 768);
      setIsTabScreen(width >= 768 && width < 1024);
      setIsDesktopScreen(width >= 1024);
      setIsWideScreen(width >= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (!state.next) return;
    const nextPage = state.page + 1;
    setState({ page: nextPage });
    jobList(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!state.prev) return;
    const prevPage = state.page - 1;
    setState({ page: prevPage });
    jobList(prevPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      location: null,
      categories: [],
      jobTypes: [],
      experienceLevels: [],
      datePosted: [],
      salaryRange: [],
      tags: [],
      experience: "",
      jobID: null,
      colleges: [],
      department: [],
    });
    setState({ search: "" });
  };

  const handlePageChange = (pageNumber: number) => {
    setState({ page: pageNumber });
    jobList(pageNumber);
  };

  return (
    <>
      {" "}
      <div className=" bg-clr1">
        <div className="bg-[#1d1d57] py-[20px] md:py-[50px] px-4 ">
          <div className="max-w-7xl 0px] mx-auto text-center">
            <h1 className="!text-white text-[24px] md:text-[40px] font-medium md:font-semibold">
              Jobs
            </h1>
          </div>
        </div>

        <div className="section-wid  py-8 lg:py-12">
          <main>
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
                  {/* <ArrowLeft size={20} /> */}
                  <Breadcrumb />
                  {/* <span className="font-medium">Back to Jobs</span> */}
                </button>

                {/* Job Header */}
                {/* Job Header Card */}
                <div className="bg-clr2 rounded-lg   p-6 ">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="w-fit bg-[#1d1d571A] mb-5 rounded-3xl px-5 py-1 text-[10px] text-[#000]">
                        {/* • Posted{" "} */}
                        {moment(state?.jobDetail?.created_at).isValid() &&
                        moment(state?.jobDetail?.created_at).year() > 1900
                          ? moment(state?.jobDetail?.created_at).fromNow()
                          : "Just now"}
                      </div>
                      <div className="flex items-start gap-4">
                        {state?.jobDetail?.college?.college_logo ? (
                          <img
                            src={state?.jobDetail?.college?.college_logo}
                            alt={state?.jobDetail?.college?.name}
                            className="w-14 h-14  object-cover"
                            onClick={(e) =>
                              getCollege(e, state?.jobDetail.college?.id)
                            }
                          />
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-lg ${getAvatarColor(
                              state?.jobDetail?.college?.name,
                            )} flex items-center justify-center text-black bg-white font-semibold text-lg`}
                            onClick={(e) =>
                              getCollege(e, state?.jobDetail.college?.id)
                            }
                          >
                            {state?.jobDetail?.college?.name
                              ?.slice(0, 1)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1">
                          <h1
                            className="text-xl font-semibold text-[#313131] mb-1"
                            onClick={(e) =>
                              getCollege(e, state?.jobDetail.college?.id)
                            }
                          >
                            {capitalizeFLetter(state?.jobDetail?.job_title)}
                          </h1>
                          <p className="text-md text-gray-700 mb-2">
                            {state?.jobDetail?.college?.name}
                          </p>
                        </div>
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
                    {/* <p className="text-sm text-gray-500 mb-3">
                      {capitalizeFLetter(
                        state?.jobDetail?.locations
                          ?.map((item) => item.city)
                          .join(", "),
                      )}{" "}
                      • Posted {state?.jobDetail?.postedDate || "2 days ago"}
                    </p> */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-[#F2B31D]" />
                        {state?.jobDetail?.experiences?.name}
                      </span>
                      {/* <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {state?.jobDetail?.job_type_obj?.name}
                  </span> */}
                      <span className="flex items-center gap-1">
                        {selectedJob.salary_range?.includes("$") ? (
                          <DollarSign className="w-4 h-4 text-[#F2B31D]" />
                        ) : (
                          <IndianRupee className="w-4 h-4 text-[#F2B31D]" />
                        )}
                        {state?.jobDetail?.salary_range_obj?.name}
                      </span>

                      {state?.jobDetail?.college?.address && (
                        <span className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-[#E6AB1D]" />
                          {capitalizeFLetter(
                            state?.jobDetail?.locations
                              ?.map((item) => item.city)
                              .join(", "),
                          )}{" "}
                          {/* {state?.jobDetail?.college?.address} */}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setState({ jobID: state?.jobDetail?.id });
                        handleApply();
                      }}
                      className="bg-[#1d1d57]  text-md border border-xl border-[#1d1d57] rounded rounded-3xl  px-6 py-1  hover:bg-[#1d1d57] transition-colors text-white hover:text-white"
                    >
                      {state.jobDetail?.apply_link
                        ? " Apply on company's site"
                        : " Apply Now"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveToggle(state.jobDetail)}
                        disabled={isSaving === state?.jobDetail?.id}
                        className="p-1 -m-1"
                        // aria-label={
                        //   state.jobDetail.is_saved ? "Unsave job" : "Save job"
                        // }
                      >
                        {state.jobDetail?.is_saved ? (
                          <div className="flex items-center ">
                            <BookmarkCheck
                              className={`w-5 h-5 fill-[#1d1d57] text-white cursor-pointer `}
                            />
                          </div>
                        ) : (
                          <>
                            <Bookmark className="w-5 h-5 " />
                          </>
                        )}
                      </button>
                      <RWebShare
                        data={{
                          title: "Faculty Plus",
                          text: "Check this out!",
                          url: window.location.href,
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <Share2 className="w-5 h-5  hover:text-gray-600 cursor-pointer" />
                      </RWebShare>
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
                      <div className="leading-relaxed space-y-6">
                        {state?.jobDetail?.department?.length > 0 && (
                          <div>
                            <h3 className="text-md font-semibold text-gray-800  tracking-wide mb-2">
                              Departments
                            </h3>

                            <div className="flex flex-wrap gap-3">
                              {state?.jobDetail?.department?.map(
                                (item, index) => (
                                  <button
                                    key={index}
                                    onClick={(e) => getDepartment(e, item.id)}
                                    className="px-4 py-2 text-sm font-medium rounded-full 
                       bg-blue-50 text-[#1d1d57] 
                       border border-blue-100
                       hover:bg-[#1d1d57] hover:text-white
                       transition-all duration-200"
                                  >
                                    {item.name}
                                  </button>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {/* Job Description Section */}
                        {state?.jobDetail?.job_description && (
                          <div>
                            <h3 className="text-md font-semibold text-gray-800  tracking-wide mb-2">
                              Job Description
                            </h3>

                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                              {state?.jobDetail?.job_description}
                            </p>
                          </div>
                        )}
                      </div>
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
                  {state?.responsibilities?.length > 0 && (
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
                  )}

                  {/* Requirements */}
                  {/* {state?.jobDetail?.requirements && (
                    <div className="border-b  px-2 py-2 pb-5">
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
                    </div>
                  )} */}

                  {/* Skills */}
                  {/* {state?.jobDetail?.skills && (
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
                  )} */}
                </div>

                {/* Job Details */}

                <div className="bg-clr2 rounded-lg   p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Job Overview
                  </h3>
                  <div className="space-y-2">
                    {/* <div>
                  <p className="text-md font-medium  pb-1">Job type</p>
                  <p className="text-md text-black">
                    {state?.jobDetail?.job_type_obj?.name}
                  </p>
                </div> */}
                    <div>
                      <span className=" flex gap-2 text-md font-medium  pb-1">
                        <Workflow className="w-4 h-4 mt-1 text-[#E6AB1D]" /> Job
                        Title
                      </span>
                      <p className="text-md text-gray-500  ps-6">
                        {capitalizeFLetter(state?.jobDetail?.job_title)}
                      </p>
                    </div>
                    <div>
                      <span className=" flex gap-2 text-md font-medium  pb-1">
                        <Briefcase className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                        Experience level
                      </span>
                      <p className="text-md text-gray-500  ps-6">
                        {state?.jobDetail?.experiences?.name}
                      </p>
                    </div>
                    <div>
                      <span className="flex gap-2 text-md font-medium  pb-1">
                        <IndianRupee className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                        Salary
                      </span>
                      <p className="text-md text-gray-500 ps-6">
                        {state?.jobDetail?.salary_range_obj?.name}
                      </p>
                    </div>
                    <div>
                      <span className="flex gap-2 text-md font-medium  pb-1">
                        <Building2 className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                        Department
                      </span>
                      <p className="text-md text-gray-500 ps-6">
                        {state?.jobDetail?.department?.map((item, index) => (
                          <div key={index}>
                            <span
                              className="text-md text-gray-500 hover:text-[#1d1d57] cursor-pointer hover:underline"
                              onClick={(e) => getDepartment(e, item.id)}
                            >
                              {item.name}
                            </span>
                            {index < state.jobDetail.department.length - 1 &&
                              ", "}
                          </div>
                        ))}
                      </p>
                    </div>
                    {state?.jobDetail?.college?.address && (
                      <div>
                        <span className="flex gap-2 text-md font-medium  pb-1">
                          <MapPin className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                          Location
                        </span>
                        <p className="text-md text-gray-500  ps-6">
                          {state?.jobDetail?.locations
                            ?.map((item) => item.city)
                            .join(", ")}
                          {/* {state?.jobDetail?.college?.address} */}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Info */}

                {state?.jobDetail?.job_image && (
                  <div
                    className="bg-clr2 w-fit rounded-lg  p-6 cursor-pointer"
                    onClick={() => setState({ imgOpen: true })}
                  >
                    <img
                      src={state?.jobDetail?.job_image}
                      alt={state?.jobDetail?.job_title}
                      className="w-100 max-h-[400px]"
                    />
                  </div>
                )}
                <div className="bg-clr2 rounded-lg  p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About
                  </h3>
                  <div className="flex items-start gap-3 mb-4">
                    {selectedJob.college?.college_logo ? (
                      <img
                        src={selectedJob.college?.college_logo}
                        alt={selectedJob.college?.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onClick={(e) =>
                          getCollege(e, state?.jobDetail.college?.id)
                        }
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-lg ${getAvatarColor(
                          selectedJob.college?.name,
                        )} flex items-center justify-center text-white bg-gray-400 font-semibold`}
                        onClick={(e) =>
                          getCollege(e, state?.jobDetail.college?.id)
                        }
                      >
                        {selectedJob.college?.name?.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4
                        className="font-medium text-gray-900"
                        onClick={(e) =>
                          getCollege(e, state?.jobDetail.college?.id)
                        }
                      >
                        {state?.jobDetail?.college?.name}
                      </h4>
                      {/* <p className="text-sm text-gray-500">
                        Technology Company
                      </p> */}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJob(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        router.push(
                          `/jobs?college=${state?.jobDetail?.college?.id}`,
                        );
                      }}
                      className="px-6 py-2 rounded-full text-sm font-medium transition-colors bg-[#01014B] text-white group-hover:bg-[#F2B31D] group-hover:text-black"
                    >
                      {state?.jobDetail?.college?.total_jobs || 0} Openings
                    </button>
                  </div>
                  <p className="leading-relaxed">
                    {state?.jobDetail?.company_detail}
                  </p>
                </div>
              </div>
            ) : isDesktopScreen && selectedJob && showJobDetail ? (
              <>
                <Breadcrumb />

                <div className="flex gap-6 py-4 ">
                  {/* Left Sidebar - Jobs List */}
                  <div className="w-80 flex-shrink-0 bg-white py-5 border border-[#c7c7c787]">
                    <div className="mb-4 flex flex-col  w-full bg-clr2  rounded-sm  overflow-hidden py-1 ">
                      <div className="flex-grow flex gap-3 items-center rounded-full px-4 py-3 lg:py-0 w-full lg:w-auto border border-[#c7c7c787] mx-4 bg-[#F5F5F5]">
                        <Search color="#E4E4E4" size={22} />
                        <input
                          type="text"
                          placeholder="Search by: Job tittle, Position, Keyword..."
                          className="w-full px-2 py-4  bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-[#AFAFAF] placeholder:font-normal"
                          value={state.search}
                          onChange={(e) => setState({ search: e.target.value })}
                        />
                      </div>
                      <h3 className="text-black px-6 font-semibold mt-4">
                        Job List
                      </h3>

                      {/* <div className="hidden lg:block w-px h-10 bg-slate-100"></div> */}
                    </div>
                    <div className="sticky top-16 space-y-4 max-h-[calc(100vh+130px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2 px-3">
                      {state.jobList?.map((job) => (
                        <div
                          key={job.id}
                          onClick={() => {
                            setSelectedJob(job);
                            setState({ jobID: job.id });
                            jobDetail(job.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`cursor-pointer px-2 py-5 transition-all   ${
                            selectedJob?.id === job.id
                              ? "border border-[#01014B] bg-[#fff]  "
                              : "border-b border-[#c7c7c787]"
                          }`}
                        >
                          <div className="flex flex-row gap-4 justify-between">
                            <div className="flex flex-row gap-4">
                              <div>
                                {job?.college?.college_logo ? (
                                  <img
                                    src={job?.college?.college_logo}
                                    alt={job?.college?.name}
                                    className="w-6 h-6  object-cover"
                                  />
                                ) : (
                                  <div
                                    className={`w-6 h-6 rounded-lg ${getAvatarColor(
                                      job.college?.name,
                                    )} flex items-center justify-center ${
                                      selectedJob?.id === job.id
                                        ? "text-white bg-gray-400"
                                        : " ext-white bg-gray-400"
                                    }  font-semibold flex-shrink-0`}
                                  >
                                    {job.college?.name
                                      ?.slice(0, 1)
                                      .toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-start gap-3">
                                  <div className="min-w-0 flex-1">
                                    <h3
                                      className={`font-semibold  leading-tight mb-1 ${
                                        selectedJob?.id === job.id
                                          ? ""
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {capitalizeFLetter(job.job_title)}
                                    </h3>
                                    <p
                                      className={`cursor-pointer ${
                                        selectedJob?.id === job.id
                                          ? ""
                                          : "text-gray-600 hover:underline"
                                      } text-sm font-normal`}
                                      // onClick={(e) => getCollege(e, job.college?.id)}
                                    >
                                      {job.college?.name}
                                    </p>
                                  </div>
                                </div>
                                {/* Header */}
                                {/* Experience and Salary */}
                                <div
                                  className={`flex  justify-start gap-3  mb-3 border-none mt-4 ${
                                    selectedJob?.id === job.id
                                      ? ""
                                      : "text-gray-600"
                                  }`}
                                >
                                  <div className="flex gap-2">
                                    <Briefcase
                                      className={`${
                                        selectedJob?.id === job.id && ""
                                      } w-3 h-3 text-[#E6AB1D]`}
                                    />
                                    <span
                                      className={`text-[12px] pt-[-2px] ${
                                        selectedJob?.id === job.id && ""
                                      }`}
                                    >
                                      {job.experiences?.name}
                                    </span>
                                  </div>

                                  {job?.college?.address && (
                                    <div className="flex  gap-1">
                                      <MapPin
                                        className={`${
                                          selectedJob?.id === job.id && ""
                                        } w-3 h-3 text-[#E6AB1D]`}
                                      />
                                      <span
                                        className={`text-[12px] pt-[-2px] ${
                                          selectedJob?.id === job.id &&
                                          "text-[12px]"
                                        }`}
                                      >
                                        {job.locations
                                          ?.map((item) => item.city)
                                          .join(", ")}
                                        {/* {job?.college?.address} */}
                                      </span>
                                    </div>
                                  )}

                                  {/* <div className="flex items-center gap-1">
                                {job.salary_range_obj?.name?.includes("$") ? (
                                  <DollarSign
                                    className={`${
                                      selectedJob?.id === job.id && "text-white"
                                    } w-3 h-3`}
                                  />
                                ) : (
                                  <IndianRupee
                                    className={`${
                                      selectedJob?.id === job.id && "text-white"
                                    } w-3 h-3`}
                                  />
                                )}
                                <span
                                  className={`font-semibold ${
                                    selectedJob?.id === job.id
                                      ? "text-white"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {job?.salary_range_obj?.name}
                                </span>
                              </div> */}
                                </div>
                                <div className="flex gap-2">
                                  <Building2 className="w-4 h-4 text-[#ffb400]" />

                                  <span className="flex items-center ">
                                    {job?.department
                                      ?.slice(0, 1)
                                      .map((item, index) => (
                                        <span
                                          key={index}
                                          className="cursor-pointer text-[12px]"
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
                                      <div className="w-5 h-5 px-2 py-2 flex items-center justify-center rounded-full bg-[#1d1d57] text-white text-[10px] font-medium">
                                        +{job.department.length - 2}
                                      </div>
                                    )}
                                  </span>
                                </div>
                                {/* Location
                            <div
                              className={`flex items-center gap-1 text-xs mb-3 ${
                                selectedJob?.id === job.id
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            >
                              <MapPin
                                className={`${
                                  selectedJob?.id === job.id && "text-white"
                                } w-3 h-3`}
                              />
                              <span
                                className={`${
                                  selectedJob?.id === job.id && "text-white"
                                }`}
                              >
                                {job.locations
                                  ?.map((item) => item.city)
                                  .join(", ")}
                              </span>
                            </div> */}
                                {/* Footer */}
                                {/* <div
                              className={`flex items-center justify-between pt-3 border-t ${
                                selectedJob?.id === job.id
                                  ? "border-gray-400"
                                  : "border-gray-300"
                              }`}
                            > */}
                                {/* <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {job?.job_type_obj?.name}
                      </span> */}
                                {/* <div
                                className={`flex items-center gap-1 text-xs ${
                                  selectedJob?.id === job.id
                                    ? "text-white"
                                    : "text-gray-500"
                                }`}
                              >
                                <Clock
                                  className={`${
                                    selectedJob?.id === job.id && "text-white"
                                  } w-3 h-3`}
                                />
                                <span
                                  className={`${
                                    selectedJob?.id === job.id && "text-white"
                                  }`}
                                >
                                  {moment(job.created_at).isValid() &&
                                  moment(job.created_at).year() > 1900
                                    ? moment(job.created_at).fromNow()
                                    : "Just now"}
                                </span>
                              </div> */}
                                {/* </div> */}
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleSaveToggle(job)}
                                    disabled={isSaving === job.id}
                                    className="p-1 -m-1"
                                    // aria-label={
                                    //   state.jobDetail.is_saved ? "Unsave job" : "Save job"
                                    // }
                                  >
                                    {job?.is_saved ? (
                                      <div className="flex items-center ">
                                        <BookmarkCheck
                                          className={`w-5 h-5 fill-[#1d1d57] text-white cursor-pointer `}
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        <Bookmark className="w-5 h-5 " />
                                      </>
                                    )}
                                  </button>

                                  {/* <RWebShare
                              data={{
                                title: "Faculty Plus",
                                text: "Check this out!",
                                url: window.location.href,
                              }}
                              onClick={() =>
                                console.log("shared successfully!")
                              }
                            >
                              <Share2 className="w-5 h-5  hover:text-gray-600 cursor-pointer" />
                            </RWebShare> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 ">
                    {/* Job Header Card */}
                    {state.loading ? (
                      <div className="bg-white p-6 rounded-lg border border-[#c7c7c787] mb-6">
                        <div className="flex gap-4 mb-6">
                          <SkeletonLoader type="rect" width={64} height={64} className="rounded-3xl" />
                          <div className="flex-1">
                            <SkeletonLoader type="text" width="40%" height={32} className="mb-2" />
                            <SkeletonLoader type="text" width="20%" height={20} />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <SkeletonLoader type="text" width={100} />
                          <SkeletonLoader type="text" width={100} />
                          <SkeletonLoader type="text" width={100} />
                        </div>
                      </div>
                    ) : (
                    <>
                    <div className=" border-b  px-2 py-2 pb-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="w-fit bg-[#1d1d571A] mb-5 rounded-3xl px-3 py-2 text-[12px] text-[#000]">
                            {/* • Posted{" "} */}
                            {moment(state?.jobDetail?.created_at).isValid() &&
                            moment(state?.jobDetail?.created_at).year() > 1900
                              ? moment(state?.jobDetail?.created_at).fromNow()
                              : "Just now"}
                          </div>
                          <div className="flex items-start gap-4 h-full mb-4">
                            {state?.jobDetail?.college?.college_logo ? (
                              <img
                                src={state?.jobDetail?.college?.college_logo}
                                alt={state?.jobDetail?.college?.name}
                                className="w-12 h-12  object-cover  rounded-3xl"
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              />
                            ) : (
                              <div
                                className={`w-12 h-12 rounded-3xl ${getAvatarColor(
                                  state?.jobDetail?.college?.name,
                                )} flex items-center justify-center text-white bg-gray-400 font-semibold text-lg`}
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              >
                                {state?.jobDetail?.college?.name
                                  ?.slice(0, 1)
                                  .toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 flex-col">
                              <h1 className="text-3xl font-semibold text-gray-900 mb-1">
                                {capitalizeFLetter(state?.jobDetail?.job_title)}
                              </h1>
                              <p
                                className="text-md text-gray-700 mb-2 cursor-pointer hover:underline"
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              >
                                {capitalizeFLetter(
                                  state?.jobDetail?.college?.name,
                                )}
                              </p>
                            </div>
                          </div>

                          <div className=" ">
                            <div className="flex items-center gap-5 text-sm text-gray-600">
                              <span className="flex items-center gap-3">
                                <Briefcase className="w-4 h-4 text-[#E6AB1D]" />
                                {state?.jobDetail?.experiences?.name}
                              </span>
                              {/* <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {state?.jobDetail?.job_type_obj?.name}
                        </span> */}
                              <span className="flex items-center gap-3">
                                {selectedJob.salary_range?.includes("$") ? (
                                  <DollarSign className="w-4 h-4 text-[#E6AB1D]" />
                                ) : (
                                  <IndianRupee className="w-4 h-4 text-[#E6AB1D]" />
                                )}
                                {state?.jobDetail?.salary_range_obj?.name}
                              </span>
                              {state?.jobDetail?.college?.address && (
                                <span className="flex items-center gap-3">
                                  <MapPin className="w-4 h-4 text-[#E6AB1D]" />
                                  {capitalizeFLetter(
                                    state?.jobDetail?.locations
                                      ?.map((item) => item.city)
                                      .join(", "),
                                  )}{" "}
                                  {/* {state?.jobDetail?.college?.address} */}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 justify-between items-end h-full">
                          <button
                            className="p-1"
                            onClick={() => setSelectedJob(null)}
                          >
                            <X size={25} className=" hover:text-gray-600" />
                          </button>
                          <div className="flex flex-col items-end justify-between pt-6 gap-8  border-gray-100">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleSaveToggle(
                                    state.jobDetail,

                                    // !!state.jobDetail.is_saved,
                                    // state.jobDetail.save_id,
                                  )
                                }
                                disabled={isSaving == state?.jobDetail?.id}
                                className="p-1 -m-1"
                                // aria-label={
                                //   state.jobDetail.is_saved ? "Unsave job" : "Save job"
                                // }
                              >
                                {state.jobDetail?.is_saved ? (
                                  <div className="flex items-center ">
                                    <BookmarkCheck
                                      className={`w-6 h-6 fill-[#1d1d57] text-white cursor-pointer `}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <Bookmark className="w- h-5 " />
                                  </>
                                )}
                              </button>
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
                                <Share2 className="w-5 h-5  hover:text-gray-600 cursor-pointer" />
                              </RWebShare>
                            </div>

                            <button
                              onClick={() => {
                                setState({ jobID: state?.jobDetail?.id });
                                handleApply();
                              }}
                              className="bg-[#1d1d57]  text-md border border-xl border-[#1d1d57] rounded rounded-3xl  px-6 py-1  hover:bg-[#1d1d57] transition-colors text-white hover:text-white"
                            >
                              {state.jobDetail?.apply_link
                                ? " Apply on company's site"
                                : " Apply Now"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                    )}

                    {state.loading ? (
                      <div className="flex gap-6 flex-col xl:flex-row">
                        <div className="flex-1 space-y-4 p-3">
                          <SkeletonLoader type="text" width="30%" height={24} />
                          <SkeletonLoader type="text" count={10} />
                        </div>
                        <div className="w-full xl:w-80 flex-shrink-0 mt-5">
                          <div className="bg-clr2 border border-[#c7c7c787] p-6 space-y-4">
                            <SkeletonLoader type="text" width="50%" height={24} />
                            <SkeletonLoader type="text" count={4} />
                          </div>
                        </div>
                      </div>
                    ) : (
                    <div className="flex gap-6 flex-col xl:flex-row">
                      {/* Main Content */}
                      <div className="flex-1 space-y-1   p-3">
                        <div>
                          {/* Job Description */}
                          <div className="border-b  px-2 py-2 pb-5">
                            <h2 className="text-lg font-semibold text-black mb-4">
                              About the job
                            </h2>
                            {/* Department Section */}
                            <div className="leading-relaxed space-y-6">
                              {state?.jobDetail?.department?.length > 0 && (
                                <div>
                                  <h3 className="text-md font-semibold text-gray-800  tracking-wide mb-2">
                                    Departments
                                  </h3>

                                  <div className="flex flex-wrap gap-3">
                                    {state?.jobDetail?.department?.map(
                                      (item, index) => (
                                        <button
                                          key={index}
                                          onClick={(e) =>
                                            getDepartment(e, item.id)
                                          }
                                          className="px-4 py-2 text-sm font-medium rounded-full 
                       bg-blue-50 text-[#1d1d57] 
                       border border-blue-100
                       hover:bg-[#1d1d57] hover:text-white
                       transition-all duration-200"
                                        >
                                          {item.name}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                              {/* Job Description Section */}
                              {state?.jobDetail?.job_description && (
                                <div>
                                  <h3 className="text-md font-semibold text-gray-800  tracking-wide mb-2">
                                    Job Description
                                  </h3>

                                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                    {state?.jobDetail?.job_description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Responsibilities */}
                          {state?.responsibilities?.length > 0 && (
                            <div className="border-b  px-2 py-2 pb-5">
                              <h2 className="text-lg font-semibold text-black mb-4">
                                Key responsibilities
                              </h2>
                              <ul className="space-y-3">
                                {state?.responsibilities?.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />

                                    <span className="">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Requirements */}
                          {/* {state?.jobDetail?.requirements && (
                          <div className="border-b  px-2 py-2 pb-5">
                            <h2 className="text-lg font-semibold text-black mb-4">
                              Requirements
                            </h2>
                            <ul className="space-y-3">
                              {state?.jobDetail?.requirements?.map(
                                (item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0" />
                                    <span className="">{item}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )} */}

                          {/* Skills */}
                          {/* {state?.jobDetail?.skills && (
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
                        )} */}
                        </div>
                      </div>

                      {/* Right Sidebar */}
                      <div className="w-full xl:w-80 flex-shrink-0 mt-5 ">
                        <div className="sticky top-20 space-y-4 ">
                          {/* Job Details */}
                          <div className="bg-clr2   border border-[#c7c7c787]  p-6">
                            <h3 className="text-lg font-semibold text-black mb-4">
                              Job Overview
                            </h3>
                            <div className="space-y-4">
                              {/* <div>
                          <p className="text-md font-medium  pb-1">Job type</p>
                          <p className="text-md text-black">
                            {state?.jobDetail?.job_type_obj?.name}
                          </p>
                        </div> */}
                              <div>
                                <span className=" flex gap-2 text-md font-medium  pb-1">
                                  <Workflow className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                  Job Title
                                </span>
                                <p className="text-md text-gray-500  ps-6">
                                  {state?.jobDetail?.job_title}
                                </p>
                              </div>

                              <div>
                                <span className=" flex gap-2 text-md font-medium  pb-1">
                                  <Briefcase className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                  Experience level
                                </span>
                                <p className="text-md text-gray-500  ps-6">
                                  {state?.jobDetail?.experiences?.name}
                                </p>
                              </div>
                              <div>
                                <span className="flex gap-2 text-md font-medium  pb-1">
                                  <IndianRupee className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                  Salary
                                </span>
                                <p className="text-md text-gray-500 ps-6">
                                  {state?.jobDetail?.salary_range_obj?.name}
                                </p>
                              </div>

                              <div>
                                <span className="flex gap-2 text-md font-medium  pb-1">
                                  <Building2 className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                  Department
                                </span>
                                <p className="text-md text-gray-500 ps-6">
                                  {state?.jobDetail?.department?.map(
                                    (item, index) => (
                                      <div key={index}>
                                        <span
                                          className="hover:text-[#1d1d57] cursor-pointer hover:underline"
                                          onClick={(e) =>
                                            getDepartment(e, item.id)
                                          }
                                        >
                                          {item.name}
                                        </span>
                                        {index <
                                          state.jobDetail.department.length -
                                            1 && ", "}
                                      </div>
                                    ),
                                  )}
                                </p>
                              </div>

                              {state?.jobDetail?.college?.address && (
                                <div>
                                  <span className="flex gap-2 text-md font-medium  pb-1">
                                    <MapPin className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                    Location
                                  </span>
                                  <p className="text-md text-gray-500  ps-6">
                                    {state?.jobDetail?.locations
                                      ?.map((item) => item.city)
                                      .join(", ")}
                                    {/* {state?.jobDetail?.college?.address} */}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Company Info */}

                          {state?.jobDetail?.job_image && (
                            <div
                              className="bg-white  border border-[#c7c7c787] cursor-pointer  p-6"
                              onClick={() => setState({ imgOpen: true })}
                            >
                              <img
                                src={state?.jobDetail?.job_image}
                                alt={state?.jobDetail?.job_title}
                                className="w-100 max-h-[400px]"
                              />
                            </div>
                          )}
                          <div className="bg-white  border border-[#c7c7c787]  p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              About
                            </h3>
                            <div className="flex items-start gap-3 mb-4">
                              {selectedJob?.college?.college_logo ? (
                                <img
                                  src={selectedJob.college.college_logo}
                                  alt={selectedJob.college.name}
                                  className="w-12 h-12 rounded-3xl object-cover"
                                />
                              ) : (
                                <div
                                  className={`w-12 h-12 rounded-3xl ${getAvatarColor(
                                    selectedJob.college?.name,
                                  )} flex items-center justify-center text-white bg-gray-400 font-semibold`}
                                >
                                  {selectedJob.college?.name
                                    ?.slice(0, 1)
                                    .toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h4
                                  className="font-medium text-gray-900 cursor-pointer hover:underline"
                                  onClick={(e) =>
                                    getCollege(e, state?.jobDetail.college?.id)
                                  }
                                >
                                  {state?.jobDetail?.college?.name}
                                </h4>
                                {/* <p className="text-sm text-gray-500">
                                Technology Company
                              </p> */}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedJob(null);
                                window.scrollTo({ top: 0, behavior: "smooth" });

                                router.push(
                                  `/jobs?college=${state?.jobDetail?.college?.id}`,
                                );
                              }}
                              className="px-6 py-2 rounded-full text-sm font-medium transition-colors bg-[#01014B] text-white group-hover:bg-[#F2B31D] group-hover:text-black"
                            >
                              {state?.jobDetail?.college?.total_jobs || 0}{" "}
                              Openings
                            </button>
                            <p className="leading-relaxed">
                              {state?.jobDetail?.college_detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="relative flex flex-col lg:flex-row gap-8 items-start">
                <div
                  className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
                    isSidebarOpen
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
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
                    collegeList={state?.collegeList}
                    deptList={state?.deptList}
                    datePostedList={state?.datePostedList}
                    salaryRangeList={state?.salaryRangeList}
                    tagsList={state?.tagsList}
                  />
                </div>

                {/* DESKTOP STICKY SIDEBAR */}
                <div className="w-80 hidden lg:block shrink-0  bg-clr2 self-start lg:sticky lg:top-8 border border-[#c7c7c787]">
                  {/* make the filter wrapper scrollable if it grows taller than viewport */}
                  <div className="">
                    <Filterbar
                      filters={filters}
                      onFilterChange={setFilters}
                      categoryList={state?.categoryList}
                      locationList={state?.locationList}
                      jobTypeList={state?.jobTypeList}
                      experienceList={state?.experienceList}
                      collegeList={state?.collegeList}
                      datePostedList={state?.datePostedList}
                      salaryRangeList={state?.salaryRangeList}
                      tagsList={state?.tagsList}
                      deptList={state?.deptList}
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  {/* content input header start */}
                  <div className="z-30 bg-white  self-start items-center flex justify-center border border-[#c7c7c787] rounded-3xl">
                    <div className="flex flex-row items-center w-full bg-clr2  rounded-3xl  p-1">
                      <div className="flex-grow flex items-center ps-3 md:px-6 py-2  lg:py-0 w-full lg:w-auto ">
                        <Search color="#5c5a5a93" size={22} />
                        <input
                          type="text"
                          placeholder="Search by: Job tittle, Position, Keyword..."
                          className="w-full pl-4 bg-transparent text-sm  focus:outline-none placeholder:text-[#313131] placeholder:font-normal font-medium  text-black"
                          value={state.search}
                          onChange={(e) => setState({ search: e.target.value })}
                        />
                      </div>

                      {isWideScreen && (
                        <div className="hidden lg:block w-px h-6 bg-[#000]/40"></div>
                      )}

                      <div className="flex items-center w-full lg:w-auto lg:p-1 gap-2 border-t lg:border-t-0 border-slate-100">
                        <div className="flex items-center px-4 flex-grow lg:w-64 ">
                          <MapPin color="#5c5a5a93" size={22} />

                          <CustomSelect
                            options={state.locationList}
                            value={filters.location}
                            onChange={(selected) =>
                              setFilters({
                                ...filters,
                                location: selected ? selected.value : null,
                              })
                            }
                            className="py-0 border-none"
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

                        {isWideScreen && (
                          <div className="hidden lg:block w-px h-6 bg-[#000]/40"></div>
                        )}

                        {isWideScreen && (
                          <div className="hidden lg:flex items-center gap-1 px-2 ">
                            <button
                              onClick={() => setViewType("grid")}
                              className={`p-2 rounded-md transition-colors ${
                                viewType === "grid"
                                  ? "bg-[#1d1d57] text-white"
                                  : "text-gray-400 hover:bg-gray-100"
                              }`}
                            >
                              <LayoutGrid size={15} />
                            </button>

                            <button
                              onClick={() => setViewType("list")}
                              className={`p-2 rounded-md transition-colors ${
                                viewType === "list"
                                  ? "bg-[#1d1d57] text-white"
                                  : "text-gray-400 hover:bg-gray-100"
                              }`}
                            >
                              <List size={15} />
                            </button>
                          </div>
                        )}

                        {/* <button
                      className="hover-bg-[#F2B31D]  text-md border border-xl border-[#F2B31D] rounded rounded-3xl  px-6 py-1  hover:bg-[#E5A519] transition-colors text-black hover:text-white"
                      onClick={() => jobList(state?.page)}
                    >
                      Find Job
                    </button> */}
                      </div>
                    </div>

                    {/* content body job list */}
                  </div>

                  <div className="py-4 lg:hidden flex items-center justify-between">
                    <div className="lg:hidden">
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
                            <div className="flex items-center gap-2 justify-center">
                              {isFilterApplied() && (
                                <button
                                  onClick={() => setIsMobileFilterOpen(false)}
                                  className=" bg-[#1d1d57] w-fit  text-sm border border-xl border-[#1d1d57] rounded rounded-3xl  px-6 py-1  hover:bg-[#1d1d57] transition-colors text-white hover:text-white"
                                >
                                  Apply
                                </button>
                              )}
                              <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-1 hover:bg-clr2 rounded-full"
                              >
                                <X size={20} className="text-gray-500" />
                              </button>
                            </div>
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
                              collegeList={state?.collegeList}
                              deptList={state?.deptList}
                            />
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  <ChipFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    categoryList={state?.categoryList}
                    jobTypeList={state?.jobTypeList}
                    experienceList={state?.experienceList}
                    datePostedList={state?.datePostedList}
                    salaryRangeList={state?.salaryRangeList}
                    tagsList={state?.tagsList}
                    collegeList={state?.collegeList}
                    deptList={state?.deptList}
                    locationList={state?.locationList}
                  />

                  {state.loading ? (
                    <div
                      className={`grid mt-5 ${
                        viewType === "grid" || !isWideScreen
                          ? "grid-cols-1 xl:grid-cols-2"
                          : "grid-cols-1"
                      }`}
                      style={{ gap: "20px" }}
                    >
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg border border-[#c7c7c787]"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4 w-full">
                              <SkeletonLoader type="circle" width={48} height={48} />
                              <div className="flex-1">
                                <SkeletonLoader type="text" width="60%" height={20} style={{ marginBottom: 8 }} />
                                <SkeletonLoader type="text" width="40%" height={16} />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mb-4">
                            <SkeletonLoader type="rect" width={80} height={24} className="rounded-full" />
                            <SkeletonLoader type="rect" width={80} height={24} className="rounded-full" />
                          </div>
                          <div className="space-y-2">
                            <SkeletonLoader type="text" width="100%" />
                            <SkeletonLoader type="text" width="80%" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : state.jobList?.length > 0 ? (
                    <>
                      {(() => {
                        const isGridView = viewType === "grid" || !isWideScreen;
                        return (
                          <div
                            className={`grid mt-5 ${
                              isGridView
                                ? "grid-cols-1 xl:grid-cols-2"
                                : "grid-cols-1"
                            } ${
                              !isGridView &&
                              "bg-white px-5 border border-[#c7c7c787]"
                            }`}
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
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }, 100);
                                  } else {
                                    setSelectedJob(job);
                                    setState({ jobID: job.id });
                                    jobDetail(job.id);
                                    if (isDesktopScreen) setShowJobDetail(true);
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                                className="cursor-pointer transition-transform hover:scale-10"
                              >
                                {isGridView ? (
                                  <JobCard
                                    job={job}
                                    updateList={() => jobList(state?.page)}
                                    onCollegeClick={(e, id) =>
                                      getCollege(e, id)
                                    }
                                    onDepartmentClick={(e, id) =>
                                      getDepartment(e, id)
                                    }
                                  />
                                ) : (
                                  <NewJobCard
                                    job={job}
                                    updateList={() => jobList(state?.page)}
                                    onCollegeClick={(e, id) =>
                                      getCollege(e, id)
                                    }
                                    onDepartmentClick={(e, id) =>
                                      getDepartment(e, id)
                                    }
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      {(state.next || state?.prev) && (
                        <div className="flex justify-end items-center mt-10">
                          <PaginationComTwo
                            activeNumber={handlePageChange}
                            totalPage={state.count}
                            currentPages={state.page}
                            pageSize={state.pageSize}
                          />
                        </div>
                      )}
                    </>
                  ) : !state.loading && state.jobList?.length === 0 ? (
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
                        onClick={handleClearFilters}
                      >
                        Clear all filters
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[100vh] ">
                      <Loader className="animate-spin h-10 w-10 text-[#1d1d57]" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Job Detail Sheet */}
            {isMobileScreen && (
              <Sheet
                open={!!selectedJob}
                onOpenChange={() => setSelectedJob(null)}
              >
                <SheetContent
                  side="bottom"
                  className="h-[90vh] rounded-t-3xl flex flex-col"
                >
                  {selectedJob && (
                    <>
                      <div className="flex-1 overflow-y-auto space-y-6 pb-20">
                        <SheetHeader>
                          <div className="flex items-start gap-4">
                            {state.jobDetail?.college?.college_logo ? (
                              <img
                                src={state.jobDetail.college?.college_logo}
                                alt={state.jobDetail.college?.name}
                                className="w-10 h-10 rounded-lg object-contain"
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              />
                            ) : (
                              <div
                                className={`w-10 h-10 rounded-lg ${getAvatarColor(
                                  state.jobDetail?.college?.name,
                                )} flex items-center justify-center text-white bg-gray-400 font-semibold text-sm`}
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              >
                                {state.jobDetail?.college?.name
                                  ?.slice(0, 1)
                                  .toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 text-left">
                              <SheetTitle className="text-xl font-bold text-gray-900 text-left">
                                {capitalizeFLetter(state.jobDetail?.job_title)}
                              </SheetTitle>
                              <p
                                className="text-gray-600 text-left"
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              >
                                {state.jobDetail?.college?.name}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                {/* <Star className="w-4 h-4 text-amber-400 fill-current" /> */}
                                <span className="text-sm text-gray-600">
                                  {moment(state.jobDetail?.created_at).isValid()
                                    ? moment(
                                        state.jobDetail?.created_at,
                                      ).fromNow()
                                    : "Just now"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </SheetHeader>

                        <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2 bg-clr2 px-2 py-1 rounded text-xs">
                            <Briefcase className="w-3 h-3 text-[#E6AB1D]" />
                            <span>{state.jobDetail?.experiences?.name} </span>
                          </div>
                          {/* <div className="flex items-center gap-1 bg-clr2 px-2 py-1 rounded text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{state.jobDetail?.job_type_obj?.name}</span>
                      </div> */}
                          <div className="flex items-center gap-2 bg-clr2 px-2 py-1 rounded text-xs">
                            <IndianRupee className="w-3 h-3 text-[#E6AB1D]" />
                            <span>
                              {state.jobDetail?.salary_range_obj?.name}
                            </span>
                          </div>
                          {state?.jobDetail?.college?.address && (
                            <div className="flex items-center gap-2 bg-clr2 px-2 py-1 rounded text-xs">
                              <MapPin className="w-3 h-3 text-[#E6AB1D]" />
                              <span>
                                {state.jobDetail?.locations
                                  ?.map((item) => item.city)
                                  .join(", ")}
                                {/* {state?.jobDetail?.college?.address} */}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="leading-relaxed space-y-6 ">
                            {state?.jobDetail?.department?.length > 0 && (
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                  Departments
                                </h3>

                                <div className="flex flex-wrap gap-3 mb-5">
                                  {state?.jobDetail?.department?.map(
                                    (item, index) => (
                                      <button
                                        key={index}
                                        onClick={(e) =>
                                          getDepartment(e, item.id)
                                        }
                                        className="px-3 py-1 text-xs leading-relaxed rounded-full 
                       bg-blue-50 text-[#1d1d57] 
                       border border-blue-100
                       hover:bg-[#1d1d57] hover:text-white
                       transition-all duration-200"
                                      >
                                        {item.name}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3">
                            Job Description
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {state.jobDetail?.job_description}
                          </p>
                        </div>

                        {state?.responsibilities?.length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                              Key Responsibilities
                            </h3>
                            <div className="space-y-2">
                              {state.responsibilities?.map(
                                (responsibility, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <Check className="w-5 h-5 text-[#F2B31D] mt-1 flex-shrink-0 text-sm" />
                                    <p className="text-gray-600 text-sm">
                                      {responsibility}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* {state?.jobDetail?.requirements && (
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                              Requirements
                            </h3>
                            <div className="space-y-2">
                              {state?.jobDetail?.requirements?.map(
                                (requirements, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-600 text-sm">
                                      {requirements}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )} */}

                        {/* {state?.jobDetail?.skills && (
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
                        )} */}

                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3">
                            Job Overview
                          </h3>

                          <div className="space-y-3">
                            {/* <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            Job type
                          </p>
                          <p className="text-sm text-gray-900">
                            {state.jobDetail?.job_type_obj?.name}
                          </p>
                        </div> */}
                            <div>
                              <span className=" flex gap-2 text-sm font-medium  pb-1">
                                <Workflow className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                Job Title
                              </span>
                              <p className="text-sm text-gray-500  ps-6">
                                {capitalizeFLetter(state?.jobDetail?.job_title)}
                              </p>
                            </div>
                            <div>
                              <span className=" flex gap-2 text-sm font-medium  pb-1">
                                <Briefcase className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                Experience level
                              </span>
                              <p className="text-sm text-gray-500  ps-6">
                                {state?.jobDetail?.experiences?.name}
                              </p>
                            </div>
                            <div>
                              <span className="flex gap-2 text-sm font-medium  pb-1">
                                <IndianRupee className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                Salary
                              </span>
                              <p className="text-sm text-gray-500 ps-6">
                                {state?.jobDetail?.salary_range_obj?.name}
                              </p>
                            </div>

                            <div>
                              <span className="flex gap-2 text-md font-medium  pb-1">
                                <Building2 className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                Department
                              </span>
                              <p className="text-md text-gray-500 ps-6">
                                {state?.jobDetail?.department?.map(
                                  (item, index) => (
                                    <div
                                      key={index}
                                      className="text-sm text-gray-500"
                                    >
                                      <span
                                        className="text-sm text-gray-500 hover:text-[#1d1d57] cursor-pointer hover:underline"
                                        onClick={(e) =>
                                          getDepartment(e, item.id)
                                        }
                                      >
                                        {item.name}
                                      </span>
                                      {index <
                                        state.jobDetail.department.length - 1 &&
                                        ", "}
                                    </div>
                                  ),
                                )}
                              </p>
                            </div>
                            {state?.jobDetail?.college?.address && (
                              <div>
                                <span className="flex gap-2 text-sm font-medium  pb-1">
                                  <MapPin className="w-4 h-4 mt-1 text-[#E6AB1D]" />{" "}
                                  Location
                                </span>
                                <p className="text-sm text-gray-500  ps-6">
                                  {state?.jobDetail?.locations
                                    ?.map((item) => item.city)
                                    .join(", ")}
                                  {/* {state?.jobDetail?.college?.address} */}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {state?.jobDetail?.job_image && (
                          <div
                            className="pt-4 cursor-pointer"
                            onClick={() => {
                              setSelectedJob(null);
                              setState({ imgOpen: true });
                            }}
                          >
                            <img
                              src={state?.jobDetail?.job_image}
                              alt={state?.jobDetail?.job_title}
                              className="w-100 max-h-[400px]"
                            />
                          </div>
                        )}

                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3">
                            About
                          </h3>
                          <div className="flex items-start gap-3 mb-4">
                            {state.jobDetail?.college?.college_logo ? (
                              <img
                                src={state.jobDetail?.college?.college_logo}
                                alt={state.jobDetail?.college?.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              />
                            ) : (
                              <div
                                className={`w-12 h-12 rounded-lg ${getAvatarColor(
                                  state.jobDetail?.college?.name,
                                )} flex items-center justify-center text-white bg-gray-400 font-semibold`}
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              >
                                {state.jobDetail?.college?.name
                                  ?.slice(0, 1)
                                  .toUpperCase()}
                              </div>
                            )}
                            <div>
                              <h4
                                className="font-medium text-gray-900"
                                onClick={(e) =>
                                  getCollege(e, state?.jobDetail.college?.id)
                                }
                              >
                                {state.jobDetail?.college?.name}
                              </h4>
                              {/* <p className="text-sm text-gray-500">
                                Technology Company
                              </p> */}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedJob(null);
                              window.scrollTo({ top: 0, behavior: "smooth" });

                              router.push(
                                `/jobs?college=${state?.jobDetail?.college?.id}`,
                              );
                            }}
                            className="px-6 py-2 rounded-full text-sm font-medium transition-colors bg-[#01014B] text-white group-hover:bg-[#F2B31D] group-hover:text-black"
                          >
                            {state?.jobDetail?.college?.total_jobs || 0}{" "}
                            Openings
                          </button>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {state.jobDetail?.company_detail}
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-clr1 border-t">
                        <button
                          onClick={() => {
                            setState({ jobID: state.jobDetail?.id });
                            handleApply();
                          }}
                          className="bg-[#1d1d57] w-full py-3 text-md border border-xl border-[#1d1d57] rounded rounded-3xl  px-6 py-1  hover:bg-[#1d1d57] transition-colors text-white hover:text-white"

                          // className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg"
                        >
                          {state.jobDetail?.apply_link
                            ? " Apply on company's site"
                            : " Apply Now"}
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
              title={capitalizeFLetter(selectedJob?.job_title)}
              width="700px"
              renderComponent={() => (
                <div className="space-y-6 bg-[#EFF2F6] overflow-y-auto py-5 px-2 max-h-[85vh] ">
                  <div className="flex items-center justify-center w-full mb-6">
                    <img
                      src="/assets/images/recruitmen.gif"
                      height={200}
                      width={150}
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
                      onChange={(e) =>
                        handleFormChange("lastName", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
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

                  <div className="space-y-2">
                    <CustomSelect
                      // title="Experience"
                      required
                      className="border border-gray-200 bg-white placeholder:!text-gray-500 placeholder:!text-sm"
                      options={state.experienceList}
                      value={state?.experience || ""}
                      onChange={(selected) =>
                        setState({
                          ...state,
                          experience: selected ? selected.value : "",
                        })
                      }
                      error={state?.errors?.experience}
                      placeholder="Experience"
                    />
                  </div>

                  {state.jobDetail?.department?.length > 0 && (
                    <CustomSelect
                      label="Choose Department"
                      options={state.jobDetail.department.map((d) => ({
                        value: d.id,
                        label: d.name,
                      }))}
                      className="border border-gray-200 bg-white placeholder:!text-gray-500 placeholder:!text-sm"
                      value={state.department_id}
                      onChange={(selected) =>
                        handleFormChange(
                          "department_id",
                          selected ? selected.value : null,
                        )
                      }
                      placeholder="Select a department"
                      disabled={state.jobDetail.department.length <= 1}
                      error={state.errors.department_id}
                    />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextArea
                      placeholder="Your message..."
                      value={state.message}
                      onChange={(e) =>
                        handleFormChange("message", e.target.value)
                      }
                      className="min-h-[150px] bg-white"
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
                      className="px-12 py-3 bg-[#1d1d57] hover:bg-[#1d1d57] text-white font-semibold rounded-full"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            />

            {state.imgOpen && (
              <LightboxGallery
                isOpen={state.imgOpen}
                onClose={() => {
                  if (isMobileScreen) {
                    setSelectedJob(state.jobDetail);
                  }
                  setState({ imgOpen: false });
                }}
                images={[state?.jobDetail?.job_image]}
              />
            )}
            <Modal
              isOpen={state.congratsOpen}
              setIsOpen={() => {
                setState({ errors: {}, congratsOpen: false });
              }}
              title="Job Application Success"
              width="750px"
              hideHeader={true}
              renderComponent={() => (
                <div className="relative min-h-[500px] bg-[#f3f4f6] flex flex-col items-center justify-center text-center p-12 overflow-hidden">
                  {/* Large background circles */}
                  <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-gray-300 opacity-30 rounded-full"></div>
                  <div className="absolute -top-20 right-[-100px] w-[380px] h-[380px] bg-gray-300 opacity-30 rounded-full"></div>

                  {/* Small decorative circles */}
                  <div className="absolute top-24 left-32 w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="absolute top-28 right-40 w-4 h-4 bg-[#01014B] rounded-full"></div>
                  <div className="absolute bottom-32 left-40 w-3 h-3 bg-gray-300 rounded-full"></div>

                  {/* Success star badge */}
                  <div className="relative mb-8 z-10">
                    <div className="w-40 h-40 relative">
                      <img
                        src="/assets/images/job-check.png"
                        alt="Success Star"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-6 z-10">
                    Congrats, your job applied!
                  </h2>

                  <p className="text-gray-600 mb-12 max-w-lg text-lg leading-relaxed z-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur dignissim rutrum dui quis malesuada.
                  </p>
                </div>
              )}
            />
            <Modal
              isOpen={state.showCollegeModal}
              setIsOpen={() => {
                setState({ showCollegeModal: false, collegeDetail: null });
              }}
              title="College Details"
              width="700px"
              renderComponent={() => (
                <div className="p-4 sm:p-5 md:p-6 space-y-5 md:space-y-6 max-h-[75vh] overflow-y-auto">
                  {state.loading ? (
                    <div className="space-y-6">
                      <div className="flex gap-4 items-center border-b pb-4">
                        <SkeletonLoader type="rect" width={80} height={80} className="rounded-xl" />
                        <div className="flex-1">
                          <SkeletonLoader type="text" width="60%" height={24} style={{ marginBottom: 8 }} />
                          <SkeletonLoader type="text" width="40%" height={16} />
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <SkeletonLoader type="text" count={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <SkeletonLoader type="rect" height={80} className="rounded-xl" />
                        <SkeletonLoader type="rect" height={80} className="rounded-xl" />
                      </div>
                      <SkeletonLoader type="text" count={4} />
                    </div>
                  ) : (
                    <>
                      {/* ================= College Header ================= */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 pb-4 md:pb-5 border-b text-center sm:text-left">
                        {state.collegeDetail?.college_logo ? (
                          <img
                            src={state.collegeDetail.college_logo}
                            alt={state.collegeDetail.college_name}
                            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl object-cover border shadow-sm"
                          />
                        ) : (
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl ${getAvatarColor(
                              state.collegeDetail?.college_name,
                            )} flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl shadow`}
                          >
                            {state.collegeDetail?.college_name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                        )}

                        <div>
                          <h2 className="text-xl sm:text-2xl font-semibold text-[#1d1d57]">
                            {state.collegeDetail?.college_name}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {state.collegeDetail?.institution_name}
                          </p>
                        </div>
                      </div>

                      {/* ================= Contact Info ================= */}
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 sm:mb-3">
                          Contact Info
                        </h3>

                        <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MailIcon className="w-4 h-4 text-[#F2B31D]" />
                            <span className="truncate">
                              {state.collegeDetail?.college_email}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <PhoneCall className="w-4 h-4 text-[#F2B31D]" />
                            {state.collegeDetail?.college_phone}
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#F2B31D]" />
                            <span className="line-clamp-2">
                              {state.collegeDetail?.college_address}
                            </span>
                          </div>

                          <div className="flex items-start gap-2">
                            <Building className="w-4 h-4 text-[#F2B31D] " />
                            <span className="line-clamp-2">
                              {state.collegeDetail?.college_types
                                ?.map((item) => item?.name)
                                ?.join(" ,")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ================= NAAC Accreditation ================= */}
                      {state.collegeDetail?.naac_accreditations?.length > 0 && (
                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-5 md:p-6">
                          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3 md:mb-4 text-center sm:text-left">
                            <img
                              src="/assets/images/naac.png"
                              alt="NAAC Logo"
                              className="h-10 sm:h-12 object-contain"
                            />
                            <h3 className="text-base sm:text-lg font-semibold text-[#1d1d57]">
                              NAAC & Accreditation
                            </h3>
                          </div>

                          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                            {state.collegeDetail?.naac_accreditations?.map(
                              (item, index) => (
                                <span
                                  key={index}
                                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-700"
                                >
                                  {item.grade}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* ================= NIRF Details ================= */}
                      {(state.collegeDetail?.nirf_band ||
                        state.collegeDetail?.nirf_categories?.length > 0) && (
                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-5 md:p-6">
                          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3 md:mb-4 text-center sm:text-left">
                            <img
                              src="/assets/images/nirf.png"
                              alt="NIRF Logo"
                              className="h-6 sm:h-8 object-contain"
                            />
                            <h3 className="text-base sm:text-lg font-semibold text-[#1d1d57]">
                              NIRF Rankings
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center sm:justify-start">
                            {state.collegeDetail?.nirf_band?.is_active && (
                              <span className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-700">
                                Band: {state.collegeDetail?.nirf_band?.band}
                              </span>
                            )}

                            {state.collegeDetail?.nirf_categories?.map(
                              (item) =>
                                item.is_active ? (
                                  <span
                                    key={item.id}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-700"
                                  >
                                    {item.category}
                                  </span>
                                ) : null,
                            )}
                          </div>
                        </div>
                      )}

                      {/* ================= Stats ================= */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        {state.collegeDetail?.intake_per_year && (
                          <div className="bg-[#1d1d57] text-white rounded-xl p-4 md:p-5 text-center">
                            <p className="text-sm sm:text-lg font-semibold text-[#fff]">
                              Intake Per Year
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1">
                              {state.collegeDetail?.intake_per_year}
                            </h3>
                          </div>
                        )}

                        {state.collegeDetail?.total_strength && (
                          <div className="bg-[#F2B31D] text-white rounded-xl p-4 md:p-5 text-center">
                            <p className="text-sm sm:text-lg font-semibold text-[#fff]">
                              Total Strength
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1">
                              {state.collegeDetail?.total_strength}
                            </h3>
                          </div>
                        )}
                      </div>

                      {/* ================= Achievements ================= */}
                      {state.collegeDetail?.recent_achievements && (
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                            Achievements
                          </h4>

                          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                            {state.collegeDetail?.recent_achievements?.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <Award className="w-5 h-5 text-[#F2B31D] shrink-0" />
                                  {item.achievement}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}

                      {/* ================= Summary ================= */}
                      {state.collegeDetail?.summary && (
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                          <h4 className="font-semibold mb-2 text-gray-800 text-sm sm:text-base">
                            Summary
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            {state.collegeDetail?.summary}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            />
            {state.departmentDetail && (
              <Modal
                isOpen={state.showDepartmentModal}
                setIsOpen={() => {
                  setState({
                    showDepartmentModal: false,
                    departmentDetail: null,
                  });
                }}
                title="Department Details"
                width="700px"
                renderComponent={() => (
                  <div className="p-5 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-h-[75vh] overflow-y-auto">
                    {state.loading ? (
                      <div className="space-y-6">
                        <div className="border-b pb-4">
                          <SkeletonLoader type="text" width="70%" height={32} style={{ marginBottom: 8 }} />
                          <SkeletonLoader type="text" width="40%" height={16} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <SkeletonLoader type="rect" height={100} className="rounded-2xl" />
                          <SkeletonLoader type="rect" height={100} className="rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                          <SkeletonLoader type="text" width="30%" height={24} style={{ marginBottom: 12 }} />
                          <SkeletonLoader type="text" count={3} />
                        </div>
                      </div>
                    ) : (
                      state.departmentDetail && (
                        <>
                          {/* ================= Header ================= */}
                          <div className="pb-4 md:pb-6 border-b text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d57]">
                              {state.departmentDetail.department_name}
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              {state.departmentDetail.college_name}
                            </p>
                          </div>

                          {/* ================= Stats Section ================= */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {state.departmentDetail.nba_accreditation && (
                              <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5 md:p-6">
                                <div className="flex items-center gap-3 mb-3">
                                  <img
                                    src="/assets/images/nba.png"
                                    alt="NBA Logo"
                                    className="h-6 sm:h-8 object-contain"
                                  />
                                  <p className="text-base sm:text-lg font-semibold text-[#1d1d57]">
                                    NBA Accreditation
                                  </p>
                                </div>

                                <span className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-700">
                                  Accredited
                                </span>
                              </div>
                            )}

                            {state.departmentDetail.intake_per_year && (
                              <div className="bg-[#1d1d57] text-white rounded-2xl p-5 md:p-6 text-center shadow-sm">
                                <p className="text-sm sm:text-lg font-semibold text-[#fff]">
                                  Intake Per Year
                                </p>
                                <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                                  {state.departmentDetail.intake_per_year}
                                </h3>
                              </div>
                            )}
                          </div>

                          {/* ================= Achievements ================= */}
                          {state.departmentDetail.recent_achievements?.length >
                            0 && (
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-[#1d1d57] mb-3 sm:mb-4">
                                Recent Achievements
                              </h3>

                              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                                {state.departmentDetail.recent_achievements?.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <Award className="w-5 h-5 text-[#F2B31D] shrink-0" />
                                      {item.achievement}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}

                          {/* ================= Summary ================= */}
                          {state.departmentDetail.summary && (
                            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 md:p-6">
                              <h3 className="text-base sm:text-lg font-semibold text-[#1d1d57] mb-2 sm:mb-3">
                                Summary
                              </h3>

                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                {state.departmentDetail.summary}
                              </p>
                            </div>
                          )}
                        </>
                      )
                    )}
                  </div>
                )}
              />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
