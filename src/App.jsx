import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Tasks from './components/Tasks/Tasks.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Importa el AuthProvider
import TaskDetail from './components/TaskDetail/TaskDetail.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';

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
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
