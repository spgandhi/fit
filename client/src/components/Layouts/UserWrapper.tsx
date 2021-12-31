import { useRouter } from 'next/router';
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Spin } from 'antd';
import FullPageSpinner from '../../atoms/FullPageSpinner';


const GET_USER = gql`
  query Query($where: UserWhere) {
    users(where: $where) {
      id
      name
    }
  }
`

const UserWrapper = Component => function() {
  const route = useRouter();
  const { userid } = route.query;

  const { data: userData } = useQuery(GET_USER, {
    variables: { "where": {
      "id": userid
    } }
  });

  if(!userid || !userData || !userData.users) return <FullPageSpinner />;
  return <Component userData={userData.users[0]} userId={userid} userPath={`/user/${userid}`} />
};

export default UserWrapper
