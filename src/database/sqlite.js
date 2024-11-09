
import sqlite3 from "sqlite3";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const SQLite = sqlite3.verbose();

// Configuração de conexão SQLite
const dbSQLite = new SQLite.Database("./src/database/banco.db", SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("Erro ao conectar com o banco SQLite: " + err.message);
    }
});

// Configuração de conexão MySQL (utiliza variáveis de ambiente)
const dbMySQL = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Função de consulta adaptada para ambas as conexões
function query(command, params, method = 'all', useMySQL = true) {
    const db = useMySQL ? dbMySQL : dbSQLite;

    return new Promise((resolve, reject) => {
        db[method](command, params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// Exportar as conexões e a função de consulta
export { dbSQLite, dbMySQL, query };

/*import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();

function query (command, params, method = 'all'){
    return new Promise(function (resolve, reject) {
        db[method](command, params, function (error, result) {
            if (error) 
                reject(error)
             else 
                resolve(result);
        });
    });
}

const db = new SQLite.Database("./src/database/banco.db", SQLite.OPEN_READWRITE, (err) => {
    if (err)
        return console.log("Erro ao conectar com o banco: " + err.message);
});

export { db, query };*/