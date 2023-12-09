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
  } = useContext(UserContext);
  async function fetchData() {
    try {
      setLoader(true);
      const res = await axios.get(`/api/v1/getUser/`);

      
      // if (res.response.status === 401) {
      //   navigate("/login")
      // }
      console.log(res);
      setUser(res.data.user);
      setTodo(res.data.user.todos);
      setIsLoggedIn(true);
      console.log("home");
      setLoader(false);
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* {loader ? ({</Loader/>}) : ({<Navbar/>})} */}
      {
        loader ? (
          <div> 
            <Loader/>
        </div>
        ) : (
            <div>
               <Navbar/>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard
