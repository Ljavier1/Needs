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

      // If request is successful
      if (response.status === 201) {
        // Update comments list
        const newComments = [...comments, response.data.data];
        setNewComment('');

        console.log('Comentario publicado correctamente.'); // Log message for success
      } else {
        console.error('Error al publicar el comentario.'); // Log message for error
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
        {isLoading && <p>Cargando...</p>}  {/* Simple loading text */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Publicando...' : 'Publicar comentario'}
        </button>
      </form>
    </div>
  );
};

export default Comments;
