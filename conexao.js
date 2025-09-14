
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "40028922",
    database: "backend_db",
    max: 10,
    idleTimeoutMillis: 60000
});

export default pool;



