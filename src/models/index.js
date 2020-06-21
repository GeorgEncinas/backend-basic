import Sequelize from 'sequelize'
import UserModel from "./user";

const db = new Sequelize('sample', 'root', 'root', { host: 'localhost', dialect: 'mysql' })
// 'mysql://localhost:33306/sample'
// in mysql, create dabase sample with: create schema sample;

const User = UserModel('User', db)

export { User }

db.authenticate()
    .then(() => {
        return db.sync()
    })
    .then(() => {
        console.log('DB connection: sync ok')
        console.log('DB connection: test ok')
    })
