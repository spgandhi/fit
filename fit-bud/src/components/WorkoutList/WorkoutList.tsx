import React from 'react'
import { gql, useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
// import { useRouter } from 'next/router';
// import { PlusOutlined } from '@ant-design/icons';
import { User, Workout } from '../../data/types';
import date from '../../data/date';
import AppLayout from '../Layouts/AppLayout';
import gqlQueries from '../../data/gqlQueries';
import StatCard from '../../atoms/StatCard';
import WorkoutListSkeleton from './WorkoutListSkeleton';
import { IonChip, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import ThisWeekStats from '../Stats/ThisWeekStats';


const GET_WORKOUTS = gql`
  ${gqlQueries.exercise.fragment}
  query GetWorkouts($where: WorkoutWhere, $options: WorkoutOptions, $usersWhere: UserWhere) {
    workouts(where: $where, options: $options) {
      id
      isActive
      startTime
      exercises {
        ... ExerciseFragment
      }
    }
    users(where: $usersWhere) {
      name
    }
  }
`

interface Props {
  userPath: string
  userData: User
}

function WorkoutList(props: Props) {

  console.log(props);

  const { userData, userPath } = props;
  // const router = useRouter();

  const { data } = useQuery(GET_WORKOUTS, {
    variables: {
      "where": {
        "user": {
          "id": userData.id.toString()
        },
      },
      "options": {
        "sort": [
          {
            "startTime": "DESC"
          }
        ]
      },
      "usersWhere": {
        "id": userData.id.toString()
      }
    }
  });

  if(!data || !data.workouts) return <WorkoutListSkeleton />

  return (
    <>
      {
        data && data.workouts && 
        <div className="bg-body-light p-4">
          {/* <StatCard stat={data.workouts.length} label='Total Workouts'/> */}
          {/* <StatCard stat={date.workoutsThisWeekCount(data.workouts)} label="Workouts this week" /> */}
          <ThisWeekStats workouts={data.workouts} />
        </div>
      }
      <div className="rounded-t-md">
        {data && data.workouts && data.workouts.length > 0 && (
          <IonList>
            {data.workouts.map((workout: Workout) => (
              <IonItem href={`${props.userPath}/workouts/${workout.id}`}>
                <div className='flex gap-x-8 m-2'>
                  <div className="border rounded">
                    <div className="text-sm">{date.format(workout.startTime, 'DD')}</div>
                    <div className="text-sm">{date.format(workout.startTime, 'MMM')}</div>
                  </div>
                  <div>
                  <h6 className='m-0'>{date.format(workout.startTime, 'ddd')}</h6>
                    <div className="text-sm text-neutral-70">{workout.exercises && workout.exercises.length} Exercises</div>
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
      </div>
      <Link to={`${userPath}/new-workout`}>
        <button type="button" className="button sm fixed bottom-[64px] right-[12px]">
          <IonIcon icon={addOutline} size='medium'/>
          New Workout
        </button>
      </Link>
    </>
  )
}

export default WorkoutList
