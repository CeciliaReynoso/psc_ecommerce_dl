const bcrypt = require('bcryptjs');

const generateHashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
  } catch (error) {
    console.error('Error al generar la contraseña encriptada:', error);
  }
};

generateHashedPassword('admin_password');