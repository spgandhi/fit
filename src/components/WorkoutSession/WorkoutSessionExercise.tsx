import React, { useState } from 'react'
import { List } from 'antd';
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
    <div>
      <List
        dataSource={data.rounds}
        renderItem={(item: ExerciseRound, index: number) => (
          <List.Item>
            <div className="flex justify-between gap-x-4" key={index}>
              <input
                type="number"
                className="rounded-md p-2"
                value={item.weight}
                onChange={(e) => onRoundupdate(data.slug, index, {weight: parseInt(e.target.value, 10)})}
                style={{width: 120}}
              />
              <input 
                type="number"
                className="rounded-md p-2" 
                value={item.reps} 
                defaultValue={8} 
                onChange={(e) => onRoundupdate(data.slug, index, {reps: parseInt(e.target.value, 10)})} 
                style={{width: 120}}
              />
              <button type="button" onClick={() => onRoundRemove(data.slug, index)}>Remove Round</button>
          </div>
          </List.Item>
        )}
      />
      <button type='button' onClick={() => onStartRound(data.slug, {weight: selectedWeight} )}>+ Add Round</button>
    </div>
  )
}

export default WorkoutSessionExercise
