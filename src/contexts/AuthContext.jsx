import { createContext, useEffect, useState } from "react";
import Auth from "../utils/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Auth.getToken();
    if (token) {
      const profile = Auth.getProfile();
      fetchUserProfile(profile.id);
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (token) => {
    Auth.login(token);
    const profile = Auth.getProfile();
    await fetchUserProfile(profile.id);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
