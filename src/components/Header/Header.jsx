import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './header.css';

const Header = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          Cousera
        </Link>
        {isAuthenticated ? (
          <Link to="/profile" className="header-profile">
            <strong>{user.name}</strong>
          </Link>
        ) : (
          <Link to="/register" className="header-link">
            Regístrate ahora
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
