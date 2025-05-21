"use client"
import { Button } from '@/components/ui/button';
import React, { useState, Fragment, useContext, useEffect } from 'react';
import { HiMiniSquares2X2, HiBars3CenterLeft, HiOutlinePencilSquare } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiBars3CenterLeft />
    },
    {
      id: 3,
      name: "Options",
      icon: <HiOutlinePencilSquare />
    }
  ];

  const{userCourseInput,setUserCourseInput} = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(()=>{
      console.log(userCourseInput);
  },[userCourseInput])


  // Used to check next button Enable or Disable status
  const checkStatus=()=>{
    if(userCourseInput?.length==0){
      return true;
    }
    if(activeIndex==0&&(userCourseInput?.category?.length==0||userCourseInput?.category==undefined ) ){
      return true;
    }
    if(activeIndex==1&&(userCourseInput?.topic?.length==0||userCourseInput?.topic==undefined)){
      return true;
    }
    else if(activeIndex==2&&
      (
        userCourseInput?.level==undefined||
        userCourseInput?.duration==undefined||
        userCourseInput?.displayVideo==undefined||
        userCourseInput?.noOfChapter==undefined)
      ){
      return true;
    }

    return false;
  };

  return (
    <div>
      {/* Stepper */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
        <div className='flex mt-10 items-center'>
          {StepperOptions.map((item, index) => (
            <Fragment key={item.id}>
              <div className='flex items-center'>
                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                  <div className={`bg-gray-200 p-4 rounded-full text-white ${activeIndex >= index && 'bg-primary'}`}>
                    {item.icon}
                  </div>
                  <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                </div>
              </div>

              {index !== StepperOptions.length - 1 && (
                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] ${
                  activeIndex - 1 >= index ? 'bg-primary' : 'bg-gray-300'
                }`}>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {/* Components */}
        {activeIndex == 0 ? <SelectCategory /> : 
        activeIndex == 1?<TopicDescription/>: 
        <SelectOption/>
        }


        {/* Next Prev Button */}
        <div className='flex justify-between mt-10'>
          <Button
            disabled={activeIndex == 0}
            variant='success'
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>

          {activeIndex < 2 && (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          )}

          {activeIndex == 2 && (
            <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
