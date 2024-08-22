import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='p-6 mx-auto max-w-header'>
      <div className='flex items-center justify-between'>
        {/* Logo Section */}
        <div>
          <img src="/SheetLibrarynobg.png" alt="SheetLibrary" width={250} />
        </div>

        {/* Navigation Section */}
        <nav className='flex-1 flex justify-center space-x-12 text-2xl font-semibold'>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Explore
          </NavLink>
        </nav>

        {/* Buttons Section */}
        <div className='space-x-4'>
          <NavLink to="/upload" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all'>
            + Upload
          </NavLink>
          <a href="/account" className='text-blue-500 hover:underline'>Account</a>
        </div>
      </div>
    </header>
  );
};

export default Header;