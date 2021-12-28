import React from 'react'
import { Exercise } from '../../data/types'

interface Props {
  exercises: Exercise[],
}

function WorkoutSummary(props: Props) {
  const {
    exercises
  } = props

  return (
    <div>
      <h4>Workout Summry</h4>
      {exercises.map(exercise => (
          <div className="py-4">
            <div>{exercise.name}</div>
            {exercise.rounds && exercise.rounds.map(round => (
              <div>
                {round.weight} x {round.reps}
              </div>
            ))}
            </div>
        ))
      }
    </div>
  )
}

export default WorkoutSummary
