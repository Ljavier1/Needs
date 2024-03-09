import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage.jsx';
import Tasks from './components/Tasks/Tasks.jsx';
import Header from './components/Header/Header.jsx'; // Importar el componente Header
import { AuthContext } from './contexts/AuthContext'; // Importar el contexto de usuario

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const withHeader = (Component) => {
    return () => {
      return (
        <>
          <Header />
          <Component />
        </>
      );
    };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      <BrowserRouter>
        <div>
          <Header /> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={withHeader(Tasks)} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
