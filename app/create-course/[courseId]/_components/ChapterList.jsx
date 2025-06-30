'use client';

import React from 'react';
import { HiOutlineClock } from 'react-icons/hi2';
import EditChapters from './EditChapters';

function ChapterList({ course, refreshData, edit = true }) {
  const chapters = course?.courseOutput?.Chapters || [];

  return (
    <div className='mt-6'>
      <h2 className='font-semibold text-xl text-gray-800 mb-4'>📚 Chapters</h2>

      {chapters.length === 0 ? (
        <p className='text-gray-500'>No chapters found.</p>
      ) : (
        <div className='space-y-4'>
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className='border p-5 rounded-xl flex items-start justify-between gap-4 shadow-sm'
            >
              <div className='flex gap-4'>
                <div className='bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold text-lg'>
                  {index + 1}
                </div>
                <div className='max-w-md'>
                  <h3 className='text-lg font-medium text-gray-800'>
                    {chapter?.Name || 'Untitled Chapter'}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    {chapter?.About || 'No description provided.'}
                  </p>
                  <div className='text-sm text-primary mt-2 flex items-center gap-1'>
                    <HiOutlineClock />
                    <span>{chapter?.Duration || 'Unknown duration'}</span>
                  </div>
                </div>
              </div>

              {edit && (
                <div className='flex-shrink-0'>
                  <EditChapters
                    course={course}
                    index={index}
                    refreshData={refreshData}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChapterList;
