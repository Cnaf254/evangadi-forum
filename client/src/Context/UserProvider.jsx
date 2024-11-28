import React, { createContext, useState } from "react";

export const userProvider = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({userName:"",userId:""});

  return (
    <userProvider.Provider value={[user, setUser]}>
      {children}
    </userProvider.Provider>
  );
};