import { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from "./components/Form"
import {Toaster} from "react-hot-toast"
import Login from './components/Login';
import { UserContext } from './Context/userContext';
import axios from 'axios';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, setUser, isLoggedIn, setIsLoggedIn, todo, setTodo } =
    useContext(UserContext);
  // async function fetchData(id) {
  //   const res = await axios.get(`/api/v1/getUser/${id}`);
  //   console.log(res);
  //   setUser(res.data.user);
  //   setTodo(res.data.user.todos)
  //   setIsLoggedIn(true)
  // }

  // useEffect(() => {
  //     console.log(localStorage.getItem("user"))
  //   if (localStorage.getItem("user")) {
  //     fetchData(localStorage.getItem("user"));
  //   }
  // } , [])
  return (
    <>
      <Routes>
      
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signUp" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
      <Toaster />
    </>
  );
}

export default App
