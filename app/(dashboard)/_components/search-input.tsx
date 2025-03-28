"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useDebounceValue, useDeboundCallback } from "usehooks-ts";
// ! Use next/navigation for app router, next/router for page router
import { useRouter } from "next/navigation"; 
import { Search } from "lucide-react";
import queryString from "query-string";

import { Input } from "@/components/ui/input";

const SearchInput = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4" />
      <Input className="w-full max-w-[516px] pl-9" placeholder="Search boards" />
    </div>
  );
};

export default SearchInput;
