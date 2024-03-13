import React, { useState } from 'react';

const Comments = ({ taskId, comments }) => {
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const requestBody = {
      content: newComment,
    };

    try {
      const response = await axios.post(`http://localhost:3000/tasks/${taskId}/comments`, requestBody);

      if (response.status === 201) {
        const newComments = [...comments, response.data.data];
        setNewComment('');

        console.log('Comentario publicado correctamente.'); 
      } else {
        console.error('Error al publicar el comentario.'); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    setNewComment('');
  };

  return (
    <div>
      <h3>Comentarios ({comments.length})</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.user && (
              <span>
                {comment.user.name}: {comment.content}
              </span>
            )}
            {!comment.user && (
              <span>Usuario anónimo: {comment.content}</span>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu comentario aquí..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        {isLoading && <p>Cargando...</p>} 
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Publicando...' : 'Publicar comentario'}
        </button>
      </form>
    </div>
  );
};

export default Comments;
