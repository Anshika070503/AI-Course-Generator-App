"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';

function CourseLayout({ courseId }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [courseId, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, courseId),
          eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
        )
      );
    setCourse(result[0]);
  };

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      {course && <CourseBasicInfo course={course} />}
      {course && <CourseDetail course={course} />}
    </div>
  );
}

export default CourseLayout;
