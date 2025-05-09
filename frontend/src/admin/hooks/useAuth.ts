import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/auth/AuthProvider';
import { login as apiLogin, logout as apiLogout } from '../services/authService';
import { User } from '../types';

const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  const { user, setUser } = context;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación al cargar
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Aquí iría una verificación real con el backend
          // const userData = await verifyToken(token);
          // setUser(userData);
        }
      } catch (error) {
        console.error('Error verifying auth:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const userData = await apiLogin(credentials);
      setUser(userData);
      localStorage.setItem('authToken', userData.token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};

export default useAuth;