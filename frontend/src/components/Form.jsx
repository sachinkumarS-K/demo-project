import React, { useContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Navbar from "../pages/Navbar";
import { UserContext } from "../Context/userContext";

function Form() {
  const { setOpen } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  async function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post("/api/v1/createUser", formData);
      console.log(res);
       setFormData((pre) => {
         return {
           ...pre,
           lastName: "",
           firstName: "",
           email: "",
           password : ""
         };
       });
      
      setTimeout(() => {
               toast.success("User Signed Up Successfully")
               window.scrollTo({
                 top: 0,
                 left: 0,
                 behavior: "smooth",
               });
               navigate("/login");
             }, 1000);
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
    }
  }
  function onChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  useEffect(() => {
    setOpen(false);
  } , [])
  return (
    <div className=" relative flex items-center flex-col lg:gap-10 w-full min:h-screen">
      <Navbar />
      <div className=" mb-[5rem] w-[100%] lg:w-[70%] mx-auto overflow-hidden h-full lg:h-[30rem] gap-4 justify-center  flex flex-col-reverse lg:flex-row shadow-xl ">
        <div className="lg:w-[40%] w-full h-full rounded-l-[20px] bg-[#ff4b2b] overflow-hidden ">
          <div className="w-[80%] mx-auto h-full pb-5 flex flex-col justify-center items-center gap-5 text-white ">
            <h1 className="text-4xl py-5 lg:py-0 font-extrabold">
              Welcome Back
            </h1>
            <p className="text-center">
              To keep connected with us please login with your personal info
            </p>
            <button className="px-9 py-1 border border-white border-solid rounded-full font-bold">
              <NavLink to="/login">SIGN IN</NavLink>
            </button>
          </div>
        </div>

        <div className="w-[100%] lg:w-[60%] h-full rounded-r-[20px] pt-[2.5rem] ">
          <h1 className="w-full text-center text-4xl text-[#24C6DC] font-bold">
            Sign Up
          </h1>
          <div className="flex items-center justify-center w-full gap-4 py-6">
            <FaFacebookF className="w-[2.3rem] h-auto p-2 border-2 border-grey border-solid rounded-full" />
            <FaGooglePlusG className="w-[2.3rem] h-auto p-2 border-2 border-grey border-solid rounded-full" />
            <FaLinkedinIn className="w-[2.3rem] h-auto p-2 border-2 border-grey border-solid rounded-full" />
          </div>
          <p className="w-full text-center">
            Or use your email for registration
          </p>
          <form onSubmit={submitHandler} className="w-full h-[15rem]">
            <div className="flex w-10/12 mx-auto items-center justify-between flex-col h-full mt-5">
              <input
                className=" bg-[#eee] h-10 w-full lg:w-[65%]  placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                type="text"
                name="firstName"
                id="firstName"
                placeholder="FirstName"
                onChange={onChangeHandler}
                value={formData.firstName}
              />

              <input
                className=" bg-[#eee] h-10 w-full lg:w-[65%]  placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                type="text"
                name="lastName"
                id="lastName"
                placeholder="LastName"
                onChange={onChangeHandler}
                value={formData.lastName}
              />

              <input
                className=" bg-[#eee] h-10 w-full lg:w-[65%] placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChangeHandler}
                value={formData.email}
              />

              <div className="relative w-full  -z-10 flex justify-center items-center ">
                <input
                  className=" bg-[#eee] h-10 w-full lg:w-[65%]  placeholder:py-7 rounded-md  indent-6 placeholder:text-slate-400 "
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

              <button className="px-12 text-[17px] bg-[#ff4b2b] py-2 rounded-3xl text-white mt-3  ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
