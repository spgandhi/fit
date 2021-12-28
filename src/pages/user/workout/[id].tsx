import React from 'react'
import { useRouter } from 'next/router'
import WorkoutSession from '../../../components/WorkoutSession/WorkoutSession';

interface Props {}

function A (props: Props) {
  const {} = props
  const router = useRouter()
  const { id } = router.query
  console.log(id, router.query);
  return (
    <>
      {id && <WorkoutSession workoutId={(id || '').toString()} />}
    </>
  )
}

export default A
