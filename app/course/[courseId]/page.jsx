"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation'; 
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import Header from '@/app/_components/Header';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';

function Course() {
  const[course,setCourse] = useState();
  const params = useParams(); 
  const courseId = params?.courseId;

  useEffect(() => {
    if (courseId) {
      GetCourse();
    }
  }, [courseId]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, courseId));
        setCourse(result[0])
      console.log(result);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  return (
    <div>
      <Header/>
      <div className='px-10 p-10 md:px-20 lg:px-44'>
       <CourseBasicInfo course={course}edit={false}/>
       <CourseDetail course={course}/>
       <ChapterList course={course} edit={false}/>
      </div>
      
    </div>
  );
}

export default Course;
