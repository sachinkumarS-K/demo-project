import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="w-full relative ">
      <div className='px-[2rem] absolute py-5 ' onClick={() => navigate("/")}> 
        <FaArrowLeft className="text-4xl "/>
      </div>
      <div className=" w-full h-screen flex items-center justify-center gap-10 flex-col">
        <h1 className="lg:text-5xl text-3xl font-bold tracking-wider text-red-400 ">
          404 Page Not Found
        </h1>
        <FaExclamation className="text-[10rem]" />
      </div>
    </div>
  );
}

export default ErrorPage
