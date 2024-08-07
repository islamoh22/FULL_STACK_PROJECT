import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Dashboard.css'; // Import the CSS file for custom styles

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <h2 className="dashboard-title mb-4">Dashboard</h2>
      <Row>
        <Col md={4} className="mb-3">
          <Card className="dashboard-card">
            <Card.Body>
              <Link to="/create-task" className="dashboard-link">
                <Button variant="primary" block>
                  Create Task
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="dashboard-card">
            <Card.Body>
              <Link to="/tasks" className="dashboard-link">
                <Button variant="primary" block>
                  View Tasks
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
