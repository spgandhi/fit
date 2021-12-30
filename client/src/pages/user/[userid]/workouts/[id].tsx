import React from 'react'
import { useRouter } from 'next/router'
import WorkoutSession from '../../../../components/WorkoutSession/WorkoutSession';
import UserWrapper from '../../../../components/Layouts/UserWrapper';
import { User } from '../../../../data/types';

interface Props {
  userPath: string,
  userData: User,
}

function WorkoutSessionWrapper (props: Props) {
  const {userPath, userData} = props
  const router = useRouter()
  const { id } = router.query
  if(!id) return null;
  return <WorkoutSession userData={userData} userPath={userPath} workoutId={(id || '').toString()} />
}

export default UserWrapper(WorkoutSessionWrapper);
