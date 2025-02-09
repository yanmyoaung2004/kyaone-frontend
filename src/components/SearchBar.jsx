"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// interface SearchBarProps {
//   placeholder?: string
//   onSearch?: (value: string, category: string) => void
//   className?: string
// }

// Sample categories - replace with your actual categories
const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "home", label: "Home & Garden" },
];

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  className = "",
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value, category);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (onSearch) {
      onSearch(searchQuery, value);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("", category);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-8 pr-10 py-5 rounded-full"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[140px] py-5">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
