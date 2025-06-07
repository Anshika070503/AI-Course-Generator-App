import CategoryList from '@/app/_components/_shared/CategoryList';
import { UserInputContext } from '@/app/_context/UserInputContext';
import Image from 'next/image';
import React, { useContext, useCallback } from 'react';

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = useCallback((category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category
    }));
  }, [setUserCourseInput]);

  return (
    <div className='px-10 md:px-20'>
      <h2 className='my-5'>Select the Course Category</h2>

      <div className='grid grid-cols-3 gap-10'>
        {CategoryList.map((item, index) => (
          <div
            key={item.name} // Prefer using unique id or name over index
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer 
              ${userCourseInput?.category === item.name && 'border-primary bg-blue-50'}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} width={50} height={45} alt={item.name} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
