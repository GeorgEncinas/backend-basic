import Sequelize from 'sequelize'
import UserModel from "./user";
import UserN from "./noSQL/user";

import { connection } from 'mongoose';

const db = new Sequelize('sample', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})
// 'mysql://localhost:33306/sample'
// in mysql, create dabase sample with: create schema sample;

const User = UserModel('User', db)

export { User, UserN }

const syncDB = async () => {
    try {
        await db.authenticate()
        console.log('DB connection: test ok')

        await db.sync()
        console.log('DB connection: sync ok')
    } catch (e) {
        console.error(e)
    }

}

syncDB()
