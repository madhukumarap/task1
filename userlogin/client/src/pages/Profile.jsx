import React from 'react';
import { useUser } from './UserContext';

const Profile = () => {
  const { userData } = useUser();
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  return (
    <div>
      {storedUserData ? (
        <div>
          <p>Email: {storedUserData.email}</p>
          <p>Username: {storedUserData.username}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
