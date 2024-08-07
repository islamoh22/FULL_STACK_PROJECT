import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateTask from './pages/CreateTask';
import TaskList from './pages/TaskList';
import UpdateTask from './pages/UpdateTask';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;