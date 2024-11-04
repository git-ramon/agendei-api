import { query } from "../database/sqlite.js";

async function Listar(name) {
    let filtro = [];
    let sql = "SELECT * FROM doctors ";

    if (name) {
        name = name.trim();  // Remove espaços em branco e novas linhas
        sql += "WHERE name LIKE ? ";
        filtro.push('%' + name + '%');
    }

    sql += "ORDER BY name";

    const doctors = await query(sql, filtro);

    return doctors;
}

async function Inserir(name, specialty, icon) {

    let sql = `INSERT INTO doctors (name, specialty, icon) VALUES (?, ?, ?)
    returning id_doctor`;
    

    const doctor = await query(sql, [name, specialty, icon]);

    return doctor[0];
}

async function Editar(id_doctor, name, specialty, icon) {

    let sql = `UPDATE doctors SET name=?, specialty=?, icon=? 
    WHERE id_doctor = ?`;
    

    await query(sql, [name, specialty, icon, id_doctor]);

    return { id_doctor };
}

async function Excluir(id_doctor) {

    let sql = `DELETE FROM doctors WHERE id_doctor = ?`;
    

    await query(sql, [id_doctor]);

    return { id_doctor };
}

async function ListarServicos(id_doctor) {

    let sql = `SELECT d.id_service, s.description, d.price
    FROM doctors_services d JOIN services s on (s.id_service = d.id_service)
    WHERE d.id_doctor = ? ORDER BY s.description`;

    const serv = await query(sql, [id_doctor]);

    return serv;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
