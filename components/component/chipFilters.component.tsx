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

  const findLabel = (list, value) =>
    list?.find((item) => String(item?.value) === String(value))?.label ?? null;

  const push = (label, onRemove) => {
    if (label !== null && label !== undefined) activeFilters.push({ label, onRemove });
  };

  // Search Query
  if (filters.searchQuery) {
    push(`Search: "${filters.searchQuery}"`, () => onFilterChange({ ...filters, searchQuery: "" }));
  }

  // Location
  filters.locations?.forEach((value) => {
    push(findLabel(locationList, value), () =>
      onFilterChange({ ...filters, locations: filters.locations.filter((v) => v !== value) })
    );
  });

  // Job Types
  filters.jobTypes?.forEach((value) => {
    push(findLabel(jobTypeList, value), () =>
      onFilterChange({ ...filters, jobTypes: filters.jobTypes.filter((v) => v !== value) })
    );
  });

  // Experience Range
  if (filters.experienceLevels?.includes("Open to all experience levels")) {
    push("Open to all experience levels", () =>
      onFilterChange({ ...filters, minExperience: "", maxExperience: "", experienceLevels: [] })
    );
  } else if (filters.minExperience || filters.maxExperience) {
    const min = filters.minExperience || "0";
    const max = filters.maxExperience || "";
    push(
      max ? `Experience: ${min} - ${max} Years` : `Experience: ${min}+ Years`,
      () => onFilterChange({ ...filters, minExperience: "", maxExperience: "", experienceLevels: [] })
    );
  }

  // Categories
  filters.categories?.forEach((value) => {
    push(findLabel(categoryList, value), () =>
      onFilterChange({ ...filters, categories: filters.categories.filter((v) => v !== value) })
    );
  });

  // Job Role
  filters.jobRole?.forEach((value) => {
    push(findLabel(jobRoleList, value), () =>
      onFilterChange({ ...filters, jobRole: filters.jobRole.filter((v) => v !== value) })
    );
  });

  // Date Posted
  filters?.datePosted?.forEach((value) => {
    push(findLabel(datePostedList, value), () =>
      onFilterChange({ ...filters, datePosted: filters.datePosted.filter((v) => v !== value) })
    );
  });

  // Salary Range
  if (filters.salaryRange?.length > 0) {
    const selectedRanges = filters.salaryRange
      .map((value) => findLabel(salaryRangeList, value))
      .filter(Boolean);
    const numbers = selectedRanges.flatMap((range) => {
      const match = range.match(/\d+/g);
      return match ? match.map(Number) : [];
    });
    if (numbers.length > 0) {
      const min = Math.min(...numbers);
      const max = Math.max(...numbers);
      push(`Salary: ${min} - ${max} Lakhs`, () =>
        onFilterChange({ ...filters, salaryRange: [] })
      );
    }
  }

  // Colleges
  filters.colleges?.forEach((value) => {
    push(findLabel(collegeList, value), () =>
      onFilterChange({ ...filters, colleges: filters.colleges.filter((v) => v !== value) })
    );
  });

  // Department
  filters.department?.forEach((value) => {
    push(findLabel(deptList, value), () =>
      onFilterChange({ ...filters, department: filters.department.filter((v) => v !== value) })
    );
  });

  // Tags
  filters.tags?.forEach((value) => {
    push(findLabel(tagsList, value), () =>
      onFilterChange({ ...filters, tags: filters.tags.filter((v) => v !== value) })
    );
  });

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
