import React, { useContext, useState } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context.jsx';
import './login.css';

export default function Login(props) {
  const login = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let handleUsername = (e) => {
    setUsername(e.target.value);
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    login.login(username, password);
  };

  return (
    <div className="login-container">
      <When condition={login.loggedIn}>
        <button className="logout-button" onClick={login.logout}>
          Log Out
        </button>
      </When>

      <When condition={!login.loggedIn}>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <input
            placeholder="Username"
            name="username"
            onChange={handleUsername}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlePassword}
            className="input-field"
          />
          <button type="submit">Submit</button>
        </form>
      </When>
    </div>
  );
}


