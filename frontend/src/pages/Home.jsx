import React, { useContext, useEffect, useRef } from "react";

import axios from "axios";

import Navbar from "./Navbar.jsx";
import { UserContext } from "../Context/userContext.jsx";
import { NavLink } from "react-router-dom";
import Loader from "../components/loader/Loader.jsx";
function Home() {
  const {
    isOpen,
    user,
    setLoader,
    setOpen,
    setUser,
    loader,
    setTodo,
    setIsLoggedIn,
  } = useContext(UserContext);
  async function fetchData() {
    try {
      setLoader(true);
      //console.log(isLoggedIn)

      const res = await axios.get(`/api/v1/getUser/`);
      console.log(res);
     setUser((pre) => ({
       ...pre,
       firstName: res.data.user.firstName,
       lastName: res.data.user.lastName,
       email: res.data.user.email,
       image: res.data.user.image,
     }));
      setTodo(res.data.user.todos);
      setIsLoggedIn(true);

      setLoader(false);
    } catch (error) {
      //console.log(error);
     setLoader(false)
      // if (error.response.status === 401) {
      //   navigate("/login");
      // }
    }
  }
  const homeRef = useRef(null);

  useEffect(() => {
    fetchData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setOpen(false);
  }, []);
  return (
    <div className="relative w-full min-h-screen bg-black ">
      {loader ? (
        <div>
          <Loader page={"home"} />
        </div>
      ) : (
        <div>
          <Navbar page={"home"} />
          <h1 className="text-white w-full h-[80vh] flex items-center justify-center text-3xl font-medium">
              Home
              
          </h1>
        </div>
      )}
    </div>
  );
}

export default Home;
