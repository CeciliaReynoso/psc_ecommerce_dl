import axios from '../config/axiosConfig';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';
import '../App.css'; // Asegúrate de que la ruta sea correcta

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
  email: 'Escriba su email',
  password: 'password',
  nombre: '',
  direccion: ''
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil');
    }
  }, [navigate]);

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (event) => {
    event.preventDefault();

    if (
      !user.nombre.trim() ||
      !user.email.trim() ||
      !user.password.trim() ||
      !user.direccion.trim()
    ) {
      return window.alert('Todos los campos son obligatorios.');
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El email no es válido.');
    }

    // Verificar el valor del nombre antes de enviar
    console.log('Nombre:', user.nombre);

    try {
      const response = await axios.post(ENDPOINT.register, user);
      window.alert('Usuario registrado con éxito.');
      // Guardar nombre, rol y dirección en localStorage
      localStorage.setItem('userNombre', response.data.nombre);
      localStorage.setItem('userRol', response.data.rol);
      localStorage.setItem('userDireccion', response.data.direccion);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      window.alert('Error al registrar usuario.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleForm}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleUser} />
          </div>
          <div>
            <label>Registre una Contraseña:</label>
            <input type="password" name="password" value={user.password} onChange={handleUser} />
          </div>
          <div>
            <label>Nombre Completo:</label>
            <input type="text" name="nombre" value={user.nombre} onChange={handleUser} />
          </div>
          <div>
            <label>Dirección:</label>
            <input type="text" name="direccion" value={user.direccion} onChange={handleUser} />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;