// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
  
    const updateUser = (data) => {
      setUserData(data);
    };
    console.log("User data in provider:", userData); // Log userData for debugging
  
    return (
      <UserContext.Provider value={{ userData, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  

export const useUser = () => useContext(UserContext);
