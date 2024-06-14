// Profile.js
import React from 'react';
import { useUser } from './UserContext'; // Import the useUser hook

const Profile = () => {
  const { userData } = useUser(); // Get userData from context

  return (
    <div>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
