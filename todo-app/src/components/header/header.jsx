import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Login from '../auth/login';
import './header.css'; 

export default function NavBar() {
  return (
    <>
      <Navbar className="custom-navbar" variant="light">
        <Container>
          <Navbar.Brand href="#home">TO DO list</Navbar.Brand>
          <Nav className="me-auto">
            <Link style={{ paddingRight: '15px' }} to="/">Home</Link>
            <Link to="settings">Settings</Link>
          </Nav>
        </Container>
        <Login/>
      </Navbar>
    </>
  );
}
