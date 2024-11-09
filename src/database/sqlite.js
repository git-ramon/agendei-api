import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log('Tentando conectar ao MySQL...');
console.log(`Conectando a ${host}:${port} com usuário ${user}`);


const host = process.env.MYSQLHOST || "mysql.railway.internal";
const port = process.env.MYSQLPORT || 3306;
const user = process.env.MYSQLUSER || "root";
const password = process.env.MYSQLROOTPASSWORD || "rootpassword";
const database = process.env.MYSQLDATABASE || "database";

// Criando o pool de conexões
const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,  // Número máximo de conexões simultâneas
    queueLimit: 0         // Limite de consultas aguardando uma conexão
});

// Função para realizar consultas utilizando o pool
async function runQuery(queryString, params = []) {
    return new Promise((resolve, reject) => {
        pool.execute(queryString, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Função para executar uma consulta
function query(command, params = []) {
    return new Promise((resolve, reject) => {
        pool.execute(command, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

export { query, runQuery };








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