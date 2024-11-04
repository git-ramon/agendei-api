import { query } from "../database/sqlite.js";

async function Inserir(name, email, password) {

    let sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)
    returning id_user`;
    
    const user = await query(sql, [name, email, password]);

    return user[0];
}

async function ListarByEmail(email) {

    let sql = `SELECT * FROM users WHERE email = ?`;
    
    const user = await query(sql, [email]);

    if (user.lenght == 0 ) {
        return [];
    } else {
        return user[0];
    }
}

async function Profile(id_user) {

    let sql = `SELECT id_user, name, email FROM users WHERE id_user = ?`;

    const user = await query(sql, [id_user]);

    return user[0];
}

async function InserirAdmin(name, email, password) {

    let sql = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)
    returning id_admin`;
    
    const user = await query(sql, [name, email, password]);

    return user[0];
}

async function ListarByEmailAdmin(email) {

    let sql = `SELECT * FROM admins WHERE email = ?`;
    
    const user = await query(sql, [email]);

    if (user.lenght == 0 ) {
        return [];
    } else {
        return user[0];
    }
}

async function Listar() {

    let sql = `SELECT id_user, name, email FROM users order by name`;
    
    const users = await query(sql, []);

    return users;

}

export default { Inserir, ListarByEmail, Profile, ListarByEmailAdmin, InserirAdmin, Listar };
