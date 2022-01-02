import React from 'react'
import AppLayout from '../components/Layouts/AppLayout'
import withUserData from '../components/Layouts/UserWrapper'
import NewWorkout from '../components/NewWorkout/NewWorkout'

interface Props {
  userData: any
  userPath: any
}

function NewWorkoutPage(props: Props) {
  const {userData, userPath} = props
  return (
    <AppLayout title="Add Workout" subTitle={userData.name}>
      <NewWorkout userData={userData} userPath={userPath} />
    </AppLayout>
  )
}

export default withUserData(NewWorkoutPage) 
