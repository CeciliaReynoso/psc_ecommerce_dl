import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

// Agregar el interceptor de respuestas
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirigir al usuario a la página de inicio de sesión
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;