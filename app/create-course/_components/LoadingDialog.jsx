"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import React from "react";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generating Course...</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex flex-col items-center py-4">
            <Image src="/loader.gif" width={100} height={100} alt="Loading..." />
            <p className="mt-4 text-center text-sm">
              Please wait... AI is generating your course.
            </p>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
