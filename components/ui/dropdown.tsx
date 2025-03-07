"use client";
import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  name: string;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  name
}: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (option: string) => {
    onChange(option);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
             
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-gray-100">{label}</Label>
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          className="flex h-10 w-72 md:w-full bg-gray-800/50 border-gray-700 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 rounded-md border px-3 py-2 text-sm text-gray-100 cursor-pointer"
        >
          {value || placeholder}
          <div className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        
        {dropdownOpen && (
          <div className="absolute z-10 mt-1 md:w-full w-72 rounded-md border bg-gray-800 border-gray-700 text-white shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}