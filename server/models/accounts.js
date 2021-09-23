const {DataTypes} = require("sequelize");
const instance = require("../connection.js");

const accounts = instance.sequelize.define("accounts", {
    account_id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    account_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

exports.model = accounts;