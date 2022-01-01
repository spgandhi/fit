import { Tag, Timeline } from 'antd'
import React from 'react'
import { Exercise, Workout } from '../../data/types'

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
        {!workoutData.isActive && <Tag color="success" className="float-right right">Completed</Tag>}
      </div>
      <hr className="mt-4 mb-6 border-body-light" />
      <Timeline>
        {workoutData.exercises.map(exercise => (
          <Timeline.Item>
            <div className="">
              <div className='font-bold mb-2'>{exercise.name}</div>
              {exercise.rounds && exercise.rounds.map(round => (
                <div className='text-body-secondary'>
                  {round.reps} * {round.weight} lbs
                </div>
              ))}
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default WorkoutSummary
