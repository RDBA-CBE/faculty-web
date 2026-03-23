"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface SidebarProps {
  filters: any;
  onFilterChange: (newFilters: any) => void;
  filterList?: any;
  loading?: boolean;
}

const FilterSection = ({ title, items, selected, onToggle }: any) => (
  <div>
    <h3 className="text-md font-semibold mb-3 pt-[15px]">{title}</h3>
    <div className="space-y-2">
      {items.map((item: any) => (
        <label key={item.value} className="flex gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selected?.includes(item.value)}
            onChange={() => onToggle(item.value)}
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const FilterbarNew = ({
  filters,
  onFilterChange,
  filterList,
}: SidebarProps) => {
  const [showCollegePopup, setShowCollegePopup] = useState(false);
  const [showDeptPopup, setShowDeptPopup] = useState(false);

  const [collegeSearch, setCollegeSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");

  const [debouncedCollege, setDebouncedCollege] = useState("");
  const [debouncedDept, setDebouncedDept] = useState("");

  const alphabetRefs = useRef<any>({});
  const [selectedAlphabet, setSelectedAlphabet] = useState("");

  const alphabets = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  // ✅ debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedCollege(collegeSearch), 300);
    return () => clearTimeout(t);
  }, [collegeSearch]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedDept(deptSearch), 300);
    return () => clearTimeout(t);
  }, [deptSearch]);

  // ✅ map API
  const mapped = useMemo(() => {
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

  const toggleItem = (list: any[], item: any) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  // ✅ filtering
  const filteredColleges = useMemo(() => {
    return mapped.colleges
      .filter((c: any) =>
        c.label.toLowerCase().includes(debouncedCollege.toLowerCase())
      )
      .sort((a: any, b: any) => a.label.localeCompare(b.label));
  }, [mapped.colleges, debouncedCollege]);

  const filteredDepartments = useMemo(() => {
    return mapped.departments
      .filter((d: any) =>
        d.label.toLowerCase().includes(debouncedDept.toLowerCase())
      )
      .sort((a: any, b: any) => a.label.localeCompare(b.label));
  }, [mapped.departments, debouncedDept]);

  const getAvailableLetters = (list: any[]) =>
    new Set(list.map((i) => i.label[0]?.toUpperCase()));

  const collegeLetters = getAvailableLetters(filteredColleges);
  const deptLetters = getAvailableLetters(filteredDepartments);

  // 🔒 lock scroll
  useEffect(() => {
    document.body.style.overflow =
      showCollegePopup || showDeptPopup ? "hidden" : "";
  }, [showCollegePopup, showDeptPopup]);

  return (
    <aside className="p-4 w-full">

      {/* COLLEGE */}
      <FilterSection
        title="Choose Colleges"
        items={filteredColleges.slice(0, 5)}
        selected={filters.colleges}
        onToggle={(v: any) =>
          onFilterChange({
            ...filters,
            colleges: toggleItem(filters.colleges, v),
          })
        }
      />

      {filteredColleges.length > 5 && (
        <button
          onClick={() => setShowCollegePopup(true)}
          className="text-sm text-blue-600"
        >
          View more
        </button>
      )}

      {/* COLLEGE POPUP */}
      {showCollegePopup && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white w-[800px] h-[450px] p-4 flex flex-col">

            {/* header */}
            <div className="flex justify-between border-b pb-2">
              <input
                placeholder="Search..."
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                className="border px-2 py-1"
              />
              <X onClick={() => setShowCollegePopup(false)} />
            </div>

            {/* alphabets */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {alphabets.map((c) => {
                const active = collegeLetters.has(c);
                return (
                  <span
                    key={c}
                    onClick={() => {
                      if (!active) return;
                      setSelectedAlphabet(c);
                      alphabetRefs.current[c]?.scrollIntoView();
                    }}
                    className={`cursor-pointer ${
                      active ? "" : "text-gray-300"
                    } ${selectedAlphabet === c ? "font-bold" : ""}`}
                  >
                    {c}
                  </span>
                );
              })}
            </div>

            {/* list */}
            <div className="overflow-auto mt-2">
              {filteredColleges.map((item: any, i: number) => {
                const curr = item.label[0].toUpperCase();
                const prev =
                  i > 0
                    ? filteredColleges[i - 1].label[0].toUpperCase()
                    : null;

                return (
                  <div key={item.value}>
                    {curr !== prev && (
                      <div
                        ref={(el) => (alphabetRefs.current[curr] = el)}
                        className="font-semibold mt-2"
                      >
                        {curr}
                      </div>
                    )}

                    <label className="flex gap-2">
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
                      />
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DEPARTMENT */}
      <FilterSection
        title="Choose Departments"
        items={filteredDepartments.slice(0, 5)}
        selected={filters.department}
        onToggle={(v: any) =>
          onFilterChange({
            ...filters,
            department: toggleItem(filters.department, v),
          })
        }
      />

      {filteredDepartments.length > 5 && (
        <button
          onClick={() => setShowDeptPopup(true)}
          className="text-sm text-blue-600"
        >
          View more
        </button>
      )}

      {/* DEPT POPUP */}
      {showDeptPopup && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white w-[800px] h-[450px] p-4 flex flex-col">

            <div className="flex justify-between border-b pb-2">
              <input
                placeholder="Search..."
                value={deptSearch}
                onChange={(e) => setDeptSearch(e.target.value)}
                className="border px-2 py-1"
              />
              <X onClick={() => setShowDeptPopup(false)} />
            </div>

            <div className="flex gap-2 mt-2 flex-wrap">
              {alphabets.map((c) => {
                const active = deptLetters.has(c);
                return (
                  <span
                    key={c}
                    onClick={() => {
                      if (!active) return;
                      setSelectedAlphabet(c);
                      alphabetRefs.current[c]?.scrollIntoView();
                    }}
                    className={`cursor-pointer ${
                      active ? "" : "text-gray-300"
                    } ${selectedAlphabet === c ? "font-bold" : ""}`}
                  >
                    {c}
                  </span>
                );
              })}
            </div>

            <div className="overflow-auto mt-2">
              {filteredDepartments.map((item: any, i: number) => {
                const curr = item.label[0].toUpperCase();
                const prev =
                  i > 0
                    ? filteredDepartments[i - 1].label[0].toUpperCase()
                    : null;

                return (
                  <div key={item.value}>
                    {curr !== prev && (
                      <div
                        ref={(el) => (alphabetRefs.current[curr] = el)}
                        className="font-semibold mt-2"
                      >
                        {curr}
                      </div>
                    )}

                    <label className="flex gap-2">
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
                      />
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LOCATION */}
      <FilterSection
        title="Location"
        items={mapped.locations}
        selected={filters.locations || []}
        onToggle={(v: any) =>
          onFilterChange({
            ...filters,
            locations: toggleItem(filters.locations || [], v),
          })
        }
      />

      {/* EXPERIENCE */}
      <FilterSection
        title="Experience"
        items={mapped.experiences}
        selected={filters.experienceLevels}
        onToggle={(v: any) =>
          onFilterChange({
            ...filters,
            experienceLevels: toggleItem(filters.experienceLevels, v),
          })
        }
      />

      {/* SALARY */}
      <FilterSection
        title="Salary"
        items={mapped.salary}
        selected={filters.salaryRange}
        onToggle={(v: any) =>
          onFilterChange({
            ...filters,
            salaryRange: toggleItem(filters.salaryRange, v),
          })
        }
      />
    </aside>
  );
};

export default FilterbarNew;