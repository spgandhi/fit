import React from 'react'
import { gql, useQuery } from '@apollo/client';
import AppLayout from '../Layouts/AppLayout';
import FullPageSpinner from '../../atoms/FullPageSpinner';
import { IonItem, IonList } from '@ionic/react';
import { Link } from 'react-router-dom';

const GET_USERS = gql`
  query GetUsers {
    users {
      name,
      id
    }
  }
`

interface Props {}

const UserList = (props: Props) => {
  const { data } = useQuery(GET_USERS);
  if(!data) return <AppLayout><FullPageSpinner /></AppLayout>
  return (
    <div>
      {data && data.users &&
      <IonList>
        {data.users.map((user: any) => (
          <IonItem key={user.id} href={`/users/${user.id}/workouts`}>
            <div className='w-full'>{user.name}</div>
          </IonItem>
        ))}
      </IonList>
      }
    </div>
  )
}

export default UserList
