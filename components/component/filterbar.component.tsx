"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X, Search, ArrowRight } from "lucide-react";
import {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  POSTED_DATE_OPTIONS,
  TAGS,
} from "@/utils/constant.utils";
import PriceRangeSlider from "../common-components/priceRange";
import { CharSlice } from "@/utils/function.utils";
import SkeletonLoader from "@/app/jobs/SkeletonLoader";

interface CategoryItem {
  value: number;
  label: string;
}

interface SidebarProps {
  filters: {
    categories: any[];
    jobTypes: any[];
    experienceLevels: any[];
    datePosted: any[];
    salaryRange: any[];
    tags: any[];
    colleges: any[];
    department: any[];
    minExperience?: string;
    maxExperience?: string;
    jobRole?: any[];
    locations?: any[];
    jobRoleList: any[];
  };
  onFilterChange: (newFilters: any) => void;
  categoryList?: CategoryItem[];
  locationList?: any[];
  jobTypeList?: any[];
  experienceList?: any[];
  datePostedList?: any[];
  salaryRangeList?: any[];
  tagsList?: any[];
  collegeList?: any[];
  deptList?: any[];
  loading?: boolean;
  jobRoleList: any[];
}

const FilterSection: React.FC<{
  title: string;
  items: { value: number | string; label: string }[];
  counts?: number[];
  selected?: (number | string)[];
  onToggle: (value: number | string) => void;
}> = ({ title, items, counts, selected = [], onToggle }) => (
  <div>
    <h3 className="text-md font-semibold text-[#000] mb-3 pt-[15px]">
      {title}
    </h3>

    <div className="space-y-2">
      {items.map((item, idx) => (
        <label
          key={item.value}
          className="flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selected?.includes(item.value)}
              onChange={() => onToggle(item.value)}
              className="w-4 h-4 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
            />
            <span className="text-[15px] text-[#000] group-hover:text-slate-900 transition-colors ">
              {/* {item.label} */}
              {CharSlice(item.label, 32)}
            </span>
          </div>

          {counts && <span className="text-xs text-[#000]">{counts[idx]}</span>}
        </label>
      ))}
    </div>
  </div>
);

const FilterSectionRadio: React.FC<{
  title: string;
  items: { value: number | string; label: string }[];
  selected: any;
  name: string;
  onChange: (value: number | string | null) => void;
}> = ({ title, items, selected, name, onChange }) => (
  <div>
    <h3 className="text-md font-semibold text-[#000] mb-3 pt-[15px]">
      {title}
    </h3>

    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item.value}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            checked={selected === item.value}
            onClick={() =>
              onChange(selected === item.value ? null : item.value)
            }
            onChange={() => {}} // 👈 required by React
            className="w-4 h-4 text-amber-500 border-slate-200 focus:ring-amber-400"
          />
          <span className="text-[15px] text-slate-600">{item.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const FilterSectionString: React.FC<{
  title: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}> = ({ title, items, selected, onToggle }) => (
  <div>
    <h3 className="text-md font-semibold text-[#000] mb-3 pt-[15px]">
      {title}
    </h3>

    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item} // ✅ string key
          className="flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => onToggle(item)}
              className="w-4 h-4 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
            />
            <span className="text-md text-slate-600 group-hover:text-slate-900 transition-colors">
              {item}
            </span>
          </div>
        </label>
      ))}
    </div>
  </div>
);

// Portal component to render popups outside the sidebar hierarchy
const PopupPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

const Filterbar: React.FC<SidebarProps> = ({
  filters,
  onFilterChange,
  categoryList,
  locationList,
  jobTypeList,
  experienceList,
  collegeList,
  datePostedList,
  salaryRangeList,
  tagsList,
  deptList,
  loading,
  jobRoleList,
}) => {
  console.log("✌️locationList --->", locationList);

  const [showAllColleges, setShowAllColleges] = useState(false);
  const [showAllDept, setShowAllDept] = useState(false);
  const [showAllJobRoles, setShowAllJobRoles] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(false);

  const [collegeSearchQuery, setCollegeSearchQuery] = useState("");
  const [deptSearchQuery, setDeptSearchQuery] = useState("");
  const [jobRoleSearchQuery, setJobRoleSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [selectedAlphabet, setSelectedAlphabet] = useState("");

  const [collegePopupPos, setCollegePopupPos] = useState({
    left: 0,
    top: -200,
  });
  const [deptPopupPos, setDeptPopupPos] = useState({ left: 0, top: -200 });
  const [jobRolePopupPos, setJobRolePopupPos] = useState({
    left: 0,
    top: -200,
  });
  const [categoryPopupPos, setCategoryPopupPos] = useState({
    left: 0,
    top: -200,
  });
  const [locationPopupPos, setLocationPopupPos] = useState({
    left: 0,
    top: -200,
  });

  const collegePopupRef = useRef<HTMLDivElement>(null);
  const deptPopupRef = useRef<HTMLDivElement>(null);
  const jobRolePopupRef = useRef<HTMLDivElement>(null);
  const categoryPopupRef = useRef<HTMLDivElement>(null);
  const locationPopupRef = useRef<HTMLDivElement>(null);
  const collegeButtonRef = useRef<HTMLButtonElement>(null);
  const deptButtonRef = useRef<HTMLButtonElement>(null);
  const jobRoleButtonRef = useRef<HTMLButtonElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);
  const locationButtonRef = useRef<HTMLButtonElement>(null);
  const collegeSectionRef = useRef<HTMLDivElement>(null);
  const deptSectionRef = useRef<HTMLDivElement>(null);
  const jobRoleSectionRef = useRef<HTMLDivElement>(null);
  const categorySectionRef = useRef<HTMLDivElement>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);

  const [salarySliderRange, setSalarySliderRange] = useState<[number, number]>([
    0, 5000000,
  ]);
  const filtersRef = useRef(filters);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInternalChange = useRef(false);
  const alphabetRefs = useRef({});
  const listRef = useRef(null);

  const [minExp, setMinExp] = useState(filters.minExperience ?? "");
  const [maxExp, setMaxExp] = useState(filters.maxExperience ?? "");

  useEffect(() => {
    setMinExp(filters.minExperience ?? "");
    setMaxExp(filters.maxExperience ?? "");
  }, [filters.minExperience, filters.maxExperience]);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const parseSalaryLabel = useCallback((label: string) => {
    if (!label) return null;
    const normalized = label.replace(/,/g, "").toLowerCase();
    const rangeMatch = normalized.match(/(\d+)\s*-\s*(\d+)\s*lakhs?/);
    if (rangeMatch) {
      return {
        min: parseInt(rangeMatch[1]) * 100000,
        max: parseInt(rangeMatch[2]) * 100000,
      };
    }
    return null;
  }, []);

  const parseExperienceLabel = useCallback((label: string) => {
    if (!label) return null;
    const normalized = label.toLowerCase();

    // Handle "fresher"
    if (normalized.includes("fresh")) return { min: 0, max: 0 };

    // Handle "0-2 Years" or "1 - 3 Years"
    const rangeMatch = normalized.match(/(\d+)\s*-\s*(\d+)/);
    if (rangeMatch) {
      return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
    }

    // Handle "10+ Years"
    const plusMatch = normalized.match(/(\d+)\s*\+/);
    if (plusMatch) {
      return { min: parseInt(plusMatch[1]), max: 100 };
    }
    return null;
  }, []);

  const maxSalary = useMemo(() => {
    if (!salaryRangeList || salaryRangeList.length === 0) return 5000000;
    let max = 0;
    salaryRangeList.forEach((item) => {
      const parsed = parseSalaryLabel(item.label);
      if (parsed && parsed.max > max) max = parsed.max;
    });
    return max > 0 ? max : 5000000;
  }, [salaryRangeList, parseSalaryLabel]);

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    if (filters.salaryRange.length === 0) {
      setSalarySliderRange([0, maxSalary]);
    } else if (salaryRangeList && salaryRangeList.length > 0) {
      let min = maxSalary;
      let max = 0;
      let found = false;

      filters.salaryRange.forEach((id: number) => {
        const item = salaryRangeList.find((i) => i.value === id);
        if (item) {
          const parsed = parseSalaryLabel(item.label);
          if (parsed) {
            if (parsed.min < min) min = parsed.min;
            if (parsed.max > max) max = parsed.max;
            found = true;
          }
        }
      });

      if (found) {
        setSalarySliderRange([min, max]);
      }
    }
  }, [filters.salaryRange, salaryRangeList, maxSalary, parseSalaryLabel]);

  const handleSalarySliderChange = (range: [number, number]) => {
    isInternalChange.current = true;
    setSalarySliderRange(range);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (!salaryRangeList) return;

      const selectedIds = salaryRangeList.reduce((acc: number[], item) => {
        const parsed = parseSalaryLabel(item.label);
        if (parsed) {
          // A salary range option should be included if it overlaps with the slider's range.
          // We use strict inequalities (< and >) to ensure there is an actual overlap,
          // excluding ranges that just touch the boundaries (e.g., [1L, 2L] excludes "2-3L").
          if (parsed.min < range[1] && parsed.max > range[0]) {
            acc.push(item.value);
          }
        }
        return acc;
      }, []);

      onFilterChange({
        ...filtersRef.current,
        salaryRange: selectedIds,
      });
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collegePopupRef.current &&
        !collegePopupRef.current.contains(event.target as Node) &&
        collegeSectionRef.current &&
        !collegeSectionRef.current.contains(event.target as Node)
      ) {
        setShowAllColleges(false);
      }
    };

    if (showAllColleges) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllColleges]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        deptPopupRef.current &&
        !deptPopupRef.current.contains(event.target as Node) &&
        deptSectionRef.current &&
        !deptSectionRef.current.contains(event.target as Node)
      ) {
        setShowAllDept(false);
      }
    };

    if (showAllDept) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllDept]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        jobRolePopupRef.current &&
        !jobRolePopupRef.current.contains(event.target as Node) &&
        jobRoleSectionRef.current &&
        !jobRoleSectionRef.current.contains(event.target as Node)
      ) {
        setShowAllJobRoles(false);
      }
    };

    if (showAllJobRoles) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllJobRoles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationPopupRef.current &&
        !locationPopupRef.current.contains(event.target as Node) &&
        locationSectionRef.current &&
        !locationSectionRef.current.contains(event.target as Node)
      ) {
        setShowAllLocations(false);
      }
    };

    if (showAllLocations) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllLocations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryPopupRef.current &&
        !categoryPopupRef.current.contains(event.target as Node) &&
        categorySectionRef.current &&
        !categorySectionRef.current.contains(event.target as Node)
      ) {
        setShowAllCategories(false);
      }
    };

    if (showAllCategories) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllCategories]);

  // useEffect(() => {
  //   if (showAllColleges || showAllDept || showAllJobRoles || showAllCategories || showAllLocations) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [showAllColleges, showAllDept, showAllJobRoles, showAllCategories, showAllLocations]);

  const calculateCollegePopupPos = () => {
    if (collegeSectionRef.current) {
      const rect = collegeSectionRef.current.getBoundingClientRect();
      setCollegePopupPos({
        left: rect.left,
        top: rect.top + 8,
      });
    }
  };

  const calculateDeptPopupPos = () => {
    if (deptSectionRef.current) {
      const rect = deptSectionRef.current.getBoundingClientRect();
      setDeptPopupPos({
        left: rect.left,
        top: rect.top + 8,
      });
    }
  };

  const calculateJobRolePopupPos = () => {
    if (jobRoleSectionRef.current) {
      const rect = jobRoleSectionRef.current.getBoundingClientRect();
      setJobRolePopupPos({
        left: rect.left,
        top: rect.top + 8,
      });
    }
  };

  const calculateCategoryPopupPos = () => {
    if (categorySectionRef.current) {
      const rect = categorySectionRef.current.getBoundingClientRect();
      setCategoryPopupPos({
        left: rect.left,
        top: rect.top + 8,
      });
    }
  };

  const calculateLocationPopupPos = () => {
    if (locationSectionRef.current) {
      const rect = locationSectionRef.current.getBoundingClientRect();
      setLocationPopupPos({
        left: rect.left,
        top: rect.top + 8,
      });
    }
  };

  useEffect(() => {
    if (showAllColleges) {
      calculateCollegePopupPos();
      window.addEventListener("scroll", calculateCollegePopupPos);
      window.addEventListener("resize", calculateCollegePopupPos);
    }
    return () => {
      window.removeEventListener("scroll", calculateCollegePopupPos);
      window.removeEventListener("resize", calculateCollegePopupPos);
    };
  }, [showAllColleges]);

  useEffect(() => {
    if (showAllDept) {
      calculateDeptPopupPos();
      window.addEventListener("scroll", calculateDeptPopupPos);
      window.addEventListener("resize", calculateDeptPopupPos);
    }
    return () => {
      window.removeEventListener("scroll", calculateDeptPopupPos);
      window.removeEventListener("resize", calculateDeptPopupPos);
    };
  }, [showAllDept]);

  useEffect(() => {
    if (showAllJobRoles) {
      calculateJobRolePopupPos();
      window.addEventListener("scroll", calculateJobRolePopupPos);
      window.addEventListener("resize", calculateJobRolePopupPos);
    }
    return () => {
      window.removeEventListener("scroll", calculateJobRolePopupPos);
      window.removeEventListener("resize", calculateJobRolePopupPos);
    };
  }, [showAllJobRoles]);

  useEffect(() => {
    if (showAllCategories) {
      calculateCategoryPopupPos();
      window.addEventListener("scroll", calculateCategoryPopupPos);
      window.addEventListener("resize", calculateCategoryPopupPos);
    }
    return () => {
      window.removeEventListener("scroll", calculateCategoryPopupPos);
      window.removeEventListener("resize", calculateCategoryPopupPos);
    };
  }, [showAllCategories]);

  useEffect(() => {
    if (showAllLocations) {
      calculateLocationPopupPos();
      window.addEventListener("scroll", calculateLocationPopupPos);
      window.addEventListener("resize", calculateLocationPopupPos);
    }
    return () => {
      window.removeEventListener("scroll", calculateLocationPopupPos);
      window.removeEventListener("resize", calculateLocationPopupPos);
    };
  }, [showAllLocations]);

  const toggleItem = <T,>(list: T[], item: T) => {
    const safeList = list ?? [];
    return safeList.includes(item)
      ? safeList.filter((i) => i !== item)
      : [...safeList, item];
  };

  const handleClearFilters = () => {
    onFilterChange({
      ...filters,
      categories: [],
      jobTypes: [],
      experienceLevels: [],
      datePosted: [],
      salaryRange: [],
      tags: [],
      colleges: [],
      minExperience: "",
      maxExperience: "",
      jobRole: [],
      locations: [],
      jobRoleList: [],
    });
  };

  if (loading) {
    return (
      <aside className="w-full h-full">
        <div className="flex w-full justify-between items-center px-4 mt-4">
          <SkeletonLoader type="text" width={80} height={20} />
          <SkeletonLoader type="text" width={60} height={16} />
        </div>
        <div className="lg:p-[19px] lg:py-[10px] space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <SkeletonLoader
                type="text"
                width={120}
                height={20}
                className="mb-3 pt-[15px]"
              />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <SkeletonLoader
                      type="rect"
                      width={16}
                      height={16}
                      className="rounded"
                    />
                    <SkeletonLoader type="text" width="60%" height={16} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  // const alphabets = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  const DepartfilteredList = deptList
    ?.filter((c) =>
      c.label.toLowerCase().includes(deptSearchQuery.toLowerCase())
    )
    ?.sort((a, b) => a.label.localeCompare(b.label));

  const DepartAvailableAlphabets = new Set(
    DepartfilteredList?.map((item) => item.label[0].toUpperCase())
  );

  const collegefilteredList = collegeList
    ?.filter((c) =>
      c.label.toLowerCase().includes(deptSearchQuery.toLowerCase())
    )
    ?.sort((a, b) => a.label.localeCompare(b.label));

  const collegeAvailableAlphabets = new Set(
    collegefilteredList?.map((item) => item.label[0].toUpperCase())
  );

  const jobRoleFilteredList = jobRoleList
    ?.filter((c) =>
      c.label.toLowerCase().includes(jobRoleSearchQuery.toLowerCase())
    )
    ?.sort((a, b) => a.label.localeCompare(b.label));

  const jobRoleAvailableAlphabets = new Set(
    jobRoleFilteredList?.map((item) => item.label[0].toUpperCase())
  );

  const categoryFilteredList = categoryList
    ?.filter((c) =>
      c.label.toLowerCase().includes(categorySearchQuery.toLowerCase())
    )
    ?.sort((a, b) => a.label.localeCompare(b.label));

  const categoryAvailableAlphabets = new Set(
    categoryFilteredList?.map((item) => item.label[0].toUpperCase())
  );

  const locationFilteredList = locationList
    ?.filter((c) =>
      c.label.toLowerCase().includes(locationSearchQuery.toLowerCase())
    )
    ?.sort((a, b) => a.label.localeCompare(b.label));

  const locationAvailableAlphabets = new Set(
    locationFilteredList?.map((item) => item.label[0].toUpperCase())
  );

  return (
    <aside className="w-full h-full">
      <div className="flex w-full justify-between items-center px-4 mt-4">
        <div className="font-semibold text-[#000]">All Filters</div>
        <button
          onClick={handleClearFilters}
          className="text-sm font-medium text-red-600 hover:text-red-800"
        >
          Clear All
        </button>
      </div>
      <div className="lg:p-[19px] lg:pb-[10px] lg:pt-0">

      {locationList?.length > 0 && (
          <div ref={locationSectionRef}>
            <FilterSection
              title="Select Locations"
              items={locationList?.slice(0, 5) ?? []}
              selected={filters.locations}
              onToggle={(value) =>
                onFilterChange({
                  ...filters,
                  locations: toggleItem(filters.locations, value),
                })
              }
            />
          </div>
        )}
        {locationList && locationList?.length > 5 && (
          <div className="relative mt-2">
            <button
              ref={locationButtonRef}
              onClick={() => {
                setShowAllLocations(true);
                setTimeout(calculateLocationPopupPos, 0);
              }}
              className="text-xs font-medium flex items-center  gap-1 text-[#1E3786] w-full rounded-full px-3  ps-7"
            >
              View more
            </button>
          </div>
        )}

        <PopupPortal>
          {showAllLocations && (
            <div
              ref={locationPopupRef}
              className="fixed bg-white border border-slate-200 shadow-2xl z-[9999] p-4 flex flex-col"
              style={{
                width: "clamp(300px, 90vw, 900px)",
                height: `clamp(420px, 60vh, 420px)`,
                left: `${locationPopupPos.left}px`,
                top: `${locationPopupPos.top}px`,
                maxHeight: "80vh",
                overflowY: "hidden",
              }}
            >
              <div className="flex justify-between items-start mb-3 border-b">
                <div className="flex flex-row flex-wrap md:flex-nowrap  items-center gap-4">
                  <div className="relative mb-3 w-full md:w-auto">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={locationSearchQuery}
                      onChange={(e) => setLocationSearchQuery(e.target.value)}
                      className=" pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2 pb-2 w-full md:w-auto">
                    {alphabets.map((char) => {
                      const isAvailable = locationAvailableAlphabets.has(char);

                      return (
                        <span
                          key={char}
                          onClick={() => {
                            if (!isAvailable) return;

                            setSelectedAlphabet(char);

                            alphabetRefs.current[char]?.scrollIntoView({
                              behavior: "smooth",
                              inline: "start",
                              block: "nearest",
                            });
                          }}
                          className={`
                                text-sm
                                ${
                                  isAvailable
                                    ? "cursor-pointer hover:text-black"
                                    : "cursor-not-allowed text-slate-300"
                                }
                                ${
                                  selectedAlphabet === char && isAvailable
                                    ? "text-black border bg-gray-300 px-1 py-0 font-semibold"
                                    : ""
                                }
                              `}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAllLocations(false);
                    setSelectedAlphabet(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={listRef}
                className="overflow-x-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="columns-[220px] gap-6 w-max h-full transition-opacity duration-300">
                  {locationFilteredList.map((item, index) => {
                    const currentLetter = item.label[0].toUpperCase();
                    const prevLetter =
                      index > 0
                        ? locationFilteredList[
                            index - 1
                          ]?.label[0].toUpperCase()
                        : null;

                    const showHeader = currentLetter !== prevLetter;

                    return (
                      <div key={item.value} className={`break-inside-avoid `}>
                        {showHeader && (
                          <div
                            ref={(el) => {
                              if (el) alphabetRefs.current[currentLetter] = el;
                            }}
                            className="font-semibold text-sm text-slate-700 mt-2 mb-1"
                          >
                            {currentLetter}
                          </div>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={(filters.locations ?? []).includes(
                              item.value
                            )}
                            onChange={() =>
                              onFilterChange({
                                ...filters,
                                locations: toggleItem(
                                  filters.locations,
                                  item.value
                                ),
                              })
                            }
                            className="w-3 h-3 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                          />
                          <span className="text-sm text-slate-600">
                            {item.label}
                          </span>
                        </label>
                      </div>
                    );
                  })}

                  {locationFilteredList.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No locations found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </PopupPortal>

        {categoryList?.length > 0 && (
          <div ref={categorySectionRef}>
            <FilterSection
              title="Select Job Category"
              items={categoryList?.slice(0, 5) ?? []}
              selected={filters.categories}
              onToggle={(value) =>
                onFilterChange({
                  ...filters,
                  categories: toggleItem(filters.categories, value),
                })
              }
            />
          </div>
        )}
        {categoryList && categoryList.length > 5 && (
          <div className="relative mt-2">
            <button
              ref={categoryButtonRef}
              onClick={() => {
                setShowAllCategories(true);
                setTimeout(calculateCategoryPopupPos, 0);
              }}
              className="text-xs font-medium flex items-center  gap-1 text-[#1E3786] w-full rounded-full px-3  ps-7"
            >
              View more
            </button>
          </div>
        )}

        <PopupPortal>
          {showAllCategories && (
            <div
              ref={categoryPopupRef}
              className="fixed bg-white border border-slate-200 shadow-2xl z-[9999] p-4 flex flex-col"
              style={{
                width: "clamp(300px, 90vw, 900px)",
                height: `clamp(420px, 60vh, 420px)`,
                left: `${categoryPopupPos.left}px`,
                top: `${categoryPopupPos.top}px`,
                maxHeight: "80vh",
                overflowY: "hidden",
              }}
            >
              <div className="flex justify-between items-start mb-3 border-b">
                <div className="flex flex-row flex-wrap md:flex-nowrap  items-center gap-4">
                  <div className="relative mb-3 w-full md:w-auto">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      className=" pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2 pb-2 w-full md:w-auto">
                    {alphabets.map((char) => {
                      const isAvailable = categoryAvailableAlphabets.has(char);

                      return (
                        <span
                          key={char}
                          onClick={() => {
                            if (!isAvailable) return;

                            setSelectedAlphabet(char);

                            alphabetRefs.current[char]?.scrollIntoView({
                              behavior: "smooth",
                              inline: "start",
                              block: "nearest",
                            });
                          }}
                          className={`
                                text-sm
                                ${
                                  isAvailable
                                    ? "cursor-pointer hover:text-black"
                                    : "cursor-not-allowed text-slate-300"
                                }
                                ${
                                  selectedAlphabet === char && isAvailable
                                    ? "text-black border bg-gray-300 px-1 py-0 font-semibold"
                                    : ""
                                }
                              `}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAllCategories(false);
                    setSelectedAlphabet(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={listRef}
                className="overflow-x-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="columns-[220px] gap-6 w-max h-full transition-opacity duration-300">
                  {categoryFilteredList.map((item, index) => {
                    const currentLetter = item.label[0].toUpperCase();
                    const prevLetter =
                      index > 0
                        ? categoryFilteredList[
                            index - 1
                          ]?.label[0].toUpperCase()
                        : null;

                    const showHeader = currentLetter !== prevLetter;

                    return (
                      <div key={item.value} className={`break-inside-avoid `}>
                        {showHeader && (
                          <div
                            ref={(el) => {
                              if (el) alphabetRefs.current[currentLetter] = el;
                            }}
                            className="font-semibold text-sm text-slate-700 mt-2 mb-1"
                          >
                            {currentLetter}
                          </div>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={(filters.categories ?? []).includes(
                              item.value
                            )}
                            onChange={() =>
                              onFilterChange({
                                ...filters,
                                categories: toggleItem(
                                  filters.categories,
                                  item.value
                                ),
                              })
                            }
                            className="w-3 h-3 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                          />
                          <span className="text-sm text-slate-600">
                            {item.label}
                          </span>
                        </label>
                      </div>
                    );
                  })}

                  {categoryFilteredList.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No categories found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </PopupPortal>

        {deptList?.length > 0 && (
          <div ref={deptSectionRef}>
            <FilterSection
              title="Choose Department"
              items={deptList?.slice(0, 5) ?? []}
              selected={filters.department}
              onToggle={(value) =>
                onFilterChange({
                  ...filters,
                  department: toggleItem(filters.department, value),
                })
              }
            />
          </div>
        )}
        {deptList && deptList.length > 5 && (
          <div className="relative mt-2">
            <button
              ref={deptButtonRef}
              onClick={() => {
                setShowAllDept(true);
                setTimeout(calculateDeptPopupPos, 0);
              }}
              className="text-xs font-medium flex items-center  gap-1 text-[#1E3786] w-full rounded-full px-3  ps-7"
            >
              View more
            </button>
          </div>
        )}

        <PopupPortal>
          {showAllDept && (
            <div
              ref={deptPopupRef}
              className="fixed bg-white border border-slate-200 shadow-2xl z-[9999] p-4 flex flex-col"
              style={{
                width: "clamp(300px, 90vw, 900px)",
                height: `clamp(420px, 60vh, 420px)`,
                left: `${deptPopupPos.left}px`,
                top: `${deptPopupPos.top}px`,
                maxHeight: "80vh",
                overflowY: "hidden",
              }}
            >
              <div className="flex justify-between items-start mb-3 border-b">
                {/* <h4 className="font-semibold text-[#000]">All Department</h4> */}
                <div className="flex flex-row flex-wrap md:flex-nowrap  items-center gap-4">
                  <div className="relative mb-3 w-full md:w-auto">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search department..."
                      value={deptSearchQuery}
                      onChange={(e) => setDeptSearchQuery(e.target.value)}
                      className=" pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2 pb-2 w-full md:w-auto">
                    {alphabets.map((char) => {
                      const isAvailable = DepartAvailableAlphabets.has(char);

                      return (
                        <span
                          key={char}
                          onClick={() => {
                            if (!isAvailable) return; // ❌ prevent click

                            setSelectedAlphabet(char);

                            alphabetRefs.current[char]?.scrollIntoView({
                              behavior: "smooth",
                              inline: "start",
                              block: "nearest",
                            });
                          }}
                          className={`
                          text-sm
                          ${
                            isAvailable
                              ? "cursor-pointer hover:text-black"
                              : "cursor-not-allowed text-slate-300"
                          }
                            ${
                              selectedAlphabet === char && isAvailable
                                ? "text-black border bg-gray-300 px-1 py-0 font-semibold"
                                : ""
                            }
                          `}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAllDept(false);
                    setSelectedAlphabet(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={listRef}
                className="overflow-x-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="columns-[220px] gap-6 w-max h-full transition-opacity duration-300">
                  {DepartfilteredList.map((item, index) => {
                    const currentLetter = item.label[0].toUpperCase();
                    const prevLetter =
                      index > 0
                        ? DepartfilteredList[index - 1]?.label[0].toUpperCase()
                        : null;

                    const showHeader = currentLetter !== prevLetter;

                    return (
                      <div key={item.value} className={`break-inside-avoid `}>
                        {showHeader && (
                          <div
                            ref={(el) => {
                              if (el) alphabetRefs.current[currentLetter] = el;
                            }}
                            className="font-semibold text-sm text-slate-700 mt-2 mb-1"
                          >
                            {currentLetter}
                          </div>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={(filters.department ?? []).includes(
                              item.value
                            )}
                            onChange={() =>
                              onFilterChange({
                                ...filters,
                                department: toggleItem(
                                  filters.department,
                                  item.value
                                ),
                              })
                            }
                            className="w-3 h-3 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                          />
                          <span className="text-sm text-slate-600">
                            {item.label}
                          </span>
                        </label>
                      </div>
                    );
                  })}

                  {DepartfilteredList.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No department found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </PopupPortal>

        {jobRoleList?.length > 0 && (
          <div ref={jobRoleSectionRef}>
            <FilterSection
              title="Select Job role"
              items={jobRoleList?.slice(0, 5) ?? []}
              selected={filters.jobRole}
              onToggle={(value) =>
                onFilterChange({
                  ...filters,
                  jobRole: toggleItem(filters.jobRole, value),
                })
              }
            />
          </div>
        )}

        {jobRoleList && jobRoleList.length > 5 && (
          <div className="relative mt-2">
            <button
              ref={jobRoleButtonRef}
              onClick={() => {
                setShowAllJobRoles(true);
                setTimeout(calculateJobRolePopupPos, 0);
              }}
              className="text-xs font-medium flex items-center  gap-1 text-[#1E3786] w-full rounded-full px-3  ps-7"
            >
              View more
            </button>
          </div>
        )}

        <PopupPortal>
          {showAllJobRoles && (
            <div
              ref={jobRolePopupRef}
              className="fixed bg-white border border-slate-200 shadow-2xl z-[9999] p-4 flex flex-col"
              style={{
                width: "clamp(300px, 90vw, 900px)",
                height: `clamp(420px, 60vh, 420px)`,
                left: `${jobRolePopupPos.left}px`,
                top: `${jobRolePopupPos.top}px`,
                maxHeight: "80vh",
                overflowY: "hidden",
              }}
            >
              <div className="flex justify-between items-start mb-3 border-b">
                <div className="flex flex-row flex-wrap md:flex-nowrap  items-center gap-4">
                  <div className="relative mb-3 w-full md:w-auto">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search job roles..."
                      value={jobRoleSearchQuery}
                      onChange={(e) => setJobRoleSearchQuery(e.target.value)}
                      className=" pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2 pb-2 w-full md:w-auto">
                    {alphabets.map((char) => {
                      const isAvailable = jobRoleAvailableAlphabets.has(char);

                      return (
                        <span
                          key={char}
                          onClick={() => {
                            if (!isAvailable) return; // ❌ prevent click

                            setSelectedAlphabet(char);

                            alphabetRefs.current[char]?.scrollIntoView({
                              behavior: "smooth",
                              inline: "start",
                              block: "nearest",
                            });
                          }}
                          className={`
                                text-sm
                                ${
                                  isAvailable
                                    ? "cursor-pointer hover:text-black"
                                    : "cursor-not-allowed text-slate-300"
                                }
                                ${
                                  selectedAlphabet === char && isAvailable
                                    ? "text-black border bg-gray-300 px-1 py-0 font-semibold"
                                    : ""
                                }
                              `}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAllJobRoles(false);
                    setSelectedAlphabet(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={listRef}
                className="overflow-x-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="columns-[220px] gap-6 w-max h-full transition-opacity duration-300">
                  {jobRoleFilteredList.map((item, index) => {
                    const currentLetter = item.label[0].toUpperCase();
                    const prevLetter =
                      index > 0
                        ? jobRoleFilteredList[index - 1]?.label[0].toUpperCase()
                        : null;

                    const showHeader = currentLetter !== prevLetter;

                    return (
                      <div key={item.value} className={`break-inside-avoid `}>
                        {showHeader && (
                          <div
                            ref={(el) => {
                              if (el) alphabetRefs.current[currentLetter] = el;
                            }}
                            className="font-semibold text-sm text-slate-700 mt-2 mb-1"
                          >
                            {currentLetter}
                          </div>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={(filters.jobRole ?? []).includes(
                              item.value
                            )}
                            onChange={() =>
                              onFilterChange({
                                ...filters,
                                jobRole: toggleItem(
                                  filters.jobRole,
                                  item.value
                                ),
                              })
                            }
                            className="w-3 h-3 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                          />
                          <span className="text-sm text-slate-600">
                            {item.label}
                          </span>
                        </label>
                      </div>
                    );
                  })}

                  {jobRoleFilteredList.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No job roles found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </PopupPortal>
       

        {collegeList?.length > 0 && (
          <div ref={collegeSectionRef}>
            <FilterSection
              title="Choose Colleges"
              items={collegeList?.slice(0, 5) ?? []}
              selected={filters.colleges}
              onToggle={(value) =>
                onFilterChange({
                  ...filters,
                  colleges: toggleItem(filters.colleges, value),
                })
              }
            />
          </div>
        )}
        {collegeList && collegeList.length > 5 && (
          <div className="relative mt-2">
            <button
              ref={collegeButtonRef}
              onClick={() => {
                setShowAllColleges(true);
                setTimeout(calculateCollegePopupPos, 0);
              }}
              className="text-xs font-medium flex items-center  gap-1 text-[#1E3786] w-full rounded-full px-3  ps-7"
            >
              View more
            </button>
          </div>
        )}

        <PopupPortal>
          {showAllColleges && (
            <div
              ref={collegePopupRef}
              className="fixed bg-white border border-slate-200 shadow-2xl z-[9999] p-4 flex flex-col"
              style={{
                width: "clamp(300px, 90vw, 900px)",
                height: `clamp(420px, 60vh, 420px)`,
                left: `${collegePopupPos.left}px`,
                top: `${collegePopupPos.top}px`,
                maxHeight: "80vh",
                overflowY: "hidden",
              }}
            >
              <div className="flex justify-between items-start mb-3 border-b">
                {/* <h4 className="font-semibold text-[#000]">All Colleges</h4> */}
                <div className="flex flex-row flex-wrap md:flex-nowrap  items-center gap-4">
                  <div className="relative mb-3 w-full md:w-auto">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search colleges..."
                      value={collegeSearchQuery}
                      onChange={(e) => setCollegeSearchQuery(e.target.value)}
                      className=" pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2 pb-2 w-full md:w-auto">
                    {alphabets.map((char) => {
                      const isAvailable = collegeAvailableAlphabets.has(char);

                      return (
                        <span
                          key={char}
                          onClick={() => {
                            if (!isAvailable) return; // ❌ prevent click

                            setSelectedAlphabet(char);

                            alphabetRefs.current[char]?.scrollIntoView({
                              behavior: "smooth",
                              inline: "start",
                              block: "nearest",
                            });
                          }}
                          className={`
                                text-sm
                                ${
                                  isAvailable
                                    ? "cursor-pointer hover:text-black"
                                    : "cursor-not-allowed text-slate-300"
                                }
                                ${
                                  selectedAlphabet === char && isAvailable
                                    ? "text-black border bg-gray-300 px-1 py-0 font-semibold"
                                    : ""
                                }
                              `}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAllColleges(false);
                    setSelectedAlphabet(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div
                ref={listRef}
                className="overflow-x-auto flex-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <div className="columns-[220px] gap-6 w-max h-full transition-opacity duration-300">
                  {collegefilteredList?.map((item, index) => {
                    const currentLetter = item.label[0].toUpperCase();
                    const prevLetter =
                      index > 0
                        ? collegefilteredList[index - 1]?.label[0].toUpperCase()
                        : null;

                    const showHeader = currentLetter !== prevLetter;

                    return (
                      <div key={item.value} className={`break-inside-avoid `}>
                        {showHeader && (
                          <div
                            ref={(el) => {
                              if (el) alphabetRefs.current[currentLetter] = el;
                            }}
                            className="font-semibold text-sm text-slate-700 mt-2 mb-1"
                          >
                            {currentLetter}
                          </div>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={(filters.colleges ?? []).includes(
                              item.value
                            )}
                            onChange={() =>
                              onFilterChange({
                                ...filters,
                                colleges: toggleItem(
                                  filters.colleges,
                                  item.value
                                ),
                              })
                            }
                            className="w-3 h-3 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                          />
                          <span className="text-sm text-slate-600">
                            {item.label}
                          </span>
                        </label>
                      </div>
                    );
                  })}

                  {collegefilteredList.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No department found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </PopupPortal>
       
      

        <div>
          <h3 className="text-md font-semibold text-[#000] mb-3 pt-[15px]">
            Experience (Years)
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minExp}
              onChange={(e) => setMinExp(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
            <span className="text-slate-400">-</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxExp}
              onChange={(e) => setMaxExp(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
            <button
              onClick={() => {
                const minVal = minExp === "" ? 0 : parseInt(minExp);
                const maxVal = maxExp === "" ? 100 : parseInt(maxExp);

                const selectedLevels = experienceList
                  ?.filter((item) => {
                    const parsed = parseExperienceLabel(item.label);
                    if (!parsed) return false;
                    // Check for containment: (StartA >= StartB) and (EndA <= EndB)
                    return parsed.min >= minVal && parsed.max <= maxVal;
                  })
                  .map((item) => item.value);

                onFilterChange({
                  ...filters,
                  minExperience: minExp,
                  maxExperience: maxExp,
                  experienceLevels: selectedLevels || [],
                });
              }}
              className="bg-[#1E3786] text-white p-2 rounded-md hover:bg-[#1E3786]/90 transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <div
            className="flex justify-end text-sm underline cursor-pointer mt-1"
            onClick={() => {
              onFilterChange({
                ...filters,
                minExperience: "",
                maxExperience: "",
                experienceLevels: ["Open to all experience levels"],
              });
              setMinExp("");
              setMaxExp("");
            }}
          >
            Open to all experience levels
          </div>
        </div>

        {/* <div className="pt-[15px]">
          <PriceRangeSlider
            title="Salary Range"
            min={0}
            max={maxSalary}
            value={salarySliderRange}
            onChange={handleSalarySliderChange}
            step={100000}
          />
        </div> */}

        {/* Experience Level */}
        {/* <FilterSection
          title="Date Posted"
          items={datePostedList ?? []}
          selected={filters.datePosted}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              datePosted: toggleItem(filters.datePosted, value),
            })
          }
        /> */}
      </div>
    </aside>
  );
};

export default Filterbar;
