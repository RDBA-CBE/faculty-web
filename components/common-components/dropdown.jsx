// "use client";

// import { X } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";

// import React, { useRef, useCallback } from "react";

// const CustomSelect = (props) => {
//   const {
//     options,
//     value,
//     onChange,
//     placeholder = "Select an option",
//     title,
//     required,
//     error,
//     disabled,
//     className,
//     loadMore,
//     loading,
//     isMulti = false,
//   } = props;

//   const loadMoreCalledRef = useRef(false);
//   const contentRef = useRef(null);

//   // ✅ normalize value
//   const selectedValues = isMulti ? value || [] : value;

//   const selectedOptions = isMulti
//     ? options?.filter((opt) => selectedValues?.includes(opt.value))
//     : options?.find((opt) => opt.value === value);

//   const handleSelect = (val) => {
//     const selected = options?.find(
//       (opt) => String(opt.value) === String(val)
//     );

//     if (!selected) return;

//     if (isMulti) {
//       let updated;

//       if (selectedValues?.includes(selected.value)) {
//         // remove
//         updated = selectedValues.filter((v) => v !== selected.value);
//       } else {
//         // add
//         updated = [...selectedValues, selected.value];
//       }

//       onChange(updated);
//     } else {
//       onChange(selected);
//     }
//   };

//   const handleScroll = useCallback(
//     (e) => {
//       if (!loadMore || loading || loadMoreCalledRef.current) return;
//       const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
//       const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;

//       if (isNearBottom) {
//         loadMoreCalledRef.current = true;
//         loadMore("");
//         setTimeout(() => {
//           loadMoreCalledRef.current = false;
//         }, 800);
//       }
//     },
//     [loadMore, loading]
//   );

//   const handleContentRef = useCallback(
//     (node) => {
//       contentRef.current = node;
//       if (!node || !loadMore) return;

//       const viewport = node.querySelector("[data-radix-select-viewport]");
//       if (viewport) {
//         viewport.addEventListener("scroll", handleScroll);
//       }
//     },
//     [handleScroll, loadMore]
//   );

//   return (
//     <div className="w-full">
//       {title && (
//         <label className="block text-sm font-bold text-gray-700 mb-2">
//           {title} {required && <span className="text-red-500">*</span>}
//         </label>
//       )}

//       <div className="relative">
//         <Select
//           value={isMulti ? undefined : value ? String(value) : ""}
//           onValueChange={handleSelect}
//           disabled={disabled}
//         >
//           <SelectTrigger className={`${className || "border-none"}`}>
//             {/* ✅ Multi select display */}
//             {isMulti ? (
//               <div className="flex flex-wrap gap-1">
//                 {selectedOptions?.length > 0 ? (
//                   selectedOptions.map((opt) => (
//                     <span
//                       key={opt.value}
//                       className="bg-gray-200 px-2 py-0.5 rounded flex items-center gap-1 text-sm"
//                     >
//                       {opt.label}
//                       <X
//                         className="w-3 h-3 cursor-pointer"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleSelect(opt.value);
//                         }}
//                       />
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-gray-400">{placeholder}</span>
//                 )}
//               </div>
//             ) : (
//               <span>
//                 {selectedOptions?.label || (
//                   <span className="text-gray-400">{placeholder}</span>
//                 )}
//               </span>
//             )}
//           </SelectTrigger>

//           <SelectContent
//             ref={handleContentRef}
//             className="max-h-[220px] overflow-y-auto"
//           >
//             {options?.map((option) => {
//               const isSelected = isMulti
//                 ? selectedValues?.includes(option.value)
//                 : value === option.value;

//               return (
//                 <SelectItem
//                   key={option.value}
//                   value={String(option.value)}
//                   className={isSelected ? "bg-gray-100" : ""}
//                 >
//                   {option.label}
//                 </SelectItem>
//               );
//             })}

//             {loading && (
//               <div className="py-2 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
//                 <span className="w-3 h-3 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin inline-block" />
//                 Loading...
//               </div>
//             )}
//           </SelectContent>
//         </Select>

//         {/* ✅ Clear all */}
//         {selectedOptions && !disabled && (
//           <button
//             onClick={() => onChange(null)}
//             className="absolute right-[0px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )}

//         {/* {isMulti && selectedValues?.length > 0 && (
//           <button
//             onClick={() => onChange([])}
//             className="absolute right-[0px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )} */}
//       </div>

//       {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
//     </div>
//   );
// };

// export default CustomSelect;



"use client";

import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useRef, useCallback } from "react";

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
  const contentRef = useRef(null);

  const handleScroll = useCallback(
    (e) => {
      if (!loadMore || loading || loadMoreCalledRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;
      if (isNearBottom) {
        loadMoreCalledRef.current = true;
        loadMore("");
        setTimeout(() => {
          loadMoreCalledRef.current = false;
        }, 800);
      }
    },
    [loadMore, loading]
  );

  // Attach scroll listener to the inner radix viewport once content mounts
  const handleContentRef = useCallback(
    (node) => {
      contentRef.current = node;
      if (!node || !loadMore) return;
      const viewport = node.querySelector("[data-radix-select-viewport]");
      if (viewport) {
        viewport.addEventListener("scroll", handleScroll);
      }
    },
    [handleScroll, loadMore]
  );

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
              (option) => String(option.value) === val
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
          <SelectContent
            ref={handleContentRef}
            className="max-h-[220px] overflow-y-auto w-[70%] overflow-x-auto mx-auto"
          >
            {options?.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
            {loading && (
              <div className="py-2 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <span className="w-3 h-3 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin inline-block" />
                Loading...
              </div>
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
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomSelect;
