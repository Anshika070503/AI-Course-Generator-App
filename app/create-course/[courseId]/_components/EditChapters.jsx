'use client';

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditChapters({ course, index, refreshData }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const chapters = course?.courseOutput?.Chapters || [];

  // Prefill form fields when dialog opens
  useEffect(() => {
    if (open && chapters[index]) {
      console.log("Prefilling chapter data:", chapters[index]);
      setName(chapters[index].Name || "");
      setAbout(chapters[index].About || "");
    }
  }, [open]);

  const onUpdateHandler = async () => {
    try {
      // Update local data
      const updatedChapters = [...chapters];
      updatedChapters[index] = {
        ...updatedChapters[index],
        Name: name,
        About: about,
      };

      const updatedCourseOutput = {
        ...course.courseOutput,
        Chapters: updatedChapters,
      };

      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      console.log("✅ Chapter updated:", result);

      setOpen(false);
      refreshData(); // trigger re-fetch
    } catch (error) {
      console.error("❌ Update failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <HiPencilSquare className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          <label>Chapter Title</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chapter Title"
          />
        </div>

        <div className="mt-4">
          <label>Description</label>
          <Textarea
            className="h-40"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Chapter Description"
          />
        </div>

        <DialogFooter>
          <Button onClick={onUpdateHandler}>Update</Button>
          <DialogClose asChild>
            <button className="ml-2 px-4 py-2">Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
