const sequelize = require('../database');

const { Model, DataTypes } = require('sequelize');

class Client extends Model { }

Client.init({
    email: DataTypes.TEXT,
    pseudo: DataTypes.TEXT,
    password: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'client'
});

module.exports = Client;