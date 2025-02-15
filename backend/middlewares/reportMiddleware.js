const reportMiddleware = (req, res, next) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  console.log(`
    Fecha: ${formattedDate} Hora: ${formattedTime} - Ruta consultada: ${req.method} ${req.path}
  `);
  next();
};

module.exports = reportMiddleware;
