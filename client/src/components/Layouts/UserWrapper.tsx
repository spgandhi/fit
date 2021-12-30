import { useRouter } from 'next/router';
import React from 'react'
import { gql, useQuery } from '@apollo/client';


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
      "id": 0
    } }
  });

  console.log(userData);
  

  if(!userid || !userData || !userData.users) return null;
  return <Component userData={userData.users[0]} userId={userid} userPath={`/user/${userid}`} />
};

export default UserWrapper
