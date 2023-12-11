import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      image : ""
    });
  const [loader, setLoader] = useState(false)
   const [isOpen, setOpen] = useState(false);
 
   const [todo, setTodo] = useState(null);
     
    const value = {
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
     
      todo,
      setTodo,
      loader,
      setLoader,
      isOpen,
      setOpen,
    };


    return <UserContext.Provider value = {value}>
        {children}
    </UserContext.Provider>
}
