import React, { useContext } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from '../Context/userContext';
import axios from 'axios';
function Navbar() {
  const { isLoggedIn, user, setUser, setIsLoggedIn  } = useContext(UserContext);
 
  const navigate = useNavigate();
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
  }
  return (
    <div className="w-full bg-[#141313] text-white ">
      <div className="lg:w-11/12 w-full flex items-center justify-between py-5 px-3 lg:px-10 mx-auto">
        <h1 className=" text-[1.5rem] leading-5 tracking-wide">Sachin</h1>
       
        <div className="flex items-center justify-between space-x-7 gap-3 ">
          <div className=" hidden lg:flex space-x-8">
            <p className="text-[1.2rem]">Home</p>
            <p className="text-[1.2rem]">About</p>
            <p className="text-[1.2rem]">Contact</p>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center ">
              <img src={user.image} className="h-9 mr-5 rounded-full" alt="" />

              <button
                className="border-[2px] border-solid  px-4 py-2 rounded-2xl text-[1rem]"
                // onClick={() => {
                //   localStorage.removeItem("user");
                //   setUser((pre) => {
                //     return {
                //       ...pre,
                //       lastName: "",
                //       firstName: "",
                //       email: "",
                //       password: "",
                //     };
                //   });
                //   setIsLoggedIn(false);
                //   navigate("/");
                // }}
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
      </div>
    </div>
  );
}

export default Navbar
