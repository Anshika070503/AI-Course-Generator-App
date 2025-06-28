import React from 'react'
import { HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2'

function ChapterList({course}) {
  return (
    <div className='mt-3'>
    <h2 className="text-2xl font-semibold text-center my-8">📖 Chapters</h2>

      <div className='mt-2'>
      {course?.courseOutput?.Chapters?.map((chapter, index) => {
  return (
    <div key={index} className='border p-3 rounded-lg mb-2 flex items-center justify-between'>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2'>
          {index + 1}
        </h2>
        <div>
          <h2 className='font-medium text-lg'>{chapter?.Name}</h2>
          <p className='text-sm text-gray-500'>{chapter?.About}</p>
          <p className='flex gap-2 text-primary items-center'>
            <HiOutlineClock /> {chapter?.Duration}
          </p>
        </div>
      </div>
      <HiOutlineCheckCircle className='text-4xl text-gray-300 flex-none' />
    </div>
  );
})}

      </div>
    </div>
  )
}

export default ChapterList
