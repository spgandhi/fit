import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { List } from 'antd';
import { useRouter } from 'next/router';
import { User, Workout } from '../../data/types';
import date from '../../data/date';
import AppLayout from '../Layouts/AppLayout';


const GET_WORKOUTS = gql`
  query GetWorkouts($where: WorkoutWhere, $usersWhere: UserWhere) {
    workouts(where: $where) {
      id
      isActive
      startTime
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
        }
      },
      "usersWhere": {
        "id": userData.id.toString()
      }
    }
  });

  return (
    <AppLayout title="Workouts" subTitle={data?.users && data.users[0].name}>
      {data && data.workouts && data.workouts.length > 0 && (
        <ul>
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
                  <div className="w-full">
                    {date.format(item.startTime)}
                    {item.exercises.length} Exercises
                  </div>
                </Link>
              </List.Item>
            )}
          />
        </ul>
      )}
      <button type="button" className="button white sm fixed bottom-[64px] right-0">
        <Link href={`${userPath}/new-workout`}>New Workout</Link>
      </button>
    </AppLayout>
  )
}

export default WorkoutList
