import superagent  from 'superagent';
import React from 'react';
import {useEffect,useState} from 'react'
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
export const LoginContext = React.createContext();
import base64 from 'base-64'

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};


function LoginProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ capabilities: cookie.load('capabilities') } || '');
    const [error, setError] = useState(null);
  
    let can = (capability) => {
      return user?.capabilities?.includes(capability);
    };
  
    let signup = async (username, password, role) => {
      const obj = {
        username: username,
        password: password,
        role: role,
      };
      try {
        const url = `https://midproject.onrender.com/signup`;
        const res = await axios.post(url, obj);
        console.log(res.data);
      } catch (e) {
        setLoginState(false, null, {}, e);
        console.error(e);
      }
    };
  
    const login = async (username, password) => {
      try {
        const response = await superagent
          .post('https://midproject.onrender.com/signin')
          .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
        console.log('body>>>>>', response.body);
        validateToken(response.body);
      } catch (err) {
        console.log('Login error:', err);
      }
    };
  
    let addItem = async (item) => {
      try {
        const obj = {
          item: item.text,
          assignedTo: item.assigned,
          difficulty: item.difficulty,
          complete: item.complete,
        };
        const url = `https://midproject.onrender.com/api/v1/todo`;
        const response = await axios.post(url, obj);
        console.log(response.data);
      } catch (error) {
        console.error('Add item error:', error);
      }
    };
  
    let fetchData = async () => {
      try {
        const url = `https://midproject.onrender.com/api/v1/todo`;
        const response = await axios.get(url);
        console.log(response.data);
      } catch (error) {
        console.error('Fetch data error:', error);
      }
    };
  
    let logout = () => {
      setLoginState(false, null, {});
      cookie.remove('token');
    };
  
    const validateToken = (user) => {
      try {
        const validUser = jwt_decode(user.token);
        setLoginState(true, user.token, validUser);
  
        cookie.save('capabilities', user.user.capabilities);
        setUser(user.user);
      } catch (e) {
        setLoginState(false, null, {}, e);
        console.log('Token Validation Error', e);
      }
    };
  
    let setLoginState = (loggedIn, token, user, error) => {
      cookie.save('token', token);
      setLoggedIn(loggedIn);
      setUser(user);
      setError(error || null);
    };
  
    useEffect(() => {
      const token = cookie.load('token');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, []);
  
    let state = {
      loggedIn: loggedIn,
      can: can,
      login: login,
      logout: logout,
      user: user,
      error: error,
      addItem: addItem,
      fetchData: fetchData,
      signup: signup,
    };
  
    return (
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    );
  }
  
  export default LoginProvider;
