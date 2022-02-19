const UserMongoDB = require('./../libraries/user.mongodb');
const bcrypt = require('bcrypt');

class SignUp {
    #user;
    constructor() {
        this.#user = new UserMongoDB();
    }
    async #exist(email) {
        if (await this.#user.findByCorreo(email) === null) {
            return false;
        } else {
            return true;
        }
    }
    async createAccount(data) {
        if (await this.#exist(data.email)) {
            return { error: true, severity: 'info', summary: 'Ya existe el usuario', detail: 'Ya existe un usuario con el mismo correo' }
        } else {
            const hash = await bcrypt.hash(data.password, 7);
            const newUser = {
                ...data,
                password: hash
            }
            await this.#user.insertOne(newUser);
            return { error: false, severity: 'sucess', summary: 'Exito', detail: 'Se registro al usuario exitosamente' };
        }
    }
}

module.exports = SignUp;
/**
 * LOGICA DEL NEGOCIO NO VA EN EL CONTROLADOR
 * SINO EN UNA CLASS ESPECIAL PARA ESO
 * 
 * EL CONTROLADOR RECIVE LA SOLICITUD, REQ , EN FORMATO JSON O OTRO FORMATO
 * CONVERTIRLO OBJETO
 * HACER LAS VALIDACIONES
 * EJECUTAR LA LOGICA DE NEGOCIO Y RECIVIR LA RESPUESTA
 * DEVOLVER ,RES, EN JSON O OTRO FORMATO
 */