import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className='flex items-center space-x-4'>
          <NavLink to="/upload" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all'>
            + Upload
          </NavLink>
          
          {!isAuthenticated ? (
            <button onClick={() => loginWithRedirect()} className='text-blue-500 hover:underline'>Log in</button>
          ) : (
            <div className='relative'>
              <button onClick={toggleMenu} className='text-blue-500'>
                <img className="w-8 h-8 rounded-full" src={user.picture} alt="User" />
              </button>
              {menuOpen && (
                <div ref={menuRef} className='absolute right-0 mt-2 bg-white border rounded shadow-lg p-4 w-48'>
                  <button
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                      setMenuOpen(false); // Close menu after logout
                    }}
                    className='block w-full text-left text-red-500 hover:bg-gray-100 p-2 rounded hover:rounded'
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;