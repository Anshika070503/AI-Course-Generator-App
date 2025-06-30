'use client';

import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import CourseBasicInfo from '../_components/CourseBasicInfo'; // adjust path if needed
import { db } from '@/configs/db';
import { useParams } from 'next/navigation';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

export default function FinishPage() {
  const { user } = useUser();
  const params = useParams(); // ✅ courseId from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!user?.primaryEmailAddress?.emailAddress || !params?.courseId) return;

      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            and(
              eq(CourseList.courseId, params.courseId),
              eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
            )
          );

        setCourse(result[0]);
        console.log("✅ Course loaded in finish screen:", result[0]);
      } catch (err) {
        console.error("❌ Error loading course in finish screen:", err);
      }
    };

    fetchCourse();
  }, [params, user]);

  if (!course) {
    return <div className="text-center my-10">⏳ Loading course data...</div>;
  }

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="font-bold text-3xl text-center text-primary mb-5">Congrats!! Your Course is Ready</h2>
      
      <CourseBasicInfo course={course} refreshData={() => {}} />
        <h2 className='text-primary text-xl mt-3 mb-2'>Course URL:</h2>
        <h2 className='text-primary text-center border p-2 round flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
            <HiOutlineClipboardDocumentCheck className='h-6 w-6 cursor-pointer' 
            onClick={async()=>
                await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"/course/view/"+course?.courseId)
            }/>
        </h2>
    
    </div>
  );
}
