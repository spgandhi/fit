import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { List } from 'antd';
import { Workout } from '../../data/types';
import date from '../../data/date';


const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      startTime
      id
    }
  }
`

function WorkoutList() {

  const { data } = useQuery(GET_WORKOUTS);

  return (
    <div>
      {data && data.workouts && data.workouts.length > 0 && (
        <ul>
          <List 
            dataSource={data.workouts}
            renderItem={(item: Workout) => (
              <List.Item>
                <Link href={`/workout/${item.id}`}>
                  <div className="w-full">
                    {date.format(item.startTime)}
                  </div>
                </Link>
              </List.Item>
            )}
          />
        </ul>
      )}
      <button type="button" className="button white sm fixed bottom-[64px] right-0">
        <Link href="/new-workout">New Workout</Link>
      </button>
    </div>
  )
}

export default WorkoutList
