"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { X, Search } from "lucide-react";
import {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  POSTED_DATE_OPTIONS,
  TAGS,
} from "@/utils/constant.utils";
import PriceRangeSlider from "../common-components/priceRange";

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
}

const FilterSection: React.FC<{
  title: string;
  items: { value: number | string; label: string }[];
  counts?: number[];
  selected: (number | string)[];
  onToggle: (value: number | string) => void;
}> = ({ title, items, counts, selected, onToggle }) => (
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
            <span className="text-[15px] text-[#000] group-hover:text-slate-900 transition-colors">
              {item.label}
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
}) => {
  console.log("✌️deptList --->", deptList);

  const [showAllColleges, setShowAllColleges] = useState(false);
  const [showAllDept, setShowAllDept] = useState(false);

  const [collegeSearchQuery, setCollegeSearchQuery] = useState("");
  const [deptSearchQuery, setDeptSearchQuery] = useState("");

  const collegePopupRef = useRef<HTMLDivElement>(null);
  const deptPopupRef = useRef<HTMLDivElement>(null);

  const [salarySliderRange, setSalarySliderRange] = useState<[number, number]>([
    0, 5000000,
  ]);
  const filtersRef = useRef(filters);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInternalChange = useRef(false);

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
        !collegePopupRef.current.contains(event.target as Node)
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
        !deptPopupRef.current.contains(event.target as Node)
      ) {
        setShowAllDept(false);
      }
    };

    if (showAllDept) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAllDept]);

  const toggleItem = <T,>(list: T[], item: T) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
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
    });
  };

  console.log("experienceList", experienceList);

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
      <div className="lg:p-[19px] lg:py-[10px]">
        {/* Job Sectors */}
        {/* <FilterSection
          title="Job Sectors"
          items={categoryList ?? []}
          // counts={CATEGORIES.map((c) => c.count)}
          selected={filters.categories}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              categories: toggleItem(filters.categories, value),
            })
          }
        />

        {categoryList?.length > 5 && (
          <button className="mt-6 w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold rounded-lg text-sm transition-colors mb-4">
            Show More
          </button>
        )} */}

        {/* Job Type */}
        {/* <FilterSection
          title="Job Type"
          items={jobTypeList ?? []}
          selected={filters.jobTypes}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              jobTypes: toggleItem(filters.jobTypes, value),
            })
          }
        /> */}

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

        {collegeList && collegeList.length > 5 && (
          <div className="relative mt-3">
            <button
              onClick={() => setShowAllColleges(true)}
              className="text-sm font-medium flex items-center  gap-1 text-[#1d1d57] w-full rounded-full px-3 py-2 ps-7"
            >
              View more
            </button>

            {showAllColleges && (
              <div
                ref={collegePopupRef}
                className="absolute left-[5%] top-[-200px]  mt-2 w-72 bg-white border border-slate-200 shadow-xl rounded-lg z-50 p-4 max-h-[400px] flex flex-col"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-[#000]">All Colleges</h4>
                  <button
                    onClick={() => setShowAllColleges(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative mb-3">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search colleges..."
                    value={collegeSearchQuery}
                    onChange={(e) => setCollegeSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>

                <div className="overflow-y-auto flex-1 space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {collegeList
                    ?.filter((c) =>
                      c.label
                        .toLowerCase()
                        .includes(collegeSearchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={filters.colleges.includes(item.value)}
                          onChange={() =>
                            onFilterChange({
                              ...filters,
                              colleges: toggleItem(
                                filters.colleges,
                                item.value
                              ),
                            })
                          }
                          className="w-4 h-4 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                        />
                        <span className="text-sm text-slate-600">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  {collegeList?.filter((c) =>
                    c.label
                      .toLowerCase()
                      .includes(collegeSearchQuery.toLowerCase())
                  ).length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No colleges found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
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
        {deptList && deptList.length > 5 && (
          <div className="relative mt-3">
            <button
              onClick={() => setShowAllDept(true)}
              className="text-sm font-medium flex items-center  gap-1 text-[#1d1d57] w-full rounded-full px-3 py-2 ps-7"
            >
              View more
            </button>

            {showAllDept && (
              <div
                ref={deptPopupRef}
                className="absolute left-[5%] top-[-200px]  mt-2 w-72 bg-white border border-slate-200 shadow-xl rounded-lg z-50 p-4 max-h-[400px] flex flex-col"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-[#000]">All Department</h4>
                  <button
                    onClick={() => setShowAllDept(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative mb-3">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search department..."
                    value={deptSearchQuery}
                    onChange={(e) => setDeptSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>

                <div className="overflow-y-auto flex-1 space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {deptList
                    ?.filter((c) =>
                      c.label
                        .toLowerCase()
                        .includes(deptSearchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={filters.department.includes(item.value)}
                          onChange={() =>
                            onFilterChange({
                              ...filters,
                              department: toggleItem(
                                filters.department,
                                item.value
                              ),
                            })
                          }
                          className="w-4 h-4 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                        />
                        <span className="text-sm text-slate-600">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  {deptList?.filter((c) =>
                    c.label
                      .toLowerCase()
                      .includes(deptSearchQuery.toLowerCase())
                  ).length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No department found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* <FilterSection
          title="Experience Level"
          items={experienceList ?? []}
          // counts={CATEGORIES.map((c) => c.count)}
           selected={filters.experienceLevels}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              experienceLevels: toggleItem(filters.experienceLevels, value),
            })
          }
        /> */}

        <FilterSection
          title="Experience Level"
          items={experienceList ?? []}
          selected={filters.experienceLevels}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              experienceLevels: toggleItem(filters.experienceLevels, value),
            })
          }
        />

        <div className="pt-[15px]">
          <PriceRangeSlider
            title="Salary Range"
            min={0}
            max={maxSalary}
            value={salarySliderRange}
            onChange={handleSalarySliderChange}
            step={100000}
          />
        </div>

        {/* Experience Level */}
        <FilterSection
          title="Date Posted"
          items={datePostedList ?? []}
          selected={filters.datePosted}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              datePosted: toggleItem(filters.datePosted, value),
            })
          }
        />

        {/* Tags */}
        {/* <div>
          <h3 className="text-md font-semibold text-[#000] mb-3 pt-[15px]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tagsList?.map((tag, index) => (
              <button
                key={index} // ✅ unique
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    tags: toggleItem(filters.tags, tag),
                  })
                }
                className={`px-3 py-1 rounded-full text-md transition-all ${
                  filters.tags.includes(tag)
                    ? "bg-amber-400 text-slate-900 font-medium"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                }`}
              >
                {tag?.label}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default Filterbar;
