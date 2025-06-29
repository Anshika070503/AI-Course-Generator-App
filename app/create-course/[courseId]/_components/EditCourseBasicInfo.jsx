'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (course?.courseOutput) {
      setName(course.courseOutput["Course Name"] || "");
      setDescription(course.courseOutput["Description"] || "");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    const updatedCourseOutput = {
      ...course.courseOutput,
      "Course Name": name,
      "Description": description,
    };

    try {
      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      console.log("✅ Course updated:", result);
      refreshData(); // refresh parent component
    } catch (error) {
      console.error("❌ Update failed:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            Please update your course information below.
          </DialogDescription>
        </DialogHeader>

        {/* ✅ Form fields placed OUTSIDE of DialogDescription to fix hydration error */}
        <div className="mt-3">
          <label>Course Title</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Course name"
          />
        </div>

        <div className="mt-4">
          <label>Description</label>
          <Textarea
            className="h-40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onUpdateHandler}>Update</Button>
          <DialogClose asChild>
            <button className="ml-2 px-4 py-2">Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
