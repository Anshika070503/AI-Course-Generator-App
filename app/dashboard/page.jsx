import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'


function Dashboard() {
  return (
    <div>
      <AddCourse/>
      {/* Display list of chapters */}
      <UserCourseList/>
    </div>
  )
}

export default Dashboard
