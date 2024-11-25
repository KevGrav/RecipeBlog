import React, {createContext, useState, useContext} from "react";

export const UserContext = createContext({});

export const useData = () => useContext(UserContext);

export function UserContextProvider({children}) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}