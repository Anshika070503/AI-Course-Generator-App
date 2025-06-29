'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';

export default function CourseLayout({ courseId }) {
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Define fetchCourse using useCallback so it’s not recreated unnecessarily
  const fetchCourse = useCallback(async () => {
    if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) {
      console.log('⏳ Waiting for Clerk user to load...');
      return;
    }

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, courseId),
            eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );

      console.log("✅ Fetched course object:", JSON.stringify(result[0], null, 2));
      setCourse(result[0] || null);
    } catch (err) {
      console.error('❌ Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  }, [courseId, isLoaded, user]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (loading) return <div className="text-center mt-10">⏳ Loading...</div>;

  if (!course) return <div className="text-center mt-10 text-red-600">❌ Course not found.</div>;

  return (
    <div className="mt-2 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-xl">📘 Course Layout</h2>

      {/* ✅ Pass fetchCourse as a function to child components */}
      <CourseBasicInfo course={course} refreshData={fetchCourse} />
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={fetchCourse} />
    </div>
  );
}
