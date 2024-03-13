import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
// import Comments from '../components/Comments/Comments.jsx'; 

const TaskDetail = () => {
  const { user } = useContext(AuthContext);
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solutionFile, setSolutionFile] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/tasks/${taskId}`);
        setTask(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleSolutionUpload = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      console.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/tasks/${taskId}/solutions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Solución subida correctamente.");
      // Mostrar el nombre del archivo subido
      setSolutionFile(response.data.data.file_name);
      // Refresh task details to show uploaded solution
      fetchTaskDetails();
    } catch (error) {
      console.error(error);
      console.error("Error al subir la solución.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await axios.post("/api/tasks/status", {
        taskId,
        completed: true,
      });

      console.log("Tarea marcada como completada.");
      // Refresh task details to show updated status
      fetchTaskDetails();
    } catch (error) {
      console.error(error);
      console.error("Error al marcar la tarea como completada.");
    }
  };

  return (
    <div>
      {isLoading && <p>Cargando detalles de la tarea...</p>}
      {user && (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          {task.created_at && <p>Creado en: {task.created_at}</p>}
        
          {task.user && (
            <>
              <p>Creado por: {task.user.name}</p>
              {task.user.avatar && (
                <img src={task.user.avatar} alt="Avatar del usuario" />
              )}
            </>
          )}

          {/* Sección de subida de soluciones */}
          <h3>Subir solución</h3>
          <Dropzone onDrop={handleSolutionUpload} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  Arrastra y suelta tu archivo aquí, o haz click para
                  seleccionarlo.
                </p>
              </div>
            )}
          </Dropzone>
          {solutionFile && <p>Archivo subido: {solutionFile}</p>}

          {/* Sección de comentarios */}
          <h3>Comentarios</h3>
          <Comments taskId={taskId} comments={task.comments} />

          {/* Botón para marcar la tarea como completada (si el usuario es el creador de la tarea) */}
          {user && task.user && user.id === task.user.id && (
            <button onClick={handleMarkCompleted}>
              Marcar como completada
            </button>
          )}
        </>
      )}
      {!task && <p>Cargando detalles de la tarea...</p>}
    </div>
  );
};

export default TaskDetail;
