const CreateTask = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!title || !description) {
        return toast.error('Debes completar todos los campos.');
      }
  
      setIsLoading(true);
      setError(null);
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
  
      try {
        const response = await axios.post('/tasks', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        toast.success('Tarea creada correctamente.');
        // Redirigir a la página de detalles de la tarea
        navigate(`/tasks/${response.data.data.id}`);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || 'Error al crear la tarea.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    return (
      <div>
        {user && (
          <>
            <h2>Crear nueva tarea</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
  
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
  
              <label htmlFor="file">Archivo adjunto (opcional)</label>
              <input type="file" id="file" name="file" onChange={handleFileChange} />
  
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear tarea'}
              </button>
  
              {error && <p className="error-message">{error}</p>}
            </form>
          </>
        )}
        {!user && <Redirect to="/login" />}
      </div>
    );
  };
  
  export default CreateTask;
  