import {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  POSTED_DATE_OPTIONS,
  TAGS,
} from "@/utils/constant.utils";
import React from "react";

interface SidebarProps {
  filters: any;
  onFilterChange: (newFilters: any) => void;
}

const Filterbar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const toggleItem = <T extends string>(list: T[], item: T) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  return (
    <aside className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border-0 md:border border-slate-100 h-fit sticky top-24">
      <div className=" lg:p-[19px] lg:py-[10px]">

        {/* Category */}
        <FilterSection
          title="Category"
          items={CATEGORIES.map((c) => c.label)}
          counts={CATEGORIES.map((c) => c.count)}
          selected={filters.categories}
          onToggle={(item) =>
            onFilterChange({
              ...filters,
              categories: toggleItem(filters.categories, item),
            })
          }
        />

        <button className=" mt-6 w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-lg text-sm transition-colors mb-4">
          Show More
        </button>

        {/* Job Type */}
        <FilterSection
          title="Job Type"
          items={JOB_TYPES}
          selected={filters.jobTypes}
          onToggle={(item) =>
            onFilterChange({
              ...filters,
              jobTypes: toggleItem(filters.jobTypes, item),
            })
          }
        />

        {/* Experience Level */}
        <FilterSection
          title="Experience Level"
          items={EXPERIENCE_LEVELS}
          selected={filters.experienceLevels}
          onToggle={(item) =>
            onFilterChange({
              ...filters,
              experienceLevels: toggleItem(filters.experienceLevels, item),
            })
          }
        />

        {/* Date Posted */}
        <div>
          <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">Date Posted</h3>
          <div className="space-y-2">
            {POSTED_DATE_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="datePosted"
                    checked={filters.datePosted === opt}
                    onChange={() =>
                      onFilterChange({ ...filters, datePosted: opt })
                    }
                    className="w-4 h-4 text-amber-500 border-slate-200 rounded focus:ring-amber-400"
                  />
                  <span className="text-md text-slate-600 group-hover:text-slate-900 transition-colors">
                    {opt}
                  </span>
                </div>
                <span className="text-xs text-slate-400">10</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Slider */}
        <div>
          <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">Salary</h3>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            className="w-full h-1 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
            onChange={(e) =>
              onFilterChange({
                ...filters,
                salaryRange: [0, parseInt(e.target.value)],
              })
            }
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-md font-semibold text-slate-700">
              Salary: $0 - ${filters.salaryRange[1]}
            </span>
            <button className="px-3 py-1 bg-amber-400 text-slate-900 text-md font-bold rounded hover:bg-amber-500 transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
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
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const FilterSection: React.FC<{
  title: string;
  items: string[];
  counts?: number[];
  selected: string[];
  onToggle: (item: string) => void;
}> = ({ title, items, counts, selected, onToggle }) => (
  <div>
    <h3 className="text-md font-bold text-slate-800 mb-3 pt-[15px]">{title}</h3>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <label
          key={item}
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
          {counts && (
            <span className="text-xs text-slate-400">{counts[idx]}</span>
          )}
        </label>
      ))}
    </div>
  </div>
);

export default Filterbar;
