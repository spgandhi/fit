// import { useRouter } from 'next/router';
import React, { Props } from 'react'
import { gql, useQuery } from '@apollo/client';
// import { Spin } from 'antd';
import FullPageSpinner from '../../atoms/FullPageSpinner';


const GET_USER = gql`
  query Query($where: UserWhere) {
    users(where: $where) {
      id
      name
    }
  }
`

const withUserData = (WrappedComponent: any) => (props: any) => {
  const {match} = props;
  const userId = match.params.id;
  
  const { data: userData } = useQuery(GET_USER, {
    variables: { "where": {
      "id": userId
    } }
  });

  if(!userData || !userData || !userData.users) return <FullPageSpinner />;
  return <WrappedComponent userData={userData.users[0]} userId={userId} userPath={`/users/${userId}`} />
};

export default withUserData;
