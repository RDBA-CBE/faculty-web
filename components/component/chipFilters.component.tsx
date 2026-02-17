import React from "react";
import { X } from "lucide-react";

const Chip = ({ label, onRemove }) => (
  <div className="flex items-center bg-amber-100 text-amber-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
    <span>{label}</span>
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
}) => {
  const activeFilters = [];

  const findLabel = (list, value) =>
    list.find((item) => item.value === value)?.label || value;

  // Search Query
  if (filters.searchQuery) {
    activeFilters.push({
      label: `Search: "${filters.searchQuery}"`,
      onRemove: () => onFilterChange({ ...filters, searchQuery: "" }),
    });
  }

  // Location
  if (filters.location) {
    activeFilters.push({
      label: `Location: ${filters.location}`,
      onRemove: () => onFilterChange({ ...filters, location: "" }),
    });
  }

  // Categories
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

  // Job Types
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

  // Experience Level
  if (filters.experienceLevels) {
    activeFilters.push({
      label: findLabel(experienceList, filters.experienceLevels),
      onRemove: () => onFilterChange({ ...filters, experienceLevels: null }),
    });
  }

  // Date Posted
  if (filters.datePosted && filters.datePosted !== "All") {
    activeFilters.push({
      label: findLabel(datePostedList, filters.datePosted),
      onRemove: () => onFilterChange({ ...filters, datePosted: "All" }),
    });
  }

  // Salary Range
  filters.salaryRange.forEach((value) => {
    activeFilters.push({
      label: `Salary: ${findLabel(salaryRangeList, value)}`,
      onRemove: () => {
        onFilterChange({
          ...filters,
          salaryRange: filters.salaryRange.filter((v) => v !== value),
        });
      },
    });
  });

  // Tags
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

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      {activeFilters.map((filter, index) => (
        <Chip key={index} label={filter.label} onRemove={filter.onRemove} />
      ))}
    </div>
  );
};

export default ChipFilters;