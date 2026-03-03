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
      label: findLabel(locationList, filters.location),
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
  filters.experienceLevels?.forEach((value) => {
    activeFilters.push({
      label: findLabel(experienceList, value),
      onRemove: () => {
        onFilterChange({
          ...filters,
          experienceLevels: filters.experienceLevels.filter((v) => v !== value),
        });
      },
    });
  });

  // Date Posted
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
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-2">
      {activeFilters.map((filter, index) => (
        <Chip key={index} label={filter.label} onRemove={filter.onRemove} />
      ))}
    </div>
  );
};

export default ChipFilters;