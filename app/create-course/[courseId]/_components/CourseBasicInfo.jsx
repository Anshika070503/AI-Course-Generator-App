'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [previewUrl, setPreviewUrl] = useState(course?.courseBanner || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (course) {
      setPreviewUrl(course?.courseBanner);
    }
  }, [course]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);

      if (uploadedUrl) {
        setPreviewUrl(uploadedUrl);

        await db
          .update(CourseList)
          .set({ courseBanner: uploadedUrl })
          .where(eq(CourseList.id, course.id));

        refreshData(); // Refresh UI
        console.log("✅ courseBanner updated in DB");
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset_one");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dr7zhhaee/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) return data.secure_url;
    else throw new Error(data.error?.message || "Upload failed");
  };

  return (
    <div className='p-7 border rounded-xl shadow-sm mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl flex items-center gap-2'>
            {course?.courseOutput?.["Course Name"] || "Untitled"}
            {edit && (
              <span>
                <EditCourseBasicInfo course={course} refreshData={refreshData} />
              </span>
            )}
          </h2>

          <p className='text-sm text-gray-400 mt-3'>
            {course?.courseOutput?.Description || "No description available."}
          </p>

          <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'>
            <HiOutlinePuzzle />
            {course?.courseOutput?.Category || "No category"}
          </h2>

          <Button className="w-full mt-5">Start Course</Button>
        </div>

        <div>
          <label htmlFor="upload-image">
            <Image
              src={previewUrl || '/layout.jpg'}
              alt="Course Banner"
              width={100}
              height={100}
              className='w-full rounded-xl h-[200px] object-cover cursor-pointer'
            />
          </label>
      {edit &&     <input
            type="file"
            id="upload-image"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
      />}
          {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
