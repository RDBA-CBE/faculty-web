"use client";

import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useRef } from "react";

const CustomSelect = (props) => {
  const {
    options,
    value,
    onChange,
    placeholder = "Select an option",
    title,
    required,
    error,
    disabled,
    className,
    loadMore,
    loading,
  } = props;

  const selectedOption = options?.find((option) => option.value === value);
  const loadMoreCalledRef = useRef(false);

  const handleScroll = (e) => {
    if (!loadMore) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;
    if (isNearBottom && !loadMoreCalledRef.current) {
      loadMoreCalledRef.current = true;
      loadMore("");
      setTimeout(() => {
        loadMoreCalledRef.current = false;
      }, 500);
    }
  };

  return (
    <div className="w-full">
      {title && (
        <label className="block text-sm font-bold text-gray-700 mb-2">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <Select
          value={value ? String(value) : ""}
          onValueChange={(val) => {
            const selected = options?.find(
              (option) => String(option.value) === val,
            );
            onChange(selected || null);
          }}
          disabled={disabled}
        >
          <SelectTrigger
            className={`shadow-none bg-none ${
              selectedOption ? "pr-10 [&>svg]:hidden" : ""
            } ${className || "border-none"}`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent onScroll={handleScroll}>
            {options?.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
            {loading && (
              <div className="py-2 text-center text-xs text-gray-400">Loading...</div>
            )}
          </SelectContent>
        </Select>

        {selectedOption && !disabled && (
          <button
            onClick={() => onChange(null)}
            className="absolute right-[0px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;
