import { useContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Form from "./components/Form"
import {Toaster} from "react-hot-toast"
import Login from './components/Login';
import { UserContext } from './Context/userContext';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

function App() {
 const navigate = useNavigate()
  //console.log("sachin");
  const {

    setUser,
  
    setIsLoggedIn,
 
    setTodo,
   
    setLoader,
  
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
      console.log(error.response);
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
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signUp" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path='about' element={<About />} />
        <Route path='*' element= {<ErrorPage/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App
