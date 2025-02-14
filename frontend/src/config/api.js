import axios from '../config/axiosConfig';
import { ENDPOINT } from '../config/constans';

// Obtener todos los usuarios (requiere token)
export const getUsers = async (token) => {
  if (!token) {
    throw new Error('Token no encontrado');
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.get(ENDPOINT.users, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID (requiere autenticación)
export const getUserById = async (id, token) => {
  if (!token) {
    throw new Error('Token no encontrado');
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${ENDPOINT.user}/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo usuario (Registro Público)
export const createUser = async (user) => {
  try {
    const response = await axios.post(ENDPOINT.register, user);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar un usuario (requiere autenticación)
export const updateUser = async (id, user, token) => {
  if (!token) {
    throw new Error('Token no encontrado');
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.put(`${ENDPOINT.user}/${id}`, user, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un usuario (requiere autenticación)
export const deleteUser = async (id, token) => {
  if (!token) {
    throw new Error('Token no encontrado');
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`${ENDPOINT.user}/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Asignar rol a un usuario 
export const assignRole = async (data, token) => {
  if (!token) {
    throw new Error('Token no encontrado');
  }
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.put(`${ENDPOINT.users}/asignar-rol`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error al asignar rol:', error);
    throw error;
  }
};