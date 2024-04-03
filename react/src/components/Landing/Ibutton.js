import React from 'react'
import { Button } from "@material-tailwind/react";

const Ibutton = () => {
    return (
        <div className="w-full max-w-xs mx-auto space-x-4 mt-4 ml-[30rem]">
            <button className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" ><a href='Signup'>Sign Up</a></button>
            <button className="bg-black hover:bg-gray-600 text-white font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded"><a href='Signin'>Sign in</a></button>
        </div>



    )
}

export default Ibutton
