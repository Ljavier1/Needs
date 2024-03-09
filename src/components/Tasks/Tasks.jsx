import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('/api/tasks/getAllTasks');
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (tasks.length > 0) {
      getUser(tasks[0].user_id);
    }
  }, [tasks]);

  return (
    <div className="container">
      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <h2>{task.title}</h2>
            {user && user.name && (
              <p className="author">
                Created by: {user.name}
              </p>
            )}
            {user && user.avatar && (
              <img src={user.avatar} alt="User avatar" />
            )}
            <p>{task.description}</p>
            {task.created_at && <p>Created at: {task.created_at}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
