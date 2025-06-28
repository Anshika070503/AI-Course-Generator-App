'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import CourseLayout from './CourseLayout';

export default function Page() {
  const params = useParams(); 
  const courseId = params?.courseId;

  return (
    <>
      <SignedIn>
        <CourseLayout courseId={courseId} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
