import React, { createContext, useState } from "react";

export const userContext = createContext();
const defaultUser = {id:'admin',username:'admin',password:'admin'};
const UserProvider = ({children}) => {
    const [ user , setUser ] = useState('');
    const [ allUsers , setAllUsers ] = useState([defaultUser]);
    return(
        <userContext.Provider value={{user,setUser,allUsers,setAllUsers}}>
            {children}
        </userContext.Provider>
    )
};

export default UserProvider;