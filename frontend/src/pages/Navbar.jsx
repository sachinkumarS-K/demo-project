import React, { useContext, useState , useRef, useEffect } from 'react'
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { UserContext } from '../Context/userContext';
import Hamburger from "hamburger-react";
import gsap from "gsap";
import axios from 'axios';
import { Expo } from 'gsap';
function Navbar({page}) {
  const { isLoggedIn, user, setUser, setIsLoggedIn , isOpen, setOpen } =
    useContext(UserContext);
  
  const burgerRef = useRef(null)
  const textRef = useRef(null)
  const navigate = useNavigate(); 
 

  useEffect(() => {
    //console.log(burgerRef)
    const t = gsap.timeline();

    t.to(burgerRef.current, {
      rotate: 360,
      duration: 2,
      ease: Expo.easeInOut,
      x: -30,
    })
      .to(burgerRef.current, {
        duration: 2,
        x: 0,
        ease: Expo.easeInOut,
        stagger: true,
      })

      .from(textRef.current, {
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut,
        y: -300,
       
        delay: -2,
      });
      
    
  },[])
  //console.log(object)
  async function logoutHandler() {
    const res = await axios.get(`/api/v1/logout/`);
    console.log(res)
    if (res) {
      setUser((pre) => {
                    return {
                      ...pre,
                      lastName: "",
                      firstName: "",
                      email: "",
                      password: "",
                    };
                  });
                  setIsLoggedIn(false);
      navigate("/")
    }
    setOpen(false);
  }
  return (
    <div className="w-full bg-[#141313] text-white sticky top-0  ">
      <div className="lg:w-11/12 w-full flex items-center justify-between py-5 px-3 lg:px-10 mx-auto">
        <h1 ref={textRef} className=" text-[2rem] shadow-lg pl-4 font-bold leading-5 tracking-wide">Sachin</h1>

        <div className="lg:flex md:flex hidden items-center justify-between space-x-7 gap-3 ">
          <div className=" hidden lg:flex space-x-8">
            {page == "home" ? (
              <p className="text-[1.2rem] cursor-pointer">
                {" "}
                <NavLink to="/dashboard">Dashboard</NavLink>
              </p>
            ) : (
              <p className="text-[1.2rem]">
                {" "}
                <NavLink to="/">Home</NavLink>
              </p>
            )}

            <p className="text-[1.2rem]">
              <NavLink to="/about">About</NavLink>
            </p>
            <p className="text-[1.2rem]">Contact</p>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center ">
              <img src={user.image} className="h-9 mr-5 rounded-full" alt="" />

              <button
                className="border-[2px] border-solid  px-4 py-2 rounded-2xl text-[1rem]"
                onClick={logoutHandler}
              >
                <NavLink to="/login">Logout</NavLink>
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                className="border-0 px-4 py-2 bg-green-400 rounded-2xl text-[1rem]"
                onClick={() => {
                  console.log("object");
                }}
              >
                <NavLink to="/signUp">Sign Up</NavLink>
              </button>

              <button
                className="border-[2px] border-solid  px-4 py-2 rounded-2xl text-[1rem]"
                onClick={() => {
                  console.log("object");
                }}
              >
                <NavLink to="/login">Login</NavLink>
              </button>
            </div>
          )}
        </div>
        {/* {
          isOpen && (
            <div>
              <h1>sachin</h1>
            </div>
          )

        } */}
        <div
          ref={burgerRef}
          id="burger"
          className="lg:hidden md:hidden flex  items-center gap-2"
        >
          {isLoggedIn && (
            <img src={user.image} className="h-10 mr-5 rounded-full" alt="" />
          )}
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      {isOpen && (
        <div
          className="lg:hidden md:hidden transition-all duration-200 delay-300 absolute  w-full flex items-center justify-center text-black shadow-lg  pt-[5rem] 
          "
        >
          <div className="absolute top-[0rem] blur-xl w-full  z-20  h-[29rem] lg:rounded-2xl backdrop-blur-lg bg-gradient-to-r from-neutral-100  to [rgba(255,255,255,0.5)]  "></div>
          <ul className="flex flex-col items-center gap-5 z-30">
            <li className="text-3xl font-bold tracking-wide   drop-shadow-xl ">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-3xl font-bold tracking-wide drop-shadow-xl"  >
              <NavLink to="/about"> About </NavLink>
            </li>
            <li className="text-3xl font-bold tracking-wide drop-shadow-xl">
              Contact
            </li>

            {isLoggedIn ? (
              <div className="flex items-center flex-col justify-center gap-4">
                <li>
                  <button className=" py-3 font-bold drop-shadow-xl px-9 text-white tracking-wide bg-gradient-to-r from-green-300 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-2xl ">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </button>
                </li>
                <button
                  className=" py-3 font-bold ttext-white tracking-wide bg-gradient-to-r from-green-300 to-blue-500 hover:from-pink-500 text-white hover:to-yellow-500  drop-shadow-xl px-9 text-xl bg-red-300 rounded-2xl "
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4 flex  flex-col items-center">
                <li>
                  <button className=" py-3 px-7 text-xl font-bold text-white tracking-wide bg-gradient-to-r from-green-300 to-blue-500 hover:from-pink-500 hover:to-yellow-500  drop-shadow-xl bg-red-300 rounded-2xl ">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </button>
                </li>
                <li>
                  <button className=" py-3 font-bold drop-shadow-xl px-9 text-xl text-white tracking-wide bg-gradient-to-r from-green-300 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-2xl ">
                    <NavLink to="/login"> Login</NavLink>
                  </button>
                </li>
                <li>
                  <button className=" py-3 font-bold text-white tracking-wide bg-gradient-to-r from-green-300 to-blue-500 hover:from-pink-500 hover:to-yellow-500 drop-shadow-xl px-9 text-xl rounded-2xl ">
                    <NavLink to="/signUp"> SignUp</NavLink>
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar
