import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for custom styles

const HomePage = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to Your Task Manager</h1>
      <Row className="justify-content-center">
        <Col md={4} className="text-center">
          <Button as={Link} to="/login" variant="primary" className="w-100 mb-2">
            Login
          </Button>
          <Button as={Link} to="/signup" variant="secondary" className="w-100">
            Signup
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
