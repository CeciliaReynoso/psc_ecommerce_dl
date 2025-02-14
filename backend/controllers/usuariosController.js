const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarioPorEmail,
  registrarUsuario,
  asignarRol
} = require("../models/consultas");

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await obtenerUsuarioPorEmail(email);
    if (!user) {
      return res.status(401).send("Credenciales incorrectas");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Credenciales incorrectas");
    }
    const token = jwt.sign(
      { email: user.email, password: user.password },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
const registrarCliente = async (req, res) => {
  const { email, password, nombre, direccion } = req.body;
  try {
    const nuevoUsuario = await registrarUsuario(email, password, nombre, direccion);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registrarPersonal = async (req, res) => {
  const { email, password, rol, nombre, direccion } = req.body;
  try {
    const nuevoUsuario = await registrarUsuario(email, password, rol, nombre, direccion);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const asignarRolUsuario = async (req, res) => {
  const { email, rol } = req.body;
  try {
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const usuarioActualizado = await asignarRol(usuario.id, rol);
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {   
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerUsuarioPorIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await obtenerUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modificarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, rol } = req.body;
  try {
    const usuarioModificado = await modificarUsuario(id, nombre, direccion, rol);
    res.status(200).json(usuarioModificado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarUsuario(id);
    res.status(200).send("Usuario eliminado con éxito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postLogin,
  registrarCliente,
  registrarPersonal,
  asignarRolUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId: obtenerUsuarioPorIdController,
  modificarUsuarioPorId,
  eliminarUsuarioPorId
};