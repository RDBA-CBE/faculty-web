"use client";

import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const CustomSelect = (props) => {
  const {
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    title,
    required,
    error,
    disabled,
    className,
    isMulti = false,

    // 🔥 NEW PROPS
    loadOptions,
    hasMore,
    isLoading,
  } = props;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const selectedValues = isMulti
    ? Array.isArray(value)
      ? value
      : []
    : value
    ? [value]
    : [];

  // 🔍 API CALL
  useEffect(() => {
    if (loadOptions) {
      loadOptions({ search, page });
    }
  }, [search, page]);

  const handleSelect = (val) => {
    if (!isMulti) {
      const selected = options?.find(
        (o) => String(o.value) === val
      );
      onChange(selected || null);
      setOpen(false); // close for single
      return;
    }

    let updated;
    if (selectedValues.includes(val)) {
      updated = selectedValues.filter((v) => v !== val);
    } else {
      updated = [...selectedValues, val];
    }

    onChange(updated);
  };

  const selectedLabels = options
    ?.filter((o) => selectedValues.includes(String(o.value)))
    .map((o) => o.label);

  return (
    <div className="w-full">
      {title && (
        <label className="block text-sm font-bold text-gray-700 mb-2">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        open={open}
        onOpenChange={setOpen}
        value={!isMulti ? String(value || "") : undefined}
        onValueChange={handleSelect}
        disabled={disabled}
      >
        {/* 🔹 TRIGGER */}
        <SelectTrigger className={`shadow-none ${className || "border-none"}`}>
          {selectedLabels?.length > 0 ? (
            <div className="flex flex-wrap gap-1 pr-6">
              {selectedLabels.map((label, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-2 py-0.5 rounded text-xs flex items-center gap-1"
                >
                  {label}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(
                        options.find((o) => o.label === label).value
                      );
                    }}
                  />
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </SelectTrigger>

        {/* 🔹 DROPDOWN */}
        <SelectContent className="p-2">
          {/* 🔍 SEARCH */}
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full mb-2 px-2 py-1 border rounded text-sm"
          />

          {/* 🔹 OPTIONS */}
          <div className="max-h-48 overflow-auto">
            {options?.map((option) => {
              const isSelected = selectedValues.includes(
                String(option.value)
              );

              return (
                <SelectItem
                  key={option.value}
                  value={String(option.value)}
                  onSelect={(e) => {
                    if (isMulti) {
                      e.preventDefault(); // keep open
                      handleSelect(String(option.value));
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {isMulti && (
                      <input type="checkbox" checked={isSelected} readOnly />
                    )}
                    {option.label}
                  </div>
                </SelectItem>
              );
            })}

            {/* 🔄 LOAD MORE */}
            {hasMore && (
              <button
                className="w-full text-sm py-2 text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => p + 1);
                }}
              >
                {isLoading ? "Loading..." : "Load more"}
              </button>
            )}
          </div>

          {/* ✅ APPLY BUTTON */}
          {isMulti && (
            <div className="mt-2 border-t pt-2">
              <button
                className="w-full bg-blue-600 text-white py-1.5 rounded text-sm"
                onClick={() => setOpen(false)}
              >
                Apply
              </button>
            </div>
          )}
        </SelectContent>
      </Select>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;