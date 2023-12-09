import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
    });
  const [loader , setLoader] = useState(false)
  // if (localStorage.getItem("user")) {
  //    setIsLoggedIn(true)
  // }
   const [todo, setTodo] = useState(null);
     function setCookie(value) {
       localStorage.setItem("user", value);
     }
    const value = {
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      setCookie,
      todo,
      setTodo,
      loader,
      setLoader,
    };


    return <UserContext.Provider value = {value}>
        {children}
    </UserContext.Provider>
}
