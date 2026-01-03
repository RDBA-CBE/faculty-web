"use client";

import Filterbar from "@/components/component/filterbar.component";
import ChipFilters from "@/components/component/chipFilters.component";
import JobCard from "@/components/component/jobCard.component";
import { MOCK_JOBS } from "@/utils/constant.utils";
import { generateMockJobs } from "@/utils/function.utils";
import { MapPin, Search, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function JobsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    searchQuery: "",
    location: "",
    categories: [],
    jobTypes: [],
    experienceLevels: [],
    datePosted: "All",
    salaryRange: [0, 9999],
    tags: [],
  });

  const filteredJobs = useMemo(() => {
    return generateMockJobs(MOCK_JOBS, 51).filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchLocation =
        !filters.location || job.location === filters.location;
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(job.category);
      const matchType =
        filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);
      const matchExperience =
        filters.experienceLevels.length === 0 ||
        filters.experienceLevels.includes(job.experience);
      const matchTags =
        filters.tags.length === 0 ||
        job.tags.some((tag) => filters.tags.includes(tag));

      const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ""));
      const matchSalary = jobSalary <= filters.salaryRange[1];

      return (
        matchSearch &&
        matchLocation &&
        matchCategory &&
        matchType &&
        matchExperience &&
        matchTags &&
        matchSalary
      );
    });
  }, [filters]);

  return (
    <div className=" bg-white">
      <div className="bg-black py-12 px-4 ">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white ">Jobs</h1>
         
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          <div
            className={`fixed lg:sticky lg:top-16 z-50 lg:z-0 left-0 top-0 h-full lg:h-auto w-80 lg:w-auto transition-transform lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Filterbar filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="flex-grow">
            <div className="sticky top-16 z-10 bg-white lg:pb-5">
              <div className="flex flex-col lg:flex-row items-center w-full bg-white border border-slate-100 rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-1">
              <div className="flex-grow flex items-center px-6 py-4 lg:py-0 w-full lg:w-auto">
                <Search color="#F2B31D" size={22} />
                <input
                  type="text"
                  placeholder="Search by: Job tittle, Position, Keyword..."
                  className="w-full pl-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                />
              </div>

              <div className="hidden lg:block w-px h-10 bg-slate-100"></div>

              <div className="flex items-center w-full lg:w-auto p-2 lg:p-1 gap-2 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center px-4 flex-grow lg:w-64">
                  <MapPin color="#F2B31D" size={22} />

                  <input
                    type="text"
                    placeholder="City, state or zip code"
                    className="w-full pl-4 bg-transparent text-sm text-slate-600 focus:outline-none placeholder:text-slate-400 font-medium"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                  />
                  <button className="p-2 text-slate-400 hover:text-amber-500 transition-colors"></button>
                </div>

                <button className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl text-sm shadow-sm transition-all active:scale-95 whitespace-nowrap">
                  Find Job
                </button>
              </div>
            </div>

            <div className="py-4 lg:hidden flex items-center justify-between">
              <div className="hidden md:block lg:hidden flex-1">
                <ChipFilters filters={filters} onFilterChange={setFilters} />
              </div>
              
              <div className="md:hidden">
                <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll scrollbar-hide">
                    <SheetHeader>
                      <SheetTitle>Filter Jobs</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 overflow-y-scroll scrollbar-hide max-h-[calc(80vh-100px)]">
                      <Filterbar filters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

            {filteredJobs.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                style={{
                  gap: "20px",
                }}
              >
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No jobs found
                </h3>
                <p className="text-slate-500 text-sm">
                  Try adjusting your filters to find more results.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: "",
                      location: "",
                      categories: [],
                      jobTypes: [],
                      experienceLevels: [],
                      datePosted: "All",
                      salaryRange: [0, 9999],
                      tags: [],
                    })
                  }
                  className="mt-6 text-amber-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
