import { DataTypes } from 'sequelize'

const fields = {
    name: {
        type: DataTypes.STRING(20),
        // field: 'name' or custom field name
    },
    surname: {
        type: DataTypes.STRING(20)
    },
    ci: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },            // checks for email format (foo@bar.com)
    },
}

const options = {
    tableName: 'user'
}

export default (name, sequelize) => {
    return sequelize.define(name, fields, options)
}

// var tupla = bd.fn(1) // { articulo: name: perno, ....}
// res.status(200).json(tupla) // null