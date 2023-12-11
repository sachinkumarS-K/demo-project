import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/userContext'
import Navbar from './Navbar';

function About() {
    const { user, isLoggedIn, setOpen } = useContext(UserContext);
    useEffect(() => {
        setOpen(false);
    } , [])
  return (
    <div className="w-full min-h-screen  rounded-lg  ">
      <Navbar />
      {/* <img src={user.image} alt="" /> */}
      <div className='w-full flex justify-center lg:mt-[5rem]'>
        <div className="lg:w-[70%] h-full rounded-lg  py-4  w-full shadow-2xl flex flex-col lg:flex-row items-center  gap-7 my-auto   ">
          <div className="lg:w-[30%] w-full h-full ">
            <div className="h-[50%] lg:w-full w-[60%] mx-auto flex justify-center items-center px-6 rounded-md py-12">
              <img
                src={
                  isLoggedIn
                    ? user.image
                    : "https://images.unsplash.com/photo-1702138062308-fc6beed165d6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          <div className="h-full w-full lg:w-[70%]">
            <div className="flex flex-col gap-1 px-6 py-1">
              <h1 className="uppercase font-bold text-2xl">
                {" "}
                {user.firstName} {user.lastName}{" "}
              </h1>
              <h1 className="font-bold text-2xl">Web Developer</h1>
              <h1 className="font-bold text-2xl">Ranking : 1/10</h1>
            </div>
            <div className="ml-[2rem] flex gap-7 py-5 px-4 text-xl ">
              <h1 className="font-medium">About</h1>
              <h1 className=" text-blue-600 font-medium">TimeLine</h1>
            </div>
            <div className="lg:w-[85%] w-[90%]  border border-solid border-gray-400 h-[2px] mx-auto mb-7  ">
              {" "}
            </div>
            <div className="flex justify-between pb-6 w-[80%] mx-auto ">
              <div className=" list-none flex flex-col gap-2">
                <li>User id</li>
                <li> Name</li>
                <li> Email</li>
                <li>Phone</li>
                <li>Profession</li>
              </div>
              <div className="list-none flex flex-col gap-2">
                <li className="text-center tracking-widest  gap-1">
                  ----------
                </li>
                <li className=" uppercase text-center">
                  {" "}
                  {user.firstName} {user.lastName}{" "}
                </li>
                <li className="text-center"> {user.email}</li>
                <li className="text-center tracking-widest">----------</li>
                <li className="uppercase text-center">Student</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
