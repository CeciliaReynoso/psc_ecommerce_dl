module.exports = {
    TRIP_NOT_FOUND: {
        id: 'itemNoEncontrado',
        statusCode: 404,
        message: 'Item no encontrado',
        description: 'El item con el ID asignado no existe en la base de datos',
    },
    SERVER_ERROR: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor. Pruba más tarde',
        description: 'Error inesperado en el servidor',
    }
}