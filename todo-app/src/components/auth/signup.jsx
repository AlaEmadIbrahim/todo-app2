import React, { useContext, useState } from "react";
import { When } from "react-if";
import { LoginContext } from './context.jsx';
import './signUp.css';

export default function SignUp(props) {
  const login = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  let handleUsername = (e) => {
    setUsername(e.target.value);
  };
  
  let handlePassword = (e) => {
    setPassword(e.target.value);
  };
  
  let handleRole = (e) => {
    setRole(e.target.value);
  };
  
  let handleSubmit = (e) => {
    e.preventDefault();
    login.signup(username, password, role);
    e.target.reset()
  };
  
  return (
    <div className="sign-up-container">
      <When condition={!login.loggedIn}>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              placeholder="Username"
              name="username"
              onChange={handleUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlePassword}
            />
          </div>
          <div className="form-group">
            <select
              name="role"
              onChange={handleRole}
            >
              <option value="" disabled selected>Select Role</option>
              <option value="user">User</option>
              <option value="writer">Writer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </When>
    </div>
  );
}
