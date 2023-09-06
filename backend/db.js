const { Sequelize, DataTypes } = require('sequelize');

const sequlize = new Sequelize('anyposts', 'postgres', 'Rthaurp1a8p-', {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432'
})

const User = sequlize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        defaultValue: 'USER'
    },
    posts: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
    }
})

const Post = sequlize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    readingTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = {
    User,
    Post,
    sequlize,
}