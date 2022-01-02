import React from 'react'
import date from '../../data/date';
import { Workout } from '../../data/types';
import dayjs from 'dayjs';
import { IonIcon } from '@ionic/react';
import { checkmarkCircleSharp } from 'ionicons/icons';

interface Props {
  workouts: Workout[]
}

const arr = [0,0,0,0,0,0,0];

function ThisWeekStats(props: Props) {
  const {} = props
  const startOfWeek = date.getStartOfWeek();
  console.log(props);
  const workoutDates = props.workouts.map(workout => date.format(workout.startTime, 'MMM DD'));
  console.log(workoutDates);

  return (
    <>
    <p className="font-bold text-sm">This Week</p>
    <div className='flex justify-between w-full gap-x-2'>
      {arr.map((item, index) => {
        const thisDate = date.add(startOfWeek, index, 'day');
        const isInFuture = dayjs(thisDate).isAfter(dayjs());
        const didWorkout = workoutDates.includes(date.format(thisDate, 'MMM DD'))
        return (
        <div 
          key={index} 
          className={
            `text-sm p-1 rounded text-white flex flex-col gap-y-2 py-2 text-center w-12 relative
            ${isInFuture ? 'text-neutral-70' : ''}
            ${didWorkout ? 'bg-gradient-primary' : ''}
            `
          }
        >
          <span>{date.format(thisDate, 'ddd')}</span>
          <span className="font-bold">{date.format(thisDate, 'DD')}</span>
          {didWorkout &&
            <span className="absolute top-[-4px] right-[-4px] text-sm text-success">
              <IonIcon icon={checkmarkCircleSharp} size="small" />
            </span>
          }
        </div>
        )
      })}
    </div>
    </>
  )
}

export default ThisWeekStats
