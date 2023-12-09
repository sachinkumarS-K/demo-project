import { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from "./components/Form"
import {Toaster} from "react-hot-toast"
import Login from './components/Login';
import { UserContext } from './Context/userContext';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  const { user, setUser, isLoggedIn, setIsLoggedIn, todo, setTodo } =
    useContext(UserContext);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signUp" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App
