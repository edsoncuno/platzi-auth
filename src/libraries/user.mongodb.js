require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

class UserMongoDB {
    #uri;
    #client;
    #collection;
    constructor() {
        this.#uri = 'mongodb://' + process.env.MONGODB_HOST + '/' + process.env.MONGODB_NAME;
        this.#client = new MongoClient(this.#uri);
        this.#collection = 'user';
    }

    async insertOne(user) {
        await this.#client.connect();
        const data = await this.#client.db(process.env.MONGODB_NAME).collection(this.#collection).insertOne(user);
        await this.#client.close();
        return data;
    }

    async findByCorreo(email) {
        await this.#client.connect();
        const data = await await this.#client.db(process.env.MONGODB_NAME).collection(this.#collection).findOne({ email: email });
        await this.#client.close();
        return data;
    }

    async find() {
        await this.#client.connect();
        const data = await this.#client.db(process.env.MONGODB_NAME).collection(this.#collection).find().toArray();;
        await this.#client.close();
        return data;
    }

    async deleteByEmail(email) {
        await this.#client.connect();
        const data = await await this.#client.db(process.env.MONGODB_NAME).collection(this.#collection).deleteOne({ email: email });
        await this.#client.close();
        return data;
    }

    async deleteById(id) {
        await this.#client.connect();
        const data = await await this.#client.db(process.env.MONGODB_NAME).collection(this.#collection).deleteOne({ _id: ObjectId(id) });
        await this.#client.close();
        return data;
    }
}

module.exports = UserMongoDB;