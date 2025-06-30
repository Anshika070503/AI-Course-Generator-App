'use client'
import { createContext, useState } from "react";

// Create context
export const UserCourseListContext = createContext();

// Provider component
export const UserCourseListProvider = ({ children }) => {
  const [userCourseList, setUserCourseList] = useState([]);

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      {children}
    </UserCourseListContext.Provider>
  );
};
