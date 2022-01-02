import React from 'react'
import { useParams } from 'react-router';
import withUserData from '../components/Layouts/UserWrapper'
import WorkoutSession from '../components/WorkoutSession/WorkoutSession';

interface Props {
  userData: any
}

function WorkoutSessionPage(props: Props) {
  const { workoutId } = useParams<any>();
  const {userData} = props;

  return (
    <WorkoutSession workoutId={workoutId} userData={userData} userPath={`/user/${userData.id}`} />
  )
}

export default withUserData(WorkoutSessionPage)
