import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserData(response.data);
            } catch (error) {
                console.error('Profile fetch error:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                {userData ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Welcome, {userData.username}</h2>
                        <p className="text-lg">Role: {userData.role}</p>
                    </div>
                ) : (
                    <h2 className="text-2xl font-bold">Loading...</h2>
                )}
            </div>
        </div>
    );
};

export default Profile;
