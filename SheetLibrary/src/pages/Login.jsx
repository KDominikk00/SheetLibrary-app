import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='flex items-center justify-center h-screen'>
      <button
        onClick={() => loginWithRedirect()}
        className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-all'
      >
        Log in
      </button>
    </div>
  );
};

export default Login;