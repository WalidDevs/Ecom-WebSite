import React from 'react'
import { AiFillHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { Button } from "@material-tailwind/react";

const Nav = () => {
    return (
        <nav className=' w-11/12 xl:w-4/5 m-auto flex justify-between py-5 '>
            <h1 className='text-2xl font-semibold'>Lami<span className='text-rose-400'>Tech</span></h1>
            <div>
                <ul className='flex space-x-8 text-base hidden md:flex'>
                    <li><a href='#Home'>Home</a></li>
                    <li><a href='#Products'>Products</a></li>
                    <li><a href='#About'>About</a></li>
                    <li><a href='#Services'>Services</a></li>
                    <li><a href='#Footer'>Contact</a></li>
                </ul>
            </div>

        </nav>
    )
}

export default Nav