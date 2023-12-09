import axios from 'axios';
import React, { useState } from 'react'
import { FiAlertCircle } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import toast from "react-hot-toast";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  async function submitHandler(e) {
    e.preventDefault();
    console.log(email)
    try {
      const res = await axios.post("/api/v1/resetPasswordToken", {email});
      console.log(res);
      if (res.status === 200) {
        setEmail("");
        toast.success("Email sent successfully");
      }
     
    } catch (error) {
      console.log(error)
      console.log(error.response.status)
       if (error.response.status === 401) {
         setEmail("");
         toast.error("Invalid Credintials");
       }
    }
  }
  return (
    <div className="w-full h-screen bg-gray-200 absolute">
      <div className="w-full h-[40vh] bg-blue-500 relative z-0"></div>
      <div className="w-full h-[60vh] flex items-center justify-center ">
        <div className="lg:w-[40%] w-[89%] lg:h-[29rem] h-[27rem] bg-white -translate-y-[8rem] rounded-lg shadow-lg">
          <div className="w-full h-[20%] flex items-center justify-center">
            <FiAlertCircle className="lg:text-[60px] text-[40px]" />
          </div>
          <h1 className="w-full text-center lg:text-3xl text-2xl ">
            Forgot Password
          </h1>
          <p className="w-[80%] mx-auto text-center lg:px-10 py-4 text-gray-400 ">
            Enter your email and we'll send you a link to reset your password
          </p>
          <form
            method='POST'
            onSubmit={submitHandler}
            className="w-full flex items-center justify-center flex-col gap-6"
          >
            <div className="lg:w-[80%] w-full px-2 mx-auto ">
              <IoIosMail className="relative left-4 top-8 text-2xl" />
              <input
                type="text"
                className="border shadow-xl w-full py-[0.5rem] mx-auto indent-[3.3rem]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id=""
              />
            </div>
            <button className="py-2 px-9 text-xl mt-2 bg-green-300 text-white rounded-2xl">
              Submit
            </button>
          </form>
          <NavLink
            to="/login"
            className="flex w-full items-center justify-end pr-6 mt-4"
          >
            <IoIosArrowUp className="text-xl -rotate-90" />
            <p className="text-xl py-2 px-2">Back to login</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
