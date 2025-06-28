import React from 'react'
import { HiOutlineBookOpen, HiOutlineChartBar, HiOutlineClock, HiOutlinePlayCircle } from 'react-icons/hi2';

function CourseDetail({ course }) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>

        {/* Skill level */}
        <div className='flex gap-2'>
          <HiOutlineChartBar className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>Skill level</h2>
            <h2 className='font-medium text-lg'>{course?.level || "N/A"}</h2>
          </div>
        </div>

        {/* Duration */}
        <div className='flex gap-2'>
          <HiOutlineClock className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>Duration</h2>
            <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration || "N/A"}</h2>
          </div>
        </div>

        {/* No of Chapters */}
        <div className='flex gap-2'>
          <HiOutlineBookOpen className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>No of Chapters</h2>
            <h2 className='font-medium text-lg'>{course?.courseOutput?.Chapters?.length || 0}</h2>
          </div>
        </div>

        {/* Video included */}
        <div className='flex gap-2'>
          <HiOutlinePlayCircle className='text-4xl text-primary' />
          <div>
            <h2 className='text-xs text-gray-500'>Video Included?</h2>
            <h2 className='font-medium text-lg'>{course?.includeVideo || "No"}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}


export default CourseDetail
