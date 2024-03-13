import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Tasks from './components/Tasks/Tasks.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import TaskDetail from './components/TaskDetail/TaskDetail.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import CreateTask from './components/CreateTask/CreateTask.jsx';
import Profile from './components/Profile/Profile.jsx'; 
import EditProfile from './components/EditProfile/EditProfile.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          {!window.location.pathname.startsWith('/') && <Header />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<TaskDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new-task" element={<CreateTask />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
