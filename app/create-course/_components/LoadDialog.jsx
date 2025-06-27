import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

function LoadDialog({ loading }) {
  return (
    <AlertDialog open={loading} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg font-semibold">
            Please wait...
          </AlertDialogTitle>

          <div className='flex flex-col items-center py-1'>
            <Image src={'/loader.gif'} width={100} height={100} alt="Loading" />
            <AlertDialogDescription className="mt-2 text-center">
              AI is working on your course
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadDialog;
