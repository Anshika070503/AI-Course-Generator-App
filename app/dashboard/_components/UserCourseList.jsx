"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import { index } from 'drizzle-orm/pg-core';
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';

function UserCourseList() {
  const[courseList,setCourseList] = useState([]); 
  const {user} = useUser();

  useEffect(()=>{
    user&&getUserCourses();
  },[user])
  const getUserCourses=async()=>{
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result)
    setCourseList(result);
  }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-primary text-xl'>MY AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList.map((course,index)=>{
          return <CourseCard course={course} key={index}/>
        })}
      </div>
    </div>
  )
}

export default UserCourseList
