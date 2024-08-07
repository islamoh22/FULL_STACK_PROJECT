import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        newPassword
      });
      setSuccess('Password reset successful');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError('Error resetting password');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <div className="text-danger">{error}</div>}
        {success && <div className="text-success">{success}</div>}
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
