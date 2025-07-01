"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { HiOutlineSearch } from "react-icons/hi";
import CourseCard from "../_components/CourseCard";
import { eq, isNotNull } from "drizzle-orm"; // optional utility

function ExplorePage() {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const result = await db
  .select()
  .from(CourseList)
  .where(eq(CourseList.isDeleted, false)); 

    setAllCourses(result);
    setFilteredCourses(result);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = allCourses.filter((course) =>
      course?.courseOutput?.["Course Name"]
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="px-6 md:px-16 lg:px-28 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Explore Courses</h1>

      {/* 🔍 Search */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md mb-8">
        <HiOutlineSearch className="text-gray-500 text-xl" />
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-transparent border-none focus:ring-0"
        />
      </div>

      {/* 📚 Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">No courses found.</p>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
