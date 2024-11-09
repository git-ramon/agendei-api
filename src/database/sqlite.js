
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();


// Configuração de conexão MySQL (utiliza variáveis de ambiente)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o MySQL: ', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

export { db };







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