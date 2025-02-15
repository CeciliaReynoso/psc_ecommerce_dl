const { DB } = require("../config/db");
const format = require('pg-format');

// Obtener joyas con paginación y orden
const getJoyas = async (limits, page, orderField, orderDirection) => {
    const offset = Math.abs((page - 1) * limits);
    const query = format(
        `SELECT * FROM joyas ORDER BY %I %s LIMIT %s OFFSET %s`,
        orderField,
        orderDirection,
        limits,
        offset
    );
    const result = await DB.query(query);
    return result.rows;
};

// Obtener joyas con filtros dinámicos
const getJoyasByFilters = async (filters) => {
    let baseQuery = "SELECT * FROM joyas";
    let condiciones = [];

    if (filters.precio_min) {
        condiciones.push(format("precio >= %L", filters.precio_min));
    }
    if (filters.precio_max) {
        condiciones.push(format("precio <= %L", filters.precio_max));
    }
    if (filters.categoria) {
        condiciones.push(format("categoria = %L", filters.categoria));
    }
    if (filters.metal) {
        condiciones.push(format("metal = %L", filters.metal));
    }

    if (condiciones.length > 0) {
        baseQuery += " WHERE " + condiciones.join(" AND ");
    }

    const result = await DB.query(baseQuery);
    return result.rows;
};

const obtenerJoya = async (id) => {
    const consulta = format("SELECT * FROM joyas WHERE id = %s", id);
    const result = await DB.query(consulta);
    return result.rows[0];
};

const getTotalItems = async () => {
    const query = "SELECT COUNT(*) FROM joyas";
    const result = await DB.query(query);
    return parseInt(result.rows[0].count, 10);
};

module.exports = {
    getJoyas,
    getJoyasByFilters,
    obtenerJoya,
    getTotalItems
};

//%L Para valores tipo cadena
//%s Para valores numericos o booleanos
//%I Para nombres de columnas o tablas
