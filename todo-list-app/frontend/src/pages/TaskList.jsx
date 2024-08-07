import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TaskList.css'; // Import the CSS file for custom styles

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${selectedTask._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== selectedTask._id));
      setShowModal(false);
    } catch (err) {
      alert('Error deleting task');
      setShowModal(false);
    }
  };

  const handleComplete = async (taskId, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}/complete`, 
        { completed: !completed }, // Toggle the completion status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (err) {
      alert('Error updating task');
    }
  };

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2>Task List</h2>
      {error && <div className="text-danger">{error}</div>}
      <Table striped bordered hover className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>
                <Button 
                  variant={task.completed ? "success" : "secondary"}
                  onClick={() => handleComplete(task._id, task.completed)}
                >
                  {task.completed ? "Completed" : "Mark as Completed"}
                </Button>
              </td>
              <td>
                <Link to={`/update-task/${task._id}`}>
                  <Button variant="warning" className="mr-2">
                    Update
                  </Button>
                </Link>
                <Button 
                  variant="danger" 
                  onClick={() => handleShowModal(task)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-4 text-center">
        <Link to="/create-task">
          <Button variant="primary">Create a New Task</Button>
        </Link>
      </div>
      
      {/* Delete Confirmation Modal */}
      {selectedTask && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the task "{selectedTask.title}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              No
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default TaskList;
