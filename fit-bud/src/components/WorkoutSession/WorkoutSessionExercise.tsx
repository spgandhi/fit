import { IonIcon } from '@ionic/react'
import { close } from 'ionicons/icons'
import React, { useState } from 'react'
import { ExerciseRound } from '../../data/types'

type WorkoutExericse = {
  id: number |  string,
  name: string,
  slug: string;
  rounds?: ExerciseRound[],
}

interface Props {
  data?: WorkoutExericse,
  isReadOnly?: boolean,
  onStartRound?: (exerciseSlug: string, data: ExerciseRound) => void,
  onRoundRemove?: (exerciseSlug: string, roundIndex: number) => void,
  onRoundupdate?: (exerciseSlug: string, roundIndex: number, data: ExerciseRound) => void,
}

function WorkoutSessionExercise(props: Props) {
  const {
    data,
    onStartRound,
    onRoundRemove,
    onRoundupdate,
    isReadOnly
  } = props

  const [selectedWeight, setSelectedWeight] = useState<number>(20)

  return (
    <div className="py-4">
      <div className='timeline-item-title relative font-bold mb-2'>{data.name}</div>
      <div className="flex gap-y-4 flex-col">
        {data && data.rounds && data.rounds.map((round, index) => (
          <div className='flex justify-between w-full gap-y-4'>
            <div className="flex items-center gap-x-4" key={index}>
              <div className="flex">
                <input 
                  type="number"
                  className="rounded-md no-style text-center" 
                  value={round.reps} 
                  onChange={(e) => onRoundupdate(data.slug, index, {reps: parseInt(e.target.value, 10)})} 
                  style={{width: 48}}
                  readOnly={isReadOnly}
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
                  readOnly={isReadOnly}
                />
                <span>LBS</span>
              </div>
            </div>
            {/* <CloseCircleOutlined  style={{padding: 8}} /> */}
            {!isReadOnly && <IonIcon icon={close} onClick={() => onRoundRemove(data.slug, index)} size="small" />}
          </div>
        ))}
        {!isReadOnly && <button className="button basic inline-flex" type='button' onClick={() => onStartRound(data.slug, {weight: selectedWeight} )}>+ Add Round</button>}
      </div>
    </div>
  )
}

export default WorkoutSessionExercise
