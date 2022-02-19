const UserMongoDB = require('./../libraries/user.mongodb');

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
}

module.exports = UserService;