import WorkoutSession from "../components/WorkoutSession/WorkoutSession";

import React from 'react'
import { mockWorkoutSession } from "../data/mockWorkoutSession";

interface Props {}

function CurrentWorkout(props: Props) {
  const {} = props

  return (
    <WorkoutSession data={mockWorkoutSession} />
  )
}

export default CurrentWorkout
