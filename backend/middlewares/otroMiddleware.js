const reportConsult = (req, res, next) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    const url = req.url;

    res.on('finish', () => {
        const statusCode = res.statusCode;
        console.log(`
        Fecha: ${formattedDate} Hora: ${formattedTime} - Ruta consultada: ${req.method} ${url} - Estado: ${statusCode}
        `);
    });

    next();
};

module.exports = { reportConsult };
