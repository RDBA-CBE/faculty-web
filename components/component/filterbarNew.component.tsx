"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";

interface SidebarProps {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  filterList?: any;
  loading?: boolean;
}

const FilterSection = ({ title, items, selected, onToggle }: any) => (
  <div>
    <h3 className="text-md font-semibold text-[#000] mb-3 pt-[15px]">
      {title}
    </h3>

    <div className="space-y-2">
      {items.map((item: any) => (
        <label
          key={item.value}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected?.includes(item.value)}
            onChange={() => onToggle(item.value)}
            className="w-4 h-4"
          />
          <span className="text-sm">{item.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const FilterbarNew = ({
  filters,
  onFilterChange,
  filterList,
  loading,
}: SidebarProps) => {
  const [collegeSearch, setCollegeSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");

  // ✅ mapper
  const mappedData = useMemo(() => {
    return {
      colleges:
        filterList?.colleges?.map((c: any) => ({
          value: c.id,
          label: c.college_name,
        })) || [],

      departments:
        filterList?.departments?.map((d: any) => ({
          value: d.id,
          label: d.department_name,
        })) || [],

      locations:
        filterList?.locations?.map((l: any) => ({
          value: l.id,
          label: l.city,
        })) || [],

      experiences:
        filterList?.experiences?.map((e: any) => ({
          value: e.id,
          label: e.name,
        })) || [],

      salary:
        filterList?.salary_ranges?.map((s: any) => ({
          value: s.id,
          label: s.name,
        })) || [],
    };
  }, [filterList]);

  // ✅ toggle helper
  const toggleItem = (list: any[], item: any) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  // ✅ search filter
  const filteredColleges = mappedData.colleges.filter((c: any) =>
    c.label.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const filteredDepartments = mappedData.departments.filter((d: any) =>
    d.label.toLowerCase().includes(deptSearch.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <aside className="p-4 w-full">
      {/* CLEAR */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">All Filters</h2>
        <button
          className="text-red-500 text-sm"
          onClick={() =>
            onFilterChange({
              colleges: [],
              department: [],
              locations: [],
              experienceLevels: [],
              salaryRange: [],
            })
          }
        >
          Clear
        </button>
      </div>
      <div className="mt-4">
        <input
          placeholder="Search college..."
          value={collegeSearch}
          onChange={(e) => setCollegeSearch(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <FilterSection
          title="Choose Colleges"
          items={filteredColleges}
          selected={filters.colleges}
          onToggle={(val: any) =>
            onFilterChange({
              ...filters,
              colleges: toggleItem(filters.colleges, val),
            })
          }
        />
      </div>

      {/* DEPARTMENT */}
      <div className="mt-4">
        <input
          placeholder="Search department..."
          value={deptSearch}
          onChange={(e) => setDeptSearch(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <FilterSection
          title="Choose Departments"
          items={filteredDepartments}
          selected={filters.department}
          onToggle={(val: any) =>
            onFilterChange({
              ...filters,
              department: toggleItem(filters.department, val),
            })
          }
        />
      </div>

      {/* LOCATION */}
      <FilterSection
        title="Select Location"
        items={mappedData.locations}
        selected={filters.locations || []}
        onToggle={(val: any) =>
          onFilterChange({
            ...filters,
            locations: toggleItem(filters.locations || [], val),
          })
        }
      />

      {/* COLLEGE SEARCH */}
     

      {/* EXPERIENCE */}
      <FilterSection
        title="Experience"
        items={mappedData.experiences}
        selected={filters.experienceLevels}
        onToggle={(val: any) =>
          onFilterChange({
            ...filters,
            experienceLevels: toggleItem(filters.experienceLevels, val),
          })
        }
      />

      {/* SALARY */}
      <FilterSection
        title="Salary"
        items={mappedData.salary}
        selected={filters.salaryRange}
        onToggle={(val: any) =>
          onFilterChange({
            ...filters,
            salaryRange: toggleItem(filters.salaryRange, val),
          })
        }
      />
    </aside>
  );
};

export default FilterbarNew;
