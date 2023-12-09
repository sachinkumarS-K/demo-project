import React, { useState, useContext } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../Context/userContext";
import { FaFacebookF } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
      const { isLoggedIn, setIsLoggedIn, setUser, setCookie } =
        useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    function onChangeHandler(event) {
        const { name, value } = event.target;
        setFormData(pre => {
            return {
                ...pre,
                [name] : value
            }
        })
    }
   async function submitHandler(event) {
        event.preventDefault();
     console.log(formData);
   
      try {
        const res = await axios.post("/api/v1/login", formData);
        console.log(res.data.status)
       
        console.log(res);
        toast.success("Logged In successfully");
        setUser(res.data.user);
        setIsLoggedIn(true);
        setCookie(res.data.user._id);
          setTimeout(() => {
            navigate("/dashboard")
          }, 1000);
      } catch (error) {
        console.log(error.response)
         if (error.response.status == 403) {
           toast.error("Invalid creditials");
         }
      }
       
    }
  return (
    <div className=" flex items-center justify-center w-full h-screen">
      <div className="mb-0 lg:mb-[5rem] w-[100%] lg:w-[70%] mx-auto overflow-hidden h-full lg:h-[30rem] gap-4 justify-center  flex flex-col-reverse lg:flex-row shadow-xl ">
        <div className="w-[100%] lg:w-[60%] h-full rounded-r-[20px] pt-[2.5rem] ">
          <h1 className="w-full text-center text-4xl text-[#24C6DC] font-bold">
            Sign in
          </h1>
          <div className="flex items-center justify-center w-full gap-4 py-6">
            <FaFacebookF className="w-[2.3rem] h-auto p-2 border-2 border-grey border-solid rounded-full" />
            <FaGooglePlusG className="w-[2.3rem] h-auto p-2 border-2 border-grey border-solid rounded-full" />
            <FaLinkedinIn className="w-[2.3rem] h-auto p-2 border-2 border-grey border-solid rounded-full" />
          </div>
          <p className="w-full text-center">
            Or use your email for registration
          </p>
          <form onSubmit={submitHandler} className="w-full h-[11rem] pb-5">
            <div className="flex w-10/12 mx-auto items-center justify-between flex-col h-full mt-5">
              <input
                className=" bg-[#eee] h-10 w-full lg:w-[65%] placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChangeHandler}
                value={formData.email}
              />

              <input
                className=" bg-[#eee] h-10 w-full lg:w-[65%]  placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChangeHandler}
                value={formData.password}
              />

              <button className="px-12 text-[17px] bg-[#ff4b2b] py-2 rounded-3xl text-white mt-3  ">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="lg:w-[40%] w-full h-full rounded-l-[20px] bg-[#ff4b2b] overflow-hidden ">
          <div className="w-[80%] mx-auto h-full flex flex-col justify-center items-center gap-5 text-white ">
            <h1 className="text-4xl font-extrabold">Hello, Friend!</h1>
            <p className="text-center">
              Enter your personal details and start journey with us
            </p>
            <button className="px-9 py-1 border border-white border-solid rounded-full font-bold">
              <NavLink to="/signUp">SIGN UP</NavLink>
            </button>
          </div>
        </div>
      </div>

      {/* <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          className="border-[2px] border-purple-800 border-solid"
          type="email"
          name="email"
                  id="email"
                  onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          className="border-[2px] border-purple-800 border-solid"
          type="text"
          name="password"
                  id="password"
                  onChange={onChangeHandler}
              />
              <button>Login</button>
      </form> */}
    </div>
  );
}

export default Login