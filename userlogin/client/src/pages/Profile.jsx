import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', {
          params: { email: storedUserData.email }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (storedUserData && storedUserData.email) {
      fetchUserData();
    }
  }, [storedUserData]);

  return (
    <div className="profile-container">
      {userData ? (
        <div>
          <div className="profile-header">User Profile</div>
          <div className="profile-details">
            <div className="profile-detail">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{userData.email}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Username:</span>
              <span className="profile-value">{userData.name}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Media Outlet:</span>
              <span className="profile-value">{userData.media_outlet}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Job Title:</span>
              <span className="profile-value">{userData.job_title}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-label">Web Address:</span>
              <span className="profile-value">{userData.web_address}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-user-data">No user data available</p>
      )}
    </div>
  );
};

export default Profile;
