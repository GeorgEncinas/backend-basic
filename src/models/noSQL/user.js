import { Schema, model } from 'mongoose'

export default model('User', new Schema({
    // _id: { }
    name: String, // String is shorthand for {type: String}
    surname: String,
    ci: String,
    password: String,
    email: String
}))
