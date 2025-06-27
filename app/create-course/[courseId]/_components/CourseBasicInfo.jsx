import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";

function CourseBasicInfo({course}) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

        <div>
   <h2 className='font-bold text-3xl'>{course?.courseOutput?.course?.name}</h2>
   <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.course?.description}</p>
  <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.category}</h2>
  <Button className="w-full mt-5">Start Course</Button>
        </div>
      <div>
      <Image src={'/placeholder.png'} alt="Course Image" width={200} height={100}
      className='w-full rounded-xl h-[200px] object-cover'/>
    </div>
    </div>
    
    </div>
    
  )
}

export default CourseBasicInfo