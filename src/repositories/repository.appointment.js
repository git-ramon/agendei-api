import { query } from "../database/sqlite.js";

// Exemplo de consulta
db.execute('SELECT * FROM users', (err, results) => {
    if (err) {
        console.error(err);
    } else {
        console.log(results);
    }
});

async function Listar(id_user, dt_start, dt_end, id_doctor) {

    let filtro =  [];

    let sql  = `SELECT a.id_appointment, s.description as service, d.name as doctor, d.specialty, 
                a.booking_date, a.booking_hour, u.name as user, ds.price, a.id_doctor, a.id_service, a.id_user 
                FROM appointments a
                JOIN services s ON (s.id_service = a.id_service)
                JOIN doctors d ON (d.id_doctor = a.id_doctor)
                JOIN users u ON (u.id_user = a.id_user)
                JOIN doctors_services ds ON (ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service)
                WHERE a.id_appointment > 0`;

                if (id_user) {
                    filtro.push(id_user)
                    sql = sql + " AND a.id_user = ? "
                }

                if (dt_start) {
                    filtro.push(dt_start)
                    sql = sql + " AND a.booking_date >= ? "
                }

                if (dt_end) {
                    filtro.push(dt_end)
                    sql = sql + " AND a.booking_date <= ? "
                }

                if (id_doctor) {
                    filtro.push(id_doctor)
                    sql = sql + " AND a.id_doctor = ? "
                }
                
                sql = sql + " ORDER BY a.booking_date, a.booking_hour";

    const appointments = await query(sql, filtro);

    return appointments;
}

async function ListarId(id_appointment) {

    let sql  = `SELECT a.id_appointment, s.description as service, d.name as doctor, d.specialty, 
                a.booking_date, a.booking_hour, u.name as user, ds.price, a.id_doctor, a.id_service, a.id_user 
                FROM appointments a
                JOIN services s ON (s.id_service = a.id_service)
                JOIN doctors d ON (d.id_doctor = a.id_doctor)
                JOIN users u ON (u.id_user = a.id_user)
                JOIN doctors_services ds ON (ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service)
                WHERE a.id_appointment = ? `;

    const appointments = await query(sql, [id_appointment]);

    return appointments[0];
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {

    let sql = `INSERT INTO appointments (id_user, id_doctor, id_service, booking_date, booking_hour) VALUES (?, ?, ?, ?, ?)
    returning id_appointment`;
    

    const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

    return appointment[0];
}

async function Excluir(id_user, id_appointment) {

    let sql = `DELETE FROM appointments WHERE id_appointment = ? `;
    
    await query(sql, [id_appointment]);

    return {id_appointment};
}

async function Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {

    let sql = `UPDATE appointments SET id_user=?, id_doctor=?, id_service=?, booking_date=?, booking_hour=? WHERE id_appointment=?`;
    
    try {
        await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour, id_appointment]);
        return { id_appointment };
    } catch (error) {
        console.error("Erro ao atualizar o agendamento:", error);
        throw error;
    }
}

export default { Listar, Inserir, Excluir, ListarId, Editar };