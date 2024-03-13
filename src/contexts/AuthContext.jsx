import { createContext, useEffect, useState } from "react";
import Auth from "../utils/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on initial render
  useEffect(() => {
    const token = Auth.getToken();
    if (token) {
      const profile = Auth.getProfile();
      fetchUserProfile(profile.id);
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`); // Replace with your API endpoint
      // Assuming user data is in response.data.data
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      // Handle errors appropriately
    }
  };

  const login = async (token) => {
    Auth.login(token); // Call your login function from utils/auth
    const profile = Auth.getProfile();
    await fetchUserProfile(profile.id);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
