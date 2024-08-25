import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg" className="header-navbar">
      <Navbar.Brand as={Link} to="/" className="header-title">To-Do List</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              {location.pathname !== '/reset-password' && (
                <Nav.Link as={Link} to="/reset-password" className="header-link">
                  <Button variant="outline-secondary" className="reset-password-button">Reset Password</Button>
                </Nav.Link>
              )}
              <Button variant="outline-primary" onClick={() => { onLogout(); navigate('/login'); }} className="logout-button">Logout</Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="header-link">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" className="header-link">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
