import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Header.css'; // Import the CSS file for custom styles

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="header-navbar">
      <Navbar.Brand as={Link} to="/" className="header-title">To-Do List</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/reset-password" className="header-link">
                <Button variant="outline-secondary" className="reset-password-button">Reset Password</Button>
              </Nav.Link>
              <Button variant="outline-primary" onClick={handleLogout} className="logout-button">Logout</Button>
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
