import { Schema, model } from 'mongoose'

export default model('User', new Schema({
    // _id: { }
    name: String, // String is shorthand for {type: String}
    surname: String,
    ci: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+@[a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: true
    }
}))