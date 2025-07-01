"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import { index } from 'drizzle-orm/pg-core';
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function UserCourseList() {
  const[courseList,setCourseList] = useState([]); 
  const{userCourseList,setUserCourseList}=useContext(UserCourseListContext)
  const {user} = useUser();

  useEffect(()=>{
    user&&getUserCourses();
  },[user])
  const getUserCourses=async()=>{
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result)
    setCourseList(result);
    setUserCourseList(result)
  }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-primary text-xl'>MY AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {courseList.length > 0 ? (
  courseList.map((course, index) => (
    <CourseCard
      course={course}
      key={index}
      refreshData={getUserCourses}
    />
  ))
) : (
  [1, 2, 3, 4, 5].map((item, index) => (
    <div
      key={index}
      className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[250px]'
    />
  ))
)}

      </div>
    </div>
  )
}

export default UserCourseList
