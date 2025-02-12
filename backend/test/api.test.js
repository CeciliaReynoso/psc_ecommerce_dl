const request = require('supertest');
const { app, server } = require('../index'); // Asegúrate de que este sea el punto de entrada de tu aplicación
const {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  registrarCliente,
  postLogin,
  modificarUsuarioPorId
} = require('../controllers/usuariosController');

describe('Pruebas de usuariosController', () => {
  let token;

  beforeAll(async () => {
    try {
      // Autenticar y obtener un token JWT
      const response = await request(app)
        .post('/login')
        .send({
          email: 'admin@example.com',
          password: 'admin_password'
        });
      token = response.body.token;
      if (!token) {
        throw new Error('No se pudo obtener el token');
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
    }
  });

  afterAll((done) => {
    server.close(done);
  });

  test('obtenerTodosLosUsuarios debería devolver un array de usuarios', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('obtenerUsuarioPorId debería devolver un usuario específico', async () => {
    const userId = 1; // Asegúrate de que este ID exista en tu base de datos
    const response = await request(app)
      .get(`/usuarios/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  test('registrarCliente debería crear un nuevo usuario', async () => {
    const newUser = {
      email: 'testuser@example.com',
      password: 'test_password',
      nombre: 'Test User',
      direccion: 'Test Address'
    };
    const response = await request(app)
      .post('/register')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email', newUser.email);
  });

  test('modificarUsuarioPorId debería actualizar un usuario existente', async () => {
    const userId = 1; // Asegúrate de que este ID exista en tu base de datos
    const updatedUser = {
      email: 'updateduser@example.com',
      password: 'updated_password',
      nombre: 'Updated User',
      direccion: 'Updated Address',
      rol: 'USER'
    };
    const response = await request(app)
      .put(`/usuarios/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', updatedUser.email);
  });
});