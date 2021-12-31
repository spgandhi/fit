import React, { useState } from 'react'
import { List, Timeline } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ExerciseRound } from '../../data/types'

type WorkoutExericse = {
  id: number |  string,
  name: string,
  slug: string;
  rounds?: ExerciseRound[],
}

interface Props {
  data?: WorkoutExericse,
  onStartRound: (exerciseSlug: string, data: ExerciseRound) => void,
  onRoundRemove: (exerciseSlug: string, roundIndex: number) => void,
  onRoundupdate: (exerciseSlug: string, roundIndex: number, data: ExerciseRound) => void,
}

function WorkoutSessionExercise(props: Props) {
  const {
    data,
    onStartRound,
    onRoundRemove,
    onRoundupdate
  } = props

  const [selectedWeight, setSelectedWeight] = useState<number>(20)

  return (
    <div className="py-4">
      <Timeline>
        {data && data.rounds && data.rounds.map((round, index) => (
          <Timeline.Item key={index}>
            <div className='flex justify-between w-full'>
              <div className="flex items-center gap-x-4" key={index}>
                <div className="flex">
                  <input 
                    type="number"
                    className="rounded-md no-style text-center" 
                    value={round.reps} 
                    onChange={(e) => onRoundupdate(data.slug, index, {reps: parseInt(e.target.value, 10)})} 
                    style={{width: 48}}
                  />
                  <span className="flex justify-center items-center">Reps</span>
                </div>
                <span>*</span>
                <div className="flex">
                  <input
                    type="number"
                    className="rounded-md no-style text-center"
                    value={round.weight}
                    onChange={(e) => onRoundupdate(data.slug, index, {weight: parseInt(e.target.value, 10)})}
                    style={{width: 48}}
                  />
                  <span>LBS</span>
                </div>
              </div>
              <CloseCircleOutlined onClick={() => onRoundRemove(data.slug, index)} style={{padding: 8}} />
            </div>
          </Timeline.Item>
        ))}
        <Timeline.Item>
          <button className="button clear" type='button' onClick={() => onStartRound(data.slug, {weight: selectedWeight} )}>+ Add Round</button>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export default WorkoutSessionExercise
