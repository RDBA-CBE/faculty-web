import React, { useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dropdown, useSetState } from "@/utils/function.utils";
import Models from "@/imports/models.import";
import CustomSelect from "../dropdown";

const SplitBanner = () => {
  const router = useRouter();
  const [state, setState] = useSetState({
    search: "",
    location: "",
    colleges: [],
    locationList: [],
  });

  useEffect(() => {
    loadLocationFilterOptions(1);
    collegeList();
    JobCatList();
    JobRoleList();
    departmentList();
  }, []);

  useEffect(() => {
    if (state?.jobCatList?.length) {
      setFilteredJobCategories();
    }
  }, [state?.jobCatList]);

  const loadLocationFilterOptions = async (
    page = 1,
    search = "",
    loadMore = false,
  ) => {
    try {
      setState({ locationListLoading: true });
      const body: any = { search, page };
      const res: any = await Models.location.list(page, body);
      const dropdown: any = Dropdown(res?.results, "city");
      setState({
        locationListLoading: false,
        locationListPage: page,
        locationList: loadMore
          ? [...state.locationList, ...dropdown]
          : dropdown,
        locationListNext: res?.next,
      });
    } catch (error) {
      console.error("Error loading location options:", error);
      setState({ locationListLoading: false });
    }
  };

  const handleLoadMoreLocations = () => {
    if (state.locationListNext && !state.locationListLoading) {
      loadLocationFilterOptions((state.locationListPage || 1) + 1, "", true);
    }
  };

  const JobCatList = async () => {
    try {
      const res: any = await Models.category.list();
      const dropdown: any = Dropdown(res?.results, "name");
      setState({
        jobCatList: dropdown,
      });
    } catch (error) {
      console.log("error fetching locations", error);
    }
  };

  const setFilteredJobCategories = () => {
    try {
      const allowedCategories = ["Engineering", "Arts and Science", "Nursing"];

      const filteredList = state?.jobCatList?.filter((item: any) =>
        allowedCategories.includes(item.label),
      );

      setState({
        filteredJobCatList: filteredList,
      });
    } catch (error) {
      console.log("✌️ Error filtering job categories --->", error);
    }
  };

  const loadJobRoleOptions = async (
    page = 1,
    search = "",
    loadMore = false,
  ) => {
    try {
      setState({ jobRoleListLoading: true });
      const res: any = await Models.category.jobRoleList(page, search);
      const dropdown: any = Dropdown(res?.results, "role_name");
      setState({
        jobRoleListLoading: false,
        jobRoleListPage: page,
        jobRoleList: loadMore ? [...state.jobRoleList, ...dropdown] : dropdown,
        jobRoleListNext: res?.next,
      });
    } catch (error) {
      console.log("error fetching job roles", error);
      setState({ jobRoleListLoading: false });
    }
  };

  const JobRoleList = () => loadJobRoleOptions(1);

  const handleLoadMoreJobRoles = () => {
    if (state.jobRoleListNext && !state.jobRoleListLoading) {
      loadJobRoleOptions((state.jobRoleListPage || 1) + 1, "", true);
    }
  };

  const collegeList = async () => {
    try {
      const res: any = await Models.colleges.list();
      const dropdown = Dropdown(res?.results, "name");
      setState({
        collgeList: dropdown,
      });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const loadDepartmentOptions = async (
    page = 1,
    search = "",
    loadMore = false,
  ) => {
    try {
      setState({ departmentListLoading: true });
      const res: any = await Models.department.masterDep(page);
      const dropdown = Dropdown(res?.results, "name");
      setState({
        departmentListLoading: false,
        departmentListPage: page,
        departmentList: loadMore
          ? [...state.departmentList, ...dropdown]
          : dropdown,
        departmentListNext: res?.next,
      });
    } catch (error) {
      console.log("✌️error --->", error);
      setState({ departmentListLoading: false });
    }
  };

  console.log("departmentListNext", state?.departmentList);

  const departmentList = () => loadDepartmentOptions(1);

  const handleLoadMoreDepartments = () => {
    if (state.departmentListNext && !state.departmentListLoading) {
      loadDepartmentOptions((state.departmentListPage || 1) + 1, "", true);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    // if (state.search) params.append("search", state.search);
    // if (state.JobCat) params.append("job-category", state.JobCat);
    if (state.location) params.append("location", state.location);
    if (state.department) params.append("department", state.department);
    if (state.jobRole) params.append("job-role", state.jobRole);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleScrollToHR = () => {
    const section = document.getElementById("institutionalHR");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  console.log("jobCatList", state?.jobCatList);

  return (
    <section className="relative h-fit md:h-[95vh] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/banner-1.png"
          alt="Background"
          fill
          className="object-cover object-bottom w-full h-full"
          priority
        />
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="section-wid h-full  mx-auto  py-16 lg:py-0   relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 xl:gap-12 2xl:gap-16  h-full">
          {/* Left Content - Aligned to bottom */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-center">
            {/* Heading */}
            <div className="space-y-5">
              <h1 className="text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] leading-[50px] lg:leading-[66px] xl:leading-[60px] font-semibold text-white">
                Are You A Faculty? <br /> Find Your Right Oppurtunity
              </h1>
              {/* <p className="text-[#F0F0F0CC] max-w-xl text-base lg:text-lg leading-relaxed">
                FacultyPro connects qualified academic professionals with
                reputed colleges and universities seeking excellence in
                teaching, research, and institutional development. Explore
                verified opportunities and take the next step in your
                professional journey
              </p> */}
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-[40px] shadow-lg p-4 sm:p-2 flex flex-col sm:flex-row gap-4 sm:gap-0 items-stretch sm:items-center max-w-full lg:max-w-3xl">
              {/* <input
                type="text"
                placeholder="Job Title or College"
                className="w-full sm:flex-1 px-3 py-2 sm:px-6 sm:py-3 focus:outline-none text-base sm:text-base rounded-full sm:rounded-l-full sm:rounded-r-none border-b sm:border-b-0 border-gray-100 placeholder:text-[#373535]"
                value={state.search}
                onChange={(e) => setState({ search: e.target.value })}
              /> */}
              {/* <div className="w-[25%]">
                <CustomSelect
                  className="w-full placeholder:text-[#373535]  px-3 py-2 sm:px-2 xl:px-4 sm:py-3 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700 overflow-hidden"
                  placeholder="Job Category"
                  options={state.jobCatList}
                  value={state?.JobCat || ""}
                  onChange={(selected) =>
                    setState({
                      ...state,
                      JobCat: selected ? selected.value : "",
                    })
                  }
                />
              </div> */}

              <div className="md:w-[25%]">
                <CustomSelect
                  className="w-max-[50px] placeholder:text-[#373535]  px-3 py-1 sm:px-2 xl:px-4 sm:py-2 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700"
                  placeholder="Location"
                  options={state.locationList}
                  value={state?.location || ""}
                  onChange={(selected) =>
                    setState({
                      ...state,
                      location: selected ? selected.value : "",
                    })
                  }
                  // onChange={(selected) =>
                  //   setState({
                  //     ...state,
                  //     location: selected, // array
                  //   })
                  // }
                  // isMulti
                  loadMore={handleLoadMoreLocations}
                  loading={state.locationListLoading}
                />
              </div>

              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

              <div className="md:w-[25%]">
                <CustomSelect
                  className="w-full placeholder:text-[#373535]  px-3 py-1 sm:px-2 xl:px-4 sm:py-2 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700 overflow-hidden"
                  placeholder="Job Department"
                  options={state.departmentList}
                  value={state?.department || ""}
                  onChange={(selected) =>
                    setState({
                      ...state,
                      department: selected ? selected.value : "",
                    })
                  }
                  loadMore={handleLoadMoreDepartments}
                  loading={state.departmentListLoading}
                />
              </div>

              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

              <div className="md:w-[25%]">
                <CustomSelect
                  className="w-max-[50px] placeholder:text-[#373535]  px-3 py-1 sm:px-2 xl:px-4 sm:py-2 bg-transparent text-base sm:text-base rounded-full sm:rounded-none border-none appearance-none cursor-pointer text-gray-700"
                  placeholder="Job role"
                  options={state.jobRoleList}
                  value={state?.jobRole || ""}
                  onChange={(selected) =>
                    setState({
                      ...state,
                      jobRole: selected ? selected.value : "",
                    })
                  }
                  loadMore={handleLoadMoreJobRoles}
                  loading={state.jobRoleListLoading}
                />
              </div>

              <button
                className="w-full sm:w-auto bg-[#F2B31D] text-black  md:px-5 py-3 sm:py-2 rounded-full flex items-center justify-center gap-2 hover:bg-[#e0a519] transition text-sm md:text-base font-semibold whitespace-nowrap"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5" />
                Search Job
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-start gap-4 md:gap-8 lg:gap-12 pt-8 md:pt-2">
              {/* {state?.filteredJobCatList?.map((item: any, i) => ( */}
              <div>
                <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white mb-1">
                  100+
                </div>
                <div className="text-white text-sm">
                  Engineering Colleges <br /> Requirement
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white mb-1">
                  70+
                </div>
                <div className="text-white text-sm">
                  Arts Colleges
                  <br /> Requirement
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-white mb-1">
                  80+
                </div>
                <div className="text-white text-sm">
                  Pharmacy Colleges
                  <br /> Requirement
                </div>
              </div>
              {/* ))} */}
            </div>

            <h1 className="text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] leading-[50px] lg:leading-[66px] xl:leading-[60px] font-semibold text-white">
              Are You Institutional HR?
            </h1>

            <p
              className="group relative inline-flex text-white items-center gap-2 text-sm md:text-base font-medium whitespace-nowrap cursor-pointer"
              onClick={handleScrollToHR}
            >
              <span className="relative text-white">
                Access HR Portal
                {/* underline */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-white origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 text-white"></span>
              </span>

              <ArrowRight className="w-3 h-3" />
            </p>
          </div>

          {/* Right Image - Aligned to bottom */}
          <div className="relative hidden lg:flex justify-end items-end h-full">
            <div className="relative w-full h-full flex items-end justify-end">
              <Image
                src="/assets/images/banner_logo.png"
                alt="Hero Banner"
                width={800}
                height={800}
                className="object-contain object-bottom w-auto h-[300px] sm:h-[550px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div> */}
    </section>
  );
};

export default SplitBanner;
