import Image from 'next/image';
import React from 'react';
import { HiMiniEllipsisVertical } from 'react-icons/hi2';
import DropdownOption from './DropdownOption';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import Link from 'next/link';

function CourseCard({ course, refreshData }) {
  const handleOnDelete = async () => {
    try {
      console.log('Deleting ID:', course?.id);
      const resp = await db
        .delete(CourseList)
        .where(eq(CourseList.id, course?.id))
        .returning({ id: CourseList?.id });
        if (!course?.id) {
  console.warn("❗Course ID is undefined. Skipping delete.");
  return;
}
console.log('Delete Response:', resp);


      if (resp) {
        refreshData();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="shadow-sm rounded-lg border-black p-2 cursor-pointer mt-4">
      <Link href={`/course/${course?.courseId}`}>
        <Image
          src={course?.courseBanner}
          alt="Course Card"
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.courseOutput?.["Course Name"]}
          <DropdownOption handleOnDelete={handleOnDelete}>
            <HiMiniEllipsisVertical />
          </DropdownOption>
        </h2>

        <p className="text-m text-gray-700 my-1">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-gray-300 border text-primary text-sm rounded-sm">
            {course?.courseOutput?.Duration}
          </h2>
          <h2 className="text-sm bg-gray-300 p-1 border rounded-sm">{course?.level}</h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;