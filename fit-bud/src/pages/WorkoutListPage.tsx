import React from 'react'
import AppLayout from '../components/Layouts/AppLayout'
import UserWrapper from '../components/Layouts/UserWrapper'
import WorkoutList from '../components/WorkoutList/WorkoutList'

interface Props {
  userData: any
  userPath: any
}

function WorkoutListPage(props: Props) {
  const {userData, userPath} = props

  return (
    <AppLayout>
      <WorkoutList userData={userData} userPath={userPath} />
    </AppLayout>
  )
}

export default UserWrapper(WorkoutListPage) 
