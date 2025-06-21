// src/hooks/UserContext.jsx
import { createContext } from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const user = { name: 'Kiruthik', age: 20, dept: 'msc' };

  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
};
