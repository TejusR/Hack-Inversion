'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserForm = sequelize.define(
        'UserForm',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            formid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userid: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            submitted: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );
    UserForm.associate = function(models) {
        // associations can be defined here
    };
    return UserForm;
};