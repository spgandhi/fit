import AppLayout from '../components/Layouts/AppLayout';
import UserList from '../components/UserList/UserList';

const FriendListPage: React.FC = () => {
  return (
    <AppLayout>
      <UserList />
    </AppLayout>
  );
};

export default FriendListPage;
