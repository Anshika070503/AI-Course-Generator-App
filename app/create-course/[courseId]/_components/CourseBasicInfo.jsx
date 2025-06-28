import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";

function CourseBasicInfo({course}) {

  return (
    <div className='p-7 border rounded-xl shadow-sm mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

        <div>
  <h2 className='font-bold text-3xl'>{course?.name}</h2>
<p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description || "No description available."}</p>

<h2 className='font-medium mt-2 flex gap-2 items-center text-primary'>
  <HiOutlinePuzzle />{course?.category}
</h2>

  <Button className="w-full mt-5">Start Course</Button>
        </div>
      <div>
      <Image src={'/layout.jpg'} alt="Course Image" width={120} height={120}
      className='w-full rounded-xl h-[200px] object-cover'/>
    </div>
    </div>
    </div>
    
  )
}

export default CourseBasicInfo