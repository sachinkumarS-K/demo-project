import axios from 'axios';
import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';

function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const {token} = useParams();

    async function submitHandler(e) {
        e.preventDefault();
    try {
        console.log(password, cPassword, token);
       
        
        const res = await axios.post("/api/v1/resetPassword", { password, cPassword, token });
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)`,
      }}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="w-[90%] lg:w-[35%] lg:h-[30rem] h-[25rem] rounded-lg shadow-lg bg-red-100">
        <h1 className="w-full text-center mt-[2rem] py-6 text-white text-2xl font-bold tracking-wide">
          Update Password
        </h1>

        <form
          method="POST"
          onSubmit={submitHandler}
          className=" mt-[4rem] lg:mt-[5rem] flex flex-col gap-6 items-center justify-center"
        >
          <input
            type="text"
            className="py-3 w-[90%] lg:w-[60%] mx-auto rounded-lg indent-7 outline-0 text-xl  "
            value={password}
            placeholder="Enter your new Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="py-3 w-[90%] lg:w-[60%] mx-auto rounded-lg indent-7 outline-0 text-xl "
            value={cPassword}
            placeholder="Confirm your Password"
            onChange={(e) => setCpassword(e.target.value)}
            id=""
          />

          <button className='py-3 bg-white rounded-xl px-8 '>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword
