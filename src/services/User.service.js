const UserMongoDB = require('./../libraries/user.mongodb');
const bcrypt = require('bcrypt');

class UserService {
    #user;
    constructor() {
        this.#user = new UserMongoDB();
    }

    async toList() {
        return await this.#user.find();
    }

    async delete(data) {
        await this.#user.deleteById(data.id);
        return { error: false, severity: 'sucess', summary: 'Exito', detail: 'Se elimino al usuario exitosamente' };
    }

    async findByCorreo(email) {
        return await this.#user.findByCorreo(email);
    }

    async checkUser(email, password) {
        const user = await this.findByCorreo(email);
        if (user == null) {
            const data = { error: true, severity: 'info', summary: 'No existe el usuario', detail: 'El usuario no esta registrado' };
            return data;
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const data = { error: true, severity: 'info', summary: 'La contraseña es incorrrecta', detail: 'La contraseña es incorrrecta' };
                return data;
            } else {
                delete user.password;
                user.role = 'admin';
                return user;
            }
        }

    }

    async updateUser(id, body) {
        const data = this.#user.updateUser(id, body);
        return data;
    }
}

module.exports = UserService;