'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            upiId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'student'
            },
            latitude: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            longitude: {
                type: DataTypes.DOUBLE,
                allowNull: true
            }
        },
        {}
    );
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};
