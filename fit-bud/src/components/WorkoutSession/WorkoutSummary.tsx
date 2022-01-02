import { IonChip } from '@ionic/react'
import React from 'react'
import { Exercise, Workout } from '../../data/types'
import WorkoutSessionExercise from './WorkoutSessionExercise'

interface Props {
  workoutData: Workout,
}

function WorkoutSummary(props: Props) {
  const {
    workoutData
  } = props

  return (
    <div>
      <div>
        <h3 className='font-bold inline'>Workout Summry</h3>
        {!workoutData.isActive && <IonChip color="success" className="float-right right">Completed</IonChip>}
      </div>
      <hr className="mt-4 mb-6 border-body-light" />
      <div className='timeline-wrapper relative pl-8'>
        {workoutData.exercises.map((exercise, index) => (
          <WorkoutSessionExercise isReadOnly={true} data={exercise}/>
        ))}
      </div>
    </div>
  )
}

export default WorkoutSummary
