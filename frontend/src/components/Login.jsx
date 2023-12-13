import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../Context/userContext";
import { FaFacebookF } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Navbar from '../pages/Navbar';

function Login() {
    const navigate = useNavigate();
      const { isOpen, setIsLoggedIn, setUser, setOpen } =
        useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
  const [active, setActive] = useState(false);

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
   
      try {
        const res = await axios.post("/api/v1/login", formData);
        //console.log(res.data.status)
       
        console.log(res);
        toast.success("Logged In successfully");
        console.log(res.data.user)
        
        setUser((pre) => ({
          ...pre,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          image:res.data.user.image
        }));


        //setUser(res.data.user.data.user);
        setIsLoggedIn(true);
        setOpen(false);
        setTimeout(() => {
             window.scrollTo({
               top: 0,
               left: 0,
               behavior: "smooth",
             });
          navigate("/dashboard");
         
          }, 1000);
      } catch (error) {
        console.log(error.response)
         if (error.response.status == 403) {
           toast.error("Invalid creditials");
        }
         if (error.response.status == 400) {
           toast.error("Incorrect Password");
         }
      }
     
  }
  useEffect(() => {
    setOpen(false);
  }, []);  
  return (
    <div className=" flex flex-col items-center lg:gap-10 w-full h-screen">
      <Navbar page={"login"} />
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
          <form onSubmit={submitHandler} className="w-full h-[12rem] pb-5">
            <div className="flex w-10/12 mx-auto items-center justify-between flex-col h-full mt-5">
              <input
                className=" bg-[#eee] h-10 w-full lg:w-[65%] md:w-[50%] placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChangeHandler}
                value={formData.email}
              />

              <div
                className={
                  "relative w-full flex justify-center items-center " +
                  (isOpen ? "-z-20" : "z-0")
                }
              >
                <input
                  className=" bg-[#eee] h-10 w-full lg:w-[65%] md:w-[50%] relative  placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                  type={active ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                  value={formData.password}
                />
                {active ? (
                  <IoEye
                    className="absolute text-[1.6rem] right-6 lg:right-[7.3rem]"
                    onClick={() => setActive(!active)}
                  />
                ) : (
                  <IoEyeOff
                    className="absolute text-[1.6rem] right-6 lg:right-[7.3rem]"
                    onClick={() => setActive(!active)}
                  />
                )}
              </div>
              <NavLink className="ml-16" to="/forgot-password">
                <p className="pl-10">Forgot your password ? </p>
              </NavLink>
              <button className="px-12 text-[17px] bg-[#ff4b2b] py-2 rounded-3xl text-white mt-3  ">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="lg:w-[40%] w-full  h-full lg:rounded-l-[20px] bg-[#ff4b2b] overflow-hidden ">
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
    </div>
  );
}

export default Login
