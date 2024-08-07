import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './TaskForms.css'; // Import the CSS file for custom styles

const UpdateTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      } catch (err) {
        setError('Error fetching task');
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Task updated successfully');
      setError('');
      navigate('/tasks');
    } catch (err) {
      setError('Error updating task');
      setSuccess('');
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <h2>Update Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={task.due_date.substring(0, 10)} // Adjust date format
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={task.priority}
            onChange={handleChange}
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
          Update Task
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateTask;
