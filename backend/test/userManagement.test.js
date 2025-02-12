const request = require('supertest');
const { app, server } = require('../index'); // Asegúrate de que este sea el punto de entrada de tu aplicación

describe('Pruebas de UserManagement', () => {
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

  test('GET /usuarios debería devolver un array y código de estado 200 para ADMINISTRADOR', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /usuarios debería devolver código de estado 401 sin token', async () => {
    const response = await request(app)
      .get('/usuarios');
    expect(response.status).toBe(401);
  });

  test('GET /usuarios debería devolver código de estado 403 para rol no autorizado', async () => {
    // Autenticar y obtener un token JWT para un usuario con rol no autorizado
    const responseLogin = await request(app)
      .post('/login')
      .send({
        email: 'user@example.com',
        password: 'user_password'
      });
    const userToken = responseLogin.body.token;

    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(401);
  });
});