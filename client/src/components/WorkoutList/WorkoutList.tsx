import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { List, Tag } from 'antd';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { User, Workout } from '../../data/types';
import date from '../../data/date';
import AppLayout from '../Layouts/AppLayout';
import gqlQueries from '../../data/gqlQueries';
import StatCard from '../../atoms/StatCard';
import WorkoutListSkeleton from './WorkoutListSkeleton';


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

  const { userData, userPath } = props;
  const router = useRouter();

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
    <AppLayout title="Workouts" subTitle={data?.users && data.users[0].name}>
      {
        data && data.workouts && 
        <div className="grid grid-cols-2 gap-4 bg-body-light p-4">
          <StatCard stat={data.workouts.length} label='Total Workouts'/>
          <StatCard stat={date.workoutsThisWeekCount(data.workouts)} label="Workouts this week" />
        </div>
      }
      
      <div className="p-4 rounded-t-md shadow-lg">
        {data && data.workouts && data.workouts.length > 0 && (
            <List 
              dataSource={data.workouts}
              renderItem={(item: Workout) => (
                <List.Item>
                  <Link href={{
                    pathname: `${router.pathname}/${item.id}`,
                    query: {
                      userid: userData.id.toString()
                    }
                  }}>
                    <div className="w-full flex flex-col">
                      <div>
                        <h3 className='inline'>{date.format(item.startTime)}</h3>
                        <Tag className='float-right' color={item.isActive ? 'warning' : 'success'}>
                          {item.isActive ? 'In Progress' : 'Completed'}
                        </Tag>
                      </div>
                      <div className="text-body-secondary">{item.exercises && item.exercises.length} Exercises</div>
                    </div>
                  </Link>
                </List.Item>
              )}
            />
        )}
      </div>
      <Link href={`${userPath}/new-workout`}>
        <button type="button" className="button sm fixed bottom-[64px] right-[12px]">
          <PlusOutlined /> New Workout
        </button>
      </Link>
    </AppLayout>
  )
}

export default WorkoutList
