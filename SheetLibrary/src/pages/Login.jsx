import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle authentication using your own logic here
      loginWithRedirect({
        authorizationParams: {
          // Additional parameters if needed
          redirect_uri: window.location.origin,
        },
      });
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

export default Login