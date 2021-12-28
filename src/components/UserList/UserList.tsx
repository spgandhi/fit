import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { List } from 'antd';
import AppLayout from '../Layouts/AppLayout';

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
  const {} = props

  const { data } = useQuery(GET_USERS);
  console.log(data);

  return (
    <AppLayout>
    <div>
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
