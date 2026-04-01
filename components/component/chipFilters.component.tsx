import React from "react";
import { X } from "lucide-react";

const Chip = ({ label, onRemove }) => (
  <div className="flex items-center bg-amber-100 text-amber-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
    <span className="text-[10px] md:text-[12px]">{label}</span>
    <button
      onClick={onRemove}
      className="ml-2 p-0.5 rounded-full hover:bg-amber-200"
      aria-label={`Remove ${label} filter`}
    >
      <X size={14} />
    </button>
  </div>
);

const ChipFilters = ({
  filters,
  onFilterChange,
  categoryList = [],
  jobTypeList = [],
  experienceList = [],
  salaryRangeList = [],
  tagsList = [],
  collegeList = [],
  datePostedList = [],
  locationList = [],
  deptList = [],
  jobRoleList = [],
}) => {
  const activeFilters = [];

  const findLabel = (list, value) => {
    return (
      list?.find((item) => String(item?.value) === String(value))?.label ||
      value
    );
  };

  // Search Query
  if (filters.searchQuery) {
    activeFilters.push({
      label: `Search: "${filters.searchQuery}"`,
      onRemove: () => onFilterChange({ ...filters, searchQuery: "" }),
    });
  }

  // Location
  if (locationList?.length > 0) {
    filters.locations?.forEach((value) => {
      activeFilters.push({
        label: findLabel(locationList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            locations: filters.locations.filter((v) => v !== value),
          });
        },
      });
    });
  }

  // Job Types
  if (jobTypeList?.length > 0) {
    filters.jobTypes.forEach((value) => {
      activeFilters.push({
        label: findLabel(jobTypeList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            jobTypes: filters.jobTypes.filter((v) => v !== value),
          });
        },
      });
    });
  }

  // Experience Range
  if (filters.experienceLevels?.includes("Open to all experience levels")) {
    activeFilters.push({
      label: "Open to all experience levels",
      onRemove: () =>
        onFilterChange({
          ...filters,
          minExperience: "",
          maxExperience: "",
          experienceLevels: [],
        }),
    });
  } else if (filters.minExperience || filters.maxExperience) {
    const min = filters.minExperience || "0";
    const max = filters.maxExperience || "";
    const label = max
      ? `Experience: ${min} - ${max} Years`
      : `Experience: ${min}+ Years`;
    activeFilters.push({
      label,
      onRemove: () =>
        onFilterChange({
          ...filters,
          minExperience: "",
          maxExperience: "",
          experienceLevels: [],
        }),
    });
  }

  // Categories
  if (categoryList?.length > 0) {
    filters.categories.forEach((value) => {
      activeFilters.push({
        label: findLabel(categoryList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            categories: filters.categories.filter((v) => v !== value),
          });
        },
      });
    });
  }

  // jobrole
  if (jobRoleList?.length > 0) {
    filters.jobRole?.forEach((value) => {
      activeFilters.push({
        label: findLabel(jobRoleList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            jobRole: filters.jobRole.filter((v) => v !== value),
          });
        },
      });
    });
  }

  // Date Posted
  if (datePostedList?.length > 0) {
    filters?.datePosted?.forEach((value) => {
      activeFilters.push({
        label: findLabel(datePostedList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            datePosted: filters.datePosted.filter((v) => v !== value),
          });
        },
      });
    });
  }

  // Salary Range
  // Salary Range
  if (filters.salaryRange && filters.salaryRange.length > 0) {
    const selectedRanges = filters?.salaryRange?.map((value) =>
      findLabel(salaryRangeList, value)
    );

    // Extract min and max numbers
    const numbers = selectedRanges.flatMap((range) => {
      const match = range.match(/\d+/g);
      return match ? match.map(Number) : [];
    });

    if (numbers.length > 0) {
      const min = Math.min(...numbers);
      const max = Math.max(...numbers);

      activeFilters.push({
        label: `Salary: ${min} - ${max} Lakhs`,
        onRemove: () => {
          onFilterChange({
            ...filters,
            salaryRange: [],
          });
        },
      });
    }
  }

  // Colleges
  if (collegeList?.length > 0) {
    filters.colleges?.forEach((value) => {
      activeFilters.push({
        label: findLabel(collegeList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            colleges: filters.colleges.filter((v) => v !== value),
          });
        },
      });
    });
  }

  if (deptList?.length > 0) {
    filters.department?.forEach((value) => {
      activeFilters.push({
        label: findLabel(deptList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            department: filters.department.filter((v) => v !== value),
          });
        },
      });
    });
  }

  // Tags
  if (tagsList?.length > 0) {
    filters.tags.forEach((value) => {
      activeFilters.push({
        label: findLabel(tagsList, value),
        onRemove: () => {
          onFilterChange({
            ...filters,
            tags: filters.tags.filter((v) => v !== value),
          });
        },
      });
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-2">
      {activeFilters.map((filter, index) => (
        <Chip key={index} label={filter.label} onRemove={filter.onRemove} />
      ))}
    </div>
  );
};

export default ChipFilters;
