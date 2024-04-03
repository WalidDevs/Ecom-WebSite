import React from 'react'
import { AiFillHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { Button } from "@material-tailwind/react";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';



const UserNav = ({ searchTerm, setSearchTerm, handleLogout }) => {
    const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    const isAdmin = userRoles.includes('ROLE_ADMIN'); // Vérifie si l'utilisateur est un admin
    const navigate = useNavigate();
    
    return (
        <nav className='w-11/12 xl:w-4/5 m-auto flex justify-between py-5'>
                <h1 className='text-2xl font-semibold'>Lami<span className='text-rose-400'>Tech</span></h1>
                  
            <input
            type="text"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-auto max-w-xs px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
                <div>
                {isAdmin ? (
                    <ul className='flex space-x-8 text-base hidden md:flex'>
                        <li><a href='/'>Home</a></li>
                        <li><a href='Product'>Products</a></li>
                        <li><button className="text-xs sm:text-sm bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 min-w-[120px] rounded" onClick={() => navigate('/add-product')}>+Ajouter un produit</button></li>
                        <li><button className="text-xs sm:text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 min-w-[120px] rounded" onClick={handleLogout}>Déconnexion</button></li>
                    
                    </ul>
                ):(<ul className='flex space-x-8 text-base hidden md:flex'>
                    
                <li><a href='Home'>Home</a></li>
                <li><a href='Product'>Products</a></li>
                <li>
  <a href='/Profile' className="flex items-center space-x-1">
    <FaUser className="inline-block" />
    <span>Profile</span>
  </a>
</li>

                <li><a href='/cart' className="flex items-center space-x-1">
    <AiOutlineShoppingCart className="inline-block" />
    <span>Panier</span>
  </a></li>
                <li><button onClick={handleLogout} className="text-xs sm:text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 min-w-[120px] rounded" >Déconnexion</button></li>
            
            </ul>) }
                </div>
            </nav>)
            
       
        
}

export default UserNav