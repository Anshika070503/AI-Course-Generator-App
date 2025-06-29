'use client';

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';
import model from "@/configs/AImodel";
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { UserInputContext } from '@/app/_context/UserInputContext';
import LoadDialog from '../_components/LoadDialog';

export default function CourseLayout({ courseId }) {
  const { user, isLoaded } = useUser();
  const{userCourseInput,setUserCourseInput} = useContext(UserInputContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);

  useEffect(()=>{
        console.log(userCourseInput);
    },[userCourseInput])

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

const GenerateChapterContent = async () => { 
  console.log("⚡ Generate Chapter Content called");

  try {
    setLoading(true);

    const prompt = `
Explain the concept in detail on
Topic:${userCourseInput.name},  Chapter: ${userCourseInput.Chapters}.
, in JSON format with list of array with field as title , explanation on give chapter in detail , Code Example (Code field in <precode> format) if applicable`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }]
    });

    const text = await result.response.text();
    console.log("🤖 AI Output:", text);

    // ✅ Clean up triple backticks if present
    let cleanText = text.trim();
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```json|```/g, "").trim();
    }

    const parsed = JSON.parse(cleanText);
    setCourseData(parsed); // ✅ Now this will not throw an error
    console.log("✅ Parsed JSON set.");
    //SaveCourseLayoutInDb(parsed);

  } catch (err) {
    console.error("❌ Gemini API error:", err);
    alert("AI call failed—check console.");
  } finally {
    setLoading(false);
  }
 
};
  
  return (
    <div className="mt-2 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-xl">📘 Course Layout</h2>
      <LoadDialog loading={loading}/>

      {/* ✅ Pass fetchCourse as a function to child components */}
      <CourseBasicInfo course={course} refreshData={fetchCourse} />
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={fetchCourse} />
      <Button onClick={GenerateChapterContent} className='my-7 '>Generate Course Content</Button>
    </div>
  );
}
