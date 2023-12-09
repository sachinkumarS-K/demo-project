import React, { useContext, useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar.jsx';
import { UserContext } from '../Context/userContext.jsx';

function Home() {

  return (
    <div className=" w-full h-screen bg-black ">
      <Navbar />
     <h1 className='text-white w-full h-[80vh] flex items-center justify-center text-3xl font-medium'>Home</h1>
 </div>
  );
}

export default Home
