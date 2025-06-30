'use client';

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';
import model from "@/configs/AImodel";
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { UserInputContext } from '@/app/_context/UserInputContext';
import LoadDialog from '../_components/LoadDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';


export default function CourseLayout({ courseId }) {
  const { user, isLoaded } = useUser();
  const { userCourseInput } = useContext(UserInputContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const router = useRouter();

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

      console.log("✅ Fetched course object:", result[0]);
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
Topic: ${userCourseInput?.name}, Chapter: ${userCourseInput?.Chapters}.
Give it in JSON array format with fields:
- title
- explanation (on given chapter in detail)
- code (if applicable, wrap code inside <precode>...</precode>)
`;

      const result = await model.generateContent({
        contents: [{ parts: [{ text: prompt }] }],
      });

      const text = await result.response.text();
      console.log("🧠 AI Raw Response:", text);

      let cleanText = text.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/```json|```/g, "").trim();
      }

      // Try to match and parse JSON array from AI response
      const jsonMatch = cleanText.match(/\[.*\]/s);
      if (!jsonMatch) {
        console.error("❌ No JSON array found in AI response");
        alert("Invalid format from AI model.");
        setLoading(false);
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(jsonMatch[0]);
        console.log("✅ Parsed content:", parsed);
      } catch (e) {
        console.error("❌ JSON parse failed:", jsonMatch[0]);
        alert("AI returned invalid JSON. Check console.");
        setLoading(false);
        return;
      }

      setCourseData(parsed);

      // YouTube video fetch
      const query = `${userCourseInput?.name} ${userCourseInput?.Chapters}`;
      const resp = await service.getVideos(query);

      const videoIds = resp?.items?.map((video) => video.id?.videoId || video.id) || [];

      if (videoIds.length === 0) {
        console.warn("⚠️ No videos found.");
      } else {
        console.log("📺 Video IDs:", videoIds);
      }

      // Safe insert into DB
     const chapterId = Math.floor(Math.random() * 1000000); // integer
      const joinedVideoIds = videoIds.join(',');

      if (!course?.courseId) {
        console.error("❌ Missing courseId, cannot insert.");
        alert("Course ID missing.");
        setLoading(false);
        return;
      }

      await db.insert(Chapters).values({
        chapterId,
        courseId: course.courseId,
        content: parsed,
        videoId: joinedVideoIds,
      });

     await db.update(CourseList).set({
      publish:true
     })

      router.replace(`/create-course/${course?.courseId}/finish`);
    } catch (err) {
      console.error("❌ Error generating chapter content:", err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-xl">📘 Course Layout</h2>
      <LoadDialog loading={loading} />

      <CourseBasicInfo course={course} refreshData={fetchCourse} />
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={fetchCourse} />
      <Button onClick={GenerateChapterContent} className='my-7'>Generate Course Content</Button>
       <LoadDialog loading={loading}/>
    </div>
  );
}
