import React from "react";
import {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  POSTED_DATE_OPTIONS,
  TAGS,
} from "@/utils/constant.utils";

interface CategoryItem {
  value: number;
  label: string;
}

interface SidebarProps {
  filters: {
    categories: any[];
    jobTypes: any[];
    experienceLevels: any[];
    datePosted: any;
    salaryRange: any[];
    tags: any[];
  };
  onFilterChange: (newFilters: any) => void;
  categoryList?: CategoryItem[];
  locationList?: any[];
  jobTypeList?: any[];
  experienceList?: any[];
  datePostedList?: any[];
  salaryRangeList?: any[];
  tagsList?: any[];
}

const FilterSection: React.FC<{
  title: string;
  items: { value: number; label: string }[];
  counts?: number[];
  selected: number[];
  onToggle: (value: number) => void;
}> = ({ title, items, counts, selected, onToggle }) => (
  <div>
    <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">{title}</h3>

    <div className="space-y-2">
      {items.map((item, idx) => (
        <label
          key={idx} // ✅ FIXED
          className="flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selected.includes(item.value)}
              onChange={() => onToggle(item.value)}
              className="w-4 h-4 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
            />
            <span className="text-md text-slate-600 group-hover:text-slate-900 transition-colors">
              {item.label}
            </span>
          </div>

          {counts && (
            <span className="text-xs text-slate-400">{counts[idx]}</span>
          )}
        </label>
      ))}
    </div>
  </div>
);

const FilterSectionRadio: React.FC<{
  title: string;
  items: { value: number; label: string }[];
  selected: any;
  name: string;
  onChange: (value: number | null) => void;
}> = ({ title, items, selected, name, onChange }) => (
  <div>
    <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">{title}</h3>

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
          <span className="text-md text-slate-600">{item.label}</span>
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
    <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">{title}</h3>

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
  datePostedList,
  salaryRangeList,
  tagsList
}) => {
  const toggleItem = <T,>(list: T[], item: T) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  return (
    <aside className="w-full h-full">
      <div className="lg:p-[19px] lg:py-[10px]">
        {/* Job Sectors */}
        <FilterSection
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
          <button className="mt-6 w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-lg text-sm transition-colors mb-4">
            Show More
          </button>
        )}
        {/* Job Type */}
        <FilterSection
          title="Job Type"
          items={jobTypeList ?? []}
          selected={filters.jobTypes}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              jobTypes: toggleItem(filters.jobTypes, value),
            })
          }
        />

       

         <FilterSectionRadio
          title="Experience Level"
          items={experienceList ?? []}
          name="experienceLevel"
          selected={filters.experienceLevels}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              experienceLevels: value,
            })
          }
        />

        <FilterSection
          title="Salary Range"
          items={salaryRangeList ?? []}
          selected={filters.salaryRange}
          onToggle={(value) =>
            onFilterChange({
              ...filters,
              salaryRange: toggleItem(filters.salaryRange, value),
            })
          }
        />

         {/* Experience Level */}
        <FilterSectionRadio
          title="Date Posted"
          items={datePostedList ?? []}
          name="datePosted"
          selected={filters.datePosted}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              datePosted: value,
            })
          }
        />

    


        {/* Tags */}
        <div>
          <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">
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
        </div>
      </div>
    </aside>
  );
};

export default Filterbar;
