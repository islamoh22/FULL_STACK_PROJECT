import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import './TaskForms.css'; // Import the CSS file for custom styles

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare task data
    const taskData = {
      title,
      description,
      due_date: dueDate,
      priority,
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      // Make the API request to create a task
      const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Task created successfully');
      setError('');
      navigate('/tasks'); // Redirect to the view tasks page or dashboards
    } catch (err) {
      setError('Error creating task');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>
        {error && <div className="text-danger">{error}</div>}
        {success && <div className="text-success">{success}</div>}
        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTask;
