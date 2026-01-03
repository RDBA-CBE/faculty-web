"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const FILTER_OPTIONS = {
  distance: ["Within 25 kilometres", "Within 50 kilometres", "Within 100 kilometres"],
  jobType: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
  jobLanguage: ["English", "Spanish", "French", "German", "Chinese"],
  programmingLanguage: ["JavaScript", "Python", "Java", "C++", "React", "Node.js"],
  educationLevel: ["High School", "Bachelor's", "Master's", "PhD"],
  datePosted: ["Last 24 hours", "Last 3 days", "Last week", "Last month"]
};

const ChipFilter = ({ title, options, selected, onSelectionChange, count }) => {
  const selectedCount = selected.length;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`h-12 px-4 rounded-full border-2 transition-all ${
            selected.length > 0
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
          }`}
        >
          {title}
          {selectedCount > 0 && (
            <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
              {selectedCount}
            </span>
          )}
          {count && selectedCount === 0 && (
            <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={selected.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectionChange([...selected, option]);
                    } else {
                      onSelectionChange(selected.filter(item => item !== option));
                    }
                  }}
                />
                <label
                  htmlFor={option}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function ChipFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <ChipFilter
        title="Within 25 kilometres"
        options={FILTER_OPTIONS.distance}
        selected={filters.distance || []}
        onSelectionChange={(selected) => onFilterChange({ ...filters, distance: selected })}
      />
      
      <ChipFilter
        title="Job type"
        options={FILTER_OPTIONS.jobType}
        selected={filters.jobTypes || []}
        onSelectionChange={(selected) => onFilterChange({ ...filters, jobTypes: selected })}
      />
      
      <ChipFilter
        title="Job Language"
        options={FILTER_OPTIONS.jobLanguage}
        selected={filters.jobLanguage || []}
        onSelectionChange={(selected) => onFilterChange({ ...filters, jobLanguage: selected })}
      />
      
      <ChipFilter
        title="Programming language"
        options={FILTER_OPTIONS.programmingLanguage}
        selected={filters.programmingLanguage || []}
        onSelectionChange={(selected) => onFilterChange({ ...filters, programmingLanguage: selected })}
      />
      
      <ChipFilter
        title="Education level"
        options={FILTER_OPTIONS.educationLevel}
        selected={filters.educationLevel || []}
        onSelectionChange={(selected) => onFilterChange({ ...filters, educationLevel: selected })}
      />
      
      <ChipFilter
        title="Date posted"
        options={FILTER_OPTIONS.datePosted}
        selected={filters.datePosted === "All" ? [] : [filters.datePosted]}
        onSelectionChange={(selected) => onFilterChange({ ...filters, datePosted: selected[0] || "All" })}
      />
    </div>
  );
}