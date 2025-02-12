import React, { useState, useContext } from 'react';
import axios from '../config/axiosConfig'; // Asegúrate de usar la configuración correcta de axios
import RolesContext from '../context/RolesContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ email: 'Ingrese su email', password: 'Ingrese su password', nombre: '', direccion: '' });
  const { setCargo } = useContext(RolesContext);
  const navigate = useNavigate();

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', user);
      console.log('Cliente registrado con éxito:', response.data);
      setCargo(response.data.rol); // Ajusta esto según la estructura de roles en tu respuesta
      window.alert('Cliente registrado con éxito 😀.');
      navigate('/'); // Navegar a la página de inicio o a otra página después del registro
    } catch (error) {
      console.error('Error al registrar el cliente:', error.response.data);
      window.alert(`Error al registrar el cliente: ${error.response.data.message} 🙁.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h1 className='form-title'>Registro</h1>
      <hr />
      <div className='form-group'>
        <label>Email address</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Ingrese su email'
        />
      </div>
      <div className='form-group'>
        <label>Modifique este Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder=' '
        />
      </div>
      <div className='form-group'>
        <label>Nombre Completo</label>
        <input
          value={user.nombre}
          onChange={handleUser}
          type='text'
          name='nombre'
          className='form-control'
          placeholder='Ingrese su nombre'
        />
      </div>
      <div className='form-group'>
        <label>Dirección</label>
        <input
          value={user.direccion}
          onChange={handleUser}
          type='text'
          name='direccion'
          className='form-control'
          placeholder='Ingrese su dirección'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Registrarse</button>
    </form>
  );
};

export default Register;