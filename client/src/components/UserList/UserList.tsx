import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { List } from 'antd';
import AppLayout from '../Layouts/AppLayout';
import FullPageSpinner from '../../atoms/FullPageSpinner';

const GET_USERS = gql`
  query GetUsers {
    users {
      name,
      id
    }
  }
`

interface Props {}

function UserList(props: Props) {

  const { data } = useQuery(GET_USERS);

  if(!data) return <FullPageSpinner />

  return (
    <AppLayout>
    <div className="p-4">
      {data && data.users &&
        <List
          dataSource={data.users}
          renderItem={(user: any) => (
            <List.Item>
              <Link href={`/user/${user.id}/workouts`}>
                <div className='w-full'>{user.name}</div>
              </Link>
            </List.Item>
          )}
        />
      }
    </div>
    </AppLayout>
  )
}

export default UserList
