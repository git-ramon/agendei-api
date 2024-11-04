import bcrypt from "bcrypt";
import repositoryUser from "../repositories/repository.user.js";
import jwt from "../token.js";
import repositoryAppointment from "../repositories/repository.appointment.js";

async function Inserir(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);

    const user =  await repositoryUser.Inserir(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}

async function Login(email, password) {

    const user =  await repositoryUser.ListarByEmail(email);

    if (!user || user.length == 0) {
        return [];
    } else {
        if (await bcrypt.compare(password, user.password)){
            delete user.password;

            user.token = jwt.CreateToken(user.id_user);
            
            return user;
        } else {
            return [];
        }
    }

    return user;
}

async function Profile(id_user) {

    const user = await repositoryUser.Profile(id_user);

    return user;
}

async function Excluir(id_user, id_appointment) {

    const appointment =  await repositoryAppointment.Excluir(id_user, id_appointment);

    return appointment;
}

async function InserirAdmin(name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);

    const user =  await repositoryUser.InserirAdmin(name, email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}

async function LoginAdmin(email, password) {

    const user =  await repositoryUser.ListarByEmailAdmin(email);

    if (!user || user.length == 0) {
        return [];
    } else {
        if (await bcrypt.compare(password, user.password)){
            delete user.password;

            user.token = jwt.CreateToken(user.id_user);
            
            return user;
        } else {
            return [];
        }
    }

    return user;
}

async function Listar(id_user) {

    const user = await repositoryUser.Listar();

    return user;
}

export default { Inserir, Login, Profile, Excluir, InserirAdmin, LoginAdmin, Listar }