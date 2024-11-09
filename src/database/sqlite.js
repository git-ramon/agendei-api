import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log('Tentando conectar ao MySQL...');

const host = process.env.MYSQLHOST || "localhost"; // Valor padrão
const port = process.env.MYSQLPORT || 3306; // Valor padrão
const user = process.env.MYSQLUSER || "root"; // Valor padrão
const password = process.env.MYSQLROOTPASSWORD || "rootpassword"; // Valor padrão
const database = process.env.MYSQLDATABASE || "database"; // Valor padrão

const db = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o MySQL: ', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

// Função para realizar a consulta, com verificação do estado da conexão
async function query(queryString) {
    if (db.state === 'disconnected') {
        console.log('Reconectando ao MySQL...');
        db.connect();
    }

    return new Promise((resolve, reject) => {
        db.execute(queryString, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


// Função para executar consultas
function query(command, params = []) {
    return new Promise((resolve, reject) => {
        db.execute(command, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

export { query, db };







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