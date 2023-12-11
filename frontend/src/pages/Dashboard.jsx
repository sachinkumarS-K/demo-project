import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { UserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from "../components/loader/Loader"
function Dashboard() {

   const navigate = useNavigate();
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    todo,
    setTodo,
    loader,
    setLoader,
    isOpen,
    setOpen,  
  } = useContext(UserContext);

  async function fetchData() {
    try {
      setLoader(true);
      const res = await axios.get(`/api/v1/getUser/`);
    //  console.log(res.data.user.email);
     setUser((pre) => ({
       ...pre,
       firstName: res.data.user.firstName,
       lastName: res.data.user.lastName,
       email: res.data.user.email,
       image: res.data.user.image,
     }));
      //console.log(res.data.user.email);
      setTodo(res.data.user.todos);
      setIsLoggedIn(true);
     
      setLoader(false);
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  }
  
  useEffect(() => {
    //console.log(user)
    setOpen(false);
    fetchData();
  }, []);
  return (
    <div className="relative w-full h-screen bg-gray-300">

      {loader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
            <Navbar page={"dashboard"} />
           
        </div>
      )}
     
    </div>
  );
}

export default Dashboard
