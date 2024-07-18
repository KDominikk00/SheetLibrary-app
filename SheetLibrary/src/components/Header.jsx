import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <section className='flex justify-between items-center p-6 ml-12 mr-12'>
      <div>
        <img
          src="./public/SheetLibrarynobg.png"
          alt="SheetLibrary"
          width={250}
        />
      </div>
        <div className='space-x-12 text-2xl font-semibold'>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Home
        </NavLink>
        <NavLink 
          to="/explore" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Explore
        </NavLink>
        </div>
        <div className='space-x-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all'>+ Upload</button>
          <a href="/account">Account</a>
        </div>
    </section>
  )
}

export default Header