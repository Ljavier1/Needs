import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./tasks.css";
import Header from "../Header/Header.jsx";
import TaskDetail from '../TaskDetail/TaskDetail.jsx';

const baseUrl = "http://localhost:3000";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tasks`);
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/tasks\/(\d+)$/);
      if (match) {
        setSelectedTaskId(parseInt(match[1]));
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <div className="container">
      {isAuthenticated && <Header />}
      <div className="tasks-list">
        {isLoading ? (
          <p>Cargando información de las tareas...</p>
        ) : (tasks && tasks.length === 0) ? (
          <p>No hay tareas disponibles.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="task"
              // onClick={() => handleTaskClick(task.id)} // Eliminado
            >
              <div className="task-header">
                <h2>{task.title}</h2>
                <div className="task-status">
                  {task.completed ? (
                    <>
                      <span className="status-icon green"></span>
                      <span>Completada</span>
                    </>
                  ) : (
                    <>
                      <span className="status-icon red"></span>
                      <span>No completada</span>
                    </>
                  )}
                </div>
              </div>
              <p>{task.description}</p>
              {task.created_at && <p>Creado en: {task.created_at}</p>}
              <Link to={`/tasks/${task.id}`}>Ver en detalle</Link>
              <span className="comment-count">{task.comments_count}</span>
            </div>
          ))
        )}
      </div>
      {selectedTaskId && <TaskDetail taskId={selectedTaskId} />}
    </div>
  );
};

export default Tasks;
