import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Tasks from "./components/Tasks/Tasks";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import Profile from "./components/Profile/Profile";
import CreateTask from "./components/CreateTask/CreateTask";
import { AuthContext } from "../../contexts/AuthContext";

const App = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks">
          {isAuthenticated ? (
            <>
              <Header />
              <Tasks />
            </>
          ) : (
            <>
              <h1>Cousera</h1>
              <Link to="/register">Regístrate ahora</Link>
              <Link to="/login">Ingresar</Link>
            </>
          )}
        </Route>
        <Route path="/tasks/:taskId" element={<TaskDetail />} />
        <Route path="/profile">
          {isAuthenticated && <Header />}
          <Profile />
        </Route>
        <Route path="/create-task">
          {isAuthenticated && (
            <>
              <Header />
              <CreateTask />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
